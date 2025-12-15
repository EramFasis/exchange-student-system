/*
  Universities array with all campus data
  Each university includes: id, name, location, region, coordinates, logo, programs, tags, and featured status
*/
const universities = [
  { id: 'squ', name: "Sultan Qaboos University", short: "Oman - SQU", region:'arab', coords:[23.5859,58.4059],
    logo: "pictures/squ.png",
    programs: ["Engineering Exchange","Science Research","Business & Economics","Education & Humanities"],
    tags: ["engineering","science","business"], featured:true
  },
  { id:'ksu', name:"King Saud University", short:"Saudi Arabia - KSU", region:'arab', coords:[24.7245,46.6310],
    logo: "pictures/ksu.png",
    programs: ["Engineering Exchange","Computer Science Mobility","Health Sciences"], tags:["engineering","cs","medicine"]
  },
  { id:'uaeu', name:"United Arab Emirates University", short:"UAE - UAEU", region:'arab', coords:[24.2075,55.7440],
    logo: "pictures/uaeu.png",
    programs: ["Gulf Student Exchange","Science & Engineering","Business Admin"], tags:["engineering","business"]
  },
  { id:'auc', name:"American University in Cairo", short:"Egypt - AUC", region:'arab', coords:[30.0290,31.2610],
    logo: "pictures/auc.png",
    programs: ["Middle East Studies","Global Affairs","Architecture"], tags:["arts","business"], featured:true
  },
  { id:'amsterdam', name:"University of Amsterdam", short:"Netherlands - UvA", region:'europe', coords:[52.3557,4.9555],
    logo: "pictures/amsterdam.png",
    programs: ["European Studies","Psychology","Business"], tags:["arts","business"]
  },
  { id:'bologna', name:"University of Bologna", short:"Italy - Unibo", region:'europe', coords:[44.4949,11.3426],
    logo: "pictures/bologna.png",
    programs: ["Erasmus+ Exchange","Cultural Heritage","Engineering"], tags:["arts","engineering"]
  },
  { id:'uct', name:"University of Cape Town", short:"South Africa - UCT", region:'africa', coords:[-33.9570,18.4600],
    logo: "pictures/uct.png",
    programs: ["African Studies","Engineering","Business"], tags:["engineering","business"], featured:true
  },
  { id:'nairobi', name:"University of Nairobi", short:"Kenya - UoN", region:'africa', coords:[-1.2797,36.8172],
    logo: "pictures/nairobi.png",
    programs: ["Agriculture & Environmental","Public Health","Business"], tags:["env","medicine"]
  },
  { id:'harvard', name:"Harvard University", short:"USA - Harvard", region:'america', coords:[42.3770,-71.1167],
    logo: "pictures/harvard.png",
    programs: ["Global Study Program","Business School Exchange","Engineering Mobility"], tags:["business","engineering"]
  },
  { id:'utoronto', name:"University of Toronto", short:"Canada - UofT", region:'america', coords:[43.6629,-79.3957],
    logo: "pictures/toronto.png",
    programs: ["International Scholar Exchange","Computer Science Mobility","Humanities"], tags:["cs","arts"]
  },
  { id:'tokyo', name:"University of Tokyo", short:"Japan - UTokyo", region:'asia', coords:[35.7126,139.7610],
    logo: "pictures/tokyo.png",
    programs: ["STEM Research","AI & Robotics","Japan Global Exchange"], tags:["cs","engineering"]
  },
  { id:'sydney', name:"University of Sydney", short:"Australia - USyd", region:'australia', coords:[-33.8898,151.1876],
    logo: "pictures/sydney.png",
    programs: ["Environmental Science","Law & Policy","Study Abroad"], tags:["env","arts"]
  }
];

// Initialize Leaflet map
const map = L.map('map', { zoomControl:true }).setView([20,0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Layer group for storing markers
const markerLayer = L.layerGroup().addTo(map);

// Array to keep references to created markers and circles
const created = [];

/*
  Create a custom icon for university markers with logo or initials
*/
function createIcon(uni) {
  const initials = uni.name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase();
  const logoImg = uni.logo ? `<img src="${uni.logo}" alt="${uni.name}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` : `<span class="uni-initials">${initials}</span>`;
  const html = `
    <div class="marker-wrap" title="${uni.name}">
      <div class="pulse-marker"></div>
      <div class="uni-logo-marker">
        ${logoImg}
      </div>
    </div>
  `;
  return L.divIcon({
    html,
    className: 'custom-div-icon',
    iconSize: [40,40],
    iconAnchor: [20,20],
    popupAnchor: [0,-20]
  });
}

/*
  Add markers to the map for a list of universities
*/
function addMarkers(list) {
  markerLayer.clearLayers();
  created.length = 0;
  list.forEach(u => {
    const icon = createIcon(u);
    const marker = L.marker(u.coords, { icon }).addTo(markerLayer);

    // Create popup with university info
    const popup = `
      <div style="min-width:210px;">
        <h3 style="margin:0 0 6px 0;color:var(--accent-color)"> ${u.name} </h3>
        <div style="color:#cbdcdc;font-size:14px;">${u.short}</div>
        <div style="margin-top:8px;"><strong>Programs:</strong>
          <ul style="margin:6px 0 0 16px;color:#d7e7ea">
            ${u.programs.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
        <div style="margin-top:8px;text-align:right"><button onclick="focusCard('${u.id}')" class="continent-btn" style="padding:6px 10px">View Card</button></div>
      </div>
    `;
    marker.bindPopup(popup, { maxWidth: 320 });

    // Add pulsing circle background for marker
    const circle = L.circleMarker(u.coords, { radius: 10, className:'pulse-marker', interactive:false }).addTo(markerLayer);

    // Save references
    created.push({ uni:u, marker, circle });

    // Open popup when marker is clicked
    marker.on('click', () => {
      highlightCard(u.id);
    });
  });
}

// Initialize map with all universities
addMarkers(universities);

// Fit map bounds to show all universities
const coords = universities.map(u=>u.coords);
if (coords.length) {
  map.fitBounds(L.latLngBounds(coords).pad(0.25));
}

/*
  DOM elements for cards and featured section
*/
const cardsGrid = document.getElementById('cardsGrid');
const featuredStrip = document.getElementById('featuredStrip');

/*
  Create a card element for a university
*/
function makeCard(uni) {
  const el = document.createElement('div');
  el.className = 'card';
  el.id = 'card-' + uni.id;
  el.innerHTML = `
    <img class="logo" src="${uni.logo || 'images/placeholder.png'}" alt="${uni.name} logo" />
    <div>
      <h4>${uni.name}</h4>
      <p>${uni.short}</p>
      <div class="meta">${uni.programs.slice(0,2).join(' · ')}${uni.programs.length>2? ' · more':''}</div>
    </div>
  `;
  // When card is clicked, move map and open popup
  el.addEventListener('click', ()=> {
    map.setView(uni.coords, 6, { animate:true });
    const found = created.find(c => c.uni.id === uni.id);
    if (found) found.marker.openPopup();
    highlightCard(uni.id);
  });
  return el;
}

/*
  Populate the cards grid with university cards
*/
function populateCards(list) {
  cardsGrid.innerHTML = '';
  list.forEach(u => cardsGrid.appendChild(makeCard(u)));
}

/*
  Populate the featured section with featured universities
*/
function populateFeatured(list) {
  featuredStrip.innerHTML = '';
  list.filter(u=>u.featured).forEach(u=>{
    const f = document.createElement('div');
    f.className = 'feat';
    f.innerHTML = `<strong style="color:var(--accent-color)">${u.name}</strong><div style="color:#cbdcdc;margin-top:6px">${u.short}</div>`;
    featuredStrip.appendChild(f);
  });
}

// Initialize cards and featured section
populateCards(universities);
populateFeatured(universities);

/*
  Highlight a card by its ID and scroll it into view
*/
function highlightCard(id) {
  // Remove highlight from all cards
  document.querySelectorAll('.card').forEach(c=>c.classList.remove('highlight'));
  const card = document.getElementById('card-'+id);
  if (card) {
    card.classList.add('highlight');
    card.scrollIntoView({ behavior:'smooth', block:'center' });
  }

  // Also highlight the corresponding marker
  created.forEach(c=>{
    const el = c.marker.getElement();
    if (!el) return;
    if (c.uni.id === id) {
      el.classList.add('marker-highlight');
    } else {
      el.classList.remove('marker-highlight');
    }
  });
}

/*
  Focus and open card popup from marker popup button
*/
function focusCard(id) {
  const card = document.getElementById('card-'+id);
  if (card) {
    card.click();
  }
}
window.focusCard = focusCard;

/*
  Search and filter functionality
*/
const searchBox = document.getElementById('searchBox');
const regionFilter = document.getElementById('regionFilter');
const programFilter = document.getElementById('programFilter');

/*
  Check if university matches the selected program filter
*/
function matchesProgram(uni, programKey) {
  if (!programKey || programKey === 'all') return true;
  return uni.tags && uni.tags.includes(programKey);
}

/*
  Check if university matches the selected region filter
*/
function matchesRegion(uni, regionKey) {
  if (!regionKey || regionKey === 'all') return true;
  return uni.region === regionKey;
}

/*
  Filter universities based on search, region, and program selections
*/
function filterAndRender() {
  const q = searchBox.value.trim().toLowerCase();
  const region = regionFilter.value;
  const program = programFilter.value;

  // Apply all filters
  let filtered = universities.filter(u=>{
    const textMatch = q === '' || (u.name + ' ' + u.programs.join(' ')).toLowerCase().includes(q);
    return textMatch && matchesRegion(u, region) && matchesProgram(u, program);
  });

  // Update cards, featured section, and markers
  populateCards(filtered);
  populateFeatured(filtered);
  addMarkers(filtered);

  // Adjust map view based on filtered results
  if (filtered.length) {
    const b = L.latLngBounds(filtered.map(f=>f.coords));
    map.fitBounds(b.pad(0.25));
  } else {
    map.setView([20,0],2);
  }
}

// Listen for changes in search and filter inputs
searchBox.addEventListener('input', ()=> { filterAndRender(); });
regionFilter.addEventListener('change', ()=> filterAndRender());
programFilter.addEventListener('change', ()=> filterAndRender());

/*
  Map view options for different regions
*/
const MAP_OPTIONS = {
  world: { center:[20,0], zoom:2 },
  arab:  { center:[25,44], zoom:4 },
  europe:{ center:[50,10], zoom:4 },
  africa:{ center:[1.5,20], zoom:3.5 },
  asia:  { center:[30,100], zoom:3.5 },
  america:{center:[20,-90], zoom:3.5 },
};

/*
  Zoom map to a specific region
*/
function zoomTo(key) {
  const k = MAP_OPTIONS[key] || MAP_OPTIONS.world;
  map.setView(k.center, k.zoom, { animate:true });
}
window.zoomTo = zoomTo;