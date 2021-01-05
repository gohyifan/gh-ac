const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/search', async(req, res) => {
  try {
    const response = await axios.get("https://api.github.com/search/repositories?q=");
    const arr = response.data.items.slice(0, 5);
    const res_array = [];
    arr.forEach((repo) => {
      res_array.push({
        'title': repo.name,
        'description': repo.description
      })
    })
    res.status(200).json(res_array);
  } catch (e) {
    console.log(e.response.status);
    console.log(e.response.statusText);
    const statusCode = e.response.status;
    const statusText = e.response.statusText;
    res.status(statusCode).send(statusText);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
