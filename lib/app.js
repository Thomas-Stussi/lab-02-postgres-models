const express = require('express');
const app = express();
const Spell = require('./models/spell');

app.use(express.json());

app.post('/api/v1/spells', async(req, res, next) => {
  try {
    const createdSpell = await Spell.insert(req.body);
    res.send(createdSpell);
  } catch(error) {
    next(error);
  }
});

app.delete('/api/v1/spells/:id', async(req, res, next) => {
  try {
    const deletedSpell = await Spell.delete(req.params.id);
    res.send(deletedSpell);
  } catch(error) {
    next(error);
  }
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
