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

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM items WHERE id = $1',
        [id]
      );
        
      if(!rows[0]) return null;
      else return new Item(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM items'
      );
  
      return rows.map(row => new Item(row));
    }

    static async update(id, updatedItem) {
      const { rows } = await pool.query(
        `UPDATE items
               SET name=$1,
                   type=$2,
                   rarity=$3
               WHERE id = $4
               RETURNING *`,
        [updatedItem.name, updatedItem.type, updatedItem.rarity, id]
      );
        
      return new Item(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM items WHERE id = $1 RETURNING *',
        [id]
      );
        
      return new Item(rows[0]);
    }
}

module.exports = Item;
