import express from 'express';
import { banUserController } from '../../../controllers/user.controller';


const router= express.Router();
router.delete('/ban', banUserController);

export default router
