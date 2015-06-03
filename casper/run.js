var url = "http://localhost:3000/registro-base.html"

var casper = require('casper').create();
// var xpath = require('casper').selectXPath;


var casper = require("casper").create();

casper.echo("Casper CLI passed args:");
require("utils").dump(casper.cli.args);

casper.echo("Casper CLI passed options:");
require("utils").dump(casper.cli.options);

casper.exit();