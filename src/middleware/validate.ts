import { Request, Response, NextFunction } from 'express';
import { TaskStatus } from '../types/task';

const VALID_STATUSES = Object.values(TaskStatus) as string[];

export function validateCreateTask(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { title, status } = req.body as Record<string, unknown>;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({
      error: 'ValidationError',
      message: '"title" is required and must be a non-empty string',
    });
    return;
  }

  if (status !== undefined && !VALID_STATUSES.includes(status as string)) {
    res.status(400).json({
      error: 'ValidationError',
      message: `"status" must be one of: ${VALID_STATUSES.join(', ')}`,
    });
    return;
  }

  next();
}

export function validateUpdateTask(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { title, description, status } = req.body as Record<string, unknown>;

  const hasTitle = title !== undefined;
  const hasDescription = description !== undefined;
  const hasStatus = status !== undefined;

  if (!hasTitle && !hasDescription && !hasStatus) {
    res.status(400).json({
      error: 'ValidationError',
      message: 'At least one field (title, description, status) must be provided',
    });
    return;
  }

  if (hasTitle && (typeof title !== 'string' || (title as string).trim() === '')) {
    res.status(400).json({
      error: 'ValidationError',
      message: '"title" must be a non-empty string',
    });
    return;
  }

  if (hasDescription && typeof description !== 'string') {
    res.status(400).json({
      error: 'ValidationError',
      message: '"description" must be a string',
    });
    return;
  }

  if (hasStatus && !VALID_STATUSES.includes(status as string)) {
    res.status(400).json({
      error: 'ValidationError',
      message: `"status" must be one of: ${VALID_STATUSES.join(', ')}`,
    });
    return;
  }

  next();
}
