import { useResume } from '../../context/ResumeContext';

const empty = { name: '', description: '', link: '', techStack: '' };

const ProjectsForm = () => {
  const { resume, updateSection } = useResume();
  const list = resume.projects;

  const handleChange = (index, e) => {
    const updated = list.map((item, i) =>
      i === index ? { ...item, [e.target.name]: e.target.value } : item
    );
    updateSection('projects', updated);
  };

  const addItem    = () => updateSection('projects', [...list, { ...empty }]);
  const removeItem = (index) =>
    updateSection('projects', list.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-gray-700">Projects</h2>
        <button
          onClick={addItem}
          className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100"
        >
          + Add
        </button>
      </div>

      {list.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">No projects added yet.</p>
      )}

      {list.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500">Project {index + 1}</span>
            <button onClick={() => removeItem(index)} className="text-xs text-red-400 hover:text-red-600">
              Remove
            </button>
          </div>
          {[
            { label: 'Project Name', name: 'name',        placeholder: 'Resume Builder' },
            { label: 'Tech Stack',   name: 'techStack',   placeholder: 'React, Node, MongoDB' },
            { label: 'Live Link',    name: 'link',        placeholder: 'https://...' },
          ].map(({ label, name, placeholder }) => (
            <div key={name}>
              <label className="block text-xs text-gray-500 mb-1">{label}</label>
              <input
                name={name}
                value={item[name]}
                onChange={(e) => handleChange(index, e)}
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Description</label>
            <textarea
              name="description"
              value={item.description}
              onChange={(e) => handleChange(index, e)}
              rows={2}
              placeholder="What does this project do?"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsForm;