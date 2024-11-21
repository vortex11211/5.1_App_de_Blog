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
 *     description: |
 *       This endpoint allows the listing of all users.
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
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */


router.get('/list', checkAction('viewAllUsers'), listUsersController);

export default router;


