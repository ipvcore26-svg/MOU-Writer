import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface TemplateInfo {
  exists: boolean;
  uploadedAt?: string;
  size?: number;
}

export default function AdminPage() {
  const [info, setInfo] = useState<TemplateInfo | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/admin/template-info')
      .then((r) => r.json())
      .then(setInfo)
      .catch(() => setInfo({ exists: false }));
  }, []);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage('');
    setError('');

    const formData = new FormData();
    formData.append('template', file);

    try {
      const res = await fetch('/api/admin/upload-template', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setMessage('Template replaced successfully.');
      setInfo(data.info);
      if (fileRef.current) fileRef.current.value = '';
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function formatSize(bytes?: number) {
    if (!bytes) return '—';
    return (bytes / 1024).toFixed(1) + ' KB';
  }

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-surface-200 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-surface-400 hover:text-brand-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className="font-serif text-brand-700 text-lg font-semibold">Admin Panel</h1>
            <p className="text-surface-400 text-xs">Template Management</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          <span className="text-xs text-surface-500">IPV Ultra System</span>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-8 py-10 space-y-8">
        {/* Current Template Status */}
        <div className="section-card">
          <h2 className="section-title">Current Template</h2>
          {info === null ? (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading...
            </div>
          ) : info.exists ? (
            <div className="flex items-start gap-4">
              <div className="w-12 h-14 bg-brand-50 border border-brand-200 rounded flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-800">current-template.docx</p>
                <p className="text-xs text-surface-500 mt-1">
                  Last updated: {info.uploadedAt ? new Date(info.uploadedAt).toLocaleString() : '—'}
                </p>
                <p className="text-xs text-surface-500">Size: {formatSize(info.size)}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-xs text-green-400">Active</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-yellow-500 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              No template found. Please upload one below.
            </div>
          )}
        </div>

        {/* Upload */}
        <div className="section-card">
          <h2 className="section-title">Upload New Template</h2>
          <p className="text-xs text-surface-500 mb-4">
            Upload a <code className="text-brand-600 bg-brand-50 px-1 py-0.5 rounded">.docx</code> file with <code className="text-brand-600 bg-brand-50 px-1 py-0.5 rounded">{'{{field1}}'}</code> through <code className="text-brand-600 bg-brand-50 px-1 py-0.5 rounded">{'{{field48}}'}</code> placeholders. The previous template will be replaced automatically.
          </p>

          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="gold-label">Select Template File</label>
              <div
                className="border-2 border-dashed border-surface-300 hover:border-brand-400 rounded-lg p-8 text-center cursor-pointer transition-colors"
                onClick={() => fileRef.current?.click()}
              >
                <svg className="w-10 h-10 text-surface-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-surface-500">Click to select a .docx file</p>
                <p className="text-xs text-surface-400 mt-1">Max 50MB</p>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={(e) => {
                    const name = e.target.files?.[0]?.name;
                    if (name) {
                      const label = e.target.closest('div')?.querySelector('p');
                      if (label) label.textContent = name;
                    }
                  }}
                />
              </div>
            </div>

            {message && (
              <div className="flex items-center gap-2 text-brand-700 text-sm bg-brand-50 border border-brand-200 px-3 py-2 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {message}
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 text-red-300 text-sm bg-red-900/20 border border-red-500/30 px-3 py-2 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={uploading} className="btn-primary w-full justify-center">
              {uploading ? 'Uploading...' : 'Upload & Replace Template'}
            </button>
          </form>
        </div>

        {/* Placeholder Guide */}
        <div className="section-card">
          <h2 className="section-title">Placeholder Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-surface-200">
                  <th className="text-left py-2 text-brand-600 font-medium">Placeholder</th>
                  <th className="text-left py-2 text-brand-600 font-medium">Field</th>
                  <th className="text-left py-2 text-brand-600 font-medium">Section</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['{{field1}}', 'Execution Date', 'A'],
                  ['{{field2}}', 'Consultant Entity Name', 'B'],
                  ['{{field3}}', 'LLP IN / CIN', 'B'],
                  ['{{field4}}', 'Contact Person Name', 'B'],
                  ['{{field5}}', 'Contact Person Address', 'B'],
                  ['{{field6}}', 'Contact Person Email', 'B'],
                  ['{{field7}}', 'Contact Person Phone', 'B'],
                  ['{{field8}}', 'IPV Phone (Chaitanya)', 'C'],
                  ['{{field9}}', 'IPV Office Email', 'C'],
                  ['{{field10–18}}', 'IPV Ultra A Details', 'D'],
                  ['{{field19–27}}', 'IPV Ultra B Details', 'E'],
                  ['{{field28–32}}', 'Contribution Slab Amounts', 'F'],
                  ['{{field33–37}}', 'Fee % ₹25L–50L per Slab', 'G'],
                  ['{{field38–42}}', 'Fee % ₹50L+ per Slab', 'H'],
                  ['{{field43}}', 'Exclusivity Region', 'I'],
                  ['{{field44}}', 'Exclusivity End Date', 'I'],
                  ['{{field45}}', 'Min AUM Per Month', 'I'],
                  ['{{field46}}', 'Quarterly AUM Threshold', 'I'],
                  ['{{field47}}', 'Validity Period (Years)', 'J'],
                  ['{{field48}}', 'Consultant Signatory Name', 'J'],
                ].map(([ph, label, sec]) => (
                  <tr key={ph} className="border-b border-surface-100 hover:bg-surface-50 transition-colors">
                    <td className="py-1.5 pr-4 font-mono text-brand-600">{ph}</td>
                    <td className="py-1.5 pr-4 text-surface-700">{label}</td>
                    <td className="py-1.5 text-surface-500">{sec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
