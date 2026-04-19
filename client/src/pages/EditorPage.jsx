import { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate }      from 'react-router-dom';
import { useReactToPrint }             from 'react-to-print';
import { useResume }                   from '../context/ResumeContext';
import { createResume, updateResume, getResume } from '../api/resumeApi';

import PersonalInfo   from '../components/editor/PersonalInfo';
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm  from '../components/editor/EducationForm';
import SkillsForm     from '../components/editor/SkillsForm';
import ProjectsForm   from '../components/editor/ProjectsForm';
import ResumePreview  from '../components/preview/ResumePreview';

const tabs = ['Personal', 'Experience', 'Education', 'Skills', 'Projects'];

const EditorPage = () => {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const previewRef  = useRef();

  const {
    resume,
    updateSection,
    updateTemplate,
    loadResume,
    resetResume
  } = useResume();

  const [activeTab, setActiveTab] = useState('Personal');
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);

  useEffect(() => {
    if (id) {
      getResume(id)
        .then(res => loadResume(res.data))
        .catch(() => navigate('/dashboard'));
    }
  }, [id]);

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: resume.title || 'Resume',
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      if (id) {
        await updateResume(id, resume);
      } else {
        const res = await createResume(resume);
        navigate(`/editor/${res.data._id}`, { replace: true });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { resetResume(); navigate('/dashboard'); }}
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            ← Dashboard
          </button>
          <input
            value={resume.title}
            onChange={(e) => updateSection('title', e.target.value)}
            className="text-sm font-medium border-none outline-none bg-transparent text-gray-800 w-48"
            placeholder="Resume title..."
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={resume.template}
            onChange={(e) => updateTemplate(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
          </select>

          <button
            onClick={handleSave}
            disabled={saving}
            className="text-sm bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save'}
          </button>

          <button
            onClick={handlePrint}
            className="text-sm bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700"
          >
            Download PDF
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-57px)]">

        {/* Left — forms */}
        <div className="w-full md:w-2/5 overflow-y-auto border-r border-gray-200 bg-white">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors
                  ${activeTab === tab
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-5">
            {activeTab === 'Personal'   && <PersonalInfo />}
            {activeTab === 'Experience' && <ExperienceForm />}
            {activeTab === 'Education'  && <EducationForm />}
            {activeTab === 'Skills'     && <SkillsForm />}
            {activeTab === 'Projects'   && <ProjectsForm />}
          </div>
        </div>

        {/* Right — live preview */}
        <div className="hidden md:block md:w-3/5 overflow-y-auto bg-gray-100 p-6">
          <ResumePreview ref={previewRef} />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;