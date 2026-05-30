import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../components/Sidebar';
import FormSection from '../components/FormSection';
import LivePreview from '../components/LivePreview';
import { FormFields, DEFAULT_VALUES } from '../types/fields';

const STORAGE_KEY = 'ipv_term_sheet_draft';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('execution');
  const mainRef = useRef<HTMLDivElement>(null);

  const savedValues = (() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : DEFAULT_VALUES;
    } catch {
      return DEFAULT_VALUES;
    }
  })();

  const { register, watch, reset, setValue } = useForm<FormFields>({
    defaultValues: savedValues,
  });

  const values = watch();

  // Autosave
  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    }, 800);
    return () => clearTimeout(id);
  }, [values]);

  // Track active section on scroll
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { root: main, threshold: 0.3 }
    );

    const sections = main.querySelectorAll('[id]');
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function handleSectionClick(id: string) {
    setActiveSection(id);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleClearDraft() {
    if (confirm('Clear all draft data?')) {
      localStorage.removeItem(STORAGE_KEY);
      reset(DEFAULT_VALUES);
    }
  }

  return (
    <div className="flex min-h-screen bg-dark-900">
      <Sidebar activeSection={activeSection} onSectionClick={handleSectionClick} watch={watch} />

      {/* Main form */}
      <main ref={mainRef} className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-dark-900/95 backdrop-blur border-b border-dark-500 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-gold-400 text-xl font-semibold">Broker Referral Term Sheet</h1>
            <p className="text-gray-500 text-xs mt-0.5">IPV Ultra — Binding Referral Agreement Generator</p>
          </div>
          <button
            type="button"
            onClick={handleClearDraft}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Clear Draft
          </button>
        </div>

        {/* Form — no submit, data is auto-saved to localStorage */}
        <div className="px-8 py-6">
          <FormSection register={register} watch={watch} setValue={setValue} errors={{}} />
        </div>
      </main>

      <LivePreview watch={watch} />
    </div>
  );
}
