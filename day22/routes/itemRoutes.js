const express = require('express');
const { createItem, getItem, updateItem, deleteItem, getAllItems } = require('../controllers/itemController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/', verifyToken, createItem);
router.get('/:id', verifyToken, getItem);
router.put('/:id', verifyToken, updateItem);
router.delete('/:id', verifyToken, deleteItem);
router.get('/', verifyToken, getAllItems);

module.exports = router;
