import express from 'express';
import { listUsersController } from '../../controllers/user.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/users/list:
 *   get:
 *     summary: List all users
 *     tags: [Admin Only]
 *     security:
 *       - Token: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: User ID
 *                   username:
 *                     type: string
 *                     description: Username
 *                   email:
 *                     type: string
 *                     description: Email of the user
 *                   role:
 *                     type: string
 *                     description: Role of the user
 *                   banned:
 *                     type: boolean
 *                     description: Indicates if the user is banned
 *               example:
 *                 users: [
 *                   {
 *                     id: 1,
 *                     username: "adminUser",
 *                     email: "admin@example.com",
 *                     password: "$2a$10$TLXGkvljIPufQKGvJBxyr.XdAUv7fWJxeW/xH8LkU7Prk0Cowxw.u",
 *                     role: "admin",
 *                     banned: false,
 *                     createdAt: "2024-10-27T17:11:38.431Z",
 *                     updatedAt: "2024-11-20T20:32:52.811Z"
 *                   },
 *                   {
 *                     id: 2,
 *                     username: "simpleUser",
 *                     email: "simple@example.com",
 *                     password: "$2a$10$TLXGkvljIPufQKGvJBxyr.XdAUv7fWJxeW/xH8LkU7Prk0Cowxw.u",
 *                     role: "admin",
 *                     banned: true,
 *                     createdAt: "2024-10-27T17:11:39.431Z",
 *                     updatedAt: "2024-11-20T20:32:25.811Z"
 *                   }
 *                 ]
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You do not have permission to perform this action"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *     description: |
 *       Lists all users. Only users with `admin` role can perform this action. The `userId` and `userRole` are extracted from the JWT token, so they are not required as parameters.
 */

router.get('/list', checkAction('viewAllUsers'), listUsersController);

export default router;


