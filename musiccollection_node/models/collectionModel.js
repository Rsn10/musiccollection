const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/collections.json');

const getAllCollections = () => {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data);
};

const getCollectionById = (id) => {
  const collections = getAllCollections();
  return collections.find(collection => collection.id === id);
};

module.exports = {
  getAllCollections,
  getCollectionById
};
