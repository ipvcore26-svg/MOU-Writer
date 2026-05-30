# IPV Ultra — Broker Referral Term Sheet Generator

A production-ready full-stack web application that generates completed DOCX documents from the IPV Ultra Broker Term Sheet template with 48 dynamic fields.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, TailwindCSS, React Hook Form |
| Backend | Node.js, Express |
| Document Engine | docxtemplater + pizzip |
| Styling | Dark luxury theme — black/gold/serif |
| Deployment | Docker + docker-compose |

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- npm

### Backend

```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

The frontend Vite dev server proxies `/api/*` to the backend automatically.

---

## Docker Deployment

```bash
# Build and start all services
docker-compose up --build -d

# Frontend: http://localhost:80
# Backend API: http://localhost:3001
```

To stop:

```bash
docker-compose down
```

---

## Application Routes

| Route | Description |
|---|---|
| `/` | Main dashboard — fill 48 fields and generate DOCX |
| `/admin` | Admin panel — upload and replace DOCX template |

---

## API Documentation

### `POST /api/generate`

Generates a completed DOCX from the current template.

**Request Body** (`application/json`):
```json
{
  "field1": "04 May 2026",
  "field2": "ABC Advisors LLP",
  "field3": "AAA-1234",
  ...
  "field48": "John Doe"
}
```

**Response**: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

Binary DOCX file download.

---

### `GET /api/admin/template-info`

Returns metadata about the currently active template.

**Response**:
```json
{
  "exists": true,
  "uploadedAt": "2026-05-04T10:00:00.000Z",
  "size": 45678
}
```

---

### `POST /api/admin/upload-template`

Replaces the current template with a new `.docx` file.

**Request**: `multipart/form-data` with field `template` (file).

**Response**:
```json
{
  "success": true,
  "message": "Template uploaded successfully",
  "info": { "exists": true, "uploadedAt": "...", "size": 45678 }
}
```

---

## Placeholder Mapping Table

The DOCX template uses `{{fieldN}}` placeholders. Each `[•]` in the original IPV Ultra term sheet was replaced in document order:

| Placeholder | DOCX Location | Field Description | Dashboard Section |
|---|---|---|---|
| `{{field1}}` | Header — "Date: [•]" | Execution Date | A. Execution Details |
| `{{field2}}` | Party 1 entity name | Consultant Entity Name | B. Consultant Details |
| `{{field3}}` | Party 1 LLP IN / CIN | LLP IN / CIN | B. Consultant Details |
| `{{field4}}` | Party 1 contact name | Contact Person Name | B. Consultant Details |
| `{{field5}}` | Party 1 address | Contact Person Address | B. Consultant Details |
| `{{field6}}` | Party 1 email | Contact Person Email | B. Consultant Details |
| `{{field7}}` | Party 1 phone | Contact Person Phone | B. Consultant Details |
| `{{field8}}` | Party 2 contact phone | IPV Phone (Chaitanya) | C. Investment Manager |
| `{{field9}}` | Party 2 office email | IPV Office Email | C. Investment Manager |
| `{{field10}}` | Ultra A — Management Fee % | Annual Mgmt Fee % p.a. | D. IPV Ultra A |
| `{{field11}}` | Ultra A — Years | Charged for N years | D. IPV Ultra A |
| `{{field12}}` | Ultra A — Carry | Profit Sharing (Carry) | D. IPV Ultra A |
| `{{field13}}` | Ultra A — Hurdle | Hurdle Rate | D. IPV Ultra A |
| `{{field14}}` | Ultra A — Min Ticket | Min Investment Ticket INR | D. IPV Ultra A |
| `{{field15}}` | Ultra A — 1st Drawdown | 1st Drawdown INR | D. IPV Ultra A |
| `{{field16}}` | Ultra A — 2nd Drawdown | 2nd Drawdown INR | D. IPV Ultra A |
| `{{field17}}` | Ultra A — 3rd Drawdown | 3rd Drawdown INR | D. IPV Ultra A |
| `{{field18}}` | Ultra A — 4th Drawdown | 4th Drawdown INR | D. IPV Ultra A |
| `{{field19}}` | Ultra B — Management Fee | Annual Mgmt Fee | E. IPV Ultra B |
| `{{field20}}` | Ultra B — Years | Charged for N years | E. IPV Ultra B |
| `{{field21}}` | Ultra B — Carry | Profit Sharing (Carry) | E. IPV Ultra B |
| `{{field22}}` | Ultra B — Hurdle | Hurdle Rate | E. IPV Ultra B |
| `{{field23}}` | Ultra B — Min Ticket | Min Investment Ticket INR | E. IPV Ultra B |
| `{{field24}}` | Ultra B — 1st Drawdown | 1st Drawdown INR | E. IPV Ultra B |
| `{{field25}}` | Ultra B — 2nd Drawdown | 2nd Drawdown INR | E. IPV Ultra B |
| `{{field26}}` | Ultra B — 3rd Drawdown | 3rd Drawdown INR | E. IPV Ultra B |
| `{{field27}}` | Ultra B — 4th Drawdown | 4th Drawdown INR | E. IPV Ultra B |
| `{{field28}}` | Fee Table — Slab 1 Amount | Slab 1 Contribution (INR Cr) | F. Contribution Slabs |
| `{{field29}}` | Fee Table — Slab 2 Amount | Slab 2 Contribution (INR Cr) | F. Contribution Slabs |
| `{{field30}}` | Fee Table — Slab 3 Amount | Slab 3 Contribution (INR Cr) | F. Contribution Slabs |
| `{{field31}}` | Fee Table — Slab 4 Amount | Slab 4 Contribution (INR Cr) | F. Contribution Slabs |
| `{{field32}}` | Fee Table — Slab 5 Amount | Slab 5 Contribution (INR Cr) | F. Contribution Slabs |
| `{{field33}}` | Fee Table — Row ₹25L-50L, Slab 1 | Slab 1 Fee % ₹25L–50L | G. Fee Share ₹25L–50L |
| `{{field34}}` | Fee Table — Row ₹25L-50L, Slab 2 | Slab 2 Fee % ₹25L–50L | G. Fee Share ₹25L–50L |
| `{{field35}}` | Fee Table — Row ₹25L-50L, Slab 3 | Slab 3 Fee % ₹25L–50L | G. Fee Share ₹25L–50L |
| `{{field36}}` | Fee Table — Row ₹25L-50L, Slab 4 | Slab 4 Fee % ₹25L–50L | G. Fee Share ₹25L–50L |
| `{{field37}}` | Fee Table — Row ₹25L-50L, Slab 5 | Slab 5 Fee % ₹25L–50L | G. Fee Share ₹25L–50L |
| `{{field38}}` | Fee Table — Row ₹50L+, Slab 1 | Slab 1 Fee % ₹50L+ | H. Fee Share ₹50L+ |
| `{{field39}}` | Fee Table — Row ₹50L+, Slab 2 | Slab 2 Fee % ₹50L+ | H. Fee Share ₹50L+ |
| `{{field40}}` | Fee Table — Row ₹50L+, Slab 3 | Slab 3 Fee % ₹50L+ | H. Fee Share ₹50L+ |
| `{{field41}}` | Fee Table — Row ₹50L+, Slab 4 | Slab 4 Fee % ₹50L+ | H. Fee Share ₹50L+ |
| `{{field42}}` | Fee Table — Row ₹50L+, Slab 5 | Slab 5 Fee % ₹50L+ | H. Fee Share ₹50L+ |
| `{{field43}}` | Exclusivity clause — region | Exclusivity Region | I. Exclusivity |
| `{{field44}}` | Exclusivity clause — end date | Exclusivity End Date | I. Exclusivity |
| `{{field45}}` | Exclusivity clause — min AUM/month | Min AUM Per Month (₹) | I. Exclusivity |
| `{{field46}}` | Exclusivity clause — quarterly AUM | Quarterly AUM Threshold (₹) | I. Exclusivity |
| `{{field47}}` | Validity clause — period | Validity Period (Years) | J. Validity & Signatory |
| `{{field48}}` | Signature block — consultant | Consultant Signatory Name | J. Validity & Signatory |

---

## Template Replacement Guide

To update the template without changing code:

1. Open your `.docx` in Microsoft Word
2. Find each `[•]` placeholder and replace it with `{{field1}}` through `{{field48}}` in the same sequential order as the table above
3. Save as `.docx`
4. Go to `/admin` in the application and upload the new file
5. The old template is replaced immediately — no restart needed

---

## Project Structure

```
MOU-Writer/
├── backend/
│   ├── routes/
│   │   ├── generate.js       # POST /api/generate
│   │   └── admin.js          # GET/POST /api/admin/*
│   ├── services/
│   │   └── docxService.js    # docxtemplater engine
│   ├── templates/
│   │   └── current-template.docx
│   ├── uploads/              # temp multer storage
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── FormSection.tsx
│   │   │   └── LivePreview.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   └── AdminPage.tsx
│   │   ├── types/
│   │   │   └── fields.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```
