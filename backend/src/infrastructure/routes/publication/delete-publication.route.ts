import express from 'express'
import { deletePublicationController } from '../../controllers/publication.controller'
import { checkAction } from '../../../middlewares/auth.middleware';
const router = express.Router();

/**
 * @swagger
 * /api/publications/delete-publication:
 *   delete:
 *     summary: Delete a publication
 *     tags: [Admin Only]
 *     security:
 *       - Token: []
 *     description: |
 *       This endpoint deletes an existing publication. 
 *       The `userId` is extracted from the JWT token, so it is not required as a parameter in the request body.
 *     parameters:
 *       - in: query
 *         name: publicationId
 *         schema:
 *           type: integer
 *           example: 1
 *         required: true
 *         description: The ID of the publication to delete.
 *     responses:
 *       200:
 *         description: Publication deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Publication deleted successfully"
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
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/delete-publication',checkAction('eliminatePublication'),deletePublicationController);
export default router