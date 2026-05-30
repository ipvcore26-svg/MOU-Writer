const PDFDocument = require('pdfkit');

const GOLD = '#B8962E';
const DARK = '#1a1a2e';
const LIGHT_GRAY = '#f5f5f5';
const MED_GRAY = '#666666';

function generatePDF(fields) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4', autoFirstPage: true });
    const chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const pageWidth = doc.page.width - 100; // left+right margins

    // ── Header ──────────────────────────────────────────────────────────────
    doc.rect(0, 0, doc.page.width, 90).fill(DARK);

    doc.fontSize(20).fillColor(GOLD).font('Helvetica-Bold')
      .text('IPV ULTRA', 50, 22);
    doc.fontSize(11).fillColor('#ffffff').font('Helvetica')
      .text('Broker Referral Term Sheet', 50, 46);
    doc.fontSize(8).fillColor('#aaaaaa')
      .text('Binding Referral Agreement — Confidential', 50, 62);

    // Execution date top-right
    if (fields.field1) {
      doc.fontSize(9).fillColor(GOLD).font('Helvetica-Bold')
        .text(`Dated: ${fields.field1}`, 50, 30, { align: 'right', width: pageWidth });
    }

    doc.y = 110;

    // ── Helper functions ─────────────────────────────────────────────────────
    function sectionHeader(letter, title) {
      if (doc.y > doc.page.height - 150) doc.addPage();
      doc.moveDown(0.5);
      doc.rect(50, doc.y, pageWidth, 22).fill(DARK);
      doc.fontSize(10).fillColor(GOLD).font('Helvetica-Bold')
        .text(`${letter}.  ${title}`, 58, doc.y - 18);
      doc.y += 8;
    }

    function row(label, value, highlight = false) {
      if (doc.y > doc.page.height - 80) doc.addPage();
      const y = doc.y;
      const labelW = 200;
      const valueX = 50 + labelW + 10;
      const valueW = pageWidth - labelW - 10;

      if (highlight) {
        doc.rect(50, y - 2, pageWidth, 18).fill(LIGHT_GRAY);
      }

      doc.fontSize(9).fillColor(MED_GRAY).font('Helvetica-Bold')
        .text(label, 50, y, { width: labelW });

      const displayValue = value || '—';
      const isAllowed = displayValue === 'Allowed';
      const isNotAllowed = displayValue === 'Not Allowed';

      if (isAllowed || isNotAllowed) {
        doc.rect(valueX, y - 1, 80, 14)
          .fill(isAllowed ? '#1a5c3a' : '#5c1a1a');
        doc.fontSize(8).fillColor(isAllowed ? '#4ade80' : '#f87171').font('Helvetica-Bold')
          .text(displayValue, valueX + 4, y + 2, { width: 72, align: 'center' });
      } else {
        doc.fontSize(9).fillColor(DARK).font('Helvetica')
          .text(displayValue, valueX, y, { width: valueW });
      }

      doc.y = Math.max(doc.y, y + 18);
    }

    function tableHeader(cols) {
      if (doc.y > doc.page.height - 120) doc.addPage();
      const y = doc.y;
      doc.rect(50, y, pageWidth, 18).fill('#2a2a4a');
      let x = 50;
      cols.forEach(([text, w]) => {
        doc.fontSize(8).fillColor(GOLD).font('Helvetica-Bold')
          .text(text, x + 4, y + 4, { width: w - 8 });
        x += w;
      });
      doc.y = y + 18;
    }

    function tableRow(vals, cols, alt = false) {
      if (doc.y > doc.page.height - 60) doc.addPage();
      const y = doc.y;
      if (alt) doc.rect(50, y, pageWidth, 16).fill('#f9f9f9');
      let x = 50;
      vals.forEach((v, i) => {
        const w = cols[i][1];
        doc.fontSize(8).fillColor(DARK).font('Helvetica')
          .text(v || '—', x + 4, y + 3, { width: w - 8 });
        x += w;
      });
      // border line
      doc.moveTo(50, y + 16).lineTo(50 + pageWidth, y + 16).strokeColor('#dddddd').lineWidth(0.5).stroke();
      doc.y = y + 16;
    }

    // ── SECTION A: Execution ─────────────────────────────────────────────────
    sectionHeader('A', 'EXECUTION DETAILS');
    row('Execution Date', fields.field1);

    // ── SECTION B: Consultant ─────────────────────────────────────────────────
    sectionHeader('B', 'CONSULTANT DETAILS');
    row('Consultant Entity Name', fields.field2, true);
    row('LLP IN / CIN', fields.field3);
    row('Contact Person Name', fields.field4, true);
    row('Contact Person Address', fields.field5);
    row('Contact Person Email', fields.field6, true);
    row('Contact Person Phone', fields.field7);

    // ── SECTION C: Investment Manager ─────────────────────────────────────────
    sectionHeader('C', 'INVESTMENT MANAGER (IPV)');
    row('IPV Phone (Chaitanya)', fields.field8, true);
    row('IPV Office Email', fields.field9);

    // ── SECTION D: IPV Ultra A ────────────────────────────────────────────────
    sectionHeader('D', 'IPV ULTRA A — TERMS');
    row('Annual Management Fee', fields.field10, true);
    row('Charged For (Years)', fields.field11);
    row('Profit Sharing (Carry)', fields.field12, true);
    row('Hurdle Rate', fields.field13);
    row('Min Investment Ticket (INR)', fields.field14, true);
    row('1st Drawdown (INR)', fields.field15);
    row('2nd Drawdown (INR)', fields.field16, true);
    row('3rd Drawdown (INR)', fields.field17);
    row('4th Drawdown (INR)', fields.field18, true);

    // ── SECTION E: IPV Ultra B ────────────────────────────────────────────────
    sectionHeader('E', 'IPV ULTRA B — TERMS');
    row('Annual Management Fee', fields.field19, true);
    row('Charged For (Years)', fields.field20);
    row('Profit Sharing (Carry)', fields.field21, true);
    row('Hurdle Rate', fields.field22);
    row('Min Investment Ticket (INR)', fields.field23, true);
    row('1st Drawdown (INR)', fields.field24);
    row('2nd Drawdown (INR)', fields.field25, true);
    row('3rd Drawdown (INR)', fields.field26);
    row('4th Drawdown (INR)', fields.field27, true);

    // ── SECTION F: Contribution Slabs ────────────────────────────────────────
    sectionHeader('F', 'CONTRIBUTION SLABS');
    const slabCols = [['Slab', 60], ['Contribution Amount (INR Cr)', 180], ['Fee % ₹25L–50L', 120], ['Fee % ₹50L+', 115]];
    tableHeader(slabCols);
    [
      [fields.field28, fields.field33, fields.field38],
      [fields.field29, fields.field34, fields.field39],
      [fields.field30, fields.field35, fields.field40],
      [fields.field31, fields.field36, fields.field41],
      [fields.field32, fields.field37, fields.field42],
    ].forEach(([amt, fee25, fee50], i) => {
      tableRow([`Slab ${i + 1}`, amt, fee25, fee50], slabCols, i % 2 === 0);
    });

    // ── SECTION I: Exclusivity ────────────────────────────────────────────────
    sectionHeader('I', 'EXCLUSIVITY & PERMISSIONS');
    row('Exclusivity Region', fields.field43, true);
    row('Exclusivity End Date', fields.field44);
    row('Min AUM Per Month (₹)', fields.field45, true);
    row('Quarterly AUM Threshold (₹)', fields.field46);
    row('Sub-Referral Rights', fields.field49, true);
    row('Assignment of Agreement', fields.field50);

    // ── SECTION J: Validity ───────────────────────────────────────────────────
    sectionHeader('J', 'VALIDITY & SIGNATORY');
    row('Validity Period (Years)', fields.field47, true);
    row('Consultant Signatory Name', fields.field48);

    // ── Signature block ───────────────────────────────────────────────────────
    doc.moveDown(2);
    if (doc.y > doc.page.height - 140) doc.addPage();

    const sigY = doc.y;
    const halfW = (pageWidth - 40) / 2;

    // Left signature
    doc.moveTo(50, sigY + 40).lineTo(50 + halfW, sigY + 40).strokeColor(DARK).lineWidth(1).stroke();
    doc.fontSize(8).fillColor(DARK).font('Helvetica-Bold')
      .text('Authorised Signatory — Consultant', 50, sigY + 44, { width: halfW });
    doc.fontSize(8).fillColor(MED_GRAY).font('Helvetica')
      .text(fields.field48 || '_______________', 50, sigY + 56, { width: halfW });

    // Right signature
    const rightX = 50 + halfW + 40;
    doc.moveTo(rightX, sigY + 40).lineTo(rightX + halfW, sigY + 40).strokeColor(DARK).lineWidth(1).stroke();
    doc.fontSize(8).fillColor(DARK).font('Helvetica-Bold')
      .text('Authorised Signatory — IPV Ultra', rightX, sigY + 44, { width: halfW });

    // ── Footer ─────────────────────────────────────────────────────────────────
    const footerY = doc.page.height - 40;
    doc.rect(0, footerY - 10, doc.page.width, 50).fill(DARK);
    doc.fontSize(7).fillColor('#888888').font('Helvetica')
      .text('This document is confidential and intended solely for the named parties. IPV Ultra — Broker Referral Term Sheet', 50, footerY, { align: 'center', width: pageWidth });

    doc.end();
  });
}

module.exports = { generatePDF };
