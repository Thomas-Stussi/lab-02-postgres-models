const fs = require('fs');
const Skill = require('./skill');
const pool = require('../utils/pool');

describe('Skill model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('inserts a new skill into the database', async() => {
    const createdSkill = await Skill.insert({
      name: 'persuasion',
      ability: 'charisma'
    });

    const { rows } = await pool.query(
      'SELECT * FROM skills WHERE id = $1',
      [createdSkill.id]
    );

    expect(rows[0]).toEqual(createdSkill);
  });
});
