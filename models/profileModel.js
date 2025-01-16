const db = require('../config/db');

class Profile {
  static async createProfile(user_id, name, contact_number, whatsapp_number, blood_group, dob, pincode, country, state, city, last_donation_date, travel_history, risky_activities, tattoos_and_piercings, social_media_handles) {
    try {
      const query = `
        INSERT INTO profiles 
        (user_id, name, contact_number, whatsapp_number, blood_group, dob, pincode, country, state, city, last_donation_date, travel_history, risky_activities, tattoos_and_piercings, social_media_handles)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const [result] = await db.execute(query, [user_id, name, contact_number, whatsapp_number, blood_group, dob, pincode, country, state, city, last_donation_date, travel_history, risky_activities, tattoos_and_piercings, social_media_handles]);
      return result.insertId;
    } catch (error) {
      throw new Error('Error creating profile: ' + error.message);
    }
  }

  static async getProfile(user_id) {
    try {
      const query = 'SELECT * FROM profiles WHERE user_id = ?';
      const [result] = await db.execute(query, [user_id]);
      return result[0]; // Returns the first (and only) profile
    } catch (error) {
      throw new Error('Error fetching profile: ' + error.message);
    }
  }

  // This function updates the user's profile in the database
  static async updateProfile(userId, data) {
    try {
      if (!Object.keys(data).length) {
        throw new Error('No fields provided for update');
      }

      const fields = [];
      const values = [];
      for (const [key, value] of Object.entries(data)) {
        fields.push(`${key} = ?`);
        values.push(value);
      }

      values.push(userId); // Add userId for WHERE clause

      const query = `
        UPDATE profiles
        SET ${fields.join(', ')}, updated_at = NOW()
        WHERE user_id = ?
      `;

      const [result] = await db.execute(query, values);
      return result.affectedRows;
    } catch (error) {
      throw new Error('Error updating profile: ' + error.message);
    }
  }
  

  

  static async deleteProfile(user_id) {
    try {
      const query = 'DELETE FROM profiles WHERE user_id = ?';
      const [result] = await db.execute(query, [user_id]);
      return result.affectedRows;
    } catch (error) {
      throw new Error('Error deleting profile: ' + error.message);
    }
  }
}

module.exports = Profile;
