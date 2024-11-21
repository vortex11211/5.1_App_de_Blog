import express from 'express';
import { getAllPublicationsController } from '../../controllers/getpublications.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/publications/posts:
 *   get:
 *     summary: Get all publications
 *     tags: [Publications]
 *     security:
 *       - Token: []
 *     description: |
 *       This endpoint retrieves all publications. 
 *       The `userId` is extracted from the JWT token, so it is not required as a parameter.
 *       A `simpleUser` only gets active posts, an `admin` user gets all posts, including soft deleted ones
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la publicación
 *                   title:
 *                     type: string
 *                     description: Título de la publicación
 *                   content:
 *                     type: string
 *                     description: Contenido de la publicación
 *                   authorId:
 *                     type: integer
 *                     description: ID del autor
 *                   authorName:
 *                     type: string
 *                     description: Nombre del autor
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de última actualización
 *                   deleted:
 *                     type: boolean
 *                     description: Indica si la publicación está eliminada
 *                   popularity:
 *                     type: string
 *                     description: Popularidad de la publicación
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.get('/posts', checkAction('view'), getAllPublicationsController);

export default router;
