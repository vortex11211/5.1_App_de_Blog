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

const generateToken = (userId: number, userRole: string) => {
  const payload = { userId, userRole };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });
};
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
  await prisma.user.create({
    data: {
      username: 'user2',
      email: 'testing@example.com',
      password: hashedPassword,
      role: 'simpleUser'
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
    expect(response.body.publication.props).toHaveProperty('authorId', 3);
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

//SOFT DELETED

describe('DELETE /api/publications/publication', () => {

  test('should soft delete a publication successfully', async () => {
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    const token = loginResponse.body.token;

    const response = await request(app)
      .delete('/api/publications/publication')
      .set('Authorization', `Bearer ${token}`)
      .send({
        publicationId: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Publication deleted successfully');
    expect(response.body.publication).toHaveProperty('props');
    expect(response.body.publication.props).toHaveProperty('deleted', true);
  });

  test('should restored a soft delete a publication successfully', async () => {
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    const token = loginResponse.body.token;

    const response = await request(app)
      .delete('/api/publications/publication')
      .set('Authorization', `Bearer ${token}`)
      .send({
        publicationId: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Publication restored successfully');
    expect(response.body.publication).toHaveProperty('props');
    expect(response.body.publication.props).toHaveProperty('deleted', false);
  });

  test('should return error if publication is not found', async () => {
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    const token = loginResponse.body.token;

    const response = await request(app)
      .delete('/api/publications/publication')
      .set('Authorization', `Bearer ${token}`)
      .send({
        publicationId: 999,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Publication not found');
  });

  test('should return error if user does not have permission', async () => {

    const token = generateToken(2, 'simpleUser');
    console.log(token)
    await prisma.publication.create({
      data: {
        title: 'Second Publication',
        content: 'Content of the test publication',
        authorId: 3,
        deleted: false,
      },
    });

    const response = await request(app)
      .delete('/api/publications/publication')
      .set('Authorization', `Bearer ${token}`)
      .send({
        publicationId: 2,
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('You do not own this publication');
  });
});

describe('GET /api/publications/:id', () => {
  test('should get a publication by ID successfully', async () => {
    const token = generateToken(2, 'simpleUser');

    const response = await request(app)
      .get('/api/publications/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.props).toHaveProperty('id', 1);
    expect(response.body.props).toHaveProperty('title', 'New Publication');
    expect(response.body.props).toHaveProperty('content', 'Content of the new publication');
    expect(response.body.props).toHaveProperty('authorId', 3);
  });

  test('should return error for invalid ID', async () => {
    const token = generateToken(2, 'simpleUser');

    const response = await request(app)
      .get('/api/publications/invalid-id')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid publication ID');
  });

  test('should return error if publication is not found', async () => {
    const token = generateToken(2, 'simpleUser');

    const response = await request(app)
      .get('/api/publications/999')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Publication not found');
  });
});

// EDIT PUBLICATION

describe('PUT /api/publications/publication', () => {
  test('should update a publication successfully', async () => {
    const token = generateToken(3, 'simpleUser');

    const response = await request(app)
      .put('/api/publications/publication')
      .set('Authorization', `Bearer ${token}`)
      .send({
        publicationId: 1,
        title: 'Updated Test Publication',
        content: 'Updated content of the test publication',
      });

    expect(response.status).toBe(200);
    expect(response.body.publication.props).toHaveProperty('title', 'Updated Test Publication');
    expect(response.body.publication.props).toHaveProperty('content', 'Updated content of the test publication');
    expect(response.body.message).toBe('Publication updated successfully');
  });

  test('should return error if publication is not found', async () => {
    const token = generateToken(3, 'simpleUser');

    const response = await request(app)
      .put('/api/publications/publication')
      .set('Authorization', `Bearer ${token}`)
      .send({
        publicationId: 999,
        title: 'Updated Test Publication',
        content: 'Updated content of the test publication',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Publication not found');
  });

  test('should return error if user does not have permission', async () => {
    const token = generateToken(2, 'simpleUser');

    const response = await request(app)
      .put('/api/publications/publication')
      .set('Authorization', `Bearer ${token}`)
      .send({
        publicationId: 1,
        title: 'Updated Test Publication',
        content: 'Updated content of the test publication',
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('You do not own this publication');
  });
});

//GET ALL PUBLICATIONS
describe('GET /api/publications/posts', () => {
  test('should get all publications successfully ordered by creation date', async () => {
    const token = generateToken(2, 'simpleUser');

    const response = await request(app)
      .get('/api/publications/posts')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].props).toHaveProperty('title', 'Second Publication');
    expect(response.body[0].props).toHaveProperty('content', 'Content of the test publication');
    expect(response.body[0].props).toHaveProperty('authorId', 3);
    expect(response.body[1].props).toHaveProperty('title', 'Updated Test Publication');
    expect(response.body[1].props).toHaveProperty('content', 'Updated content of the test publication');
    expect(response.body[1].props).toHaveProperty('authorId', 3);
  });

  test('should return error if no publications found', async () => {
    await prisma.publication.deleteMany(); // Asegúrate de que no haya publicaciones

    const token = generateToken(2, 'simpleUser');

    const response = await request(app)
      .get('/api/publications/posts')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No publications found');
  });

  test('should return all publications including deleted for admin', async () => {
    await prisma.publication.create({
      data: {
        id: 1,
        title: 'Deleted Publication',
        content: 'Content of the deleted publication',
        authorId: 2,
        deleted: true,
      },
    });
    await prisma.publication.create({
      data: {
        id: 2,
        title: 'test Publication',
        content: 'Content of the test publication',
        authorId: 3,
        deleted: false,
      },
    });

    const token = generateToken(4, 'admin');

    const response = await request(app)
      .get('/api/publications/posts')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].props).toHaveProperty('title', 'test Publication');
    expect(response.body[1].props).toHaveProperty('title', 'Deleted Publication');
  });
});

// Get User publications
describe('GET /api/users/posts', () => {


  test('should get user publications successfully even deleted ones', async () => {
    await prisma.publication.create({
      data: {
        id: 3,
        title: 'Active User Publication',
        content: 'Content of the user publication',
        authorId: 2,
        deleted: false,
      },
    });

    const token = generateToken(2, 'simpleUser');
    const response = await request(app)
      .get('/api/users/posts')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].props).toHaveProperty('title', 'Active User Publication');
    expect(response.body[0].props).toHaveProperty('content', 'Content of the user publication');
    expect(response.body[0].props).toHaveProperty('authorId', 2);
    expect(response.body[1].props).toHaveProperty('title', 'Deleted Publication');
    expect(response.body[1].props).toHaveProperty('content', 'Content of the deleted publication');
  });

  test('should return an empty array if user has not publications yet', async () => {
    await prisma.publication.deleteMany();

    const token = generateToken(3, 'simpleUser');

    const response = await request(app)
      .get('/api/users/posts')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
});

//Like Publication

describe('POST /api/publications/like', () => {

  test('should like a publication successfully', async () => {
    await prisma.publication.create({
      data: {
        id: 1,
        title: 'Test Publication',
        content: 'Content of the test publication',
        authorId: 2,
        deleted: false,
      },
    });

    const token = generateToken(3, 'simpleUser');

    const response = await request(app)
      .post('/api/publications/like')
      .set('Authorization', `Bearer ${token}`)
      .send({
        publicationId: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Favorite processed successfully');
  });
  
    test('should return error if publication not found', async () => {
      const token = generateToken(3, 'simpleUser');
  
      const response = await request(app)
        .post('/api/publications/like')
        .set('Authorization', `Bearer ${token}`)
        .send({
          publicationId: 999,
        });
  
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Publication not found');
    });
  
    test('should unlike a publication successfully', async () => {
      const token = generateToken(3, 'simpleUser');
  
       const response = await request(app)
        .post('/api/publications/like')
        .set('Authorization', `Bearer ${token}`)
        .send({
          publicationId: 1,
        });
  
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Favorite processed successfully');
    });
});

//UPDATE USER
describe('PUT /api/users/profile', () => {
  test('should update User successfully', async () => {
    const token = generateToken(3, 'simpleUser');
    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'user3_updated',
        oldPassword: 'password123',
        newPassword: '123456'
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Profile updated successfully');
  });


  test('should return error if user not found', async () => {
    const token = generateToken(999, 'simpleUser'); 

    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'newuser',
        oldPassword: '123456',
        newPassword: '1234567'
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('User not found');
    });

  test('should return error if old password is incorrect', async () => {
    const token = generateToken(3, 'simpleUser');

    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'newuser',
        oldPassword: 'wrongpassword',
        newPassword: '1234567'
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('error updating profile');
    expect(response.body.error).toBe('old password is incorrect');
  });
});

//ADMIN ACTIONS
//DELETE PUBLICATION

describe('DELETE /api/publications/delete-publication', () => {
test('should return error if user does not have permission', async () => {
    const token = generateToken(2, 'simpleUser');

    const response = await request(app)
      .delete('/api/publications/delete-publication')
      .set('Authorization', `Bearer ${token}`)
      .send({
        publicationId: 1,
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('You do not have permission to perform this action');
  });

   test('should delete a publication successfully as admin', async () => {
    const token = generateToken(4, 'admin');

    const response = await request(app)
      .delete('/api/publications/delete-publication')
      .set('Authorization', `Bearer ${token}`)
      .send({
        publicationId: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Publication deleted permanently successfully');
  });

  test('should return error if publication not found', async () => {
    const token = generateToken(4, 'admin');

    const response = await request(app)
      .delete('/api/publications/delete-publication')
      .set('Authorization', `Bearer ${token}`)
      .send({
        publicationId: 999,
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Publication not found');
  });
});

//LIST USERS
describe('GET /api/users/list', () => {
  test('should list users successfully as admin', async () => {
    const token = generateToken(4, 'admin');

    const response = await request(app)
      .get('/api/users/list')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.users).toHaveLength(4);
    expect(response.body.users[0].props).toHaveProperty('username', 'banneduser');
    expect(response.body.users[1].props).toHaveProperty('username', 'user2');
    expect(response.body.users[2].props).toHaveProperty('username', 'user3_updated');
    expect(response.body.users[3].props).toHaveProperty('username', 'adminUser');
  });

  test('should return error if user does not have permission', async () => {
    const token = generateToken(2, 'simpleUser');

    const response = await request(app)
      .get('/api/users/list')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('You do not have permission to perform this action');
  });
});

//BAN USER

describe('PATCH /api/users/ban', () => {
  test('should ban a user successfully', async () => {
    const token = generateToken(4, 'admin');

    const response = await request(app)
      .patch('/api/users/ban')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: 2,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User banned successfully');
    expect(response.body.user.props).toHaveProperty('banned', true);
  });

  test('should unban a user successfully', async () => {
    const token = generateToken(4, 'admin');

    const response = await request(app)
      .patch('/api/users/ban')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: 2,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User unbanned successfully');
    expect(response.body.user.props).toHaveProperty('banned', false);
  });

  test('should return error if user not found', async () => {
    const token = generateToken(4, 'admin');

    const response = await request(app)
      .patch('/api/users/ban')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: 999,
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  test('should return error if non-admin user tries to ban', async () => {
    const token = generateToken(2, 'simpleUser');

    const response = await request(app)
      .patch('/api/users/ban')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: 2,
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('You do not have permission to perform this action');
  });
});



