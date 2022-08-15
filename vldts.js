const tokenVldt = ((req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== 16 || typeof authorization !== 'string') {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
});

const nameVldt = ((req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
});

const ageVldt = ((req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18 || typeof age !== 'number') {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
});

const talkVldt = ((req, res, next) => {
  const { talk } = req.body;
  if (!talk || typeof talk !== 'object') {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório',
    });
  }
  next();
});

const watchedAtVldt = ((req, res, next) => {
  const { watchedAt } = req.body.talk;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAt) {
    return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  if (!watchedAt.match(dateRegex)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
});

const rateVldt = ((req, res, next) => {
  const { rate } = req.body.talk;
  if ([undefined, null, ''].includes(rate)) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
});

module.exports = { tokenVldt, nameVldt, ageVldt, talkVldt, watchedAtVldt, rateVldt };
