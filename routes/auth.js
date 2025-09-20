const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({
      username,
      password,
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Save user session
    req.session.userId = user._id;
    // Set userId vào cookie
    res.cookie('userId', user._id.toString(), { 
      httpOnly: true,  // Không cho phép truy cập qua JavaScript
      secure: false,   // Set true khi dùng HTTPS
      maxAge: 1000 * 60 * 60, // Hết hạn sau 1 giờ
      sameSite: 'Strict' // Giúp ngăn ngừa CSRF
    });
    return res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('userId');
    res.clearCookie('connect.userId');
    res.status(200).json({ message: 'Logout successful' });
  });
});
// Protected route 
router.get('/protected', async(req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const user = await User.findById(req.session.userId).select('-password');
  res.json({ message: 'Protected content', user });
});
module.exports = router;
