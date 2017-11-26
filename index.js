const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('public/index.html');
});

app.listen(process.env.PORT || 8080, function() {
  console.log('App listening on assigned port!');
});
