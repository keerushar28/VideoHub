import express from 'express'
import { login, logout, register, verifyemail } from '../controllers/authControllers.js'

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-email', verifyemail)

export default router;