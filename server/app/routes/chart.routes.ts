import express from 'express';

import { create, update, findAll } from '../controllers/chart.controller';

const router = express.Router();

router.post('/', create);
router.get('/', findAll);
router.put("/:id", update);

export default router;