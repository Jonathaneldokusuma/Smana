const centerBtn = document.getElementById('centerBtn');
const locBtn = document.getElementById('locBtn');
const statusPill = document.getElementById('statusPill');
const geoError = document.getElementById('geoError');

const colors = {
  route: '#4fe3b9',
  alt: '#94a3b8',
  current: '#59b7ff',
};

let map;
let ambulanceMarker;
let hospitalMarker;
let currentMarker;
let routeLine;
let altRouteLine;
let watchId = null;
let lastPosition = null;

const target = [-7.5459, 110.8367];
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

function createPin(label, className) {
  return L.divIcon({
    className: `map-pin ${className}`,
    html: `<span>${label}</span>`,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
}

function computeRoutePoints(fromLatLng) {
  const [lat, lng] = fromLatLng;
  const mid1 = [lat + 0.0035, lng + 0.0030];
  const mid2 = [lat + 0.0065, lng + 0.0090];
  const mid3 = [target[0] + 0.0020, target[1] - 0.0035];
  return [fromLatLng, mid1, mid2, mid3, target];
}

function updateRoute(fromLatLng) {
  const route = computeRoutePoints(fromLatLng);
  const altRoute = [
    fromLatLng,
    [fromLatLng[0] + 0.0020, fromLatLng[1] - 0.0020],
    [fromLatLng[0] + 0.0055, fromLatLng[1] + 0.0060],
    [target[0] + 0.0030, target[1] - 0.0045],
    target,
  ];

  routeLine.setLatLngs(route);
  altRouteLine.setLatLngs(altRoute);
  ambulanceMarker.setLatLng(fromLatLng);
  currentMarker.setLatLng(fromLatLng);
  map.panTo(fromLatLng, { animate: true, duration: 0.5 });
  setStatus('Lokasi terdeteksi');
  hideError();
}

function updateFromGeo(position) {
  const { latitude, longitude, accuracy } = position.coords;
  lastPosition = [latitude, longitude];
  updateRoute(lastPosition);
  setStatus(`Lokasi terdeteksi, akurasi ±${Math.round(accuracy)} m`);
}

function startTracking() {
  if (!navigator.geolocation) {
    showError('Browser Anda tidak mendukung pelacakan lokasi.');
    setStatus('Lokasi tidak tersedia');
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    updateFromGeo,
    () => {
      showError('Izin lokasi belum aktif. Izinkan akses lokasi untuk navigasi realtime.');
      setStatus('Menunggu izin lokasi');
      if (!lastPosition) {
        updateRoute(fallbackCenter);
      }
    },
    {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 10000,
    },
  );
}

function initializeMap() {
  map = L.map('map', {
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: false,
  }).setView(fallbackCenter, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  ambulanceMarker = L.marker(fallbackCenter, {
    icon: createPin('AMB', 'map-pin-ambulance'),
  }).addTo(map);

  hospitalMarker = L.marker(target, {
    icon: createPin('IGD', 'map-pin-hospital'),
  }).addTo(map);

  currentMarker = L.marker(fallbackCenter, {
    icon: L.divIcon({
      className: 'current-ring',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    }),
    interactive: false,
  }).addTo(map);

  routeLine = L.polyline([], {
    color: colors.route,
    weight: 6,
    opacity: 0.95,
    lineJoin: 'round',
    dashArray: '12 18',
  }).addTo(map);

  altRouteLine = L.polyline([], {
    color: colors.alt,
    weight: 5,
    opacity: 0.2,
    lineJoin: 'round',
    dashArray: '8 14',
  }).addTo(map);

  L.circleMarker(target, {
    radius: 11,
    color: '#04131a',
    weight: 2,
    fillColor: '#67e9c0',
    fillOpacity: 1,
  }).addTo(map);

  map.on('locationfound', updateFromGeo);
  map.on('locationerror', () => {
    showError('Lokasi tidak dapat dibaca. Coba aktifkan GPS atau gunakan jaringan yang lebih stabil.');
    setStatus('Lokasi tidak aktif');
  });
}

centerBtn.addEventListener('click', () => {
  if (lastPosition) {
    map.flyTo(lastPosition, Math.max(map.getZoom(), 15), { duration: 0.5 });
  } else {
    map.flyTo(fallbackCenter, 15, { duration: 0.5 });
  }
});

locBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    showError('Browser Anda tidak mendukung pelacakan lokasi.');
    return;
  }
  setStatus('Meminta lokasi...');
  navigator.geolocation.getCurrentPosition(
    updateFromGeo,
    () => {
      showError('Akses lokasi ditolak. Aktifkan izin lokasi di browser.');
      setStatus('Izin lokasi diperlukan');
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
  );
});

initializeMap();
startTracking();
setStatus('Menunggu lokasi Anda');
