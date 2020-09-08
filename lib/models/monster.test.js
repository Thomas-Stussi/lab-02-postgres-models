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

  it('finds an monster by id', async() => {
    const createdMonster = await Monster.insert({
      name: 'night hag',
      type: 'fiend',
      challenge: 5
    });

    const foundMonster = await Monster.findById(createdMonster.id);

    expect(foundMonster).toEqual({
      id: createdMonster.id,
      name: 'night hag',
      type: 'fiend',
      challenge: 5
    });
  });

  it('returns null if it cant find a monster by id', async() => {
    const monster = await Monster.findById(1234);

    expect(monster).toEqual(null);
  });

  it('finds all monsters', async() => {
    await Promise.all([
      Monster.insert({
        name: 'night hag',
        type: 'fiend',
        challenge: 5
      }),
      Monster.insert({
        name: 'beholder',
        type: 'aberration',
        challenge: 13
      }),
      Monster.insert({
        name: 'hobgoblin',
        type: 'humanoid',
        challenge: 2
      })
    ]);

    const monsters = await Monster.find();

    expect(monsters).toEqual(expect.arrayContaining([
      { id: expect.any(String), 
        name: 'night hag',
        type: 'fiend',
        challenge: 5 },
      { id: expect.any(String), 
        name: 'beholder',
        type: 'aberration',
        challenge: 13 },
      { id: expect.any(String), 
        name: 'hobgoblin',
        type: 'humanoid',
        challenge: 2 }
    ]));
  });
});
