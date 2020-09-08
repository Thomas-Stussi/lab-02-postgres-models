const pool = require('../utils/pool');

class Item {
    id;
    name;
    type;
    rarity;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.type = row.type;
      this.rarity = row.rarity;
    }

    static async insert(item) {
      const { rows } = await pool.query(
        'INSERT INTO items (name, type, rarity) VALUES ($1, $2, $3) RETURNING *',
        [item.name, item.type, item.rarity]
      );
    
      return new Item(rows[0]);
    }
}

module.exports = Item;
