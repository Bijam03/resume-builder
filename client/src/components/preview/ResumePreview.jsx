import { forwardRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import TemplateClassic from './templates/TemplateClassic';
import TemplateModern  from './templates/TemplateModern';
import TemplateMinimal from './templates/TemplateMinimal';

const ResumePreview = forwardRef((props, ref) => {
  const { resume } = useResume();

  return (
    <div ref={ref} className="bg-white shadow-lg rounded-xl overflow-hidden w-full">
      {resume.template === 'modern'  && <TemplateModern  resume={resume} />}
      {resume.template === 'minimal' && <TemplateMinimal resume={resume} />}
      {resume.template === 'classic' && <TemplateClassic resume={resume} />}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;