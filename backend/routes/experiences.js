const express = require('express');
const { getAllExperiences, getExperienceById } = require('../controllers/experiencesController');

const router = express.Router();

router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);

module.exports = router;
