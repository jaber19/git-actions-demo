// Import the necessary modules
const request = require('supertest');
const {app, server} = require('./app'); // Import the Express app


describe('Express App', () => {
    afterAll(() => {
        server.close();  // Close the server after tests
      });
      
  // Test the greeting route
  test('GET /greet should return a greeting message', async () => {
    const res = await request(app).get('/greet');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello! Welcome to the Express app.'); 
  });

  // Test the addition route
  test('POST /add should return the sum of two numbers', async () => {
    const res = await request(app).post('/add').send({ num1: 5, num2: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ result: 8 });
  });

  test('POST /add should return an error for non-number inputs', async () => {
    const res = await request(app).post('/add').send({ num1: 'a', num2: 3 });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Both inputs must be numbers' });
  });
});
