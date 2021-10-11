
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;
const path = require('path');
const fileUpload = require('express-fileupload');
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


app.use(cookieParser('ultra secret'));
app.use(session({
  secret: 'ultra secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(function(username,password,done){
  if(username === "Luis" && password === "luisprime1")
  return done(null,{id: 1, name: "Luis"});

  done(null, false);
}));

passport.serializeUser(function(user,done){
  done(null,user.id);
});

passport.deserializeUser(function(id,done){
  done(null, { id: 1, name: "Luis"});
});


app.get("/tablero", (req, res,next) => { 
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
},(req, res)=>{
  res.redirect('/tablero');
});

app.get("/login", (req, res)=>{
    res.render('login');
  });


app.post("/login", passport.authenticate('local',{
  successRedirect: "/tablero",
  failureRedirect: "/login"
}));

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
