const pool = require('../utils/pool');

class Monster {
    id;
    name;
    type;
    challenge;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.type = row.type;
      this.challenge = row.challenge;
    }

    static async insert(monster) {
      const { rows } = await pool.query(
        'INSERT INTO monsters (name, type, challenge) VALUES ($1, $2, $3) RETURNING *',
        [monster.name, monster.type, monster.challenge]
      );
      
      return new Monster(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM monsters WHERE id = $1',
        [id]
      );
          
      if(!rows[0]) return null;
      else return new Monster(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM monsters'
      );
    
      return rows.map(row => new Monster(row));
    }

    static async update(id, updatedMonster) {
      const { rows } = await pool.query(
        `UPDATE monsters
                 SET name=$1,
                     type=$2,
                     challenge=$3
                 WHERE id = $4
                 RETURNING *`,
        [updatedMonster.name, updatedMonster.type, updatedMonster.challenge, id]
      );
          
      return new Monster(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM monsters WHERE id = $1 RETURNING *',
        [id]
      );
          
      return new Monster(rows[0]);
    }
}

module.exports = Monster;
