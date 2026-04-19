import { createContext, useContext, useState } from 'react';

export const ResumeContext = createContext(null);

const defaultResume = {
  title: 'My Resume',
  template: 'classic',
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: []
};

export const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState(defaultResume);

  const updatePersonalInfo = (data) =>
    setResume(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data }
    }));

  const updateSection = (section, data) =>
    setResume(prev => ({ ...prev, [section]: data }));

  const updateTemplate = (template) =>
    setResume(prev => ({ ...prev, template }));

  const loadResume = (data) => setResume(data);

  const resetResume = () => setResume(defaultResume);

  return (
    <ResumeContext.Provider value={{
      resume,
      updatePersonalInfo,
      updateSection,
      updateTemplate,
      loadResume,
      resetResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used inside ResumeProvider');
  }
  return context;
};