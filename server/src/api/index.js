import { Router } from 'express';
import v1Route from './v1';

const router = Router();

router.use('/v1', v1Route);

export default router;
