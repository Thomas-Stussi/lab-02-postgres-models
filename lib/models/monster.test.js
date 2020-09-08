const fs = require('fs');
const Monster = require('./monster');
const pool = require('../utils/pool');

describe('Monster model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('inserts a new monster into the database', async() => {
    const createdMonster = await Monster.insert({
      name: 'night hag',
      type: 'fiend',
      challenge: 5
    });

    const { rows } = await pool.query(
      'SELECT * FROM monsters WHERE id = $1',
      [createdMonster.id]
    );

    expect(rows[0]).toEqual(createdMonster);
  });

});
