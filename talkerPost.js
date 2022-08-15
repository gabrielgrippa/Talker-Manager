const express = require('express');

const talkerPost = express.Router();

const fs = require('fs/promises');

const talkerFile = './talker.json';

const { tokenVldt, nameVldt, ageVldt, talkVldt, watchedAtVldt, rateVldt } = require('./vldts');

talkerPost.use(tokenVldt, nameVldt, ageVldt, talkVldt, watchedAtVldt, rateVldt);

talkerPost.post('/talker', async (req, res) => {
  const data = await fs.readFile(talkerFile, 'utf8');
  const people = JSON.parse(data);
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const newPerson = {
    id: people.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  people.push(newPerson);
  await fs.writeFile(talkerFile, JSON.stringify(people));
  
  return res.status(201).json(newPerson);
});

module.exports = { talkerPost };
