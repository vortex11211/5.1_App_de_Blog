import express from 'express';
import { getAllPublicationsController } from '../../controllers/getpublications.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/publications/posts:
 *   get:
 *     summary: Obtener todas las publicaciones
 *     tags: [Publications]
 *     security:
 *       - Token: []
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
 *   securitySchemes:
 *     Token:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.get('/posts', checkAction('view'), getAllPublicationsController);

export default router;
