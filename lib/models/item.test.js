const fs = require('fs');
const Item = require('./item');
const pool = require('../utils/pool');

describe('Item model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('inserts a new Item into the database', async() => {
    const createdItem = await Item.insert({
      name: 'alchemy jug',
      type: 'wondrous',
      rarity: 'uncommon'
    });

    const { rows } = await pool.query(
      'SELECT * FROM items WHERE id = $1',
      [createdItem.id]
    );

    expect(rows[0]).toEqual(createdItem);
  });

  it('finds an item by id', async() => {
    const createdItem = await Item.insert({
      name: 'alchemy jug',
      type: 'wondrous',
      rarity: 'uncommon'
    });

    const foundItem = await Item.findById(createdItem.id);

    expect(foundItem).toEqual({
      id: createdItem.id,
      name: 'alchemy jug',
      type: 'wondrous',
      rarity: 'uncommon'
    });
  });

  it('returns null if it cant find a item by id', async() => {
    const item = await Item.findById(1234);

    expect(item).toEqual(null);
  });

  it('finds all Items', async() => {
    await Promise.all([
      Item.insert({
        name: 'alchemy jug',
        type: 'wondrous',
        rarity: 'uncommon'
      }),
      Item.insert({
        name: 'arrow of slaying',
        type: 'weapon',
        rarity: 'rare'
      }),
      Item.insert({
        name: 'sentinel shield',
        type: 'armor',
        rarity: 'uncommon'
      })
    ]);

    const items = await Item.find();

    expect(items).toEqual(expect.arrayContaining([
      { id: expect.any(String), 
        name: 'alchemy jug',
        type: 'wondrous',
        rarity: 'uncommon' },
      { id: expect.any(String), 
        name: 'arrow of slaying',
        type: 'weapon',
        rarity: 'rare' },
      { id: expect.any(String), 
        name: 'sentinel shield',
        type: 'armor',
        rarity: 'uncommon' }
    ]));
  });
});
