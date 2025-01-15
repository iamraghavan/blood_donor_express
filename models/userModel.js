const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async generateUserId() {
    try {
      const query = `SELECT MAX(CAST(SUBSTRING(user_id, 3) AS UNSIGNED)) AS max_id FROM users WHERE user_id LIKE 'BD%'`;
      const [rows] = await db.execute(query);
      const maxId = rows[0].max_id || 0;
      const newId = `BD${(maxId + 1).toString().padStart(5, '0')}`;
      return newId;
    } catch (error) {
      throw new Error('Error generating user_id: ' + error.message);
    }
  }

  static async register({ name, email, phone, password, dob, bloodGroup, pincode, country, state, city }) {
    try {
      const userId = await User.generateUserId();
      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `INSERT INTO users (user_id, name, email, phone, password, dob, blood_group, pincode, country, state, city) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const [result] = await db.execute(query, [userId, name, email, phone, hashedPassword, dob, bloodGroup, pincode, country, state, city]);

      // Create a profile entry after user registration
      const profileQuery = `INSERT INTO profiles (user_id, name) VALUES (?, ?)`;
      await db.execute(profileQuery, [userId, name]);

      return result.insertId;
    } catch (error) {
      throw new Error('Error registering user: ' + error.message);
    }
  }

  static async login({ email, phone, password }) {
    try {
      const query = `SELECT * FROM users WHERE email = ? OR phone = ?`;
      const [rows] = await db.execute(query, [email, phone]);

      if (rows.length === 0) {
        throw new Error('User not found');
      }

      const user = rows[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Invalid credentials');
      }

      return user;
    } catch (error) {
      throw new Error('Error logging in user: ' + error.message);
    }
  }
}

module.exports = User;
