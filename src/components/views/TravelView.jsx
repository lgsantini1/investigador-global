import { Globe } from 'lucide-react';
import { CITIES, DAY_COST_TRAVEL } from '../../config/gameData';
import { MapComponent } from '../Map';

export function TravelView({ gameData, visitedCities, travelAnimation, onTravel }) {
    if (!gameData) return null;
    const currentCityName = gameData.city.name;

    return (
        <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'fadeIn 0.3s ease', overflowX: 'hidden', boxSizing: 'border-box' }}>
            {/* Info bar */}
            <div style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(59,130,246,0.3)',
                background: 'linear-gradient(to right, rgba(30,58,138,0.35), rgba(22,78,99,0.35))',
                display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}>
                <Globe size={18} color="#60a5fa" />
                <span style={{ color: '#93c5fd', fontWeight: 700, fontSize: '0.9rem', marginRight: '0.5rem' }}>MAPA GLOBAL</span>
                <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                    {travelAnimation.active
                        ? `✈️ Voando para ${travelAnimation.to}...`
                        : <>Custo por viagem: <strong style={{ color: '#fff' }}>{DAY_COST_TRAVEL.toFixed(1)} dia</strong></>
                    }
                </span>
            </div>

            {/* Map */}
            <div style={{
                width: '100%',
                height: 'clamp(180px, 32vh, 320px)',
                borderRadius: '1rem',
                overflow: 'hidden',
                border: '1px solid rgba(51,65,85,0.5)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                position: 'relative',
                zIndex: 0,
                boxSizing: 'border-box',
            }}>
                <MapComponent
                    currentCityName={currentCityName}
                    visitedCities={visitedCities}
                    travelAnimation={travelAnimation}
                />
            </div>

            {/* City grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '0.5rem',
                width: '100%',
                boxSizing: 'border-box',
            }}>
                {Object.keys(CITIES)
                    .filter(c => c !== currentCityName)
                    .map(cityName => {
                        const city = CITIES[cityName];
                        const isVisited = visitedCities.includes(cityName);
                        return (
                            <button
                                key={cityName}
                                onClick={() => onTravel(cityName)}
                                disabled={travelAnimation.active}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                                    padding: '0.85rem 1rem',
                                    borderRadius: '0.75rem',
                                    border: `1px solid ${isVisited ? 'rgba(16,185,129,0.4)' : 'rgba(51,65,85,0.8)'}`,
                                    background: isVisited ? 'rgba(6,78,59,0.25)' : 'rgba(30,41,59,0.7)',
                                    cursor: travelAnimation.active ? 'not-allowed' : 'pointer',
                                    opacity: travelAnimation.active ? 0.5 : 1,
                                    transition: 'border-color 0.2s, background 0.2s',
                                    textAlign: 'left',
                                    fontFamily: 'var(--font-main)',
                                }}
                            >
                                <div style={{
                                    width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
                                    background: isVisited ? '#10b981' : '#60a5fa',
                                    boxShadow: `0 0 8px ${isVisited ? '#10b981' : '#60a5fa'}`,
                                }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {cityName}
                                    </div>
                                    <div style={{ fontSize: '0.65rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                                        {city.country}
                                    </div>
                                </div>
                                {isVisited && (
                                    <span style={{
                                        fontSize: '0.55rem', fontWeight: 700, color: '#34d399',
                                        padding: '0.2rem 0.5rem', borderRadius: '0.25rem',
                                        background: 'rgba(6,78,59,0.5)', flexShrink: 0,
                                        textTransform: 'uppercase', letterSpacing: '0.1em',
                                    }}>
                                        ✓
                                    </span>
                                )}
                            </button>
                        );
                    })}
            </div>
        </div>
    );
}
