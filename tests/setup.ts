import request from 'supertest';
import app from '../src/app';
import { getAllTasks } from '../src/store/taskStore';

export const api = request(app);

export function resetTaskStore(): void {
  const tasks = getAllTasks();
  tasks.splice(0, tasks.length);
}

export function buildTaskPayload(
  overrides: Partial<{ title: string; description: string; status: string }> = {}
): { title: string; description: string; status: string } {
  return {
    title: 'Write tests',
    description: 'Add comprehensive API tests',
    status: 'todo',
    ...overrides,
  };
}

beforeEach(() => {
  resetTaskStore();
});

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {
    // Keep test output clean from request logger noise.
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
