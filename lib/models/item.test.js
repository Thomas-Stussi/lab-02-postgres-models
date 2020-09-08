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
});

