const Profile = require('../models/profileModel');

exports.createProfile = async (req, res) => {
  const { user_id, name, contact_number, whatsapp_number, blood_group, dob, pincode, country, state, city, last_donation_date, travel_history, risky_activities, tattoos_and_piercings, social_media_handles } = req.body;

  try {
    const profileId = await Profile.createProfile(user_id, name, contact_number, whatsapp_number, blood_group, dob, pincode, country, state, city, last_donation_date, travel_history, risky_activities, tattoos_and_piercings, social_media_handles);
    res.status(201).json({ message: 'Profile created successfully', profileId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  const { user_id } = req.params;

  try {
    const profile = await Profile.getProfile(user_id);
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  // Express route to handle profile updates

  exports.updateProfile = async (req, res) => {
    const { user_id } = req.params;
    const data = req.body;
  
    console.log('Update request received for user_id:', user_id, 'with data:', data);
  
    try {
      if (!Object.keys(data).length) {
        return res.status(400).json({ message: 'No fields provided for update' });
      }
  
      const affectedRows = await Profile.updateProfile(user_id, data);
  
      if (affectedRows > 0) {
        res.status(200).json({ message: 'Profile updated successfully' });
      } else {
        res.status(404).json({ message: 'Profile not found' });
      }
    } catch (error) {
      console.error('Error:', error.message); // Log the error
      res.status(500).json({ message: 'Error updating profile: ' + error.message });
    }
  };
  
  

exports.deleteProfile = async (req, res) => {
  const { user_id } = req.params;

  try {
    const deletedRows = await Profile.deleteProfile(user_id);
    if (deletedRows > 0) {
      res.status(200).json({ message: 'Profile deleted successfully' });
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
