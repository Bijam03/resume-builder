const Section = ({ title, children }) => (
  <div className="mb-4">
    <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-700 border-b border-indigo-200 pb-1 mb-2">
      {title}
    </h2>
    {children}
  </div>
);

const TemplateClassic = ({ resume }) => {
  const { personalInfo: p, experience, education, skills, projects } = resume;

  return (
    <div className="font-sans text-gray-800 text-[13px] leading-relaxed p-8 bg-white min-h-[1000px]">

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{p.name || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-1 text-gray-500 text-xs">
          {p.email    && <span>{p.email}</span>}
          {p.phone    && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
          {p.github   && <span>{p.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {p.summary && (
        <Section title="Summary">
          <p className="text-gray-600">{p.summary}</p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{exp.role}</p>
                  <p className="text-gray-500">{exp.company}</p>
                </div>
                <p className="text-gray-400 text-xs shrink-0 ml-2">
                  {exp.startDate}{exp.endDate ? ` — ${exp.endDate}` : ''}
                </p>
              </div>
              {exp.description && (
                <p className="text-gray-600 mt-1">{exp.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} className="mb-2 flex justify-between items-start">
              <div>
                <p className="font-semibold">{edu.school}</p>
                <p className="text-gray-500">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
              </div>
              <p className="text-gray-400 text-xs shrink-0 ml-2">
                {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ''}
              </p>
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full">
                {skill.name} {skill.level !== 'Intermediate' ? `· ${skill.level}` : ''}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((proj, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <p className="font-semibold">{proj.name}</p>
                {proj.link && (
                  <a href={proj.link} className="text-indigo-500 text-xs ml-2 hover:underline">
                    Link
                  </a>
                )}
              </div>
              {proj.techStack   && <p className="text-gray-400 text-xs">{proj.techStack}</p>}
              {proj.description && <p className="text-gray-600 mt-1">{proj.description}</p>}
            </div>
          ))}
        </Section>
      )}
    </div>
  );
};

export default TemplateClassic;