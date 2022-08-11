const express = require('express');

const talker = express.Router();

const fs = require('fs/promises');

const talkerFile = './talker.json';

talker.get('/talker', async (_req, res) => {
  const data = await fs.readFile(talkerFile, 'utf8');
  const result = JSON.parse(data);
  return res.status(200).json(result);
});

module.exports = { talker };
