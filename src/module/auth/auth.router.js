import { Router } from "express";
import * as authController from './controller/auth.controller.js';
import { asyncHandler } from "../../services/errorHandling.js";
import validation from "../../middleWare/validation.js";
import * as validator from './auth.validation.js';

const router = Router();
router.post('/signup', validation(validator.signupSchema), asyncHandler(authController.signup));
router.post('/signin', validation(validator.loginSchema), asyncHandler(authController.login));
router.get('/confirmEmail/:token', authController.confirmEmail);
export default router;
