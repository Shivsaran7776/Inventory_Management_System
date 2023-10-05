const express = require('express');
const { createAdmin } = require('../controllers/admin.controller');
const router = express.Router();

router.get('/users/:userId/profile', (req, res) => {
  res.send('Welcome')
});

router.post('/admin', createAdmin)


module.exports = router;