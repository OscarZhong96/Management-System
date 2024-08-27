import { Router } from 'express';
import * as taskController from '../controllers/Controller';

const router = Router();

// Route to create a new task
router.post('/tasks', taskController.createTask);

// Route to get a specific task by ID
router.get('/tasks/:id', taskController.getTask);

// Route to update the status of a specific task by ID
router.put('/tasks/:id/status', taskController.updateTaskStatus);

// Route to delete a specific task by ID
router.delete('/tasks/:id', taskController.deleteTask);

// Check if you have /api/test route defined here
router.post('/test', (req, res) => {
    res.send('Test route works!');
  });

export default router;