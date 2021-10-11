const express = require('express');
const path = require('path');
const morgan  = require('morgan');
const app = express();


// Server
app.set('port', 8000);
app.set('views', path.resolve(__dirname, 'views'));
app.set('modules', path.resolve(__dirname, 'modules'));


app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Routes

app.use(require('./routes'));
app.use(require('./routes/index'));


//Publics
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use((req, res, next) => {
  res.status(404).render('404');
});

module.exports = app;
