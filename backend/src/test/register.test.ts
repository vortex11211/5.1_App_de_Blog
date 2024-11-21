import request from "supertest";
import { describe, expect, afterAll } from '@jest/globals';
import App from '../infrastructure/app';

const app = new App().app;
const server = app.listen(3000);

afterAll(async () => {
  server.close();
});

describe('POST /api/users/register', () => {
  test('should register a new simpleUser successfully', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'simpleUser'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  test('should return 409 for existing email', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser2',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'simpleUser'
      });

    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser3',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'simpleUser'
      });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('User with this email already exists.');
  });

  test('should return 409 for existing username', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'testuser2@example.com',
        password: 'password123',
        role: 'simpleUser'
      });

    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'testuser3@example.com',
        password: 'password123',
        role: 'simpleUser'
      });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('User with this username already exists.');
  });
});
