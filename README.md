# SolarTwin

Landing page de SolarTwin: paneles solares en la provincia de Santiago de Cuba, con base en Palma Soriano.

Es un sitio **100 % estático**: HTML, CSS, JavaScript, imágenes y fuentes locales. No necesita compilación, Node, PHP ni base de datos.

## Archivos que van al servidor

```
index.html
404.html
style.css
config.js
main.js
favicon.svg
robots.txt
fonts/
img/
```

El resto de archivos del repositorio (README, capturas, etc.) no hace falta subirlos.

## Guía rápida para Apache

1. Copia los archivos a la carpeta pública de tu Apache (por ejemplo `/var/www/html`):

   ```bash
   sudo cp -r index.html 404.html style.css config.js main.js favicon.svg robots.txt fonts img /var/www/html/
   ```

2. Da permisos de lectura al servidor web:

   ```bash
   sudo chown -R www-data:www-data /var/www/html
   sudo find /var/www/html -type d -exec chmod 755 {} \;
   sudo find /var/www/html -type f -exec chmod 644 {} \;
   ```

3. Reinicia Apache:

   ```bash
   sudo systemctl restart apache2
   ```

4. Abre `http://tu-dominio-o-ip/` en el navegador.

Si lo pones en una subcarpeta (`/var/www/html/solartwin`), abre `http://tu-dominio/solartwin/`: todas las rutas son relativas y funcionan igual.

No hace falta `.htaccess` para servir el sitio (Apache sirve `index.html` por defecto). Para que se use `404.html` cuando una dirección no exista, añade esta línea en un `.htaccess` dentro de la carpeta del sitio:

```apache
ErrorDocument 404 /404.html
```

## Editar contenido

- Textos: directamente en `index.html` y en el diccionario `es` de `main.js`.
- El sitio tiene un solo idioma (español): no hay selector de idioma ni versiones traducidas.
- Colores y estilos: `style.css`.
- Precio de cada panel y datos de la calculadora de ahorro: `config.js` (ver más abajo).
- Fotos: reemplaza los archivos de `img/` manteniendo los nombres, o cambia la ruta en `index.html`.
- El tema oscuro se aplica por defecto; el menú de tema de la cabecera permite pasar a claro o automático (según el sistema) y la preferencia se guarda en el navegador.


El menú principal enlaza a las secciones con estos nombres visibles:

| Menú | Sección | `id` |
| --- | --- | --- |
| Nosotros | Nosotros (mapa de cobertura) | `#nosotros` |
| Proceso | Proceso (pasos y compromisos) | `#proceso` |
| Pago | Formas de pago y calculadoras | `#pago` |
| Calculadora | Calculadora Solar (dimensionamiento y ahorro) | `#calculadora` |
| Contáctanos | Formas de contacto | `#contacto` |

Mientras el visitante recorre la página, el enlace de la sección en la que está se marca solo (`aria-current`).

## `config.js`

Todo lo que cambia con el negocio vive aquí:

| Campo | Qué hace |
| --- | --- |
| `businessName` | Nombre del sitio en dos partes (`['Solar', 'Twin']`). |
| `slogan` | Frase que aparece bajo el nombre, también en móvil. |
| `colors` | Color principal y de énfasis. |
| `experienceYears` / `specialistsCount` | Años de experiencia y tamaño del equipo en los textos y las cifras. |
| `phoneNumber` | Código y número: se usa en `tel:`, en los chats de WhatsApp y en los textos visibles. |
| `email` | Correo de contacto: enlace `mailto:` y texto visible. |
| `usernames` | Usuarios de WhatsApp y Telegram (los `@` visibles). |
| `channelLink*` | Enlaces a los canales y redes; si están vacíos, esa tarjeta no se muestra. |
| `paymentCurrencies` | Monedas aceptadas. |
| `panelPriceUsd` | Precio base por panel para la calculadora de costo. |
| `panelKwhPerMonth` | Energía que produce un panel al mes (kWh) para la calculadora de ahorro. |
| `electricityRateCup` | Precio del kWh en CUP. Si es `0`, la calculadora de ahorro solo muestra energía. |
| `solar` | Calculadora Solar: valores iniciales, constantes del sistema y tarifa por tramos (ver abajo). |
| `faq` | Preguntas frecuentes: `{ q, a }` (ver abajo). |
| `testimonials` | Opiniones de clientes (ver abajo). |
| `siteUrl` | Dominio público cuando exista, para completar los enlaces al compartir. |

## Canales y redes sociales

Después de **Nosotros** (`#nosotros`) va la sección **Síguenos en nuestras redes sociales**, que no aparece en el menú principal. Muestra una tarjeta por cada canal configurado:

```js
channelLinkWhatsApp: 'https://whatsapp.com/channel/...',
channelLinkTelegram: 'https://t.me/SolarTwin',
channelLinkFacebook: '',
channelLinkInstagram: '',
channelLinkTikTok: '',
```

Si un enlace se deja vacío, su tarjeta no se muestra: solo aparecen los canales que tengan URL.

La sección de equipo ya no existe: de ella solo queda, como nota dentro de la portada, la explicación de que el equipo lo forman especialistas en ingeniería eléctrica y metalurgia. La sección **Nosotros** (`#nosotros`) es la antigua área de operaciones: explica quiénes son y, con un mapa de Cuba, dónde trabajan y los 9 municipios que cubren. Sus cuatro compromisos (garantía, calidad, seguridad y optimización) se integraron al final de **Proceso** (`#proceso`), que es la única sección de proceso. El botón flotante de volver arriba aparece al pasar unos 600 px de scroll y se oculta al llegar al pie de página.

## Opiniones de clientes

La sección **Opiniones** (`#opiniones`, después de las redes) se construye desde `config.js` y está oculta mientras la lista esté vacía:

```js
testimonials: [
  { name: 'Ana', place: 'Palma Soriano', text: 'Montaron los paneles en dos días y todo quedó limpio.' },
],
```

No publiques opiniones que no sean de clientes reales. Con una o dos basta para empezar; en cuanto haya contenido, la sección aparece sola.

## Aportes del cliente y de la empresa

Dentro de **Proceso** (`#proceso`), el panel “Tú aportas / Nosotros aportamos” deja claro el reparto: el cliente provee los paneles y los cables solares, y SolarTwin aporta la mano de obra para el montaje de las bases. Si cambia el reparto, actualiza el HTML y las claves `process.splitYou*` y `process.splitWe*` del diccionario `es`.

## Calculadoras

Las dos están en **Formas de pago** (`#pago`).

**Costo.** El precio base por panel vive en `config.js`:

```js
panelPriceUsd: 180,
```

La calculadora lo muestra en USD (la moneda base), multiplica por la cantidad entera que escriba el cliente e incluye el aviso de que el cálculo es aproximado. El botón **Pedir este presupuesto por WhatsApp** abre el chat con la cantidad y el nombre del negocio ya escritos en el mensaje.

**Ahorro.** Indica cuánta energía dan los paneles:

```js
panelKwhPerMonth: 70,
electricityRateCup: 0,
```

La estimación parte de que un panel de 550 W rinde unos 70 kWh al mes en Cuba (unas 4,5 horas de sol al día al 80 % de rendimiento). Muestra kWh al mes y al año. Si pones en `electricityRateCup` el precio del kWh en CUP, añade además el ahorro mensual y anual en esa moneda; mientras esté en `0` no habla de dinero.

El **pago** se realiza en efectivo y después de completado el trabajo; no se pide pago por adelantado. Para el CUP se toma como referencia la tasa de [elToque](https://eltoque.com/).

## Calculadora Solar

La sección **Calculadora Solar** (`#calculadora`, entre Formas de pago y Preguntas frecuentes) dimensiona el sistema a partir del consumo diario y calcula el ahorro en CUP. La lógica vive en `solar.js` —funciones puras, sin DOM, documentadas con JSDoc— y los datos en `config.js`:

```js
solar: {
  defaults: { dailyKwh: 10, autonomyDays: 1, cellTech: 'topcon', panelWatts: 400, construction: 'monofacial', batteryTech: 'lfp', hsp: 5.5 },
  system: { derate: 0.85, inverterEfficiency: 0.975, bifacial: { albedo: 0.2, bifaciality: 0.75, installFactor: 0.5 } },
  tariffs: [{ upTo: 100, price: 0.33 }, { upTo: 150, price: 1.07 }, /* … */],
},
```

- `defaults`: lo que trae el formulario al abrir la página. La tecnología de celda rellena la eficiencia y el coeficiente de temperatura; la de batería rellena el DoD y la eficiencia. Los cuatro siguen siendo editables.
- `system`: constantes del sistema, solo se muestran (no se editan).
- `tariffs`: tramos progresivos de la tarifa residencial en CUP/kWh. La factura aplica a cada tramo únicamente los kWh que caen dentro de él. Los valores actuales son los del Acuerdo 9810/2024 (Gaceta Oficial 10 Extraordinaria de 2024, vigente desde el 1 de marzo de 2024); si cambia la tarifa, solo hay que editar esta lista.

El botón **Solicitar cotización con estos datos** lleva al visitante a la sección de contacto.

## Preguntas frecuentes

La sección `#faq` (antes de Contacto) se genera desde `config.js` y usa `<details>` nativos: las tarjetas se abren y se cierran sin JavaScript extra.

```js
faq: [
  { q: '¿Cuánto tarda el montaje?', a: 'Depende del tamaño del sistema y del techo.' },
],
```

El texto de `a` admite enlaces HTML. Con esas mismas preguntas se generan los datos estructurados `FAQPage` que leen los buscadores, así que solo hay que editar `config.js`: no queda ningún bloque duplicado en el HTML. Si la lista está vacía, la sección queda sin preguntas.

## Cómo se comparte el enlace

El `<head>` incluye Open Graph y Twitter Card, con `img/og-image.jpg` (1200 × 630) como miniatura. Para que WhatsApp y Facebook la carguen bien, cuando el sitio tenga dominio propio cambia a absolutas estas etiquetas de `index.html`:

- `og:url`, `og:image` y `twitter:image` → `https://tudominio/img/og-image.jpg`
- `canonical` → `https://tudominio/`
- el campo `siteUrl` de `config.js`

El `<head>` incluye además datos estructurados de negocio local (`LocalBusiness`) con teléfono, correo, zona cubierta y enlaces a los canales. Si cambia el teléfono o el correo en `config.js`, actualízalos también ahí.

Un `sitemap.xml` necesita URLs absolutas, así que conviene generarlo cuando exista el dominio; `robots.txt` ya permite la indexación completa.

## Fotos y licencias

Las dos fotos muestran paneles montados sobre techos y azoteas de hormigón. Están recortadas en cuadrado y optimizadas en `img/`, solo en WebP: cada foto tiene dos tamaños y el navegador elige con `srcset`/`sizes` (`imagen-1-800.webp` / `imagen-1-1400.webp` y `imagen-2-800.webp` / `imagen-2-1000.webp`). La miniatura para compartir (`og-image.jpg`) sigue en JPEG porque algunas redes no aceptan WebP.

| Archivo | Autor | Licencia | Fuente |
| --- | --- | --- | --- |
| `imagen-1-*.webp` | Escla | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Solar_panels_in_Santiago_de_Cuba_2026-07.jpg) |
| `imagen-2-*.webp` | UnifiedFunctionality | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Solar_panel_power_station_in_Cuba.jpg) |

Si sustituyes una foto, actualiza también su crédito o elimina la línea si la nueva imagen no lo necesita. La foto de Santiago de Cuba es CC BY-SA 4.0: sus versiones recortadas conservan esa licencia.
