const express = require('express');
const router = express.Router();
const { generateDocument } = require('../services/docxService');

router.post('/', (req, res) => {
  try {
    const fields = req.body;

    // Validate all 48 fields present
    const missing = [];
    for (let i = 1; i <= 48; i++) {
      const key = `field${i}`;
      if (fields[key] === undefined || fields[key] === null) {
        fields[key] = '';
      }
    }

    const buffer = generateDocument(fields);

    const filename = `IPV_Ultra_Term_Sheet_${Date.now()}.docx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  } catch (err) {
    console.error('Generate error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
