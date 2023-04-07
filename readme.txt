Autor: Carolina Jiménez Gutiérrez.
Fecha: 07-Abr-2023

Debido a que el proceso se ejecuta con PlayWright, se debe instalar este tipo de proyecto:
1. En Visual Code instalar la extensión Playwright de Micrisoft
2. En la carpeta de tu dispositivo deseado, ejecutar el comando:
	2.1 $ npm init playwright@latest --yes -- --quiet --browser=chromium
	Esto creara el proyecto.
3. De las carpetas creadas, actualizar:
	3.1 El archivo "playwright.config.ts" por el archivo del mismo nombre en el repositorio.
	3.2 El archivo "example.spec.ts" por el archivo del repositorio con nombre "wingo.spec.ts", reemplazar todo el contenido.
4. Una vez realizado los pasos anteriores:
	4.1 Ejecute: npx playwright test
	Esto ejecutara las pruebas del archivo
	4.2 Si no hay error ejecute:
	Para ver un reporte de las pruebas
	4.3 Si hubo error durante las pruebas se mostrara automaticamente un reporte evidenciando en donde se produjo la novedad.

	4.4 Si desea ejecutar paso a paso el script de test utilice: npx playwright test --debug
	4.5 Si desea ver como se ven las pruebas utilice: npx playwright test --headed

Nota: Es posible que por temas de carga de la pagina wingo, las pruebas con el punto "4.1" presente un error.

