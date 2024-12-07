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
      
      if (title) {
        query.title = (todo) => 
          todo.title.toLowerCase().includes(title.toLowerCase());
      }

      if (complete !== undefined) {
        query.complete = complete === 'true';
      }

      if (startDate || endDate) {
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        query.dateFilter = (todo) => {
          const todoDate = new Date(todo.deadline);
          if (start && end) {
            return todoDate >= start && todoDate <= end;
          }
          if (start) {
            return todoDate >= start;
          }
          if (end) {
            return todoDate <= end;
          }
          return true;
        };
      }

      if (executor) {
        query.executor = new ObjectId(executor);
      }

      // Fetch all todos first
      let todos = await Todo.find({}).toArray();

      // Apply filters
      let filteredTodos = todos.filter(todo => {
        // Check title
        if (query.title && !query.title(todo)) return false;
        
        // Check completion status
        if (query.complete !== undefined && todo.complete !== query.complete) return false;
        
        // Check date
        if (query.dateFilter && !query.dateFilter(todo)) return false;
        
        // Check executor
        if (query.executor && !todo.executor.equals(query.executor)) return false;
        
        return true;
      });

      // Sort todos
      filteredTodos.sort((a, b) => {
        const sortMultiplier = sortOrder === 'desc' ? -1 : 1;
        if (a[sortBy] < b[sortBy]) return -1 * sortMultiplier;
        if (a[sortBy] > b[sortBy]) return 1 * sortMultiplier;
        return 0;
      });

      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + Number(limit);
      const paginatedTodos = filteredTodos.slice(startIndex, endIndex);

      res.json({
        data: paginatedTodos,
        total: filteredTodos.length,
        pages: Math.ceil(filteredTodos.length / limit),
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