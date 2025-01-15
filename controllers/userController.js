const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register user
exports.register = async (req, res) => {
  const { name, email, phone, password, dob, bloodGroup, pincode, country, state, city } = req.body;

  try {
    const userId = await User.register({ name, email, phone, password, dob, bloodGroup, pincode, country, state, city });

    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, phone, password } = req.body;

  if (!email && !phone) {
    return res.status(400).json({ message: 'Email or phone is required' });
  }
  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const user = await User.login({ email, phone, password });
    const token = jwt.sign({ userId: user.id }, 'SECRET_KEY', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        blood_group: user.blood_group,
        pincode: user.pincode,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
