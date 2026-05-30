# IPV Ultra — Broker Referral Term Sheet Generator

A production-ready full-stack web application that generates completed **PDF** documents from the IPV Ultra Broker Referral Term Sheet with 51 dynamic fields, toggle permissions, and sensible defaults.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, TailwindCSS, React Hook Form |
| Backend | Node.js, Express |
| PDF Engine | pdfkit (pure JS — no Chromium required) |
| DOCX Engine | docxtemplater + pizzip |
| Styling | Dark luxury theme — black/gold/serif |
| Deployment | Docker + docker compose |

---

## Deployment (Docker)

### First-time setup or after any code change

```bash
# 1. Pull latest code
git fetch origin claude/pensive-cannon-5k4By
git checkout claude/pensive-cannon-5k4By

# 2. Stop existing containers
docker compose down

# 3. Rebuild images (--no-cache ensures new dependencies like pdfkit are installed)
docker compose build --no-cache

# 4. Start containers in background
docker compose up -d

# 5. Verify both containers are running
docker compose ps
```

Or use the helper script:

```bash
bash deploy.sh
```

### Access

| Service | URL |
|---|---|
| Dashboard | http://localhost |
| Admin Panel | http://localhost/admin |
| Backend API | http://localhost:3001 |

### Stop

```bash
docker compose down
```

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

The Vite dev server proxies `/api/*` to the backend automatically.

---

## Features

- **51-field form** split into 10 labelled sections (A–J)
- **PDF download** — fills all fields and generates a styled A4 PDF
- **Defaults always applied** — no field is ever blank in the output; sensible defaults used when user leaves a field empty
- **Placeholder hints** — every input shows `e.g. <default value>` so users know what to enter
- **Allowed / Not Allowed toggles** for:
  - Sub-Referral Rights (`field49`)
  - Assignment of Agreement (`field50`)
  - Sub-Broking Appointment (`field51`)
- **Auto-save** — form state persisted to localStorage every 800 ms
- **Live Preview** panel — key fields shown in real time
- **Progress tracker** in sidebar
- **Admin panel** — upload a replacement `.docx` template without code changes

---

## Application Routes

| Route | Description |
|---|---|
| `/` | Main dashboard — fill 51 fields and download PDF |
| `/admin` | Admin panel — upload and replace DOCX template |

---

## API Documentation

### `POST /api/generate/pdf`

Generates a completed, styled PDF from all 51 fields. Empty fields fall back to defaults automatically.

**Request Body** (`application/json`):
```json
{
  "field1": "2026-05-30",
  "field2": "ABC Advisors LLP",
  "field49": "Allowed",
  "field50": "Not Allowed",
  "field51": "Allowed"
}
```

**Response**: `application/pdf` — binary PDF file download.

---

### `POST /api/generate`

Generates a completed DOCX from the uploaded template (legacy).

**Response**: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

---

### `GET /api/admin/template-info`

Returns metadata about the currently active DOCX template.

**Response**:
```json
{
  "exists": true,
  "uploadedAt": "2026-05-30T10:00:00.000Z",
  "size": 45678
}
```

---

### `POST /api/admin/upload-template`

Replaces the current template with a new `.docx` file.

**Request**: `multipart/form-data` with field `template` (file, max 50 MB).

**Response**:
```json
{
  "success": true,
  "message": "Template uploaded successfully"
}
```

---

## Field Reference

| # | Placeholder | Description | Section | Type |
|---|---|---|---|---|
| 1 | `field1` | Execution Date | A | Date |
| 2 | `field2` | Consultant Entity Name | B | Text |
| 3 | `field3` | LLP IN / CIN | B | Text |
| 4 | `field4` | Contact Person Name | B | Text |
| 5 | `field5` | Contact Person Address | B | Textarea |
| 6 | `field6` | Contact Person Email | B | Email |
| 7 | `field7` | Contact Person Phone | B | Tel |
| 8 | `field8` | IPV Phone (Chaitanya) | C | Tel |
| 9 | `field9` | IPV Office Email | C | Email |
| 10 | `field10` | Annual Management Fee % — Ultra A | D | Text |
| 11 | `field11` | Charged for (Years) — Ultra A | D | Text |
| 12 | `field12` | Profit Sharing (Carry) — Ultra A | D | Text |
| 13 | `field13` | Hurdle Rate — Ultra A | D | Text |
| 14 | `field14` | Min Investment Ticket (INR) — Ultra A | D | Text |
| 15–18 | `field15`–`field18` | 1st–4th Drawdown (INR) — Ultra A | D | Text |
| 19 | `field19` | Annual Management Fee — Ultra B | E | Text |
| 20 | `field20` | Charged for (Years) — Ultra B | E | Text |
| 21 | `field21` | Profit Sharing (Carry) — Ultra B | E | Text |
| 22 | `field22` | Hurdle Rate — Ultra B | E | Text |
| 23 | `field23` | Min Investment Ticket (INR) — Ultra B | E | Text |
| 24–27 | `field24`–`field27` | 1st–4th Drawdown (INR) — Ultra B | E | Text |
| 28–32 | `field28`–`field32` | Slab 1–5 Contribution Amount (INR Cr) | F | Text |
| 33–37 | `field33`–`field37` | Slab 1–5 Fee % (₹25L–50L) | G | Text |
| 38–42 | `field38`–`field42` | Slab 1–5 Fee % (₹50L+) | H | Text |
| 43 | `field43` | Exclusivity Region | I | Text |
| 44 | `field44` | Exclusivity End Date | I | Date |
| 45 | `field45` | Min AUM Per Month (₹) | I | Text |
| 46 | `field46` | Quarterly AUM Threshold (₹) | I | Text |
| 47 | `field47` | Validity Period (Years) | J | Text |
| 48 | `field48` | Consultant Signatory Name | J | Text |
| 49 | `field49` | Sub-Referral Rights | I | Toggle |
| 50 | `field50` | Assignment of Agreement | I | Toggle |
| 51 | `field51` | Sub-Broking Appointment | I | Toggle |

---

## Project Structure

```
MOU-Writer/
├── backend/
│   ├── routes/
│   │   ├── generate.js        # POST /api/generate  (DOCX)
│   │   │                      # POST /api/generate/pdf  (PDF)
│   │   └── admin.js           # GET/POST /api/admin/*
│   ├── services/
│   │   ├── docxService.js     # docxtemplater engine
│   │   └── pdfService.js      # pdfkit engine + DEFAULTS
│   ├── templates/
│   │   └── current-template.docx
│   ├── uploads/
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
│   │   │   └── fields.ts      # FormFields, DEFAULT_VALUES, TOGGLE_FIELDS
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
├── deploy.sh
└── README.md
```
