import { test, expect, type Page } from '@playwright/test';

/*
Script de pruebas para validar la pagina de wingo, en la selección de vuelos Bogota - Cali
Hay dos secciones una en donde se ejecuta una sola vez por completo con el fin de evidenciar
 que el proceso funciona, el segundo es para consultar varios vuelos al tiempo como prueba 
 de estres o probar varios escenarios (diferentes fechas).

Otros escenarios de pruebas, podría ser casos de error, si la pagina no carga, si la fecha 
seleccionada no tiene vuelos.

**/

test.describe('Colsulta de un vuelo', ()=> {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.wingo.com/');
      });

    test('Seleccion de vuelos', async ({page}) => {
        await page.locator('#selectPasj div').filter({ hasText: 'Pasajeros1 Pasajeros' }).locator('div').click();
        await page.locator('div').filter({ hasText: /^1Adultos\(\+12\) No puede seleccionar más de 14 pasajeros$/ }).locator('div').nth(3).click();
        await page.locator('.styledSelect').first().click();
        await page.getByText('Bogotá (BOG) El Dorado').click();
        await page.locator('#comboDestino').getByText('Cali (CLO) Alfonso Bonilla Aragón').click();
        // Fecha de Ida
        await page.locator('table.month1').getByRole('row', { name: '3 4 5 6 7 8 9' }).getByText('9').click();
        // Fecha de regreso
        await page.locator('table.month2').getByRole('row', { name: '15 16 17 18 19 20 21' }).getByText('21').click();
        const page1Promise = page.waitForEvent('popup');
        await page.getByText('Buscar vuelo').click();
        const page1 = await page1Promise;

        // Seleccionar vuelos
        //page1.once('load', () => console.log('Page loaded!'));
        await page1.locator('.inpud-bundle-BASIC').first().click();
        //await page1.getByRole('button', { name: 'Seleccionar' }).nth(0).click();
        //await page1.getByRole('button', { name: 'Seleccionar' }).nth(2).click();
        await page1.locator('#vuelos-regreso > div > div > div:nth-child(2) > div > .card-list > div > .card-list-item > .card-image > .label > .inpud-bundle-BASIC').click();
        await page1.getByRole('button', { name: 'Continuar' }).click();

        // Completar información pasajeros
        await page1.waitForTimeout(1500);
        await expect(page1).toHaveURL('https://booking.wingo.com/booking/services');
        // Pasajero 1
        await page1.locator('#name-1-1').fill('Lorena');    
        await page1.locator('#lastname-1-1').fill('Ochoa');
        await page1.locator('#sex-1-1 div').click();
        await page1.locator('#sex-1-1').getByText('Femenino', { exact: true }).click();
        await page1.locator('#email-1-1').fill('dummy@dummy.com');
        await page1.locator('#email-confirm-1-1').fill('dummy@dummy.com');
        await page1.locator('#phone-1-1').fill('3111234567');
        await page1.locator('#numero-1-1').fill('1018486123');
        // año
        await page1.locator('[id="\\31 -birthday-0"]').getByRole('combobox').first().selectOption('1996');
        // mes
        await page1.locator('[id="\\31 -birthday-0"]').getByRole('combobox').nth(1).selectOption('Abr');
        // día
        await page1.locator('[id="\\31 -birthday-0"]').getByRole('combobox').nth(2).selectOption('1');


        // Pasajero 2
        await page1.locator('#name-1-2').fill('Pedro');    
        await page1.locator('#lastname-1-2').fill('Lopez');
        await page1.locator('div').filter({ hasText: /^Sexo$/ }).click();
        await page1.locator('#sex-1-2').getByText('Masculino', { exact: true }).click();
        await page1.locator('#numero-1-2').fill('1018486000');
        await page1.locator('app-header').filter({ hasText: 'Adulto 2' }).locator('div').first().click();
        // año
        await page1.locator('[id="\\31 -birthday-1"]').getByRole('combobox').first().selectOption('1999');
        // mes
        await page1.locator('[id="\\31 -birthday-1"]').getByRole('combobox').nth(1).selectOption('Jun');
        // día
        await page1.locator('[id="\\31 -birthday-1"]').getByRole('combobox').nth(2).selectOption('2');
        
        try {
            console.log('Pasajero_1 Nombre: ' + await page1.locator('#name-1-1').inputValue());
            console.log('Pasajero_1 Apellido: ' + await page1.locator('#lastname-1-1').inputValue());
            console.log('Pasajero_1 Correo: ' + await page1.locator('#email-1-1').inputValue());
            console.log('Pasajero_1 Numero: ' + await page1.locator('#phone-1-1').inputValue());
            console.log('Pasajero_1 Documento: ' + await page1.locator('#numero-1-1').inputValue());
            console.log('Pasajero_2 Nombre: ' + await page1.locator('#name-1-2').inputValue());
            console.log('Pasajero_2 Apellido: ' + await page1.locator('#lastname-1-2').inputValue());
            console.log('Pasajero_2 Documento: ' + await page1.locator('#numero-1-2').inputValue());
        } catch (error) {
            
        }
  
    });

});


test.describe('Colsulta de varios vuelos simultaneos', ()=> {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.wingo.com/');
      });

    test('Seleccion de vuelos', async ({page}) => {
        await page.locator('#selectPasj div').filter({ hasText: 'Pasajeros1 Pasajeros' }).locator('div').click();
        await page.locator('div').filter({ hasText: /^1Adultos\(\+12\) No puede seleccionar más de 14 pasajeros$/ }).locator('div').nth(3).click();
        await page.locator('.styledSelect').first().click();
        await page.getByText('Bogotá (BOG) El Dorado').click();
        await page.locator('#comboDestino').getByText('Cali (CLO) Alfonso Bonilla Aragón').click();
        await page.locator('table.month1').getByRole('row', { name: '3 4 5 6 7 8 9' }).getByText('9').click();
        await page.locator('table.month2').getByRole('row', { name: '15 16 17 18 19 20 21' }).getByText('21').click();
        const page1Promise = page.waitForEvent('popup');
        await page.getByText('Buscar vuelo').click();
        const page1 = await page1Promise;

        // Seleccionar vuelos
        await page1.locator('.inpud-bundle-BASIC').first().click();
        //await page1.getByRole('button', { name: 'Seleccionar' }).nth(0).click();
        //await page1.getByRole('button', { name: 'Seleccionar' }).nth(2).click();
        await page1.locator('#vuelos-regreso > div > div > div:nth-child(2) > div > .card-list > div > .card-list-item > .card-image > .label > .inpud-bundle-BASIC').click();
        await page1.getByRole('button', { name: 'Continuar' }).click();

        // Completar información pasajeros
        await page1.waitForTimeout(1500);
        await expect(page1).toHaveURL('https://booking.wingo.com/booking/services');
        // Pasajero 1
        await page1.locator('#name-1-1').fill('Lorena');    
        await page1.locator('#lastname-1-1').fill('Ochoa');
        await page1.locator('#sex-1-1 div').click();
        await page1.locator('#sex-1-1').getByText('Femenino', { exact: true }).click();
        await page1.locator('#email-1-1').fill('dummy@dummy.com');
        await page1.locator('#email-confirm-1-1').fill('dummy@dummy.com');
        await page1.locator('#phone-1-1').fill('3111234567');
        await page1.locator('#numero-1-1').fill('1018486123');
        // año
        await page1.locator('[id="\\31 -birthday-0"]').getByRole('combobox').first().selectOption('1996');
        // mes
        await page1.locator('[id="\\31 -birthday-0"]').getByRole('combobox').nth(1).selectOption('Abr');
        // día
        await page1.locator('[id="\\31 -birthday-0"]').getByRole('combobox').nth(2).selectOption('1');


        // Pasajero 2
        await page1.locator('#name-1-2').fill('Pedro');    
        await page1.locator('#lastname-1-2').fill('Lopez');
        await page1.locator('div').filter({ hasText: /^Sexo$/ }).click();
        await page1.locator('#sex-1-2').getByText('Masculino', { exact: true }).click();
        await page1.locator('#numero-1-2').fill('1018486000');
        await page1.locator('app-header').filter({ hasText: 'Adulto 2' }).locator('div').first().click();
        // año
        await page1.locator('[id="\\31 -birthday-1"]').getByRole('combobox').first().selectOption('1999');
        // mes
        await page1.locator('[id="\\31 -birthday-1"]').getByRole('combobox').nth(1).selectOption('Jun');
        // día
        await page1.locator('[id="\\31 -birthday-1"]').getByRole('combobox').nth(2).selectOption('2');
        
        try {
            console.log('Pasajero_1 Nombre: ' + await page1.locator('#name-1-1').inputValue());
            console.log('Pasajero_1 Apellido: ' + await page1.locator('#lastname-1-1').inputValue());
            console.log('Pasajero_1 Correo: ' + await page1.locator('#email-1-1').inputValue());
            console.log('Pasajero_1 Numero: ' + await page1.locator('#phone-1-1').inputValue());
            console.log('Pasajero_1 Documento: ' + await page1.locator('#numero-1-1').inputValue());
            console.log('Pasajero_2 Nombre: ' + await page1.locator('#name-1-2').inputValue());
            console.log('Pasajero_2 Apellido: ' + await page1.locator('#lastname-1-2').inputValue());
            console.log('Pasajero_2 Documento: ' + await page1.locator('#numero-1-2').inputValue());
        } catch (error) {
            
        } 
    });

    test('Seleccion de vuelos2', async ({page}) => {
        await page.locator('#selectPasj div').filter({ hasText: 'Pasajeros1 Pasajeros' }).locator('div').click();
        await page.locator('div').filter({ hasText: /^1Adultos\(\+12\) No puede seleccionar más de 14 pasajeros$/ }).locator('div').nth(3).click();
        await page.locator('.styledSelect').first().click();
        await page.getByText('Bogotá (BOG) El Dorado').click();
        await page.locator('#comboDestino').getByText('Cali (CLO) Alfonso Bonilla Aragón').click();
        await page.locator('table.month1').getByRole('row', { name: '3 4 5 6 7 8 9' }).getByText('9').click();
        await page.locator('table.month2').getByRole('row', { name: '15 16 17 18 19 20 21' }).getByText('21').click();
        const page1Promise = page.waitForEvent('popup');
        await page.getByText('Buscar vuelo').click();
        const page1 = await page1Promise;

        // Seleccionar vuelos
        await page1.locator('.inpud-bundle-BASIC').first().click();
        //await page1.getByRole('button', { name: 'Seleccionar' }).nth(0).click();
        //await page1.getByRole('button', { name: 'Seleccionar' }).nth(2).click();
        await page1.locator('#vuelos-regreso > div > div > div:nth-child(2) > div > .card-list > div > .card-list-item > .card-image > .label > .inpud-bundle-BASIC').click();
        await page1.getByRole('button', { name: 'Continuar' }).click();

        // Completar información pasajeros
        await page1.waitForTimeout(1500);
        await expect(page1).toHaveURL('https://booking.wingo.com/booking/services');
        // Pasajero 1
        await page1.locator('#name-1-1').fill('Lorena');    
        await page1.locator('#lastname-1-1').fill('Ochoa');
        await page1.locator('#sex-1-1 div').click();
        await page1.locator('#sex-1-1').getByText('Femenino', { exact: true }).click();
        await page1.locator('#email-1-1').fill('dummy@dummy.com');
        await page1.locator('#email-confirm-1-1').fill('dummy@dummy.com');
        await page1.locator('#phone-1-1').fill('3111234567');
        await page1.locator('#numero-1-1').fill('1018486123');
        // año
        await page1.locator('[id="\\31 -birthday-0"]').getByRole('combobox').first().selectOption('1996');
        // mes
        await page1.locator('[id="\\31 -birthday-0"]').getByRole('combobox').nth(1).selectOption('Abr');
        // día
        await page1.locator('[id="\\31 -birthday-0"]').getByRole('combobox').nth(2).selectOption('1');


        // Pasajero 2
        await page1.locator('#name-1-2').fill('Pedro');    
        await page1.locator('#lastname-1-2').fill('Lopez');
        await page1.locator('div').filter({ hasText: /^Sexo$/ }).click();
        await page1.locator('#sex-1-2').getByText('Masculino', { exact: true }).click();
        await page1.locator('#numero-1-2').fill('1018486000');
        await page1.locator('app-header').filter({ hasText: 'Adulto 2' }).locator('div').first().click();
        // año
        await page1.locator('[id="\\31 -birthday-1"]').getByRole('combobox').first().selectOption('1999');
        // mes
        await page1.locator('[id="\\31 -birthday-1"]').getByRole('combobox').nth(1).selectOption('Jun');
        // día
        await page1.locator('[id="\\31 -birthday-1"]').getByRole('combobox').nth(2).selectOption('2');
        
        try {
            console.log('Pasajero_1 Nombre: ' + await page1.locator('#name-1-1').inputValue());
            console.log('Pasajero_1 Apellido: ' + await page1.locator('#lastname-1-1').inputValue());
            console.log('Pasajero_1 Correo: ' + await page1.locator('#email-1-1').inputValue());
            console.log('Pasajero_1 Numero: ' + await page1.locator('#phone-1-1').inputValue());
            console.log('Pasajero_1 Documento: ' + await page1.locator('#numero-1-1').inputValue());
            console.log('Pasajero_2 Nombre: ' + await page1.locator('#name-1-2').inputValue());
            console.log('Pasajero_2 Apellido: ' + await page1.locator('#lastname-1-2').inputValue());
            console.log('Pasajero_2 Documento: ' + await page1.locator('#numero-1-2').inputValue());
        } catch (error) {
            
        }
  
    });

    test('Seleccion de vuelos3', async ({page}) => {
        //await seleccionarVuelo(page, '8', '17');

        await page.locator('#selectPasj div').filter({ hasText: 'Pasajeros1 Pasajeros' }).locator('div').click();
        await page.locator('div').filter({ hasText: /^1Adultos\(\+12\) No puede seleccionar más de 14 pasajeros$/ }).locator('div').nth(3).click();
        await page.locator('.styledSelect').first().click();
        await page.getByText('Bogotá (BOG) El Dorado').click();
        await page.locator('#comboDestino').getByText('Cali (CLO) Alfonso Bonilla Aragón').click();
        await page.locator('table.month1').getByRole('row', { name: '3 4 5 6 7 8 9' }).getByText('9').click();
        await page.locator('table.month2').getByRole('row', { name: '15 16 17 18 19 20 21' }).getByText('21').click();
        const page1Promise = page.waitForEvent('popup');
        await page.getByText('Buscar vuelo').click();
        const page1 = await page1Promise;

        // Seleccionar vuelos
        await page1.locator('.inpud-bundle-BASIC').first().click();
        //await page1.getByRole('button', { name: 'Seleccionar' }).nth(0).click();
        //await page1.getByRole('button', { name: 'Seleccionar' }).nth(2).click();
        await page1.locator('#vuelos-regreso > div > div > div:nth-child(2) > div > .card-list > div > .card-list-item > .card-image > .label > .inpud-bundle-BASIC').click();
        await page1.getByRole('button', { name: 'Continuar' }).click();

        // Completar información pasajeros
        await page1.waitForTimeout(1500);
        await expect(page1).toHaveURL('https://booking.wingo.com/booking/services');
        // Pasajero 1
        await page1.locator('#name-1-1').fill('Lorena');    
        await page1.locator('#lastname-1-1').fill('Ochoa');
        await page1.locator('#sex-1-1 div').click();
        await page1.locator('#sex-1-1').getByText('Femenino', { exact: true }).click();
        await page1.locator('#email-1-1').fill('dummy@dummy.com');
        await page1.locator('#email-confirm-1-1').fill('dummy@dummy.com');
        await page1.locator('#phone-1-1').fill('3111234567');
        await page1.locator('#numero-1-1').fill('1018486123');
        // año
        await page1.locator('[id="\\31 -birthday-0"]').getByRole('combobox').first().selectOption('1996');
        // mes
        await page1.locator('[id="\\31 -birthday-0"]').getByRole('combobox').nth(1).selectOption('Abr');
        // día
        await page1.locator('[id="\\31 -birthday-0"]').getByRole('combobox').nth(2).selectOption('1');


        // Pasajero 2
        await page1.locator('#name-1-2').fill('Pedro');    
        await page1.locator('#lastname-1-2').fill('Lopez');
        await page1.locator('div').filter({ hasText: /^Sexo$/ }).click();
        await page1.locator('#sex-1-2').getByText('Masculino', { exact: true }).click();
        await page1.locator('#numero-1-2').fill('1018486000');
        await page1.locator('app-header').filter({ hasText: 'Adulto 2' }).locator('div').first().click();
        // año
        await page1.locator('[id="\\31 -birthday-1"]').getByRole('combobox').first().selectOption('1999');
        // mes
        await page1.locator('[id="\\31 -birthday-1"]').getByRole('combobox').nth(1).selectOption('Jun');
        // día
        await page1.locator('[id="\\31 -birthday-1"]').getByRole('combobox').nth(2).selectOption('2');
        
        try {
            console.log('Pasajero_1 Nombre: ' + await page1.locator('#name-1-1').inputValue());
            console.log('Pasajero_1 Apellido: ' + await page1.locator('#lastname-1-1').inputValue());
            console.log('Pasajero_1 Correo: ' + await page1.locator('#email-1-1').inputValue());
            console.log('Pasajero_1 Numero: ' + await page1.locator('#phone-1-1').inputValue());
            console.log('Pasajero_1 Documento: ' + await page1.locator('#numero-1-1').inputValue());
            console.log('Pasajero_2 Nombre: ' + await page1.locator('#name-1-2').inputValue());
            console.log('Pasajero_2 Apellido: ' + await page1.locator('#lastname-1-2').inputValue());
            console.log('Pasajero_2 Documento: ' + await page1.locator('#numero-1-2').inputValue());
        } catch (error) {
            
        }  
    });
});


/*
// Función para priorizar una parte del proceso de consulta de los vuelos
async function seleccionarVuelo(page: Page, date_1: string, date_2: string) {
    // create a new todo locator
    await page.locator('#selectPasj div').filter({ hasText: 'Pasajeros1 Pasajeros' }).locator('div').click();
    await page.locator('div').filter({ hasText: /^1Adultos\(\+12\) No puede seleccionar más de 14 pasajeros$/ }).locator('div').nth(3).click();
    await page.locator('.styledSelect').first().click();
    await page.getByText('Bogotá (BOG) El Dorado').click();
    await page.locator('#comboDestino').getByText('Cali (CLO) Alfonso Bonilla Aragón').click();
    await page.locator('table.month1').getByRole('row', { name: '3 4 5 6 7 8 9' }).getByText(date_1).click();
    await page.locator('table.month2').getByRole('row', { name: '15 16 17 18 19 20 21' }).getByText(date_2).click();
    /*
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Buscar vuelo').click();
    const page1 = await page1Promise;
    return page1;
    //
    return page;
}
**/
