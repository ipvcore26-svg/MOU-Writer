import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from 'react-hook-form';
import { FormFields, FIELD_LABELS, SECTIONS, TOGGLE_FIELDS, DEFAULT_VALUES } from '../types/fields';

interface FormSectionProps {
  register: UseFormRegister<FormFields>;
  watch: UseFormWatch<FormFields>;
  setValue: UseFormSetValue<FormFields>;
  errors: FieldErrors<FormFields>;
}

const DATE_FIELDS:     (keyof FormFields)[] = ['field10', 'field44'];
const EMAIL_FIELDS:    (keyof FormFields)[] = ['field3', 'field13'];
const TEL_FIELDS:      (keyof FormFields)[] = ['field7', 'field8'];
const NUMBER_FIELDS:   (keyof FormFields)[] = ['field9'];
const TEXTAREA_FIELDS: (keyof FormFields)[] = ['field5'];

function getInputType(field: keyof FormFields): string {
  if (DATE_FIELDS.includes(field))   return 'date';
  if (EMAIL_FIELDS.includes(field))  return 'email';
  if (TEL_FIELDS.includes(field))    return 'tel';
  if (NUMBER_FIELDS.includes(field)) return 'number';
  return 'text';
}

// ── Allowed / Not Allowed toggle ─────────────────────────────────────────────
interface ToggleProps {
  field: keyof FormFields;
  value: string;
  onChange: (val: string) => void;
}

function AllowedToggle({ value, onChange }: ToggleProps) {
  const isAllowed = value === 'Allowed';

  return (
    <div className="flex mt-1 rounded-md overflow-hidden border border-surface-200">
      <button
        type="button"
        onClick={() => onChange('Allowed')}
        className={[
          'flex-1 py-2.5 text-sm font-semibold transition-all duration-200',
          isAllowed
            ? 'bg-emerald-600 text-white shadow-inner'
            : 'bg-white text-surface-400 hover:bg-surface-50 hover:text-surface-600',
        ].join(' ')}
      >
        ✓ Allowed
      </button>
      <div className="w-px bg-surface-200" />
      <button
        type="button"
        onClick={() => onChange('Not Allowed')}
        className={[
          'flex-1 py-2.5 text-sm font-semibold transition-all duration-200',
          !isAllowed
            ? 'bg-red-600 text-white shadow-inner'
            : 'bg-white text-surface-400 hover:bg-surface-50 hover:text-surface-600',
        ].join(' ')}
      >
        ✗ Not Allowed
      </button>
    </div>
  );
}

// ── Main form section component ───────────────────────────────────────────────
export default function FormSection({ register, watch, setValue, errors: _errors }: FormSectionProps) {
  const values = watch();

  return (
    <div className="space-y-6">
      {SECTIONS.map((section) => (
        <div key={section.id} id={section.id} className="section-card scroll-mt-6">
          <h2 className="section-title">{section.label}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field) => {
              const label       = FIELD_LABELS[field];
              const isTextarea  = TEXTAREA_FIELDS.includes(field);
              const isToggle    = TOGGLE_FIELDS.includes(field);
              const currentVal  = values[field] ?? '';
              const defaultVal  = DEFAULT_VALUES[field] ?? '';
              // show ✓ when user has typed something different from the raw default or any value is present
              const hasValue    = currentVal.trim() !== '';

              return (
                <div key={field} className={isTextarea ? 'md:col-span-2' : ''}>
                  <label className="gold-label" htmlFor={field}>
                    <span className="text-surface-400 mr-1">{field.replace('field', '#')}</span>
                    {label}
                    {hasValue && <span className="ml-1 text-brand-500">✓</span>}
                  </label>

                  {isToggle ? (
                    <>
                      <input type="hidden" {...register(field)} />
                      <AllowedToggle
                        field={field}
                        value={currentVal || defaultVal}
                        onChange={(val) => setValue(field, val, { shouldDirty: true })}
                      />
                    </>
                  ) : isTextarea ? (
                    <textarea
                      id={field}
                      rows={3}
                      className="gold-input resize-none"
                      placeholder={defaultVal ? `e.g. ${defaultVal}` : `Enter ${label.toLowerCase()}`}
                      {...register(field)}
                    />
                  ) : (
                    <input
                      id={field}
                      type={getInputType(field)}
                      className="gold-input"
                      placeholder={
                        DATE_FIELDS.includes(field)
                          ? undefined                              // browser handles date placeholder
                          : defaultVal
                            ? `e.g. ${defaultVal}`
                            : `Enter ${label.toLowerCase()}`
                      }
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
