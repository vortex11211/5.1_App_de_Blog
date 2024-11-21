import request from "supertest";
import { describe,test, expect, afterAll } from '@jest/globals';
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
      username: 'testuser1',
      email: 'testuser1@example.com',
      password: hashedPassword,
      role: 'simpleUser',
      banned: false
    }
  });
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

describe('POST /api/users/login', () => {
    test('should login successfully with valid credentials', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser1@example.com',
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
        email: 'testuser1@example.com',
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
