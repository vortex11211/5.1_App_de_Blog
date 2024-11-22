import express from 'express'
import { getPublicationByIdController } from '../../controllers/getpublications.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/publications/{id}:
 *   get:
 *     summary: Get a publication by ID
 *     tags: [Publications]
 *     security:
 *       - Token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           example: 1
 *         required: true
 *         description: The ID of the publication to retrieve.
 *     responses:
 *       200:
 *         description: Publication retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la publicación
 *                 title:
 *                   type: string
 *                   description: Título de la publicación
 *                 content:
 *                   type: string
 *                   description: Contenido de la publicación
 *                 authorId:
 *                   type: integer
 *                   description: ID del autor
 *                 authorName:
 *                   type: string
 *                   description: Nombre del autor
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de última actualización
 *                 deleted:
 *                   type: boolean
 *                   description: Indica si la publicación está eliminada
 *                 popularity:
 *                   type: string
 *                   description: Popularidad de la publicación
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Internal Server Error
 *     description: |
 *       This endpoint retrieves a publication by its ID.
 * 
 */

router.get("/:id", checkAction('getpublication'), getPublicationByIdController);

export default router;
