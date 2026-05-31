import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CATEGORY_COLOR, CATEGORIES, gmapsSearch, gmapsNavigate, IMG } from '../data/trip';

const numbered = Object.fromEntries(CATEGORIES.map(c => [c.id, c.numbered]));

function makeIcon(place, active) {
  const color = CATEGORY_COLOR[place.cat];
  const big = place.cat === 'stops';
  const label = numbered[place.cat] ? place.seq : '';
  const size = big ? 30 : 23;
  return L.divIcon({
    className: '',
    html: `<div class="pin ${active ? 'pin-active' : ''}" style="--pin:${color};width:${size}px;height:${size}px;font-size:${big ? 13 : 11}px">${label}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function popupHtml(p) {
  const src = IMG[p.id];
  const photo = src
    ? `<div class="pop-photo"><img class="pop-img" src="${src}" alt="${p.name.replace(/"/g, '')}"` +
      ` loading="lazy" referrerpolicy="no-referrer"` +
      ` onload="this.parentNode.classList.add('loaded')"` +
      ` onerror="var b=this.closest('.pop-photo'); if(b) b.remove();"></div>`
    : '';
  return `<div class="pop">
    ${photo}
    <div class="pop-body">
      <h4>${p.name}</h4>
      <p>${p.desc}</p>
      <div class="pop-actions">
        <a class="pop-go" target="_blank" rel="noopener" href="${gmapsNavigate(p.lat, p.lng)}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 11l18-8-8 18-2-8-8-2z" fill="currentColor"/></svg>
          Go Now
        </a>
        <a class="pop-view" target="_blank" rel="noopener" href="${gmapsSearch(p.lat, p.lng)}">Map</a>
      </div>
    </div>
  </div>`;
}

async function drawRoutes(legs, outGroup, returnGroup) {
  for (const leg of legs) {
    const isReturn = leg.kind === 'return';
    const group = isReturn ? returnGroup : outGroup;
    const style = isReturn
      ? { color: '#8E8E93', weight: 3, opacity: 0.85, dashArray: '3,9' }   // night drive / way home
      : { color: '#0071E3', weight: 4, opacity: 0.75 };                    // the drive down
    let drawn = false;
    try {
      const coords = leg.waypoints.map(w => `${w[1]},${w[0]}`).join(';');
      const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`);
      const json = await res.json();
      if (json.routes && json.routes[0]) {
        const line = json.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
        L.polyline(line, style).addTo(group);
        drawn = true;
      }
    } catch (e) { /* fall back below */ }
    if (!drawn) {
      L.polyline(leg.waypoints, { ...style, dashArray: '2,8' }).addTo(group);
    }
  }
}

export default function MapView({ places, legs, visible, selected, onSelect, showReturn }) {
  const elRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const routeOutRef = useRef(null);
  const routeReturnRef = useRef(null);

  // Init once
  useEffect(() => {
    const map = L.map(elRef.current, { zoomControl: true, attributionControl: true }).setView([41, 20], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© OpenStreetMap',
    }).addTo(map);
    mapRef.current = map;

    places.forEach(p => {
      const m = L.marker([p.lat, p.lng], { icon: makeIcon(p, false), riseOnHover: true });
      m.bindPopup(popupHtml(p), { closeButton: true, maxWidth: 280, minWidth: 248, autoPanPadding: [24, 24] });
      m.on('click', () => onSelect(p.id));
      m.addTo(map);
      markersRef.current[p.id] = m;
    });

    routeOutRef.current = L.layerGroup().addTo(map);
    routeReturnRef.current = L.layerGroup().addTo(map);
    drawRoutes(legs, routeOutRef.current, routeReturnRef.current);

    map.fitBounds(L.latLngBounds(places.map(p => [p.lat, p.lng])).pad(0.12));

    // Reset-view control
    const ResetCtl = L.Control.extend({
      options: { position: 'topright' },
      onAdd() {
        const btn = L.DomUtil.create('button', 'reset-btn');
        btn.innerHTML = 'Fit all';
        btn.title = 'Fit the whole trip';
        L.DomEvent.on(btn, 'click', (ev) => {
          L.DomEvent.stop(ev);
          map.fitBounds(L.latLngBounds(places.map(p => [p.lat, p.lng])).pad(0.12));
        });
        return btn;
      },
    });
    map.addControl(new ResetCtl());

    setTimeout(() => map.invalidateSize(), 100);
    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toggle layer visibility
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    places.forEach(p => {
      const m = markersRef.current[p.id];
      if (!m) return;
      const show = visible[p.cat];
      if (show && !map.hasLayer(m)) m.addTo(map);
      if (!show && map.hasLayer(m)) map.removeLayer(m);
    });
    const toggle = (ref, show) => {
      if (!ref.current) return;
      if (show && !map.hasLayer(ref.current)) ref.current.addTo(map);
      if (!show && map.hasLayer(ref.current)) map.removeLayer(ref.current);
    };
    toggle(routeOutRef, visible.stops);
    toggle(routeReturnRef, visible.stops && showReturn);
  }, [visible, places, showReturn]);

  // Fly to + highlight the selected place
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    // refresh icons for active state
    places.forEach(p => {
      const m = markersRef.current[p.id];
      if (m) m.setIcon(makeIcon(p, p.id === selected));
    });
    if (!selected) return;
    const p = places.find(x => x.id === selected);
    const m = markersRef.current[selected];
    if (p && m) {
      if (!map.hasLayer(m)) m.addTo(map);
      map.flyTo([p.lat, p.lng], Math.max(map.getZoom(), 12), { duration: 0.8 });
      m.openPopup();
    }
  }, [selected, places]);

  return <div ref={elRef} className="map" aria-label="Trip map" />;
}
