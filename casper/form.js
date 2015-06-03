// var url ="http://localhost:3000/registro-base.html";

//Ids del form corto
// nombre
// email
// password
// Cpass

var casper = require('casper').create({
    //Imprime errores en consola
    verbose: true,
    //Tamaño de la ventana
    viewportSize: {
        width: 1300,
        height: 400
    }

});


//Valores para el formulario
var params = require('./params.json');

//Testeamos que el objeto cargue
// var utils = require('utils');
// utils.dump(params["test"])
// utils.dump(params);


// Keys del JSON
var ide = Object.keys(params);

var xpath = require('casper').selectXPath;


casper.start(params.url, function () {
});

//Hacemos captura antes de llenar
casper.then(function () {
    this.capture('screenshots/00-submit-form-inicial.jpg');
    this.click("#Btnregistro");
    this.capture('screenshots/01-submit-form-vacio.jpg');
    
});

//Llenamos el formulario con errores
casper.then(function() {
    // Escribe en los campos del formulario.
    this.sendKeys(xpath('//*[@id="'+ide[1]+'"]'), params.nombre);
    // this.capture('screenshots/01-nombre.jpg');

    this.sendKeys(xpath('//*[@id="'+ide[2]+'"]'), params.email);
    // this.capture('screenshots/02-email.jpg');
    this.sendKeys(xpath('//*[@id="'+ide[3]+'"]'), params.password);
    // this.capture('screenshots/03-password.jpg');
    this.sendKeys(xpath('//*[@id="'+ide[4]+'"]'), params.Cpass);
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