const express = require('express');
const router = express.Router();
const { generateDocument } = require('../services/docxService');
const { generatePDF } = require('../services/pdfService');

// Normalise incoming fields — fill missing ones with empty string
function normaliseFields(body) {
  const fields = { ...body };
  for (let i = 1; i <= 50; i++) {
    const key = `field${i}`;
    if (fields[key] === undefined || fields[key] === null) {
      fields[key] = '';
    }
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
