import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from 'react-hook-form';
import { FormFields, FIELD_LABELS, SECTIONS, TOGGLE_FIELDS } from '../types/fields';

interface FormSectionProps {
  register: UseFormRegister<FormFields>;
  watch: UseFormWatch<FormFields>;
  setValue: UseFormSetValue<FormFields>;
  errors: FieldErrors<FormFields>;
}

const DATE_FIELDS: (keyof FormFields)[] = ['field1', 'field44'];
const EMAIL_FIELDS: (keyof FormFields)[] = ['field6', 'field9'];
const TEL_FIELDS: (keyof FormFields)[] = ['field7', 'field8'];
const TEXTAREA_FIELDS: (keyof FormFields)[] = ['field5'];

function getInputType(field: keyof FormFields): string {
  if (DATE_FIELDS.includes(field)) return 'date';
  if (EMAIL_FIELDS.includes(field)) return 'email';
  if (TEL_FIELDS.includes(field)) return 'tel';
  return 'text';
}

interface ToggleProps {
  field: keyof FormFields;
  value: string;
  onChange: (val: string) => void;
}

function AllowedToggle({ field: _field, value, onChange }: ToggleProps) {
  const isAllowed = value === 'Allowed';

  return (
    <div className="flex items-center gap-1 mt-1">
      <button
        type="button"
        onClick={() => onChange('Allowed')}
        className={`
          flex-1 py-2 px-4 rounded-l-md text-sm font-semibold transition-all duration-200 border
          ${isAllowed
            ? 'bg-emerald-700 border-emerald-500 text-emerald-100 shadow-inner'
            : 'bg-dark-700 border-dark-500 text-gray-500 hover:bg-dark-600 hover:text-gray-300'}
        `}
      >
        ✓ Allowed
      </button>
      <button
        type="button"
        onClick={() => onChange('Not Allowed')}
        className={`
          flex-1 py-2 px-4 rounded-r-md text-sm font-semibold transition-all duration-200 border
          ${!isAllowed
            ? 'bg-red-900 border-red-700 text-red-200 shadow-inner'
            : 'bg-dark-700 border-dark-500 text-gray-500 hover:bg-dark-600 hover:text-gray-300'}
        `}
      >
        ✗ Not Allowed
      </button>
    </div>
  );
}

export default function FormSection({ register, watch, setValue, errors: _errors }: FormSectionProps) {
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
              const isToggle = TOGGLE_FIELDS.includes(field);
              const currentValue = values[field] || '';
              const hasValue = currentValue.trim() !== '';

              return (
                <div key={field} className={isTextarea ? 'md:col-span-2' : ''}>
                  <label className="gold-label" htmlFor={field}>
                    <span className="text-gray-600 mr-1">{field.replace('field', '#')}</span>
                    {label}
                    {hasValue && <span className="ml-1 text-gold-500">✓</span>}
                  </label>

                  {isToggle ? (
                    <>
                      {/* Hidden input keeps the value in react-hook-form */}
                      <input type="hidden" {...register(field)} />
                      <AllowedToggle
                        field={field}
                        value={currentValue}
                        onChange={(val) => setValue(field, val, { shouldDirty: true })}
                      />
                    </>
                  ) : isTextarea ? (
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
