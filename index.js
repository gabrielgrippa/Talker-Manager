const express = require('express');
const bodyParser = require('body-parser');

const { talker } = require('./talker');
const { talkerId } = require('./talkerId');
const { login } = require('./login');
const { talkerPost } = require('./talkerPost');
const { talkerPut } = require('./talkerPut');
const { talkerDelete } = require('./talkerDelete');
const { talkerSearch } = require('./talkerSearch');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talker);
app.get('/talker/search', talkerSearch);
app.get('/talker/:id', talkerId);
app.post('/login', login);
app.post('/talker', talkerPost);
app.put('/talker/:id', talkerPut);
app.delete('/talker/:id', talkerDelete);
app.listen(PORT, () => {
  console.log('Online');
});
