import express from 'express';
import { updateUserProfileController } from '../../controllers/user.controller';
import { checkAction } from '../../../middlewares/auth.middleware';

const router= express.Router();

router.put('/profile',checkAction('editprofile'), updateUserProfileController );

export default router;