import { randomUUID } from 'crypto';
import { Task, TaskStatus, CreateTaskDTO, UpdateTaskDTO } from '../types/task';

const tasks: Task[] = [];

export function getAllTasks(): Task[] {
  return tasks;
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function createTask(dto: CreateTaskDTO): Task {
  const now = new Date().toISOString();
  const task: Task = {
    id: randomUUID(),
    title: dto.title,
    description: dto.description ?? '',
    status: dto.status ?? TaskStatus.Todo,
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(task);
  return task;
}

export function updateTask(id: string, dto: UpdateTaskDTO): Task | undefined {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return undefined;

  const existing = tasks[index];
  const updated: Task = {
    ...existing,
    ...(dto.title !== undefined && { title: dto.title }),
    ...(dto.description !== undefined && { description: dto.description }),
    ...(dto.status !== undefined && { status: dto.status }),
    updatedAt: new Date().toISOString(),
  };
  tasks[index] = updated;
  return updated;
}

export function deleteTask(id: string): boolean {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
