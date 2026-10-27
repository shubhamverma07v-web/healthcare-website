# CuraGuide — Smart Healthcare & Pharmaceutical Information Platform

[![DevFusion Competition Demo](https://img.shields.io/badge/Competition-DevFusion%202026-teal.svg)](https://github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)](https://tailwindcss.com/)

> **Healthcare information, made simple.**  
> CuraGuide is a modern, responsive, and privacy-preserving pharmaceutical information and patient adherence platform built for the **DevFusion** collegiate innovation competition.

---

## 🌟 Executive Summary & Problem Solved

Medication non-adherence and low health literacy contribute significantly to adverse drug events and hospital readmissions worldwide. Complex prescription abbreviations, confusion between generic vs. brand names, and misplaced physical prescription leaflets cause daily anxiety for patients and caregivers.

**CuraGuide** addresses this challenge with an intuitive, unified patient portal:
1. **Medicine Explorer**: Search brand and generic pharmaceutical records with active ingredients, dosage forms, therapeutic uses, and sourced clinical formulary citations.
2. **Adherence Reminders**: Interactive daily schedules (Morning, Afternoon, Evening, Night) with one-click status logging (Taken, Skipped, Due) and adherence analytics.
3. **Digital Health Vault**: Secure client-side document manager supporting PDF, PNG, and JPG prescriptions and lab reports with instant in-browser inspection.
4. **Facility Explorer**: Discover nearby emergency hospitals, urgent care centers, and 24/7 pharmacies with distances, opening hours, and route directions.
5. **Health Literacy AI**: Bilingual conversational assistant (English and हिन्दी) designed to decode prescription shorthand (Rx, BID, TID, PRN) and packaging leaflets within safe educational guardrails.
6. **Privacy-Preserving Architecture**: Zero external telemetry, no remote patient PHI tracking, and zero API paywalls.

---

## 🎨 Design System & Palette

Crafted following strict healthcare SaaS design conventions:
- **Primary Teal (`#0D9488`)**: Interactive action buttons, brand accents, active state indicators.
- **Dark Navy (`#102A43`)**: High-contrast typography, branding headers, dark surface elevation.
- **Main Canvas (`#F7FAFC`)**: Soft, clinical light surface reducing visual fatigue.
- **Card Elevated (`#FFFFFF`)**: Rounded cards (`rounded-2xl`, `rounded-3xl`) with subtle borders (`#E2E8F0`).
- **Informational Light Blue (`#E8F3FF`)**: Medicine badges, callouts, and educational banners.
- **Semantic Accents**: Success (`#15803D`), Warning (`#B45309`), Error (`#B91C1C`).
- **Typography**: Clean, accessible sans-serif hierarchy (Inter system font) complying with WCAG 2.1 AA contrast standards.

---

## 🚀 Routes & Architecture

| Route | View | Description |
|---|---|---|
| `/` | **Public Landing Page** | Brand hero, interactive preview, 4-step workflow, feature highlights, ethical charter, and FAQ accordion. |
| `/dashboard` | **Patient Dashboard** | Real-time adherence rate, today's dosage timeline, upcoming doses, bookmarked medicines, and emergency helplines. |
| `/medicines` | **Medicine Explorer** | Debounced search (brand + generic active salts), category filters, dosage form selector, and Rx vs. OTC toggles. |
| `/medicines/:id` | **Clinical Profile** | Detailed indication breakdown, dosage schedules, side-effect incidence, storage conditions, and sourced WHO/FDA citations. |
| `/reminders` | **Reminder Manager** | Add/edit modals with validation, time-slot sorting, daily adherence progress bar, and localStorage persistence. |
| `/records` | **Digital Health Vault** | Simulated document upload (PDF/JPG/PNG <10MB), metadata tagging, in-browser inspection modal, and local removal. |
| `/facilities` | **Facility Explorer** | Interactive SVG medical district map with clickable pins, 24/7 ER filters, phone speed-dial, and direction links. |
| `/assistant` | **Health Literacy AI** | Bilingual (English & Hindi) conversational assistant for patient education on leaflets and prescription abbreviations. |
| `/settings` | **Preferences & Profile** | Demo profile (Alex Chen), light/dark theme switch, language selector, sound buffers, and factory reset action. |
| `*` | **404 Not Found** | User-friendly recovery view directing back to dashboard or home. |

---

## 🛠️ Technology Stack

- **Framework**: React 18 with Vite 5
- **Language**: TypeScript 5.6
- **Routing**: React Router v6
- **Styling**: Tailwind CSS 3.4 with custom health color tokens and dark mode support
- **Icons**: Lucide React
- **Storage**: Browser `localStorage` (non-sensitive preferences and reminder states only)

---

## 💻 Quick Start & Running Instructions

### Prerequisites
- Node.js 18+ (tested on Node v20 LTS)
- npm or pnpm

### 1. Installation
Clone or navigate to the project directory:
```bash
cd mediguide
npm install
```

### 2. Development Server
Start the local development server:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
Verify compilation and create optimized distribution assets:
```bash
npm run build
npm run preview
```

---

## 🛡️ Competition & Medical Safety Disclaimers

> **DevFusion Academic Prototype Notice:**  
> CuraGuide is created exclusively for demonstration in the DevFusion collegiate competition. All pharmaceutical monographs, schedules, patient records, and medical facilities represent simulated reference datasets. CuraGuide is not a medical device, does not formulate clinical diagnoses, and does not replace the counsel of a licensed physician.

---

## 👥 Authors
Built by the CuraGuide Team for **DevFusion 2026 Innovation Challenge**.
