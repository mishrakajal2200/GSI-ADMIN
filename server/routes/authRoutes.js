import express from 'express';
import { login } from '../controller/authController.js';

const router = express.Router();

router.post('/admin/login', login);

export default router;
