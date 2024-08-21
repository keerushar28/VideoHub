import express from 'express'
import { register, verifyemail } from '../controllers/authControllers.js'

const router = express.Router();

router.post('/register', register)
router.post('/verify-email',verifyemail)

export default router;