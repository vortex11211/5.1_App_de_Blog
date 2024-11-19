import express from 'express';
import { editPublicationController } from '../../controllers/publication.controller'
import { checkAction } from '../../../middlewares/auth.middleware';
const router= express.Router();

/**
 * @swagger
 * /api/publications/publication:
 *   put:
 *     summary: Edit a publication
 *     tags: [Publications]
 *     security:
 *       - Token: []
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
 *               title:
 *                 type: string
 *                 example: "Updated Title"
 *               content:
 *                 type: string
 *                 example: "Updated content of the publication."
 *     responses:
 *       200:
 *         description: Publication updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Publication updated successfully"
 *                 publication:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     authorId:
 *                       type: integer
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
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
 *     description: |
 *       This endpoint edits an existing publication. 
 *       The `userId` of the author is extracted from the JWT token, so it is not required as a parameter in the request body.
 */

router.put('/publication',checkAction('edit','editOwn'),editPublicationController);
export default router;