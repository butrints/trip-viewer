import { useState } from 'react';
import MapView from './components/MapView.jsx';
import Sidebar from './components/Sidebar.jsx';
import { TRIP, PLACES, LEGS, CATEGORIES } from './data/trip';

const initialVisible = Object.fromEntries(CATEGORIES.map(c => [c.id, true]));

export default function App() {
  const [visible, setVisible] = useState(initialVisible);
  const [selected, setSelected] = useState(null);
  const [showReturn, setShowReturn] = useState(true);
  // Mobile-first: open the plan/navigate panel by default on small screens.
  const [panelOpen, setPanelOpen] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 820);

  const toggle = (id) => setVisible(v => ({ ...v, [id]: !v[id] }));
  const select = (id) => { setSelected(id); setPanelOpen(false); };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <h1>{TRIP.title}</h1>
          <p>{TRIP.subtitle} · {TRIP.dates}</p>
        </div>
        <span className="stat">8 days · 4 stops</span>
        <button className="panel-toggle" onClick={() => setPanelOpen(o => !o)}>
          {panelOpen ? 'Map' : 'Plan'}
        </button>
      </header>

      <div className="layout">
        <div className={panelOpen ? 'panel open' : 'panel'}>
          <Sidebar visible={visible} onToggle={toggle} selected={selected} onSelect={select}
                   showReturn={showReturn} onToggleReturn={() => setShowReturn((v) => !v)} />
        </div>
        <MapView places={PLACES} legs={LEGS} visible={visible} selected={selected} onSelect={setSelected} showReturn={showReturn} />
      </div>
    </div>
  );
}
