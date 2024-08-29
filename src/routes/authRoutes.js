import express from 'express'
import { checkAuth, forgotPassword, login, logout, register, resetPassword, verifyemail } from '../controllers/authControllers.js'
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-email', verifyemail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword);
router.get('/check-auth', verifyToken, checkAuth)

export default router;