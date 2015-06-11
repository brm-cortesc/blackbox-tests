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
    this.sendKeys(xpath('//*[@id="fechaNacimiento"]'), params.fechaNacimiento);
    this.sendKeys(xpath('//*[@id="rango"]'), params.rango);
    

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

        this.sendKeys(largo, " En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lantejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. El resto della concluían sayo de velarte, calzas de velludo para las fiestas, con sus pantuflos de lo mesmo, y los días de entresemana se honraba con su vellorí de lo más fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo con los cincuenta años; era de complexión recia, seco de carnes, enjuto de rostro, gran madrugador y amigo de la caza. Quieren decir que tenía el sobrenombre de Quijada, o Quesada, que en esto hay alguna diferencia en los autores que deste caso escriben; aunque, por conjeturas verosímiles, se deja entender que se llamaba Quejana. Pero esto importa poco a nuestro cuento; basta que en la narración dél no se salga un punto de la verdad.  ")
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
    // this.fillXPath("#Registro",{

    //     '//*[@name="nombre"]': params.nombre,
    //     '//*[@name="email"]': params.email,
    //     '//*[@name="Cpass"]': params.password,
    //     '//*[@name="tarjetaID"]': params.tarjetaID

    // },false);

    this.click("#Btnregistro");

    //Hacemos captura con formulario exitoso

    this.capture('screenshots/03-submit-form-success.jpg');
});

casper.run();