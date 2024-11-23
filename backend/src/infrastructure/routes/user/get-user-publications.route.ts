import express from'express';
import { getUserPublicationsController } from '../../controllers/getpublications.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/users/posts:
 *   get:
 *     summary: Get all user's publications
 *     tags: [Users]
 *     security:
 *       - Token: []
 *     description: |
 *       This endpoint allows the user to get all their publications, including those with soft delete. 
 *       The publications are returned sorted by creation date.
 *     responses:
 *       200:
 *         description: List of user's publications
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
 *                     description: Indicates if the publication is soft deleted
 *                   popularity:
 *                     type: string
 *                     description: Popularity of the publication
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */

router.get('/posts', checkAction('view','viewOnw'), getUserPublicationsController);



export default router;
