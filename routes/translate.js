var utils = require('../utils');
var request = require("request");

let langTranslate = "http://api.microsofttranslator.com/V2/Ajax.svc/Translate?appId=ABB1C5A823DC3B7B1D5F4BDB886ED308B50D1919"; //&from=en&to=ru&text=hello%3Cb%3E";
let langDetect = "http://translator.imtranslator.net/translator/detect.asp?k=32348493&text=";

module.exports = function (app) {
    var data = encodeURIComponent(req.query.text);

    app.get('/translate/check', function (req, res) {
        request(langDetect+data,function(err,response,body){
            return res.json({"result" : body });
        });
    });

    app.get('/translate/convert', function (req, res) {
        var data =  encodeURIComponent(req.query.data);
        console.log(langTranslate + "&from=" + req.query.lang + "&to=ko&text=" + data);
        request(langTranslate + "&from=" + req.query.lang + "&to=ko&text=" + data,function(err,response,body){
            return res.json({"result" : body });
        });
    });

}