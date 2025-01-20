jest.setTimeout(15000); // Padidina timeout iki 10 sekundžių

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Account = require('../src/models/Account');

// Prieš testus prijunkite testinę MongoDB bazę
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/virtual-bank', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Po testų išvalykite duomenis ir uždarykite DB
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Account API', () => {
  it('should create a new account', async () => {
    const res = await request(app)
      .post('/api/accounts/create')
      .send({
        ownerName: 'Jonas',
        ownerSurname: 'Jonaitis',
        personalCode: '12345678901',
        passportImage: 'dummy.jpg',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('ibanNumber');
    expect(res.body.ownerName).toBe('Jonas');
    expect(res.body.ownerSurname).toBe('Jonaitis');
  });

  it('should not allow creating an account with duplicate personal code', async () => {
    const res = await request(app)
      .post('/api/accounts/create')
      .send({
        ownerName: 'Jonas',
        ownerSurname: 'Jonaitis',
        personalCode: '12345678901',
        passportImage: 'dummy.jpg',
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Account with this personal code already exists');
  });
});
