const pool = require('../utils/pool');

class Skill {
    id;
    name;
    ability;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.ability = row.ability;
    }

    static async insert(skill) {
      const { rows } = await pool.query(
        'INSERT INTO skills (name, ability) VALUES ($1, $2) RETURNING *',
        [skill.name, skill.ability]
      );
  
      return new Skill(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM skills WHERE id = $1',
        [id]
      );
      
      if(!rows[0]) return null;
      else return new Skill(rows[0]);
    }
}

module.exports = Skill;
