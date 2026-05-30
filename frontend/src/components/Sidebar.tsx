import { SECTIONS, FormFields } from '../types/fields';
import { UseFormWatch } from 'react-hook-form';

interface SidebarProps {
  activeSection: string;
  onSectionClick: (id: string) => void;
  watch: UseFormWatch<FormFields>;
}

export default function Sidebar({ activeSection, onSectionClick, watch }: SidebarProps) {
  const values = watch();

  function getSectionCompletion(fields: (keyof FormFields)[]) {
    const filled = fields.filter((f) => (values[f] || '').trim() !== '').length;
    return { filled, total: fields.length };
  }

  const totalFields = 51;
  const filledFields = Object.values(values).filter((v) => (v || '').trim() !== '').length;
  const progress = Math.round((filledFields / totalFields) * 100);

  return (
    <aside className="w-72 bg-white border-r border-surface-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-surface-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-600 rounded-sm flex items-center justify-center">
            <span className="text-white font-serif font-bold text-sm">IPV</span>
          </div>
          <div>
            <h1 className="font-serif text-brand-700 text-sm font-semibold leading-tight">IPV Ultra</h1>
            <p className="text-surface-400 text-xs">Term Sheet Generator</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 py-4 border-b border-surface-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-surface-500 uppercase tracking-wider">Completion</span>
          <span className="text-xs font-semibold text-brand-600">{progress}%</span>
        </div>
        <div className="w-full bg-surface-200 rounded-full h-1.5">
          <div
            className="bg-brand-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-surface-400 mt-1">{filledFields} / {totalFields} fields</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {SECTIONS.map((section) => {
          const { filled, total } = getSectionCompletion(section.fields);
          const complete = filled === total;
          const partial = filled > 0 && !complete;

          return (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md mb-1 flex items-center justify-between transition-all duration-150 group
                ${activeSection === section.id
                  ? 'bg-brand-50 border border-brand-200 text-brand-700'
                  : 'text-surface-500 hover:bg-surface-100 hover:text-surface-800'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  complete ? 'bg-brand-500' : partial ? 'bg-brand-300' : 'bg-surface-300'
                }`} />
                <span className="text-xs font-medium">{section.label}</span>
              </div>
              <span className={`text-xs ${complete ? 'text-brand-500' : 'text-surface-400'}`}>
                {filled}/{total}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer nav */}
      <div className="p-4 border-t border-surface-200">
        <a
          href="/admin"
          className="flex items-center gap-2 text-xs text-surface-400 hover:text-brand-600 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Admin Panel
        </a>
      </div>
    </aside>
  );
}
