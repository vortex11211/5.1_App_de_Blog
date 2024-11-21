import express from 'express';
import { favoritePublicationController } from '../../controllers/favorite.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/publications/like:
 *   post:
 *     summary: Like or unlike a publication
 *     tags: [Publications]
 *     security:
 *       - BearerAuth: []
 *     description: |
 *       This endpoint allows a user to like or unlike a publication. 
 *       The `userId` is extracted from the JWT token, so it is not required as a parameter in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               publicationId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Favorite processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Favorite processed successfully"
 *       404:
 *         description: Publication not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Publication not found"
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
 */


router.post('/like',checkAction('like'), favoritePublicationController);

export default router;
