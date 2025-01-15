module.exports = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    
    if (!apiKey) {
      return res.status(403).json({ message: 'API key missing' });
    }
  
    // Retrieve the valid API key from environment variables
    const validApiKey = process.env.API_KEY; // Load securely from environment variables
    if (apiKey !== validApiKey) {
      return res.status(403).json({ message: 'Invalid API key' });
    }
  
    next();
  };
  