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

  it('finds a skill by id', async() => {
    const createdSkill = await Skill.insert({
      name: 'persuasion',
      ability: 'charisma'
    });

    const foundSkill = await Skill.findById(createdSkill.id);

    expect(foundSkill).toEqual({
      id: createdSkill.id,
      name: 'persuasion',
      ability: 'charisma'
    });
  });

  it('returns null if it cant find a Skill by id', async() => {
    const skill = await Skill.findById(1234);

    expect(skill).toEqual(null);
  });

  it('finds all skills', async() => {
    await Promise.all([
      Skill.insert({
        name: 'persuasion',
        ability: 'charisma'
      }),
      Skill.insert({
        name: 'athletics',
        ability: 'strength'
      }),
      Skill.insert({
        name: 'history',
        ability: 'intelligence'
      })
    ]);

    const skills = await Skill.find();

    expect(skills).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'persuasion', ability: 'charisma' },
      { id: expect.any(String), name: 'athletics', ability: 'strength' },
      { id: expect.any(String), name: 'history', ability: 'intelligence' }
    ]));
  });
});
