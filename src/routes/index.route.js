import express from 'express';
import linkRoute from './linkRoute/link.route.js'


const router = express.Router();

router.use('/', linkRoute);


export default router