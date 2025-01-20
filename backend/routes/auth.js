const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, surname, accountNumber, personalCode, passportPhoto, password } = req.body;
  try {
    const existingUser = await User.findOne({ personalCode });
    if (existingUser) return res.status(400).json({ msg: 'Asmens kodas jau egzistuoja' });

    const newUser = new User({
      name,
      surname,
      accountNumber,
      personalCode,
      passportPhoto,
      password,
    });

    await newUser.save();
    res.status(201).json({ msg: 'Vartotojas sėkmingai užregistruotas' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { personalCode, password } = req.body;
  try {
    const user = await User.findOne({ personalCode });
    if (!user) return res.status(400).json({ msg: 'Vartotojas nerastas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Neteisingas slaptažodis' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
