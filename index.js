require('dotenv').config();

const axios = require('axios');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4567;

app.get('/', (req, res) => {
  const handler = async () => {
    try {
      const { status } = await axios.post('https://api.github.com/repos/Curti-s/s-daily/actions/workflows/deploy.yml/dispatches',
        { ref:'master' },
        { headers: {
            Accept:'application/vnd.github/v3+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }
        });

      if(status === 204) {
        res.send(`successfully triggered deploy hook w/ statusCode:${status}`)
      } else {
        throw new Error(status);
      }
    } catch(err) {
      res.send(`An error occurred ${err.mesage}`);
    }
  };
  handler();
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
