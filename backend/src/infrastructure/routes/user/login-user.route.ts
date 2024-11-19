import express from 'express';
import { loginUserController } from '../../controllers/login.controller'

const router = express.Router();

router.post('/login', loginUserController);

export default router;
