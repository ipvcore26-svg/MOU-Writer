const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');

const TEMPLATE_PATH = path.join(__dirname, '../templates/current-template.docx');

function generateDocument(fields) {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    throw new Error('Template not found. Please upload a template first.');
  }

  const content = fs.readFileSync(TEMPLATE_PATH, 'binary');
  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: '{{', end: '}}' },
  });

  doc.render(fields);

  return doc.getZip().generate({ type: 'nodebuffer', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
}

function getTemplateInfo() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    return { exists: false };
  }
  const stat = fs.statSync(TEMPLATE_PATH);
  return { exists: true, uploadedAt: stat.mtime, size: stat.size };
}

module.exports = { generateDocument, getTemplateInfo, TEMPLATE_PATH };
