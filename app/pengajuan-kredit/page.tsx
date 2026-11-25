"use client";

import { useEffect, useState, useMemo } from "react";
import apiClient from "@/app/lib/api";
import { formatIDR } from "@/app/lib/format";
import { useRouter } from "next/navigation";
import SubPageHeader from "@/app/components/SubPageHeader";
import FloatingActionButton from "../components/FloatingActionButton";
import { 
  FiDollarSign, 
  FiTruck, 
  FiUser, 
  FiCalendar, 
  FiShield, 
  FiSearch, 
  FiPieChart, 
  FiArrowRight, 
  FiCheckCircle, 
  FiSliders,
  FiFileText
} from "react-icons/fi";

interface Kendaraan {
  id: number;
  dealer: string;
  merk_kendaraan: string;
  model_kendaraan: string;
  warna_kendaraan: string;
  harga_kendaraan: string;
}

interface Konsumen {
  id: number;
  username: string;
  email: string;
  nama: string;
  nik: string;
  tanggal_lahir: string;
  status_perkawinan: string;
  data_pasangan: string | null;
}

interface Pinjaman {
  id: number;
  asuransi: string;
  down_payment: string;
  tenor: number;
  angsuran: string;
  status?: "Disetujui" | "Dalam Review";
  kendaraan: Kendaraan;
  konsumen: Konsumen;
}

// Fallback high-fidelity sample applications to ensure immediate visual responsiveness
const FALLBACK_PINJAMAN: Pinjaman[] = [
  {
    id: 1,
    asuransi: "Kombinasi (All Risk 1th + TLO)",
    down_payment: "45000000",
    tenor: 36,
    angsuran: "5420000",
    kendaraan: {
      id: 10,
      dealer: "Auto2000 Cilandak",
      merk_kendaraan: "Toyota",
      model_kendaraan: "Innova Zenix 2.0 G CVT",
      warna_kendaraan: "Platinum White Pearl",
      harga_kendaraan: "425000000"
    },
    konsumen: {
      id: 101,
      username: "dion.subaktiar",
      email: "dion.subaktiar@example.com",
      nama: "Dion Subaktiar",
      nik: "3171051208940003",
      tanggal_lahir: "1994-08-12",
      status_perkawinan: "Menikah",
      data_pasangan: "Citra Lestari"
    }
  },
  {
    id: 2,
    asuransi: "All Risk Comprehensive",
    down_payment: "60000000",
    tenor: 48,
    angsuran: "4850000",
    kendaraan: {
      id: 11,
      dealer: "Honda Jakarta Center",
      merk_kendaraan: "Honda",
      model_kendaraan: "HR-V 1.5 SE CVT",
      warna_kendaraan: "Meteoroid Gray Metallic",
      harga_kendaraan: "416000000"
    },
    konsumen: {
      id: 102,
      username: "sarah.widodo",
      email: "sarah.w@example.com",
      nama: "Sarah Widodo",
      nik: "3275034509960001",
      tanggal_lahir: "1996-09-15",
      status_perkawinan: "Lajang",
      data_pasangan: null
    }
  },
  {
    id: 3,
    asuransi: "Total Loss Only (TLO)",
    down_payment: "35000000",
    tenor: 24,
    angsuran: "6100000",
    kendaraan: {
      id: 12,
      dealer: "Mitsubishi Srikandi BSD",
      merk_kendaraan: "Mitsubishi",
      model_kendaraan: "Xpander Ultimate CVT",
      warna_kendaraan: "Blade Silver Metallic",
      harga_kendaraan: "315000000"
    },
    konsumen: {
      id: 103,
      username: "ahmad.fauzan",
      email: "ahmad.fauzan@corp.com",
      nama: "Ahmad Fauzan",
      nik: "3174092003880005",
      tanggal_lahir: "1988-03-20",
      status_perkawinan: "Menikah",
      data_pasangan: "Dewi Anggraini"
    }
  },
  {
    id: 4,
    asuransi: "All Risk 3 Tahun",
    down_payment: "90000000",
    tenor: 60,
    angsuran: "7200000",
    kendaraan: {
      id: 13,
      dealer: "Hyundai Simprug",
      merk_kendaraan: "Hyundai",
      model_kendaraan: "Ioniq 5 Signature Long Range",
      warna_kendaraan: "Gravity Gold Matte",
      harga_kendaraan: "840000000"
    },
    konsumen: {
      id: 104,
      username: "reza.rahardian",
      email: "reza.rah@invest.co.id",
      nama: "Reza Rahardian",
      nik: "3171011005850007",
      tanggal_lahir: "1985-05-10",
      status_perkawinan: "Menikah",
      data_pasangan: "Nadia Putri"
    }
  }
];

const PinjamanPage = () => {
  const [pinjamanData, setPinjamanData] = useState<Pinjaman[]>(FALLBACK_PINJAMAN);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMerk, setSelectedMerk] = useState("All");
  const [dataSource, setDataSource] = useState<"api" | "demo">("demo");
  const router = useRouter();

  // Interactive Live Loan Calculator State
  const [calcOtr, setCalcOtr] = useState<number>(350000000);
  const [calcDpPct, setCalcDpPct] = useState<number>(20);
  const [calcTenor, setCalcTenor] = useState<number>(36);
  const [calcRate, setCalcRate] = useState<number>(7.5);

  useEffect(() => {
    let isMounted = true;
    const fetchPinjamanData = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const response = await apiClient.get<{ data?: Pinjaman[] }>("/pinjaman", { timeout: 3500 });
        const list = response.data?.data;
        if (isMounted && Array.isArray(list)) {
          setPinjamanData(list);
          setDataSource("api");
        }
      } catch {
        if (isMounted) {
          setDataSource("demo");
          setLoadError("Gagal terhubung ke API pinjaman; menampilkan data contoh.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPinjamanData();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatCurrency = (amount: string | number) => {
    const number = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(number)) return "Rp 0";
    return formatIDR(number);
  };

  // Filtered applications
  const filteredList = useMemo(() => {
    return pinjamanData.filter(item => {
      const q = searchQuery.toLowerCase();
      const matchSearch = 
        (item.konsumen?.nama || "").toLowerCase().includes(q) ||
        (item.konsumen?.nik || "").includes(q) ||
        (item.kendaraan?.dealer || "").toLowerCase().includes(q) ||
        (item.kendaraan?.merk_kendaraan || "").toLowerCase().includes(q) ||
        (item.kendaraan?.model_kendaraan || "").toLowerCase().includes(q);

      const matchMerk = selectedMerk === "All" || item.kendaraan?.merk_kendaraan === selectedMerk;
      return matchSearch && matchMerk;
    });
  }, [pinjamanData, searchQuery, selectedMerk]);

  // Statistics KPI calculations
  const stats = useMemo(() => {
    const totalPengajuan = pinjamanData.length;
    const totalPlafon = pinjamanData.reduce((acc, curr) => {
      const harga = parseFloat(curr.kendaraan?.harga_kendaraan || "0");
      const dp = parseFloat(curr.down_payment || "0");
      return acc + (harga > dp ? (harga - dp) : harga);
    }, 0);
    const avgTenor = totalPengajuan > 0
      ? Math.round(pinjamanData.reduce((acc, c) => acc + (c.tenor || 0), 0) / totalPengajuan)
      : 0;
    const approvedCount = pinjamanData.filter((p) => (p.status ?? "Disetujui") === "Disetujui").length;
    const approvalRate = totalPengajuan > 0 ? Math.round((approvedCount / totalPengajuan) * 100) : 0;
    return { totalPengajuan, totalPlafon, avgTenor, approvalRate };
  }, [pinjamanData]);

  // Calculator computations
  const calcResults = useMemo(() => {
    const dpNominal = (calcOtr * calcDpPct) / 100;
    const pokokHutang = Math.max(0, calcOtr - dpNominal);
    const totalBunga = pokokHutang * (calcRate / 100) * (calcTenor / 12);
    const totalHutang = pokokHutang + totalBunga;
    const cicilanBulanan = calcTenor > 0 ? Math.round(totalHutang / calcTenor) : 0;
    return { dpNominal, pokokHutang, cicilanBulanan, totalHutang };
  }, [calcOtr, calcDpPct, calcTenor, calcRate]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-24">
      <SubPageHeader title="Sistem Kredit Kendaraan" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Header Section (Responsive Desktop-First) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <FiTruck size={22} />
              </span>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Pengajuan Kredit Kendaraan
              </h1>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Portal evaluasi kelayakan pinjaman pembiayaan otomotif, verifikasi debitur, dan kalkulasi amortisasi kredit.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {dataSource === "api" ? "Live API Connected" : "Interactive Demo Active"}
            </span>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500">Total Debitur</span>
              <div className="text-2xl font-bold mt-1">{stats.totalPengajuan} Berkas</div>
              <span className="text-xs text-zinc-400">Pengajuan terverifikasi</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl">
              <FiUser />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500">Total Plafon Cair</span>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                {formatCurrency(stats.totalPlafon)}
              </div>
              <span className="text-xs text-zinc-400">Total pokok pembiayaan</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl">
              <FiDollarSign />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500">Rata-Rata Tenor</span>
              <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 mt-1">
                {stats.avgTenor} Bulan
              </div>
              <span className="text-xs text-zinc-400">Pilihan tenor terfavorit</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xl">
              <FiCalendar />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500">Approval Rate</span>
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                {stats.approvalRate}%
              </div>
              <span className="text-xs text-zinc-400">Tingkat kelayakan kredit</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl">
              <FiPieChart />
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 Cols on Desktop): Pipeline List */}
          <div className="lg:col-span-8 space-y-6">
        {/* Filter and Search Bar */}
        {loadError && (
          <div role="alert" className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-300">
            {loadError}
          </div>
        )}
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Cari nama debitur, NIK, dealer, atau tipe kendaraan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedMerk}
                  onChange={(e) => setSelectedMerk(e.target.value)}
                  className="px-3 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All">Semua Merk Kendaraan</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Mitsubishi">Mitsubishi</option>
                  <option value="Hyundai">Hyundai</option>
                </select>
              </div>
            </div>

            {/* List of Applications (2-Column Grid on Desktop) */}
            {isLoading ? (
              <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-3 bg-white dark:bg-zinc-900/70 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                Memuat daftar pengajuan kredit...
              </div>
            ) : filteredList.length === 0 ? (
              <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-2 bg-white dark:bg-zinc-900/70 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <p className="font-semibold text-zinc-700 dark:text-zinc-300">Tidak ada pengajuan kredit yang sesuai filter.</p>
                <p className="text-xs">Coba sesuaikan kata kunci pencarian Anda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredList.map((pinjaman) => (
                  <div
                    key={pinjaman.id}
                    className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-indigo-500/50 hover:shadow-md transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Card Header: Debitur & Status */}
                      <div className="flex items-start justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                            <FiUser size={18} />
                          </div>
                          <div>
                            <h3 className="font-bold text-sm text-zinc-900 dark:text-white line-clamp-1">
                              {pinjaman.konsumen?.nama || "Debitur"}
                            </h3>
                            <span className="text-xs font-mono text-zinc-400">
                              NIK: {pinjaman.konsumen?.nik || "-"}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                            (pinjaman.status ?? "Disetujui") === "Disetujui"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                          }`}
                        >
                          <FiCheckCircle size={10} /> {pinjaman.status ?? "Disetujui"}
                        </span>
                      </div>

                      {/* Vehicle Details */}
                      <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/60 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                            {pinjaman.kendaraan?.merk_kendaraan} {pinjaman.kendaraan?.model_kendaraan}
                          </span>
                          <span className="text-xs text-zinc-400">{pinjaman.kendaraan?.warna_kendaraan}</span>
                        </div>
                        <div className="text-xs text-zinc-500 flex items-center justify-between">
                          <span>Dealer: {pinjaman.kendaraan?.dealer}</span>
                          <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">
                            OTR {formatCurrency(pinjaman.kendaraan?.harga_kendaraan || "0")}
                          </span>
                        </div>
                      </div>

                      {/* Financial Structure Specs */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/40">
                          <span className="text-xs text-zinc-500 block">Uang Muka (DP)</span>
                          <span className="font-mono font-bold text-zinc-900 dark:text-white">
                            {formatCurrency(pinjaman.down_payment)}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/40">
                          <span className="text-xs text-zinc-500 block">Tenor Pembiayaan</span>
                          <span className="font-bold text-zinc-900 dark:text-white">
                            {pinjaman.tenor} Bulan
                          </span>
                        </div>
                      </div>

                      <div className="flex items-baseline justify-between pt-1">
                        <span className="text-xs text-zinc-500">Angsuran per Bulan:</span>
                        <span className="text-base font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                          {formatCurrency(pinjaman.angsuran)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <FiShield /> {pinjaman.asuransi}
                      </span>
                      <button
                        onClick={() => router.push(`/pengajuan-kredit/details?id=${pinjaman.id}`)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Detail Berkas <FiArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (4 Cols on Desktop): Live Interactive Credit Calculator */}
          <div className="lg:col-span-4 sticky top-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <FiSliders size={18} />
                  </span>
                  <h2 className="font-bold text-base text-zinc-900 dark:text-white">
                    Kalkulator Kredit
                  </h2>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  Instant Simulation
                </span>
              </div>

              {/* Calculator Inputs */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="calc-otr" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex justify-between">
                    <span>Harga OTR Kendaraan</span>
                    <span className="font-mono tabular-nums text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(calcOtr)}
                    </span>
                  </label>
                  <input
                    id="calc-otr"
                    type="range"
                    min="100000000"
                    max="1200000000"
                    step="10000000"
                    value={calcOtr}
                    onChange={(e) => setCalcOtr(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="calc-dp" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex justify-between">
                    <span>Uang Muka (DP: {calcDpPct}%)</span>
                    <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(calcResults.dpNominal)}
                    </span>
                  </label>
                  <input
                    id="calc-dp"
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={calcDpPct}
                    onChange={(e) => setCalcDpPct(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Pilihan Tenor Pembayaran
                  </span>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[12, 24, 36, 48, 60].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setCalcTenor(t)}
                        className={`py-2 text-xs font-bold rounded-xl transition-colors ${
                          calcTenor === t
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
                        }`}
                      >
                        {t} bln
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="calc-rate" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex justify-between">
                    <span>Suku Bunga Flat (p.a.)</span>
                    <span className="font-mono tabular-nums">{calcRate}%</span>
                  </label>
                  <input
                    id="calc-rate"
                    type="range"
                    min="5"
                    max="14"
                    step="0.5"
                    value={calcRate}
                    onChange={(e) => setCalcRate(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Simulation Result Card */}
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">Pokok Pinjaman:</span>
                  <span className="font-mono font-bold">{formatCurrency(calcResults.pokokHutang)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">Total Bunga ({calcTenor} bln):</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    {formatCurrency(calcResults.totalHutang - calcResults.pokokHutang)}
                  </span>
                </div>
                <div className="pt-2 border-t border-indigo-200 dark:border-indigo-900/80 flex items-baseline justify-between">
                  <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                    Estimasi Angsuran:
                  </span>
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                    {formatCurrency(calcResults.cicilanBulanan)}
                    <span className="text-xs font-normal text-zinc-500">/bln</span>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/pengajuan-kredit/create?dp=${Math.round(calcResults.dpNominal)}&tenor=${calcTenor}`
                  )
                }
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-2"
              >
                <FiFileText /> Ajukan dengan Simulasi Ini
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Buttons */}
      <FloatingActionButton
        href="/pengajuan-kredit/create"
        label="Pengajuan"
        variant="pill"
        position="bottom-4 right-6"
      />
      <FloatingActionButton
        href="/pengajuan-kredit/create-kendaraan"
        label="Kendaraan"
        variant="pill"
        position="bottom-20 right-6"
      />
      <FloatingActionButton
        href="/pengajuan-kredit/create-konsumen"
        label="Konsumen"
        variant="pill"
        position="bottom-36 right-6"
      />
    </div>
  );
};

export default PinjamanPage;
