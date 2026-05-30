import { UseFormRegister, UseFormWatch, FieldErrors } from 'react-hook-form';
import { FormFields, FIELD_LABELS, SECTIONS } from '../types/fields';

interface FormSectionProps {
  register: UseFormRegister<FormFields>;
  watch: UseFormWatch<FormFields>;
  errors: FieldErrors<FormFields>;
}

const DATE_FIELDS: (keyof FormFields)[] = ['field1', 'field44'];
const EMAIL_FIELDS: (keyof FormFields)[] = ['field6', 'field9'];
const TEL_FIELDS: (keyof FormFields)[] = ['field7', 'field8'];
const NUMBER_FIELDS: (keyof FormFields)[] = [
  'field10', 'field11', 'field14', 'field15', 'field16', 'field17', 'field18',
  'field20', 'field23', 'field24', 'field25', 'field26', 'field27',
  'field28', 'field29', 'field30', 'field31', 'field32',
  'field33', 'field34', 'field35', 'field36', 'field37',
  'field38', 'field39', 'field40', 'field41', 'field42',
  'field45', 'field46', 'field47',
];
const TEXTAREA_FIELDS: (keyof FormFields)[] = ['field5'];

function getInputType(field: keyof FormFields): string {
  if (DATE_FIELDS.includes(field)) return 'date';
  if (EMAIL_FIELDS.includes(field)) return 'email';
  if (TEL_FIELDS.includes(field)) return 'tel';
  if (NUMBER_FIELDS.includes(field)) return 'text';
  return 'text';
}

export default function FormSection({ register, watch, errors }: FormSectionProps) {
  const values = watch();

  return (
    <div className="space-y-6">
      {SECTIONS.map((section) => (
        <div key={section.id} id={section.id} className="section-card scroll-mt-6">
          <h2 className="section-title">{section.label}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field) => {
              const label = FIELD_LABELS[field];
              const isTextarea = TEXTAREA_FIELDS.includes(field);
              const hasValue = (values[field] || '').trim() !== '';

              return (
                <div key={field} className={isTextarea ? 'md:col-span-2' : ''}>
                  <label className="gold-label" htmlFor={field}>
                    <span className="text-gray-600 mr-1">{field.replace('field', '#')}</span>
                    {label}
                    {hasValue && <span className="ml-1 text-gold-500">✓</span>}
                  </label>
                  {isTextarea ? (
                    <textarea
                      id={field}
                      rows={3}
                      className="gold-input resize-none"
                      placeholder={`Enter ${label.toLowerCase()}`}
                      {...register(field)}
                    />
                  ) : (
                    <input
                      id={field}
                      type={getInputType(field)}
                      className="gold-input"
                      placeholder={`Enter ${label.toLowerCase()}`}
                      {...register(field)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
