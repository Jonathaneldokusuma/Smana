# Smart Ambulance Navigation

Project navigasi ambulans berbasis Leaflet untuk hackathon. Fokusnya adalah mencari fasilitas medis terdekat, memilih rumah sakit sesuai kondisi pasien, dan menampilkan rute langsung di peta.

## Fitur

- Peta interaktif dengan Leaflet
- Lokasi pengguna realtime
- Pilih kondisi pasien
- Filter rumah sakit, puskesmas, klinik, apotek, dan fasilitas lain
- Mode `Seluruh Indonesia` untuk prioritas nasional
- Rute navigasi menuju fasilitas terdekat
- Marker ikon medis, bukan huruf
- Profil fasilitas ala Google Maps
- Tombol zoom in dan zoom out
- Tombol panggil ambulans via telepon dan WhatsApp

## Teknologi

- `Leaflet`
- `Leaflet Routing Machine`
- `Vite`
- `OpenStreetMap` / `Overpass API`

## Struktur Utama

- `index.html` - struktur halaman
- `styles.css` - tampilan dan layout
- `src/main.js` - logika peta, filter, routing, dan profil fasilitas
- `netlify.toml` - konfigurasi deploy Netlify

## Menjalankan Lokal

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy ke Netlify

1. Push repo ke GitHub.
2. Hubungkan repo ke Netlify.
3. Set build command ke `npm run build`.
4. Set publish directory ke `dist`.

## Catatan

- Data fasilitas memakai kombinasi seed nasional dan data live dari OpenStreetMap.
- Nomor WhatsApp ambulans bisa kamu ganti di `src/main.js`.
- Kalau data live sedang lambat, aplikasi tetap punya fallback dari seed lokal.
