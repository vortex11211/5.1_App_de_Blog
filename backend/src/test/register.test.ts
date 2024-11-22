import request from "supertest";
import { describe, test, expect, afterAll } from '@jest/globals';
import App from '../infrastructure/app';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import prisma from "../infrastructure/repositories/prismaClient";
import jwt from 'jsonwebtoken';

dotenv.config({ path: '../../.env' });


const app = new App().app;
const server = app.listen(3000);

beforeAll(async () => {

  const hashedPassword = await bcrypt.hash('password123', 10);
  await prisma.user.create({
    data: {
      username: 'banneduser',
      email: 'banneduser@example.com',
      password: hashedPassword,
      role: 'simpleUser',
      banned: true
    }
  });
});

afterAll(async () => {
  server.close();
});

// REGISTER
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

  test('should register a new admin successfully', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'adminUser',
        email: 'adminuser@example.com',
        password: 'password123',
        role: 'admin',
        adminKey: process.env.ADMIN_KEY
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  test('should return error for invalid admin key', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'adminuser2',
        email: 'adminuser2@example.com',
        password: 'password123',
        role: 'admin',
        adminKey: 'wrongAdminKey'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid admin Key');
  });

});
//LOGIN
describe('POST /api/users/login', () => {
  test('should login successfully with valid credentials', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();

    const token = response.body.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    expect(decodedToken).toHaveProperty('userId');
    expect(decodedToken).toHaveProperty('userRole');
  });


  test('should return error for invalid email', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'invalidemail@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email');
  });

  test('should return error for invalid password', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid password');
  });

  test('should return error for banned account', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'banneduser@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Your account is banned.');
  });
});

// post Publication

describe('POST /api/publications/publication', () => {

  test('should create a new publication successfully', async () => {
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    const token = loginResponse.body.token;
    const response = await request(app)
      .post('/api/publications/publication')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Publication',
        content: 'Content of the new publication'
      });

    expect(response.status).toBe(201);
    expect(response.body.publication).toHaveProperty('props');
    expect(response.body.publication.props).toHaveProperty('title', 'New Publication');
    expect(response.body.publication.props).toHaveProperty('content', 'Content of the new publication');
    expect(response.body.publication.props).toHaveProperty('authorId', 2);
  });

  test('should return error for missing title', async () => {
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    const token = loginResponse.body.token;

    const response = await request(app)
      .post('/api/publications/publication')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'Content of the new publication without title'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Title is required');
  });

  test('should return error for missing content', async () => {
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    const token = loginResponse.body.token;

    const response = await request(app)
      .post('/api/publications/publication')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Publication without content'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Content is required');
  });
});


