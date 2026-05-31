// All trip data lives here. Edit freely — the UI reads from these exports.

export const TRIP = {
  title: 'Albania Road Trip',
  subtitle: 'Prishtina → Borsh → Sarandë → Gjiri i Lalzit',
  dates: '20–27 June 2026',
};

// Category metadata: id, label, colour, and whether its pins are numbered in order.
export const CATEGORIES = [
  { id: 'stops',    label: 'Stops & route',       color: '#1D1D1F', numbered: true  },
  { id: 'transit',  label: 'Practical stops (to Vlorë)', color: '#86868B', numbered: true },
  { id: 'market',   label: 'Supermarkets',        color: '#34C759', numbered: false },
  { id: 'enroute',  label: 'Scenic stops (1→4)',  color: '#FF9F0A', numbered: true  },
  { id: 'borsh',    label: 'Around Borsh',        color: '#FF3B30', numbered: false },
  { id: 'sarande',  label: 'Around Sarandë',      color: '#5856D6', numbered: false },
];

export const CATEGORY_COLOR = Object.fromEntries(CATEGORIES.map(c => [c.id, c.color]));

// Every pin on the map. `seq` drives the number shown for ordered categories.
export const PLACES = [
  // Main stops / lodging
  { id: 'p-pristina', cat: 'stops', seq: 1, name: 'Prishtina (start)', lat: 42.6639, lng: 21.1641,
    desc: 'Depart ~5:00–5:30am, Sat 20 June.' },
  { id: 'p-borsh-hotel', cat: 'stops', seq: 2, name: 'White Hotel, Borsh', lat: 40.036463, lng: 19.866561,
    desc: 'Arrive ~11:00–11:30am, 20 June. Stay until 24 June, 10pm. Road Plazhi Borsh.' },
  { id: 'p-gold', cat: 'stops', seq: 3, name: 'Gold Apartment, Sarandë', lat: 39.862647, lng: 20.019708,
    desc: 'Rruga Butrinti. Arrive ~11pm, 24 June. Stay until 26 June, 10pm.' },
  { id: 'p-lalzit', cat: 'stops', seq: 4, name: 'Gjiri i Lalzit (sister’s place)', lat: 41.4926, lng: 19.5481,
    desc: 'Arrive ~2am, 27 June. Stay one night, then drive home to Prishtina.' },

  // Practical stops on the inland stretch up to Vlorë
  { id: 't-border', cat: 'transit', seq: 1, name: 'Morinë border crossing', lat: 42.1554, lng: 20.5458,
    desc: 'Kosovo–Albania crossing (Morinë–Vërmicë). Usually quick — keep passports and car green-card insurance ready.' },
  { id: 't-a1', cat: 'transit', seq: 2, name: 'A1 fuel & coffee stop', lat: 41.7681, lng: 19.8770,
    desc: 'Rough midpoint on the A1 motorway. Good place to refuel, grab coffee and breakfast.' },
  { id: 't-vlore', cat: 'transit', seq: 3, name: 'Vlorë', lat: 40.4708, lng: 19.4913,
    desc: 'Last big city before the Llogara pass — fuel up, coffee, big supermarkets. The scenery starts right after here.' },

  // Supermarkets
  { id: 'm-himare', cat: 'market', name: 'Himarë — Alpha & Big Market', lat: 40.1022, lng: 19.7473,
    desc: '★ Best stop for frozen/chilled goods: ~30 min / 16 km before Borsh, open ~7am–11pm.' },
  { id: 'm-sarande', cat: 'market', name: 'Sarandë supermarkets', lat: 39.8752, lng: 20.0065,
    desc: 'Several large markets in the centre / waterfront for your Gold Apartment stay.' },

  // Scenic stops on the drive down (in driving order)
  { id: 'e-llogara', cat: 'enroute', seq: 1, name: 'Llogara Pass viewpoint', lat: 40.1982, lng: 19.5924,
    desc: 'Spectacular mountain pass — pull over for sweeping Ionian Sea views before the coast.' },
  { id: 'e-dhermi', cat: 'enroute', seq: 2, name: 'Dhërmi Beach & old village', lat: 40.1512, lng: 19.6414,
    desc: 'Long, clear-water beach; cobbled old stone village up the hill.' },
  { id: 'e-himare', cat: 'enroute', seq: 3, name: 'Himarë (old town & Spile Bay)', lat: 40.1022, lng: 19.7473,
    desc: 'Best restaurant scene on the Riviera + a 14th-century castle. Also your supermarket stop.' },
  { id: 'e-porto', cat: 'enroute', seq: 4, name: 'Porto Palermo Castle', lat: 40.0622, lng: 19.7907,
    desc: 'Ali Pasha’s castle on a horseshoe bay — ~20 min before Borsh. Quick explore or a swim.' },

  // Around Borsh
  { id: 'b-beach', cat: 'borsh', name: 'Borsh Beach', lat: 40.0390, lng: 19.8619,
    desc: 'Longest beach on the Ionian (~7 km), pebbly and warm — close to 300 sunny days a year.' },
  { id: 'b-castle', cat: 'borsh', name: 'Borsh Castle (Sopot)', lat: 40.0699, lng: 19.8562,
    desc: 'Hilltop fortress ~500 m up; panoramic coastline views. Ancient origins.' },
  { id: 'b-waterfall', cat: 'borsh', name: 'Borsh Waterfall', lat: 40.0668, lng: 19.8590,
    desc: 'Spring and waterfall behind the village; a restaurant sits right on top of it.' },
  { id: 'b-qeparo', cat: 'borsh', name: 'Upper Qeparo (old village)', lat: 40.0678, lng: 19.8268,
    desc: 'Atmospheric old stone village just up the coast; great photos and views.' },
  { id: 'b-gjipe', cat: 'borsh', name: 'Gjipe Beach', lat: 40.1278, lng: 19.6731,
    desc: 'Dramatic beach at the mouth of a canyon — reached by a short hike or boat. A great half-day from Borsh.' },
  { id: 'b-jale', cat: 'borsh', name: 'Jalë Beach', lat: 40.1195, lng: 19.7017,
    desc: 'Lively pebble beach near Vuno with beach bars and clear water. ~35–40 min north of Borsh.' },
  { id: 'b-spile', cat: 'borsh', name: 'Spile Beach (Himarë)', lat: 40.1009, lng: 19.7454,
    desc: 'Himarë’s main town beach on Spile Bay — easy access, cafés and restaurants right behind it.' },
  { id: 'b-filikuri', cat: 'borsh', name: 'Filikuri Beach', lat: 40.0856, lng: 19.7521,
    desc: 'Hidden, crystal-clear cove near Himarë — best reached by boat. Secluded and quiet.' },
  { id: 'b-andreas', cat: 'borsh', name: 'San Andrea Beach (Orikum)', lat: 40.1976, lng: 19.5070,
    desc: 'Long beach near Orikum at the north end of the Riviera — a nice stop on the drive down (before Llogara).' },

  // Around Sarandë
  { id: 's-ksamil', cat: 'sarande', name: 'Ksamil', lat: 39.7701, lng: 20.0038,
    desc: 'White-sand beaches and tiny islands you can swim to. ~20 min south.' },
  { id: 's-butrint', cat: 'sarande', name: 'Butrint National Park', lat: 39.7456, lng: 20.0206,
    desc: 'UNESCO ancient city (your namesake!). Half-day visit, ~25 min south.' },
  { id: 's-blueeye', cat: 'sarande', name: 'Blue Eye (Syri i Kaltër)', lat: 39.9238, lng: 20.1925,
    desc: 'Deep natural spring with vivid blue water. ~30 min inland.' },
  { id: 's-lekuresi', cat: 'sarande', name: 'Lëkurësi Castle', lat: 39.8658, lng: 20.0257,
    desc: 'Hilltop castle over Sarandë — famous sunset and a restaurant.' },
  { id: 's-mirror', cat: 'sarande', name: 'Mirror Beach (Pasqyrat)', lat: 39.8108, lng: 20.0083,
    desc: 'Pretty turquoise coves between Sarandë and Ksamil.' },
  { id: 's-pulebardha', cat: 'sarande', name: 'Pulëbardha Beach', lat: 39.8005, lng: 20.0008,
    desc: 'Clear-water pebble cove just south of Sarandë — calmer and prettier than the town beach.' },
  { id: 's-pellumbave', cat: 'sarande', name: 'Shpella e Pëllumbave (Pigeon Cave)', lat: 39.8028, lng: 20.0040,
    desc: 'Sea cave on the cliffs near Sarandë — reach it by boat or kayak for a swim.' },
  { id: 's-mango', cat: 'sarande', name: 'Mango Beach', lat: 39.8527, lng: 20.0212,
    desc: 'Small scenic beach and beach club on the north edge of Sarandë.' },
];

// Driving legs — each is a list of [lat, lng] waypoints used to draw the route.
export const LEGS = [
  { id: 'leg1', label: 'Prishtina → Borsh (coastal)', km: '~290 km', time: '5.5–6h', kind: 'out',
    waypoints: [[42.6639,21.1641],[40.4708,19.4913],[40.1982,19.5924],[40.1022,19.7473],[40.036463,19.866561]],
    gmaps: 'https://www.google.com/maps/dir/?api=1&origin=42.6639,21.1641&destination=40.036463,19.866561&travelmode=driving&waypoints=40.4708,19.4913%7C40.1982,19.5924%7C40.1022,19.7473&dir_action=navigate' },
  { id: 'leg2', label: 'Borsh → Sarandë', km: '~37 km', time: '~50 min', kind: 'out',
    waypoints: [[40.036463,19.866561],[39.862647,20.019708]],
    gmaps: 'https://www.google.com/maps/dir/?api=1&origin=40.036463,19.866561&destination=39.862647,20.019708&travelmode=driving&dir_action=navigate' },
  { id: 'leg3', label: 'Sarandë → Gjiri i Lalzit', km: '~255 km', time: '~4h', kind: 'return',
    waypoints: [[39.862647,20.019708],[41.4926,19.5481]],
    gmaps: 'https://www.google.com/maps/dir/?api=1&origin=39.862647,20.019708&destination=41.4926,19.5481&travelmode=driving&dir_action=navigate' },
  { id: 'leg4', label: 'Gjiri i Lalzit → Prishtina', km: '~200 km', time: '~3h', kind: 'return',
    waypoints: [[41.4926,19.5481],[42.6639,21.1641]],
    gmaps: 'https://www.google.com/maps/dir/?api=1&origin=41.4926,19.5481&destination=42.6639,21.1641&travelmode=driving&dir_action=navigate' },
];

// High-level itinerary rows.
export const ITINERARY = [
  { when: 'Sat 20', title: 'Prishtina → Borsh', note: 'Leave ~5–5:30am · arrive White Hotel ~11–11:30am. Frozen-goods stop in Himarë ~30 min before.' },
  { when: '20–24', title: 'White Hotel, Borsh', note: 'Beach, castle, waterfall + day trips.' },
  { when: 'Wed 24 · 10pm', title: 'Borsh → Sarandë', note: '~37 km, ~50 min · arrive Gold Apartment ~11pm.' },
  { when: '24–26', title: 'Gold Apartment, Sarandë', note: 'Ksamil, Butrint, Blue Eye, Lëkurësi.' },
  { when: 'Fri 26 · 10pm', title: 'Sarandë → Gjiri i Lalzit', note: '~255 km, ~4h inland · arrive sister’s ~2am. Long night drive.' },
  { when: 'Sat 27', title: 'Gjiri i Lalzit → Prishtina', note: '~200 km, ~3h home.' },
];

// Day-by-day suggested plan. `places` are PLACE ids you can click to fly to.
// `date` = ISO calendar date, `stay` = where you sleep, `navId` = the place the
// "Today" view offers one-tap navigation to.
export const DAY_PLAN = [
  { day: 'Sat 20', date: '2026-06-20', stay: 'White Hotel, Borsh', navId: 'p-borsh-hotel',
    title: 'Arrive Borsh', note: 'Check in, unwind on Borsh Beach, catch the sunset.', places: ['b-beach'] },
  { day: 'Sun 21', date: '2026-06-21', stay: 'White Hotel, Borsh', navId: 'b-castle',
    title: 'Sopot Castle + Waterfall', note: 'Hike the hilltop fortress; lunch at the waterfall restaurant.', places: ['b-castle','b-waterfall'] },
  { day: 'Mon 22', date: '2026-06-22', stay: 'White Hotel, Borsh', navId: 'e-porto',
    title: 'Coast day north', note: 'Porto Palermo Castle → Himarë → Dhërmi / Gjipe beaches.', places: ['e-porto','e-himare','e-dhermi','b-gjipe'] },
  { day: 'Tue 23', date: '2026-06-23', stay: 'White Hotel, Borsh', navId: 'b-qeparo',
    title: 'Beach + Qeparo', note: 'Lazy beach morning; old stone village of Upper Qeparo.', places: ['b-beach','b-qeparo'] },
  { day: 'Wed 24', date: '2026-06-24', stay: 'Borsh → Gold Apartment (leave 10pm)', navId: 'p-gold',
    title: 'Move to Sarandë', note: 'Relax and pack; depart 10pm for the Gold Apartment.', places: ['p-gold'] },
  { day: 'Thu 25', date: '2026-06-25', stay: 'Gold Apartment, Sarandë', navId: 's-butrint',
    title: 'Butrint + Ksamil', note: 'UNESCO ruins in the morning, Ksamil islands and beaches after.', places: ['s-butrint','s-ksamil'] },
  { day: 'Fri 26', date: '2026-06-26', stay: 'Sarandë → Gjiri i Lalzit (leave 10pm)', navId: 's-blueeye',
    title: 'Blue Eye + Lëkurësi', note: 'Spring in the morning, castle sunset; depart 10pm for Gjiri i Lalzit.', places: ['s-blueeye','s-lekuresi'] },
  { day: 'Sat 27', date: '2026-06-27', stay: 'Drive home', navId: 'p-pristina',
    title: 'Back to Prishtina', note: 'Leave your sister’s and drive home (~200 km, ~3h).', places: ['p-pristina'] },
];

// Look up a place by id (handy for the Today view).
export const PLACE_BY_ID = Object.fromEntries(PLACES.map(p => [p.id, p]));

// Work out where we are relative to the trip, based on the current date.
export function getTripStatus(now = new Date()) {
  const atMidnight = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const today = atMidnight(now);
  const days = DAY_PLAN.map((d) => ({ ...d, _t: atMidnight(new Date(d.date + 'T00:00:00')).getTime() }));
  const start = days[0]._t;
  const end = days[days.length - 1]._t;
  const MS = 86400000;
  if (today.getTime() < start) {
    return { status: 'before', daysUntil: Math.round((start - today.getTime()) / MS), day: DAY_PLAN[0], index: 0 };
  }
  if (today.getTime() > end) {
    return { status: 'after', day: null, index: -1 };
  }
  const index = days.findIndex((d) => d._t === today.getTime());
  return { status: 'during', day: DAY_PLAN[index], index };
}

// Pre-resolved photos (each verified reachable). Loaded directly as <img>, so
// no CORS issues. Places not listed simply show no photo in the popup.
export const IMG = {
  'p-pristina': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Prishtina_seen_from_Mother_Theresa_Cathedral.jpg/960px-Prishtina_seen_from_Mother_Theresa_Cathedral.jpg',
  'p-lalzit': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Sunset_in_%22Gjiri_i_Lalzit%22.jpg/960px-Sunset_in_%22Gjiri_i_Lalzit%22.jpg',
  't-vlore': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Promenade_of_Vlor%C3%AB_along_the_Adriatic_Sea.jpg/960px-Promenade_of_Vlor%C3%AB_along_the_Adriatic_Sea.jpg',
  'm-himare': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/ALB_20070718_img_1368.jpg/960px-ALB_20070718_img_1368.jpg',
  'e-himare': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/ALB_20070718_img_1368.jpg/960px-ALB_20070718_img_1368.jpg',
  'm-sarande': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/CIty_of_Saranda_Albania_2016.jpg/960px-CIty_of_Saranda_Albania_2016.jpg',
  'e-llogara': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/ALB_20070718_img_1372.jpg/960px-ALB_20070718_img_1372.jpg',
  'e-dhermi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Dh%C3%ABrmi_Beach_Panorama_%282008%29.jpg/960px-Dh%C3%ABrmi_Beach_Panorama_%282008%29.jpg',
  'e-porto': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Kalaja_e_Porto_Palermos_nga_droni_3_-_Shqip%C3%ABri.jpg/960px-Kalaja_e_Porto_Palermos_nga_droni_3_-_Shqip%C3%ABri.jpg',
  'b-beach': 'https://api.openverse.org/v1/images/49ecbebf-0467-4d63-b13a-2f2bbefe9b5e/thumb/',
  'b-castle': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Panorama_e_Kalas%C3%AB_s%C3%AB_Borshit.jpg/960px-Panorama_e_Kalas%C3%AB_s%C3%AB_Borshit.jpg',
  'b-waterfall': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Borsh_Albania_waterfall.jpg/960px-Borsh_Albania_waterfall.jpg',
  'b-qeparo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Qeparo-Strand2.jpg/960px-Qeparo-Strand2.jpg',
  'b-gjipe': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Gjipe_beach%2C_Albania.JPG/960px-Gjipe_beach%2C_Albania.JPG',
  'b-jale': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Jale_Beach_Albania-_1.jpg/960px-Jale_Beach_Albania-_1.jpg',
  'b-spile': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Himara_Strandpromenade_Albanien.jpg/960px-Himara_Strandpromenade_Albanien.jpg',
  'b-andreas': 'https://api.openverse.org/v1/images/5b60c997-1bff-42aa-ad36-3415a19a2d9c/thumb/',
  's-ksamil': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Ksamill-1.jpg/960px-Ksamill-1.jpg',
  's-butrint': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Amphitheatre_of_Butrint_2009.jpg/960px-Amphitheatre_of_Butrint_2009.jpg',
  's-blueeye': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Albania%2C_Syri_i_Kalter_1.jpg/960px-Albania%2C_Syri_i_Kalter_1.jpg',
  's-lekuresi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/L%C3%ABkur%C3%ABsi_Castle%2C_Saranda%2C_Albania_2015-09-25_01.jpg/960px-L%C3%ABkur%C3%ABsi_Castle%2C_Saranda%2C_Albania_2015-09-25_01.jpg',
  // User-provided photos for the spots with no open-licensed image
  'b-filikuri': 'https://type1travelling.com/wp-content/uploads/2025/05/filikuri-beach-himare.jpg',
  's-mango': 'https://lh5.googleusercontent.com/p/AF1QipPHn5SWhZdUwqZ-0pWMwLAXJ0TruZBsCzIYhsWG=s1600',
  's-pulebardha': 'https://cdn.sanity.io/images/ojhw1baz/production/710943e3a49f09c1ff772f14ac7a934f59b3d6f9-1000x750.jpg',
  's-mirror': 'https://type1travelling.com/wp-content/uploads/2025/02/mirror-beach-october.jpg',
  's-pellumbave': 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/7a/c6/9d/shpella-e-pellumbave.jpg?w=1200&h=-1&s=1',
};

export function gmapsSearch(lat, lng) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

// Opens Google Maps with directions to the point and starts navigation
// from the user's current location (great on a phone).
export function gmapsNavigate(lat, lng) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving&dir_action=navigate`;
}

// Big one-tap "navigate now" destinations for the phone.
export const NAV = [
  { name: 'White Hotel, Borsh', sub: 'Day-1 destination · Road Plazhi Borsh', lat: 40.036463, lng: 19.866561, primary: true },
  { name: 'Himarë supermarket', sub: 'Frozen-goods stop · ~30 min before Borsh', lat: 40.1022, lng: 19.7473 },
  { name: 'Gold Apartment, Sarandë', sub: '24–26 June · Rruga Butrinti', lat: 39.862647, lng: 20.019708 },
  { name: 'Gjiri i Lalzit', sub: '26 June night · sister’s place', lat: 41.4926, lng: 19.5481 },
  { name: 'Home — Prishtina', sub: '27 June return', lat: 42.6639, lng: 21.1641 },
];
