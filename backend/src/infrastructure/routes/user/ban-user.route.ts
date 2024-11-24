import express from 'express';
import { banUserController } from '../../controllers/user.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

const router= express.Router();

/**
 * @swagger
 * /api/users/ban:
 *   patch:
 *     summary: Ban or unban a user
 *     tags: [Admin Only]
 *     security:
 *       - Token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               
 *     responses:
 *       200:
 *         description: User banned or unbanned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User banned successfully or User unbanned successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID of the user
 *                     username:
 *                       type: string
 *                       description: Username of the user
 *                     email:
 *                       type: string
 *                       description: Email of the user
 *                     role:
 *                       type: string
 *                       description: Role of the user
 *                     banned:
 *                       type: boolean
 *                       description: Indicates if the user is banned
 *               example:
 *                 message: "User banned successfully"
 *                 user: {
 *                   id: 3,
 *                   username: "bannedUser",
 *                   email: "banned@example.com",
 *                   role: "simpleUser",
 *                   banned: true,
 *                   createdAt: "2024-10-27T17:11:39.431Z",
 *                   updatedAt: "2024-11-20T20:32:25.811Z"
 *                 }
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error message"
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 *     description: |
 *       Bans or unbans a user. The `userId` is provided in the request body. Only users with `admin` role can perform this action.
 */

router.patch('/ban', checkAction('banUser'),banUserController);

export default router
