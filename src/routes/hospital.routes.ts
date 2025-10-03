import { Router } from 'express';
import { HospitalController } from '@/controllers/hospital.controller';
import { asyncHandler } from '@/middleware/error-handler';

const router = Router();
const controller = new HospitalController();

/**
 * @swagger
 * tags:
 *   name: Hospitals
 *   description: Operações relacionadas a hospitals
 */

// CRUD routes (sem auth para demonstração)
router.get('/', asyncHandler(controller.list.bind(controller)));
router.get('/:id', asyncHandler(controller.getById.bind(controller)));
router.post('/', asyncHandler(controller.create.bind(controller)));
router.put('/:id', asyncHandler(controller.update.bind(controller)));
router.delete('/:id', asyncHandler(controller.delete.bind(controller)));

export default router;
