import express from 'express';
import { registerUserController } from '../../controllers/user.controller';

const router = express.Router();



/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [simpleUser, admin]
 *               adminKey:
 *                 type: string
 *           examples:
 *             simpleUser:
 *               summary: Register as a simple user
 *               value:
 *                 username: "SgwaggerSimple"
 *                 email: "simpleswagger@example.com"
 *                 password: "123456"
 *                 role: "simpleUser"
 *             admin:
 *               summary: Register as an admin
 *               value:
 *                 username: "SwaggerAdmin"
 *                 email: "adminswagger@example.com"
 *                 password: "123456"
 *                 role: "admin"
 *                 adminKey: "admin_key112"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Confict - Username or email already exists
 */

router.post('/register', registerUserController);

export default router;
