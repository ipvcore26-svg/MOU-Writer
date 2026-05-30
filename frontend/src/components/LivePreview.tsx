import { UseFormWatch } from 'react-hook-form';
import { FormFields, FIELD_LABELS } from '../types/fields';

interface LivePreviewProps {
  watch: UseFormWatch<FormFields>;
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 py-1.5 border-b border-dark-600 last:border-0">
      <span className="text-gray-500 text-xs w-36 flex-shrink-0 pt-0.5">{label}</span>
      <span className="text-gray-200 text-xs flex-1 break-words">{value || <span className="text-dark-400 italic">—</span>}</span>
    </div>
  );
}

export default function LivePreview({ watch }: LivePreviewProps) {
  const values = watch();

  const sections = [
    { title: 'Execution & Consultant', fields: ['field1','field2','field3','field4','field6'] as (keyof FormFields)[] },
    { title: 'IPV Ultra A', fields: ['field10','field11','field12','field13','field14'] as (keyof FormFields)[] },
    { title: 'IPV Ultra B', fields: ['field19','field20','field21','field22','field23'] as (keyof FormFields)[] },
    { title: 'Slabs & Fee', fields: ['field28','field29','field33','field38'] as (keyof FormFields)[] },
    { title: 'Exclusivity & Validity', fields: ['field43','field44','field47','field48'] as (keyof FormFields)[] },
  ];

  return (
    <div className="w-80 bg-dark-800 border-l border-dark-500 h-screen sticky top-0 overflow-y-auto">
      <div className="p-5 border-b border-dark-500">
        <h2 className="font-serif text-gold-400 text-sm font-semibold">Live Preview</h2>
        <p className="text-gray-500 text-xs mt-0.5">Key field summary</p>
      </div>

      <div className="p-5 space-y-5">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold text-gold-600 uppercase tracking-wider mb-2">{section.title}</h3>
            {section.fields.map((field) => (
              <PreviewRow key={field} label={FIELD_LABELS[field]} value={values[field]} />
            ))}
          </div>
        ))}

        {/* Document preview card */}
        <div className="mt-4 border border-gold-500/20 rounded-md p-4 bg-dark-700">
          <div className="text-center">
            <div className="w-10 h-10 bg-gold-500/10 border border-gold-500/30 rounded-sm flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-xs font-medium text-gray-300 font-serif">
              {values.field2 || 'Broker Referral Term Sheet'}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">
              {values.field1 ? `Dated: ${values.field1}` : 'Date not set'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
