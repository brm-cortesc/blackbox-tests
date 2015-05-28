var url ="http://localhost:3000/registro-base.html";

var casper = require('casper').create({
    //Imprime errores en consola
    verbose: true,
    //Tamaño de la ventana que crea
    viewportSize: {
        width: 1300,
        height: 400
    }

});

var xpath = require('casper').selectXPath;

//Ids del form corto
// nombre
// email
// password
// Cpass

casper.start(url);

//Hacemos captura antes de llenar
casper.then(function () {
    this.capture('screenshots/00-submit-form-inicial.jpg');
    this.click("#Btnregistro");
    this.capture('screenshots/01-submit-form-vacio.jpg');
    
});

//Llenamos el formulario con errores
casper.then(function() {
	// Escribe en los campos del formulario.
    this.sendKeys(xpath('//*[@id="nombre"]'), 'Test');
    // this.capture('screenshots/01-nombre.jpg');

    this.sendKeys(xpath('//*[@id="email"]'), 'cristian.cortes@br,.com.co');
    // this.capture('screenshots/02-email.jpg');
    this.sendKeys(xpath('//*[@id="password"]'), 'lapeorcontraseñadelmundo');
    // this.capture('screenshots/03-password.jpg');
    this.sendKeys(xpath('//*[@id="Cpass"]'), 'lapeorcontraseadelmundo');
    // this.capture('screenshots/04-password-confirm.jpg');
    this.click("#Btnregistro");
    //Hacemos captura con errores de formulario
    this.capture('screenshots/02-submit-form-errores.jpg');
});

//Limpiamos los campos que están mal
casper.then(function () {

    this.fill("#Registro", {
        "email": "",
        "Cpass": ""

    });

});

//Corregimos los campos que están mal y enviamos datos
casper.then(function() {

    this.sendKeys(xpath('//*[@id="email"]'), 'cristian.cortes@brm.com.co');

    this.sendKeys(xpath('//*[@id="Cpass"]'), 'lapeorcontraseñadelmundo');

    this.click("#Btnregistro");

    //Hacemos captura con formulario exitoso

    this.capture('screenshots/03-submit-form-success.jpg');
});

casper.run();