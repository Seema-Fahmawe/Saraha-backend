
import { Router } from 'express';
import * as messageController from './controller/message.controller.js';
import { asyncHandler } from '../../services/errorHandling.js';
import { auth } from './../../middleWare/auth.middleWare.js';

const router = Router();
router.get('/',auth,messageController.getMessage);
router.post('/:receiverId',messageController.sendMessage);
router.delete('/:messageId',auth,messageController.deleteMessage);
export default router;
