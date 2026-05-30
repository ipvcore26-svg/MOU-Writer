const PDFDocument = require('pdfkit');

const GOLD = '#B8962E';
const DARK = '#1a1a2e';
const LIGHT_GRAY = '#f0f0f0';
const MED_GRAY = '#555555';

function generatePDF(fields) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4', autoFirstPage: true, bufferPages: true });
    const chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const pageWidth = doc.page.width - 100;

    // ── Header ────────────────────────────────────────────────────────────────
    doc.rect(0, 0, doc.page.width, 90).fill(DARK);

    doc.fontSize(22).fillColor(GOLD).font('Helvetica-Bold')
      .text('IPV ULTRA', 50, 18, { lineBreak: false });
    doc.fontSize(11).fillColor('#ffffff').font('Helvetica')
      .text('Broker Referral Term Sheet', 50, 46, { lineBreak: false });
    doc.fontSize(8).fillColor('#999999')
      .text('Binding Referral Agreement — Confidential', 50, 65, { lineBreak: false });

    if (fields.field1) {
      doc.fontSize(9).fillColor(GOLD).font('Helvetica-Bold')
        .text(`Dated: ${fields.field1}`, 0, 35, { align: 'right', width: doc.page.width - 50, lineBreak: false });
    }

    doc.y = 110;

    // ── Helpers ───────────────────────────────────────────────────────────────

    function ensureSpace(needed) {
      if (doc.y + needed > doc.page.height - 60) {
        doc.addPage();
        doc.y = 50;
      }
    }

    function sectionHeader(letter, title) {
      ensureSpace(40);
      doc.moveDown(0.6);
      const y = doc.y;
      doc.rect(50, y, pageWidth, 24).fill(DARK);
      doc.fontSize(10).fillColor(GOLD).font('Helvetica-Bold')
        .text(`${letter}.  ${title}`, 60, y + 7, { width: pageWidth - 10, lineBreak: false });
      doc.y = y + 30;
    }

    function row(label, value, alt = false) {
      ensureSpace(24);
      const y = doc.y;
      if (alt) {
        doc.rect(50, y, pageWidth, 20).fill(LIGHT_GRAY);
      }

      // draw label
      doc.fontSize(8.5).fillColor(MED_GRAY).font('Helvetica-Bold')
        .text(label, 52, y + 4, { width: 195, lineBreak: false });

      const displayValue = (value !== undefined && value !== null && value !== '') ? String(value) : '—';
      const isAllowed = displayValue === 'Allowed';
      const isNotAllowed = displayValue === 'Not Allowed';

      if (isAllowed || isNotAllowed) {
        const badgeX = 260;
        doc.rect(badgeX, y + 2, 90, 16)
          .fill(isAllowed ? '#1a5c3a' : '#5c1a1a');
        doc.fontSize(8).fillColor(isAllowed ? '#4ade80' : '#f87171').font('Helvetica-Bold')
          .text(displayValue, badgeX, y + 6, { width: 90, align: 'center', lineBreak: false });
      } else {
        doc.fontSize(8.5).fillColor(DARK).font('Helvetica')
          .text(displayValue, 260, y + 4, { width: pageWidth - 212, lineBreak: false });
      }

      // separator line
      doc.moveTo(50, y + 20).lineTo(50 + pageWidth, y + 20)
        .strokeColor('#dddddd').lineWidth(0.5).stroke();

      doc.y = y + 22;
    }

    function tableHeader(cols) {
      ensureSpace(30);
      const y = doc.y;
      doc.rect(50, y, pageWidth, 20).fill('#2a2a4a');
      let x = 50;
      cols.forEach(([text, w]) => {
        doc.fontSize(8).fillColor(GOLD).font('Helvetica-Bold')
          .text(text, x + 4, y + 6, { width: w - 8, lineBreak: false });
        x += w;
      });
      doc.y = y + 20;
    }

    function tableRow(vals, cols, alt = false) {
      ensureSpace(20);
      const y = doc.y;
      if (alt) {
        doc.rect(50, y, pageWidth, 18).fill(LIGHT_GRAY);
      }
      let x = 50;
      vals.forEach((v, i) => {
        const w = cols[i][1];
        const displayV = (v !== undefined && v !== null && v !== '') ? String(v) : '—';
        doc.fontSize(8).fillColor(DARK).font('Helvetica')
          .text(displayV, x + 4, y + 4, { width: w - 8, lineBreak: false });
        x += w;
      });
      doc.moveTo(50, y + 18).lineTo(50 + pageWidth, y + 18)
        .strokeColor('#dddddd').lineWidth(0.5).stroke();
      doc.y = y + 18;
    }

    // ── Section A ─────────────────────────────────────────────────────────────
    sectionHeader('A', 'EXECUTION DETAILS');
    row('Execution Date', fields.field1);

    // ── Section B ─────────────────────────────────────────────────────────────
    sectionHeader('B', 'CONSULTANT DETAILS');
    row('Consultant Entity Name', fields.field2, true);
    row('LLP IN / CIN', fields.field3);
    row('Contact Person Name', fields.field4, true);
    row('Contact Person Address', fields.field5);
    row('Contact Person Email', fields.field6, true);
    row('Contact Person Phone', fields.field7);

    // ── Section C ─────────────────────────────────────────────────────────────
    sectionHeader('C', 'INVESTMENT MANAGER (IPV)');
    row('IPV Phone (Chaitanya)', fields.field8, true);
    row('IPV Office Email', fields.field9);

    // ── Section D ─────────────────────────────────────────────────────────────
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

    // ── Section E ─────────────────────────────────────────────────────────────
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

    // ── Sections F / G / H as combined table ─────────────────────────────────
    sectionHeader('F–H', 'CONTRIBUTION SLABS & FEE STRUCTURE');
    const slabCols = [
      ['Slab', 45],
      ['Contribution (INR Cr)', 140],
      ['Fee % ₹25L–50L', 110],
      ['Fee % ₹50L+', pageWidth - 295],
    ];
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

    // ── Section I ─────────────────────────────────────────────────────────────
    sectionHeader('I', 'EXCLUSIVITY & PERMISSIONS');
    row('Exclusivity Region', fields.field43, true);
    row('Exclusivity End Date', fields.field44);
    row('Min AUM Per Month (₹)', fields.field45, true);
    row('Quarterly AUM Threshold (₹)', fields.field46);
    row('Sub-Referral Rights', fields.field49, true);
    row('Assignment of Agreement', fields.field50);

    // ── Section J ─────────────────────────────────────────────────────────────
    sectionHeader('J', 'VALIDITY & SIGNATORY');
    row('Validity Period (Years)', fields.field47, true);
    row('Consultant Signatory Name', fields.field48);

    // ── Signature block ───────────────────────────────────────────────────────
    ensureSpace(100);
    doc.moveDown(1.5);
    const sigY = doc.y;
    const halfW = Math.floor((pageWidth - 40) / 2);

    // Left
    doc.moveTo(50, sigY + 45).lineTo(50 + halfW, sigY + 45)
      .strokeColor(DARK).lineWidth(1).stroke();
    doc.fontSize(8).fillColor(DARK).font('Helvetica-Bold')
      .text('Authorised Signatory — Consultant', 50, sigY + 49, { width: halfW, lineBreak: false });
    doc.fontSize(8).fillColor(MED_GRAY).font('Helvetica')
      .text(fields.field48 || '_______________', 50, sigY + 61, { width: halfW, lineBreak: false });

    // Right
    const rightX = 50 + halfW + 40;
    doc.moveTo(rightX, sigY + 45).lineTo(rightX + halfW, sigY + 45)
      .strokeColor(DARK).lineWidth(1).stroke();
    doc.fontSize(8).fillColor(DARK).font('Helvetica-Bold')
      .text('Authorised Signatory — IPV Ultra', rightX, sigY + 49, { width: halfW, lineBreak: false });

    // ── Footer on all pages ───────────────────────────────────────────────────
    const range = doc.bufferedPageRange();
    const totalPages = range.count;
    for (let i = 0; i < totalPages; i++) {
      doc.switchToPage(range.start + i);
      const fy = doc.page.height - 30;
      doc.rect(0, fy - 8, doc.page.width, 38).fill(DARK);
      doc.fontSize(7).fillColor('#888888').font('Helvetica')
        .text(
          `IPV Ultra — Broker Referral Term Sheet  •  Confidential  •  Page ${i + 1} of ${totalPages}`,
          50, fy, { align: 'center', width: pageWidth, lineBreak: false }
        );
    }

    doc.flushPages();
    doc.end();
  });
}

module.exports = { generatePDF };
