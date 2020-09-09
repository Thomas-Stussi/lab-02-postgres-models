const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Spell = require('../lib/models/spell');

describe('Spell routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('create a new spell via POST', async() => {
    const response = await request(app)
      .post('/api/v1/spells')
      .send({ name: 'magic missile', school: 'evocation', level: 1 });

    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'magic missile', 
      school: 'evocation', 
      level: 1
    });
  });

  it('deletes a spell by id via DELETE', async() => {
    const createdSpell = await Spell.insert({
      name: 'magic missile', 
      school: 'evocation', 
      level: 1
    });

    const response = await request(app)
      .delete(`/api/v1/spells/${createdSpell.id}`);

    expect(response.body).toEqual({
      id: createdSpell.id,
      name: 'magic missile', 
      school: 'evocation', 
      level: 1
    });
  });

  it('fetches a spell by id with GET', async() => {
    const createdSpell = await Spell.insert({
      name: 'magic missile', 
      school: 'evocation', 
      level: 1
    });

    const response = await request(app)
      .get(`/api/v1/spells/${createdSpell.id}`);

    expect(response.body).toEqual({
      id: createdSpell.id,
      name: 'magic missile', 
      school: 'evocation', 
      level: 1
    });
  });

  it('updates a spell by id with PUT', async() => {
    const createdSpell = await Spell.insert({
      name: 'magic missile', 
      school: 'evocation', 
      level: 1
    });

    const response = await request(app)
      .put(`/api/v1/spells/${createdSpell.id}`)
      .send({ name: 'wish', school: 'conjuration', level: 9 });

    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'wish',
      school: 'conjuration',
      level: 9
    });
  });
});
