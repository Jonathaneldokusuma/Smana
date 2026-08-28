const centerBtn = document.getElementById('centerBtn');
const locBtn = document.getElementById('locBtn');
const caseBtn = document.getElementById('caseBtn');
const filterBtn = document.getElementById('filterBtn');
const callBtn = document.getElementById('callBtn');
const callModal = document.getElementById('callModal');
const callCloseBtn = document.getElementById('callCloseBtn');
const callPhoneBtn = document.getElementById('callPhoneBtn');
const callWhatsAppBtn = document.getElementById('callWhatsAppBtn');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const statusPill = document.getElementById('statusPill');
const geoError = document.getElementById('geoError');
const caseModal = document.getElementById('caseModal');
const caseGrid = document.getElementById('caseGrid');
const caseCloseBtn = document.getElementById('caseCloseBtn');
const filterModal = document.getElementById('filterModal');
const filterCloseBtn = document.getElementById('filterCloseBtn');
const hospitalSearch = document.getElementById('hospitalSearch');
const conditionFilter = document.getElementById('conditionFilter');
const hospitalList = document.getElementById('hospitalList');
const filterSummary = document.getElementById('filterSummary');

const patientCases = [
  { id: 'umum', label: 'Umum', hint: 'Keluhan umum, demam, lemas.' },
  { id: 'trauma', label: 'Trauma', hint: 'Kecelakaan, luka berat, patah tulang.' },
  { id: 'jantung', label: 'Jantung', hint: 'Nyeri dada, sesak, serangan jantung.' },
  { id: 'anak', label: 'Anak', hint: 'Pasien anak dan bayi.' },
  { id: 'ibu', label: 'Ibu & Bayi', hint: 'Persalinan dan kondisi obstetri.' },
  { id: 'igd', label: 'IGD Terdekat', hint: 'Langsung ke instalasi gawat darurat.' },
];

const soloHospitals = [
  { name: 'RSUD Dr. Moewardi', latlng: [-7.558, 110.7758], tags: { emergency: 'yes', services: ['igd', 'umum', 'trauma'] } },
  { name: 'RS Ortopedi Prof. Dr. R. Soeharso', latlng: [-7.557653, 110.773923], tags: { emergency: 'yes', services: ['trauma', 'igd', 'umum'] } },
  { name: 'RS Kasih Ibu Surakarta', latlng: [-7.5592, 110.8062], tags: { emergency: 'yes', services: ['umum', 'anak', 'ibu'] } },
  { name: 'RSUD Bung Karno Surakarta', latlng: [-7.5495, 110.8396], tags: { emergency: 'yes', services: ['igd', 'umum', 'ibu'] } },
  { name: 'RS PKU Muhammadiyah Surakarta', latlng: [-7.5652, 110.8162], tags: { emergency: 'yes', services: ['igd', 'umum', 'anak', 'ibu'] } },
  { name: 'RS Dr. Oen Solo Baru', latlng: [-7.6014, 110.8189], tags: { emergency: 'yes', services: ['igd', 'umum', 'jantung'] } },
];

const hospitalKeywords = {
  umum: ['rsud', 'rumah sakit', 'hospital'],
  trauma: ['trauma', 'ortopedi', 'rsud'],
  jantung: ['jantung', 'cardio', 'heart'],
  anak: ['anak', 'bunda', 'rsia'],
  ibu: ['ibu', 'bunda', 'bersalin', 'maternal'],
  igd: ['igd', 'emergency', 'rsud', 'rumah sakit'],
};

let map;
let ambulanceMarker;
let hospitalMarker;
let userHalo;
let userDot;
let routeControl;
let lastPosition = null;
let activeCase = 'igd';
let activeHospital = soloHospitals[0];
let followUser = true;
let hospitalMarkers = [];

const fallbackCenter = [-7.5566, 110.8205];

function setStatus(text) {
  statusPill.textContent = text;
}

function showError(text) {
  geoError.textContent = text;
  geoError.hidden = false;
}

function hideError() {
  geoError.hidden = true;
  geoError.textContent = '';
}

function openCallModal() {
  callModal.hidden = false;
}

function closeCallModal() {
  callModal.hidden = true;
}

function openFilterModal() {
  filterModal.hidden = false;
  renderHospitalList();
}

function closeFilterModal() {
  filterModal.hidden = true;
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation unsupported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  });
}

function createPin(label, className) {
  return L.divIcon({
    className: `map-pin ${className}`,
    html: `<span>${label}</span>`,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
}

function renderCases() {
  caseGrid.innerHTML = '';
  patientCases.forEach((item) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'case-item';
    button.innerHTML = `<strong>${item.label}</strong><span>${item.hint}</span>`;
    button.addEventListener('click', () => {
      activeCase = item.id;
      caseModal.hidden = true;
      if (lastPosition) chooseHospital(lastPosition);
      setStatus(`Kondisi dipilih: ${item.label}`);
    });
    caseGrid.appendChild(button);
  });
}

function haversineKm(a, b) {
  const r = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;
  return 2 * r * Math.asin(Math.sqrt(Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2));
}

function normalize(text = '') {
  return text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ');
}

function scoreHospital(hospital) {
  const name = normalize(hospital.name);
  const keywords = hospitalKeywords[activeCase] || hospitalKeywords.igd;
  let score = 0;
  for (const keyword of keywords) if (name.includes(keyword)) score += 3;
  if (name.includes('igd')) score += 2;
  if (name.includes('rsud')) score += 2;
  if (hospital.tags?.emergency === 'yes') score += 1;
  if (hospital.tags?.services?.includes(activeCase)) score += 3;
  return score;
}

function matchesCondition(hospital, filterValue) {
  if (filterValue === 'all') return true;
  if (filterValue === 'igd') {
    return hospital.tags?.services?.includes('igd') || normalize(hospital.name).includes('igd') || hospital.tags?.emergency === 'yes';
  }
  return hospital.tags?.services?.includes(filterValue) || normalize(hospital.name).includes(filterValue);
}

function nearestHospital(fromLatLng) {
  return [...soloHospitals]
    .map((hospital) => ({ ...hospital, distance: haversineKm(fromLatLng, hospital.latlng), score: scoreHospital(hospital) }))
    .sort((a, b) => (b.score - a.score) || (a.distance - b.distance))[0];
}

function filteredHospitals() {
  const query = normalize(hospitalSearch.value.trim());
  const condition = conditionFilter.value;
  const base = lastPosition || fallbackCenter;

  return soloHospitals
    .filter((hospital) => {
      const nameMatch = !query || normalize(hospital.name).includes(query);
      const conditionMatch = matchesCondition(hospital, condition);
      return nameMatch && conditionMatch;
    })
    .map((hospital) => ({
      ...hospital,
      distance: haversineKm(base, hospital.latlng),
      score: scoreHospital(hospital),
    }))
    .sort((a, b) => a.distance - b.distance || b.score - a.score);
}

function renderHospitalMarkers() {
  hospitalMarkers.forEach((marker) => map.removeLayer(marker));
  hospitalMarkers = [];
  soloHospitals.forEach((hospital) => {
    const marker = L.marker(hospital.latlng, { icon: createPin('H', 'map-pin-hospital') }).addTo(map);
    marker.bindPopup(`<strong>${hospital.name}</strong><br/>${(hospital.tags?.services || ['umum']).join(', ')}`);
    hospitalMarkers.push(marker);
  });
}

function renderHospitalList() {
  const items = filteredHospitals();
  hospitalList.innerHTML = '';
  filterSummary.textContent = items.length
    ? `Menampilkan ${items.length} rumah sakit, diurutkan dari yang paling dekat.`
    : 'Tidak ada rumah sakit yang cocok dengan filter ini.';

  items.forEach((hospital) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'hospital-item';
    row.innerHTML = `
      <div class="hospital-item-main">
        <strong>${hospital.name}</strong>
        <span>${(hospital.tags?.services || ['umum']).join(' • ')}</span>
      </div>
      <div class="hospital-item-meta">
        <b>${hospital.distance.toFixed(1)} km</b>
        <small>${hospital.score > 0 ? 'Cocok' : 'Umum'}</small>
      </div>
    `;
    row.addEventListener('click', () => {
      activeHospital = hospital;
      hospitalMarker.setLatLng(hospital.latlng);
      drawRoute(lastPosition || fallbackCenter, hospital.latlng, hospital.name);
      closeFilterModal();
      setStatus(`Dipilih: ${hospital.name}`);
    });
    hospitalList.appendChild(row);
  });
}

function drawRoute(fromLatLng, toLatLng, hospitalName) {
  setStatus(`Mencari rute ke ${hospitalName}...`);
  const waypoints = [
    L.latLng(fromLatLng[0], fromLatLng[1]),
    L.latLng(toLatLng[0], toLatLng[1]),
  ];

  if (!routeControl) {
    routeControl = L.Routing.control({
      waypoints,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: 'driving',
      }),
      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,
      showAlternatives: false,
      fitSelectedRoutes: true,
      show: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: '#4fe3b9', opacity: 0.98, weight: 6 }],
      },
    })
      .on('routesfound', (event) => {
        const route = event.routes?.[0];
        if (!route) return;
        const km = (route.summary.totalDistance / 1000).toFixed(1);
        const min = Math.max(1, Math.round(route.summary.totalTime / 60));
        setStatus(`Menuju ${hospitalName} • ${km} km • ${min} menit`);
        hideError();
      })
      .on('routingerror', () => {
        showError('Rute asli gagal dimuat. Coba pilih lagi atau cek koneksi.');
        setStatus('Rute belum tersedia');
      })
      .addTo(map);
    return;
  }

  routeControl.setWaypoints(waypoints);
}

function chooseHospital(fromLatLng) {
  const candidate =
    [...soloHospitals]
      .filter((hospital) => matchesCondition(hospital, activeCase))
      .map((hospital) => ({ ...hospital, distance: haversineKm(fromLatLng, hospital.latlng), score: scoreHospital(hospital) }))
      .sort((a, b) => (b.score - a.score) || (a.distance - b.distance))[0] || nearestHospital(fromLatLng);

  activeHospital = candidate;
  hospitalMarker.setLatLng(activeHospital.latlng);
  drawRoute(fromLatLng, activeHospital.latlng, activeHospital.name);
  renderHospitalList();
}

function setUserPosition(position) {
  const { latitude, longitude, accuracy } = position.coords;
  const next = [latitude, longitude];
  lastPosition = next;
  ambulanceMarker.setLatLng(next);
  userHalo.setLatLng(next);
  userDot.setLatLng(next);
  if (followUser) map.panTo(next, { animate: true, duration: 0.5 });
  chooseHospital(next);
  setStatus(`Lokasi Anda • akurasi ±${Math.round(accuracy)} m`);
}

function initMap() {
  map = L.map('map', {
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: true,
  }).setView(fallbackCenter, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

  ambulanceMarker = L.marker(fallbackCenter, { icon: createPin('🚑', 'map-pin-ambulance') }).addTo(map);
  hospitalMarker = L.marker(soloHospitals[0].latlng, { icon: createPin('H', 'map-pin-hospital') }).addTo(map);
  userHalo = L.marker(fallbackCenter, {
    icon: L.divIcon({ className: 'current-ring', iconSize: [40, 40], iconAnchor: [20, 20] }),
    interactive: false,
  }).addTo(map);
  userDot = L.marker(fallbackCenter, {
    icon: L.divIcon({ className: 'current-dot', iconSize: [16, 16], iconAnchor: [8, 8] }),
    interactive: false,
  }).addTo(map);

  map.on('dragstart', () => {
    followUser = false;
  });

  renderHospitalMarkers();
}

function startTracking() {
  if (!navigator.geolocation) {
    showError('Browser Anda tidak mendukung lokasi.');
    return;
  }
  navigator.geolocation.watchPosition(
    setUserPosition,
    () => {
      showError('Izin lokasi belum aktif.');
      setStatus('Menunggu izin lokasi');
    },
    { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 },
  );
}

centerBtn.addEventListener('click', () => {
  followUser = true;
  map.flyTo(lastPosition || fallbackCenter, Math.max(map.getZoom(), 15), { duration: 0.5 });
});

locBtn.addEventListener(
  'click',
  () =>
    navigator.geolocation?.getCurrentPosition(
      setUserPosition,
      () => showError('Akses lokasi ditolak.'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    ),
);

caseBtn.addEventListener('click', () => {
  caseModal.hidden = false;
});

filterBtn.addEventListener('click', () => {
  openFilterModal();
});

caseCloseBtn.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  caseModal.hidden = true;
});

caseModal.addEventListener('click', (e) => {
  if (e.target === caseModal) caseModal.hidden = true;
});

filterCloseBtn.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  closeFilterModal();
});

filterModal.addEventListener('click', (e) => {
  if (e.target === filterModal) closeFilterModal();
});

hospitalSearch.addEventListener('input', renderHospitalList);
conditionFilter.addEventListener('change', renderHospitalList);

zoomInBtn.addEventListener('click', () => map.zoomIn());
zoomOutBtn.addEventListener('click', () => map.zoomOut());

callBtn.addEventListener('click', () => {
  setStatus('Pilih metode panggilan');
  openCallModal();
});

callCloseBtn.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  closeCallModal();
});

callModal.addEventListener('click', (event) => {
  if (event.target === callModal) closeCallModal();
});

callPhoneBtn.addEventListener('click', () => {
  setStatus('Mempersiapkan panggilan telepon...');
  closeCallModal();
  window.location.href = 'tel:119';
});

callWhatsAppBtn.addEventListener('click', () => {
  const phone = '6281234567890';
  const baseMessage = 'Halo, saya butuh ambulans. Mohon kirim bantuan ke lokasi saya sekarang.';
  setStatus('Mempersiapkan WhatsApp ambulans...');
  closeCallModal();

  getCurrentPosition()
    .then((position) => {
      const { latitude, longitude } = position.coords;
      const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
      const message = encodeURIComponent(`${baseMessage}\nLokasi saya: ${mapsLink}`);
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank', 'noopener,noreferrer');
    })
    .catch(() => {
      const message = encodeURIComponent(baseMessage);
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank', 'noopener,noreferrer');
    });
});

renderCases();
initMap();
startTracking();
renderHospitalList();
caseModal.hidden = false;
setStatus('Pilih kondisi pasien');
