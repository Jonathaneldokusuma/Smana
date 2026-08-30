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
const profileTypeChip = document.getElementById('profileTypeChip');
const profileDistance = document.getElementById('profileDistance');
const profileServices = document.getElementById('profileServices');
const profileServicesChip = document.getElementById('profileServicesChip');
const profileAddress = document.getElementById('profileAddress');
const profilePriority = document.getElementById('profilePriority');
const profileAction = document.getElementById('profileAction');
const hospitalSearch = document.getElementById('hospitalSearch');
const conditionFilter = document.getElementById('conditionFilter');
const facilityFilter = document.getElementById('facilityFilter');
const regionFilter = document.getElementById('regionFilter');
const hospitalList = document.getElementById('hospitalList');
const filterSummary = document.getElementById('filterSummary');
const locationHint = document.getElementById('locationHint');
const locationRetryBtn = document.getElementById('locationRetryBtn');

const overpassEndpoint = 'https://overpass-api.de/api/interpreter';
const regionSuggestions = {
  seluruh: { label: 'Seluruh Indonesia', latlng: [-2.5, 118.0] },
  jakarta: { label: 'Jakarta', latlng: [-6.2088, 106.8456] },
  aceh: { label: 'Aceh', latlng: [5.5483, 95.3238] },
  sumut: { label: 'Sumatera Utara', latlng: [3.5952, 98.6722] },
  sumbar: { label: 'Sumatera Barat', latlng: [-0.9471, 100.4172] },
  riau: { label: 'Riau', latlng: [0.5071, 101.4478] },
  jambi: { label: 'Jambi', latlng: [-1.6101, 103.6131] },
  sumsel: { label: 'Sumatera Selatan', latlng: [-2.9909, 104.7567] },
  bengkulu: { label: 'Bengkulu', latlng: [-3.7928, 102.2608] },
  lampung: { label: 'Lampung', latlng: [-5.4291, 105.2625] },
  babel: { label: 'Bangka Belitung', latlng: [-2.1292, 106.1137] },
  kepri: { label: 'Kepulauan Riau', latlng: [1.1301, 104.0532] },
  banten: { label: 'Banten', latlng: [-6.1202, 106.1503] },
  dki: { label: 'DKI Jakarta', latlng: [-6.2088, 106.8456] },
  jabar: { label: 'Jawa Barat', latlng: [-6.9147, 107.6098] },
  jateng: { label: 'Jawa Tengah', latlng: [-6.9667, 110.4167] },
  diy: { label: 'DI Yogyakarta', latlng: [-7.7956, 110.3695] },
  jatim: { label: 'Jawa Timur', latlng: [-7.2575, 112.7521] },
  bandung: { label: 'Bandung', latlng: [-6.9175, 107.6191] },
  bali: { label: 'Bali', latlng: [-8.6705, 115.2126] },
  ntb: { label: 'Nusa Tenggara Barat', latlng: [-8.5833, 116.1167] },
  ntt: { label: 'Nusa Tenggara Timur', latlng: [-10.1772, 123.6070] },
  kalbar: { label: 'Kalimantan Barat', latlng: [-0.0263, 109.3425] },
  kalteng: { label: 'Kalimantan Tengah', latlng: [-2.2096, 113.9213] },
  kalsel: { label: 'Kalimantan Selatan', latlng: [-3.3194, 114.5906] },
  kaltim: { label: 'Kalimantan Timur', latlng: [-0.5022, 117.1537] },
  kalut: { label: 'Kalimantan Utara', latlng: [2.8426, 117.3763] },
  sulut: { label: 'Sulawesi Utara', latlng: [1.4748, 124.8421] },
  sulteng: { label: 'Sulawesi Tengah', latlng: [-0.8917, 119.8707] },
  sulsel: { label: 'Sulawesi Selatan', latlng: [-5.1477, 119.4327] },
  sultra: { label: 'Sulawesi Tenggara', latlng: [-3.9778, 122.5151] },
  sulbar: { label: 'Sulawesi Barat', latlng: [-2.8446, 119.2321] },
  gorontalo: { label: 'Gorontalo', latlng: [0.5412, 123.0595] },
  maluku: { label: 'Maluku', latlng: [-3.6554, 128.1903] },
  malut: { label: 'Maluku Utara', latlng: [0.7830, 127.3664] },
  papua_barat: { label: 'Papua Barat', latlng: [-0.8762, 131.2558] },
  papua: { label: 'Papua', latlng: [-2.5916, 140.6689] },
  semarang: { label: 'Semarang', latlng: [-6.9667, 110.4167] },
  surabaya: { label: 'Surabaya', latlng: [-7.2575, 112.7521] },
  yogyakarta: { label: 'Yogyakarta', latlng: [-7.7956, 110.3695] },
  solo: { label: 'Surakarta / Solo', latlng: [-7.5666, 110.8167] },
  medan: { label: 'Medan', latlng: [3.5952, 98.6722] },
  makassar: { label: 'Makassar', latlng: [-5.1477, 119.4327] },
  padang: { label: 'Padang', latlng: [-0.9471, 100.4172] },
  pontianak: { label: 'Pontianak', latlng: [-0.0263, 109.3425] },
  palangkaraya: { label: 'Palangka Raya', latlng: [-2.2096, 113.9213] },
  banjarmasin: { label: 'Banjarmasin', latlng: [-3.3194, 114.5906] },
  samarinda: { label: 'Samarinda', latlng: [-0.5022, 117.1537] },
  manado: { label: 'Manado', latlng: [1.4748, 124.8421] },
  kupang: { label: 'Kupang', latlng: [-10.1772, 123.6070] },
  ambon: { label: 'Ambon', latlng: [-3.6554, 128.1903] },
  jayapura: { label: 'Jayapura', latlng: [-2.5916, 140.6689] },
  denpasar: { label: 'Denpasar', latlng: [-8.6705, 115.2126] },
};

const provinceLabels = [
  ['aceh', 'Aceh'],
  ['sumut', 'Sumatera Utara'],
  ['sumbar', 'Sumatera Barat'],
  ['riau', 'Riau'],
  ['jambi', 'Jambi'],
  ['sumsel', 'Sumatera Selatan'],
  ['bengkulu', 'Bengkulu'],
  ['lampung', 'Lampung'],
  ['babel', 'Bangka Belitung'],
  ['kepri', 'Kepulauan Riau'],
  ['banten', 'Banten'],
  ['dki', 'DKI Jakarta'],
  ['jabar', 'Jawa Barat'],
  ['jateng', 'Jawa Tengah'],
  ['diy', 'DI Yogyakarta'],
  ['jatim', 'Jawa Timur'],
  ['bali', 'Bali'],
  ['ntb', 'Nusa Tenggara Barat'],
  ['ntt', 'Nusa Tenggara Timur'],
  ['kalbar', 'Kalimantan Barat'],
  ['kalteng', 'Kalimantan Tengah'],
  ['kalsel', 'Kalimantan Selatan'],
  ['kaltim', 'Kalimantan Timur'],
  ['kalut', 'Kalimantan Utara'],
  ['sulut', 'Sulawesi Utara'],
  ['sulteng', 'Sulawesi Tengah'],
  ['sulsel', 'Sulawesi Selatan'],
  ['sultra', 'Sulawesi Tenggara'],
  ['sulbar', 'Sulawesi Barat'],
  ['gorontalo', 'Gorontalo'],
  ['maluku', 'Maluku'],
  ['malut', 'Maluku Utara'],
  ['papua_barat', 'Papua Barat'],
  ['papua', 'Papua'],
];

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
  { name: 'RSUD Cut Meutia', latlng: [5.1798, 97.1460], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Lhokseumawe', region: 'aceh' },
  { name: 'RSUD Arifin Achmad', latlng: [0.5148, 101.4534], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'anak'] }, city: 'Pekanbaru', region: 'riau' },
  { name: 'RSUD Jambi', latlng: [-1.6099, 103.6077], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Jambi', region: 'jambi' },
  { name: 'RSUD Mohammad Hoesin', latlng: [-2.9755, 104.7599], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'jantung'] }, city: 'Palembang', region: 'sumsel' },
  { name: 'RSUD Abdul Moeloek', latlng: [-5.3806, 105.2642], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'ibu'] }, city: 'Bandar Lampung', region: 'lampung' },
  { name: 'RSUD Dr. Slamet Garut', latlng: [-7.2197, 107.8921], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Garut', region: 'jabar' },
  { name: 'RSUD Mangusada', latlng: [-8.6178, 115.1696], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Badung', region: 'bali' },
  { name: 'Puskesmas Banda Aceh', latlng: [5.5485, 95.3238], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'ibu'] }, city: 'Banda Aceh', region: 'aceh' },
  { name: 'Puskesmas Pekanbaru Kota', latlng: [0.5153, 101.4472], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum'] }, city: 'Pekanbaru', region: 'riau' },
  { name: 'Puskesmas Sekip', latlng: [-2.9774, 104.7580], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'anak'] }, city: 'Palembang', region: 'sumsel' },
  { name: 'Puskesmas Kupang', latlng: [-10.1767, 123.6090], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'ibu'] }, city: 'Kupang', region: 'ntt' },
  { name: 'RSUD Chasan Boesoirie', latlng: [0.7929, 127.3779], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Ternate', region: 'malut' },
  { name: 'RSUD Sele Be Solu', latlng: [-0.8756, 131.2593], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Sorong', region: 'papua_barat' },
  { name: 'RSUD Jayapura', latlng: [-2.5331, 140.7180], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'anak'] }, city: 'Jayapura', region: 'papua' },
  { name: 'Puskesmas Ternate Selatan', latlng: [0.7851, 127.3681], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum'] }, city: 'Ternate', region: 'malut' },
  { name: 'Puskesmas Sorong Utara', latlng: [-0.8774, 131.2550], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'anak'] }, city: 'Sorong', region: 'papua_barat' },
  { name: 'Puskesmas Abepura', latlng: [-2.6288, 140.6502], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'ibu', 'anak'] }, city: 'Jayapura', region: 'papua' },
  { name: 'RSUD Oesao', latlng: [-10.1931, 123.7062], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Kupang', region: 'ntt' },
  { name: 'RSUD Al Ihsan', latlng: [-6.9862, 107.5610], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'ibu'] }, city: 'Bandung', region: 'jabar' },
  { name: 'RSUD dr. Saiful Anwar', latlng: [-7.9808, 112.6276], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'anak'] }, city: 'Malang', region: 'jatim' },
  { name: 'RSUD Provinsi Nusa Tenggara Barat', latlng: [-8.5865, 116.1016], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Mataram', region: 'ntb' },
  { name: 'RSUD Provinsi Sulawesi Barat', latlng: [-2.6846, 118.8870], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Mamuju', region: 'sulbar' },
  { name: 'Puskesmas Malang Kota', latlng: [-7.9839, 112.6265], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'anak'] }, city: 'Malang', region: 'jatim' },
  { name: 'Puskesmas Mataram', latlng: [-8.5831, 116.1041], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum'] }, city: 'Mataram', region: 'ntb' },
  { name: 'Puskesmas Mamuju', latlng: [-2.6855, 118.8882], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'ibu'] }, city: 'Mamuju', region: 'sulbar' },
  { name: 'RSUD Tarakan', latlng: [3.3000, 117.6333], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Tarakan', region: 'kalut' },
  { name: 'Puskesmas Tarakan Tengah', latlng: [3.3062, 117.6370], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum'] }, city: 'Tarakan', region: 'kalut' },
  { name: 'RSUD dr. Soemarno Sosroatmodjo', latlng: [-0.0276, 109.3355], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Pontianak', region: 'kalbar' },
  { name: 'Puskesmas Pontianak Selatan', latlng: [-0.0395, 109.3380], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'anak'] }, city: 'Pontianak', region: 'kalbar' },
  { name: 'RSUD Doris Sylvanus', latlng: [-2.2062, 113.9220], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Palangka Raya', region: 'kalteng' },
  { name: 'Puskesmas Jekan Raya', latlng: [-2.2086, 113.9396], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum'] }, city: 'Palangka Raya', region: 'kalteng' },
  { name: 'RSUD Ulin', latlng: [-3.3156, 114.5895], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'trauma'] }, city: 'Banjarmasin', region: 'kalsel' },
  { name: 'Puskesmas Banjarmasin Selatan', latlng: [-3.3234, 114.5897], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'ibu'] }, city: 'Banjarmasin', region: 'kalsel' },
  { name: 'RSUD Abdul Wahab Sjahranie', latlng: [-0.4849, 117.1469], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Samarinda', region: 'kaltim' },
  { name: 'Puskesmas Sungai Kunjang', latlng: [-0.4734, 117.1513], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum'] }, city: 'Samarinda', region: 'kaltim' },
  { name: 'RSUD Awal Bros Batam', latlng: [1.1140, 104.0400], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'jantung'] }, city: 'Batam', region: 'kepri' },
  { name: 'Puskesmas Nongsa', latlng: [1.1710, 104.1146], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'anak'] }, city: 'Batam', region: 'kepri' },
  { name: 'RSUD dr. Ben Mboi', latlng: [-10.1661, 123.5922], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Kupang', region: 'ntt' },
  { name: 'RSUD Provinsi Nusa Tenggara Timur', latlng: [-10.1718, 123.6074], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'ibu'] }, city: 'Kupang', region: 'ntt' },
  { name: 'Puskesmas Oebobo', latlng: [-10.1665, 123.6195], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'ibu'] }, city: 'Kupang', region: 'ntt' },
  { name: 'RSUD Provinsi Nusa Tenggara Barat', latlng: [-8.5831, 116.1060], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Mataram', region: 'ntb' },
  { name: 'Puskesmas Cakranegara', latlng: [-8.5897, 116.1116], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum'] }, city: 'Mataram', region: 'ntb' },
  { name: 'RSUD Provinsi Sulawesi Utara', latlng: [1.4850, 124.8445], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Manado', region: 'sulut' },
  { name: 'Puskesmas Malalayang', latlng: [1.4492, 124.8244], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'anak'] }, city: 'Manado', region: 'sulut' },
  { name: 'RSUD Sulawesi Barat', latlng: [-2.6767, 118.8892], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Mamuju', region: 'sulbar' },
  { name: 'Puskesmas Mamuju Tengah', latlng: [-2.6805, 118.8928], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum'] }, city: 'Mamuju', region: 'sulbar' },
  { name: 'RSUD M. Th. Djaman', latlng: [-0.9027, 119.8694], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Palu', region: 'sulteng' },
  { name: 'Puskesmas Palu Timur', latlng: [-0.9092, 119.8633], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'anak'] }, city: 'Palu', region: 'sulteng' },
  { name: 'RSUD Papua Barat', latlng: [-0.8628, 134.0611], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Manokwari', region: 'papua_barat' },
  { name: 'Puskesmas Manokwari Timur', latlng: [-0.8591, 134.0689], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'anak'] }, city: 'Manokwari', region: 'papua_barat' },
  { name: 'RSUD Papua', latlng: [-2.5976, 140.6674], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum', 'anak'] }, city: 'Jayapura', region: 'papua' },
  { name: 'Puskesmas Heram', latlng: [-2.5476, 140.6978], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum', 'ibu'] }, city: 'Jayapura', region: 'papua' },
  { name: 'RSUD Maluku', latlng: [-3.6860, 128.1802], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Ambon', region: 'maluku' },
  { name: 'Puskesmas Nusaniwe', latlng: [-3.6652, 128.1718], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum'] }, city: 'Ambon', region: 'maluku' },
  { name: 'RSUD dr. R. Soetijono', latlng: [-7.5561, 110.8222], tags: { amenity: 'hospital', healthcare: 'hospital', emergency: 'yes', services: ['igd', 'umum'] }, city: 'Surakarta', region: 'jateng' },
  { name: 'Puskesmas Purwodiningratan', latlng: [-7.5668, 110.8372], tags: { amenity: 'clinic', healthcare: 'clinic', emergency: 'yes', services: ['umum'] }, city: 'Surakarta', region: 'jateng' },
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
let hasCenteredOnUser = false;
let hospitalMarkers = [];
let facilityCache = [];
let facilityCacheKey = '';

const fallbackCenter = [-7.5566, 110.8205];

function setStatus(text) { statusPill.textContent = text; }
function showError(text) { geoError.textContent = text; geoError.hidden = false; }
function hideError() { geoError.hidden = true; geoError.textContent = ''; }
function showLocationHint(message = 'Izinkan akses lokasi agar ambulans melacak posisi Anda secara otomatis.') {
  locationHint.querySelector('span').textContent = message;
  locationHint.hidden = false;
}
function hideLocationHint() { locationHint.hidden = true; }
function openCallModal() { callModal.hidden = false; }
function closeCallModal() { callModal.hidden = true; }
function openFilterModal() { filterModal.hidden = false; renderHospitalList(); }
function closeFilterModal() { filterModal.hidden = true; }
function openProfileModal(facility) {
  const typeLabel = getFacilityLabel(facility);
  const sourceLabel = facility.source === 'overpass' ? 'OpenStreetMap' : 'Seed nasional';
  const priorityLabel = regionFilter.value === 'seluruh'
    ? 'Diprioritaskan otomatis untuk nasional'
    : `Diprioritaskan untuk ${getConditionLabel(conditionFilter.value).toLowerCase()}`;
  profileName.textContent = facility.name;
  profileBadge.textContent = getMarkerLabel(facility);
  profileTypeLabel.textContent = `${typeLabel}${facility.source === 'overpass' ? ' • Data live' : ' • Profil demo'}`;
  profileTypeChip.textContent = typeLabel;
  profileDistance.textContent = `${kmText(facility.distance)} dari lokasi acuan`;
  profileServices.textContent = facility.source === 'overpass'
    ? [facility.tags?.amenity, facility.tags?.healthcare, facility.tags?.emergency === 'yes' ? 'IGD' : null].filter(Boolean).join(' • ') || 'Fasilitas medis'
    : (facility.tags?.services || ['umum']).join(' • ');
  profileServicesChip.textContent = facility.source === 'overpass'
    ? (facility.tags?.services?.join(' • ') || 'Layanan tersedia')
    : (facility.tags?.services || ['umum']).join(' • ');
  profileAddress.textContent = `${facility.city || regionSuggestions[facility.region]?.label || 'Lokasi terdeteksi dari peta'} • ${sourceLabel}`;
  profilePriority.textContent = priorityLabel;
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

function createPin(kind, className) {
  return L.divIcon({
    className: `map-pin ${className}`,
    html: getMarkerSvg(kind),
    iconSize: [46, 46],
    iconAnchor: [23, 23],
  });
}

function getMarkerSvg(kind) {
  const stroke = '#0b1220';
  const icons = {
    ambulance: `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="23" fill="url(#a1)" stroke="${stroke}" stroke-width="2"/>
        <path d="M21 28h18l4 6h4v8h-4a5 5 0 0 1-10 0H31a5 5 0 0 1-10 0h-2v-8h2z" fill="#dff6ff" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M28 22v7h-7v6h7v7h6v-7h7v-6h-7v-7z" fill="#ff4d4d"/>
        <circle cx="25" cy="41" r="3.4" fill="#0b1220"/>
        <circle cx="42" cy="41" r="3.4" fill="#0b1220"/>
        <defs><linearGradient id="a1" x1="18" y1="14" x2="46" y2="50"><stop stop-color="#eefcff"/><stop offset="1" stop-color="#b5ecff"/></linearGradient></defs>
      </svg>`,
    hospital: `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="23" fill="url(#a2)" stroke="${stroke}" stroke-width="2"/>
        <path d="M23 19h18a4 4 0 0 1 4 4v20H19V23a4 4 0 0 1 4-4z" fill="#fff1f2" stroke="${stroke}" stroke-width="1.5"/>
        <path d="M30 24h4v6h6v4h-6v6h-4v-6h-6v-4h6z" fill="#ff4d4d"/>
        <path d="M23 43h18" stroke="#e11d48" stroke-width="2" stroke-linecap="round"/>
        <defs><linearGradient id="a2" x1="18" y1="14" x2="46" y2="50"><stop stop-color="#ff9a9a"/><stop offset="1" stop-color="#ea4a4a"/></linearGradient></defs>
      </svg>`,
    puskesmas: `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="23" fill="url(#a3)" stroke="${stroke}" stroke-width="2"/>
        <path d="M19 33c5-1 8-7 13-7s8 6 13 7" fill="none" stroke="#eaffff" stroke-width="4" stroke-linecap="round"/>
        <path d="M22 36h20" stroke="#0e7490" stroke-width="4" stroke-linecap="round"/>
        <path d="M32 18v28" stroke="#eaffff" stroke-width="4" stroke-linecap="round"/>
        <defs><linearGradient id="a3" x1="18" y1="14" x2="46" y2="50"><stop stop-color="#8ff0ff"/><stop offset="1" stop-color="#30b7d7"/></linearGradient></defs>
      </svg>`,
    clinic: `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="23" fill="url(#a4)" stroke="${stroke}" stroke-width="2"/>
        <path d="M21 35c4-7 8-12 11-12s7 5 11 12" fill="none" stroke="#e9fff5" stroke-width="4" stroke-linecap="round"/>
        <path d="M24 38h16" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
        <path d="M32 24v14" stroke="#e9fff5" stroke-width="4" stroke-linecap="round"/>
        <defs><linearGradient id="a4" x1="18" y1="14" x2="46" y2="50"><stop stop-color="#aef7d6"/><stop offset="1" stop-color="#42d6a4"/></linearGradient></defs>
      </svg>`,
    doctor: `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="23" fill="url(#a5)" stroke="${stroke}" stroke-width="2"/>
        <path d="M25 21h14l2 5v6c0 5-4 9-9 9s-9-4-9-9v-6z" fill="#fff6df" stroke="${stroke}" stroke-width="1.5"/>
        <path d="M32 18v9" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
        <path d="M32 33c3 0 5 2 5 5s-2 6-5 6-5-3-5-6 2-5 5-5z" fill="#f59e0b"/>
        <defs><linearGradient id="a5" x1="18" y1="14" x2="46" y2="50"><stop stop-color="#ffd88a"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs>
      </svg>`,
    pharmacy: `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="23" fill="url(#a6)" stroke="${stroke}" stroke-width="2"/>
        <path d="M22 24h20v6H22z" fill="#f4f0ff" stroke="${stroke}" stroke-width="1.5"/>
        <path d="M24 30h16v16a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4z" fill="#ffffff" stroke="${stroke}" stroke-width="1.5"/>
        <path d="M32 36v8M28 40h8" stroke="#8b5cf6" stroke-width="4" stroke-linecap="round"/>
        <defs><linearGradient id="a6" x1="18" y1="14" x2="46" y2="50"><stop stop-color="#d8c5ff"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient></defs>
      </svg>`,
    midwife: `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="23" fill="url(#a7)" stroke="${stroke}" stroke-width="2"/>
        <path d="M22 28c4-6 16-6 20 0" fill="none" stroke="#fff1f7" stroke-width="4" stroke-linecap="round"/>
        <path d="M26 32h12M32 24v16" stroke="#ff5d8f" stroke-width="4" stroke-linecap="round"/>
        <defs><linearGradient id="a7" x1="18" y1="14" x2="46" y2="50"><stop stop-color="#ffd0e1"/><stop offset="1" stop-color="#ff7aa5"/></linearGradient></defs>
      </svg>`,
    dentist: `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="23" fill="url(#a8)" stroke="${stroke}" stroke-width="2"/>
        <path d="M24 22h16l2 5v7c0 4-2 10-6 10-2 0-3-2-4-5-1 3-2 5-4 5-4 0-6-6-6-10v-7z" fill="#fff8db" stroke="${stroke}" stroke-width="1.5"/>
        <path d="M28 33h8M32 29v8" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
        <defs><linearGradient id="a8" x1="18" y1="14" x2="46" y2="50"><stop stop-color="#ffe7a0"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs>
      </svg>`,
    post: `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="23" fill="url(#a9)" stroke="${stroke}" stroke-width="2"/>
        <path d="M22 22h20v20H22z" fill="#eef2ff" stroke="${stroke}" stroke-width="1.5"/>
        <path d="M28 32h8M32 28v8" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
        <defs><linearGradient id="a9" x1="18" y1="14" x2="46" y2="50"><stop stop-color="#d8e0ea"/><stop offset="1" stop-color="#94a3b8"/></linearGradient></defs>
      </svg>`,
    default: `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="23" fill="url(#a10)" stroke="${stroke}" stroke-width="2"/>
        <path d="M20 32h24" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
        <defs><linearGradient id="a10" x1="18" y1="14" x2="46" y2="50"><stop stop-color="#eef2f7"/><stop offset="1" stop-color="#c7d0dd"/></linearGradient></defs>
      </svg>`,
  };
  return icons[kind] || icons.default;
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
  if (value === 'seluruh') return lastPosition || [-2.5, 118.0];
  return regionSuggestions[value]?.latlng || (lastPosition || fallbackCenter);
}

function getRegionLabel() {
  if (regionFilter.value === 'seluruh') return 'seluruh Indonesia';
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
  if (type === 'RS') return 'hospital';
  if (type === 'Puskesmas/Klinik') return normalize(facility.name).includes('puskesmas') ? 'puskesmas' : 'clinic';
  if (type === 'Dokter') return 'doctor';
  if (type === 'Apotek') return 'pharmacy';
  if (type === 'Bidan') return 'midwife';
  if (type === 'Dokter Gigi') return 'dentist';
  if (type === 'Pos Kesehatan') return 'post';
  return 'default';
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
  return parts.join(' • ');
}

function scoreHospital(hospital) {
  const name = normalize(hospital.name);
  const keywords = hospitalKeywords[activeCase] || hospitalKeywords.igd;
  let score = 0;
  for (const keyword of keywords) if (name.includes(keyword)) score += 3;
  if (name.includes('igd')) score += 2;
  if (name.includes('rsud')) score += 2;
  if (hospital.tags?.emergency === 'yes') score += 2;
  if (hospital.tags?.services?.includes(activeCase)) score += 5;
  if (hospital.tags?.services?.includes('igd')) score += 2;
  if (hospital.source === 'overpass') score += 1;
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
  if (tags.emergency === 'yes') score += 3;
  if (tags.healthcare === 'emergency') score += 2;
  if (tags.services?.includes(activeCase)) score += 4;
  if (tags.services?.includes('igd')) score += 2;
  if (facility.source === 'overpass') score += 2;
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

function priorityHospitalWeight(facility) {
  const label = getFacilityLabel(facility);
  if (label === 'Rumah Sakit') return 8;
  if (label === 'Puskesmas') return 7;
  if (label === 'Klinik') return 5;
  if (label === 'Dokter' || label === 'Dokter Gigi') return 2;
  if (label === 'Bidan') return 2;
  if (label === 'Apotek') return 1;
  return 0;
}

function regionPreferenceBoost(facility) {
  const selected = regionFilter.value;
  if (selected === 'auto' || selected === 'seluruh') return 0;
  if (facility.region === selected) return 12;
  if (facility.city && regionSuggestions[selected]?.label && normalize(facility.city).includes(normalize(regionSuggestions[selected].label))) return 8;
  return 0;
}

function nationalPriorityBoost(facility) {
  if (regionFilter.value !== 'seluruh') return 0;
  const label = getFacilityLabel(facility);
  const typeBonus = label === 'Rumah Sakit' ? 18 : label === 'Puskesmas' ? 14 : 0;
  const conditionBonus = serviceMatchesCondition(facility.tags, facility.name, activeCase) ? 8 : 0;
  const emergencyBonus = facility.tags?.emergency === 'yes' ? 4 : 0;
  return typeBonus + conditionBonus + emergencyBonus;
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
  const nationalMode = regionFilter.value === 'seluruh';

  return source
    .filter((hospital) => {
      const nameMatch = !query || normalize(hospital.name).includes(query);
      const conditionMatch = matchesCondition(hospital, condition) && serviceMatchesCondition(hospital.tags, hospital.name, condition);
      const facilityMatch = matchesFacilityType(hospital, facilityType);
      const nationalFacilityMatch = !nationalMode || ['hospital', 'puskesmas'].includes(facilityTypeKey(hospital));
      return nameMatch && conditionMatch && facilityMatch && nationalFacilityMatch;
    })
    .map((hospital) => ({
      ...hospital,
      distance: nationalMode && !lastPosition ? 0 : haversineKm(base, hospital.latlng),
      score: (hospital.source === 'overpass' ? facilityScore(hospital) : scoreHospital(hospital))
        + priorityHospitalWeight(hospital)
        + regionPreferenceBoost(hospital)
        + nationalPriorityBoost(hospital),
    }))
    .sort((a, b) => {
      const aCritical = getFacilityLabel(a) === 'Rumah Sakit' || getFacilityLabel(a) === 'Puskesmas';
      const bCritical = getFacilityLabel(b) === 'Rumah Sakit' || getFacilityLabel(b) === 'Puskesmas';
      if (aCritical !== bCritical) return bCritical - aCritical;
      return b.score - a.score || a.distance - b.distance;
    });
}

function buildFacilitySource() {
  return facilityCache.length ? facilityCache : [...seedFacilities, ...soloHospitals];
}

function renderHospitalMarkers() {
  hospitalMarkers.forEach((marker) => map.removeLayer(marker));
  hospitalMarkers = [];
  const items = filteredHospitals(buildFacilitySource());
  const nationalMode = regionFilter.value === 'seluruh';
  const quota = nationalMode
    ? { hospital: 8, puskesmas: 6, clinic: 4, pharmacy: 2, other: 2 }
    : { hospital: 8, puskesmas: 4, clinic: 5, pharmacy: 2, other: 3 };
  const picked = [];
  const used = new Set();
  const pushByType = (typeName, limit) => {
    items
      .filter((item) => getFacilityLabel(item).toLowerCase().includes(typeName))
      .slice(0, limit)
      .forEach((item) => {
        if (used.has(item.name + item.latlng.join(','))) return;
        used.add(item.name + item.latlng.join(','));
        picked.push(item);
      });
  };
  pushByType('rumah sakit', quota.hospital);
  pushByType('puskesmas', quota.puskesmas);
  pushByType('klinik', quota.clinic);
  pushByType('apotek', quota.pharmacy);
  items.slice(0, quota.other * 2).forEach((item) => {
    if (picked.length >= 25) return;
    const key = item.name + item.latlng.join(',');
    if (used.has(key)) return;
    used.add(key);
    picked.push(item);
  });

  picked.slice(0, 25).forEach((hospital) => {
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
        <span>${getFacilityLabel(hospital)} • ${hospital.source === 'overpass'
          ? [hospital.tags?.amenity, hospital.tags?.healthcare].filter(Boolean).join(' • ')
          : (hospital.tags?.services || ['umum']).join(' • ')}</span>
      </div>
      <div class="hospital-item-meta">
        <div class="facility-badge">${getFacilityLabel(hospital)}</div>
        <b>${kmText(hospital.distance)}</b>
        <small>${hospital.source === 'overpass' ? 'OpenStreetMap' : 'Seed nasional'}</small>
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
  const source = buildFacilitySource();
  const nationalMode = regionFilter.value === 'seluruh';
  const candidate = filteredHospitals(source)
    .filter((hospital) => serviceMatchesCondition(hospital.tags, hospital.name, activeCase))
    .filter((hospital) => {
      if (!nationalMode) return true;
      return ['Rumah Sakit', 'Puskesmas'].includes(getFacilityLabel(hospital));
    })
    .sort((a, b) => b.score - a.score || a.distance - b.distance)[0] || nearestHospital(fromLatLng);
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
  hideLocationHint();
  hideError();
  if (!hasCenteredOnUser) {
    hasCenteredOnUser = true;
    followUser = true;
    map.setView(next, Math.max(map.getZoom(), 15), { animate: true });
  } else if (followUser) {
    map.panTo(next, { animate: true, duration: 0.5 });
  }
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
  map = L.map('map', {
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: true,
    minZoom: 5,
    maxZoom: 19,
  }).setView(fallbackCenter, 15);

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

  ambulanceMarker = L.marker(fallbackCenter, { icon: createPin('ambulance', 'map-pin-ambulance') }).addTo(map);
  hospitalMarker = L.marker(soloHospitals[0].latlng, { icon: createPin('hospital', 'map-pin-hospital') }).addTo(map);
  userHalo = L.marker(fallbackCenter, {
    icon: L.divIcon({ className: 'current-ring', iconSize: [40, 40], iconAnchor: [20, 20] }),
    interactive: false,
  }).addTo(map);
  userDot = L.marker(fallbackCenter, {
    icon: L.divIcon({ className: 'current-dot', iconSize: [16, 16], iconAnchor: [8, 8] }),
    interactive: false,
  }).addTo(map);

  map.on('dragstart', () => { followUser = false; });
  map.on('zoomend', () => {
    if (regionFilter.value === 'seluruh' && map.getZoom() <= 5) {
      map.fitBounds(indonesiaBounds, { padding: [24, 24] });
    }
  });
  renderHospitalMarkers();
}

function startTracking() {
  if (!navigator.geolocation) {
    showError('Browser Anda tidak mendukung lokasi.');
    showLocationHint('Browser Anda tidak mendukung lokasi otomatis.');
    return;
  }
  showLocationHint('Meminta izin lokasi untuk memulai pelacakan otomatis...');
  navigator.geolocation.getCurrentPosition(
    setUserPosition,
    () => {
      showError('Izin lokasi belum aktif.');
      setStatus('Menunggu izin lokasi');
      showLocationHint('Aktifkan izin lokasi di browser agar posisi Anda bisa dilacak.');
    },
    { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
  );
  navigator.geolocation.watchPosition(
    setUserPosition,
    () => {
      showError('Izin lokasi belum aktif.');
      setStatus('Menunggu izin lokasi');
      showLocationHint('Aktifkan izin lokasi di browser agar posisi Anda bisa dilacak.');
    },
    { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 },
  );
}

centerBtn.addEventListener('click', () => {
  followUser = true;
  map.flyTo(lastPosition || fallbackCenter, Math.max(map.getZoom(), 15), { duration: 0.5 });
});

locBtn.addEventListener('click', () => navigator.geolocation?.getCurrentPosition(setUserPosition, () => showError('Akses lokasi ditolak.'), { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }));
locationRetryBtn.addEventListener('click', () => {
  hideError();
  showLocationHint('Membuka permintaan izin lokasi lagi...');
  navigator.geolocation?.getCurrentPosition(
    setUserPosition,
    () => {
      showError('Akses lokasi ditolak.');
      showLocationHint('Akses lokasi masih ditolak. Aktifkan dari ikon gembok/permission browser.');
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
  );
});

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

const indonesiaBounds = L.latLngBounds([[-11.5, 94.5], [6.7, 141.5]]);

zoomInBtn.addEventListener('click', () => map.zoomIn());
zoomOutBtn.addEventListener('click', () => {
  const currentZoom = map.getZoom();
  if (regionFilter.value === 'seluruh' || currentZoom <= 5) {
    map.fitBounds(indonesiaBounds, { padding: [24, 24] });
    return;
  }
  map.zoomOut();
});

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






