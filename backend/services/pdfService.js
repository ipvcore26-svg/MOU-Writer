const PDFDocument = require('pdfkit');

// ── Default values (mirror of frontend DEFAULT_VALUES) ────────────────────────
const today = new Date().toISOString().split('T')[0];
const oneYearLater = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

const DEFAULTS = {
  field1: today,
  field2: 'Consultant Entity Name',
  field3: 'LLP IN / CIN Number',
  field4: 'Contact Person Name',
  field5: 'Address Line 1, City, State – PIN Code',
  field6: 'contact@example.com',
  field7: '+91 XXXXXXXXXX',
  field8: '+91 XXXXXXXXXX',
  field9: 'office@ipvultra.com',
  field10: '2%',
  field11: '5',
  field12: '20%',
  field13: '8%',
  field14: '1,00,00,000',
  field15: '25,00,000',
  field16: '25,00,000',
  field17: '25,00,000',
  field18: '25,00,000',
  field19: '1.5%',
  field20: '5',
  field21: '15%',
  field22: '8%',
  field23: '50,00,000',
  field24: '12,50,000',
  field25: '12,50,000',
  field26: '12,50,000',
  field27: '12,50,000',
  field28: '1',
  field29: '2',
  field30: '5',
  field31: '10',
  field32: '20',
  field33: '1%',
  field34: '1.25%',
  field35: '1.5%',
  field36: '1.75%',
  field37: '2%',
  field38: '1.5%',
  field39: '1.75%',
  field40: '2%',
  field41: '2.25%',
  field42: '2.5%',
  field43: 'Pan India',
  field44: oneYearLater,
  field45: '50,00,000',
  field46: '1,50,00,000',
  field47: '3',
  field48: 'Authorised Signatory Name',
  field49: 'Not Allowed',
  field50: 'Not Allowed',
  field51: 'Allowed',
};

function applyDefaults(rawFields) {
  const out = {};
  for (const key of Object.keys(DEFAULTS)) {
    const val = rawFields[key];
    out[key] = (val !== undefined && val !== null && String(val).trim() !== '')
      ? String(val)
      : DEFAULTS[key];
  }
  return out;
}

// ── Colours ───────────────────────────────────────────────────────────────────
const GOLD   = '#B8962E';
const DARK   = '#1a1a2e';
const ALT_BG = '#f4f4f4';
const LABEL  = '#666666';
const VALUE  = '#111111';

// ── PDF builder ───────────────────────────────────────────────────────────────
function generatePDF(rawFields) {
  const fields = applyDefaults(rawFields);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50, autoFirstPage: true });
    const chunks = [];
    doc.on('data',  c  => chunks.push(c));
    doc.on('end',   ()  => resolve(Buffer.concat(chunks)));
    doc.on('error', err => reject(err));

    const W  = doc.page.width;          // 595.28
    const LM = 50;
    const RM = 50;
    const PW = W - LM - RM;            // 495.28

    // ── Draw the header on the first page ─────────────────────────────────────
    function drawHeader() {
      doc.save();
      doc.rect(0, 0, W, 84).fill(DARK);
      doc.fontSize(22).fillColor(GOLD).font('Helvetica-Bold')
         .text('IPV ULTRA', LM, 16, { lineBreak: false });
      doc.fontSize(11).fillColor('#ffffff').font('Helvetica')
         .text('Broker Referral Term Sheet', LM, 44, { lineBreak: false });
      doc.fontSize(8).fillColor('#aaaaaa')
         .text('Binding Referral Agreement — Confidential', LM, 62, { lineBreak: false });
      if (fields.field1) {
        doc.fontSize(9).fillColor(GOLD).font('Helvetica-Bold')
           .text('Dated: ' + fields.field1, 0, 38, { align: 'right', width: W - RM, lineBreak: false });
      }
      doc.restore();
      doc.y = 100;
    }

    // ── Section header bar ────────────────────────────────────────────────────
    function section(letter, title) {
      if (doc.y + 44 > doc.page.height - 60) { doc.addPage(); doc.y = 30; }
      else doc.y += 10;
      const y = doc.y;
      doc.save();
      doc.rect(LM, y, PW, 24).fill(DARK);
      doc.fontSize(10).fillColor(GOLD).font('Helvetica-Bold')
         .text(letter + '.  ' + title, LM + 8, y + 7, { width: PW - 16, lineBreak: false });
      doc.restore();
      doc.y = y + 30;
    }

    // ── Key-value row ─────────────────────────────────────────────────────────
    const COL = 210;  // label column width

    function row(label, value, alt) {
      const RH = 20;
      if (doc.y + RH > doc.page.height - 60) { doc.addPage(); doc.y = 30; }
      const y = doc.y;
      if (alt) {
        doc.save();
        doc.rect(LM, y, PW, RH).fill(ALT_BG);
        doc.restore();
      }
      // label
      doc.fontSize(8.5).fillColor(LABEL).font('Helvetica-Bold')
         .text(label, LM + 4, y + 4, { width: COL - 8, lineBreak: false });

      // value — badge if Allowed / Not Allowed
      const v = (value !== undefined && value !== null) ? String(value) : '—';
      if (v === 'Allowed' || v === 'Not Allowed') {
        const bx = LM + COL;
        const bg = v === 'Allowed' ? '#1a5c3a' : '#5c1a1a';
        const fg = v === 'Allowed' ? '#4ade80' : '#f87171';
        doc.save();
        doc.roundedRect(bx, y + 3, 92, 14, 3).fill(bg);
        doc.fontSize(8).fillColor(fg).font('Helvetica-Bold')
           .text(v, bx, y + 6, { width: 92, align: 'center', lineBreak: false });
        doc.restore();
      } else {
        doc.fontSize(8.5).fillColor(VALUE).font('Helvetica')
           .text(v, LM + COL + 4, y + 4, { width: PW - COL - 8, lineBreak: false });
      }
      // divider
      doc.save();
      doc.moveTo(LM, y + RH).lineTo(LM + PW, y + RH)
         .strokeColor('#e0e0e0').lineWidth(0.4).stroke();
      doc.restore();
      doc.y = y + RH;
    }

    // ── Table helpers ─────────────────────────────────────────────────────────
    function tHead(cols) {
      if (doc.y + 20 > doc.page.height - 60) { doc.addPage(); doc.y = 30; }
      const y = doc.y;
      doc.save();
      doc.rect(LM, y, PW, 20).fill('#2a2a4a');
      let x = LM;
      cols.forEach(([txt, w]) => {
        doc.fontSize(8).fillColor(GOLD).font('Helvetica-Bold')
           .text(txt, x + 4, y + 6, { width: w - 8, lineBreak: false });
        x += w;
      });
      doc.restore();
      doc.y = y + 20;
    }

    function tRow(vals, cols, alt) {
      const RH = 18;
      if (doc.y + RH > doc.page.height - 60) { doc.addPage(); doc.y = 30; }
      const y = doc.y;
      if (alt) {
        doc.save();
        doc.rect(LM, y, PW, RH).fill(ALT_BG);
        doc.restore();
      }
      let x = LM;
      vals.forEach((v, i) => {
        const w = cols[i][1];
        doc.fontSize(8).fillColor(VALUE).font('Helvetica')
           .text(v || '—', x + 4, y + 4, { width: w - 8, lineBreak: false });
        x += w;
      });
      doc.save();
      doc.moveTo(LM, y + RH).lineTo(LM + PW, y + RH)
         .strokeColor('#e0e0e0').lineWidth(0.4).stroke();
      doc.restore();
      doc.y = y + RH;
    }

    // ── Build document ────────────────────────────────────────────────────────
    drawHeader();

    // A — Execution
    section('A', 'EXECUTION DETAILS');
    row('Execution Date', fields.field1, false);

    // B — Consultant
    section('B', 'CONSULTANT DETAILS');
    row('Consultant Entity Name',  fields.field2, false);
    row('LLP IN / CIN',            fields.field3, true);
    row('Contact Person Name',     fields.field4, false);
    row('Contact Person Address',  fields.field5, true);
    row('Contact Person Email',    fields.field6, false);
    row('Contact Person Phone',    fields.field7, true);

    // C — Investment Manager
    section('C', 'INVESTMENT MANAGER (IPV)');
    row('IPV Phone (Chaitanya)', fields.field8, false);
    row('IPV Office Email',      fields.field9, true);

    // D — Ultra A
    section('D', 'IPV ULTRA A — TERMS');
    row('Annual Management Fee',       fields.field10, false);
    row('Charged For (Years)',         fields.field11, true);
    row('Profit Sharing (Carry)',      fields.field12, false);
    row('Hurdle Rate',                 fields.field13, true);
    row('Min Investment Ticket (INR)', fields.field14, false);
    row('1st Drawdown (INR)',          fields.field15, true);
    row('2nd Drawdown (INR)',          fields.field16, false);
    row('3rd Drawdown (INR)',          fields.field17, true);
    row('4th Drawdown (INR)',          fields.field18, false);

    // E — Ultra B
    section('E', 'IPV ULTRA B — TERMS');
    row('Annual Management Fee',       fields.field19, false);
    row('Charged For (Years)',         fields.field20, true);
    row('Profit Sharing (Carry)',      fields.field21, false);
    row('Hurdle Rate',                 fields.field22, true);
    row('Min Investment Ticket (INR)', fields.field23, false);
    row('1st Drawdown (INR)',          fields.field24, true);
    row('2nd Drawdown (INR)',          fields.field25, false);
    row('3rd Drawdown (INR)',          fields.field26, true);
    row('4th Drawdown (INR)',          fields.field27, false);

    // F–H — Slabs table
    section('F–H', 'CONTRIBUTION SLABS & FEE STRUCTURE');
    const c1 = 40, c2 = 140, c3 = 110, c4 = PW - c1 - c2 - c3;
    const slabCols = [['Slab', c1], ['Contribution (INR Cr)', c2], ['Fee % ₹25L–50L', c3], ['Fee % ₹50L+', c4]];
    tHead(slabCols);
    [
      [fields.field28, fields.field33, fields.field38],
      [fields.field29, fields.field34, fields.field39],
      [fields.field30, fields.field35, fields.field40],
      [fields.field31, fields.field36, fields.field41],
      [fields.field32, fields.field37, fields.field42],
    ].forEach(([amt, f25, f50], i) =>
      tRow([`Slab ${i + 1}`, amt, f25, f50], slabCols, i % 2 === 0)
    );

    // I — Exclusivity & Permissions
    section('I', 'EXCLUSIVITY & PERMISSIONS');
    row('Exclusivity Region',           fields.field43, false);
    row('Exclusivity End Date',         fields.field44, true);
    row('Min AUM Per Month (₹)',         fields.field45, false);
    row('Quarterly AUM Threshold (₹)',   fields.field46, true);
    row('Sub-Referral Rights',          fields.field49, false);
    row('Assignment of Agreement',      fields.field50, true);
    row('Sub-Broking Appointment',      fields.field51, false);

    // J — Validity
    section('J', 'VALIDITY & SIGNATORY');
    row('Validity Period (Years)',     fields.field47, false);
    row('Consultant Signatory Name',  fields.field48, true);

    // ── Signature block ───────────────────────────────────────────────────────
    if (doc.y + 90 > doc.page.height - 60) { doc.addPage(); doc.y = 30; }
    doc.y += 20;
    const sy = doc.y;
    const hw = Math.floor((PW - 30) / 2);

    // left
    doc.save();
    doc.moveTo(LM, sy + 40).lineTo(LM + hw, sy + 40).strokeColor(DARK).lineWidth(1).stroke();
    doc.restore();
    doc.fontSize(8).fillColor(DARK).font('Helvetica-Bold')
       .text('Authorised Signatory — Consultant', LM, sy + 44, { width: hw, lineBreak: false });
    doc.fontSize(8).fillColor(LABEL).font('Helvetica')
       .text(fields.field48, LM, sy + 56, { width: hw, lineBreak: false });

    // right
    const rx = LM + hw + 30;
    doc.save();
    doc.moveTo(rx, sy + 40).lineTo(rx + hw, sy + 40).strokeColor(DARK).lineWidth(1).stroke();
    doc.restore();
    doc.fontSize(8).fillColor(DARK).font('Helvetica-Bold')
       .text('Authorised Signatory — IPV Ultra', rx, sy + 44, { width: hw, lineBreak: false });

    doc.end();
  });
}

module.exports = { generatePDF, DEFAULTS };
