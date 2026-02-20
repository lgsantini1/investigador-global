import { Search, Info } from 'lucide-react';

export function InvestigateView({ gameData, onInvestigate }) {
    if (!gameData) return null;
    const { city, cityLogs } = gameData;

    return (
        <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'fadeIn 0.3s ease' }}>
            {/* City description */}
            <div style={{
                background: 'rgba(30,41,59,0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(51,65,85,0.5)',
                borderRadius: '0.75rem',
                padding: '1rem',
            }}>
                <p style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    "{city.desc}"
                </p>
            </div>

            {/* Investigation locations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {city.places.map((place) => (
                    <button
                        key={place}
                        onClick={() => onInvestigate(place)}
                        style={{
                            width: '100%',
                            display: 'flex', alignItems: 'center', gap: '1rem',
                            padding: '1rem',
                            background: 'rgba(30,41,59,0.65)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(51,65,85,0.5)',
                            borderRadius: '0.75rem',
                            cursor: 'pointer',
                            transition: 'border-color 0.2s, background 0.2s',
                            textAlign: 'left',
                            fontFamily: 'var(--font-main)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'rgba(34,211,238,0.5)';
                            e.currentTarget.style.background = 'rgba(30,41,59,0.9)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(51,65,85,0.5)';
                            e.currentTarget.style.background = 'rgba(30,41,59,0.65)';
                        }}
                    >
                        <div style={{
                            width: '40px', height: '40px', flexShrink: 0,
                            background: 'rgba(15,23,42,0.7)',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#94a3b8',
                        }}>
                            <Search size={20} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.15rem' }}>Local</div>
                            <span style={{ fontWeight: 700, color: '#f8fafc', fontSize: '1rem' }}>{place}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Log section */}
            <div style={{ marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', color: '#22d3ee' }}>
                    <Info size={14} />
                    <h3 style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0 }}>Diário de Bordo</h3>
                </div>

                {cityLogs.length === 0 ? (
                    <div style={{
                        textAlign: 'center', padding: '1rem',
                        background: 'rgba(30,41,59,0.4)', borderRadius: '0.5rem',
                        color: '#475569', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontStyle: 'italic',
                    }}>
                        Nenhuma pista coletada nesta cidade ainda.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {cityLogs.map((log, i) => (
                            <div key={i} style={{
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                borderLeft: `4px solid ${log.isClue ? '#10b981' : '#475569'}`,
                                background: log.isClue ? 'rgba(16,185,129,0.08)' : 'rgba(30,41,59,0.5)',
                                fontSize: '0.8rem',
                                fontFamily: 'var(--font-mono)',
                                color: log.isClue ? '#6ee7b7' : '#94a3b8',
                            }}>
                                <span style={{ display: 'block', fontWeight: 700, fontSize: '0.6rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                                    {log.place}:
                                </span>
                                "{log.text}"
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
