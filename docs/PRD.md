# Product Requirement Document (PRD)

**Project:** Invoicing Service – Customers/Companies UI/UX & Feature Harmonization  
**Role:** Senior Business Analyst (Hermes SDLC Swarm)  
**Target Stack:** Next.js (App Router), Tailwind CSS, TypeScript  
**Status:** Ready for Engineering Review  

---

## 1. Problem Statement

Modul `customers` (dan representasi entitas *companies*) pada Sandbox Invoicing saat ini mengalami **technical & design drift** yang signifikan pasca-revamp modul `invoice/*`. 

Secara spesifik:
1. **Inkonsistensi Style (Visual Drift):** Halaman `app/invoicing-service/customers/` (List, Create, Edit) masih mengadopsi pola styling lama (