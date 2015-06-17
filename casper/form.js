// var url ="http://localhost:3000/registro-base.html";

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

// traemos Keys del JSON
var ide = Object.keys(params);

var i = 1;

//Testeamos que el objeto cargue
// var utils = require('utils');
// utils.dump(params["test"])
// utils.dump(params);

var xpath = require('casper').selectXPath;


casper.start(params.url, function () {
});

//Hacemos captura antes de llenar
casper.then(function () {
    this.capture('screenshots/00-submit-form-inicial.jpg');

    this.click("#Btnregistro");
    this.capture('screenshots/01-submit-form-vacio.jpg');
    
});

var texto = xpath('//*[@aria-validar="texto"]');
var numero = xpath('//*[@aria-validar="numeros"]');
var largo = xpath('//*[@aria-validar="maxlength"]');
var Cpass = xpath('//*[@aria-validar="Cpass"]');

//Llenamos el formulario con errores
casper.then(function() {


    //Llena values de date, y rango
    this.sendKeys(xpath('//*[@aria-validar="fecha"]'), params.fechaNacimiento);
    this.sendKeys(xpath('//*[@aria-validar="rango"]'), params.rango);
    

    //Llenamos con numeros inputs de texto
    if( this.exists(texto) ){

    this.sendKeys(texto, "123466");

    };

    //Llenamos con texto inputs de digitos
    if ( this.exists (numero) ){

        this.sendKeys(numero, "hlo");

    };

    //Validamos máximo de caracteres

    if (  this.exists (largo) ) {

        for (; i < 505; i++ ){

            this.sendKeys(largo, "a");
        };
    };

    //Validamos email

    if ( this.exists( xpath('//*[@type="email"]') ) ){
        this.sendKeys( xpath('//*[@type="email"]'), "cris.faas@f" );
    }

    this.click("#Btnregistro"); 

    this.capture('screenshots/02-submit-form-errores.jpg');
});

//Limpiamos los campos con error
casper.then(function () {

    this.fillXPath("#Registro", {
        '//*[@aria-validar="texto"]': "",
        '//*[@aria-validar="numeros"]': "",
        '//*[@aria-validar="maxlength"]': "",
        '//*[@type="email"]': "",
        '//*[@aria-validar="Cpass"]': ""

    });


});


//Corregimos los campos que están mal y enviamos datos
casper.then(function() {

    //Llenamos de nuevo todo el formulario
    this.fill("#Registro", params, false);

    //Confirmamos contraseña
    this.sendKeys(Cpass, params.password);

    //Corregimos URL
    this.fillXPath("#Registro", {
        '//*[@aria-validar="url"]': ""

    });

    this.sendKeys(xpath('//*[@aria-validar="url"]'), "http://prueba.com");


    this.click("#Btnregistro");

    //Hacemos captura con formulario exitoso

    this.capture('screenshots/03-submit-form-corregido.jpg');



});

    //Esperamos respuesta de servidor e imprimimos.

casper.then(function () {
    this.wait(5000, function() {
            this.clear();
            this.echo("5s");
             casper.thenOpen("http://localhost:3000/respuesta.html", function() {
            this.capture('screenshots/04-submit-form-respuesta-server.jpg');
       });
            this.echo('Page url is ' + this.getCurrentUrl());
            this.echo('Page title is ' + this.getTitle());
        
        });

});


casper.run();