const items = require('../models/itemModel');

const createItem = (req, res) => {
  const { id, name, description } = req.body;
  if (!id || !name || !description) {
    return res.status(400).send({ message: 'Please provide id, name, and description for the item.' });
  }

  items[id] = { name, description, userId: req.userId };
  res.status(201).send({ message: 'Item created successfully', item: items[id] });
};

const getItem = (req, res) => {
  const { id } = req.params;
  const item = items[id];

  if (!item) {
    return res.status(404).send({ message: 'Item not found' });
  }

  if (item.userId !== req.userId) {
    return res.status(403).send({ message: 'You do not have access to this item' });
  }

  res.status(200).send({ item });
};

const updateItem = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const item = items[id];

  if (!item) {
    return res.status(404).send({ message: 'Item not found' });
  }

  if (item.userId !== req.userId) {
    return res.status(403).send({ message: 'You do not have access to this item' });
  }

  items[id] = { name, description, userId: req.userId };
  res.status(200).send({ message: 'Item updated successfully', item: items[id] });
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  const item = items[id];

  if (!item) {
    return res.status(404).send({ message: 'Item not found' });
  }

  if (item.userId !== req.userId) {
    return res.status(403).send({ message: 'You do not have access to this item' });
  }

  delete items[id];
  res.status(200).send({ message: 'Item deleted successfully' });
};

const getAllItems = (req, res) => {
  const userItems = Object.keys(items)
    .filter(key => items[key].userId === req.userId)
    .map(key => ({ id: key, ...items[key] }));

  res.status(200).send({ items: userItems });
};

module.exports = { createItem, getItem, updateItem, deleteItem, getAllItems };
