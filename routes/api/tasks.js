const express = require("express");
const router = express.Router();
const Task = require("../../models/Tasks");
const { models } = require("mongoose");

router.post('/', async (req, res) => {
  const taskObj = {
    task_title: req.body.task_title,
    completed: req.body.completed,
  };
  const task = new Task(taskObj);
  await task.save();
  res.status(201).json(task);
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tasks = await Task.findById(req.params.id);
    if (!tasks) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Task not found" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tasks = await Task.findById(req.params.id);
    if (!tasks) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.body.task_title !== undefined) {
      tasks.task_title = req.body.task_title;
    }
    if (req.body.completed !== undefined) {
      tasks.completed = req.body.completed;
    }

    await tasks.save();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = await Task.findById(req.params.id);       
        const deleteTask = await Task.findByIdAndDelete(id);
        if(deleteTask){
          return res.json({ message: "Task deleted" });
        }
        
        return res.status(404).json({ message: 'Task not found' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;