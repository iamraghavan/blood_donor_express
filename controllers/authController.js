const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db = require('../config/db'); // Database connection
const nodemailer = require('nodemailer'); // Email service

// Send Reset Password Email
exports.sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await db.execute(query, [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const user = rows[0];
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(resetToken, 10);
    const tokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

    const updateQuery = `UPDATE users SET reset_token = ?, token_expiry = ? WHERE email = ?`;
    await db.execute(updateQuery, [hashedToken, tokenExpiry, email]);

    const resetLink = `${req.protocol}://${req.get('host')}/api/auth/reset-password?token=${resetToken}&email=${email}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'socialmedia.bmbuilders@gmail.com',
        pass: 'xosq imlk cyek iedo',
      },
    });

    await transporter.sendMail({
      from: 'raghavanofficials@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
    });

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending reset email: ' + error.message });
  }
};

// Render Reset Password Page
exports.renderResetPasswordPage = (req, res) => {
  const { token, email } = req.query;

  if (!token || !email) {
    return res.status(400).send('Invalid request. Token and email are required.');
  }

  res.render('resetPassword', { token, email });
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await db.execute(query, [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const user = rows[0];

    if (!user.reset_token || !user.token_expiry) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const isTokenValid = await bcrypt.compare(token, user.reset_token);
    if (!isTokenValid || new Date(user.token_expiry) < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateQuery = `UPDATE users SET password = ?, reset_token = NULL, token_expiry = NULL WHERE email = ?`;
    await db.execute(updateQuery, [hashedPassword, email]);

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password: ' + error.message });
  }
};
