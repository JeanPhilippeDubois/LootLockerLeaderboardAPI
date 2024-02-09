const axios = require('axios');

async function checkLootLockerSession(session_id) {
  try {
    const lootLockerApiUrl = 'https://api.lootlocker.io/game/v1/player/info';

    const headers = {
      'x-session-token': session_id,
    };

    const response = await axios.get(lootLockerApiUrl, { headers });

    // Do something with the response
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
function apiKeyCheck_middleware(req, res, next) {
    const apiKey = req.headers['x-api-key'];
  
    // Replace 'your_api_key_here' with your actual API key
    if (apiKey !== 'your_api_key_here') {
      return res.status(401).json({ error: 'Unauthorized. Invalid API key.' });
    }
  
    next();
  }
  
module.exports = {
    checkLootLockerSession,
    apiKeyCheck
  };