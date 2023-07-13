const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const { urlController } = require('./controllers/urlcontroller');
const { authController } = require('./controllers/authcontroller');


const app = express();



// Connect to MongoDB
mongoose.connect('mongodb+srv://Adeoluwa123:09014078564Feranmi@cluster0.r8sg61r.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Middleware
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'myappsecret',
    resave: false,
    saveUninitialized: true,
  })
 );





// const registerRoutes = require('./routes/register');
// const loginRoutes = require('./routes/login');
// const logoutRoutes = require('./routes/login');
// const dashboardRoutes = require('./routes/dashboard');

// app.use('/register', registerRoutes);
// app.use('/login', loginRoutes);
// app.use('/logout', logoutRoutes);
// app.use('/dashboard', dashboardRoutes);













// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', authController.isAuthenticated, urlController.getUrls);


app.get('/login', authController.showLoginForm);

app.post('/login', authController.login);

app.get('/register', authController.showRegisterForm);

app.post('/register', authController.register);

app.get('/logout', authController.logout);

app.get('/dashboard/new', authController.isAuthenticated, (req, res) => {
  res.render('new');
});
app.get('/clicks', urlController.getUrlClicks, (req, res) => {
  res.render('clicks');
});

app.post('/dashboard/new/shorten', authController.isAuthenticated, urlController.createShortUrl);



  //server
  const PORT = 9000
  app.listen((9000), () => {
      console.log(`YOU ARE LISTENING TO PORT ${PORT}`)
  })





