import express from 'express';
import { loginUserController } from '../../controllers/user.controller'

const router = express.Router();
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           examples:
 *             simpleUser:
 *               summary: Login as a simple user
 *               value:
 *                 email: "simpleswagger@example.com"
 *                 password: "123456"
 *             admin:
 *               summary: Login as an admin
 *               value:
 *                 email: "adminswagger@example.com"
 *                 password: "123456"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Auto-generated token to authenticate the user, contains userId and userRole.
 *       400:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email or password"
 *     description: |
 *       If the user has been banned, he will not be able to log in.
 */

router.post('/login', loginUserController);

export default router;
