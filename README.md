# SolarTwin

Landing page de SolarTwin: paneles solares en la provincia de Santiago de Cuba, con base en Palma Soriano.

Es un sitio **100 % estático**: HTML, CSS, JavaScript, imágenes y fuentes locales. No necesita compilación, Node, PHP ni base de datos.

## Archivos que van al servidor

```
index.html
style.css
main.js
favicon.svg
fonts/
img/
```

El resto de archivos del repositorio (README, capturas, etc.) no hace falta subirlos.

## Guía rápida para Apache

1. Copia los archivos a la carpeta pública de tu Apache (por ejemplo `/var/www/html`):

   ```bash
   sudo cp -r index.html style.css main.js favicon.svg fonts img /var/www/html/
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

- Textos en español: directamente en `index.html` y en el diccionario `es` de `main.js`.
- Textos en inglés: diccionario `en` de `main.js`.
- Colores y estilos: `style.css`.
- Fotos: reemplaza los archivos de `img/` manteniendo los nombres, o cambia la ruta en `index.html`.
- El selector de idioma funciona igual que el de tema: un botón redondo en la cabecera abre un menú con Español e English. Añadir un idioma nuevo implica crear su diccionario en `main.js` y un botón con `data-lang-set` en ese menú.

El menú principal enlaza a las secciones con estos nombres visibles:

| Menú | Sección | `id` |
| --- | --- | --- |
| Nosotros | Ventajas | `#ventajas` |
| Ustedes | Cómo trabajamos | `#proceso` |
| Equipo | Nuestro equipo | `#equipo` |
| Operaciones | Área de operaciones | `#operaciones` |
| Pago | Formas de pago | `#pago` |

La sección **Solar y planeta** (`#planeta`) va después de Operaciones y antes de Pago, pero no aparece en el menú. Incluye las ventajas ambientales y la tabla de ahorro. La sección **Formas de pago** (`#pago`) va después de Planeta y antes de Contacto: indica que el pago es en efectivo y que se aceptan dólar (USD), euro (EUR) y moneda nacional (CUP). El botón flotante de volver arriba aparece al pasar unos 600 px de scroll y se oculta al llegar al pie de página, donde queda el enlace de texto.

## Aportes del cliente y de la empresa

Dentro de **Cómo trabajamos** (`#proceso`), el panel “Tú aportas / Nosotros aportamos” deja claro el reparto: el cliente provee los paneles y los cables solares, y SolarTwin aporta la mano de obra para el montaje de las bases. Si cambia el reparto, actualiza el HTML y las claves `process.splitYou*` y `process.splitWe*` de los diccionarios `es` y `en`.

## Tarifa eléctrica y cifras de ahorro

La tabla de `#planeta` usa la tarifa residencial cubana del **Acuerdo 9810/2024**, vigente desde el 1 de marzo de 2024, con tramos progresivos. Las facturas de ejemplo se calculan sumando cada tramo:

| Consumo | Factura | Ahorro estimado (80 % de la factura) |
| --- | --- | --- |
| 150 kWh | 87 CUP | ≈ 70 CUP |
| 250 kWh | 281 CUP | ≈ 225 CUP |
| 400 kWh | 881 CUP | ≈ 705 CUP |
| 500 kWh | 1 531 CUP | ≈ 1 225 CUP |

Si cambia la tarifa, actualiza los valores de la tabla en `index.html` y el texto `planet.savingsText` / `planet.savingsNote` en los diccionarios `es` y `en`. Los ahorros se estiman de forma conservadora como el 80 % de la factura: con la tarifa por tramos, cubrir el 80 % del consumo con solar suele ahorrar más. El resultado real depende del tamaño del sistema, la radiación, el consumo nocturno y los hábitos de cada cliente.

## Fotos y licencias

Las tres fotos muestran paneles montados sobre techos y azoteas de hormigón. Están recortadas en cuadrado y optimizadas en `img/`:

| Archivo | Autor | Licencia | Fuente |
| --- | --- | --- | --- |
| `techos-santiago.jpg` | Escla | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Solar_panels_in_Santiago_de_Cuba_2026-07.jpg) |
| `montaje-techo.jpg` | Kristian Buus / 1010 Climate Action | CC BY 2.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Solar_panel_installation_at_Grange_farm.jpg) |
| `techos-paneles.jpg` | Raysonho | CC0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:RooftopSolarPanelsMarkham3.jpg) |

Las atribuciones aparecen en el pie de página. Si sustituyes una foto, actualiza también ese crédito o elimina la línea si la nueva imagen no lo necesita. La foto de Santiago de Cuba es CC BY-SA 4.0: sus versiones recortadas conservan esa licencia.
