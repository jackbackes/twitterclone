'use strict';

const express = require( 'express' );
const chk = require('chalk');
const morgan = require('morgan');
let app = express();

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
}

app.get('/', function(request, response, next){
  response.send('YOU WIN!');
  logger(request, response, next);
});

app.post('/', function(request, response, next){
  response.status(404).send('NOPE');
  logger(request, response, next);
})



app.listen(3000, () => console.log('listening...'));
