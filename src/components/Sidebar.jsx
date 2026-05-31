import { useState } from 'react';
import { CATEGORIES, PLACES, LEGS, ITINERARY, DAY_PLAN, NAV, gmapsNavigate, getTripStatus, PLACE_BY_ID } from '../data/trip';

const placeById = Object.fromEntries(PLACES.map(p => [p.id, p]));

function TodayCard({ onSelect }) {
  const s = getTripStatus();

  if (s.status === 'after') {
    return (
      <div className="today done">
        <span className="today-badge">Trip complete</span>
        <b>Hope Albania was unforgettable.</b>
        <span className="today-sub">Faleminderit — safe travels home.</span>
      </div>
    );
  }

  const d = s.day;
  const nav = d.navId ? PLACE_BY_ID[d.navId] : null;
  const before = s.status === 'before';

  return (
    <div className="today">
      <div className="today-head">
        <span className="today-badge">{before ? `Starts in ${s.daysUntil} ${s.daysUntil === 1 ? 'day' : 'days'}` : 'Today'}</span>
        <span className="today-date">{d.day}</span>
      </div>
      <b className="today-title">{d.title}</b>
      <span className="today-sub">{before ? 'First up: ' : 'Staying: '}{before ? 'drive Prishtina → Borsh' : d.stay}</span>
      <p className="today-note">{d.note}</p>
      <div className="today-actions">
        {nav && (
          <a className="today-go" target="_blank" rel="noopener" href={gmapsNavigate(nav.lat, nav.lng)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 11l18-8-8 18-2-8-8-2z" fill="currentColor" /></svg>
            Navigate to {nav.name}
          </a>
        )}
        {d.places && d.places.length > 0 && (
          <div className="chips">
            {d.places.map((pid) => placeById[pid] && (
              <button key={pid} className="chip" onClick={() => onSelect(pid)}>{placeById[pid].name}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Swatch({ color }) {
  return <span className="swatch" style={{ background: color }} />;
}

export default function Sidebar({ visible, onToggle, selected, onSelect, showReturn, onToggleReturn }) {
  const [tab, setTab] = useState('plan');
  const today = getTripStatus();
  const todayDate = today.day ? today.day.date : null;

  return (
    <aside className="sidebar">
      <div className="segmented" role="tablist">
        <button role="tab" aria-selected={tab === 'plan'} className={tab === 'plan' ? 'seg active' : 'seg'} onClick={() => setTab('plan')}>Plan</button>
        <button role="tab" aria-selected={tab === 'places'} className={tab === 'places' ? 'seg active' : 'seg'} onClick={() => setTab('places')}>Places</button>
      </div>

      {tab === 'plan' && (
        <div className="tab-body">
          <TodayCard onSelect={onSelect} />

          <div className="label">Navigate now</div>
          <div className="bignav-group">
            {NAV.map((d, i) => (
              <a
                key={i}
                className={`bignav ${d.primary ? 'primary' : ''}`}
                target="_blank"
                rel="noopener"
                href={gmapsNavigate(d.lat, d.lng)}
                aria-label={`Navigate to ${d.name}`}
              >
                <span className="bn-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 11l18-8-8 18-2-8-8-2z" fill="currentColor" />
                  </svg>
                </span>
                <span className="bn-text">
                  <b>{d.name}</b>
                  <span className="bn-sub">{d.sub}</span>
                </span>
                <span className="arrow">›</span>
              </a>
            ))}
          </div>

          <div className="label">Itinerary</div>
          {ITINERARY.map((row, i) => (
            <div className="row" key={i}>
              <div className="when">{row.when}</div>
              <div className="what"><b>{row.title}</b><span className="meta">{row.note}</span></div>
            </div>
          ))}

          <div className="label">Suggested day plan</div>
          {DAY_PLAN.map((d, i) => (
            <div className={`row ${d.date === todayDate ? 'row-today' : ''}`} key={i}>
              <div className="when">{d.day}{d.date === todayDate && <span className="today-dot" aria-label="today" />}</div>
              <div className="what">
                <b>{d.title}</b>
                <span className="meta">{d.note}</span>
                <div className="chips">
                  {d.places.map(pid => placeById[pid] && (
                    <button key={pid} className="chip" onClick={() => onSelect(pid)}>{placeById[pid].name}</button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="label">Navigate (opens Google Maps)</div>
          {LEGS.map(leg => (
            <a className="navlink" key={leg.id} target="_blank" rel="noopener" href={leg.gmaps}>
              <span>{leg.label}<span className="navmeta">{leg.km} · {leg.time}</span></span>
              <span className="arrow">›</span>
            </a>
          ))}

          <div className="label">Frozen-goods tip</div>
          <div className="note">
            <b>Buy chilled/frozen in Himarë</b>, not earlier. It’s the last real supermarket
            (<b>Alpha</b> &amp; <b>Big Market</b>, ~7am–11pm) and sits only ~30 min / 16 km before the
            White Hotel — short enough that frozen food survives the last leg. Borsh itself has only small shops.
          </div>
        </div>
      )}

      {tab === 'places' && (
        <div className="tab-body">
          <div className="label">Show on map</div>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`toggle ${visible[cat.id] ? 'on' : ''}`}
              onClick={() => onToggle(cat.id)}
              aria-pressed={visible[cat.id]}
            >
              <Swatch color={cat.color} />
              <span className="tname">{cat.label}</span>
              <span className="count">{PLACES.filter(p => p.cat === cat.id).length}</span>
              <span className="dot" />
            </button>
          ))}

          <div className="label">Route lines</div>
          <div className="legend"><span className="leg-line solid" /> Drive down (Prishtina → Borsh → Sarandë)</div>
          <button className={`toggle ${showReturn ? 'on' : ''}`} onClick={onToggleReturn} aria-pressed={showReturn}>
            <span className="leg-line dashed" />
            <span className="tname">Return drives (night + home)</span>
            <span className="dot" />
          </button>
          <div className="hint">The inland mountain line is the Sarandë → Gjiri i Lalzit night drive and the way home — the coast road is too slow at night.</div>

          {CATEGORIES.map(cat => {
            const items = PLACES.filter(p => p.cat === cat.id);
            if (!items.length) return null;
            return (
              <div key={cat.id} className={visible[cat.id] ? '' : 'dimmed'}>
                <div className="label"><Swatch color={cat.color} /> {cat.label}</div>
                {items.map(p => (
                  <div key={p.id} className={`place ${selected === p.id ? 'sel' : ''}`}>
                    <button className="place-main" onClick={() => onSelect(p.id)}>
                      <b>{p.name}</b>
                      <span className="meta">{p.desc}</span>
                    </button>
                    <a className="go" target="_blank" rel="noopener" href={gmapsNavigate(p.lat, p.lng)} aria-label={`Navigate to ${p.name}`}>
                      Go ›
                    </a>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}
