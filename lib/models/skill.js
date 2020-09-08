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

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM skills'
      );

      return rows.map(row => new Skill(row));
    }

    static async update(id, updatedSkill) {
      const { rows } = await pool.query(
        `UPDATE skills
             SET name=$1,
                 ability=$2
             WHERE id = $3
             RETURNING *`,
        [updatedSkill.name, updatedSkill.ability, id]
      );
      
      return new Skill(rows[0]);
    }
}

module.exports = Skill;
