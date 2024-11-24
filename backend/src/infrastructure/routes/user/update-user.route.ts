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
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 example: "1234567"
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
 *         description: Forbidden | User not found
 *       500:
 *         description: Internal Server Error
 *     description: |
 *       Updates the profile of the authenticated user. The `userId` is extracted from the JWT token, so it is not required as a parameter.
 *       If the `oldPassword` and `newPassword` fields are provided, the password will be updated after verifying the old password. The `username` field can also be updated.
 */ 



router.put('/profile',checkAction('editprofile'), updateUserProfileController );

export default router;