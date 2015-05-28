var url = "http://localhost:3000/registro-base.html"

var casper = require('casper').create();
var xpath = require('casper').selectXPath;


//Abrimos el html donde está el formulario
casper.start('http://localhost:3000/registro-base.html', function() {

   require("utils").dump(this.getElementInfo('#nombre'));



});

casper.run();