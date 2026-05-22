import { Router, Request, Response } from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../store/taskStore';
import { validateCreateTask, validateUpdateTask } from '../middleware/validate';
import { AppError } from '../middleware/errorHandler';
import { CreateTaskDTO, UpdateTaskDTO } from '../types/task';

const router = Router();

// GET /tasks
router.get('/', (_req: Request, res: Response) => {
  res.json(getAllTasks());
});

// GET /tasks/:id
router.get('/:id', (req: Request, res: Response) => {
  const task = getTaskById(req.params.id);
  if (!task) {
    throw new AppError(404, 'NotFound', `Task with id "${req.params.id}" not found`);
  }
  res.json(task);
});

// POST /tasks
router.post('/', validateCreateTask, (req: Request, res: Response) => {
  const dto = req.body as CreateTaskDTO;
  const task = createTask(dto);
  res.status(201).json(task);
});

// PUT /tasks/:id
router.put('/:id', validateUpdateTask, (req: Request, res: Response) => {
  const dto = req.body as UpdateTaskDTO;
  const task = updateTask(req.params.id, dto);
  if (!task) {
    throw new AppError(404, 'NotFound', `Task with id "${req.params.id}" not found`);
  }
  res.json(task);
});

// DELETE /tasks/:id
router.delete('/:id', (req: Request, res: Response) => {
  const deleted = deleteTask(req.params.id);
  if (!deleted) {
    throw new AppError(404, 'NotFound', `Task with id "${req.params.id}" not found`);
  }
  res.status(204).send();
});

export default router;
