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

//Llenamos el formulario con errores
casper.then(function() {


    //Llena values de date, y rango
    this.sendKeys(xpath('//*[@id="fechaNacimiento"]'), params.fechaNacimiento);
    this.sendKeys(xpath('//*[@id="rango"]'), params.rango);

    // Escribe en los campos del formulario.

    //Verificamos si existe el elemento y lo llenamos
   

    for (;i < ide.length ; i++){

        if ( this.exists(xpath('//*[@id="'+ide[i]+'"]')) ) {
                
                casper.echo(i + " " + ide[i] + ": " + params[ide[i]]);

                // this.sendKeys(xpath('//*[@id="'+ide[i]+'"]'), params[ide[i]]);       

                //Llenamos los campos completos
                this.fill("#Registro", params, false);

        };
    };




    this.click("#Btnregistro"); 

    this.capture('screenshots/02-submit-form-errores.jpg');
});

//Limpiamos los campos que están mal
casper.then(function () {

    this.fillXPath("#Registro", {
        '//*[@name="nombre"]': "",
        '//*[@name="email"]': "",
        '//*[@name="Cpass"]': "",
        '//*[@name="tarjetaID"]': ""

    });

});

//Corregimos los campos que están mal y enviamos datos
casper.then(function() {

    this.fillXPath("#Registro",{

        '//*[@name="nombre"]': params.nombre,
        '//*[@name="email"]': params.email,
        '//*[@name="Cpass"]': params.password,
        '//*[@name="tarjetaID"]': params.tarjetaID

    },false);

    this.click("#Btnregistro");

    //Hacemos captura con formulario exitoso

    this.capture('screenshots/03-submit-form-success.jpg');
});

casper.run();