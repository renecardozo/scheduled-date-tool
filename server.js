var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 8080;
var path = __dirname + '/public';
app.use(express.static(path));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(methodOverride());


app.get('/', function(req, res) {
  res.sendfile(path +'/index.html');
});
app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
})