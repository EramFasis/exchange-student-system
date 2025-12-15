

/* Create the map centered globally with zoom level 2 */
var map = L.map("map").setView([20, 0], 2);

// Add OpenStreetMap tiles to display the world map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

/* All exchange partner universities worldwide */
var universities = [
      // Arab Countries - Middle East exchange programs

      {
        name: "Sultan Qaboos University (Oman)",
        coords: [23.5859, 58.4059],
        programs: [
          "Engineering Exchange",
          "Science Research Collaboration",
          "Business & Economics Exchange",
          "Education & Humanities Programs"
        ]
      },

      // ---------- SAUDI ARABIA ----------
      {
        name: "King Saud University (Saudi Arabia)",
        coords: [24.7245, 46.6310],
        programs: [
          "Engineering Exchange Program",
          "Computer Science Mobility",
          "Health & Medical Sciences Exchange"
        ]
      },
      {
        name: "King Abdulaziz University (Saudi Arabia)",
        coords: [21.4934, 39.2454],
        programs: [
          "International Student Exchange",
          "Science & Technology Research",
          "Business and Economics Mobility"
        ]
      },

      // ---------- UAE ----------
      {
        name: "United Arab Emirates University (UAE)",
        coords: [24.2075, 55.7440],
        programs: [
          "Gulf Student Exchange",
          "Science & Engineering Program",
          "Business Administration Exchange"
        ]
      },
      {
        name: "American University of Sharjah (UAE)",
        coords: [25.3167, 55.4911],
        programs: [
          "Architecture & Design Exchange",
          "Engineering Mobility",
          "Global Studies Program"
        ]
      },

      // ---------- QATAR ----------
      {
        name: "Qatar University (Qatar)",
        coords: [25.3752, 51.4905],
        programs: [
          "International Affairs Exchange",
          "Engineering & Computing Mobility",
          "Business & Economics Exchange"
        ]
      },

      // ---------- JORDAN ----------
      {
        name: "University of Jordan (Jordan)",
        coords: [32.0121, 35.8700],
        programs: [
          "Middle East Studies Exchange",
          "Arabic Language Program",
          "Medicine & Nursing Mobility"
        ]
      },

      // ---------- LEBANON ----------
      {
        name: "American University of Beirut (Lebanon)",
        coords: [33.9017, 35.4785],
        programs: [
          "Political Science Exchange",
          "Health Sciences Mobility",
          "Business Administration Program"
        ]
      },

      // ---------- KUWAIT ----------
      {
        name: "Kuwait University (Kuwait)",
        coords: [29.3365, 47.9653],
        programs: [
          "Engineering Exchange",
          "Education & Humanities Program",
          "Business & IT Mobility"
        ]
      },

      // ---------- BAHRAIN ----------
      {
        name: "University of Bahrain (Bahrain)",
        coords: [26.0674, 50.5011],
        programs: [
          "Business Exchange Program",
          "Engineering Mobility",
          "Computing & IT International Program"
        ]
      },

      // ---------- EGYPT ----------
      {
        name: "American University in Cairo (Egypt)",
        coords: [30.0290, 31.2610],
        programs: [
          "Middle East Studies",
          "Global Affairs Exchange",
          "Architecture & Design Program"
        ]
      },

      // ---------- EUROPE ----------
      {
        name: "University of Amsterdam (Netherlands)",
        coords: [52.3557, 4.9555],
        programs: [
          "European Studies Exchange",
          "Psychology Mobility",
          "Business Semester Abroad"
        ]
      },

      {
        name: "KU Leuven (Belgium)",
        coords: [50.8798, 4.7005],
        programs: [
          "Engineering & Technology",
          "Social Sciences Mobility",
          "Biomedical Research"
        ]
      },

      {
        name: "Sorbonne University (France)",
        coords: [48.8462, 2.3554],
        programs: [
          "French Language Exchange",
          "Humanities Study Abroad",
          "Science Research Collaboration"
        ]
      },

      // ---------- ITALY ----------
      {
        name: "University of Bologna (Italy)",
        coords: [44.4949, 11.3426],
        programs: [
          "Erasmus+ Exchange",
          "Cultural Heritage Studies",
          "Engineering & Architecture Mobility"
        ]
      },

      {
        name: "Sapienza University of Rome (Italy)",
        coords: [41.9030, 12.5137],
        programs: [
          "Medical & Health Sciences",
          "European Law Exchange",
          "Computer Engineering Mobility"
        ]
      },

      // ---------- AFRICA ----------
      {
        name: "University of Cape Town (South Africa)",
        coords: [-33.9570, 18.4600],
        programs: [
          "African Studies Exchange",
          "Engineering & Built Environment",
          "Business & Development Studies"
        ]
      },

      {
        name: "University of Nairobi (Kenya)",
        coords: [-1.2797, 36.8172],
        programs: [
          "Agriculture & Environmental Studies",
          "Public Health Exchange",
          "Business & Economics Mobility"
        ]
      },

      // ---------- RUSSIA ----------
      {
        name: "Moscow State University (Russia)",
        coords: [55.7386, 37.6068],
        programs: [
          "STEM Research Exchange",
          "Mathematics & Physics Program",
          "International Studies Mobility"
        ]
      },

      {
        name: "Saint Petersburg State University (Russia)",
        coords: [59.9311, 30.3609],
        programs: [
          "Russian Language Exchange",
          "Liberal Arts Study Abroad",
          "Law & Political Science Mobility"
        ]
      },

      {
        name: "Novosibirsk State University (Russia)",
        coords: [54.8400, 83.1036],
        programs: [
          "Physics & Mathematics Exchange",
          "Biology Research Program",
          "Computer Science Mobility"
        ]
      },

      // ---------- USA ----------
      {
        name: "Harvard University (USA)",
        coords: [42.3770, -71.1167],
        programs: [
          "Global Study Program",
          "Business School Exchange",
          "Engineering Mobility Program"
        ]
      },

      // ---------- CANADA ----------
      {
        name: "University of Toronto (Canada)",
        coords: [43.6629, -79.3957],
        programs: [
          "International Scholar Exchange",
          "Computer Science Mobility",
          "Humanities Semester Abroad"
        ]
      },

      // ---------- JAPAN ----------
      {
        name: "University of Tokyo (Japan)",
        coords: [35.7126, 139.7610],
        programs: [
          "STEM Research Program",
          "AI & Robotics Exchange",
          "Japan Global Exchange"
        ]
      },

      // ---------- AUSTRALIA ----------
      {
        name: "University of Sydney (Australia)",
        coords: [-33.8898, 151.1876],
        programs: [
          "Environmental Science Mobility",
          "Law & Public Policy Exchange",
          "Study Abroad Semester"
        ]
      },

      // ---------- UK ----------
      {
        name: "University of Oxford (UK)",
        coords: [51.7548, -1.2544],
        programs: [
          "Visiting Student Programme",
          "Humanities Exchange",
          "Economics & Politics Study Abroad"
        ]
      }
    ];

/* Place university markers on the map with info popups */

var allMarkers = [];

// Loop through all universities and add markers to the map
universities.forEach(function (uni) {
  // Create a list of programs offered by the university
  var programList = "<ul>";
  uni.programs.forEach(function (p) {
    programList += "<li>" + p + "</li>";
  });
  programList += "</ul>";

  // Add marker to the map at university coordinates
  var marker = L.marker(uni.coords).addTo(map);

  // Add popup that shows university name and programs when marker is clicked
  marker.bindPopup(
    "<h3>" + uni.name + "</h3>" +
    "<b>Exchange Programs Offered:</b>" +
    programList
  );

  // Save marker for search functionality
  allMarkers.push({ marker: marker, name: uni.name.toLowerCase() });
});

/* Find universities by typing their name */
document.getElementById("uniSearchBar").addEventListener("input", function () {
  // Get search text and convert to lowercase
  let searchValue = this.value.toLowerCase();

  // Search through all markers and show matching results
  allMarkers.forEach(function (obj) {
    if (obj.name.includes(searchValue)) {
      // Move map to university location and open its popup
      map.setView(obj.marker.getLatLng(), 5);
      obj.marker.openPopup();
    }
  });
});

/* Zoom to different world regions */
function zoomTo(region) {
  // Define coordinates and zoom level for each region
  const regions = {
    world: [20, 0, 2],
    europe: [54, 15, 4],
    asia: [30, 95, 3],
    africa: [2, 20, 3],
    na: [45, -95, 3],
    sa: [-15, -60, 3],
  };
  // Update map view to selected region
  map.setView([regions[region][0], regions[region][1]], regions[region][2]);
}