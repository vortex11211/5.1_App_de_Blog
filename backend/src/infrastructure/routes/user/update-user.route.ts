import express from 'express';
import { updateUserProfileController } from '../../controllers/user.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

const router= express.Router();

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - Token: []
 *     description: |
 *       This endpoint allows a user to update their profile. 
 *       The `userId` is obtained from the JWT token, so it is not required as a parameter.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newUsername"
 *               oldPassword:
 *                 type: string
 *                 example: "oldPassword123"
 *               newPassword:
 *                 type: string
 *                 example: "newPassword456"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
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


router.put('/profile',checkAction('editprofile'), updateUserProfileController );

export default router;