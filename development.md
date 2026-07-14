# Dion Subaktiar Portfolio Development Guide (Updated 2026)

This document serves as the architectural and development guide for the **Dion Subaktiar Portfolio Hub**. It details the structural redesign, Tailwind CSS theme variables, Next.js 16/React 19 upgrades, and the systems engineering history log implementation.

---

## 1. Architecture & Component-Based Structure

The application is built using **Next.js 16 (App Router)** and **React 19**, organized as a modular, component-based single-page application under the `app/` directory:

```
app/
├── components/
│   ├── HeroSection.tsx         # Headline, profile image, clean socials, and top navigation
│   ├── AboutSection.tsx        # Academic stats, GPA (3.40), and university details
│   ├── ExperienceSection.tsx   # Vertical career timeline for Besmart, NTS, and Freelance roles
│   ├── SkillsSection.tsx       # Core competencies grid (including Project Management)
│   ├── ProjectsSection.tsx     # Enterprise Logistics and MATLAB Segmentation showcases
│   ├── ClientsSection.tsx      # Partner logogrid leveraging pre-stored image assets
│   ├── ActivityLogSection.tsx  # Chronicle of backend operations, deployments, and systems integration
│   ├── MiniPlayground.tsx     # Sandbox directory for legacy utility apps (BMI, credit compilers)
│   ├── toggleDarkMode.tsx      # HeadlessUI Switch-based dark mode class manager
│   └── ...                     # Legacy UI components
├── page.tsx                    # Landing page entry (assembler of modular sections)
├── layout.tsx                  # Root layout injecting fonts and Auth providers
├── globals.css                 # Global styles, variables, transitions, and scrollbars
```

---

## 2. Design System & Theme Variables

The layout implements a high-end, minimalist visual theme that fully supports Dark and Light modes. It uses neutral shades (zinc) and soft indigo/emerald accents to highlight engineering capabilities.

### Color Tokens (`tailwind.config.js`)
* **Primary Accent:** Indigo (`#6366f1` / `#4f46e5`) - Used for primary actions, active tabs, and section indicators.
* **Secondary Accent:** Teal (`#0d9488` / `#0f766e`) - Used for systems logging indicators.
* **Success Accent:** Emerald (`#10b981`) - Used for academic/success metrics.
* **Canvas Colors:**
  * Light Mode: Zinc-50 (`#fafafa`) background with zinc-950 text.
  * Dark Mode: Zinc-950 (`#09090b`) background, Zinc-900 (`#18181b`) cards, and Zinc-800 (`#27272a`) borders.

### CSS Variables (`app/globals.css`)
Global variables are utilized to control theme transitions dynamically:
```css
:root {
  --background: #fafafa;
  --foreground: #09090b;
}

.dark {
  --background: #09090b;
  --foreground: #f4f4f5;
}
```

---

## 3. Systems Engineering Log Compilation

To provide a factual summary of Dion's cross-device projects, we scanned local development files and compiled logs of actual previous development iterations:

* **SIV_Jalan Transport Logistics Platform:** Optimized transactional operations to ensure atomic DB commits in EF Core, programed dynamic Lead Time calculations, and automated route name generation.
* **Android Driver Telemetry App:** Implemented native background GPS coordinate tracking via foreground services, created canvas drawing tools for signature capture, and integrated Cloudflare-protected APIs.
* **Rins Global Logistics Infrastructure:** Constructed deployment pipelines using GitHub Actions to push Laravel builds to cPanel via SSH, automated server setup scripts, and upgraded dependency security.
* **DevOps Operations & Fleet Alerts:** Managed Dockerized SIT/UAT environments and built color-coded operational alert indicators for vehicle KIR, tax, and license renewals.

---

## 4. Maintenance & CLI Commands

### Install Dependencies
Installs the React 19 peer dependencies and related development tools:
```bash
npm install
```

### Run Staging Development Server
Launches the local Next.js Turbopack development server:
```bash
npm run dev
```

### Compile Production Build
Compiles TypeScript types and builds optimized static assets:
```bash
npm run build
```
*(Deprecation warnings regarding external image domains have been resolved inside `next.config.mjs` using `images.remotePatterns`.)*
