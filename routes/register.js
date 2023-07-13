const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password });
    await newUser.save();

    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.redirect('/register');
  }
});

module.exports = router;
