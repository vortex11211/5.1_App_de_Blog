import request from "supertest";
import { describe, test, expect, afterAll } from '@jest/globals';
import App from '../infrastructure/app';

const app = new App().app;
const server = app.listen(3000);

afterAll(async () => {
  server.close();
});

describe('POST /api/users/register', () => {
  it('should register a new simpleUser successfully', async () => {
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

  it('should return error for existing email', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser2',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'simpleUser'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User with this email already exists.');
  });

  it('should return error for existing username', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'testuser2@example.com',
        password: 'password123',
        role: 'simpleUser'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User with this username already exists.');
  });

  it('should return error for invalid admin key', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'adminuser',
        email: 'adminuser@example.com',
        password: 'password123',
        role: 'admin',
        adminKey: 'wrong_admin_key'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid admin Key');
  });

});
