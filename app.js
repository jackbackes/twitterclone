'use strict';

const express = require( 'express' );
const chk = require('chalk');
const morgan = require('morgan');
let app = express();
var swig = require('swig');
var bp = require('body-parser');


//CONFIGURE SWIG
var template = swig.compileFile('./views/index.html');
// console.log(template({article: { title: 'Swig is fun' }}));
swig.setDefaults({
  cache: false
});

//CONFIGURE APP
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
// body parser
app.use(bp.json());
app.use(bp.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// app.use('/', routes)
var routes = require('./routes/');
app.use('/', routes)
app.use(express.static('public'));
app.use('/', logger)

//ROUTES


//
// pblc.use('/public/',function(request, response, next){
//   console.log(request.path);
//   response.sendFile(request.path);
// });




function message(aString, color) {
  console.log(chk[color](aString));
}

// app.use(morgan('dev'), function(request, response, next){
//   next();
// })

function logger(request, response, next) {
    var chalkColor = 'green'
    if(request.method === 'POST') chalkColor = 'red'
    message(request.method + ': ' + request.path + ' ' + response.statusCode, chalkColor);
    next();
}





app.listen(3000, () => console.log('listening...'));
