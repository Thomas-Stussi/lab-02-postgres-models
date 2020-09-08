const pool = require('../utils/pool');

class Spell {
    id;
    name;
    school;
    level;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.school = row.school;
      this.level = row.level;
    }

    static async insert(spell) {
      const { rows } = await pool.query(
        'INSERT INTO spells (name, school, level) VALUES ($1, $2, $3) RETURNING *',
        [spell.name, spell.school, spell.level]
      );

      return new Spell(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM spells WHERE id = $1',
        [id]
      );
    
      if(!rows[0]) return null;
      else return new Spell(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM spells'
      );
    
      return rows.map(row => new Spell(row));
    }

    static async update(id, updatedSpell) {
      const { rows } = await pool.query(
        `UPDATE spells
           SET name=$1,
               school=$2,
               level=$3
           WHERE id = $4
           RETURNING *`,
        [updatedSpell.name, updatedSpell.school, updatedSpell.level, id]
      );
    
      return new Spell(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM spells WHERE id = $1 RETURNING *',
        [id]
      );
    
      return new Spell(rows[0]);
    }
}

module.exports = Spell;
