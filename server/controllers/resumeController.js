const Resume = require('../models/Resume');

// GET /api/resumes — get all resumes of logged-in user
exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id })
      .select('title template createdAt updatedAt')
      .sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/resumes/:id — get single resume
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume)
      return res.status(404).json({ message: 'Resume not found' });

    if (resume.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/resumes — create new resume
exports.createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      userId: req.user.id,
      ...req.body
    });
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/resumes/:id — update resume
exports.updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume)
      return res.status(404).json({ message: 'Resume not found' });

    if (resume.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    const updated = await Resume.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/resumes/:id — delete resume
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume)
      return res.status(404).json({ message: 'Resume not found' });

    if (resume.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    await resume.deleteOne();
    res.json({ message: 'Resume deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};