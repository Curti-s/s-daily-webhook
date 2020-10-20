require('dotenv').config();
const axios = require('axios');

(async () => {
  try {
    const { status } = await axios.post('https://api.github.com/repos/Curti-s/s-daily/actions/workflows/deploy.yml/dispatches',
      { ref:'master' },
      { headers: {
          Accept:'application/vnd.github/v3+json',
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }
      });
    
    if(status === 204) {
      console.log('successfully triggered deploy hook w/ statusCode ', 200);
      return { statusCode:200, body:'Deploy webhook called.' }
    } else {
      throw new Error(status);
    }
  } catch(err) {
    console.log('An error occurred', err);
  }
})();
