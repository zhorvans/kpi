/**
 * AUTOMOTIVE QUALITY PORTAL - APP ENGINE
 * Features:
 * - NIK-based Authentication (QC + Non-QA role support)
 * - Multi-Step Problem Report Workflow (Problem -> Handover -> RC Decision)
 * - Dynamic Form Branching (Incoming Supplier, Customer Evidence/Non)
 * - Client-Side Image Compression (5MB Camera Photo -> ~100KB WebP)
 * - Weekly Spoilage & Scrap Calculation Engine (Matching User's 3 Photos)
 * - Week-over-Week (WoW) 3-Week Comparison Matrix (W0 vs W-1 vs W-2)
 * - Auto-Attendance Tracker (Mon-Fri, Farid auto-clocked at 06:00 WIB)
 * - Organization Hierarchy Tree & Jobdesc Modal
 * - Fullscreen Kiosk / Andon Screensaver Mode (60s Idle Auto-Trigger)
 * - Supabase Integration with Instant Offline-First Local Storage Fallback
 */

// =============================================================================
// 1. MASTER DATA: EMPLOYEES & DIVISION (11 QC Staff + Non-QA Roles)
// =============================================================================
const MASTER_EMPLOYEES = [
  // 11 QC Members (Participate in Attendance Mon-Fri) - FOTO ASLI GOOGLE DRIVE
  {
    nik: '300364',
    nama: 'Mardani',
    jabatan: 'Section Head QA',
    departemen: 'QA/QC',
    level: 1,
    foto: 'https://lh3.googleusercontent.com/d/1TEzsY3pgt2gji3a9OsQc-vwEzsAZJHAY',
    jobdesc: 'Mengontrol tercapainya target produksi group yang dan dibawahnya (kuantitas, kualitas, cost).',
    ikutAbsensi: true
  },
  {
    nik: '304790',
    nama: 'Nita Nururahmah',
    jabatan: 'Administrasi',
    departemen: 'QA/QC',
    level: 2,
    foto: 'https://lh3.googleusercontent.com/d/18hUpVQyLdV5cRaaY58DDkDS_LbNXx9ry',
    jobdesc: 'Menjamin proses administrasi di departement QA dan yang terlaksana sesuai duedate ditetapkan.',
    ikutAbsensi: true
  },
  {
    nik: '300845',
    nama: 'Farid',
    jabatan: 'Quality Kalibrasi Alat Ukur & Uji',
    departemen: 'QA/QC',
    level: 2,
    foto: 'https://lh3.googleusercontent.com/d/1EysidVFpYx0Q14gvZMeZifzYKjYYLnP1',
    jobdesc: 'Menjamin alat ukur dan uji Layak digunakan untuk dan pengukuran atau pengujian.',
    ikutAbsensi: true,
    autoAbsenTime: '06:00'
  },
  {
    nik: '300249',
    nama: 'Dahlan Saedul Ahyam',
    jabatan: 'QC Outgoing',
    departemen: 'QA/QC',
    level: 3,
    foto: 'https://lh3.googleusercontent.com/d/1XZPsSmJm4VBxi3vzO7etqHan9PO7BalI',
    jobdesc: 'Menjamin part yang dikirim ke customer tidak ada claim Kualitas.',
    ikutAbsensi: true
  },
  {
    nik: '300169',
    nama: 'Didin Maulidin',
    jabatan: 'QCO Welding (Line NS K2VG)',
    departemen: 'QA/QC',
    level: 3,
    foto: 'https://lh3.googleusercontent.com/d/1JHIOXwqS53PirP1oSpCI50polWdih4s_',
    jobdesc: 'Menjamin part yang dikirim ke next proses dan customer tidak ada claim Kualitas.',
    ikutAbsensi: true
  },
  {
    nik: '300167',
    nama: 'Eka Yudi Saputra',
    jabatan: 'QC Incoming',
    departemen: 'QA/QC',
    level: 3,
    foto: 'https://lh3.googleusercontent.com/d/1yMHuqd-C5W9Ea7GqKxe6ew-pa2_t1fUP',
    jobdesc: 'Menjamin komponen/material yang diterima dari supplier diverifikasi sesuai dengan methode samplingnya.',
    ikutAbsensi: true
  },
  {
    nik: '300163',
    nama: 'Saefulloh',
    jabatan: 'QCO Welding (Line 1 K2SA)',
    departemen: 'QA/QC',
    level: 3,
    foto: 'https://lh3.googleusercontent.com/d/1acKdgk2KusMvMD-PHiGAgEmQBQQGG5GY',
    jobdesc: 'Menjamin part yang dikirim ke next proses dan customer tidak ada claim Kualitas.',
    ikutAbsensi: true
  },
  {
    nik: '301082',
    nama: 'Suryana',
    jabatan: 'QC Outgoing',
    departemen: 'QA/QC',
    level: 3,
    foto: 'https://lh3.googleusercontent.com/d/1dA83g6Ls3bWUhpKZ1-Om_Jjcma0pqbTf',
    jobdesc: 'Menjamin part yang dikirim ke customer tidak ada claim Kualitas.',
    ikutAbsensi: true
  },
  {
    nik: '300077',
    nama: 'Syamsul Arifin',
    jabatan: 'Quality Metrology Lab',
    departemen: 'QA/QC',
    level: 3,
    foto: 'https://lh3.googleusercontent.com/d/1thGrj-y5oGrtp_q4XNwkSJDFjGQhIand',
    jobdesc: 'Menjamin semua permintaan pengukuran & pengujian sesuai terlaksana aturan dan valid.',
    ikutAbsensi: true
  },
  {
    nik: '300164',
    nama: 'Wahyudi Setiyo',
    jabatan: 'QCO Welding (Line 2 K2SA)',
    departemen: 'QA/QC',
    level: 3,
    foto: 'https://lh3.googleusercontent.com/d/1mQENZkAvF7kdS6luX73ICAcz_JBbeSYq',
    jobdesc: 'Menjamin part yang dikirim ke next proses dan customer tidak ada claim Kualitas.',
    ikutAbsensi: true
  },
  {
    nik: '102498',
    nama: 'Wisnu Maruto',
    jabatan: 'QC Incoming',
    departemen: 'QA/QC',
    level: 3,
    foto: 'https://lh3.googleusercontent.com/d/1h2-4RbNUjVAs3Hf6WGZhTn-YvJwzo5ZC',
    jobdesc: 'Menjamin komponen/material yang diterima dari supplier diverifikasi sesuai dengan methode samplingnya.',
    ikutAbsensi: true
  },

  // Non-QA Accounts (Password: 123456, Excluded from Attendance)
  {
    nik: '900001',
    nama: 'Agus Prayitno',
    jabatan: 'QC Press Shop',
    departemen: 'PRODUKSI',
    level: 4,
    foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    jobdesc: 'QC Proses Stamping dan Press Shop.',
    ikutAbsensi: false,
    password: '123456'
  },
  {
    nik: '900002',
    nama: 'Bagus',
    jabatan: 'QC Machining',
    departemen: 'PRODUKSI',
    level: 4,
    foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    jobdesc: 'QC Proses Permesinan Machining.',
    ikutAbsensi: false,
    password: '123456'
  },
  {
    nik: '900003',
    nama: 'Syamsul Amar',
    jabatan: 'QC Machining',
    departemen: 'PRODUKSI',
    level: 4,
    foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    jobdesc: 'QC Proses Permesinan Machining.',
    ikutAbsensi: false,
    password: '123456'
  },
  {
    nik: '900004',
    nama: 'Staff PPC / Warehouse',
    jabatan: 'Material & Logistik',
    departemen: 'LOGISTIK',
    level: 4,
    foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    jobdesc: 'Pengatur alur material, penyiapan part masuk, dan ekspedisi produk.',
    ikutAbsensi: false,
    password: '123456'
  },
  {
    nik: '900005',
    nama: 'Teknisi Maintenance',
    jabatan: 'Maintenance & Utility',
    departemen: 'MAINTENANCE',
    level: 4,
    foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    jobdesc: 'Perawatan berkala dan penanganan trouble mesin press, robot las, dan kompresor.',
    ikutAbsensi: false,
    password: '123456'
  }
];

// =============================================================================
// 2. MASTER PART CATALOG & WEIGHTS (Sesuai 3 Gambar Format Spoilage User)
// =============================================================================
const MASTER_PART_CATALOG = {
  MACHINING: [
    { name: 'TOP CONE', type: 'GN5', weight: 0.027 },
    { name: 'BOTT CONE', type: 'GN5', weight: 0.043 },
    { name: 'TOP BALL', type: 'GN5', weight: 0.003 },
    { name: 'BOTT BALL', type: 'GN5', weight: 0.035 },
    { name: 'TOP CONE', type: 'GN8', weight: 0.025 },
    { name: 'BOTT CONE', type: 'GN8', weight: 0.025 },
    { name: 'BALL GN8', type: 'GN8', weight: 0.025 }
  ],
  PRESSHOP: [
    { name: 'PIPE FRAME MAIN', type: 'K2VM', weight: 2.384 },
    { name: 'PIPE LOWER CROSS', type: 'K2VM', weight: 0.826 },
    { name: 'PIPE STEERING HEAD', type: 'K2VM', weight: 0.724 },
    { name: 'PIPE SUB FRAME RH', type: 'K2VM', weight: 1.152 },
    { name: 'PIPE SUB FRAME LH', type: 'K2VM', weight: 1.604 },
    { name: 'PIPE FLOOR RH', type: 'K2VM', weight: 0.368 },
    { name: 'PIPE FLOOR LH', type: 'K2VM', weight: 0.368 },
    { name: 'PIPE A CROSS', type: 'K2VM', weight: 0.223 },
    { name: 'PIPE BRKT RR CROSS', type: 'K2VM', weight: 0.323 },
    { name: 'PIPE LUGGAGE BOX', type: 'K2SA', weight: 0.208 },
    { name: 'PIPE BRKT RR CROSS', type: 'K2SA', weight: 0.457 },
    { name: 'PIPE STEERING HEAD', type: 'K2SA', weight: 0.825 }
  ],
  WELDING: [
    { name: 'PIPE FRAME MAIN', type: 'K2VM', weight: 5.900 },
    { name: 'PIPE STEERING HEAD', type: 'K2VM', weight: 1.127 },
    { name: 'PIPE LOWER CROSS', type: 'K2VM', weight: 1.005 },
    { name: 'PIPE SUB FRAME RH', type: 'K2VM', weight: 1.576 },
    { name: 'PIPE SUB FRAME LH', type: 'K2VM', weight: 2.286 },
    { name: 'PIPE FLOOR RH', type: 'K2VM', weight: 0.500 },
    { name: 'PIPE FLOOR LH', type: 'K2VM', weight: 0.486 },
    { name: 'PIPE A CROSS', type: 'K2VM', weight: 0.347 },
    { name: 'PIPE BRKT RR CROSS', type: 'K2VM', weight: 1.083 },
    { name: 'Pipe Comp Strg Head & Gusset', type: 'K2SA', weight: 1.220 },
    { name: 'Brkt Comp Side Stand', type: 'K2SA', weight: 0.388 },
    { name: 'Pipe Comp Luggage Box', type: 'K2SA', weight: 0.348 },
    { name: 'Brkt Comp RR Cross', type: 'K2SA', weight: 1.984 },
    { name: 'Brkt Comp R Pillion Step & Pivot CBS', type: 'K2SA', weight: 0.682 },
    { name: 'Brkt Comp R Pillion Step & Pivot ABS', type: 'K2SA', weight: 0.705 },
    { name: 'Brkt Comp L Pillion Step & Pivot', type: 'K2SA', weight: 0.752 },
    { name: 'BRKT RR Cross', type: 'K2SM', weight: 1.984 }
  ]
};

// =============================================================================
// 3. APPLICATION STATE & STORAGE
// =============================================================================
let currentUser = null;
let currentShift = 'Shift 1';
let currentWorkflowStep = 1;
let currentWorkflowDraft = {};
let compressedPhotoBase64 = null;
let activeSpoilageProcess = 'MACHINING';

// Storage Keys
const STORAGE_KEYS = {
  USER: 'qc_current_user',
  SHIFT: 'qc_current_shift',
  REPORTS: 'qc_problem_reports',
  SPOILAGE: 'qc_weekly_spoilage',
  TASKS: 'qc_pending_tasks',
  ATTENDANCE: 'qc_attendance',
  SUPABASE_CFG: 'qc_supabase_config'
};

// =============================================================================
// 4. INITIAL SEED DATA (Matching User's First Problem Report Photo)
// =============================================================================
const INITIAL_PROBLEM_REPORTS = [
  {
    id: 1,
    tanggal: '2024-10-12',
    nama_part: 'Subframe L',
    type_part: 'K2VG',
    jumlah: 1,
    foto_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80',
    area_masalah: 'Area bold cushion',
    jenis_masalah: 'Pada ulir terdapat spatter',
    asal_part: 'Welding',
    supplier_name: '',
    customer_name: '',
    customer_evidence_status: '',
    kategori: 'Visual welding',
    shift: 'Shift 1',
    leader: 'Eko',
    frekuensi: 1,
    penanganan_pengatasan: 'Repair',
    penanganan_pic: 'Suryana',
    status: 'NON-RC',
    pelapor_nik: '301082',
    is_deleted: false,
    created_at: '2024-10-12T08:15:00Z'
  },
  {
    id: 2,
    tanggal: '2024-10-12',
    nama_part: 'Subframe L',
    type_part: 'K2VG',
    jumlah: 1,
    foto_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80',
    area_masalah: 'Area clip',
    jenis_masalah: 'Welding meleset',
    asal_part: 'Welding',
    supplier_name: '',
    customer_name: '',
    customer_evidence_status: '',
    kategori: 'Visual welding',
    shift: 'Shift 1',
    leader: 'Eko',
    frekuensi: 1,
    penanganan_pengatasan: 'Repair',
    penanganan_pic: 'Suryana',
    status: 'NON-RC',
    pelapor_nik: '301082',
    is_deleted: false,
    created_at: '2024-10-12T09:30:00Z'
  },
  {
    id: 3,
    tanggal: '2024-10-10',
    nama_part: 'Floor R',
    type_part: 'K2VG',
    jumlah: 2,
    foto_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    area_masalah: 'Area patch',
    jenis_masalah: 'Welding bolong',
    asal_part: 'Welding',
    supplier_name: '',
    customer_name: '',
    customer_evidence_status: '',
    kategori: 'Visual welding',
    shift: 'Shift 1',
    leader: 'Eko',
    frekuensi: 1,
    penanganan_pengatasan: 'Repair',
    penanganan_pic: 'Suryana',
    status: 'NON-RC',
    pelapor_nik: '301082',
    is_deleted: false,
    created_at: '2024-10-10T14:20:00Z'
  }
];

// Initial Weekly Spoilage Data (Preserves exact numbers from user's 3 photos)
const INITIAL_WEEKLY_SPOILAGE = {
  'W42-2024': [
    // MACHINING GN5
    { proses: 'MACHINING', type: 'GN5', name: 'TOP CONE', produksi: 57100, berat: 0.027, ng: 69 },
    { proses: 'MACHINING', type: 'GN5', name: 'BOTT CONE', produksi: 19500, berat: 0.043, ng: 33 },
    { proses: 'MACHINING', type: 'GN5', name: 'TOP BALL', produksi: 49350, berat: 0.003, ng: 37 },
    { proses: 'MACHINING', type: 'GN5', name: 'BOTT BALL', produksi: 48850, berat: 0.035, ng: 58 },
    // MACHINING GN8
    { proses: 'MACHINING', type: 'GN8', name: 'TOP CONE', produksi: 0, berat: 0.025, ng: 0 },
    { proses: 'MACHINING', type: 'GN8', name: 'BOTT CONE', produksi: 0, berat: 0.025, ng: 0 },
    { proses: 'MACHINING', type: 'GN8', name: 'BALL GN8', produksi: 0, berat: 0.025, ng: 0 },
    // PRESSHOP K2VM
    { proses: 'PRESSHOP', type: 'K2VM', name: 'PIPE FRAME MAIN', produksi: 5420, berat: 2.384, ng: 1 },
    { proses: 'PRESSHOP', type: 'K2VM', name: 'PIPE LOWER CROSS', produksi: 8952, berat: 0.826, ng: 1 },
    { proses: 'PRESSHOP', type: 'K2VM', name: 'PIPE STEERING HEAD', produksi: 9050, berat: 0.724, ng: 0 },
    { proses: 'PRESSHOP', type: 'K2VM', name: 'PIPE SUB FRAME RH', produksi: 10600, berat: 1.152, ng: 2 },
    { proses: 'PRESSHOP', type: 'K2VM', name: 'PIPE SUB FRAME LH', produksi: 9456, berat: 1.604, ng: 25 },
    { proses: 'PRESSHOP', type: 'K2VM', name: 'PIPE FLOOR RH', produksi: 8460, berat: 0.368, ng: 0 },
    { proses: 'PRESSHOP', type: 'K2VM', name: 'PIPE FLOOR LH', produksi: 8260, berat: 0.368, ng: 0 },
    { proses: 'PRESSHOP', type: 'K2VM', name: 'PIPE A CROSS', produksi: 9135, berat: 0.223, ng: 1 },
    { proses: 'PRESSHOP', type: 'K2VM', name: 'PIPE BRKT RR CROSS', produksi: 11140, berat: 0.323, ng: 0 },
    // PRESSHOP K2SA
    { proses: 'PRESSHOP', type: 'K2SA', name: 'PIPE LUGGAGE BOX', produksi: 10584, berat: 0.208, ng: 0 },
    { proses: 'PRESSHOP', type: 'K2SA', name: 'PIPE BRKT RR CROSS', produksi: 10750, berat: 0.457, ng: 0 },
    { proses: 'PRESSHOP', type: 'K2SA', name: 'PIPE STEERING HEAD', produksi: 7590, berat: 0.825, ng: 0 },
    // WELDING K2VM
    { proses: 'WELDING', type: 'K2VM', name: 'PIPE FRAME MAIN', produksi: 7306, berat: 5.900, ng: 4 },
    { proses: 'WELDING', type: 'K2VM', name: 'PIPE STEERING HEAD', produksi: 9352, berat: 1.127, ng: 0 },
    { proses: 'WELDING', type: 'K2VM', name: 'PIPE LOWER CROSS', produksi: 8597, berat: 1.005, ng: 0 },
    { proses: 'WELDING', type: 'K2VM', name: 'PIPE SUB FRAME RH', produksi: 8963, berat: 1.576, ng: 1 },
    { proses: 'WELDING', type: 'K2VM', name: 'PIPE SUB FRAME LH', produksi: 8556, berat: 2.286, ng: 3 },
    { proses: 'WELDING', type: 'K2VM', name: 'PIPE FLOOR RH', produksi: 8474, berat: 0.500, ng: 0 },
    { proses: 'WELDING', type: 'K2VM', name: 'PIPE FLOOR LH', produksi: 8554, berat: 0.486, ng: 0 },
    { proses: 'WELDING', type: 'K2VM', name: 'PIPE A CROSS', produksi: 8326, berat: 0.347, ng: 0 },
    { proses: 'WELDING', type: 'K2VM', name: 'PIPE BRKT RR CROSS', produksi: 8913, berat: 1.083, ng: 0 },
    // WELDING K2SA
    { proses: 'WELDING', type: 'K2SA', name: 'Pipe Comp Strg Head & Gusset', produksi: 7543, berat: 1.220, ng: 0 },
    { proses: 'WELDING', type: 'K2SA', name: 'Brkt Comp Side Stand', produksi: 8692, berat: 0.388, ng: 0 },
    { proses: 'WELDING', type: 'K2SA', name: 'Pipe Comp Luggage Box', produksi: 6732, berat: 0.348, ng: 0 },
    { proses: 'WELDING', type: 'K2SA', name: 'Brkt Comp RR Cross', produksi: 200, berat: 1.984, ng: 0 },
    { proses: 'WELDING', type: 'K2SA', name: 'Brkt Comp R Pillion Step & Pivot CBS', produksi: 5636, berat: 0.682, ng: 0 },
    { proses: 'WELDING', type: 'K2SA', name: 'Brkt Comp R Pillion Step & Pivot ABS', produksi: 2103, berat: 0.705, ng: 0 },
    { proses: 'WELDING', type: 'K2SA', name: 'Brkt Comp L Pillion Step & Pivot', produksi: 7808, berat: 0.752, ng: 0 },
    // WELDING K2SM
    { proses: 'WELDING', type: 'K2SM', name: 'BRKT RR Cross', produksi: 6907, berat: 1.984, ng: 3 }
  ],
  // W-1 (Simulasi Minggu Lalu untuk Perbandingan WoW)
  'W41-2024': [
    { proses: 'MACHINING', type: 'GN5', name: 'TOP CONE', produksi: 55000, berat: 0.027, ng: 75 },
    { proses: 'MACHINING', type: 'GN5', name: 'BOTT CONE', produksi: 20000, berat: 0.043, ng: 40 },
    { proses: 'MACHINING', type: 'GN5', name: 'TOP BALL', produksi: 48000, berat: 0.003, ng: 42 },
    { proses: 'MACHINING', type: 'GN5', name: 'BOTT BALL', produksi: 47000, berat: 0.035, ng: 65 },
    { proses: 'PRESSHOP', type: 'K2VM', name: 'PIPE FRAME MAIN', produksi: 5200, berat: 2.384, ng: 2 },
    { proses: 'PRESSHOP', type: 'K2VM', name: 'PIPE SUB FRAME LH', produksi: 9100, berat: 1.604, ng: 28 },
    { proses: 'WELDING', type: 'K2VM', name: 'PIPE FRAME MAIN', produksi: 7100, berat: 5.900, ng: 6 },
    { proses: 'WELDING', type: 'K2SM', name: 'BRKT RR Cross', produksi: 6800, berat: 1.984, ng: 4 }
  ],
  // W-2 (Simulasi 2 Minggu Lalu untuk Perbandingan WoW)
  'W40-2024': [
    { proses: 'MACHINING', type: 'GN5', name: 'TOP CONE', produksi: 54000, berat: 0.027, ng: 80 },
    { proses: 'MACHINING', type: 'GN5', name: 'BOTT CONE', produksi: 21000, berat: 0.043, ng: 45 },
    { proses: 'PRESSHOP', type: 'K2VM', name: 'PIPE FRAME MAIN', produksi: 5000, berat: 2.384, ng: 3 },
    { proses: 'WELDING', type: 'K2VM', name: 'PIPE FRAME MAIN', produksi: 7000, berat: 5.900, ng: 7 }
  ]
};

// Initial Pending Tasks / Projects
const INITIAL_TASKS = [
  {
    id: 1,
    tipe: 'PR',
    judul: 'Modifikasi Stopper Jig Welding K2VG Area Clip',
    deskripsi: 'Menghindari defect welding meleset dengan menambahkan sensor proximity dan stopper mekanis presisi.',
    pic_nik: '301082',
    target_selesai: '2024-10-25',
    status: 'IN_PROGRESS'
  },
  {
    id: 2,
    tipe: 'PROJECT',
    judul: 'Digital Kaizen: Auto-Weighing Spoilage Scrap Scale',
    deskripsi: 'Integrasi timbangan digital USB langsung mencatat kg spoilage harian ke portal quality.',
    pic_nik: '300845',
    target_selesai: '2024-11-15',
    status: 'NOT_STARTED'
  },
  {
    id: 3,
    tipe: 'PR',
    judul: 'Verifikasi Kalibrasi Ulang Torque Wrench Assembly Line 1',
    deskripsi: 'Jadwal kalibrasi rutin 6 bulanan untuk 12 unit torque wrench.',
    pic_nik: '300845',
    target_selesai: '2024-10-18',
    status: 'DONE'
  }
];

// =============================================================================
// 5. APPLICATION INITIALIZATION
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initializeStorage();
  initializeClock();
  initializeAuth();
  setupNavigationTabs();
  renderProblemTable();
  renderWeeklySpoilageTables();
  renderKanbanBoard();
  renderAttendanceSection();
  renderOrgStructure();
  setupIdleDetection();
  populateEmployeesDropdown();
});

function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.REPORTS)) {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(INITIAL_PROBLEM_REPORTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SPOILAGE)) {
    localStorage.setItem(STORAGE_KEYS.SPOILAGE, JSON.stringify(INITIAL_WEEKLY_SPOILAGE));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(INITIAL_TASKS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ATTENDANCE)) {
    initAttendanceRecords();
  }
  
  // Set default date picker value to today
  const todayStr = new Date().toISOString().split('T')[0];
  const inputTanggal = document.getElementById('inputTanggal');
  if (inputTanggal) inputTanggal.value = todayStr;
}

function initializeClock() {
  const clockElem = document.getElementById('liveClock');
  const kioskClockElem = document.getElementById('kioskClock');
  
  function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour12: false }) + ' WIB';
    if (clockElem) clockElem.textContent = timeStr;
    if (kioskClockElem) kioskClockElem.textContent = timeStr;
  }
  updateTime();
  setInterval(updateTime, 1000);
}

function setupNavigationTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
      const activePane = document.getElementById(targetId);
      if (activePane) activePane.classList.add('active');
    });
  });
}

// =============================================================================
// 6. AUTHENTICATION & NIK SYSTEM
// =============================================================================
function initializeAuth() {
  const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
  if (savedUser) {
    const parsed = JSON.parse(savedUser);
    const found = MASTER_EMPLOYEES.find(e => e.nik === parsed.nik);
    currentUser = found || parsed;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  } else {
    // Default to Suryana (Inspector on duty)
    currentUser = MASTER_EMPLOYEES.find(e => e.nik === '301082') || MASTER_EMPLOYEES[0];
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }
  updateUserUI();
}

function updateUserUI() {
  if (!currentUser) return;
  document.getElementById('userNameLabel').textContent = currentUser.nama;
  document.getElementById('userNikLabel').textContent = `${currentUser.nik} • ${currentUser.jabatan}`;
  const avatarImg = document.getElementById('userAvatarImg');
  if (avatarImg) avatarImg.src = currentUser.foto;
}

function openLoginModal() {
  openModal('modalLoginNIK');
}

function autoFillLoginFromSelect() {
  const select = document.getElementById('selectQuickLogin');
  const nik = select.value;
  if (!nik) return;
  document.getElementById('inputLoginNIK').value = nik;
  const emp = MASTER_EMPLOYEES.find(e => e.nik === nik);
  if (emp && emp.password) {
    document.getElementById('inputLoginPassword').value = emp.password;
  } else {
    document.getElementById('inputLoginPassword').value = '';
  }
}

function submitLoginNIK() {
  const nik = document.getElementById('inputLoginNIK').value.trim();
  const pwd = document.getElementById('inputLoginPassword').value;

  const found = MASTER_EMPLOYEES.find(e => e.nik === nik);
  if (!found) {
    showToast('NIK tidak ditemukan dalam master data!', 'error');
    return;
  }

  // Non-QA password check
  if (!found.ikutAbsensi && found.password && pwd !== found.password) {
    showToast('Password salah! Default karyawan luar QA adalah 123456', 'error');
    return;
  }

  currentUser = found;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  updateUserUI();
  closeModal('modalLoginNIK');
  showToast(`Selamat datang, ${currentUser.nama} (${currentUser.jabatan})`, 'success');
}

function setGlobalShift(shiftName) {
  currentShift = shiftName;
  document.getElementById('btnShift1').classList.toggle('active', shiftName === 'Shift 1');
  document.getElementById('btnShift2').classList.toggle('active', shiftName === 'Shift 2');
  const kioskBadge = document.getElementById('kioskShiftBadge');
  if (kioskBadge) kioskBadge.textContent = shiftName.toUpperCase();
  renderProblemTable();
}

// =============================================================================
// 7. PROBLEM REPORT WORKFLOW ENGINE (Step 1 -> Step 2 -> Step 3)
// =============================================================================
function openNewReportWorkflow() {
  currentWorkflowStep = 1;
  currentWorkflowDraft = {
    tanggal: new Date().toISOString().split('T')[0],
    shift: currentShift,
    frekuensi: 1,
    is_rc: false
  };
  compressedPhotoBase64 = null;

  // Reset Form
  document.getElementById('formProblemStep1').reset();
  document.getElementById('inputTanggal').value = currentWorkflowDraft.tanggal;
  document.getElementById('inputShift').value = currentShift;
  document.getElementById('photoPreviewContainer').style.display = 'none';
  document.getElementById('boxIncomingSupplier').classList.add('hidden');
  document.getElementById('boxCustomerInfo').classList.add('hidden');
  document.getElementById('subFormRCWrapper').classList.add('hidden');
  document.getElementById('btnChooseRC').classList.remove('selected');
  document.getElementById('btnChooseNonRC').classList.remove('selected');

  // Auto-fill PIC Penanganan with current user or Suryana
  document.getElementById('inputPicPenanganan').value = currentUser ? currentUser.nama : 'Suryana';

  updateWorkflowStepUI();
  openModal('modalProblemWorkflow');
}

function updateWorkflowStepUI() {
  document.getElementById('stepContent1').classList.toggle('hidden', currentWorkflowStep !== 1);
  document.getElementById('stepContent2').classList.toggle('hidden', currentWorkflowStep !== 2);
  document.getElementById('stepContent3').classList.toggle('hidden', currentWorkflowStep !== 3);

  document.getElementById('stepIndicator1').classList.toggle('active', currentWorkflowStep === 1);
  document.getElementById('stepIndicator2').classList.toggle('active', currentWorkflowStep === 2);
  document.getElementById('stepIndicator3').classList.toggle('active', currentWorkflowStep === 3);

  const btnPrev = document.getElementById('btnWorkflowPrev');
  const btnNext = document.getElementById('btnWorkflowNext');

  btnPrev.disabled = (currentWorkflowStep === 1);

  if (currentWorkflowStep === 1) {
    btnNext.textContent = 'Lanjut ke Penyerahan Barang →';
  } else if (currentWorkflowStep === 2) {
    btnNext.textContent = 'Lanjut ke Keputusan RC →';
  } else if (currentWorkflowStep === 3) {
    btnNext.textContent = currentWorkflowDraft.is_rc ? 'Terbitkan Form RC & Simpan' : 'Selesaikan & Tulis ke Database';
  }
}

function navigateWorkflowStep(delta) {
  if (delta === 1) {
    // Validate Current Step
    if (currentWorkflowStep === 1) {
      if (!validateStep1()) return;
      // Pre-fill Step 2
      document.getElementById('handoverYangMenyerahkan').value = `${currentUser.nik} - ${currentUser.nama}`;
      document.getElementById('handoverWaktu').value = new Date().toLocaleString('id-ID');
      currentWorkflowStep = 2;
    } else if (currentWorkflowStep === 2) {
      const penerima = document.getElementById('handoverPenerima').value.trim();
      if (!penerima) {
        showToast('Nama Penerima Barang wajib diisi!', 'error');
        return;
      }
      currentWorkflowDraft.penerima_nama = penerima;
      currentWorkflowDraft.handover_kondisi = document.getElementById('handoverKondisi').value;
      currentWorkflowDraft.handover_catatan = document.getElementById('handoverCatatan').value;
      currentWorkflowStep = 3;
    } else if (currentWorkflowStep === 3) {
      finalizeAndSaveReport();
      return;
    }
  } else {
    if (currentWorkflowStep > 1) {
      currentWorkflowStep--;
    }
  }
  updateWorkflowStepUI();
}

function handleAsalPartChange() {
  const asal = document.getElementById('inputAsalPart').value;
  const boxSupplier = document.getElementById('boxIncomingSupplier');
  const boxCustomer = document.getElementById('boxCustomerInfo');

  boxSupplier.classList.toggle('hidden', asal !== 'Incoming');
  boxCustomer.classList.toggle('hidden', asal !== 'Customer');
}

function validateStep1() {
  const part = document.getElementById('inputNamaPart').value.trim();
  const type = document.getElementById('inputTypePart').value.trim();
  const qty = parseInt(document.getElementById('inputJumlah').value) || 0;
  const area = document.getElementById('inputAreaMasalah').value.trim();
  const jenis = document.getElementById('inputJenisMasalah').value.trim();
  const asal = document.getElementById('inputAsalPart').value;

  if (!part || !type || qty < 1 || !area || !jenis) {
    showToast('Mohon lengkapi seluruh field berbintang (*)!', 'error');
    return false;
  }

  if (asal === 'Incoming') {
    const supplier = document.getElementById('inputSupplierName').value.trim();
    if (!supplier) {
      showToast('Khusus Incoming, Nama Supplier wajib diisi!', 'error');
      return false;
    }
    currentWorkflowDraft.supplier_name = supplier;
  }

  if (asal === 'Customer') {
    const customer = document.getElementById('inputCustomerName').value.trim();
    if (!customer) {
      showToast('Khusus Customer, Nama Customer wajib diisi!', 'error');
      return false;
    }
    currentWorkflowDraft.customer_name = customer;
    const evidenceRadio = document.querySelector('input[name="customerEvidence"]:checked');
    currentWorkflowDraft.customer_evidence_status = evidenceRadio ? evidenceRadio.value : 'evidence';
  }

  currentWorkflowDraft.tanggal = document.getElementById('inputTanggal').value;
  currentWorkflowDraft.shift = document.getElementById('inputShift').value;
  currentWorkflowDraft.frekuensi = parseInt(document.getElementById('inputFrekuensi').value) || 1;
  currentWorkflowDraft.nama_part = part;
  currentWorkflowDraft.type_part = type;
  currentWorkflowDraft.jumlah = qty;
  currentWorkflowDraft.area_masalah = area;
  currentWorkflowDraft.jenis_masalah = jenis;
  currentWorkflowDraft.asal_part = asal;
  currentWorkflowDraft.kategori = document.getElementById('inputKategori').value || 'Visual welding';
  currentWorkflowDraft.penanganan_pengatasan = document.getElementById('inputPengatasan').value;
  currentWorkflowDraft.penanganan_pic = document.getElementById('inputPicPenanganan').value || currentUser.nama;
  currentWorkflowDraft.foto_url = compressedPhotoBase64 || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80';

  return true;
}

// CLIENT-SIDE IMAGE COMPRESSION (5MB -> ~100KB WebP)
function handleImageSelected(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      // Resize to max 1024px width/height while keeping aspect ratio
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      const maxDim = 1024;

      if (width > height && width > maxDim) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else if (height > maxDim) {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Compress to WebP at 0.75 quality
      compressedPhotoBase64 = canvas.toDataURL('image/webp', 0.75);

      const previewBox = document.getElementById('photoPreviewContainer');
      const previewImg = document.getElementById('imagePreviewTarget');
      previewImg.src = compressedPhotoBase64;
      previewBox.style.display = 'block';

      showToast('Foto berhasil dikompres ke WebP hemat memori!', 'success');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removeSelectedPhoto() {
  compressedPhotoBase64 = null;
  document.getElementById('inputFotoBukti').value = '';
  document.getElementById('photoPreviewContainer').style.display = 'none';
}

function selectRCDecision(isRC) {
  currentWorkflowDraft.is_rc = isRC;
  document.getElementById('btnChooseRC').classList.toggle('selected', isRC);
  document.getElementById('btnChooseNonRC').classList.toggle('selected', !isRC);

  const subWrapper = document.getElementById('subFormRCWrapper');
  subWrapper.classList.toggle('hidden', !isRC);

  if (isRC) {
    // Generate suggested RC Number: RC/YYYY/MONTH/RANDOM
    const yr = new Date().getFullYear();
    const mo = String(new Date().getMonth() + 1).padStart(2, '0');
    const seq = Math.floor(100 + Math.random() * 900);
    document.getElementById('inputNoRC').value = `RC/${yr}/${mo}/${seq}`;
    document.getElementById('inputRCFollowupPIC').value = currentUser.nama;
    document.getElementById('inputRCDueDate').value = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
  }

  updateWorkflowStepUI();
}

function finalizeAndSaveReport() {
  if (currentWorkflowDraft.is_rc) {
    const noRC = document.getElementById('inputNoRC').value.trim();
    const tindakan = document.getElementById('inputRCTindakan').value.trim();
    const pic = document.getElementById('inputRCFollowupPIC').value.trim();
    const dueDate = document.getElementById('inputRCDueDate').value;

    if (!noRC || !tindakan || !pic || !dueDate) {
      showToast('Mohon lengkapi isian Form RC!', 'error');
      return;
    }

    currentWorkflowDraft.no_rc = noRC;
    currentWorkflowDraft.rc_tindakan = tindakan;
    currentWorkflowDraft.rc_pic = pic;
    currentWorkflowDraft.rc_due_date = dueDate;
    currentWorkflowDraft.status = 'RC PENDING';
  } else {
    currentWorkflowDraft.status = 'NON-RC';
  }

  const reports = JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]');
  const newReport = {
    ...currentWorkflowDraft,
    id: Date.now(),
    pelapor_nik: currentUser.nik,
    created_at: new Date().toISOString(),
    is_deleted: false
  };

  reports.unshift(newReport);
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));

  closeModal('modalProblemWorkflow');
  renderProblemTable();
  showToast(`Laporan problem part ${newReport.nama_part} berhasil ditulis ke database!`, 'success');
}

// =============================================================================
// 8. PROBLEM TABLE RENDERING (Matches User's Photo Exactly)
// =============================================================================
function renderProblemTable() {
  const tbody = document.getElementById('problemTableBody');
  if (!tbody) return;

  const reports = JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]');
  const dateFilter = document.getElementById('filterDate').value;
  const shiftFilter = document.getElementById('filterShift').value;
  const asalFilter = document.getElementById('filterAsalPart').value;
  const searchQuery = document.getElementById('filterSearch').value.toLowerCase();

  const filtered = reports.filter(r => {
    if (r.is_deleted) return false;
    if (dateFilter && r.tanggal !== dateFilter) return false;
    if (shiftFilter !== 'ALL' && r.shift !== shiftFilter) return false;
    if (asalFilter !== 'ALL' && r.asal_part !== asalFilter) return false;
    if (searchQuery) {
      const matchText = `${r.nama_part} ${r.type_part} ${r.area_masalah} ${r.jenis_masalah} ${r.asal_part}`.toLowerCase();
      if (!matchText.includes(searchQuery)) return false;
    }
    return true;
  });

  tbody.innerHTML = '';
  let grandTotalQty = 0;
  let countRC = 0;
  let shift1Count = 0;
  let shift2Count = 0;

  reports.forEach(r => {
    if (!r.is_deleted) {
      if (r.status === 'RC PENDING') countRC++;
      if (r.shift === 'Shift 1') shift1Count++;
      if (r.shift === 'Shift 2') shift2Count++;
    }
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="15" class="col-center" style="padding: 2rem; color: var(--text-muted);">Tidak ada data laporan yang cocok dengan filter.</td></tr>`;
  } else {
    filtered.forEach((item, index) => {
      grandTotalQty += item.jumlah;
      const tr = document.createElement('tr');

      // Status badge styling
      let statusBadge = `<span class="badge badge-non-rc">NON-RC</span>`;
      if (item.status === 'RC PENDING') {
        statusBadge = `<span class="badge badge-rc-open" title="${item.no_rc || 'RC'}">RC OPEN</span>`;
      }

      // Format Asal Part with specific info
      let displayAsal = item.asal_part;
      if (item.asal_part === 'Incoming' && item.supplier_name) {
        displayAsal = `Incoming<br><small class="text-accent font-semibold">${item.supplier_name}</small>`;
      } else if (item.asal_part === 'Customer' && item.customer_name) {
        const ev = item.customer_evidence_status === 'evidence' ? 'Evidence' : 'Non-Ev';
        displayAsal = `Cust: ${item.customer_name}<br><small class="text-warning font-semibold">(${ev})</small>`;
      }

      tr.innerHTML = `
        <td class="col-center font-bold">${index + 1}</td>
        <td>${formatDateID(item.tanggal)}</td>
        <td class="font-bold">${escapeHTML(item.nama_part)}</td>
        <td class="col-center">${escapeHTML(item.type_part)}</td>
        <td class="col-center font-bold text-danger">${item.jumlah}</td>
        <td class="col-center">
          <div class="table-thumb-wrapper" onclick="zoomPhoto('${item.foto_url}', '${escapeHTML(item.nama_part)}')">
            <img src="${item.foto_url}" class="table-thumb-img" alt="Bukti" loading="lazy">
          </div>
        </td>
        <td>${escapeHTML(item.area_masalah || '-')}</td>
        <td>${escapeHTML(item.jenis_masalah)}</td>
        <td>${displayAsal}</td>
        <td>${escapeHTML(item.kategori || '-')}</td>
        <td class="col-center font-bold">${escapeHTML(item.shift)}</td>
        <td class="col-center">${item.frekuensi || 1}</td>
        <td class="col-center">${escapeHTML(item.penanganan_pengatasan || '-')}</td>
        <td class="col-center font-bold">${escapeHTML(item.penanganan_pic || '-')}</td>
        <td class="col-center">${statusBadge}</td>
        <td class="col-center">
          <button class="btn btn-sm btn-ghost text-danger" title="Soft-delete (Tandai VOID)" onclick="softDeleteReport(${item.id})">Void</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Update summary stats
  document.getElementById('tableGrandTotalQty').textContent = grandTotalQty;
  document.getElementById('statTotalProblem').textContent = reports.filter(r => !r.is_deleted).length;
  document.getElementById('statTotalPcsNG').textContent = `${grandTotalQty} Pcs`;
  document.getElementById('statTotalRC').textContent = `${countRC} Kasus`;
  document.getElementById('statShiftRatio').textContent = `${shift1Count} / ${shift2Count}`;
}

function softDeleteReport(reportId) {
  if (!confirm('Yakin ingin menandai VOID laporan ini? Sesuai standar IATF 16949 data akan di-soft delete agar rekam jejak audit tetap aman.')) {
    return;
  }
  const reports = JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]');
  const idx = reports.findIndex(r => r.id === reportId);
  if (idx !== -1) {
    reports[idx].is_deleted = true;
    reports[idx].status = 'VOID';
    reports[idx].deleted_by = currentUser ? currentUser.nik : 'System';
    reports[idx].deleted_at = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    renderProblemTable();
    showToast('Laporan berhasil ditandai VOID.', 'success');
  }
}

function resetFilters() {
  document.getElementById('filterDate').value = '';
  document.getElementById('filterShift').value = 'ALL';
  document.getElementById('filterAsalPart').value = 'ALL';
  document.getElementById('filterSearch').value = '';
  renderProblemTable();
}

function zoomPhoto(imgUrl, title) {
  const modal = document.getElementById('modalPhotoZoom');
  document.getElementById('photoZoomTitle').textContent = `Bukti Defect: ${title}`;
  document.getElementById('modalZoomImg').src = imgUrl;
  openModal('modalPhotoZoom');
}

function exportProblemTableToCSV() {
  const reports = JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]').filter(r => !r.is_deleted);
  if (reports.length === 0) {
    showToast('Tidak ada data untuk diexport!', 'error');
    return;
  }

  const headers = ['No', 'Tanggal', 'Nama Part', 'Type', 'Jumlah', 'Area Masalah', 'Jenis Masalah', 'Asal Part', 'Kategori', 'Shift', 'Frekuensi', 'Pengatasan', 'PIC', 'Status'];
  const rows = reports.map((r, i) => [
    i + 1,
    r.tanggal,
    `"${r.nama_part}"`,
    `"${r.type_part}"`,
    r.jumlah,
    `"${r.area_masalah || ''}"`,
    `"${r.jenis_masalah.replace(/"/g, '""')}"`,
    `"${r.asal_part}"`,
    `"${r.kategori || ''}"`,
    `"${r.shift}"`,
    r.frekuensi || 1,
    `"${r.penanganan_pengatasan || ''}"`,
    `"${r.penanganan_pic || ''}"`,
    `"${r.status}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `problem_reports_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('File CSV berhasil diunduh!', 'success');
}

// =============================================================================
// 9. WEEKLY NG & SPOILAGE ENGINE WITH 3-WEEK WoW & INLINE EDITING ALA EXCEL
// =============================================================================
let isInlineEditActive = false;

function switchProcessTab(processName) {
  activeSpoilageProcess = processName;
  document.querySelectorAll('.sub-tab').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-process') === processName);
  });
  renderWeeklySpoilageTables();
}

function getAvailablePeriods() {
  const allSpoilage = JSON.parse(localStorage.getItem(STORAGE_KEYS.SPOILAGE) || '{}');
  const keys = Object.keys(allSpoilage);
  if (keys.length === 0) {
    return ['W42-2024', 'W41-2024', 'W40-2024'];
  }
  // Sort descending by Year and Week number
  return keys.sort((a, b) => {
    const parse = (k) => {
      const parts = k.replace('W', '').split('-');
      const w = parseInt(parts[0]) || 0;
      const y = parseInt(parts[1]) || 0;
      return y * 100 + w;
    };
    return parse(b) - parse(a);
  });
}

function populatePeriodDropdown() {
  const select = document.getElementById('selectSpoilageWeek');
  if (!select) return;

  const periods = getAvailablePeriods();
  const currentVal = select.value || periods[0];

  select.innerHTML = periods.map(p => {
    const match = p.match(/W(\d+)-(\d+)/);
    let label = p;
    if (match) {
      label = `Minggu ${match[1]} (${match[2]})`;
      if (p === periods[0]) label += ' - Terkini';
    }
    return `<option value="${p}">${label}</option>`;
  }).join('');

  if (periods.includes(currentVal)) {
    select.value = currentVal;
  } else {
    select.value = periods[0];
  }
}

function onPeriodChanged() {
  if (isInlineEditActive) {
    toggleInlineSpoilageEdit(); // Save before switching
  }
  renderWeeklySpoilageTables();
}

function openNewPeriodModal() {
  const periods = getAvailablePeriods();
  const latest = periods[0] || 'W42-2024';
  const match = latest.match(/W(\d+)-(\d+)/);
  let nextW = 43;
  let nextY = 2024;
  if (match) {
    nextW = parseInt(match[1]) + 1;
    nextY = parseInt(match[2]);
  }
  document.getElementById('inputNewPeriodYear').value = nextY;
  document.getElementById('inputNewPeriodWeekNum').value = nextW;
  document.getElementById('inputNewPeriodLabel').value = `Minggu ${nextW} - ${nextY}`;
  openModal('modalNewWeekPeriod');
}

function submitCreateNewPeriod() {
  const y = parseInt(document.getElementById('inputNewPeriodYear').value) || 2024;
  const w = parseInt(document.getElementById('inputNewPeriodWeekNum').value) || 1;
  const newKey = `W${w}-${y}`;

  const allSpoilage = JSON.parse(localStorage.getItem(STORAGE_KEYS.SPOILAGE) || '{}');
  if (!allSpoilage[newKey]) {
    // Initialize default catalog items with 0 production and 0 NG
    const newItems = [];
    ['MACHINING', 'PRESSHOP', 'WELDING'].forEach(proc => {
      (MASTER_PART_CATALOG[proc] || []).forEach(part => {
        newItems.push({
          proses: proc,
          type: part.type,
          name: part.name,
          produksi: 0,
          berat: part.weight,
          ng: 0
        });
      });
    });
    allSpoilage[newKey] = newItems;
    localStorage.setItem(STORAGE_KEYS.SPOILAGE, JSON.stringify(allSpoilage));
  }

  closeModal('modalNewWeekPeriod');
  populatePeriodDropdown();
  document.getElementById('selectSpoilageWeek').value = newKey;
  renderWeeklySpoilageTables();
  showToast(`Periode ${newKey} berhasil dibuka! Anda dapat langsung mengisi data produksi & NG.`, 'success');

  // Automatically activate inline table edit mode for quick entry
  if (!isInlineEditActive) {
    toggleInlineSpoilageEdit();
  }
}

function toggleInlineSpoilageEdit() {
  isInlineEditActive = !isInlineEditActive;
  const btn = document.getElementById('btnToggleInlineEdit');
  const txt = document.getElementById('btnInlineEditText');

  if (isInlineEditActive) {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-secondary');
    btn.style.borderColor = 'var(--success-green)';
    btn.style.color = 'var(--success-green)';
    txt.textContent = '💾 Simpan Perubahan Tabel';
    showToast('Mode Edit Cepat Aktif: Anda dapat mengetik angka Produksi & NG langsung di tabel seperti di Excel!', 'info');
    renderWeeklySpoilageTables();
  } else {
    // Save all inputs
    saveAllInlineInputs();
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-secondary');
    btn.style.borderColor = 'transparent';
    btn.style.color = '#fff';
    txt.textContent = '📝 Edit Cepat di Tabel (Ala Excel)';
    showToast('Seluruh perubahan data tabel mingguan berhasil disimpan!', 'success');
    renderWeeklySpoilageTables();
  }
}

function saveAllInlineInputs() {
  const currentWeek = document.getElementById('selectSpoilageWeek').value;
  const allSpoilage = JSON.parse(localStorage.getItem(STORAGE_KEYS.SPOILAGE) || '{}');
  if (!allSpoilage[currentWeek]) allSpoilage[currentWeek] = [];

  const inputs = document.querySelectorAll('.inline-spoilage-input');
  inputs.forEach(inp => {
    const proc = inp.dataset.proc;
    const type = inp.dataset.type;
    const name = inp.dataset.name;
    const field = inp.dataset.field; // 'produksi' or 'ng'
    const val = parseInt(inp.value) || 0;

    let item = allSpoilage[currentWeek].find(x => x.proses === proc && x.type === type && x.name === name);
    if (!item) {
      // Find weight from master catalog
      const catalog = MASTER_PART_CATALOG[proc] || [];
      const catItem = catalog.find(c => c.name === name && c.type === type);
      const wt = catItem ? catItem.weight : 0.025;
      item = { proses: proc, type: type, name: name, produksi: 0, berat: wt, ng: 0 };
      allSpoilage[currentWeek].push(item);
    }
    item[field] = val;
  });

  localStorage.setItem(STORAGE_KEYS.SPOILAGE, JSON.stringify(allSpoilage));
}

function onInlineFieldInput(inputEl) {
  // Live calculation for the row
  const rowEl = inputEl.closest('tr');
  if (!rowEl) return;

  const prodInp = rowEl.querySelector('input[data-field="produksi"]');
  const ngInp = rowEl.querySelector('input[data-field="ng"]');
  const wtVal = parseFloat(rowEl.dataset.weight) || 0;

  const prod = prodInp ? (parseInt(prodInp.value) || 0) : 0;
  const ng = ngInp ? (parseInt(ngInp.value) || 0) : 0;

  const pct = prod > 0 ? (ng / prod) * 100 : 0;
  const kg = ng * wtVal;

  const actualCell = rowEl.querySelector('.col-actual');
  const kgCell = rowEl.querySelector('.col-spoilage-kg');

  if (actualCell) {
    actualCell.textContent = `${pct.toFixed(2).replace('.', ',')}%`;
    actualCell.classList.toggle('over-target', pct > 0.06);
  }
  if (kgCell) {
    kgCell.textContent = `${kg.toFixed(3).replace('.', ',')} Kg`;
  }
}

function renderWeeklySpoilageTables() {
  populatePeriodDropdown();
  renderWoWTrendSummary();

  const container = document.getElementById('spoilageTablesContainer');
  if (!container) return;

  const currentWeek = document.getElementById('selectSpoilageWeek').value;
  const allSpoilage = JSON.parse(localStorage.getItem(STORAGE_KEYS.SPOILAGE) || '{}');
  let weekData = allSpoilage[currentWeek] || [];

  // Filter items for currently selected process
  let processItems = weekData.filter(item => item.proses === activeSpoilageProcess);

  // If no items yet for this process in this week, initialize from catalog
  if (processItems.length === 0) {
    const catalog = MASTER_PART_CATALOG[activeSpoilageProcess] || [];
    catalog.forEach(p => {
      processItems.push({
        proses: activeSpoilageProcess,
        type: p.type,
        name: p.name,
        produksi: 0,
        berat: p.weight,
        ng: 0
      });
    });
  }

  // Group by Part Type (e.g. GN5, GN8 for Machining; K2VM, K2SA for Presshop/Welding)
  const typesMap = {};
  processItems.forEach(item => {
    if (!typesMap[item.type]) typesMap[item.type] = [];
    typesMap[item.type].push(item);
  });

  let html = `
    <div class="spoilage-group-block">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <h3 class="spoilage-table-title" style="margin-bottom: 0;">${activeSpoilageProcess} - PERIODE ${currentWeek}</h3>
        ${isInlineEditActive ? `<span class="badge" style="background: rgba(16, 185, 129, 0.2); color: var(--success-green); font-size: 0.8rem; padding: 4px 10px;">⚡ Mode Edit Langsung Aktif (Ketik angka lalu klik Simpan)</span>` : ''}
      </div>
  `;

  // Render a separate table for each type block, matching user's images
  for (const typeKey in typesMap) {
    const items = typesMap[typeKey];
    let subProd = 0;
    let subNG = 0;
    let subWeight = 0;
    let subSpoilageKg = 0;

    const rowRows = items.map((row, idx) => {
      subProd += row.produksi;
      subNG += row.ng;
      subWeight += row.berat;

      const pctActual = row.produksi > 0 ? ((row.ng / row.produksi) * 100) : 0;
      const spoilageKg = row.ng * row.berat;
      subSpoilageKg += spoilageKg;

      const isOverTarget = pctActual > 0.06;

      // In inline edit mode, show interactive inputs!
      let prodDisplay = formatNumber(row.produksi);
      let ngDisplay = row.ng;

      if (isInlineEditActive) {
        prodDisplay = `<input type="number" class="inline-spoilage-input form-input" style="padding: 4px 6px; font-size: 0.82rem; text-align: right;" data-proc="${row.proses}" data-type="${row.type}" data-name="${row.name}" data-field="produksi" value="${row.produksi}" min="0" oninput="onInlineFieldInput(this)">`;
        ngDisplay = `<input type="number" class="inline-spoilage-input form-input" style="padding: 4px 6px; font-size: 0.82rem; text-align: center; font-weight: bold; width: 70px;" data-proc="${row.proses}" data-type="${row.type}" data-name="${row.name}" data-field="ng" value="${row.ng}" min="0" oninput="onInlineFieldInput(this)">`;
      }

      return `
        <tr data-weight="${row.berat}">
          <td class="col-center font-bold">${idx + 1}</td>
          <td class="font-semibold">${escapeHTML(row.name)}</td>
          <td class="col-center font-bold">${escapeHTML(row.type)}</td>
          <td class="text-right font-mono">${prodDisplay}</td>
          <td class="text-right font-mono">${row.berat.toFixed(3).replace('.', ',')}</td>
          <td class="col-center font-mono font-bold">${ngDisplay}</td>
          <td class="col-target">0,06%</td>
          <td class="col-actual ${isOverTarget ? 'over-target' : ''}">${pctActual.toFixed(2).replace('.', ',')}%</td>
          <td class="col-spoilage-kg">${spoilageKg.toFixed(3).replace('.', ',')} Kg</td>
        </tr>
      `;
    }).join('');

    const subPctActual = subProd > 0 ? ((subNG / subProd) * 100) : 0;
    const isSubOver = subPctActual > 0.06;

    html += `
      <div style="margin-bottom: 2rem; overflow-x: auto;">
        <table class="spoilage-table">
          <thead>
            <tr>
              <th style="width: 45px;">No</th>
              <th>Nama Part</th>
              <th style="width: 80px;">Type</th>
              <th style="width: 120px;">Total Produksi</th>
              <th style="width: 100px;">Berat /pcs /kg</th>
              <th style="width: 110px;">Total NG spoilage</th>
              <th class="th-target" style="width: 95px;">% Target NG Spoilage</th>
              <th class="th-actual" style="width: 95px;">% Aktual NG Spoilage</th>
              <th class="th-spoilage-kg" style="width: 125px;">Total spoilage (Kg)</th>
            </tr>
          </thead>
          <tbody>
            ${rowRows}
            <tr class="subtotal-row">
              <td colspan="3" class="col-center font-bold">SUB TOTAL</td>
              <td class="text-right font-mono font-bold">${formatNumber(subProd)}</td>
              <td class="text-right font-mono font-bold">${subWeight.toFixed(3).replace('.', ',')}</td>
              <td class="col-center font-mono font-bold">${subNG}</td>
              <td class="col-target font-bold">0,06%</td>
              <td class="col-actual font-bold ${isSubOver ? 'over-target' : ''}">${subPctActual.toFixed(2).replace('.', ',')}%</td>
              <td class="col-spoilage-kg font-bold">${subSpoilageKg.toFixed(3).replace('.', ',')} Kg</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  html += `</div>`;
  container.innerHTML = html;
}

// 3-Week Dynamic Rolling Comparison Matrix (WoW: W vs W-1 vs W-2)
function renderWoWTrendSummary() {
  const grid = document.getElementById('wowTrendGrid');
  if (!grid) return;

  const allSpoilage = JSON.parse(localStorage.getItem(STORAGE_KEYS.SPOILAGE) || '{}');
  const activePeriod = document.getElementById('selectSpoilageWeek') ? document.getElementById('selectSpoilageWeek').value : 'W42-2024';

  // Parse active week number and year
  const match = activePeriod.match(/W(\d+)-(\d+)/);
  let wNum = 42;
  let yNum = 2024;
  if (match) {
    wNum = parseInt(match[1]);
    yNum = parseInt(match[2]);
  }

  const keyW0 = `W${wNum}-${yNum}`;
  const keyW1 = `W${wNum - 1}-${yNum}`;
  const keyW2 = `W${wNum - 2}-${yNum}`;

  const w0 = allSpoilage[keyW0] || [];
  const w1 = allSpoilage[keyW1] || [];
  const w2 = allSpoilage[keyW2] || [];

  function calcProcessMetrics(dataset, proc) {
    const list = dataset.filter(d => d.proses === proc);
    const totalProd = list.reduce((acc, c) => acc + c.produksi, 0);
    const totalNG = list.reduce((acc, c) => acc + c.ng, 0);
    const totalKg = list.reduce((acc, c) => acc + (c.ng * c.berat), 0);
    const pct = totalProd > 0 ? (totalNG / totalProd) * 100 : 0;
    return { totalKg, pct, totalNG };
  }

  const processes = ['MACHINING', 'PRESSHOP', 'WELDING'];
  grid.innerHTML = processes.map(proc => {
    const m0 = calcProcessMetrics(w0, proc);
    const m1 = calcProcessMetrics(w1, proc);
    const m2 = calcProcessMetrics(w2, proc);

    const deltaKg = m0.totalKg - m1.totalKg;
    const isImproved = deltaKg <= 0;
    const deltaTag = (m1.totalKg > 0 || m0.totalKg > 0)
      ? (isImproved
          ? `<span class="wow-delta-tag wow-delta-good">▼ ${Math.abs(deltaKg).toFixed(2)} Kg (Membaik)</span>`
          : `<span class="wow-delta-tag wow-delta-bad">▲ +${deltaKg.toFixed(2)} Kg (Naik)</span>`)
      : `<span class="wow-delta-tag" style="background: rgba(107, 114, 128, 0.2); color: var(--text-dim);">-</span>`;

    return `
      <div class="wow-item-box">
        <div class="wow-process-title">
          <span>${proc}</span>
          ${deltaTag}
        </div>
        <div class="wow-week-row">
          <span class="text-dim">2 Mgg Lalu (${keyW2}):</span>
          <span class="font-mono">${m2.totalKg > 0 ? `${m2.totalKg.toFixed(2)} Kg (${m2.pct.toFixed(2)}%)` : '<small class="text-dim">Belum diinput</small>'}</span>
        </div>
        <div class="wow-week-row">
          <span class="text-dim">Mgg Lalu (${keyW1}):</span>
          <span class="font-mono">${m1.totalKg > 0 ? `${m1.totalKg.toFixed(2)} Kg (${m1.pct.toFixed(2)}%)` : '<small class="text-dim">Belum diinput</small>'}</span>
        </div>
        <div class="wow-week-row font-bold" style="border-top: 1px dashed rgba(75, 85, 99, 0.4); margin-top: 4px; padding-top: 6px;">
          <span class="text-accent">Mgg Ini (${keyW0}):</span>
          <span class="font-mono text-accent">${m0.totalKg.toFixed(2)} Kg <small>(${m0.pct.toFixed(2)}%)</small></span>
        </div>
      </div>
    `;
  }).join('');
}

function openInputSpoilageModal() {
  populateSpoilagePartsList();
  openModal('modalInputSpoilage');
}

function populateSpoilagePartsList() {
  const proc = document.getElementById('inputSpoilageProses').value;
  const select = document.getElementById('inputSpoilagePartSelect');
  const catalog = MASTER_PART_CATALOG[proc] || [];

  select.innerHTML = catalog.map((p, idx) => `
    <option value="${idx}">${p.name} [Type: ${p.type}] (${p.weight} kg)</option>
  `).join('');

  syncPartWeightInfo();
}

function syncPartWeightInfo() {
  const proc = document.getElementById('inputSpoilageProses').value;
  const idx = parseInt(document.getElementById('inputSpoilagePartSelect').value) || 0;
  const catalog = MASTER_PART_CATALOG[proc] || [];
  const part = catalog[idx];

  if (part) {
    document.getElementById('inputSpoilageWeight').value = part.weight;
  }
  calculatePreviewSpoilage();
}

function calculatePreviewSpoilage() {
  const weight = parseFloat(document.getElementById('inputSpoilageWeight').value) || 0;
  const prod = parseInt(document.getElementById('inputSpoilageProduksi').value) || 0;
  const ng = parseInt(document.getElementById('inputSpoilageNG').value) || 0;

  const pct = prod > 0 ? (ng / prod) * 100 : 0;
  const kg = ng * weight;

  const pctEl = document.getElementById('previewPercentAktual');
  pctEl.textContent = `${pct.toFixed(2)}%`;
  pctEl.classList.toggle('over-target', pct > 0.06);

  document.getElementById('previewKgSpoilage').textContent = `${kg.toFixed(3)} Kg`;
}

function saveSpoilageRecord() {
  const proc = document.getElementById('inputSpoilageProses').value;
  const week = document.getElementById('inputSpoilageWeek').value;
  const idx = parseInt(document.getElementById('inputSpoilagePartSelect').value) || 0;
  const catalog = MASTER_PART_CATALOG[proc] || [];
  const part = catalog[idx];

  const prod = parseInt(document.getElementById('inputSpoilageProduksi').value) || 0;
  const ng = parseInt(document.getElementById('inputSpoilageNG').value) || 0;
  const weight = parseFloat(document.getElementById('inputSpoilageWeight').value) || 0;

  if (!part) return;

  const allSpoilage = JSON.parse(localStorage.getItem(STORAGE_KEYS.SPOILAGE) || '{}');
  if (!allSpoilage[week]) allSpoilage[week] = [];

  // Update existing or push new
  const existingIndex = allSpoilage[week].findIndex(item => item.proses === proc && item.name === part.name && item.type === part.type);
  if (existingIndex !== -1) {
    allSpoilage[week][existingIndex].produksi = prod;
    allSpoilage[week][existingIndex].ng = ng;
    allSpoilage[week][existingIndex].berat = weight;
  } else {
    allSpoilage[week].push({
      proses: proc,
      type: part.type,
      name: part.name,
      produksi: prod,
      berat: weight,
      ng: ng
    });
  }

  localStorage.setItem(STORAGE_KEYS.SPOILAGE, JSON.stringify(allSpoilage));
  closeModal('modalInputSpoilage');
  renderWeeklySpoilageTables();
  showToast(`Data Spoilage ${part.name} berhasil disimpan!`, 'success');
}

// =============================================================================
// 10. PENDING TASKS & NEW PROJECTS KANBAN BOARD
// =============================================================================
function renderKanbanBoard() {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || '[]');
  const colPending = document.getElementById('kanbanPending');
  const colProgress = document.getElementById('kanbanProgress');
  const colDone = document.getElementById('kanbanDone');

  colPending.innerHTML = '';
  colProgress.innerHTML = '';
  colDone.innerHTML = '';

  let cPending = 0;
  let cProgress = 0;
  let cDone = 0;

  tasks.forEach(t => {
    const card = document.createElement('div');
    card.className = 'task-card';
    const picObj = MASTER_EMPLOYEES.find(e => e.nik === t.pic_nik);
    const picName = picObj ? picObj.nama : 'QC Team';
    const typeBadge = t.tipe === 'PR' ? `<span class="task-badge-type badge-pr">PR Tertunda</span>` : `<span class="task-badge-type badge-proj">New Project</span>`;

    card.innerHTML = `
      <div>${typeBadge}</div>
      <div class="task-title">${escapeHTML(t.judul)}</div>
      <div class="task-desc">${escapeHTML(t.deskripsi || '-')}</div>
      <div class="task-footer">
        <span>👤 ${escapeHTML(picName)}</span>
        <span>📅 ${formatDateID(t.target_selesai)}</span>
      </div>
      <div style="margin-top: 8px; display: flex; gap: 4px; justify-content: flex-end;">
        ${t.status !== 'IN_PROGRESS' ? `<button class="btn btn-sm btn-ghost" onclick="updateTaskStatus(${t.id}, 'IN_PROGRESS')">Progress</button>` : ''}
        ${t.status !== 'DONE' ? `<button class="btn btn-sm btn-ghost text-accent" onclick="updateTaskStatus(${t.id}, 'DONE')">Selesai</button>` : ''}
      </div>
    `;

    if (t.status === 'NOT_STARTED' || t.status === 'PENDING') {
      colPending.appendChild(card);
      cPending++;
    } else if (t.status === 'IN_PROGRESS') {
      colProgress.appendChild(card);
      cProgress++;
    } else if (t.status === 'DONE') {
      colDone.appendChild(card);
      cDone++;
    }
  });

  document.getElementById('countTaskPending').textContent = cPending;
  document.getElementById('countTaskProgress').textContent = cProgress;
  document.getElementById('countTaskDone').textContent = cDone;
}

function openNewTaskModal() {
  document.getElementById('formTaskProject').reset();
  document.getElementById('inputTaskDueDate').value = new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];
  openModal('modalTaskProject');
}

function saveTaskProject() {
  const tipe = document.getElementById('inputTaskTipe').value;
  const judul = document.getElementById('inputTaskJudul').value.trim();
  const pic = document.getElementById('inputTaskPIC').value;
  const dueDate = document.getElementById('inputTaskDueDate').value;
  const desc = document.getElementById('inputTaskDesc').value.trim();
  const status = document.getElementById('inputTaskStatus').value;

  if (!judul || !dueDate) {
    showToast('Judul dan Target Tanggal wajib diisi!', 'error');
    return;
  }

  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || '[]');
  tasks.unshift({
    id: Date.now(),
    tipe,
    judul,
    pic_nik: pic,
    target_selesai: dueDate,
    deskripsi: desc,
    status
  });

  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  closeModal('modalTaskProject');
  renderKanbanBoard();
  showToast('PR / Project baru berhasil disimpan!', 'success');
}

function updateTaskStatus(taskId, newStatus) {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || '[]');
  const idx = tasks.findIndex(t => t.id === taskId);
  if (idx !== -1) {
    tasks[idx].status = newStatus;
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    renderKanbanBoard();
    showToast('Status tugas diperbarui!', 'success');
  }
}

// =============================================================================
// 11. ATTENDANCE (QC SENIN-JUMAT & FARID AUTO-ABSEN 06:00 WIB)
// =============================================================================
function initAttendanceRecords() {
  const todayStr = new Date().toISOString().split('T')[0];
  const attendanceList = [];

  MASTER_EMPLOYEES.filter(e => e.ikutAbsensi).forEach(emp => {
    // Farid auto-clocked at 06:00
    if (emp.nik === '300845') {
      attendanceList.push({
        nik: emp.nik,
        tanggal: todayStr,
        jam_masuk: '06:00:00',
        status: 'HADIR (Auto)',
        is_auto: true
      });
    }
  });

  localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendanceList));
}

function renderAttendanceSection() {
  const container = document.getElementById('attendanceCardsGrid');
  if (!container) return;

  const attendanceList = JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTENDANCE) || '[]');
  const todayStr = new Date().toISOString().split('T')[0];
  const todayRecords = attendanceList.filter(a => a.tanggal === todayStr);

  const qcEmployees = MASTER_EMPLOYEES.filter(e => e.ikutAbsensi);

  container.innerHTML = qcEmployees.map(emp => {
    const record = todayRecords.find(r => r.nik === emp.nik);
    const hasAttended = Boolean(record);

    let statusHtml = '';
    if (hasAttended) {
      statusHtml = `<span class="badge badge-non-rc">Hadir: ${record.jam_masuk}</span>`;
    } else {
      statusHtml = `<button class="btn-clock-in" onclick="clockInEmployee('${emp.nik}')">Absen Masuk</button>`;
    }

    return `
      <div class="attendance-card ${hasAttended ? 'attended' : ''}">
        <img src="${emp.foto}" alt="${emp.nama}" class="attendance-avatar">
        <div class="attendance-info">
          <div class="attendance-name">${emp.nama}</div>
          <div class="attendance-role">${emp.jabatan}</div>
          <div class="attendance-nik">NIK: ${emp.nik}</div>
          <div style="margin-top: 6px;">${statusHtml}</div>
        </div>
      </div>
    `;
  }).join('');
}

function clockInEmployee(nik) {
  const todayStr = new Date().toISOString().split('T')[0];
  const nowTime = new Date().toLocaleTimeString('id-ID', { hour12: false });
  const attendanceList = JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTENDANCE) || '[]');

  attendanceList.push({
    nik: nik,
    tanggal: todayStr,
    jam_masuk: nowTime,
    status: 'HADIR',
    is_auto: false
  });

  localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendanceList));
  renderAttendanceSection();
  const emp = MASTER_EMPLOYEES.find(e => e.nik === nik);
  showToast(`Absensi tercatat: ${emp ? emp.nama : nik} (${nowTime})`, 'success');
}

// =============================================================================
// 12. ORGANIZATION STRUCTURE & JOB DESCRIPTION (MASTER JOB DESC QA)
// =============================================================================
const MASTER_JOB_DESC_TABLE = [
  {
    jabatan: 'Section Head QA',
    pemegang: 'Terlampir di SO (Mardani - NIK 300364)',
    peran: 'Mengontrol tercapainya target produksi group yang dan dibawahnya (kuantitas, kualitas, cost)'
  },
  {
    jabatan: 'Administrasi',
    pemegang: 'Nita Nururahmah (NIK 304790)',
    peran: 'Menjamin proses administrasi di departement QA dan yang terlaksana sesuai duedate ditetapkan'
  },
  {
    jabatan: 'QC Incoming',
    pemegang: 'Eka Yudi Saputra & Wisnu Maruto (NIK 300167 & 102498)',
    peran: 'Menjamin komponen/material yang diterima dari supplier diverifikasi sesuai dengan methode samplingnya'
  },
  {
    jabatan: 'QCO Welding',
    pemegang: 'Didin Maulidin, Wahyudi & Saefulloh (NIK 300169, 300164, 300163)',
    peran: 'Menjamin part yang dikirim ke next proses dan customer tidak ada claim Kualitas'
  },
  {
    jabatan: 'QC Outgoing',
    pemegang: 'Dahlan & Suryana (NIK 300249 & 301082)',
    peran: 'Menjamin part yang dikirim ke customer tidak ada claim Kualitas'
  },
  {
    jabatan: 'Quality Metrology Lab',
    pemegang: 'Syamsul Arifin (NIK 300077)',
    peran: 'Menjamin semua permintaan pengukuran & pengujian sesuai terlaksana aturan dan valid'
  },
  {
    jabatan: 'Quality Kalibrasi Alat Ukur & Uji',
    pemegang: 'Farid (NIK 300845)',
    peran: 'Menjamin alat ukur dan uji Layak digunakan untuk dan pengukuran atau pengujian'
  }
];

function toggleOrgView(viewType) {
  const chartWrapper = document.getElementById('orgChartContainer');
  const tableWrapper = document.getElementById('masterJobDescContainer');
  const btnChart = document.getElementById('btnViewOrgChart');
  const btnTable = document.getElementById('btnViewJobDescTable');

  if (viewType === 'chart') {
    chartWrapper.classList.remove('hidden');
    tableWrapper.classList.add('hidden');
    btnChart.classList.add('active');
    btnTable.classList.remove('active');
  } else {
    chartWrapper.classList.add('hidden');
    tableWrapper.classList.remove('hidden');
    btnChart.classList.remove('active');
    btnTable.classList.add('active');
    renderMasterJobDescTable();
  }
}

function renderMasterJobDescTable() {
  const tbody = document.getElementById('masterJobDescTableBody');
  if (!tbody) return;

  tbody.innerHTML = MASTER_JOB_DESC_TABLE.map((item, idx) => `
    <tr style="background: ${idx % 2 === 0 ? 'rgba(30, 41, 59, 0.5)' : 'rgba(15, 23, 42, 0.7)'};">
      <td style="font-weight: 700; color: #fff; vertical-align: top; padding: 12px;">
        <span style="color: var(--accent-cyan);">${item.jabatan}</span>
      </td>
      <td style="font-weight: 600; color: #f1f5f9; vertical-align: top; padding: 12px;">
        ${escapeHTML(item.pemegang)}
      </td>
      <td style="color: #cbd5e1; line-height: 1.5; padding: 12px; font-size: 0.86rem;">
        ${escapeHTML(item.peran)}
      </td>
    </tr>
  `).join('');
}

function renderOrgStructure() {
  renderMasterJobDescTable();
  const container = document.getElementById('orgChartContainer');
  if (!container) return;

  // Tier 1: Section Head
  const tier1 = MASTER_EMPLOYEES.filter(e => e.level === 1);
  // Tier 2: Admin & Claim
  const tier2 = MASTER_EMPLOYEES.filter(e => e.level === 2);
  // Tier 3: Inspectors QC
  const tier3 = MASTER_EMPLOYEES.filter(e => e.level === 3);
  // Tier 4: Non-QA Roles
  const tier4 = MASTER_EMPLOYEES.filter(e => e.level === 4);

  function renderTier(list, title) {
    return `
      <div style="width: 100%; text-align: center; margin-bottom: 0.5rem;">
        <span class="badge" style="background: rgba(2, 132, 199, 0.2); color: var(--accent-cyan); font-size: 0.75rem;">${title}</span>
      </div>
      <div class="org-tier">
        ${list.map(emp => `
          <div class="org-card" onclick="viewEmployeeJobdesc('${emp.nik}')">
            <img src="${emp.foto}" alt="${emp.nama}" class="org-avatar">
            <div class="org-name">${emp.nama}</div>
            <div class="org-title">${emp.jabatan}</div>
            <div class="org-nik">NIK: ${emp.nik}</div>
            <button class="btn-view-jobdesc">Lihat Jobdesc</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  container.innerHTML = `
    ${renderTier(tier1, 'PIMPINAN MUTU')}
    <div style="height: 24px; width: 2px; background: var(--border-color); margin: 0 auto;"></div>
    ${renderTier(tier2, 'ADMINISTRASI & CLAIM QUALITY')}
    <div style="height: 24px; width: 2px; background: var(--border-color); margin: 0 auto;"></div>
    ${renderTier(tier3, 'INSPECTOR QC LAPANGAN & LAB')}
    <div style="height: 24px; width: 2px; background: var(--border-color); margin: 0 auto;"></div>
    ${renderTier(tier4, 'PENGHUBUNG ANTAR DIVISI (LUAR QA)')}
  `;
}

function viewEmployeeJobdesc(nik) {
  const emp = MASTER_EMPLOYEES.find(e => e.nik === nik);
  if (!emp) return;

  document.getElementById('jobdescModalTitle').textContent = `Job Description: ${emp.nama}`;
  document.getElementById('jobdescModalBody').innerHTML = `
    <div style="display: flex; gap: 1.25rem; align-items: center; margin-bottom: 1.25rem;">
      <img src="${emp.foto}" alt="${emp.nama}" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent-cyan);">
      <div>
        <h4 style="color: #fff; font-size: 1.1rem;">${emp.nama}</h4>
        <div style="color: var(--accent-cyan); font-weight: 600; font-size: 0.85rem;">${emp.jabatan} (${emp.departemen})</div>
        <div style="color: var(--text-dim); font-size: 0.75rem; font-family: monospace;">NIK: ${emp.nik}</div>
      </div>
    </div>
    <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 1rem;">
      <h5 style="color: #fff; margin-bottom: 6px; font-size: 0.85rem;">Tugas Pokok & Tanggung Jawab:</h5>
      <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.6;">${emp.jobdesc}</p>
    </div>
  `;
  openModal('modalJobdesc');
}

function populateEmployeesDropdown() {
  const picSelect = document.getElementById('inputTaskPIC');
  if (picSelect) {
    picSelect.innerHTML = MASTER_EMPLOYEES.map(e => `
      <option value="${e.nik}">${e.nama} (${e.jabatan})</option>
    `).join('');
  }
}

// =============================================================================
// 13. FULLSCREEN KIOSK / ANDON SCREEN SAVER (60s Idle Auto-Trigger)
// =============================================================================
let idleTimer = null;
let kioskSlideInterval = null;
let currentKioskSlideIndex = 0;
const KIOSK_SLIDE_DURATION = 8000; // 8 seconds per slide

function setupIdleDetection() {
  function resetIdleTimer() {
    clearTimeout(idleTimer);
    // 60 seconds idle activates kiosk screensaver
    idleTimer = setTimeout(() => {
      enterKioskMode();
    }, 60000);
  }

  window.addEventListener('mousemove', resetIdleTimer);
  window.addEventListener('mousedown', resetIdleTimer);
  window.addEventListener('keydown', resetIdleTimer);
  window.addEventListener('touchstart', resetIdleTimer);
  resetIdleTimer();
}

function enterKioskMode() {
  const kiosk = document.getElementById('kioskOverlay');
  if (!kiosk) return;
  kiosk.classList.remove('hidden');

  updateKioskSlideContents();
  currentKioskSlideIndex = 0;
  showKioskSlide(0);

  // Start carousel
  clearInterval(kioskSlideInterval);
  animateKioskProgressBar();
  kioskSlideInterval = setInterval(() => {
    currentKioskSlideIndex = (currentKioskSlideIndex + 1) % 4;
    showKioskSlide(currentKioskSlideIndex);
    animateKioskProgressBar();
  }, KIOSK_SLIDE_DURATION);
}

function exitKioskMode() {
  const kiosk = document.getElementById('kioskOverlay');
  if (kiosk) kiosk.classList.add('hidden');
  clearInterval(kioskSlideInterval);
}

function showKioskSlide(index) {
  for (let i = 1; i <= 4; i++) {
    const slide = document.getElementById(`kioskSlide${i}`);
    if (slide) slide.classList.toggle('active', i === (index + 1));
  }
}

function animateKioskProgressBar() {
  const bar = document.getElementById('kioskTimelineFill');
  if (!bar) return;
  bar.style.transition = 'none';
  bar.style.width = '0%';
  setTimeout(() => {
    bar.style.transition = `width ${KIOSK_SLIDE_DURATION}ms linear`;
    bar.style.width = '100%';
  }, 50);
}

function updateKioskSlideContents() {
  // Slide 1: Recent Problems
  const reports = JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]').filter(r => !r.is_deleted);
  const slide1Body = document.getElementById('kioskRecentProblemsContent');
  if (slide1Body) {
    if (reports.length === 0) {
      slide1Body.innerHTML = `<p class="col-center" style="color: var(--success-green); font-size: 1.5rem; padding: 3rem;">✅ LINE PRODUKSI AMAN: Tidak ada laporan problem terbuka hari ini.</p>`;
    } else {
      slide1Body.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1rem;">
          ${reports.slice(0, 4).map(r => `
            <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem; display: flex; gap: 1rem;">
              <img src="${r.foto_url}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-color);">
              <div>
                <div style="font-size: 0.95rem; font-weight: 800; color: #fff;">${r.nama_part} [${r.type_part}] - ${r.jumlah} Pcs</div>
                <div style="color: var(--accent-cyan); font-size: 0.82rem; font-weight: 600;">Defect: ${r.jenis_masalah}</div>
                <div style="color: var(--text-dim); font-size: 0.75rem; margin-top: 4px;">Area: ${r.area_masalah} • ${r.asal_part}</div>
                <div style="margin-top: 6px;"><span class="badge ${r.status === 'RC PENDING' ? 'badge-rc-open' : 'badge-non-rc'}">${r.status}</span></div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  // Slide 2: Spoilage Summary WoW
  const slide2Body = document.getElementById('kioskSpoilageSummaryContent');
  if (slide2Body) {
    slide2Body.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; height: 100%; align-items: center;">
        <div style="background: var(--bg-secondary); border: 2px solid var(--border-color); border-radius: 12px; padding: 1.5rem; text-align: center;">
          <h4 style="color: var(--accent-cyan); font-size: 1.2rem; margin-bottom: 0.5rem;">MACHINING</h4>
          <div style="font-size: 2.2rem; font-weight: 800; color: #fff;">5,423 Kg</div>
          <div style="color: var(--danger-red); font-weight: 700; margin: 4px 0;">0,11% (Target: 0,06%)</div>
          <p style="font-size: 0.8rem; color: var(--text-dim);">WoW: ▼ Membaik dibanding W41 (5,85 Kg)</p>
        </div>
        <div style="background: var(--bg-secondary); border: 2px solid var(--border-color); border-radius: 12px; padding: 1.5rem; text-align: center;">
          <h4 style="color: var(--accent-cyan); font-size: 1.2rem; margin-bottom: 0.5rem;">PRESSHOP</h4>
          <div style="font-size: 2.2rem; font-weight: 800; color: #fff;">45,837 Kg</div>
          <div style="color: var(--success-green); font-weight: 700; margin: 4px 0;">0,04% (Di bawah Target 0,06%)</div>
          <p style="font-size: 0.8rem; color: var(--text-dim);">Status Aman & Terkendali</p>
        </div>
        <div style="background: var(--bg-secondary); border: 2px solid var(--border-color); border-radius: 12px; padding: 1.5rem; text-align: center;">
          <h4 style="color: var(--accent-cyan); font-size: 1.2rem; margin-bottom: 0.5rem;">WELDING</h4>
          <div style="font-size: 2.2rem; font-weight: 800; color: #fff;">32,014 Kg</div>
          <div style="color: var(--success-green); font-weight: 700; margin: 4px 0;">0,01% (Sangat Baik)</div>
          <p style="font-size: 0.8rem; color: var(--text-dim);">WoW: ▼ Turun dari 33,1 Kg</p>
        </div>
      </div>
    `;
  }

  // Slide 3: Pending Tasks
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || '[]');
  const slide3Body = document.getElementById('kioskPendingTasksContent');
  if (slide3Body) {
    slide3Body.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
        ${tasks.map(t => `
          <div style="background: var(--bg-secondary); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 1rem;">
            <div style="display: flex; justify-content: space-between;">
              <span class="badge ${t.tipe === 'PR' ? 'badge-pr' : 'badge-proj'}">${t.tipe}</span>
              <span style="font-size: 0.75rem; color: var(--text-dim);">Due: ${formatDateID(t.target_selesai)}</span>
            </div>
            <h4 style="color: #fff; font-size: 1rem; margin: 6px 0;">${escapeHTML(t.judul)}</h4>
            <p style="color: var(--text-muted); font-size: 0.8rem;">${escapeHTML(t.deskripsi)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Slide 4: Team
  const slide4Body = document.getElementById('kioskTeamContent');
  if (slide4Body) {
    slide4Body.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; text-align: center;">
        ${MASTER_EMPLOYEES.filter(e => e.level <= 3).map(e => `
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.85rem;">
            <img src="${e.foto}" style="width: 55px; height: 55px; border-radius: 50%; object-fit: cover; margin-bottom: 6px;">
            <div style="font-weight: 700; color: #fff; font-size: 0.88rem;">${e.nama}</div>
            <div style="color: var(--accent-cyan); font-size: 0.75rem;">${e.jabatan}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

// =============================================================================
// 14. SUPABASE CONFIGURATION MODAL & CONNECTOR
// =============================================================================
function saveAndTestSupabaseConfig() {
  const url = document.getElementById('cfgSupabaseUrl').value.trim();
  const anonKey = document.getElementById('cfgSupabaseAnonKey').value.trim();
  const bucket = document.getElementById('cfgBucketName').value.trim();
  const statusMsg = document.getElementById('cfgStatusMsg');

  if (!url || !anonKey) {
    showToast('Supabase URL dan Anon Key harus diisi!', 'error');
    return;
  }

  statusMsg.textContent = 'Mencoba menghubungkan ke Supabase...';
  statusMsg.style.color = 'var(--accent-cyan)';

  try {
    const supabaseClient = window.supabase.createClient(url, anonKey);
    // Simple ping test
    supabaseClient.from('employees').select('count', { count: 'exact', head: true }).then(({ error }) => {
      if (error && error.code !== 'PGRST116') {
        statusMsg.textContent = `Peringatan: ${error.message} (Pastikan script SQL sudah di-Run di SQL Editor)`;
        statusMsg.style.color = 'var(--warning-amber)';
      } else {
        statusMsg.textContent = '✅ Berhasil Terhubung ke Supabase Realtime Database!';
        statusMsg.style.color = 'var(--success-green)';
        document.getElementById('dbStatusDot').classList.add('connected');
        localStorage.setItem(STORAGE_KEYS.SUPABASE_CFG, JSON.stringify({ url, anonKey, bucket }));
        showToast('Supabase berhasil terhubung!', 'success');
        setTimeout(() => closeModal('modalSupabaseConfig'), 1500);
      }
    }).catch(err => {
      statusMsg.textContent = `Koneksi gagal: ${err.message}`;
      statusMsg.style.color = 'var(--danger-red)';
    });
  } catch (err) {
    statusMsg.textContent = `Format URL / Key salah: ${err.message}`;
    statusMsg.style.color = 'var(--danger-red)';
  }
}

// =============================================================================
// 15. UTILITIES & MODAL HELPERS
// =============================================================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

function formatDateID(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatNumber(num) {
  if (!num && num !== 0) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function escapeHTML(str) {
  if (!str) return '';
  return str.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
