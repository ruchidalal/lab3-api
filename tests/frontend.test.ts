import request from 'supertest';
import app from '../src/app';

describe('Frontend', () => {
  it('serves the task management webpage at GET /', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/html');
    expect(res.text).toContain('Task Management API UI');
    expect(res.text).toContain('Create Task');
    expect(res.text).toContain('loadTasks()');
  });
});
