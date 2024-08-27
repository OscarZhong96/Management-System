import { Request, Response } from 'express';
import * as taskService from '../services/service';

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.addTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.getTask(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const task = await taskService.updateTaskStatus(req.params.id, req.body.status);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const success = await taskService.deleteTask(req.params.id);
    if (success) {
      res.status(200).json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};