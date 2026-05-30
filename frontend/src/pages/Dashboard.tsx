import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../components/Sidebar';
import FormSection from '../components/FormSection';
import LivePreview from '../components/LivePreview';
import { FormFields, DEFAULT_VALUES } from '../types/fields';

const STORAGE_KEY = 'ipv_term_sheet_draft';

export default function Dashboard() {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
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

  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<FormFields>({
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

  async function onSubmit(data: FormFields) {
    setGenerating(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/generate/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(err.error || `Server error ${res.status}`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `IPV_Ultra_Term_Sheet_${data.field2 || 'Broker'}_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSuccess(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Generation failed');
    } finally {
      setGenerating(false);
    }
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
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClearDraft}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Clear Draft
            </button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mx-8 mt-4 bg-red-900/20 border border-red-500/30 text-red-300 text-sm px-4 py-3 rounded-md flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {/* Form */}
        <form id="term-sheet-form" onSubmit={handleSubmit(onSubmit)} className="px-8 py-6">
          <FormSection register={register} watch={watch} setValue={setValue} errors={errors} />
        </form>
      </main>

      <LivePreview watch={watch} />
    </div>
  );
}
