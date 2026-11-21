# Codebase Specification & Progress Report

## Repository Overview
- **Repository:** `gh:dionsubaktiar/reactwebprofile`
- **Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, Headless UI, Swiper, Axios, React Icons.
- **Node Requirement:** `>=20`

---

## Codebase Architecture & Structure

The repository uses the **Next.js App Router** structure under `app/`, with modular reusable UI components and specialized feature modules.

### 1. Global Layout & Styling
- **Globals & Config:** `app/globals.css`, `tailwind.config.ts` configured with Tailwind CSS and PostCSS.
- **Environment:** Managed via standard Next.js setup.

### 2. Reusable Components (`app/components/`)
- `createButton.tsx`: Action/Creation trigger button component.
- `createModal.tsx`: Modal dialog wrapper for creation forms.
- `dropdownButton.tsx`: Dropdown menu selector component.
- `input.tsx`: Form input field component.
- `profile.tsx`: User profile display component.
- `twoColumns.tsx`: Two-column layout container.
- `userCard.tsx`: Card component rendering user profile info.

### 3. Feature Modules & Routes (`app/`)

#### **Authentication & CRUD (`app/auth-crud/`)**
- `create/page.tsx`: User/record creation view.
- `edit/page.tsx`: Record editing interface.
- `register/page.tsx`: User registration form.

#### **Invoicing & Service (`app/invoicing-service/`)**
- **Units:**
  - `create/page.tsx`: Register/add new unit.
  - `edit/page.tsx`: Modify existing unit details.
  - `view/page.tsx`: View unit specifications/history.
- **Parts:**
  - `create/page.tsx`: Add inventory parts.
  - `edit/page.tsx`: Update part specs/pricing.
- **Invoice:**
  - `create/page.tsx`: Generate new invoices.
  - `edit/page.tsx`: Update invoice records.
  - `view/page.tsx`: Display invoice receipt/breakdown.

#### **Pengajuan Kredit (Credit Application) (`app/pengajuan-kredit/`)**
- `create/page.tsx`: Main credit submission form.
- `create-kendaraan/page.tsx`: Vehicle data entry step/sub-form.
- `create-konsumen/page.tsx`: Customer data entry step/sub-form.
- `details/page.tsx`: Credit application review/detail view.

#### **Test Orbiz Portal (`app/test-orbiz/`)**
- `login/page.tsx`: Orbiz portal authentication login.
- `admin/page.tsx`: Orbiz admin dashboard view.
- `page.tsx`: Landing/test index for the Orbiz module.

#### **Users Management (`app/users/`)**
- `page.tsx`: User listing and directory.
- `detail/page.tsx`: Individual user profile/details.

---

## Progress Report

- **Repository Sync:** Successfully pulled and verified latest changes from `origin/main`.
- **Dependency Audit:** All packages installed successfully via npm/node.
- **Specification Generation:** Mapped out core directory paths, component libraries, and modular feature routes into this structured Markdown document.
