const etaValue = document.getElementById('etaValue');
const confidenceValue = document.getElementById('confidenceValue');
const priorityValue = document.getElementById('priorityValue');
const roadStatus = document.getElementById('roadStatus');
const incidentCount = document.getElementById('incidentCount');
const rerouteBtn = document.getElementById('rerouteBtn');
const alertBtn = document.getElementById('alertBtn');

const routes = [
  {
    eta: '08 menit 42 detik',
    confidence: '96%',
    status: 'Koridor utama aktif menuju RSUD Sentra Trauma',
    priority: 'Normal',
    traffic: '4 aktif',
  },
  {
    eta: '06 menit 18 detik',
    confidence: '98%',
    status: 'Koridor hijau tersambung ke area IGD',
    priority: 'Tinggi',
    traffic: '3 aktif',
  },
  {
    eta: '05 menit 54 detik',
    confidence: '99%',
    status: 'Prioritas lampu lalu lintas diperbarui di jalur utama',
    priority: 'Darurat',
    traffic: '2 aktif',
  },
];

const colors = {
  normal: '#4fe3b9',
  high: '#7dd3ff',
  emergency: '#91fad0',
  alt: '#94a3b8',
};

let index = 0;
let map;
let ambulanceMarker;
let hospitalMarker;
let incidentMarker;
let routeLine;
let altRouteLine;
let gpsPulse = 0;

function updateRouteView(next = false) {
  if (next) index = (index + 1) % routes.length;
  const state = routes[index];
  etaValue.textContent = state.eta;
  confidenceValue.textContent = state.confidence;
  roadStatus.textContent = state.status;
  priorityValue.textContent = state.priority;
  incidentCount.textContent = state.traffic;

  const routeColor = index === 0 ? colors.normal : index === 1 ? colors.high : colors.emergency;
  routeLine.setStyle({ color: routeColor, dashArray: index === 2 ? '10 14' : '12 18' });
  altRouteLine.setStyle({ opacity: index === 0 ? 0.18 : 0.12 });
}

function animateGps() {
  gpsPulse = (gpsPulse + 1) % 240;
  const size = 18 + Math.sin(gpsPulse / 14) * 4;
  const alpha = 0.34 + Math.sin(gpsPulse / 18) * 0.12;
  ambulanceMarker.getElement().style.boxShadow =
    `0 18px 40px rgba(0,0,0,0.35), 0 0 ${size}px rgba(79, 227, 185, ${alpha})`;
  routeLine.setStyle({ dashOffset: `${-(gpsPulse * 0.9)}` });
  requestAnimationFrame(animateGps);
}

function initializeMap() {
  const center = [-7.5566, 110.8205];
  const ambulance = [-7.5612, 110.8048];
  const hospital = [-7.5459, 110.8367];
  const incident = [-7.5538, 110.8156];

  map = L.map('map', {
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: false,
  }).setView(center, 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  const ambulanceIcon = L.divIcon({
    className: 'map-pin map-pin-ambulance',
    html: '<span>AMB</span>',
    iconSize: [54, 54],
    iconAnchor: [27, 27],
  });

  const hospitalIcon = L.divIcon({
    className: 'map-pin map-pin-hospital',
    html: '<span>IGD</span>',
    iconSize: [54, 54],
    iconAnchor: [27, 27],
  });

  const incidentIcon = L.divIcon({
    className: 'map-pin map-pin-incident',
    html: '<span>KAC</span>',
    iconSize: [54, 54],
    iconAnchor: [27, 27],
  });

  ambulanceMarker = L.marker(ambulance, { icon: ambulanceIcon }).addTo(map);
  hospitalMarker = L.marker(hospital, { icon: hospitalIcon }).addTo(map);
  incidentMarker = L.marker(incident, { icon: incidentIcon }).addTo(map);

  routeLine = L.polyline(
    [
      ambulance,
      [-7.5596, 110.8099],
      [-7.5571, 110.8165],
      [-7.5536, 110.8237],
      hospital,
    ],
    {
      color: colors.normal,
      weight: 6,
      opacity: 0.95,
      lineJoin: 'round',
      dashArray: '12 18',
    },
  ).addTo(map);

  altRouteLine = L.polyline(
    [
      ambulance,
      [-7.5623, 110.8106],
      [-7.5595, 110.8189],
      [-7.5552, 110.8286],
      hospital,
    ],
    {
      color: colors.alt,
      weight: 5,
      opacity: 0.16,
      lineJoin: 'round',
      dashArray: '8 14',
    },
  ).addTo(map);

  L.circleMarker(ambulance, {
    radius: 12,
    color: '#eff6ff',
    weight: 2,
    fillColor: '#c8f0ff',
    fillOpacity: 1,
  }).addTo(map);

  L.circleMarker(hospital, {
    radius: 12,
    color: '#04131a',
    weight: 2,
    fillColor: '#67e9c0',
    fillOpacity: 1,
  }).addTo(map);

  L.circleMarker(incident, {
    radius: 10,
    color: '#2f160a',
    weight: 2,
    fillColor: '#ff9e5f',
    fillOpacity: 1,
  }).addTo(map);
}

rerouteBtn.addEventListener('click', () => updateRouteView(true));
alertBtn.addEventListener('click', () => {
  priorityValue.textContent = 'Darurat';
  roadStatus.textContent = 'Perintah prioritas jalur darurat dikirim';
  routeLine.setStyle({ color: colors.emergency });
  setTimeout(() => updateRouteView(false), 1200);
});

initializeMap();
updateRouteView(false);
requestAnimationFrame(animateGps);
