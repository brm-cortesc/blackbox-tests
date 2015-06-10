// var url = "http://localhost:3000/registro-base.html"

// var casper = require('casper').create();
// // var xpath = require('casper').selectXPath;


// var casper = require("casper").create();

// casper.echo("Casper CLI passed args:");
// require("utils").dump(casper.cli.args);

// casper.echo("Casper CLI passed options:");
// require("utils").dump(casper.cli.options);

// casper.exit();


var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});

var links = {
    'http://edition.cnn.com/': 0,
    'http://www.nytimes.com/': 0,
    'http://www.bbc.co.uk/': 0,
    'http://www.guardian.co.uk/': 0
};

casper.countLinks = function() {
    return this.evaluate(function() {
        return __utils__.findAll('a[href]').length;
    });
};

casper.renderJSON = function(what) {
    return this.echo(JSON.stringify(what, null, '  '));
};

casper.start();

casper.each(Object.keys(links), function(casper, link) {
    this.thenOpen(link, function() {
        links[link] = this.countLinks();
    });
});

casper.run(function() {
    this.renderJSON(links).exit();
});