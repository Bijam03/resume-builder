const TemplateModern = ({ resume }) => {
  const { personalInfo: p, experience, education, skills, projects } = resume;

  return (
    <div className="font-sans text-[13px] leading-relaxed bg-white min-h-[1000px] flex">

      {/* Left sidebar */}
      <div className="w-1/3 bg-indigo-700 text-white p-6 space-y-6">
        <div>
          <h1 className="text-xl font-bold">{p.name || 'Your Name'}</h1>
          <div className="mt-2 space-y-1 text-indigo-200 text-xs">
            {p.email    && <p>{p.email}</p>}
            {p.phone    && <p>{p.phone}</p>}
            {p.location && <p>{p.location}</p>}
            {p.linkedin && <p>{p.linkedin}</p>}
            {p.github   && <p>{p.github}</p>}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-2">Skills</h2>
            <div className="space-y-1">
              {skills.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span>{s.name}</span>
                    <span className="text-indigo-300">{s.level}</span>
                  </div>
                  <div className="w-full bg-indigo-500 rounded-full h-1">
                    <div
                      className="bg-white rounded-full h-1"
                      style={{ width: s.level === 'Advanced' ? '90%' : s.level === 'Intermediate' ? '60%' : '30%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-2">Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-2 text-xs">
                <p className="font-semibold text-white">{edu.school}</p>
                <p className="text-indigo-200">{edu.degree} {edu.field}</p>
                <p className="text-indigo-300">{edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ''}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right content */}
      <div className="w-2/3 p-6 space-y-5">
        {p.summary && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-700 border-b border-gray-200 pb-1 mb-2">
              Profile
            </h2>
            <p className="text-gray-600">{p.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-700 border-b border-gray-200 pb-1 mb-2">
              Experience
            </h2>
            {experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-800">{exp.role}</p>
                  <p className="text-gray-400 text-xs">{exp.startDate}{exp.endDate ? ` — ${exp.endDate}` : ''}</p>
                </div>
                <p className="text-indigo-600 text-xs">{exp.company}</p>
                {exp.description && <p className="text-gray-600 mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-700 border-b border-gray-200 pb-1 mb-2">
              Projects
            </h2>
            {projects.map((proj, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-gray-800">{proj.name}</p>
                  {proj.link && <a href={proj.link} className="text-indigo-500 text-xs hover:underline">Link</a>}
                </div>
                {proj.techStack   && <p className="text-xs text-gray-400">{proj.techStack}</p>}
                {proj.description && <p className="text-gray-600 mt-1">{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateModern;