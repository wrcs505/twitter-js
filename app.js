const express = require( 'express' );
const routes = require('./routes');
const chalk = require('chalk')
const app = express();
const volleyball = require('volleyball')
const nunjucks = require('nunjucks')
var bodyParser = require('body-parser')
var socketio = require('socket.io');
// ...

const port = 3000
var server = app.listen(port, ()=>{
  console.log(`listening on port ${port}`)
})
var io = socketio.listen(server);


app.set('view engine', 'html'); // have res.render work with html files

app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache: true});


app.use(volleyball)
app.use(express.static('public'))
app.use(bodyParser.urlencoded())
app.use('/', routes(io));
// parse application/x-www-form-urlencoded
