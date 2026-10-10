-- ==============================================================================
-- DATABASE SCHEMA: AUTOMOTIVE QUALITY PORTAL (SUPABASE POSTGRESQL)
-- 100% GRATIS TANPA KARTU KREDIT
-- Cara Penggunaan:
-- 1. Buka dashboard project di https://supabase.com
-- 2. Buka menu 'SQL Editor' di sebelah kiri -> 'New Query'
-- 3. Paste seluruh skrip ini dan klik tombol 'Run'
-- ==============================================================================

-- 1. TABEL MASTER KARYAWAN & STRUKTUR ORGANISASI
CREATE TABLE IF NOT EXISTS employees (
    nik VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    jabatan VARCHAR(100) NOT NULL,
    departemen VARCHAR(50) DEFAULT 'QA/QC',
    level_hierarki INT NOT NULL, -- 1: Section Head, 2: Staff, 3: Inspector, 4: Luar QA
    foto_url TEXT,
    password VARCHAR(100) DEFAULT '123456',
    ikut_absensi BOOLEAN DEFAULT TRUE,
    jobdesc TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Data: 11 Personil QC + 5 Akun Departemen Luar QA
INSERT INTO employees (nik, nama, jabatan, departemen, level_hierarki, foto_url, ikut_absensi, password, jobdesc) VALUES
('300364', 'Mardani', 'Section Head QA', 'QA/QC', 1, 'https://lh3.googleusercontent.com/d/1TEzsY3pgt2gji3a9OsQc-vwEzsAZJHAY', TRUE, '123456', 'Mengontrol tercapainya target produksi group yang dan dibawahnya (kuantitas, kualitas, cost)'),
('304790', 'Nita Nururahmah', 'Administrasi', 'QA/QC', 2, 'https://lh3.googleusercontent.com/d/18hUpVQyLdV5cRaaY58DDkDS_LbNXx9ry', TRUE, '123456', 'Menjamin proses administrasi di departement QA dan yang terlaksana sesuai duedate ditetapkan'),
('300845', 'Farid', 'Quality Kalibrasi Alat Ukur & Uji', 'QA/QC', 2, 'https://lh3.googleusercontent.com/d/1EysidVFpYx0Q14gvZMeZifzYKjYYLnP1', TRUE, '123456', 'Menjamin alat ukur dan uji Layak digunakan untuk dan pengukuran atau pengujian'),
('300249', 'Dahlan Saedul Ahyam', 'QC Outgoing', 'QA/QC', 3, 'https://lh3.googleusercontent.com/d/1XZPsSmJm4VBxi3vzO7etqHan9PO7BalI', TRUE, '123456', 'Menjamin part yang dikirim ke customer tidak ada claim Kualitas'),
('300169', 'Didin Maulidin', 'QCO Welding', 'QA/QC', 3, 'https://lh3.googleusercontent.com/d/1JHIOXwqS53PirP1oSpCI50polWdih4s_', TRUE, '123456', 'Menjamin part yang dikirim ke next proses dan customer tidak ada claim Kualitas'),
('300167', 'Eka Yudi Saputra', 'QC Incoming', 'QA/QC', 3, 'https://lh3.googleusercontent.com/d/1yMHuqd-C5W9Ea7GqKxe6ew-pa2_t1fUP', TRUE, '123456', 'Menjamin komponen/material yang diterima dari supplier diverifikasi sesuai dengan methode samplingnya'),
('300163', 'Saefulloh', 'QCO Welding', 'QA/QC', 3, 'https://lh3.googleusercontent.com/d/1acKdgk2KusMvMD-PHiGAgEmQBQQGG5GY', TRUE, '123456', 'Menjamin part yang dikirim ke next proses dan customer tidak ada claim Kualitas'),
('301082', 'Suryana', 'QC Outgoing', 'QA/QC', 3, 'https://lh3.googleusercontent.com/d/1dA83g6Ls3bWUhpKZ1-Om_Jjcma0pqbTf', TRUE, '123456', 'Menjamin part yang dikirim ke customer tidak ada claim Kualitas'),
('300077', 'Syamsul Arifin', 'Quality Metrology Lab', 'QA/QC', 3, 'https://lh3.googleusercontent.com/d/1thGrj-y5oGrtp_q4XNwkSJDFjGQhIand', TRUE, '123456', 'Menjamin semua permintaan pengukuran & pengujian sesuai terlaksana aturan dan valid'),
('300164', 'Wahyudi Setiyo', 'QCO Welding', 'QA/QC', 3, 'https://lh3.googleusercontent.com/d/1mQENZkAvF7kdS6luX73ICAcz_JBbeSYq', TRUE, '123456', 'Menjamin part yang dikirim ke next proses dan customer tidak ada claim Kualitas'),
('102498', 'Wisnu Maruto', 'QC Incoming', 'QA/QC', 3, 'https://lh3.googleusercontent.com/d/1h2-4RbNUjVAs3Hf6WGZhTn-YvJwzo5ZC', TRUE, '123456', 'Menjamin komponen/material yang diterima dari supplier diverifikasi sesuai dengan methode samplingnya'),
-- Akun Luar QA
('900001', 'Agus Prayitno', 'QC Press Shop', 'PRODUKSI', 4, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', FALSE, '123456', 'QC Proses Stamping dan Press Shop.'),
('900002', 'Bagus', 'QC Machining', 'PRODUKSI', 4, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', FALSE, '123456', 'QC Proses Permesinan Machining.'),
('900003', 'Syamsul Amar', 'QC Machining', 'PRODUKSI', 4, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', FALSE, '123456', 'QC Proses Permesinan Machining.'),
('900004', 'Staff PPC / Warehouse', 'Material & Gudang', 'LOGISTIK', 4, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', FALSE, '123456', 'Pengendali material incoming & outgoing.'),
('900005', 'Teknisi Maintenance', 'Maintenance & Utility', 'MAINTENANCE', 4, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', FALSE, '123456', 'Perbaikan mesin las dan sarana produksi.')
ON CONFLICT (nik) DO NOTHING;

-- 2. TABEL ABSENSI (Senin - Jumat Khusus QC)
CREATE TABLE IF NOT EXISTS attendance (
    id BIGSERIAL PRIMARY KEY,
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    nik VARCHAR(20) REFERENCES employees(nik),
    jam_masuk TIME NOT NULL,
    jam_pulang TIME,
    status VARCHAR(30) DEFAULT 'HADIR',
    is_auto BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (tanggal, nik)
);

-- 3. TABEL LAPORAN PROBLEM (Sesuai 12 Kolom Format User)
CREATE TABLE IF NOT EXISTS problem_reports (
    id BIGSERIAL PRIMARY KEY,
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    nama_part VARCHAR(100) NOT NULL,
    type_part VARCHAR(50) NOT NULL,
    jumlah INT NOT NULL DEFAULT 1,
    foto_url TEXT,
    area_masalah VARCHAR(150),
    jenis_masalah TEXT NOT NULL,
    asal_part VARCHAR(50) NOT NULL,
    supplier_name VARCHAR(100),
    customer_name VARCHAR(100),
    customer_evidence_status VARCHAR(20),
    kategori VARCHAR(50) NOT NULL,
    shift VARCHAR(20) NOT NULL,
    frekuensi INT DEFAULT 1,
    penanganan_pengatasan VARCHAR(100),
    penanganan_pic VARCHAR(100),
    status VARCHAR(30) DEFAULT 'NON-RC', -- 'NON-RC', 'RC PENDING', 'CLOSED', 'VOID'
    pelapor_nik VARCHAR(20) REFERENCES employees(nik),
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_by VARCHAR(50),
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL BUKTI PENYERAHAN BARANG (HANDOVER)
CREATE TABLE IF NOT EXISTS handovers (
    id BIGSERIAL PRIMARY KEY,
    report_id BIGINT REFERENCES problem_reports(id) ON DELETE CASCADE,
    yang_menyerahkan_nik VARCHAR(20) REFERENCES employees(nik),
    penerima_nama VARCHAR(100) NOT NULL,
    kondisi_barang VARCHAR(100),
    catatan TEXT,
    is_rc BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABEL FORM RC (RE-CLAIM FORM)
CREATE TABLE IF NOT EXISTS rc_records (
    id BIGSERIAL PRIMARY KEY,
    report_id BIGINT REFERENCES problem_reports(id) ON DELETE CASCADE,
    no_rc VARCHAR(50) UNIQUE NOT NULL,
    tindakan_perbaikan TEXT NOT NULL,
    pic_followup VARCHAR(100) NOT NULL,
    target_selesai DATE,
    status_rc VARCHAR(30) DEFAULT 'OPEN',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABEL NG & SPOILAGE MINGGUAN (WoW MONITORING)
CREATE TABLE IF NOT EXISTS weekly_spoilage (
    id BIGSERIAL PRIMARY KEY,
    periode_minggu VARCHAR(20) NOT NULL, -- Misal: 'W42-2024'
    proses VARCHAR(30) NOT NULL,         -- 'MACHINING', 'PRESSHOP', 'WELDING'
    part_type VARCHAR(50) NOT NULL,      -- 'GN5', 'GN8', 'K2VM', 'K2SA', 'K2SM'
    part_name VARCHAR(100) NOT NULL,
    total_produksi INT NOT NULL DEFAULT 0,
    berat_pcs NUMERIC(8, 3) NOT NULL,    -- Berat dalam Kg
    total_ng INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABEL PR & PROJECT BARU
CREATE TABLE IF NOT EXISTS pending_tasks_projects (
    id BIGSERIAL PRIMARY KEY,
    tipe VARCHAR(20) NOT NULL, -- 'PR' atau 'PROJECT'
    judul VARCHAR(150) NOT NULL,
    deskripsi TEXT,
    pic_nik VARCHAR(20) REFERENCES employees(nik),
    target_selesai DATE,
    status VARCHAR(30) DEFAULT 'IN_PROGRESS',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. AKTIFKAN ROW LEVEL SECURITY (RLS) DENGAN AKSES REALTIME BEBAS HAMBATAN
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE problem_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE handovers ENABLE ROW LEVEL SECURITY;
ALTER TABLE rc_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_spoilage ENABLE ROW LEVEL SECURITY;
ALTER TABLE pending_tasks_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow All Public employees" ON employees FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Public attendance" ON attendance FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Public problem_reports" ON problem_reports FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Public handovers" ON handovers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Public rc_records" ON rc_records FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Public weekly_spoilage" ON weekly_spoilage FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Public pending_tasks" ON pending_tasks_projects FOR ALL USING (true) WITH CHECK (true);

-- 9. SETUP STORAGE BUCKET UNTUK FOTO BUKTI PROBLEM (1 GB GRATIS)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('bukti-problem', 'bukti-problem', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Bucket Bukti" ON storage.objects FOR SELECT USING (bucket_id = 'bukti-problem');
CREATE POLICY "Public Upload Bucket Bukti" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'bukti-problem');
