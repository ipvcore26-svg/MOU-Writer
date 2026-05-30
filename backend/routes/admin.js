const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { getTemplateInfo, TEMPLATE_PATH } = require('../services/docxService');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.dirname(TEMPLATE_PATH);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, 'current-template.docx');
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.originalname.endsWith('.docx')) {
      cb(null, true);
    } else {
      cb(new Error('Only .docx files are allowed'));
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 },
});

router.get('/template-info', (req, res) => {
  res.json(getTemplateInfo());
});

router.post('/upload-template', upload.single('template'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ success: true, message: 'Template uploaded successfully', info: getTemplateInfo() });
});

module.exports = router;
