const express = require('express');

const talkerPut = express.Router();

const fs = require('fs/promises');

const talkerFile = './talker.json';

const { tokenVldt, nameVldt, ageVldt, talkVldt, watchedAtVldt, rateVldt } = require('./vldts');

talkerPut.use(tokenVldt, nameVldt, ageVldt, talkVldt, watchedAtVldt, rateVldt);

talkerPut.put('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const newPerson = req.body;
  const data = await fs.readFile(talkerFile, 'utf8');
  const people = JSON.parse(data);
  const oldPerson = people.find((person) => person.id === Number(id));
  if (!oldPerson) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  oldPerson.name = newPerson.name;
  oldPerson.age = newPerson.age;
  oldPerson.talk = newPerson.talk;

  await fs.writeFile(talkerFile, JSON.stringify(people));

  return res.status(200).json(oldPerson);
});

module.exports = { talkerPut };
