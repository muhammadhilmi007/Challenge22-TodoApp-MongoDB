const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

module.exports = (db) => {
  const Todo = db.collection('todos');

  router.get('/', async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        title = '',
        complete,
        startDate,
        endDate,
        sortBy = 'deadline',
        sortOrder = 'desc',
        executor
      } = req.query;

      const query = {};
      if (title) query.title = new RegExp(title, 'i');
      if (complete !== undefined) query.complete = complete === 'true';

      if (startDate || endDate) {
        query.deadline = {};
        if (startDate) query.deadline.$gte = new Date(startDate);
        if (endDate) query.deadline.$lte = new Date(endDate);
      }

      if (executor) query.executor = new ObjectId(executor);

      const totalItems = await Todo.countDocuments(query);
      const totalPages = Math.ceil(totalItems / limit);

      const todos = await Todo.find(query)
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .toArray();

      res.json({
        data: todos,
        total: totalItems,
        pages: totalPages,
        page: Number(page),
        limit: Number(limit)
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data todo' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findOne({ _id: new ObjectId(id) });
      if (!todo) {
        return res.status(404).json({ error: 'Todo tidak ditemukan' });
      }
      res.json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data todo' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { title, executor, deadline } = req.body;
      const deadlineDate = new Date(deadline);
      deadlineDate.setDate(deadlineDate.getDate() + 1);
      const result = await Todo.insertOne({
        title,
        complete: false,
        executor: new ObjectId(executor),
        deadline: deadlineDate
      });
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan saat menambah data todo' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, complete, executor, deadline } = req.body;

      const todoId = new ObjectId(id);

      const updateData = {
        title,
        complete,
        executor: new ObjectId(executor),
        deadline: new Date(deadline)
      };

      const result = await Todo.findOneAndUpdate(
        { _id: todoId },
        { $set: updateData },
        { returnDocument: 'after' }
      );

      if (!result) {
        return res.status(404).json({ error: 'Todo tidak ditemukan' });
      }

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengedit data todo' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const todoId = new ObjectId(id);
      const result = await Todo.deleteOne({ _id: todoId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Todo tidak ditemukan' });
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan saat menghapus data todo' });
    }
  });

  return router;
};