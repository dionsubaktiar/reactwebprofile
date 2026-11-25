import { createStore } from "./_store";

export interface KendaraanItem {
  id: number;
  dealer: string;
  merk_kendaraan: string;
  model_kendaraan: string;
  warna_kendaraan: string;
  harga_kendaraan: string;
}

export interface KonsumenItem {
  id: number;
  username: string;
  email: string;
  nama: string;
  nik: string;
  tanggal_lahir: string;
  status_perkawinan: string;
  data_pasangan: string | null;
}

export interface PinjamanItem {
  id: number;
  asuransi: string;
  down_payment: string;
  tenor: number;
  angsuran: string;
  status: "Disetujui" | "Dalam Review";
  kendaraan: KendaraanItem;
  konsumen: KonsumenItem;
}

const INITIAL_KENDARAAN: KendaraanItem[] = [
  {
    id: 10,
    dealer: "Auto2000 Cilandak",
    merk_kendaraan: "Toyota",
    model_kendaraan: "Innova Zenix 2.0 G CVT",
    warna_kendaraan: "Platinum White Pearl",
    harga_kendaraan: "425000000",
  },
  {
    id: 11,
    dealer: "Honda Jakarta Center",
    merk_kendaraan: "Honda",
    model_kendaraan: "HR-V 1.5 SE CVT",
    warna_kendaraan: "Meteoroid Gray Metallic",
    harga_kendaraan: "416000000",
  },
  {
    id: 12,
    dealer: "Mitsubishi Srikandi BSD",
    merk_kendaraan: "Mitsubishi",
    model_kendaraan: "Xpander Ultimate CVT",
    warna_kendaraan: "Blade Silver Metallic",
    harga_kendaraan: "315000000",
  },
  {
    id: 13,
    dealer: "Hyundai Simprug",
    merk_kendaraan: "Hyundai",
    model_kendaraan: "Ioniq 5 Signature Long Range",
    warna_kendaraan: "Gravity Gold Matte",
    harga_kendaraan: "840000000",
  },
];

const INITIAL_KONSUMEN: KonsumenItem[] = [
  {
    id: 101,
    username: "dion.subaktiar",
    email: "dion.subaktiar@example.com",
    nama: "Dion Subaktiar",
    nik: "3171051208940003",
    tanggal_lahir: "1994-08-12",
    status_perkawinan: "Menikah",
    data_pasangan: "Citra Lestari",
  },
  {
    id: 102,
    username: "sarah.widodo",
    email: "sarah.w@example.com",
    nama: "Sarah Widodo",
    nik: "3275034509960001",
    tanggal_lahir: "1996-09-15",
    status_perkawinan: "Lajang",
    data_pasangan: null,
  },
  {
    id: 103,
    username: "ahmad.fauzan",
    email: "ahmad.fauzan@corp.com",
    nama: "Ahmad Fauzan",
    nik: "3174092003880005",
    tanggal_lahir: "1988-03-20",
    status_perkawinan: "Menikah",
    data_pasangan: "Dewi Anggraini",
  },
  {
    id: 104,
    username: "reza.rahardian",
    email: "reza.rah@invest.co.id",
    nama: "Reza Rahardian",
    nik: "3171011005850007",
    tanggal_lahir: "1985-05-10",
    status_perkawinan: "Menikah",
    data_pasangan: "Nadia Putri",
  },
];

const INITIAL_PINJAMAN: PinjamanItem[] = [
  {
    id: 1,
    asuransi: "Kombinasi (All Risk 1th + TLO)",
    down_payment: "45000000",
    tenor: 36,
    angsuran: "5420000",
    status: "Disetujui",
    kendaraan: INITIAL_KENDARAAN[0],
    konsumen: INITIAL_KONSUMEN[0],
  },
  {
    id: 2,
    asuransi: "All Risk Comprehensive",
    down_payment: "60000000",
    tenor: 48,
    angsuran: "4850000",
    status: "Dalam Review",
    kendaraan: INITIAL_KENDARAAN[1],
    konsumen: INITIAL_KONSUMEN[1],
  },
  {
    id: 3,
    asuransi: "Total Loss Only (TLO)",
    down_payment: "35000000",
    tenor: 24,
    angsuran: "6100000",
    status: "Disetujui",
    kendaraan: INITIAL_KENDARAAN[2],
    konsumen: INITIAL_KONSUMEN[2],
  },
  {
    id: 4,
    asuransi: "All Risk 3 Tahun",
    down_payment: "90000000",
    tenor: 60,
    angsuran: "7200000",
    status: "Disetujui",
    kendaraan: INITIAL_KENDARAAN[3],
    konsumen: INITIAL_KONSUMEN[3],
  },
];

export const kendaraanStore = createStore<KendaraanItem>(INITIAL_KENDARAAN);
export const konsumenStore = createStore<KonsumenItem>(INITIAL_KONSUMEN);
export const pinjamanStore = createStore<PinjamanItem>(INITIAL_PINJAMAN);
