import { useResume } from '../../context/ResumeContext';

const empty = { name: '', level: 'Intermediate' };

const SkillsForm = () => {
  const { resume, updateSection } = useResume();
  const list = resume.skills;

  const handleChange = (index, e) => {
    const updated = list.map((item, i) =>
      i === index ? { ...item, [e.target.name]: e.target.value } : item
    );
    updateSection('skills', updated);
  };

  const addItem    = () => updateSection('skills', [...list, { ...empty }]);
  const removeItem = (index) =>
    updateSection('skills', list.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-gray-700">Skills</h2>
        <button
          onClick={addItem}
          className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100"
        >
          + Add
        </button>
      </div>

      {list.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">No skills added yet.</p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {list.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-xl p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Skill {index + 1}</span>
              <button onClick={() => removeItem(index)} className="text-xs text-red-400 hover:text-red-600">
                Remove
              </button>
            </div>
            <input
              name="name"
              value={item.name}
              onChange={(e) => handleChange(index, e)}
              placeholder="React, Node.js..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <select
              name="level"
              value={item.level}
              onChange={(e) => handleChange(index, e)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;