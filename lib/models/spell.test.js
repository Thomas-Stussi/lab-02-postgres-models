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
});
