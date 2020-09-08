const fs = require('fs');
const Character = require('./character');
const pool = require('../utils/pool');

describe('Character model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  
  it('inserts an new character into the database', async() => {
    const createdCharacter = await Character.insert({
      name: 'grog',
      level: 20,
      class: 'barbarian',
      race: 'goliath'
    });
  
    const { rows } = await pool.query(
      'SELECT * FROM characters WHERE id = $1',
      [createdCharacter.id]
    );
  
    expect(rows[0]).toEqual(createdCharacter);
  });

  it('finds a character by id', async() => {
    const createdCharacter = await Character.insert({
      name: 'grog',
      level: 20,
      class: 'barbarian',
      race: 'goliath'
    });

    const foundCharacter = await Character.findById(createdCharacter.id);

    expect(foundCharacter).toEqual({
      id: createdCharacter.id,
      name: 'grog',
      level: 20,
      class: 'barbarian',
      race: 'goliath'
    });
  });
});
