import express from 'express';
import { getAllPublicationsController } from '../../controllers/getpublications.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /publications:
 *   get:
 *     summary: Get All publications
 *     responses:
 *       200:
 *         description: 'list of all publications'
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 */
router.get('/posts', checkAction('view'), getAllPublicationsController);

export default router;
