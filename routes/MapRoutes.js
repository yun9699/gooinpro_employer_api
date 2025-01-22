import express from 'express';
import mapController from '../controllers/mapController.js';

const router = express.Router();

router.get('/geocode', mapController.getGeocode);
router.get('/reverse-geocode', mapController.getReverseGeocode);
router.get('/directions', mapController.getDirections);

export default router;