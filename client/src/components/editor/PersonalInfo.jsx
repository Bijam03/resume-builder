import { useResume } from '../../context/ResumeContext';

const fields = [
  { label: 'Full Name',    name: 'name',     type: 'text',  placeholder: 'John Doe' },
  { label: 'Email',        name: 'email',    type: 'email', placeholder: 'john@example.com' },
  { label: 'Phone',        name: 'phone',    type: 'text',  placeholder: '+91 98765 43210' },
  { label: 'Location',     name: 'location', type: 'text',  placeholder: 'Pune, India' },
  { label: 'LinkedIn URL', name: 'linkedin', type: 'text',  placeholder: 'linkedin.com/in/johndoe' },
  { label: 'GitHub URL',   name: 'github',   type: 'text',  placeholder: 'github.com/johndoe' },
];

const PersonalInfo = () => {
  const { resume, updatePersonalInfo } = useResume();

  const handleChange = (e) =>
    updatePersonalInfo({ [e.target.name]: e.target.value });

  return (
    <div className="space-y-4">
      <h2 className="text-base font-medium text-gray-700">Personal Info</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={resume.personalInfo[name] || ''}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Professional Summary</label>
        <textarea
          name="summary"
          value={resume.personalInfo.summary || ''}
          onChange={handleChange}
          rows={3}
          placeholder="Brief summary about yourself..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
        />
      </div>
    </div>
  );
};

export default PersonalInfo;