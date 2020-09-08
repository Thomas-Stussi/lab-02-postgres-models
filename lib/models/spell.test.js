const fs = require('fs');
const Spell = require('./spell');
const pool = require('../utils/pool');

describe('Spell model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('insert a new spell into the database', async() => {
    const createdSpell = await Spell.insert({
      name: 'magic missile',
      school: 'evocation',
      level: 1
    });

    const { rows } = await pool.query(
      'SELECT * FROM spells WHERE id = $1',
      [createdSpell.id]
    );

    expect(rows[0]).toEqual(createdSpell);
  });

  it('finds a spell by id', async() => {
    const createdSpell = await Spell.insert({
      name: 'magic missile',
      school: 'evocation',
      level: 1
    });

    const foundSpell = await Spell.findById(createdSpell.id);

    expect(foundSpell).toEqual({
      id: createdSpell.id,
      name: 'magic missile',
      school: 'evocation',
      level: 1
    });
  });

  it('returns null if it cant find a Spell by id', async() => {
    const spell = await Spell.findById(1234);

    expect(spell).toEqual(null);
  });

});
