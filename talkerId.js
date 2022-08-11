const express = require('express');

const talkerId = express.Router();

const fs = require('fs/promises');

const talkerFile = './talker.json';

talkerId.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile(talkerFile, 'utf8');
  const people = JSON.parse(data);
  const result = people.find((person) => person.id === Number(id));
  if (!result) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(200).json(result);
});

module.exports = { talkerId };
