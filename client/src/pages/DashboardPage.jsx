import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllResumes, createResume, deleteResume } from '../api/resumeApi';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const navigate              = useNavigate();
  const { resetResume }       = useResume();
  const { user }              = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await getAllResumes();
      setResumes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    resetResume();
    navigate('/editor');
  };

  const handleEdit = (id) => {
    navigate(`/editor/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resume?')) return;
    setDeleting(id);
    try {
      await deleteResume(id);
      setResumes(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      alert('Failed to delete.');
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              My Resumes
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Welcome back, {user?.name}
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="bg-indigo-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span> New Resume
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && resumes.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📄</div>
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              No resumes yet
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Create your first resume and start applying
            </p>
            <button
              onClick={handleCreate}
              className="bg-indigo-600 text-white text-sm px-6 py-2.5 rounded-lg hover:bg-indigo-700"
            >
              Create Resume
            </button>
          </div>
        )}

        {/* Resume grid */}
        {!loading && resumes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Create new card */}
            <button
              onClick={handleCreate}
              className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors min-h-[180px]"
            >
              <span className="text-4xl mb-2">+</span>
              <span className="text-sm font-medium">New Resume</span>
            </button>

            {/* Resume cards */}
            {resumes.map((resume) => (
              <ResumeCard
                key={resume._id}
                resume={resume}
                onEdit={handleEdit}
                onDelete={handleDelete}
                deleting={deleting}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Resume Card ────────────────────────────────────────────────
const ResumeCard = ({ resume, onEdit, onDelete, deleting, formatDate }) => {
  const templateColors = {
    classic: 'bg-indigo-50 text-indigo-600',
    modern:  'bg-purple-50 text-purple-600',
    minimal: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow min-h-[180px]">
      {/* Top */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 flex-1 mr-2">
            {resume.title || 'Untitled Resume'}
          </h3>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize shrink-0 ${templateColors[resume.template] || 'bg-gray-100 text-gray-500'}`}>
            {resume.template}
          </span>
        </div>
        <p className="text-xs text-gray-400">
          Updated {formatDate(resume.updatedAt)}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-4" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(resume._id)}
          className="flex-1 text-xs bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(resume._id)}
          disabled={deleting === resume._id}
          className="flex-1 text-xs border border-red-200 text-red-500 py-2 rounded-lg hover:bg-red-50 font-medium disabled:opacity-50"
        >
          {deleting === resume._id ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;