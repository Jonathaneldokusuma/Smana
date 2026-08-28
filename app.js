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
const regionFilter = document.getElementById('regionFilter');
const hospitalList = document.getElementById('hospitalList');
const filterSummary = document.getElementById('filterSummary');

const overpassEndpoint = 'https://overpass-api.de/api/interpreter';
const regionSuggestions = {
  jakarta: { label: 'Jakarta', latlng: [-6.2088, 106.8456] },
  bandung: { label: 'Bandung', latlng: [-6.9175, 107.6191] },
  semarang: { label: 'Semarang', latlng: [-6.9667, 110.4167] },
  surabaya: { label: 'Surabaya', latlng: [-7.2575, 112.7521] },
  yogyakarta: { label: 'Yogyakarta', latlng: [-7.7956, 110.3695] },
  solo: { label: 'Surakarta / Solo', latlng: [-7.5666, 110.8167] },
  medan: { label: 'Medan', latlng: [3.5952, 98.6722] },
  makassar: { label: 'Makassar', latlng: [-5.1477, 119.4327] },
  denpasar: { label: 'Denpasar', latlng: [-8.6705, 115.2126] },
};

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
let facilityCache = [];
let facilityCacheKey = '';

const fallbackCenter = [-7.5566, 110.8205];

function setStatus(text) { statusPill.textContent = text; }
function showError(text) { geoError.textContent = text; geoError.hidden = false; }
function hideError() { geoError.hidden = true; geoError.textContent = ''; }
function openCallModal() { callModal.hidden = false; }
function closeCallModal() { callModal.hidden = true; }
function openFilterModal() { filterModal.hidden = false; renderHospitalList(); }
function closeFilterModal() { filterModal.hidden = true; }

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

function getConditionLabel(value) {
  return {
    all: 'Semua kondisi',
    igd: 'IGD / Darurat',
    trauma: 'Trauma',
    jantung: 'Jantung',
    anak: 'Anak',
    ibu: 'Ibu & Bayi',
    umum: 'Umum',
  }[value] || 'Semua kondisi';
}

function getRegionBase() {
  const value = regionFilter.value;
  if (value === 'auto') return lastPosition || fallbackCenter;
  return regionSuggestions[value]?.latlng || (lastPosition || fallbackCenter);
}

function getRegionLabel() {
  return regionFilter.value === 'auto' ? 'lokasi Anda' : (regionSuggestions[regionFilter.value]?.label || 'wilayah terpilih');
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
      if (lastPosition) refreshFacilities(lastPosition);
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

function kmText(distance) {
  if (!Number.isFinite(distance)) return '-';
  return distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`;
}

function getFacilityType(facility) {
  const tags = facility.tags || {};
  const name = normalize(facility.name);
  if (tags.amenity === 'hospital' || tags.healthcare === 'hospital' || name.includes('rs')) return 'RS';
  if (name.includes('puskesmas') || tags.amenity === 'clinic' || tags.healthcare === 'clinic' || tags.healthcare === 'centre') return 'Puskesmas/Klinik';
  if (tags.amenity === 'doctors' || tags.healthcare === 'doctor') return 'Dokter';
  if (tags.amenity === 'pharmacy' || tags.healthcare === 'pharmacy') return 'Apotek';
  if (tags.healthcare === 'midwife') return 'Bidan';
  if (tags.amenity === 'dentist' || tags.healthcare === 'dentist') return 'Dokter Gigi';
  if (tags.healthcare === 'health post') return 'Pos Kesehatan';
  return 'Fasilitas Medis';
}

function getFacilityLabel(facility) {
  const type = getFacilityType(facility);
  if (type === 'RS') return 'Rumah Sakit';
  if (type === 'Puskesmas/Klinik') return normalize(facility.name).includes('puskesmas') ? 'Puskesmas' : 'Klinik';
  if (type === 'Dokter') return 'Dokter';
  if (type === 'Apotek') return 'Apotek';
  if (type === 'Bidan') return 'Bidan';
  if (type === 'Dokter Gigi') return 'Dokter Gigi';
  if (type === 'Pos Kesehatan') return 'Pos Kesehatan';
  return 'Fasilitas Medis';
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

function facilityScore(facility) {
  const name = normalize(facility.name);
  const tags = facility.tags || {};
  let score = 0;
  if (tags.amenity === 'hospital') score += 8;
  if (tags.amenity === 'clinic') score += 6;
  if (tags.amenity === 'doctors') score += 4;
  if (tags.amenity === 'pharmacy') score += 1;
  if (tags.amenity === 'dentist') score += 2;
  if (tags.healthcare === 'hospital') score += 8;
  if (tags.healthcare === 'clinic' || tags.healthcare === 'centre') score += 6;
  if (tags.healthcare === 'doctor') score += 4;
  if (tags.healthcare === 'midwife') score += 3;
  if (tags.healthcare === 'dentist') score += 2;
  if (tags.healthcare === 'health post') score += 2;
  if (tags.healthcare === 'pharmacy') score += 1;
  if (name.includes('rsud')) score += 3;
  if (name.includes('puskesmas')) score += 4;
  if (name.includes('igd') || name.includes('emergency')) score += 3;
  if (tags.emergency === 'yes') score += 2;
  return score;
}

function serviceMatchesCondition(tags = {}, name = '', condition = 'all') {
  if (condition === 'all') return true;
  const value = normalize(name);
  const services = normalize(`${tags.amenity || ''} ${tags.healthcare || ''} ${tags.emergency || ''}`);
  if (condition === 'igd') {
    return services.includes('hospital') || services.includes('clinic') || services.includes('doctors') || services.includes('pharmacy') || value.includes('igd') || value.includes('emergency') || value.includes('rs') || value.includes('puskesmas');
  }
  if (condition === 'trauma') return value.includes('ortopedi') || value.includes('trauma') || services.includes('hospital');
  if (condition === 'jantung') return value.includes('jantung') || value.includes('cardio') || value.includes('heart');
  if (condition === 'anak') return value.includes('anak') || value.includes('ibu dan anak') || value.includes('rsia');
  if (condition === 'ibu') return value.includes('ibu') || value.includes('bersalin') || value.includes('maternity') || value.includes('obgyn');
  if (condition === 'umum') return true;
  return true;
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

function buildOverpassQuery(lat, lng, radiusMeters) {
  return `
[out:json][timeout:25];
(
  node(around:${radiusMeters},${lat},${lng})[amenity=hospital];
  way(around:${radiusMeters},${lat},${lng})[amenity=hospital];
  relation(around:${radiusMeters},${lat},${lng})[amenity=hospital];
  node(around:${radiusMeters},${lat},${lng})[healthcare=hospital];
  way(around:${radiusMeters},${lat},${lng})[healthcare=hospital];
  relation(around:${radiusMeters},${lat},${lng})[healthcare=hospital];
  node(around:${radiusMeters},${lat},${lng})[amenity=clinic];
  way(around:${radiusMeters},${lat},${lng})[amenity=clinic];
  relation(around:${radiusMeters},${lat},${lng})[amenity=clinic];
  node(around:${radiusMeters},${lat},${lng})[healthcare=clinic];
  way(around:${radiusMeters},${lat},${lng})[healthcare=clinic];
  relation(around:${radiusMeters},${lat},${lng})[healthcare=clinic];
  node(around:${radiusMeters},${lat},${lng})[amenity=doctors];
  way(around:${radiusMeters},${lat},${lng})[amenity=doctors];
  relation(around:${radiusMeters},${lat},${lng})[amenity=doctors];
  node(around:${radiusMeters},${lat},${lng})[amenity=pharmacy];
  way(around:${radiusMeters},${lat},${lng})[amenity=pharmacy];
  relation(around:${radiusMeters},${lat},${lng})[amenity=pharmacy];
  node(around:${radiusMeters},${lat},${lng})[amenity=dentist];
  way(around:${radiusMeters},${lat},${lng})[amenity=dentist];
  relation(around:${radiusMeters},${lat},${lng})[amenity=dentist];
  node(around:${radiusMeters},${lat},${lng})[healthcare=centre];
  way(around:${radiusMeters},${lat},${lng})[healthcare=centre];
  relation(around:${radiusMeters},${lat},${lng})[healthcare=centre];
  node(around:${radiusMeters},${lat},${lng})[healthcare=facility];
  way(around:${radiusMeters},${lat},${lng})[healthcare=facility];
  relation(around:${radiusMeters},${lat},${lng})[healthcare=facility];
  node(around:${radiusMeters},${lat},${lng})[healthcare=doctor];
  way(around:${radiusMeters},${lat},${lng})[healthcare=doctor];
  relation(around:${radiusMeters},${lat},${lng})[healthcare=doctor];
  node(around:${radiusMeters},${lat},${lng})[healthcare=midwife];
  way(around:${radiusMeters},${lat},${lng})[healthcare=midwife];
  relation(around:${radiusMeters},${lat},${lng})[healthcare=midwife];
  node(around:${radiusMeters},${lat},${lng})[healthcare=dentist];
  way(around:${radiusMeters},${lat},${lng})[healthcare=dentist];
  relation(around:${radiusMeters},${lat},${lng})[healthcare=dentist];
  node(around:${radiusMeters},${lat},${lng})[healthcare=health post];
  way(around:${radiusMeters},${lat},${lng})[healthcare=health post];
  relation(around:${radiusMeters},${lat},${lng})[healthcare=health post];
  node(around:${radiusMeters},${lat},${lng})[healthcare=vaccination centre];
  way(around:${radiusMeters},${lat},${lng})[healthcare=vaccination centre];
  relation(around:${radiusMeters},${lat},${lng})[healthcare=vaccination centre];
);
out center tags;
`;
}

async function fetchFacilities(fromLatLng) {
  const [lat, lng] = fromLatLng;
  const radiusMeters = 12000;
  const cacheKey = `${lat.toFixed(3)}:${lng.toFixed(3)}:${conditionFilter.value}:${regionFilter.value}:${hospitalSearch.value.trim().toLowerCase()}`;
  if (facilityCache.length && facilityCacheKey === cacheKey) return facilityCache;

  const response = await fetch(overpassEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: `data=${encodeURIComponent(buildOverpassQuery(lat, lng, radiusMeters))}`,
  });
  if (!response.ok) throw new Error(`Overpass error ${response.status}`);
  const data = await response.json();

  const facilities = (data.elements || [])
    .map((el) => {
      const name = el.tags?.name || el.tags?.['name:en'] || el.tags?.operator || 'Fasilitas medis';
      const latlng = [el.lat ?? el.center?.lat, el.lon ?? el.center?.lon];
      if (latlng.some((value) => typeof value !== 'number')) return null;
      return { name, latlng, tags: el.tags || {}, source: 'overpass' };
    })
    .filter(Boolean);

  facilityCache = facilities;
  facilityCacheKey = cacheKey;
  return facilities;
}

function filteredHospitals(source = soloHospitals) {
  const query = normalize(hospitalSearch.value.trim());
  const condition = conditionFilter.value;
  const base = getRegionBase();

  return source
    .filter((hospital) => {
      const nameMatch = !query || normalize(hospital.name).includes(query);
      const conditionMatch = matchesCondition(hospital, condition) && serviceMatchesCondition(hospital.tags, hospital.name, condition);
      return nameMatch && conditionMatch;
    })
    .map((hospital) => ({
      ...hospital,
      distance: haversineKm(base, hospital.latlng),
      score: hospital.source === 'overpass' ? facilityScore(hospital) : scoreHospital(hospital),
    }))
    .sort((a, b) => a.distance - b.distance || b.score - a.score);
}

function renderHospitalMarkers() {
  hospitalMarkers.forEach((marker) => map.removeLayer(marker));
  hospitalMarkers = [];
  filteredHospitals(facilityCache.length ? facilityCache : soloHospitals).slice(0, 25).forEach((hospital) => {
    const marker = L.marker(hospital.latlng, { icon: createPin('H', 'map-pin-hospital') }).addTo(map);
    marker.bindPopup(`
      <strong>${hospital.name}</strong><br/>
      ${getFacilityLabel(hospital)}<br/>
      ${kmText(hospital.distance)} dari titik acuan
    `);
    hospitalMarkers.push(marker);
  });
}

function renderHospitalList() {
  const items = filteredHospitals(facilityCache.length ? facilityCache : soloHospitals);
  hospitalList.innerHTML = '';
  filterSummary.textContent = items.length
    ? `Menampilkan ${items.length} fasilitas medis terdekat untuk ${getConditionLabel(conditionFilter.value)} di ${getRegionLabel()}.`
    : 'Tidak ada fasilitas medis yang cocok dengan filter ini.';

  items.forEach((hospital) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'hospital-item';
    row.innerHTML = `
      <div class="hospital-item-main">
        <strong>${hospital.name}</strong>
        <span>${hospital.source === 'overpass'
          ? [hospital.tags?.amenity, hospital.tags?.healthcare].filter(Boolean).join(' • ')
          : (hospital.tags?.services || ['umum']).join(' • ')}</span>
      </div>
      <div class="hospital-item-meta">
        <div class="facility-badge">${getFacilityLabel(hospital)}</div>
        <b>${kmText(hospital.distance)}</b>
        <small>${hospital.source === 'overpass' ? 'OpenStreetMap' : 'Curated'}</small>
      </div>
    `;
    row.addEventListener('click', () => {
      activeHospital = hospital;
      hospitalMarker.setLatLng(hospital.latlng);
      drawRoute(getRegionBase(), hospital.latlng, hospital.name);
      closeFilterModal();
      setStatus(`Dipilih: ${hospital.name}`);
    });
    hospitalList.appendChild(row);
  });
}

function drawRoute(fromLatLng, toLatLng, hospitalName) {
  setStatus(`Mencari rute ke ${hospitalName}...`);
  const waypoints = [L.latLng(fromLatLng[0], fromLatLng[1]), L.latLng(toLatLng[0], toLatLng[1])];

  if (!routeControl) {
    routeControl = L.Routing.control({
      waypoints,
      router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1', profile: 'driving' }),
      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,
      showAlternatives: false,
      fitSelectedRoutes: true,
      show: false,
      createMarker: () => null,
      lineOptions: { styles: [{ color: '#4fe3b9', opacity: 0.98, weight: 6 }] },
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
  const source = facilityCache.length ? facilityCache : soloHospitals;
  const candidate = filteredHospitals(source).filter((hospital) => serviceMatchesCondition(hospital.tags, hospital.name, activeCase))[0] || nearestHospital(fromLatLng);
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
  setStatus(`Lokasi Anda • akurasi ±${Math.round(accuracy)} m`);
  refreshFacilities(next).catch(() => {});
}

async function refreshFacilities(fromLatLng) {
  try {
    setStatus('Mencari fasilitas medis terdekat...');
    const facilities = await fetchFacilities(fromLatLng);
    facilityCache = facilities;
    facilityCacheKey = `${fromLatLng[0].toFixed(3)}:${fromLatLng[1].toFixed(3)}:${conditionFilter.value}:${regionFilter.value}:${hospitalSearch.value.trim().toLowerCase()}`;
  } catch {
    facilityCache = [];
  } finally {
    chooseHospital(fromLatLng);
    renderHospitalMarkers();
    renderHospitalList();
  }
}

function initMap() {
  map = L.map('map', { zoomControl: false, attributionControl: false, scrollWheelZoom: true }).setView(fallbackCenter, 15);

  const mapHost = document.getElementById('map');
  const fallback = document.createElement('div');
  fallback.className = 'map-fallback';
  fallback.innerHTML = '<span>Peta sedang dimuat...</span>';
  mapHost.appendChild(fallback);

  const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    crossOrigin: true,
    errorTileUrl: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="256" height="256" fill="#08111d"/></svg>'),
  }).addTo(map);

  tileLayer.on('load', () => {
    if (fallback.isConnected) fallback.remove();
  });

  tileLayer.on('tileerror', () => {
    if (fallback.isConnected) fallback.innerHTML = '<span>Peta lambat dimuat, memakai tampilan dasar.</span>';
  });

  setTimeout(() => {
    if (fallback.isConnected) {
      fallback.innerHTML = '<span>Peta belum muncul, cek koneksi atau blokir tile.</span>';
    }
  }, 4000);

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

  map.on('dragstart', () => { followUser = false; });
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

locBtn.addEventListener('click', () => navigator.geolocation?.getCurrentPosition(setUserPosition, () => showError('Akses lokasi ditolak.'), { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }));

caseBtn.addEventListener('click', () => { caseModal.hidden = false; });
filterBtn.addEventListener('click', () => { openFilterModal(); });

caseCloseBtn.addEventListener('click', (event) => { event.preventDefault(); event.stopPropagation(); caseModal.hidden = true; });
caseModal.addEventListener('click', (e) => { if (e.target === caseModal) caseModal.hidden = true; });
filterCloseBtn.addEventListener('click', (event) => { event.preventDefault(); event.stopPropagation(); closeFilterModal(); });
filterModal.addEventListener('click', (e) => { if (e.target === filterModal) closeFilterModal(); });

hospitalSearch.addEventListener('input', () => {
  renderHospitalList();
  renderHospitalMarkers();
});

conditionFilter.addEventListener('change', () => {
  renderHospitalList();
  if (lastPosition) refreshFacilities(lastPosition);
});

regionFilter.addEventListener('change', () => {
  renderHospitalList();
  if (lastPosition) refreshFacilities(getRegionBase());
});

zoomInBtn.addEventListener('click', () => map.zoomIn());
zoomOutBtn.addEventListener('click', () => map.zoomOut());

callBtn.addEventListener('click', () => {
  setStatus('Pilih metode panggilan');
  openCallModal();
});

callCloseBtn.addEventListener('click', (event) => { event.preventDefault(); event.stopPropagation(); closeCallModal(); });
callModal.addEventListener('click', (event) => { if (event.target === callModal) closeCallModal(); });

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

