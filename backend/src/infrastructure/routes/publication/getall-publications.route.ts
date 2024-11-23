import express from 'express';
import { getAllPublicationsController } from '../../controllers/getpublications.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/publications/posts:
 *   get:
 *     summary: Retrieve all publications
 *     tags: [Publications]
 *     security:
 *       - Token: []
 *     description: |
 *       This end point retrieves all posts sorted by creation date in descending order. 
 *       A `simpleUser` will only receive active posts, while an `admin` will receive all posts, including those marked as `deleted: true`. 
 *       The `userId` and `role` are extracted from the JWT token, so it are not required as a parameters.
 *     responses:
 *       200:
 *         description: A list of publications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID of the publication
 *                   title:
 *                     type: string
 *                     description: Title of the publication
 *                   content:
 *                     type: string
 *                     description: Content of the publication
 *                   authorId:
 *                     type: integer
 *                     description: ID of the author
 *                   authorName:
 *                     type: string
 *                     description: Name of the author
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Creation date
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Last update date
 *                   deleted:
 *                     type: boolean
 *                     description: Indicates if the publication is deleted
 *                   popularity:
 *                     type: string
 *                     description: Popularity of the publication
 *               example:
 *                 id: 1
 *                 title: "Sample Post"
 *                 content: "This is the content of the sample post."
 *                 authorId: 1
 *                 authorName: "John Doe"
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 updatedAt: "2024-01-01T00:00:00.000Z"
 *                 deleted: false
 *                 popularity: "85.67"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: No publications found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No publications found"
 *       500:
 *         description: Internal Server Error
 */


router.get('/posts', checkAction('view'), getAllPublicationsController);

export default router;
