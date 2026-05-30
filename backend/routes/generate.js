const express = require('express');
const router = express.Router();
const { generateDocument } = require('../services/docxService');
const { generatePDF, DEFAULTS } = require('../services/pdfService');

// Apply defaults for any field that is missing or empty
function normaliseFields(body) {
  const fields = {};
  for (const key of Object.keys(DEFAULTS)) {
    const val = body[key];
    fields[key] = (val !== undefined && val !== null && String(val).trim() !== '')
      ? String(val)
      : DEFAULTS[key];
  }
  return fields;
}

// POST /api/generate      → DOCX
router.post('/', (req, res) => {
  try {
    const fields = normaliseFields(req.body);
    const buffer = generateDocument(fields);
    const filename = `IPV_Ultra_Term_Sheet_${Date.now()}.docx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  } catch (err) {
    console.error('Generate DOCX error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/generate/pdf  → PDF
router.post('/pdf', async (req, res) => {
  try {
    const fields = normaliseFields(req.body);
    const buffer = await generatePDF(fields);
    const entityName = (fields.field2 || 'Broker').replace(/[^a-zA-Z0-9_-]/g, '_');
    const date = new Date().toISOString().split('T')[0];
    const filename = `IPV_Ultra_Term_Sheet_${entityName}_${date}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  } catch (err) {
    console.error('Generate PDF error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
