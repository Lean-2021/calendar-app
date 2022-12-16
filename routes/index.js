import {Router} from 'express';
import authRoute from './auth.js';
import eventsRoute from './events.js';

const router = Router();


router.use('/api/auth',authRoute);
router.use('/api/events',eventsRoute);


export default router;
