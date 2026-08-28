# Navigasi Ambulans

Project navigasi ambulans berbasis Leaflet untuk demo dan hackathon.

## Isi

- `index.html` - struktur halaman
- `styles.css` - tampilan dan modal
- `app.js` - logika peta, lokasi, rute, dan panggilan ambulans
- `netlify.toml` - konfigurasi deploy Netlify

## Fitur

- Peta interaktif dengan Leaflet
- Lokasi pengguna realtime
- Pemilihan kondisi pasien
- Pemilihan rumah sakit terdekat
- Rute navigasi ke rumah sakit
- Tombol zoom in dan zoom out
- Tombol panggil ambulans via telepon atau WhatsApp

## Deploy

1. Push repo ini ke GitHub.
2. Hubungkan repo ke Netlify.
3. Set publish directory ke root project.
4. Deploy tanpa build command.

## Catatan

- Proyek ini memakai Leaflet untuk peta.
- Nomor WhatsApp ambulans masih placeholder dan bisa diganti di `app.js`.
