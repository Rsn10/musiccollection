const express = require('express');
const router = express.Router();
const collectionsController = require('../controllers/collectionsController');

router.get('/collections', collectionsController.getCollections);
router.get('/collections/:collectionId', collectionsController.getCollectionById);

module.exports = router;
