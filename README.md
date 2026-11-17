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

El menú principal enlaza a las secciones con estos nombres visibles:

| Menú | Sección | `id` |
| --- | --- | --- |
| Nosotros | Ventajas | `#ventajas` |
| Ustedes | Cómo trabajamos | `#proceso` |
| Equipo | Nuestro equipo | `#equipo` |
| Operaciones | Área de operaciones | `#operaciones` |

La sección **Solar y planeta** (`#planeta`) va después de Operaciones y antes de Contacto, pero no aparece en el menú. Incluye las ventajas ambientales y la tabla de ahorro. El botón flotante de volver arriba aparece al pasar unos 600 px de scroll y se oculta al llegar al pie de página, donde queda el enlace de texto.

## Tarifa eléctrica y cifras de ahorro

La tabla de `#planeta` usa la tarifa residencial cubana del **Acuerdo 9810/2024**, vigente desde el 1 de marzo de 2024, con tramos progresivos. Las facturas de ejemplo se calculan sumando cada tramo:

| Consumo | Factura | Ahorro estimado (80 % de la factura) |
| --- | --- | --- |
| 150 kWh | 87 CUP | ≈ 70 CUP |
| 250 kWh | 281 CUP | ≈ 225 CUP |
| 400 kWh | 881 CUP | ≈ 705 CUP |
| 500 kWh | 1 531 CUP | ≈ 1 225 CUP |

Si cambia la tarifa, actualiza los valores de la tabla en `index.html` y el texto `planet.savingsText` / `planet.savingsNote` en los diccionarios `es` y `en`. Los ahorros se estiman de forma conservadora como el 80 % de la factura: con la tarifa por tramos, cubrir el 80 % del consumo con solar suele ahorrar más. El resultado real depende del tamaño del sistema, la radiación, el consumo nocturno y los hábitos de cada cliente.
