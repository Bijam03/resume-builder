const TemplateMinimal = ({ resume }) => {
  const p = resume.personalInfo;
  const experience = resume.experience;
  const education = resume.education;
  const skills = resume.skills;
  const projects = resume.projects;

  return (
    <div className="font-sans text-[13px] leading-relaxed bg-white min-h-[1000px]">

      <div className="bg-gray-900 text-white px-8 py-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {p.name || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-gray-400 text-xs">
          {p.email ? <span><Dot /> {p.email}</span> : null}
          {p.phone ? <span><Dot /> {p.phone}</span> : null}
          {p.location ? <span><Dot /> {p.location}</span> : null}
          {p.linkedin ? <span><Dot /> {p.linkedin}</span> : null}
          {p.github ? <span><Dot /> {p.github}</span> : null}
        </div>
      </div>

      <div className="flex">

        <div className="w-[65%] px-8 py-6 space-y-5 border-r border-gray-100">

          {p.summary ? (
            <Section title="About Me">
              <p className="text-gray-600 leading-relaxed">{p.summary}</p>
            </Section>
          ) : null}

          {experience.length > 0 ? (
            <Section title="Work Experience">
              {experience.map((exp, i) => (
                <ExpItem key={i} exp={exp} />
              ))}
            </Section>
          ) : null}

          {projects.length > 0 ? (
            <Section title="Projects">
              {projects.map((proj, i) => (
                <ProjItem key={i} proj={proj} />
              ))}
            </Section>
          ) : null}

        </div>

        <div className="w-[35%] px-6 py-6 space-y-5 bg-gray-50">

          {skills.length > 0 ? (
            <Section title="Skills">
              <div className="space-y-2">
                {skills.map((skill, i) => (
                  <SkillItem key={i} skill={skill} />
                ))}
              </div>
            </Section>
          ) : null}

          {education.length > 0 ? (
            <Section title="Education">
              {education.map((edu, i) => (
                <EduItem key={i} edu={edu} />
              ))}
            </Section>
          ) : null}

          {p.linkedin || p.github ? (
            <Section title="Links">
              <div className="space-y-1.5">
                {p.linkedin ? (
                  <LinkItem url={p.linkedin} />
                ) : null}
                {p.github ? (
                  <LinkItem url={p.github} />
                ) : null}
              </div>
            </Section>
          ) : null}

        </div>
      </div>
    </div>
  );
};

const ExpItem = ({ exp }) => {
  const dates = exp.startDate + (exp.endDate ? ' – ' + exp.endDate : '');
  return (
    <div className="mb-4 relative pl-4 border-l-2 border-gray-200">
      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-900" />
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-gray-900">{exp.role}</p>
          <p className="text-gray-500 text-xs mt-0.5">{exp.company}</p>
        </div>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0 ml-2">
          {dates}
        </span>
      </div>
      {exp.description ? (
        <p className="text-gray-600 mt-1.5 text-xs leading-relaxed">{exp.description}</p>
      ) : null}
    </div>
  );
};

const ProjItem = ({ proj }) => {
  const techs = proj.techStack ? proj.techStack.split(',') : [];
  const link  = proj.link || '';
  const name  = proj.name || '';
  const desc  = proj.description || '';

  return (
    <div className="mb-4 relative pl-4 border-l-2 border-gray-200">
      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-900" />
      <div className="flex justify-between items-start">
        <p className="font-semibold text-gray-900">{name}</p>
        {link ? (
          <a href={link} className="text-xs text-indigo-500 hover:underline shrink-0 ml-2">
            View →
          </a>
        ) : null}
      </div>
      {techs.length > 0 ? (
        <div className="flex flex-wrap gap-1 mt-1">
          {techs.map((t, j) => (
            <span key={j} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {t.trim()}
            </span>
          ))}
        </div>
      ) : null}
      {desc ? (
        <p className="text-gray-600 mt-1 text-xs leading-relaxed">{desc}</p>
      ) : null}
    </div>
  );
};

const SkillItem = ({ skill }) => {
  const name  = skill.name || '';
  const level = skill.level || 'Intermediate';
  const width = level === 'Advanced' ? '90%' : level === 'Intermediate' ? '60%' : '30%';

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-700 font-medium">{name}</span>
        <span className="text-gray-400">{level}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1">
        <div className="bg-gray-900 h-1 rounded-full" style={{ width: width }} />
      </div>
    </div>
  );
};

const EduItem = ({ edu }) => {
  const school = edu.school || '';
  const degree = edu.degree || '';
  const field  = edu.field  || '';
  const start  = edu.startDate || '';
  const end    = edu.endDate   || '';
  const dates  = start + (end ? ' – ' + end : '');
  const course = degree + (field ? ' · ' + field : '');

  return (
    <div className="mb-3">
      <p className="font-semibold text-gray-800 text-xs">{school}</p>
      <p className="text-gray-500 text-xs mt-0.5">{course}</p>
      <p className="text-gray-400 text-[11px] mt-0.5">{dates}</p>
    </div>
  );
};

const LinkItem = ({ url }) => (
  <a href={url} className="block text-xs text-indigo-600 hover:underline truncate">
    {url}
  </a>
);

const Dot = () => (
  <span className="inline-block w-1 h-1 rounded-full bg-gray-500 mt-[3px]" />
);

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">
      {title}
    </h2>
    {children}
  </div>
);

export default TemplateMinimal;