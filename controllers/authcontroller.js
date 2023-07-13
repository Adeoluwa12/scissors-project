const bcrypt = require('bcrypt');
const { User } = require('../models/user');

module.exports.authController = {
  showLoginForm: (req, res) => {
    res.render('login');
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.render('login', {
          error: 'Invalid username or password',
          username,
        });
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.render('login', {
          error: 'Invalid username or password',
          username,
        });
      }

      // Create a session for the user
      req.session.user = user;

      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },

  showRegisterForm: (req, res) => {
    res.render('register');
  },

  register: async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    try {
      // Check if the password and confirm password match
      if (password !== confirmPassword) {
        return res.render('register', {
          error: 'Passwords do not match',
          username,
        });
      }

      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.render('register', {
          error: 'Username is already taken',
          username,
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({
        username,
        password: hashedPassword,
      });

      await user.save();

      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },

  isAuthenticated: (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    res.redirect('/login');
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  },
};
