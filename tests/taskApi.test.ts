import { api, buildTaskPayload } from './setup';

describe('Task API', () => {
  describe('CRUD happy paths', () => {
    it('GET /tasks returns empty list initially', async () => {
      const res = await api.get('/tasks');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('POST /tasks creates a task and GET endpoints return it', async () => {
      const createRes = await api.post('/tasks').send(buildTaskPayload());

      expect(createRes.status).toBe(201);
      expect(createRes.body).toMatchObject({
        title: 'Write tests',
        description: 'Add comprehensive API tests',
        status: 'todo',
      });
      expect(createRes.body.id).toEqual(expect.any(String));
      expect(createRes.body.createdAt).toEqual(expect.any(String));
      expect(createRes.body.updatedAt).toEqual(expect.any(String));

      const allRes = await api.get('/tasks');
      expect(allRes.status).toBe(200);
      expect(allRes.body).toHaveLength(1);
      expect(allRes.body[0].id).toBe(createRes.body.id);

      const byIdRes = await api.get(`/tasks/${createRes.body.id}`);
      expect(byIdRes.status).toBe(200);
      expect(byIdRes.body.id).toBe(createRes.body.id);
    });

    it('PUT /tasks/:id updates a task', async () => {
      const createRes = await api.post('/tasks').send(buildTaskPayload());
      const taskId = createRes.body.id;

      const updateRes = await api.put(`/tasks/${taskId}`).send({
        title: 'Write more tests',
        status: 'in-progress',
      });

      expect(updateRes.status).toBe(200);
      expect(updateRes.body).toMatchObject({
        id: taskId,
        title: 'Write more tests',
        description: 'Add comprehensive API tests',
        status: 'in-progress',
      });
    });

    it('DELETE /tasks/:id removes a task', async () => {
      const createRes = await api.post('/tasks').send(buildTaskPayload());
      const taskId = createRes.body.id;

      const deleteRes = await api.delete(`/tasks/${taskId}`);
      expect(deleteRes.status).toBe(204);

      const allRes = await api.get('/tasks');
      expect(allRes.status).toBe(200);
      expect(allRes.body).toEqual([]);
    });
  });

  describe('Validation errors', () => {
    it('POST /tasks returns 400 when title is missing', async () => {
      const res = await api.post('/tasks').send({ description: 'No title' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('ValidationError');
    });

    it('POST /tasks returns 400 for invalid title type', async () => {
      const res = await api.post('/tasks').send({ title: 123 });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('ValidationError');
    });

    it('POST /tasks returns 400 for invalid status', async () => {
      const res = await api.post('/tasks').send(buildTaskPayload({ status: 'blocked' }));
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('ValidationError');
    });

    it('PUT /tasks/:id returns 400 when no fields are provided', async () => {
      const createRes = await api.post('/tasks').send(buildTaskPayload());
      const res = await api.put(`/tasks/${createRes.body.id}`).send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('ValidationError');
    });

    it('PUT /tasks/:id returns 400 for invalid description type', async () => {
      const createRes = await api.post('/tasks').send(buildTaskPayload());
      const res = await api
        .put(`/tasks/${createRes.body.id}`)
        .send({ description: 999 });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('ValidationError');
    });
  });

  describe('404 behavior for non-existent IDs', () => {
    it('GET /tasks/:id returns 404 for unknown task', async () => {
      const res = await api.get('/tasks/non-existent-id');
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('NotFound');
    });

    it('PUT /tasks/:id returns 404 for unknown task', async () => {
      const res = await api.put('/tasks/non-existent-id').send({ title: 'Updated' });
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('NotFound');
    });

    it('DELETE /tasks/:id returns 404 for unknown task', async () => {
      const res = await api.delete('/tasks/non-existent-id');
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('NotFound');
    });
  });

  describe('Edge cases', () => {
    it('POST /tasks returns 400 for empty title', async () => {
      const res = await api.post('/tasks').send(buildTaskPayload({ title: '   ' }));
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('ValidationError');
    });

    it('POST /tasks handles very long description', async () => {
      const longDescription = 'a'.repeat(10000);
      const res = await api
        .post('/tasks')
        .send(buildTaskPayload({ description: longDescription }));

      expect(res.status).toBe(201);
      expect(res.body.description).toHaveLength(10000);
    });
  });
});
