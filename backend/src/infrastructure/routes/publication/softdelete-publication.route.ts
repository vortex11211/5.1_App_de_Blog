import express from 'express';
import {softDeletePublicationController} from '../../controllers/publication.controller'
import { checkAction } from '../../../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/publications/publication:
 *   delete:
 *     summary: Soft delete a publication
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
 *           examples:
 *             Sofdelete:
 *               summary: Suscessfully sofdelete publication
 *               value:
 *                 publicationId: 23
 *             Recover:
 *               summary: Suscessfully recover a sofdelete publication
 *               value:
 *                 publicationId: 23
 *
 *     responses:
 *       200:
 *         description: Publication deleted/restored successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden You do not own this publication
 *       400:
 *         description: Publication not found
 *       500:
 *         description: Internal Server Error
 *     description: |
 *       To mark a publication as deleted, you must be the author of the post or an administrator. If you call the route again, you can recover the post.
 */

router.delete('/publication',checkAction('softDelete','softDeleteOwn') ,softDeletePublicationController);
export default router