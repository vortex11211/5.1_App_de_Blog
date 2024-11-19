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
 *     description: |
 *       This endpoint bans or unbans a user. 
 *       The `userId` is extracted from the JWT token, so it is not required as a parameter in the request body.
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
 *                   example: "User banned successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     banned:
 *                       type: boolean
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
 *       500:
 *         description: Internal Server Error
 */

router.patch('/ban', checkAction('banUser'),banUserController);

export default router
