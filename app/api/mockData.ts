export interface Customer {
  id: number;
  nama_perusahaan: string;
  alamat: string;
  pic: string;
  kontak: string;
  created_at?: string;
  updated_at?: string;
}

export interface Unit {
  id: number;
  nopol: string;
  tipe: string;
  driver: string;
  tahun: string;
  id_customer: number;
  customers?: Customer;
}

export interface Part {
  id: number;
  part_number: string | null;
  nama_barang: string;
  merk: string;
  kendaraan: string;
  harga: number;
  jasa: number;
}

export interface Package {
  id: number;
  kode_packages: string | null;
  nama_paket?: string;
}

export interface Invoice {
  id: number;
  kilometer: number;
  tanggal: string;
  harga: number;
  id_package: number;
  status_invoice: string;
  status_spk: string;
  units: Unit;
  packages: Package;
}

// In-memory data store for serverless mode
export const initialCustomers: Customer[] = [
  { id: 1, nama_perusahaan: "PT Nusantara Prima Logistics", alamat: "Jl. Margomulyo Indah No. 45, Surabaya", pic: "Budi Santoso", kontak: "0812-3456-7890", created_at: "2026-01-10", updated_at: "2026-02-15" },
  { id: 2, nama_perusahaan: "CV Sentosa Jaya Abadi", alamat: "Kawasan Industri MM2100 Blok C-2, Cikarang", pic: "Agus Pratama", kontak: "0813-8899-1122", created_at: "2026-01-12", updated_at: "2026-02-20" },
  { id: 3, nama_perusahaan: "PT Samudera Trans Global", alamat: "Jl. Pelabuhan Tanjung Perak No. 12, Surabaya", pic: "Hendra Wijaya", kontak: "0817-6543-2109", created_at: "2026-01-15", updated_at: "2026-03-01" },
  { id: 4, nama_perusahaan: "PT Lintas Niaga Express", alamat: "Jl. Daan Mogot KM 19, Kalideres, Jakarta Barat", pic: "Siti Rahmawati", kontak: "0819-2233-4455", created_at: "2026-02-01", updated_at: "2026-03-05" },
  { id: 5, nama_perusahaan: "CV Berkah Muatan Sejahtera", alamat: "Jl. Raya Semarang-Demak KM 8, Semarang", pic: "Ahmad Fauzi", kontak: "0852-9988-7766", created_at: "2026-02-10", updated_at: "2026-03-10" }
];

export const initialUnits: Unit[] = [
  { id: 1, nopol: "L 9128 UQ", tipe: "Hino Dutro 130 HD (Box)", driver: "Supardi", tahun: "2022", id_customer: 1, customers: initialCustomers[0] },
  { id: 2, nopol: "B 9482 TYN", tipe: "Isuzu Giga FVR 240 (Wingbox)", driver: "Dedi Irawan", tahun: "2023", id_customer: 2, customers: initialCustomers[1] },
  { id: 3, nopol: "B 9011 KLP", tipe: "Mitsubishi Fuso Fighter (Flatbed)", driver: "Wahyudi", tahun: "2021", id_customer: 3, customers: initialCustomers[2] },
  { id: 4, nopol: "L 8820 AA", tipe: "Hino Ranger FM 260 JD (Dump)", driver: "Joko Susilo", tahun: "2020", id_customer: 1, customers: initialCustomers[0] },
  { id: 5, nopol: "N 9271 UR", tipe: "Toyota Dyna 110 FT (Bak Kayu)", driver: "Mulyono", tahun: "2022", id_customer: 5, customers: initialCustomers[4] }
];

export const initialParts: Part[] = [
  { id: 1, part_number: "FLT-OIL-H130", nama_barang: "Filter Oli Mesin Diesel HD", merk: "Denso", kendaraan: "Hino Dutro 130 HD", harga: 145000, jasa: 50000 },
  { id: 2, part_number: "BRK-PAD-ISZ", nama_barang: "Brake Pad Front Set Heavy", merk: "Bendix", kendaraan: "Isuzu Giga FVR", harga: 850000, jasa: 150000 },
  { id: 3, part_number: "CLT-PLT-FUSO", nama_barang: "Clutch Disc / Kampas Kopling", merk: "Exedy", kendaraan: "Mitsubishi Fuso Fighter", harga: 1850000, jasa: 350000 },
  { id: 4, part_number: "FLT-FUEL-GEN", nama_barang: "Fuel Filter Priming Pump", merk: "Sakura", kendaraan: "Toyota Dyna 110 ET", harga: 180000, jasa: 45000 },
  { id: 5, part_number: "BELT-FAN-7PK", nama_barang: "V-Ribbed Alternator Fan Belt", merk: "Bando", kendaraan: "Hino Dutro / Ranger", harga: 220000, jasa: 75000 }
];

export const initialPackages: Package[] = [
  { id: 1, kode_packages: "PKG-BERKALA-10K", nama_paket: "Servis Berkala 10.000 KM (Ganti Oli & Cek Rem)" },
  { id: 2, kode_packages: "PKG-OVERHAUL-CLUTCH", nama_paket: "Paket Penggantian Kopling & Drag Bearing" },
  { id: 3, kode_packages: "PKG-TUNEUP-DIESEL", nama_paket: "Tune-Up Mesin Common Rail & Kalibrasi Injektor" }
];

export const initialInvoices: Invoice[] = [
  {
    id: 1,
    kilometer: 45200,
    tanggal: "2026-03-12",
    harga: 2450000,
    id_package: 1,
    status_invoice: "Lunas",
    status_spk: "Selesai",
    units: initialUnits[0],
    packages: initialPackages[0]
  },
  {
    id: 2,
    kilometer: 88500,
    tanggal: "2026-03-14",
    harga: 4200000,
    id_package: 2,
    status_invoice: "Pending",
    status_spk: "Dalam Pengerjaan",
    units: initialUnits[1],
    packages: initialPackages[1]
  },
  {
    id: 3,
    kilometer: 31000,
    tanggal: "2026-03-15",
    harga: 1650000,
    id_package: 3,
    status_invoice: "Lunas",
    status_spk: "Selesai",
    units: initialUnits[2],
    packages: initialPackages[2]
  }
];
