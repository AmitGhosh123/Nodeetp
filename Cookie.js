var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function(req, res) {
  res.send(
    '<html>' +
      '<body>' +
      '<form method="POST">' +
      'First Name: <input type="text" name="first_name">  <br>' +
      'Last Name: <input type="text" name="last_name">  <br>' +
      '<button type="submit" formaction="/set">Set cookie</button>' +
      '<button type="submit" formaction="/get">Get cookie</button>' +
      '<button type="submit" formaction="/delete">Delete cookie</button>' +
      '</form>' +
      '</body>' +
      '</html>'
  );
});

app.post('/set', function(req, res) {
  res.cookie('data', req.body);
  res.send('cookie set');
});

app.post('/get', function(req, res) {
  console.log(req.cookies);
  res.send(req.cookies);
});

app.post('/delete', function(req, res) {
  res.clearCookie('data');
  res.send('Cookie has been deleted');
});

app.listen(3200);
