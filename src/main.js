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
const profileModal = document.getElementById('profileModal');
const profileCloseBtn = document.getElementById('profileCloseBtn');
const profileName = document.getElementById('profileName');
const profileBadge = document.getElementById('profileBadge');
const profileTypeLabel = document.getElementById('profileTypeLabel');
const profileDistance = document.getElementById('profileDistance');
const profileServices = document.getElementById('profileServices');
const profileAddress = document.getElementById('profileAddress');
const profileAction = document.getElementById('profileAction');
const hospitalSearch = document.getElementById('hospitalSearch');
const conditionFilter = document.getElementById('conditionFilter');
const facilityFilter = document.getElementById('facilityFilter');
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

const seedFacilities = [
  { name: 'RSUP Dr. Sardjito', latlng: [-7.7702, 110.3772], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'jantung', 'anak'] }, city: 'Yogyakarta' },
  { name: 'RS Bethesda Yogyakarta', latlng: [-7.7859, 110.3811], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'ibu'] }, city: 'Yogyakarta' },
  { name: 'RSUPN Dr. Cipto Mangunkusumo', latlng: [-6.1951, 106.8456], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'anak', 'ibu'] }, city: 'Jakarta' },
  { name: 'RS Cipto Mangunkusumo Kencana', latlng: [-6.1939, 106.8458], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'ibu'] }, city: 'Jakarta' },
  { name: 'RSUP Dr. Hasan Sadikin', latlng: [-6.8977, 107.6107], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'anak'] }, city: 'Bandung' },
  { name: 'RS Advent Bandung', latlng: [-6.8979, 107.6146], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'ibu'] }, city: 'Bandung' },
  { name: 'RSUD Dr. Soetomo', latlng: [-7.2684, 112.7581], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'trauma', 'umum'] }, city: 'Surabaya' },
  { name: 'RSUD dr. Soewandhie', latlng: [-7.2464, 112.7445], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'anak'] }, city: 'Surabaya' },
  { name: 'RSUP Kariadi', latlng: [-6.9857, 110.4092], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'jantung'] }, city: 'Semarang' },
  { name: 'RS Islam Sultan Agung', latlng: [-6.9817, 110.4486], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'ibu'] }, city: 'Semarang' },
  { name: 'RSUP H. Adam Malik', latlng: [3.5739, 98.6717], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'trauma'] }, city: 'Medan' },
  { name: 'RS Columbia Asia Medan', latlng: [3.5874, 98.6712], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'jantung'] }, city: 'Medan' },
  { name: 'RSUP Sanglah', latlng: [-8.6665, 115.2146], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'anak', 'ibu'] }, city: 'Denpasar' },
  { name: 'Puskesmas Purwosari', latlng: [-7.5748, 110.8008], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'igd'] }, city: 'Surakarta' },
  { name: 'Puskesmas Manahan', latlng: [-7.5509, 110.8048], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'anak'] }, city: 'Surakarta' },
  { name: 'Puskesmas Kecamatan Menteng', latlng: [-6.1965, 106.8316], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'ibu', 'anak'] }, city: 'Jakarta' },
  { name: 'Puskesmas Coblong', latlng: [-6.8902, 107.6137], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'anak'] }, city: 'Bandung' },
  { name: 'Puskesmas Wonokromo', latlng: [-7.3089, 112.7385], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'ibu'] }, city: 'Surabaya' },
  { name: 'Puskesmas Tegal Sari', latlng: [-3.5818, 98.6781], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum'] }, city: 'Medan' },
  { name: 'RSUP Prof. dr. I.G.N.G. Ngoerah', latlng: [-8.655, 115.2195], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'anak', 'ibu'] }, city: 'Denpasar' },
  { name: 'RSUD Kota Yogyakarta', latlng: [-7.7972, 110.3694], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Yogyakarta' },
  { name: 'RS Bhayangkara Semarang', latlng: [-6.9812, 110.4208], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Semarang' },
  { name: 'RSUD Panembahan Senopati', latlng: [-7.8033, 110.3686], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'trauma'] }, city: 'Bantul' },
  { name: 'Puskesmas Mantrijeron', latlng: [-7.8118, 110.3571], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'ibu'] }, city: 'Yogyakarta' },
  { name: 'Puskesmas Tegalrejo', latlng: [-7.7798, 110.3518], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'anak'] }, city: 'Yogyakarta' },
  { name: 'Klinik Utama Bunda', latlng: [-6.2234, 106.8463], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['ibu', 'anak', 'umum'] }, city: 'Jakarta' },
  { name: 'Klinik Pratama Sehat Sentosa', latlng: [-6.9081, 107.6083], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum'] }, city: 'Bandung' },
  { name: 'Apotek Kimia Farma Slamet Riyadi', latlng: [-7.5612, 110.8142], tags: { amenity: 'pharmacy', healthcare: 'pharmacy', services: ['umum'] }, city: 'Surakarta' },
  { name: 'Apotek K-24 Cihampelas', latlng: [-6.9034, 107.6072], tags: { amenity: 'pharmacy', healthcare: 'pharmacy', services: ['umum'] }, city: 'Bandung' },
  { name: 'Bidan Praktek Mandiri Ayu', latlng: [-7.5642, 110.8192], tags: { healthcare: 'midwife', services: ['ibu', 'anak'] }, city: 'Surakarta' },
  { name: 'Bidan Praktik Mandiri Melati', latlng: [-6.2048, 106.8472], tags: { healthcare: 'midwife', services: ['ibu', 'anak'] }, city: 'Jakarta' },
  { name: 'Dokter Gigi Smile Dental', latlng: [-7.5662, 110.8125], tags: { amenity: 'dentist', healthcare: 'dentist', services: ['umum'] }, city: 'Surakarta' },
  { name: 'Klinik Gigi Sejahtera', latlng: [-7.2492, 112.7441], tags: { amenity: 'dentist', healthcare: 'dentist', services: ['umum'] }, city: 'Surabaya' },
  { name: 'RSUP Dr. M. Djamil', latlng: [-0.9471, 100.3538], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'anak'] }, city: 'Padang' },
  { name: 'RS Murni Teguh Medan', latlng: [3.5821, 98.6836], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'jantung'] }, city: 'Medan' },
  { name: 'RSUD Dr. Soedarso', latlng: [-0.0356, 109.3378], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Pontianak' },
  { name: 'RSUP Dr. Wahidin Sudirohusodo', latlng: [-5.1321, 119.4926], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'anak', 'ibu'] }, city: 'Makassar' },
  { name: 'Puskesmas Kuta', latlng: [-8.7342, 115.1679], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'anak'] }, city: 'Bali' },
  { name: 'Puskesmas Kecamatan Cengkareng', latlng: [-6.1488, 106.7324], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'ibu', 'anak'] }, city: 'Jakarta' },
  { name: 'Klinik Pratama Sehat Medika', latlng: [-7.2822, 112.7358], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum'] }, city: 'Surabaya' },
  { name: 'Apotek K-24 Braga', latlng: [-6.9158, 107.6079], tags: { amenity: 'pharmacy', healthcare: 'pharmacy', services: ['umum'] }, city: 'Bandung' },
  { name: 'Bidan Mandiri Sejahtera', latlng: [-0.9506, 100.3533], tags: { healthcare: 'midwife', services: ['ibu', 'anak'] }, city: 'Padang' },
  { name: 'Dokter Gigi Ceria Dental', latlng: [-5.1369, 119.4312], tags: { amenity: 'dentist', healthcare: 'dentist', services: ['umum'] }, city: 'Makassar' },
  { name: 'RSUP Dr. Kariadi Unit Gawat Darurat', latlng: [-6.9878, 110.4098], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Semarang' },
  { name: 'RSUD dr. Soekardjo', latlng: [-7.3433, 108.2238], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Tasikmalaya' },
  { name: 'RSUP Dr. M. Djamil IGD', latlng: [-0.9484, 100.3524], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'trauma'] }, city: 'Padang' },
  { name: 'RSU Haji Surabaya', latlng: [-7.3108, 112.7448], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'ibu'] }, city: 'Surabaya' },
  { name: 'Puskesmas Mulyorejo', latlng: [-7.2727, 112.7934], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'anak'] }, city: 'Surabaya' },
  { name: 'Puskesmas Gedongtengen', latlng: [-7.7911, 110.3638], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum'] }, city: 'Yogyakarta' },
  { name: 'Klinik Utama Sehat Sentosa', latlng: [-6.2104, 106.8451], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'ibu', 'anak'] }, city: 'Jakarta' },
  { name: 'Apotek Sejahtera 24 Jam', latlng: [-7.2647, 112.7487], tags: { amenity: 'pharmacy', healthcare: 'pharmacy', services: ['umum'] }, city: 'Surabaya' },
  { name: 'Bidan Kasih Ibu', latlng: [-6.8947, 107.6129], tags: { healthcare: 'midwife', services: ['ibu', 'anak'] }, city: 'Bandung' },
  { name: 'Smile Dental Clinic Bandung', latlng: [-6.9039, 107.6116], tags: { amenity: 'dentist', healthcare: 'dentist', services: ['umum'] }, city: 'Bandung' },
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
function openProfileModal(facility) {
  profileName.textContent = facility.name;
  profileBadge.textContent = getMarkerLabel(facility);
  profileTypeLabel.textContent = getFacilityLabel(facility);
  profileDistance.textContent = `${kmText(facility.distance)} dari lokasi acuan`;
  profileServices.textContent = facility.source === 'overpass'
    ? [facility.tags?.amenity, facility.tags?.healthcare].filter(Boolean).join(' • ') || 'Fasilitas medis'
    : (facility.tags?.services || ['umum']).join(' • ');
  profileAddress.textContent = `${facility.city || regionSuggestions[facility.region]?.label || 'Lokasi terdeteksi dari peta'}${facility.source === 'overpass' ? ' • OpenStreetMap' : ''}`;
  profileAction.href = `https://www.google.com/maps/search/?api=1&query=${facility.latlng[0]},${facility.latlng[1]}`;
  profileModal.hidden = false;
}
function closeProfileModal() { profileModal.hidden = true; }

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

function getMarkerLabel(facility) {
  const type = getFacilityType(facility);
  if (type === 'RS') return 'RS';
  if (type === 'Puskesmas/Klinik') return normalize(facility.name).includes('puskesmas') ? 'P' : 'K';
  if (type === 'Dokter') return 'D';
  if (type === 'Apotek') return 'A';
  if (type === 'Bidan') return 'B';
  if (type === 'Dokter Gigi') return 'G';
  if (type === 'Pos Kesehatan') return 'Pos';
  return 'F';
}

function getMarkerClass(facility) {
  const type = getFacilityType(facility);
  if (type === 'RS') return 'map-pin-hospital';
  if (type === 'Puskesmas/Klinik') return normalize(facility.name).includes('puskesmas') ? 'map-pin-puskesmas' : 'map-pin-klinik';
  if (type === 'Dokter') return 'map-pin-doctor';
  if (type === 'Apotek') return 'map-pin-pharmacy';
  if (type === 'Bidan') return 'map-pin-midwife';
  if (type === 'Dokter Gigi') return 'map-pin-dentist';
  if (type === 'Pos Kesehatan') return 'map-pin-post';
  return 'map-pin-default';
}

function getProfileSummary(facility) {
  const parts = [];
  if (facility.city) parts.push(facility.city);
  parts.push(getFacilityLabel(facility));
  return parts.join(' â€¢ ');
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
  if (tags.amenity === 'pharmacy') score += 2;
  if (tags.amenity === 'dentist') score += 3;
  if (tags.healthcare === 'hospital') score += 8;
  if (tags.healthcare === 'clinic' || tags.healthcare === 'centre') score += 6;
  if (tags.healthcare === 'doctor') score += 4;
  if (tags.healthcare === 'midwife') score += 3;
  if (tags.healthcare === 'dentist') score += 2;
  if (tags.healthcare === 'health post') score += 2;
  if (tags.healthcare === 'pharmacy') score += 2;
  if (name.includes('rsud')) score += 3;
  if (name.includes('puskesmas')) score += 4;
  if (name.includes('igd') || name.includes('emergency')) score += 3;
  if (tags.emergency === 'yes') score += 2;
  return score;
}

function facilityTypeKey(facility) {
  const type = getFacilityType(facility);
  if (type === 'RS') return 'hospital';
  if (type === 'Puskesmas/Klinik') return normalize(facility.name).includes('puskesmas') ? 'puskesmas' : 'clinic';
  if (type === 'Dokter') return 'doctor';
  if (type === 'Apotek') return 'pharmacy';
  if (type === 'Bidan') return 'midwife';
  if (type === 'Dokter Gigi') return 'dentist';
  if (type === 'Pos Kesehatan') return 'post';
  return 'all';
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

function matchesFacilityType(facility, typeValue = 'all') {
  if (typeValue === 'all') return true;
  return facilityTypeKey(facility) === typeValue;
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

  facilityCache = [...seedFacilities, ...facilities];
  facilityCacheKey = cacheKey;
  return facilityCache;
}

function filteredHospitals(source = soloHospitals) {
  const query = normalize(hospitalSearch.value.trim());
  const condition = conditionFilter.value;
  const facilityType = facilityFilter.value;
  const base = getRegionBase();

  return source
    .filter((hospital) => {
      const nameMatch = !query || normalize(hospital.name).includes(query);
      const conditionMatch = matchesCondition(hospital, condition) && serviceMatchesCondition(hospital.tags, hospital.name, condition);
      const facilityMatch = matchesFacilityType(hospital, facilityType);
      return nameMatch && conditionMatch && facilityMatch;
    })
    .map((hospital) => ({
      ...hospital,
      distance: haversineKm(base, hospital.latlng),
      score: hospital.source === 'overpass' ? facilityScore(hospital) : scoreHospital(hospital),
    }))
    .sort((a, b) => a.distance - b.distance || b.score - a.score);
}

function buildFacilitySource() {
  return facilityCache.length ? facilityCache : [...seedFacilities, ...soloHospitals];
}

function renderHospitalMarkers() {
  hospitalMarkers.forEach((marker) => map.removeLayer(marker));
  hospitalMarkers = [];
  filteredHospitals(buildFacilitySource()).slice(0, 25).forEach((hospital) => {
    const marker = L.marker(hospital.latlng, { icon: createPin(getMarkerLabel(hospital), getMarkerClass(hospital)) }).addTo(map);
    marker.bindPopup(`
      <strong>${hospital.name}</strong><br/>
      ${getFacilityLabel(hospital)}<br/>
      ${kmText(hospital.distance)} dari titik acuan
    `);
    marker.on('click', () => openProfileModal(hospital));
    hospitalMarkers.push(marker);
  });
}

function renderHospitalList() {
  const items = filteredHospitals(buildFacilitySource());
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
        <span>${getFacilityLabel(hospital)} â€¢ ${hospital.source === 'overpass'
          ? [hospital.tags?.amenity, hospital.tags?.healthcare].filter(Boolean).join(' â€¢ ')
          : (hospital.tags?.services || ['umum']).join(' â€¢ ')}</span>
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
      openProfileModal(hospital);
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
        setStatus(`Menuju ${hospitalName} â€¢ ${km} km â€¢ ${min} menit`);
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
  const source = buildFacilitySource();
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
  setStatus(`Lokasi Anda â€¢ akurasi Â±${Math.round(accuracy)} m`);
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

  ambulanceMarker = L.marker(fallbackCenter, { icon: createPin('ðŸš‘', 'map-pin-ambulance') }).addTo(map);
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
profileCloseBtn.addEventListener('click', (event) => { event.preventDefault(); event.stopPropagation(); closeProfileModal(); });
profileModal.addEventListener('click', (e) => { if (e.target === profileModal) closeProfileModal(); });

hospitalSearch.addEventListener('input', () => {
  renderHospitalList();
  renderHospitalMarkers();
});

conditionFilter.addEventListener('change', () => {
  renderHospitalList();
  if (lastPosition) refreshFacilities(lastPosition);
});

facilityFilter.addEventListener('change', () => {
  renderHospitalList();
  renderHospitalMarkers();
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






