"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  HiDocumentText,
  HiPlus,
  HiTrash,
  HiPrinter,
  HiClipboardCopy,
  HiArrowRight,
  HiSparkles,
  HiRefresh,
  HiTag,
  HiUser,
  HiCheck,
  HiCalculator,
} from "react-icons/hi";

export interface InvoiceItem {
  id: string;
  name: string;
  category: "Jasa / Layanan" | "Unit / Hardware" | "Sparepart";
  quantity: number;
  price: number;
}

type InvoiceStatus = "LUNAS" | "MENUNGGU PEMBAYARAN" | "DRAFT";
type DiscountType = "percentage" | "fixed";

const TEMPLATE_PRESETS = [
  {
    title: "Layanan Solusi Software",
    customerName: "PT Solusi Digital Nusantara",
    customerEmail: "finance@solusidigital.id",
    items: [
      {
        id: "item-1",
        name: "Implementasi Microservices & Backend API Core",
        category: "Jasa / Layanan" as const,
        quantity: 1,
        price: 15000000,
      },
      {
        id: "item-2",
        name: "Modernisasi UI/UX Frontend & Tailwind Dashboard",
        category: "Jasa / Layanan" as const,
        quantity: 1,
        price: 8500000,
      },
      {
        id: "item-3",
        name: "Security Hardening & Penetration Testing",
        category: "Jasa / Layanan" as const,
        quantity: 1,
        price: 5000000,
      },
    ],
  },
  {
    title: "Pengadaan Hardware Server",
    customerName: "CV Inovasi Data Mandiri",
    customerEmail: "procurement@inovasidata.com",
    items: [
      {
        id: "item-1",
        name: "Server Dell PowerEdge R450 Xeon Silver",
        category: "Unit / Hardware" as const,
        quantity: 2,
        price: 26500000,
      },
      {
        id: "item-2",
        name: "Managed Switch Cisco 24-Port Gigabit POE",
        category: "Unit / Hardware" as const,
        quantity: 2,
        price: 4800000,
      },
      {
        id: "item-3",
        name: "Modul Transceiver SFP+ 10Gbps LC Multi-mode",
        category: "Sparepart" as const,
        quantity: 4,
        price: 750000,
      },
    ],
  },
  {
    title: "Maintenance Armada & Logistik",
    customerName: "PT Lintas Nusantara Kargo",
    customerEmail: "billing@lintaslogistics.co.id",
    items: [
      {
        id: "item-1",
        name: "Service & Tune-up Rutin Unit Truk Isuzu Giga",
        category: "Jasa / Layanan" as const,
        quantity: 3,
        price: 1750000,
      },
      {
        id: "item-2",
        name: "Brake Pad & Rotor Heavy Duty",
        category: "Sparepart" as const,
        quantity: 6,
        price: 900000,
      },
      {
        id: "item-3",
        name: "Instalasi Telematics GPS IoT Tracker",
        category: "Unit / Hardware" as const,
        quantity: 3,
        price: 1250000,
      },
    ],
  },
];

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function InvoicingSection() {
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2025-0892");
  const [customerName, setCustomerName] = useState("PT Solusi Digital Nusantara");
  const [customerEmail, setCustomerEmail] = useState("finance@solusidigital.id");
  const [issueDate, setIssueDate] = useState("2025-05-15");
  const [dueDate, setDueDate] = useState("2025-05-30");
  const [status, setStatus] = useState<InvoiceStatus>("MENUNGGU PEMBAYARAN");

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "item-1",
      name: "Implementasi Microservices & Backend API Core",
      category: "Jasa / Layanan",
      quantity: 1,
      price: 15000000,
    },
    {
      id: "item-2",
      name: "Modernisasi UI/UX Frontend & Tailwind Dashboard",
      category: "Jasa / Layanan",
      quantity: 1,
      price: 8500000,
    },
    {
      id: "item-3",
      name: "Security Hardening & Penetration Testing",
      category: "Jasa / Layanan",
      quantity: 1,
      price: 5000000,
    },
  ]);

  const [discountType, setDiscountType] = useState<DiscountType>("percentage");
  const [discountValue, setDiscountValue] = useState<number>(5);
  const [isTaxEnabled, setIsTaxEnabled] = useState<boolean>(true);
  const [taxRate, setTaxRate] = useState<number>(11);
  const [copied, setCopied] = useState<boolean>(false);

  // Calculation Engine
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.price) || 0), 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    if (subtotal <= 0) return 0;
    if (discountType === "percentage") {
      const clamped = Math.max(0, Math.min(100, Number(discountValue) || 0));
      return (subtotal * clamped) / 100;
    }
    return Math.min(subtotal, Math.max(0, Number(discountValue) || 0));
  }, [subtotal, discountType, discountValue]);

  const dpp = useMemo(() => {
    return Math.max(0, subtotal - discountAmount);
  }, [subtotal, discountAmount]);

  const taxAmount = useMemo(() => {
    if (!isTaxEnabled) return 0;
    return (dpp * Math.max(0, Number(taxRate) || 0)) / 100;
  }, [dpp, isTaxEnabled, taxRate]);

  const grandTotal = useMemo(() => {
    return dpp + taxAmount;
  }, [dpp, taxAmount]);

  // Handlers
  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      name: "Item / Paket Layanan Baru",
      category: "Jasa / Layanan",
      quantity: 1,
      price: 1000000,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const handleItemChange = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleLoadPreset = (index: number) => {
    const preset = TEMPLATE_PRESETS[index];
    if (!preset) return;
    setCustomerName(preset.customerName);
    setCustomerEmail(preset.customerEmail);
    setItems(preset.items.map((it, idx) => ({ ...it, id: `item-${idx + 1}` })));
  };

  const handleGenerateInvoiceNo = () => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    setInvoiceNumber(`INV-${year}-${randomDigits}`);
  };

  const handleCopySummary = async () => {
    const summary = [
      `==============================`,
      `FAKTUR PENAGIHAN: ${invoiceNumber}`,
      `Status: ${status}`,
      `Klien : ${customerName} (${customerEmail})`,
      `Periode: ${issueDate} s/d ${dueDate}`,
      `==============================`,
      ...items.map(
        (it, idx) =>
          `${idx + 1}. ${it.name} (${it.category}) x${it.quantity} = ${formatCurrency(
            it.quantity * it.price
          )}`
      ),
      `------------------------------`,
      `Subtotal       : ${formatCurrency(subtotal)}`,
      `Diskon         : -${formatCurrency(discountAmount)} (${discountType === "percentage" ? `${discountValue}%` : "Nominal"})`,
      `Dasar Pajak DPP: ${formatCurrency(dpp)}`,
      `PPN (${isTaxEnabled ? `${taxRate}%` : "0%"}): ${formatCurrency(taxAmount)}`,
      `------------------------------`,
      `TOTAL AKHIR    : ${formatCurrency(grandTotal)}`,
      `==============================`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Gagal menyalin ringkasan:", err);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const getStatusBadge = (st: InvoiceStatus) => {
    switch (st) {
      case "LUNAS":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800";
      case "MENUNGGU PEMBAYARAN":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800";
      case "DRAFT":
        return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700";
    }
  };

  return (
    <section id="invoicing" className="scroll-mt-20 py-12 transition-colors">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300 mb-2.5">
            <HiDocumentText className="h-4 w-4" />
            <span>Kalkulator & Simulator Billing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Sistem Invoicing & Simulasi Finansial
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-2xl">
            Komponen interaktif kalkulasi penagihan real-time: perhitungan subtotal,
            diskon fleksibel, PPN 11%, dan validasi total tagihan otomatis.
          </p>
        </div>

        <Link
          href="/invoicing-service"
          className="inline-flex items-center gap-2 self-start md:self-auto rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:from-blue-700 hover:to-indigo-700 transition active:scale-95"
        >
          <span>Akses Portal Invoicing Lengkap</span>
          <HiArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Preset Quick Load Bar */}
      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-zinc-400 pl-1">
          <HiSparkles className="h-3.5 w-3.5 text-amber-500" /> Muat Template:
        </span>
        {TEMPLATE_PRESETS.map((preset, idx) => (
          <button
            key={preset.title}
            type="button"
            onClick={() => handleLoadPreset(idx)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Main Grid: Input Form on Left, Document Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Item Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Metadata Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HiTag className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Informasi Tagihan & Klien
              </h3>
              <button
                type="button"
                onClick={handleGenerateInvoiceNo}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                <HiRefresh className="h-3 w-3" /> Buat No. Baru
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-medium text-slate-700 dark:text-zinc-300">No. Faktur</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-slate-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 dark:text-zinc-300">Status Tagihan</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                >
                  <option value="MENUNGGU PEMBAYARAN">MENUNGGU PEMBAYARAN</option>
                  <option value="LUNAS">LUNAS</option>
                  <option value="DRAFT">DRAFT</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-slate-700 dark:text-zinc-300 flex items-center gap-1">
                  <HiUser className="h-3 w-3 text-slate-400" /> Nama Klien / Perusahaan
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 dark:text-zinc-300">Email Klien</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 dark:text-zinc-300">Tanggal Terbit</label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 dark:text-zinc-300">Jatuh Tempo</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Line Items Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 dark:border-zinc-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Rincian Item & Jasa ({items.length})
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                  Ubah kuantitas atau nominal harga untuk melihat kalkulasi real-time.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition active:scale-95"
              >
                <HiPlus className="h-3.5 w-3.5" /> Tambah Item
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => {
                const lineTotal = (Number(item.quantity) || 0) * (Number(item.price) || 0);
                return (
                  <div
                    key={item.id}
                    className="group relative rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 transition hover:border-blue-300 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-blue-800"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-slate-600 shadow-sm border border-slate-200 dark:border-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                        Item #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={items.length <= 1}
                        title="Hapus item"
                        className="text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-400 transition"
                      >
                        <HiTrash className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                      <div className="sm:col-span-5">
                        <label className="font-medium text-slate-600 dark:text-zinc-400 text-[11px]">
                          Deskripsi Layanan / Barang
                        </label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="font-medium text-slate-600 dark:text-zinc-400 text-[11px]">
                          Kategori
                        </label>
                        <select
                          value={item.category}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "category",
                              e.target.value as InvoiceItem["category"]
                            )
                          }
                          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                        >
                          <option value="Jasa / Layanan">Jasa / Layanan</option>
                          <option value="Unit / Hardware">Unit / Hardware</option>
                          <option value="Sparepart">Sparepart</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-medium text-slate-600 dark:text-zinc-400 text-[11px]">
                          Qty
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(item.id, "quantity", Math.max(1, parseInt(e.target.value, 10) || 1))
                          }
                          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-center text-slate-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-medium text-slate-600 dark:text-zinc-400 text-[11px]">
                          Harga Satuan (IDR)
                        </label>
                        <input
                          type="number"
                          min={0}
                          step={50000}
                          value={item.price}
                          onChange={(e) =>
                            handleItemChange(item.id, "price", Math.max(0, parseInt(e.target.value, 10) || 0))
                          }
                          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-right text-slate-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white font-mono text-[11px]"
                        />
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-zinc-700/60 flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 dark:text-zinc-400">
                        Subtotal baris:
                      </span>
                      <span className="font-semibold font-mono text-slate-900 dark:text-white">
                        {formatCurrency(lineTotal)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calculation Adjustments Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <HiCalculator className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Konfigurasi Diskon & Pajak (PPN)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Discount Config */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-zinc-800 dark:bg-zinc-800/40">
                <label className="font-semibold text-slate-700 dark:text-zinc-300 block mb-1">
                  Potongan Harga / Diskon
                </label>
                <div className="flex items-center gap-2 mt-1.5">
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as DiscountType)}
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  >
                    <option value="percentage">Persentase (%)</option>
                    <option value="fixed">Nominal Tetap (Rp)</option>
                  </select>
                  <input
                    type="number"
                    min={0}
                    max={discountType === "percentage" ? 100 : subtotal}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-right font-mono text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
                <span className="mt-1.5 block text-[11px] text-slate-500 dark:text-zinc-400">
                  Potongan: -{formatCurrency(discountAmount)}
                </span>
              </div>

              {/* Tax Config */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-zinc-800 dark:bg-zinc-800/40">
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700 dark:text-zinc-300">
                    Pajak PPN
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isTaxEnabled}
                      onChange={(e) => setIsTaxEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs text-slate-600 dark:text-zinc-400">Tarif Pajak (%):</span>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    disabled={!isTaxEnabled}
                    value={taxRate}
                    onChange={(e) => setTaxRate(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-24 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-right font-mono text-xs text-slate-900 focus:border-blue-500 focus:outline-none disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                    PPN 11%
                  </span>
                </div>
                <span className="mt-1.5 block text-[11px] text-slate-500 dark:text-zinc-400">
                  Nominal Pajak: +{formatCurrency(taxAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Live Preview Invoice */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
            {/* Preview Document Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase dark:text-blue-400">
                  FAKTUR RESMI
                </span>
                <h4 className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">
                  {invoiceNumber}
                </h4>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Dion Subaktiar Engineering Suite
                </p>
              </div>
              <span
                className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${getStatusBadge(
                  status
                )}`}
              >
                {status}
              </span>
            </div>

            {/* Bill To & Dates */}
            <div className="grid grid-cols-2 gap-3 py-4 border-b border-slate-100 text-xs dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Ditagihkan Kepada:
                </span>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                  {customerName || "Nama Klien"}
                </p>
                <p className="text-slate-500 dark:text-zinc-400 text-[11px] truncate">
                  {customerEmail || "-"}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Periode:
                </span>
                <p className="text-slate-700 dark:text-zinc-300 mt-0.5">
                  Tgl: <span className="font-medium">{issueDate}</span>
                </p>
                <p className="text-slate-700 dark:text-zinc-300 text-[11px]">
                  Jatuh Tempo: <span className="font-semibold text-amber-600 dark:text-amber-400">{dueDate}</span>
                </p>
              </div>
            </div>

            {/* Itemized Table In Preview */}
            <div className="py-3 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-2 uppercase">
                <span>Item / Deskripsi</span>
                <span>Total</span>
              </div>
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                {items.map((it) => (
                  <div key={it.id} className="flex justify-between items-start text-xs">
                    <div className="pr-2">
                      <p className="font-medium text-slate-800 dark:text-zinc-200 line-clamp-1">
                        {it.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {it.quantity} x {formatCurrency(it.price)}
                      </p>
                    </div>
                    <span className="font-mono font-semibold text-slate-900 dark:text-white shrink-0">
                      {formatCurrency(it.quantity * it.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="py-4 space-y-2 text-xs border-b border-slate-100 dark:border-zinc-800">
              <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                <span>Subtotal ({items.length} item)</span>
                <span className="font-mono font-medium text-slate-900 dark:text-zinc-200">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>
                  Diskon {discountType === "percentage" ? `(${discountValue}%)` : "(Nominal)"}
                </span>
                <span className="font-mono font-medium">-{formatCurrency(discountAmount)}</span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                <span>Dasar Pengenaan Pajak (DPP)</span>
                <span className="font-mono font-medium text-slate-900 dark:text-zinc-200">
                  {formatCurrency(dpp)}
                </span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                <span>PPN {isTaxEnabled ? `(${taxRate}%)` : "(Nonaktif)"}</span>
                <span className="font-mono font-medium text-slate-900 dark:text-zinc-200">
                  +{formatCurrency(taxAmount)}
                </span>
              </div>
            </div>

            {/* Grand Total Box */}
            <div className="pt-4">
              <div className="rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 p-4 text-white dark:from-zinc-950 dark:to-blue-950/80 shadow-md">
                <span className="text-[11px] font-semibold text-blue-200 uppercase tracking-wider block">
                  Total Pembayaran
                </span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-2xl font-black font-mono tracking-tight text-white">
                    {formatCurrency(grandTotal)}
                  </span>
                  <span className="text-[10px] text-blue-300 font-medium">
                    Termasuk PPN
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                {copied ? (
                  <>
                    <HiCheck className="h-4 w-4 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <HiClipboardCopy className="h-4 w-4 text-slate-500" />
                    <span>Salin Ringkasan</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                <HiPrinter className="h-4 w-4" />
                <span>Cetak / PDF</span>
              </button>
            </div>
          </div>

          {/* Helpful Information Note */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-[11px] text-blue-800 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-blue-300">
            💡 <strong>Info Integrasi:</strong> Nilai faktur yang dihitung pada simulasi ini dapat diteruskan ke modul REST API backend (<code>/api/invoice</code>) dan sistem database transaksi armada.
          </div>
        </div>
      </div>
    </section>
  );
}
