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

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormFields>({
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
      const res = await fetch('/api/generate', {
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
      a.download = `IPV_Ultra_Term_Sheet_${data.field2 || 'Broker'}_${new Date().toISOString().split('T')[0]}.docx`;
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
            <button
              type="submit"
              form="term-sheet-form"
              disabled={generating}
              className="btn-primary"
            >
              {generating ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate Document
                </>
              )}
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
        {success && (
          <div className="mx-8 mt-4 bg-gold-900/20 border border-gold-500/30 text-gold-300 text-sm px-4 py-3 rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Document generated successfully! Your download should have started.
            </div>
            <button
              type="submit"
              form="term-sheet-form"
              className="text-xs border border-gold-500/50 text-gold-400 hover:bg-gold-500/10 px-3 py-1 rounded transition-colors"
            >
              Download Again
            </button>
          </div>
        )}

        {/* Form */}
        <form id="term-sheet-form" onSubmit={handleSubmit(onSubmit)} className="px-8 py-6">
          <FormSection register={register} watch={watch} errors={errors} />
        </form>
      </main>

      <LivePreview watch={watch} />
    </div>
  );
}
