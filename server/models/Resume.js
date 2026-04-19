const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company:     { type: String, required: true },
  role:        { type: String, required: true },
  startDate:   { type: String },
  endDate:     { type: String },
  description: { type: String }
});

const EducationSchema = new mongoose.Schema({
  school:    { type: String, required: true },
  degree:    { type: String },
  field:     { type: String },
  startDate: { type: String },
  endDate:   { type: String }
});

const SkillSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' }
});

const ProjectSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  link:        { type: String },
  techStack:   { type: String }
});

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'My Resume'
  },
  template: {
    type: String,
    enum: ['classic', 'modern' , 'minimal'],
    default: 'classic'
  },
  personalInfo: {
    name:     { type: String, default: '' },
    email:    { type: String, default: '' },
    phone:    { type: String, default: '' },
    location: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github:   { type: String, default: '' },
    summary:  { type: String, default: '' }
  },
  experience: [ExperienceSchema],
  education:  [EducationSchema],
  skills:     [SkillSchema],
  projects:   [ProjectSchema]
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);