'use strict';

const express = require( 'express' );
let app = express();

app.get('/', function(request, response, next){
  response.send('YOU WIN!')
});



app.listen(3000, () => console.log('listening...'));
