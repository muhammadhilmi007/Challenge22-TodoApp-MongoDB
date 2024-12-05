const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

module.exports = (db) => {
  const User = db.collection('users');

  router.get('/', async (req, res) => {
    try {
      const users = await User.find({}).toArray();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data pengguna' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({ _id: new ObjectId(id) });
      if (!user) {
        return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'Terjadi kesalahan saat mengambil data pengguna' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { title, phone } = req.body;
      const result = await User.insertOne({ title, phone });
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan saat menambah data pengguna' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, phone } = req.body;
      const result = await User.updateOne(
        { _id: new ObjectId(id) },
        { $set: { title, phone } }
      );
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
      }
      res.json({ message: 'Data pengguna berhasil diperbarui' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengedit data pengguna' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await User.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan saat menghapus data pengguna' });
    }
  });

  return router;
};
