import express from 'express';
import path from 'path';
import healthRouter from './routes/health';
import tasksRouter from './routes/tasks';
import { notFoundHandler, errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/health', healthRouter);
app.use('/tasks', tasksRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
