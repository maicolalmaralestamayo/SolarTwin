// Configuración empresarial
window.SOLARTWIN_CONFIG = {
  // Nombre del negocio (siempre 2 partes, ej: SolarTwin)
  businessName: ['Solar', 'Twin'],

  // Eslogan que aparece debajo del nombre del sitio
  slogan: 'Inviertes una vez, el sol paga el resto.',

  // Colores de identidad
  colors: {
    primary: '#FF5F1F',
    accent: '#FF00FF'
  },

  // Años de experiencia
  experienceYears: 5,

  // Cantidad de especialistas
  specialistsCount: 10,
  
  // Número de teléfono
  phoneNumber: {
    code: '53',
    number: '50781823'
  },

  // Correo de contacto
  email: 'twin.technology.startup@gmail.com',
  
  // Nombres de usuario
  usernames: {
    whatsapp: 'TwinTechnologyStartup',
    telegram: 'TwinTechnologyStartup'
  },
  
  // Enlaces a canales y redes sociales
  // Si un enlace está vacío, ese canal no se muestra en la página.
  channelLinkWhatsApp: 'https://whatsapp.com/channel/0029VbEJEn0DeON1xsuwb83M',
  channelLinkTelegram: 'https://t.me/SolarTwin',
  channelLinkFacebook: '',
  channelLinkInstagram: '',
  channelLinkTikTok: '',
  
  // Monedas de pago
  paymentCurrencies: [
    {
      name: 'Dólar',
      code: 'USD'
    },
    {
      name: 'Euro',
      code: 'EUR'
    },
    {
      name: 'Moneda nacional',
      code: 'CUP'
    }
  ],

  // Precio base por panel para la calculadora de costo (USD)
  panelPriceUsd: 180,

  // Energía que produce un panel al mes (kWh) para la calculadora de ahorro
  panelKwhPerMonth: 70,

  // Precio de la electricidad (CUP por kWh). Si lo dejas en 0, la calculadora
  // de ahorro muestra solo la energía y no habla de dinero.
  electricityRateCup: 0,

  // Opiniones de clientes. Si la lista está vacía, la sección no se muestra.
  // Ejemplo: { name: 'Ana', place: 'Palma Soriano', text: '...' }
  testimonials: [],

  // URL pública del sitio cuando tenga dominio propio (sin barra final).
  // Se usa para completar los enlaces al compartir la página.
  siteUrl: ''
}
