import type { ReactNode } from "react";
import RequireAuth from "@/app/components/RequireAuth";

// Seluruh halaman invoicing-service wajib login (guard Hari 5).
export default function InvoicingServiceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <RequireAuth>{children}</RequireAuth>;
}
