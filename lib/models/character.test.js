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

  it('returns null if it cant find a character by id', async() => {
    const character = await Character.findById(1234);

    expect(character).toEqual(null);
  });

  it('finds all characters', async() => {
    await Promise.all([
      Character.insert({
        name: 'grog',
        level: 20,
        class: 'barbarian',
        race: 'goliath'
      }),
      Character.insert({
        name: 'keyleth',
        level: 20,
        class: 'druid',
        race: 'half-elf'
      }),
      Character.insert({
        name: 'scanlan',
        level: 20,
        class: 'bard',
        race: 'gnome'
      })
    ]);

    const characters = await Character.find();

    expect(characters).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'grog', level: 20, class: 'barbarian', race: 'goliath' },
      { id: expect.any(String), name: 'keyleth', level: 20, class: 'druid', race: 'half-elf' },
      { id: expect.any(String), name: 'scanlan', level: 20, class: 'bard', race: 'gnome' }
    ]));
  });

  it('updates a row by id', async() => {
    const createdCharacter = await Character.insert({
      name: 'grog',
      level: 20,
      class: 'barbarian',
      race: 'goliath'
    });

    const updatedCharacter = await Character.update(createdCharacter.id, {
      name: 'keyleth',
      level: 20,
      class: 'druid',
      race: 'half-elf'
    });

    expect(updatedCharacter).toEqual({
      id: createdCharacter.id,
      name: 'keyleth',
      level: 20,
      class: 'druid',
      race: 'half-elf'
    });
  });

  it('deletes a row by id', async() => {
    const createdCharacter = await Character.insert({
      name: 'grog',
      level: 20,
      class: 'barbarian',
      race: 'goliath'
    });

    const deletedCharacter = await Character.delete(createdCharacter.id);

    expect(deletedCharacter).toEqual({
      id: createdCharacter.id,
      name: 'grog',
      level: 20,
      class: 'barbarian',
      race: 'goliath'
    });
  });
});
