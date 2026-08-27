const etaValue = document.getElementById('etaValue');
const confidenceValue = document.getElementById('confidenceValue');
const priorityValue = document.getElementById('priorityValue');
const roadStatus = document.getElementById('roadStatus');
const incidentCount = document.getElementById('incidentCount');
const ambulanceNode = document.getElementById('ambulanceNode');
const etaMini = document.getElementById('etaMini');
const rerouteBtn = document.getElementById('rerouteBtn');
const alertBtn = document.getElementById('alertBtn');
const routePath = document.getElementById('routePath');
const altRoutePath = document.getElementById('altRoutePath');

const routes = [
  {
    eta: '08 min 42 sec',
    confidence: '96%',
    status: '3 blocked intersections cleared',
    altOpacity: 0.25,
    routeDash: '12 18',
    position: { left: '11%', top: '79%' },
  },
  {
    eta: '06 min 18 sec',
    confidence: '98%',
    status: 'Green corridor extended to the trauma center',
    altOpacity: 0.16,
    routeDash: '10 14',
    position: { left: '21%', top: '69%' },
  },
  {
    eta: '05 min 54 sec',
    confidence: '99%',
    status: 'Signal priorities updated for crossing junctions',
    altOpacity: 0.10,
    routeDash: '8 12',
    position: { left: '32%', top: '58%' },
  },
];

let index = 0;

function applyRoute(next = false) {
  if (next) index = (index + 1) % routes.length;
  const state = routes[index];
  etaValue.textContent = state.eta;
  etaMini.textContent = state.eta;
  confidenceValue.textContent = state.confidence;
  roadStatus.textContent = state.status;
  priorityValue.textContent = index === 0 ? 'Active' : 'Optimized';
  ambulanceNode.style.left = state.position.left;
  ambulanceNode.style.top = state.position.top;
  routePath.style.strokeDasharray = state.routeDash;
  altRoutePath.style.opacity = state.altOpacity;
  incidentCount.textContent = `${4 - index} active`;
}

rerouteBtn.addEventListener('click', () => applyRoute(true));
alertBtn.addEventListener('click', () => {
  priorityValue.textContent = 'Emergency';
  roadStatus.textContent = 'Traffic light override broadcast to intersections';
  routePath.style.stroke = 'rgba(79, 227, 185, 1)';
  setTimeout(() => applyRoute(false), 1200);
});

applyRoute(false);
