const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController')


router.get('/', galleryController.index)
router.get('/api', galleryController.api)
router.get('/:artistId', galleryController.byArtist)

module.exports = router;
