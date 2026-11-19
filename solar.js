/* ---------------------------------------------------------------------------
   Calculadora Solar · lógica pura

   Este archivo no toca el DOM: recibe números, devuelve números. Se carga
   antes de main.js y expone todo en `window.SOLAR_CALC`.

   El proyecto es estático y sin build, así que en lugar de un `lib/solar.ts`
   con tipos de TypeScript se usa JavaScript con anotaciones JSDoc: los tipos
   siguen documentados y cualquier editor los entiende, pero el navegador los
   ejecuta tal cual.
--------------------------------------------------------------------------- */

/**
 * @typedef {'poly' | 'perc' | 'topcon' | 'hjt' | 'ibc'} CellTechId
 * @typedef {'lfp' | 'lead'} BatteryTechId
 * @typedef {'monofacial' | 'bifacial'} Construction
 *
 * @typedef {Object} CellTech
 * @property {string} label
 * @property {number} efficiency  Eficiencia de conversión (0–1)
 * @property {number} tempCoef    Coeficiente de temperatura (%/°C, negativo)
 *
 * @typedef {Object} BatteryTech
 * @property {string} label
 * @property {number} dod         Profundidad de descarga (0–1)
 * @property {number} efficiency  Eficiencia de carga/descarga (0–1)
 *
 * @typedef {Object} TariffBlock
 * @property {number} upTo   Límite superior del tramo en kWh (puede ser Infinity)
 * @property {number} price  Precio del kWh del tramo, en CUP
 *
 * @typedef {Object} BifacialFactor
 * @property {number} albedo
 * @property {number} bifaciality
 * @property {number} installFactor
 *
 * @typedef {Object} SolarInput
 * @property {number} dailyKwh        Consumo diario promedio (kWh/día)
 * @property {number} autonomyDays    Días de autonomía de las baterías
 * @property {CellTechId} cellTech
 * @property {number} panelWatts      Potencia nominal del panel (Wp)
 * @property {Construction} construction
 * @property {BatteryTechId} batteryTech
 * @property {number} hsp             Horas Solares Pico (h)
 * @property {number} derate          Eficiencia global del sistema (0–1)
 * @property {number} inverterEfficiency
 * @property {BifacialFactor} bifacial
 * @property {{ dod: number, efficiency: number }} [battery] Valores editados a mano; si faltan se usan los de la tecnología
 * @property {TariffBlock[]} tariffs
 *
 * @typedef {Object} SolarResult
 * @property {{ daily: number, weekly: number, monthly: number, annual: number }} consumption
 * @property {number} panels
 * @property {number} arrayKw
 * @property {number} inverterKw
 * @property {number} batteryKwh
 * @property {{ monthly: number, daily: number, weekly: number, annual: number }} production
 * @property {{ current: number, annual: number, withSolar: number, saving: number, savingAnnual: number }} bill
 * @property {number} gridKwh           Energía que sigue comprando a la red al mes
 * @property {number} coverage          Fracción del consumo cubierta (0–1)
 */

window.SOLAR_CALC = (function () {
  'use strict'

  /** @type {Record<CellTechId, CellTech>} */
  const CELL_TECHS = {
    poly: { label: 'Policristalino', efficiency: 0.16, tempCoef: -0.4 },
    perc: { label: 'Monocristalino PERC', efficiency: 0.21, tempCoef: -0.35 },
    topcon: { label: 'TOPCon (tipo N)', efficiency: 0.228, tempCoef: -0.3 },
    hjt: { label: 'HJT', efficiency: 0.235, tempCoef: -0.25 },
    ibc: { label: 'Back Contact (IBC/BC)', efficiency: 0.235, tempCoef: -0.26 }
  }

  /** @type {Record<BatteryTechId, BatteryTech>} */
  const BATTERY_TECHS = {
    lfp: { label: 'Litio LFP', dod: 0.8, efficiency: 0.92 },
    lead: { label: 'Plomo-ácido', dod: 0.5, efficiency: 0.85 }
  }

  const DAYS_PER_MONTH = 30.4
  const DAYS_PER_YEAR = 365
  const WEEKS_PER_MONTH = 4.33

  /** Comprueba que un valor sea un número finito y mayor que cero. */
  const positive = (value) => Number.isFinite(value) && value > 0

  /**
   * Consumo eléctrico a partir del promedio diario.
   * @param {number} dailyKwh
   * @returns {{ daily: number, weekly: number, monthly: number, annual: number }}
   */
  function consumption(dailyKwh) {
    return {
      daily: dailyKwh,
      weekly: dailyKwh * 7,
      monthly: dailyKwh * DAYS_PER_MONTH,
      annual: dailyKwh * DAYS_PER_YEAR
    }
  }

  /**
   * Ganancia de una instalación bifacial: 1 para monofacial y
   * (1 + albedo × factor de bifacialidad × factor de instalación) para bifacial.
   * @param {Construction} construction
   * @param {BifacialFactor} bifacial
   * @returns {number}
   */
  function bifacialGain(construction, bifacial) {
    if (construction !== 'bifacial') return 1
    const albedo = Number(bifacial?.albedo) || 0
    const factor = Number(bifacial?.bifaciality) || 0
    const install = Number(bifacial?.installFactor) || 0
    return 1 + albedo * factor * install
  }

  /**
   * Energía diaria que entrega un panel, ya con el derate del sistema y la
   * ganancia bifacial si corresponde.
   * @param {Object} params
   * @param {number} params.panelWatts
   * @param {number} params.hsp
   * @param {number} params.derate
   * @param {Construction} params.construction
   * @param {BifacialFactor} params.bifacial
   * @returns {number} kWh/día
   */
  function panelDailyKwh({ panelWatts, hsp, derate, construction, bifacial }) {
    const base = (panelWatts / 1000) * hsp * derate
    return base * bifacialGain(construction, bifacial)
  }

  /**
   * Cantidad de paneles: N = ceil(consumo_diario / (HSP × derate × potencia_kW)),
   * con la ganancia bifacial aplicada a la producción base.
   * @param {Object} params
   * @param {number} params.dailyKwh
   * @param {number} params.panelWatts
   * @param {number} params.hsp
   * @param {number} params.derate
   * @param {Construction} params.construction
   * @param {BifacialFactor} params.bifacial
   * @returns {number}
   */
  function panelsNeeded({ dailyKwh, panelWatts, hsp, derate, construction, bifacial }) {
    const perPanel = panelDailyKwh({ panelWatts, hsp, derate, construction, bifacial })
    if (!positive(perPanel) || !positive(dailyKwh)) return 0
    return Math.ceil(dailyKwh / perPanel)
  }

  /**
   * Potencia del inversor: (N × potencia_panel_W / 1000) × 0.9
   * @param {number} panels
   * @param {number} panelWatts
   * @returns {number} kW
   */
  function inverterKw(panels, panelWatts) {
    return ((panels * panelWatts) / 1000) * 0.9
  }

  /**
   * Capacidad de baterías: (consumo_diario × días_autonomía) / (DoD × eficiencia)
   * @param {number} dailyKwh
   * @param {number} autonomyDays
   * @param {BatteryTech} tech
   * @returns {number} kWh
   */
  function batteryKwh(dailyKwh, autonomyDays, tech) {
    const dod = Number(tech?.dod) || 0
    const efficiency = Number(tech?.efficiency) || 0
    const divisor = dod * efficiency
    if (!positive(divisor)) return 0
    return (dailyKwh * autonomyDays) / divisor
  }

  /**
   * Producción solar mensual:
   * N × potencia_panel_kW × HSP × derate × 30.4 (con ganancia bifacial).
   * @param {Object} params
   * @param {number} params.panels
   * @param {number} params.panelWatts
   * @param {number} params.hsp
   * @param {number} params.derate
   * @param {Construction} params.construction
   * @param {BifacialFactor} params.bifacial
   * @returns {number} kWh/mes
   */
  function monthlyProduction({ panels, panelWatts, hsp, derate, construction, bifacial }) {
    const perPanel = panelDailyKwh({ panelWatts, hsp, derate, construction, bifacial })
    return panels * perPanel * DAYS_PER_MONTH
  }

  /**
   * Factura eléctrica cubana por tramos progresivos: a cada bloque solo se le
   * aplica el precio a los kWh que caen dentro de él.
   * @param {number} monthlyKwh
   * @param {TariffBlock[]} tariffs
   * @returns {number} CUP
   */
  function billFor(monthlyKwh, tariffs) {
    if (!positive(monthlyKwh) || !Array.isArray(tariffs) || !tariffs.length) return 0

    let remaining = monthlyKwh
    let lower = 0
    let total = 0

    for (const block of tariffs) {
      const upTo = Number(block.upTo)
      const price = Number(block.price)
      const limit = Number.isFinite(upTo) ? upTo : Infinity
      const size = limit - lower
      if (!positive(size) || !Number.isFinite(price)) {
        lower = limit
        continue
      }
      const inBlock = Math.min(remaining, size)
      if (inBlock > 0) {
        total += inBlock * price
        remaining -= inBlock
      }
      lower = limit
      if (remaining <= 0) break
    }

    return total
  }

  /**
   * Cálculo completo del sistema.
   * @param {SolarInput} input
   * @returns {SolarResult | null} null si falta algún dato imprescindible
   */
  function computeSystem(input) {
    const dailyKwh = Number(input?.dailyKwh)
    const hsp = Number(input?.hsp)
    const panelWatts = Number(input?.panelWatts)
    const autonomyDays = Number(input?.autonomyDays)
    const derate = Number(input?.derate)

    if (!positive(dailyKwh) || !positive(hsp) || !positive(panelWatts) || !positive(derate)) return null
    if (!Number.isFinite(autonomyDays) || autonomyDays < 0) return null

    const construction = input.construction === 'bifacial' ? 'bifacial' : 'monofacial'
    const bifacial = {
      albedo: Number(input?.bifacial?.albedo) || 0,
      bifaciality: Number(input?.bifacial?.bifaciality) || 0,
      installFactor: Number(input?.bifacial?.installFactor) || 0
    }

    const catalogBattery = BATTERY_TECHS[input.batteryTech] ?? BATTERY_TECHS.lfp
    const editedDod = Number(input?.battery?.dod)
    const editedEfficiency = Number(input?.battery?.efficiency)
    const battery = {
      dod: positive(editedDod) ? editedDod : catalogBattery.dod,
      efficiency: positive(editedEfficiency) ? editedEfficiency : catalogBattery.efficiency
    }
    const use = consumption(dailyKwh)

    const panels = panelsNeeded({
      dailyKwh,
      panelWatts,
      hsp,
      derate,
      construction,
      bifacial
    })

    const monthProduction = monthlyProduction({
      panels,
      panelWatts,
      hsp,
      derate,
      construction,
      bifacial
    })

    const production = {
      monthly: monthProduction,
      daily: monthProduction / DAYS_PER_MONTH,
      weekly: monthProduction / WEEKS_PER_MONTH,
      annual: monthProduction * 12
    }

    const gridKwh = Math.max(0, use.monthly - monthProduction)
    const billCurrent = billFor(use.monthly, input.tariffs)
    const billWithSolar = billFor(gridKwh, input.tariffs)
    const saving = Math.max(0, billCurrent - billWithSolar)

    return {
      consumption: use,
      panels,
      arrayKw: (panels * panelWatts) / 1000,
      inverterKw: inverterKw(panels, panelWatts),
      batteryKwh: batteryKwh(dailyKwh, autonomyDays, battery),
      production,
      bill: {
        current: billCurrent,
        annual: billCurrent * 12,
        withSolar: billWithSolar,
        saving,
        savingAnnual: saving * 12
      },
      gridKwh,
      coverage: use.monthly > 0 ? Math.min(1, monthProduction / use.monthly) : 0
    }
  }

  return {
    CELL_TECHS,
    BATTERY_TECHS,
    DAYS_PER_MONTH,
    WEEKS_PER_MONTH,
    consumption,
    bifacialGain,
    panelsNeeded,
    inverterKw,
    batteryKwh,
    monthlyProduction,
    billFor,
    computeSystem
  }
})()
