# SolarTwin

Landing page de SolarTwin: paneles solares en la provincia de Santiago de Cuba, con base en Palma Soriano.

Es un sitio **100 % estático**: HTML, CSS, JavaScript, imágenes y fuentes locales. No necesita compilación, Node, PHP ni base de datos.

## Archivos que van al servidor

```
index.html
style.css
config.js
main.js
favicon.svg
fonts/
img/
```

El resto de archivos del repositorio (README, capturas, etc.) no hace falta subirlos.

## Guía rápida para Apache

1. Copia los archivos a la carpeta pública de tu Apache (por ejemplo `/var/www/html`):

   ```bash
   sudo cp -r index.html style.css config.js main.js favicon.svg fonts img /var/www/html/
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

No hace falta `.htaccess` ni activar módulos adicionales: Apache sirve `index.html` por defecto.

## Editar contenido

- Textos: directamente en `index.html` y en el diccionario `es` de `main.js`.
- El sitio tiene un solo idioma (español): no hay selector de idioma ni versiones traducidas.
- Colores y estilos: `style.css`.
- Precio de cada panel para la calculadora: `config.js` (ver más abajo).
- Fotos: reemplaza los archivos de `img/` manteniendo los nombres, o cambia la ruta en `index.html`.
- El tema oscuro se aplica por defecto; el menú de tema de la cabecera permite pasar a claro o automático (según el sistema) y la preferencia se guarda en el navegador.


El menú principal enlaza a las secciones con estos nombres visibles:

| Menú | Sección | `id` |
| --- | --- | --- |
| Nosotros | Nosotros (mapa de cobertura) | `#nosotros` |
| Proceso | Proceso (pasos y compromisos) | `#proceso` |
| Pago | Formas de pago | `#pago` |


La sección de equipo ya no existe: de ella solo queda, como nota dentro de la portada, la explicación de que el equipo lo forman especialistas en ingeniería eléctrica y metalurgia. La sección **Nosotros** (`#nosotros`) es la antigua área de operaciones: explica quiénes son y, con un mapa de Cuba, dónde trabajan y los 9 municipios que cubren. Sus cuatro compromisos (garantía, calidad, seguridad y optimización) se integraron al final de **Proceso** (`#proceso`), que es la única sección de proceso. La sección **Formas de pago** (`#pago`) va justo después de **Proceso**, y después de ella solo queda **Contacto** (`#contacto`): la antigua sección **Solar y planeta** (`#planeta`), con su tabla de tarifas y su calculadora de ahorro, se eliminó. **Formas de pago** indica que el pago es en efectivo y siempre después de completado el trabajo (sin pago por adelantado), que se aceptan dólar (USD), euro (EUR) y moneda nacional (CUP), que la tasa de referencia del CUP es elToque, y añade la calculadora de paneles. El botón flotante de volver arriba aparece al pasar unos 600 px de scroll y se oculta al llegar al pie de página.

## Aportes del cliente y de la empresa

Dentro de **Proceso** (`#proceso`), el panel “Tú aportas / Nosotros aportamos” deja claro el reparto: el cliente provee los paneles y los cables solares, y SolarTwin aporta la mano de obra para el montaje de las bases. Si cambia el reparto, actualiza el HTML y las claves `process.splitYou*` y `process.splitWe*` del diccionario `es`.

## Calculadora de paneles

El sitio es estático, así que no usa un archivo `.env`: el precio base por panel vive en `config.js`.

```js
window.SOLARTWIN_CONFIG = {
  panelPriceUsd: 180,
}
```

Cambia `panelPriceUsd` cuando varíe el precio de los paneles. La calculadora de `#pago` lo lee al cargar la página, muestra el precio por panel en USD (la moneda base) y multiplica por la cantidad entera que escriba el cliente. Incluye el aviso de que el cálculo es aproximado y que el precio final depende del precio de los insumos en el mercado y de las condiciones del montaje.

El **pago** se realiza en efectivo y después de completado el trabajo; no se pide pago por adelantado. Para el CUP se toma como referencia la tasa de [elToque](https://eltoque.com/).

## Fotos y licencias

Las dos fotos muestran paneles montados sobre techos y azoteas de hormigón. Están recortadas en cuadrado y optimizadas en `img/`:

| Archivo | Autor | Licencia | Fuente |
| --- | --- | --- | --- |
| `imagen-1.jpg` | Escla | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Solar_panels_in_Santiago_de_Cuba_2026-07.jpg) |
| `imagen-2.jpg` | UnifiedFunctionality | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Solar_panel_power_station_in_Cuba.jpg) |

Si sustituyes una foto, actualiza también su crédito o elimina la línea si la nueva imagen no lo necesita. La foto de Santiago de Cuba es CC BY-SA 4.0: sus versiones recortadas conservan esa licencia.
