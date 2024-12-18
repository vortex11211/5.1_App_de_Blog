import express from 'express';
import { postPublicationController } from '../../controllers/publication.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

 const router= express.Router();

/**
 * @swagger
 * /api/publications/publication:
 *   post:
 *     summary: Create a new publication
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
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *                 example: "This is the content of my first post."
 *           examples:
 *             New Post:
 *               summary: Suscessfully publication
 *               value:
 *                 title: "My First Publication"
 *                 content: "My first Content"
 *             Error Title:
 *               summary: Missing title
 *               value:
 *                 title: ""
 *                 content: "Publication without tittle"
  *             Error Content:
 *               summary: Missing content
 *               value:
 *                 title: "Publication title"
 *                 content: ""
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post created successfully"
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
 *                   example: "Validation error message (e.g., Title is required or Content is required)"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 *     description: |
 *       This endpoint creates a new publication. 
 *       The `userId` of the author is extracted from the JWT token, so it is not required as a parameter in the request body.
 */



 router.post('/publication',checkAction('create'),postPublicationController);
 export default router;