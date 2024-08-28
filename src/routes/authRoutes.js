import express from 'express'
import { forgotPassword, login, logout, register, resetPassword, verifyemail } from '../controllers/authControllers.js'

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-email', verifyemail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword);

export default router;