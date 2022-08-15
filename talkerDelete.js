const express = require('express');

const talkerDelete = express.Router();

const fs = require('fs/promises');

const talkerFile = './talker.json';

const { tokenVldt } = require('./vldts');

talkerDelete.use(tokenVldt);

talkerDelete.delete('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile(talkerFile, 'utf8');
  const people = JSON.parse(data);
  const personToBeDeleted = people.find((person) => person.id === Number(id));
  if (!personToBeDeleted) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  people.splice(id - 1, 1);

  await fs.writeFile(talkerFile, JSON.stringify(people));

  return res.status(204).json();
});

module.exports = { talkerDelete };
