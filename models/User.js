const db = require('../config/db');

exports.findByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await db.execute(query, [email]);
  return rows[0];
};

exports.updateResetToken = async (email, token, expiry) => {
  const query = `UPDATE users SET reset_token = ?, token_expiry = ? WHERE email = ?`;
  await db.execute(query, [token, expiry, email]);
};

exports.updatePassword = async (email, password) => {
  const query = `UPDATE users SET password = ?, reset_token = NULL, token_expiry = NULL WHERE email = ?`;
  await db.execute(query, [password, email]);
};
