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
