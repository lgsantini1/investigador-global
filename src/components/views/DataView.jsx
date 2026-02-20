import { useState, useMemo } from 'react';
import { Database, ShieldCheck, User } from 'lucide-react';
import { VILLAINS } from '../../config/gameData';

export function DataView({ gameData, issueWarrant }) {
    const [params, setParams] = useState({ gender: '', hair: '', auto: '', feature: '' });
    const [selectedSuspect, setSelectedSuspect] = useState(null);

    const updateParam = (k, v) => setParams(prev => ({ ...prev, [k]: v }));

    const matches = useMemo(() =>
        VILLAINS.filter(v =>
            (!params.gender || v.gender === params.gender) &&
            (!params.hair || v.hair === params.hair) &&
            (!params.auto || v.auto === params.auto) &&
            (!params.feature || v.feature === params.feature)
        ),
        [params]);

    const warrantReady = matches.length === 1;

    const filters = [
        { k: "gender", label: "Gênero", opts: ["Feminino", "Masculino"] },
        { k: "hair", label: "Cabelo", opts: ["Preto", "Loiro", "Ruivo", "Castanho"] },
        { k: "auto", label: "Veículo", opts: ["Conversível", "Limousine", "Moto Esportiva", "SUV Blindado", "Jato Privado"] },
        { k: "feature", label: "Sinal", opts: ["Colar de Rubi", "Tatuagem", "Anel de Diamante", "Óculos Escuros", "Chapéu Elegante"] }
    ];

    return (
        <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'fadeIn 0.3s ease', paddingBottom: '1rem' }}>
            {/* Header */}
            <div style={{
                padding: '0.85rem 1rem',
                borderRadius: '0.75rem',
                border: `1px solid ${warrantReady ? 'rgba(16,185,129,0.5)' : 'rgba(51,65,85,0.6)'} `,
                background: warrantReady ? 'rgba(6,78,59,0.25)' : 'rgba(30,41,59,0.7)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#22d3ee', marginBottom: '0.2rem' }}>
                        <Database size={15} />
                        <span style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Banco de Dados</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Filtre as características para identificar o suspeito.</div>
                </div>
                <div style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: '0.35rem',
                    fontWeight: 700, fontSize: '0.7rem',
                    background: warrantReady ? '#10b981' : 'rgba(51,65,85,0.8)',
                    color: warrantReady ? '#fff' : '#94a3b8',
                    whiteSpace: 'nowrap',
                }}>
                    {matches.length} {matches.length === 1 ? 'SUSPEITO' : 'SUSPEITOS'}
                </div>
            </div>

            {/* Filters — 2 columns on any width */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem',
            }}>
                {filters.map(({ k, label, opts }) => (
                    <div key={k} style={{
                        background: 'rgba(30,41,59,0.6)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(51,65,85,0.5)',
                        borderRadius: '0.65rem',
                        padding: '0.65rem 0.75rem',
                    }}>
                        <label style={{ display: 'block', fontSize: '0.58rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.35rem' }}>
                            {label}
                        </label>
                        <div style={{ position: 'relative' }}>
                            <select
                                value={params[k]}
                                onChange={e => updateParam(k, e.target.value)}
                                style={{
                                    width: '100%',
                                    background: 'rgba(15,23,42,0.8)',
                                    border: '1px solid rgba(51,65,85,0.8)',
                                    borderRadius: '0.4rem',
                                    color: params[k] ? '#fff' : '#94a3b8',
                                    padding: '0.4rem 1.5rem 0.4rem 0.5rem',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    appearance: 'none',
                                    fontFamily: 'var(--font-main)',
                                    outline: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="">Todos</option>
                                {opts.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <div style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b', fontSize: '0.6rem' }}>▼</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Results list */}
            <div style={{
                borderRadius: '0.75rem',
                border: '1px solid rgba(51,65,85,0.6)',
                overflow: 'hidden',
                background: 'rgba(15,23,42,0.8)',
            }}>
                <div style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(30,41,59,0.5)',
                    borderBottom: '1px solid rgba(51,65,85,0.5)',
                    fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.15em', color: '#475569', textAlign: 'center',
                }}>
                    Resultados da Busca (Clique para Dossiê)
                </div>
                <div style={{ maxHeight: '160px', overflowY: 'auto', padding: '0.5rem 0.75rem' }}>
                    {matches.length === 0 ? (
                        <div style={{ textAlign: 'center', color: '#f87171', fontSize: '0.8rem', padding: '1rem', fontFamily: 'var(--font-mono)' }}>
                            Nenhum resultado encontrado.
                        </div>
                    ) : (
                        matches.map(v => (
                            <button
                                key={v.name}
                                onClick={() => setSelectedSuspect(v)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                                    padding: '0.6rem 0.5rem', width: '100%',
                                    border: 'none', background: 'transparent',
                                    borderBottom: '1px solid rgba(30,41,59,0.8)',
                                    cursor: 'pointer', textAlign: 'left',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(51,65,85,0.3)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <div style={{
                                    width: '36px', height: '36px',
                                    borderRadius: '50%', overflow: 'hidden',
                                    flexShrink: 0,
                                    border: `2px solid ${warrantReady ? '#10b981' : 'rgba(51,65,85,0.8)'} `,
                                    boxShadow: warrantReady ? '0 0 12px rgba(16,185,129,0.4)' : 'none',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: 'rgba(30,41,59,0.5)',
                                }}>
                                    {v.image ? (
                                        <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <User size={18} color={warrantReady ? '#34d399' : '#64748b'} />
                                    )}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{
                                        fontSize: '0.85rem',
                                        fontFamily: 'var(--font-mono)',
                                        color: warrantReady ? '#34d399' : '#cbd5e1',
                                        fontWeight: 700,
                                    }}>
                                        {v.name}
                                    </span>
                                    {warrantReady && (
                                        <span style={{ fontSize: '0.55rem', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 900 }}>
                                            ALVO CONFIRMADO
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Suspect Detail Modal */}
            {selectedSuspect && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 60,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
                    padding: '1rem'
                }} onClick={() => setSelectedSuspect(null)}>
                    <div style={{
                        background: '#0f172a', border: '1px solid rgba(51,65,85,0.8)',
                        borderRadius: '1rem', maxWidth: '400px', width: '100%',
                        overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
                    }} onClick={e => e.stopPropagation()}>

                        {/* Header & Photo */}
                        <div style={{
                            height: '140px', position: 'relative',
                            backgroundImage: selectedSuspect.image ? `url(${selectedSuspect.image})` : 'none',
                            backgroundSize: 'cover', backgroundPosition: 'center 20%',
                            borderBottom: '2px solid rgba(51,65,85,0.8)'
                        }}>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a, transparent)' }} />
                            <h3 style={{ position: 'absolute', bottom: '0.5rem', left: '1rem', margin: 0, color: '#fff', fontSize: '1.2rem', fontWeight: 900 }}>
                                {selectedSuspect.name}
                            </h3>
                            <button
                                onClick={() => setSelectedSuspect(null)}
                                style={{
                                    position: 'absolute', top: '0.5rem', right: '0.5rem',
                                    background: 'rgba(0,0,0,0.5)', color: '#fff',
                                    border: 'none', borderRadius: '50%', width: '30px', height: '30px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Details */}
                        <div style={{ padding: '1.25rem' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.2rem' }}>Dossiê da Interpol</div>
                                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                                    {selectedSuspect.lore}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                                <div style={{ background: 'rgba(30,41,59,0.5)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(51,65,85,0.4)' }}>
                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Personalidade</div>
                                    <div style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 600, marginTop: '0.2rem' }}>{selectedSuspect.personality}</div>
                                </div>
                                <div style={{ background: 'rgba(30,41,59,0.5)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(51,65,85,0.4)' }}>
                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Gênero & Cabelo</div>
                                    <div style={{ fontSize: '0.8rem', color: '#e2e8f0', marginTop: '0.2rem' }}>{selectedSuspect.gender}, {selectedSuspect.hair}</div>
                                </div>
                            </div>

                            <div style={{ background: 'rgba(30,41,59,0.5)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(51,65,85,0.4)', marginBottom: '1rem' }}>
                                <div style={{ fontSize: '0.6rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Marca Registrada (Quirk)</div>
                                <div style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: '0.3rem', fontStyle: 'italic' }}>
                                    "{selectedSuspect.quirk}"
                                </div>
                            </div>

                            <button
                                onClick={() => { issueWarrant(selectedSuspect); setSelectedSuspect(null); }}
                                style={{
                                    width: '100%', padding: '0.85rem', borderRadius: '0.5rem', border: 'none',
                                    background: 'linear-gradient(135deg, #059669, #10b981)', color: '#fff',
                                    fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    cursor: 'pointer', fontFamily: 'var(--font-main)',
                                    boxShadow: '0 4px 15px rgba(16,185,129,0.3)', transition: 'all 0.2s'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(16,185,129,0.4)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 15px rgba(16,185,129,0.3)'; }}
                            >
                                <ShieldCheck size={16} /> EMITIR MANDADO DIRETO
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Issue warrant button */}
            <button
                onClick={() => issueWarrant(matches[0])}
                disabled={!warrantReady}
                style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    cursor: warrantReady ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    fontFamily: 'var(--font-main)',
                    background: warrantReady ? 'linear-gradient(135deg, #059669, #10b981)' : 'rgba(51,65,85,0.6)',
                    color: warrantReady ? '#fff' : '#64748b',
                    boxShadow: warrantReady ? '0 4px 20px rgba(16,185,129,0.35)' : 'none',
                    opacity: warrantReady ? 1 : 0.7,
                }}
            >
                <ShieldCheck size={20} /> EMITIR MANDADO
            </button>
        </div>
    );
}
