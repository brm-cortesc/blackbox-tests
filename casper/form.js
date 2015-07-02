/**
 * @author Fabian Andres Benavides Valencia
 * @author Cristian Camilo Cortés Pulido
 */

var casper = require('casper').create({
   verbose: true,
   //security=no,
   //logLevel: "debug",
   clientScripts: ["C:\/xampp\/htdocs\/blackbox-tests\/publication\/js\/blockUI.js"],
   viewportSize: {
       width: 1300,
       height: 700
   },
    
   waitTimeout: 300000,
   //timeout: 40000,
   //stepTimeout: 38000,
    pageSettings: {
       javascriptEnabled: true,
       loadImages: true,
       loadPlugins: true,
       localToRemoteUrlAccessEnabled: false,
           userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.48 Safari/537.36'
       },
       //clientScripts: ['/home/cristian/Documentos/casper/js/vendor/jquery.js','/home/cristian/Documentos/casper/js/satelliteLib-039a9c14f39837d1d9cd94e1943c468b85adb800.js','/home/cristian/Documentos/casper/js/lang.js','/home/cristian/Documentos/casper/js/locale.js','/home/cristian/Documentos/casper/js/libs-built.js']
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

var texto = xpath('//*[@data-validar="texto"]');
var numero = xpath('//*[@data-validar="numeros"]');
var largo = xpath('//*[@data-validar="maxlength"]');
var Cpass = xpath('//*[@data-validar="confirmar-password"]');

//Llenamos el formulario con errores
casper.then(function() {


    //Llena values de date, y rango
    this.sendKeys(xpath('//*[@data-validar="fecha"]'), params.fechaNacimiento);
    this.sendKeys(xpath('//*[@data-validar="rango"]'), params.rango);
    

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
        '//*[@data-validar="texto"]': "",
        '//*[@data-validar="numeros"]': "",
        '//*[@data-validar="maxlength"]': "",
        '//*[@type="email"]': "",
        '//*[@data-validar="confirmar-password"]': ""

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
        '//*[@data-validar="url"]': ""

    });

    this.sendKeys(xpath('//*[@data-validar="url"]'), "http://prueba.com");


    this.click("#Btnregistro");

    //Hacemos captura con formulario exitoso

    this.capture('screenshots/03-submit-form-corregido.jpg');
		
		


});

    //Esperamos respuesta de servidor e imprimimos.
		
casper.thenOpen("http://localhost:8080/blackbox-tests/publication/respuesta.html", function (){
	this.capture('screenshots/04-submit-form-respuesta-server.jpg');
       //      this.clear();
       //      this.echo("5s");
       //       casper.thenOpen("http://localhost:3000/respuesta.html", function() {
       //      this.capture('screenshots/04-submit-form-respuesta-server.jpg');
       // });
            this.echo('Page url is ' + this.getCurrentUrl());
            this.echo("Prueba terminada");
        

} );
            





casper.run();