const express = require('express');

const talkerSearch = express.Router();

const fs = require('fs/promises');

const talkerFile = './talker.json';

const { tokenVldt } = require('./vldts');

talkerSearch.use(tokenVldt);

talkerSearch.get('/talker/search', async (req, res) => {
  const search = req.query.q;
  const data = await fs.readFile(talkerFile, 'utf8');
  const people = JSON.parse(data);
  const result = people.filter((person) => person.name.includes(search));
  if (!search) {
    return res.status(200).json(people);
  }

  return res.status(200).json(result);
});

module.exports = { talkerSearch };
