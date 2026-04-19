const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  getAllResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume
} = require('../controllers/resumeController');

router.use(protect); // all resume routes are protected

router.route('/')
  .get(getAllResumes)
  .post(createResume);

router.route('/:id')
  .get(getResumeById)
  .put(updateResume)
  .delete(deleteResume);

module.exports = router;