import { UseFormWatch } from 'react-hook-form';
import { FormFields, FIELD_LABELS } from '../types/fields';

interface LivePreviewProps {
  watch: UseFormWatch<FormFields>;
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 py-1.5 border-b border-surface-100 last:border-0">
      <span className="text-surface-500 text-xs w-36 flex-shrink-0 pt-0.5">{label}</span>
      <span className="text-surface-800 text-xs flex-1 break-words">{value || <span className="text-surface-300 italic">—</span>}</span>
    </div>
  );
}

export default function LivePreview({ watch }: LivePreviewProps) {
  const values = watch();

  const sections = [
    { title: 'Execution & Consultant', fields: ['field10','field11','field1','field3'] as (keyof FormFields)[] },
    { title: 'IPV Ultra A', fields: ['field7','field14','field15','field16','field17'] as (keyof FormFields)[] },
    { title: 'IPV Ultra B', fields: ['field22','field23','field24','field25','field26'] as (keyof FormFields)[] },
    { title: 'Slabs & Fee', fields: ['field31','field32','field36','field41'] as (keyof FormFields)[] },
    { title: 'Exclusivity & Permissions', fields: ['field46','field47','field49','field50','field51'] as (keyof FormFields)[] },
    { title: 'Validity', fields: ['field48'] as (keyof FormFields)[] },
  ];

  return (
    <div className="w-80 bg-white border-l border-surface-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-5 border-b border-surface-200">
        <h2 className="font-serif text-brand-700 text-sm font-semibold">Live Preview</h2>
        <p className="text-surface-400 text-xs mt-0.5">Key field summary</p>
      </div>

      <div className="p-5 space-y-5">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">{section.title}</h3>
            {section.fields.map((field) => (
              <PreviewRow key={field} label={FIELD_LABELS[field]} value={values[field]} />
            ))}
          </div>
        ))}

        {/* Document preview card */}
        <div className="mt-4 border border-brand-200 rounded-md p-4 bg-brand-50">
          <div className="text-center">
            <div className="w-10 h-10 bg-brand-100 border border-brand-200 rounded-sm flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-xs font-medium text-surface-700 font-serif">
              {values.field11 || 'Broker Referral Term Sheet'}
            </p>
            <p className="text-xs text-surface-400 mt-0.5">
              {values.field10 ? `Dated: ${values.field10}` : 'Date not set'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
