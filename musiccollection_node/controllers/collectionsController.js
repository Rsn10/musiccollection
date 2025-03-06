const collectionModel = require("../models/collectionModel");

const getCollections = (req, res) => {
  const { type, search } = req.query;
  let collections = collectionModel.getAllCollections();

  if (type && type !== "all") {
    collections = collections.filter((collection) =>
      collection.type?.toLowerCase() === type.toLowerCase()
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
    collections = collections.filter((collection) => {
      const collectionName = collection.name?.toLowerCase() || '';
      const artistName = collection.artist?.toLowerCase() || '';
      const songCount = collection.songCount?.toString() || '';
      return (
        collectionName.includes(searchLower) ||
        artistName.includes(searchLower) ||
        songCount.includes(searchLower)
      );
    });
  }

  res.json(collections);
};

const getCollectionById = (req, res) => {
  const { collectionId } = req.params;
  const collection = collectionModel.getCollectionById(collectionId);

  if (collection) {
    res.json(collection);
  } else {
    res.status(404).json({ error: "Collection not found" });
  }
};

module.exports = {
  getCollections,
  getCollectionById,
};
