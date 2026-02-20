import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, ChevronRight, ArrowLeft, Clock, Map as MapIcon, Settings, Info, Fingerprint, Search, Globe, Database } from 'lucide-react';
import { DIFFICULTIES } from '../../config/gameData';

const DIFF_LIST = Object.values(DIFFICULTIES);

// ─── Step 0: Splash Screen ────────────────────────────────────────────────────
function SplashScreen({ onDone }) {
    const [fading, setFading] = useState(false);

    useEffect(() => {
        // After 3.2 seconds, start fading out
        const fadeTimer = setTimeout(() => setFading(true), 3200);
        // After fade completes (0.8s), move on
        const doneTimer = setTimeout(() => onDone(), 4000);
        return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
    }, [onDone]);

    return (
        <div
            onClick={() => { setFading(true); setTimeout(onDone, 600); }}
            style={{
                position: 'fixed', inset: 0,
                cursor: 'pointer',
                transition: 'opacity 0.8s ease',
                opacity: fading ? 0 : 1,
                overflow: 'hidden',
            }}
        >
            {/* Background image with Ken Burns pan */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url('${import.meta.env.BASE_URL}assets/images/intro/splash.png')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                animation: 'splash-zoom 4s ease-out forwards',
            }} />

            {/* Vignette overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,10,25,0.8) 100%)',
            }} />

            {/* Bottom gradient for text */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(5,10,25,0.9) 0%, transparent 50%)',
            }} />

            {/* Tap to skip hint */}
            <div style={{
                position: 'absolute', bottom: '2rem', right: '2rem',
                fontSize: '0.65rem', color: 'rgba(148,163,184,0.5)',
                fontFamily: 'var(--font-mono)', letterSpacing: '0.15em',
                animation: 'fadeIn 1s ease 1.5s both',
            }}>
                TOQUE PARA CONTINUAR
            </div>

            {/* Inject splash animation */}
            <style>{`
                @keyframes splash-zoom {
                    0%   { transform: scale(1.08); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
}

// ─── Step 1: Config & Tutorial Screen ──────────────────────────────────────────
function ConfigScreen({ onBack }) {
    return (
        <div style={{
            position: 'relative', width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            animation: 'fadeIn 0.3s ease',
        }}>
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url('${import.meta.env.BASE_URL}assets/images/intro/cover.png')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'brightness(0.15) saturate(1.1) blur(4px)',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a, transparent)' }} />

            <div style={{
                position: 'relative', zIndex: 10,
                width: '100%', maxWidth: '700px',
                padding: '1.5rem',
                overflowY: 'auto', maxHeight: '100%',
                display: 'flex', flexDirection: 'column', gap: '1.25rem',
            }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(51,65,85,0.6)', paddingBottom: '0.75rem' }}>
                    <button
                        onClick={onBack}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                            color: '#64748b', fontSize: '0.75rem', fontWeight: 700,
                            background: 'none', border: 'none', cursor: 'pointer',
                            transition: 'color 0.15s', padding: 0
                        }}
                    >
                        <ArrowLeft size={16} /> Voltar
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f8fafc' }}>
                        <Settings size={18} color="#22d3ee" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                            Configurações do Terminal
                        </span>
                    </div>
                </div>

                {/* Tutorial Container */}
                <div style={{
                    background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(51,65,85,0.6)', borderRadius: '1rem',
                    padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.2rem', color: '#22d3ee', fontWeight: 900, marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                            Manual do Investigador
                        </h2>
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5 }}>
                            Um artefato inestimável foi roubado da Agência. Sua missão é rastrear o culpado ao redor do globo, identificar sua identidade disfarçada e prendê-lo antes que o prazo (em dias) expire.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                        {/* Step 1 */}
                        <div style={{ background: 'rgba(30,41,59,0.5)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(51,65,85,0.4)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', marginBottom: '0.5rem' }}>
                                <Search size={20} />
                                <span style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>1. Coletar Pistas</span>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                                Acesse a aba <b>PISTAS</b> na sua cidade atual e interrogue testemunhas nos locais. Elas dirão para onde o suspeito viajou (dicas sobre história, geografia ou monumentos do próximo país) e como ele se comportava ou o que vestia.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div style={{ background: 'rgba(30,41,59,0.5)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(51,65,85,0.4)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', marginBottom: '0.5rem' }}>
                                <Globe size={20} />
                                <span style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>2. Perseguir o Alvo</span>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                                Na aba <b>VIAJAR</b>, escolha o próximo destino com base nas informações geográficas coletadas nas testemunhas. Se errar de rota, você desperdiçará dias preciosos tentando voltar aos trilhos.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div style={{ background: 'rgba(30,41,59,0.5)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(51,65,85,0.4)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22d3ee', marginBottom: '0.5rem' }}>
                                <Database size={20} />
                                <span style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>3. Cruzar Dados</span>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                                Vá para <b>DADOS</b> e insira as dicas visuais relatadas pelas testemunhas nos campos de filtro da Interpol. Ao clicar na foto dos suspeitos, você acessa seu Dossiê Confidencial com personalidade e história (crucial nas dificuldades altas).
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div style={{ background: 'rgba(30,41,59,0.5)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(51,65,85,0.4)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', marginBottom: '0.5rem' }}>
                                <Fingerprint size={20} />
                                <span style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>4. Emitir Mandado</span>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                                Você não pode prender ninguém sem mandado! Ao identificar quem é o vilão na aba DADOS, abra seu dossiê e clique em <b>EMITIR MANDADO</b>. Só com ele em mãos você efetuará as algemas quando o alcançar.
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                    <button
                        onClick={onBack}
                        style={{
                            padding: '0.85rem 2rem', borderRadius: '0.5rem', border: '1px solid rgba(34,211,238,0.4)',
                            background: 'rgba(34,211,238,0.1)', color: '#22d3ee', fontWeight: 800, fontSize: '0.85rem',
                            textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer',
                            boxShadow: '0 0 15px rgba(34,211,238,0.1)', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.2)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.1)' }}
                    >
                        RETORNAR AO TERMINAL
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Step 2: Difficulty Selection ───────────────────────────────────────────
function DifficultyScreen({ onConfirm, onOpenConfig }) {
    const [selected, setSelected] = useState('field');
    const diff = DIFFICULTIES[selected];

    return (
        <div style={{
            position: 'relative', width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
        }}>
            {/* Background */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: "url('/assets/images/intro/cover.png')",
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'brightness(0.2) saturate(1.15)',
            }} />
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.7) 60%, transparent)',
            }} />

            <div style={{
                position: 'relative', zIndex: 10,
                width: '100%', maxWidth: '640px',
                padding: '1.5rem',
                overflowY: 'auto', maxHeight: '100%',
                display: 'flex', flexDirection: 'column', gap: '1.25rem',
            }}>
                {/* Title */}
                <div style={{ textAlign: 'center' }}>
                    <h1 className="text-gradient" style={{
                        fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
                        fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em',
                        marginBottom: '0.35rem',
                    }}>
                        INVESTIGADOR GLOBAL
                    </h1>
                    <p style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.18em', color: '#475569', fontSize: '0.68rem' }}>
                        INTERPOL — TERMINAL SEGURO v4.2
                    </p>
                    <div style={{
                        width: '60px', height: '2px', margin: '1rem auto 0',
                        background: 'linear-gradient(to right, transparent, #22d3ee, transparent)',
                    }} />
                </div>

                {/* Section label */}
                {/* Section label and Config Button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1,
                        color: '#475569',
                    }}>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(71,85,105,0.4)' }} />
                        <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', whiteSpace: 'nowrap' }}>
                            Nível de Operação
                        </span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(71,85,105,0.4)' }} />
                    </div>

                    <button
                        onClick={onOpenConfig}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                            padding: '0.4rem 0.6rem', borderRadius: '0.4rem',
                            background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(51,65,85,0.6)',
                            color: '#94a3b8', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase',
                            letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#f8fafc'; e.currentTarget.style.border = '1px solid rgba(148,163,184,0.5)' }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.border = '1px solid rgba(51,65,85,0.6)' }}
                    >
                        <Settings size={14} /> COMO JOGAR
                    </button>
                </div>

                {/* Difficulty cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    {DIFF_LIST.map(d => {
                        const isActive = d.id === selected;
                        return (
                            <button
                                key={d.id}
                                onClick={() => setSelected(d.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    padding: '0.9rem 1.1rem',
                                    borderRadius: '0.85rem',
                                    border: `1px solid ${isActive ? d.border : 'rgba(51,65,85,0.5)'}`,
                                    background: isActive ? d.glow : 'rgba(15,23,42,0.55)',
                                    backdropFilter: 'blur(12px)',
                                    cursor: 'pointer', textAlign: 'left',
                                    fontFamily: 'var(--font-main)',
                                    transition: 'all 0.2s',
                                    boxShadow: isActive ? `0 0 24px ${d.glow}, inset 0 0 12px ${d.glow}` : 'none',
                                    outline: 'none',
                                }}
                            >
                                {/* Icon */}
                                <div style={{
                                    flexShrink: 0, width: '48px', height: '48px',
                                    borderRadius: '0.6rem',
                                    background: isActive ? `${d.color}22` : 'rgba(15,23,42,0.6)',
                                    border: `1px solid ${isActive ? d.border : 'rgba(51,65,85,0.4)'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    transition: 'all 0.2s',
                                }}>
                                    {d.icon}
                                </div>

                                {/* Text */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: isActive ? '#f8fafc' : '#94a3b8' }}>
                                            {d.label}
                                        </span>
                                        <span style={{
                                            fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.1em',
                                            padding: '0.1rem 0.4rem', borderRadius: '0.2rem',
                                            background: `${d.color}20`, color: d.color,
                                            textTransform: 'uppercase',
                                        }}>
                                            {d.badge}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: '#64748b', lineHeight: 1.5 }}>
                                        {d.description}
                                    </div>
                                    {/* Stats row */}
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.45rem' }}>
                                        <span style={{
                                            fontSize: '0.62rem', fontWeight: 700,
                                            padding: '0.15rem 0.5rem', borderRadius: '0.25rem',
                                            background: `${d.color}15`, color: d.color,
                                            border: `1px solid ${d.color}35`,
                                        }}>
                                            ⏱ {d.days} dias
                                        </span>
                                        <span style={{
                                            fontSize: '0.62rem', fontWeight: 700,
                                            padding: '0.15rem 0.5rem', borderRadius: '0.25rem',
                                            background: `${d.color}15`, color: d.color,
                                            border: `1px solid ${d.color}35`,
                                        }}>
                                            🗺️ {d.pathLength + 1} cidades
                                        </span>
                                    </div>
                                </div>

                                {/* Check */}
                                <div style={{
                                    flexShrink: 0, width: '22px', height: '22px',
                                    borderRadius: '50%',
                                    border: `2px solid ${isActive ? d.color : 'rgba(51,65,85,0.6)'}`,
                                    background: isActive ? d.color : 'transparent',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.2s',
                                }}>
                                    {isActive && <span style={{ fontSize: '0.65rem', color: '#fff', fontWeight: 900 }}>✓</span>}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Proceed button */}
                <button
                    onClick={() => onConfirm(diff)}
                    style={{
                        padding: '1rem',
                        borderRadius: '0.8rem', border: 'none',
                        background: `linear-gradient(135deg, ${diff.color}ee, ${diff.color}aa)`,
                        color: '#fff', fontWeight: 900, fontSize: '1rem',
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                        fontFamily: 'var(--font-main)',
                        boxShadow: `0 6px 28px ${diff.glow}`,
                        transition: 'transform 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = ''}
                >
                    PROSSEGUIR — {diff.label}
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}

// ─── Step 2: Mission Briefing ─────────────────────────────────────────────────
function MissionScreen({ gameData, difficulty, onStart, onBack }) {
    if (!gameData || !difficulty) return null;
    const d = difficulty;

    return (
        <div style={{
            position: 'relative', width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            animation: 'fadeIn 0.4s ease',
        }}>
            {/* Background */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: gameData.loot?.image ? `url('${gameData.loot.image}')` : `url('${import.meta.env.BASE_URL}assets/images/intro/cover.png')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'blur(10px) brightness(0.18) saturate(1.3)',
                transform: 'scale(1.1)',
            }} />
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.75) 55%, rgba(15,23,42,0.5) 100%)',
            }} />

            <div style={{
                position: 'relative', zIndex: 10,
                width: '100%', maxWidth: '700px',
                padding: '1.5rem',
                overflowY: 'auto', maxHeight: '100%',
                display: 'flex', flexDirection: 'column', gap: '1.25rem',
            }}>
                {/* Red Alert badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button
                        onClick={onBack}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                            color: '#64748b', fontSize: '0.72rem', fontWeight: 600,
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontFamily: 'var(--font-main)',
                            transition: 'color 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                        onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                    >
                        <ArrowLeft size={14} /> Voltar
                    </button>

                    <div className="animate-flash" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        padding: '0.3rem 0.9rem',
                        border: '2px solid #ef4444', borderRadius: '0.25rem',
                        background: 'rgba(239,68,68,0.12)',
                        color: '#f87171', fontWeight: 900, fontSize: '0.68rem',
                        letterSpacing: '0.25em', textTransform: 'uppercase',
                    }}>
                        ⚠ ALERTA VERMELHO ⚠
                    </div>

                    {/* Difficulty level badge */}
                    <div style={{
                        padding: '0.3rem 0.75rem',
                        borderRadius: '0.35rem',
                        background: `${d.color}18`,
                        border: `1px solid ${d.border}`,
                        color: d.color, fontWeight: 700, fontSize: '0.6rem',
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>
                        {d.icon} {d.badge}
                    </div>
                </div>

                {/* Main dossier card */}
                <div style={{
                    background: 'rgba(10,15,28,0.88)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(239,68,68,0.35)',
                    borderRadius: '1rem', overflow: 'hidden',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(239,68,68,0.1)',
                }}>
                    {/* Card header */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.7rem 1.15rem',
                        background: 'rgba(239,68,68,0.1)',
                        borderBottom: '1px solid rgba(239,68,68,0.2)',
                        color: '#f87171',
                    }}>
                        <AlertTriangle size={15} />
                        <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.65rem' }}>
                            Dossiê da Missão — CONFIDENCIAL
                        </span>
                    </div>

                    {/* Content: image + details side by side */}
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {/* Loot image panel */}
                        <div style={{
                            position: 'relative',
                            flex: '0 0 auto',
                            width: 'clamp(160px, 35%, 240px)',
                            minHeight: '200px',
                            background: '#02061a',
                            overflow: 'hidden',
                        }}>
                            {gameData.loot?.image && (
                                <img
                                    src={gameData.loot.image}
                                    alt={gameData.loot.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '200px', maxHeight: '260px', display: 'block', opacity: 0.92 }}
                                />
                            )}
                            <div style={{
                                position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                                background: 'linear-gradient(to top, rgba(10,15,28,0.98), transparent)',
                            }} />
                            <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.85rem' }}>
                                <div style={{ fontSize: '0.52rem', color: '#f87171', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.15rem' }}>
                                    Artefato Roubado
                                </div>
                                <div style={{ fontSize: '1rem', fontWeight: 900, color: '#f8fafc', lineHeight: 1.2 }}>
                                    {gameData.loot?.name}
                                </div>
                            </div>
                        </div>

                        {/* Text panel */}
                        <div style={{
                            flex: '1 1 200px', padding: '1.15rem',
                            display: 'flex', flexDirection: 'column', gap: '0.85rem',
                        }}>
                            <div>
                                <div style={{ fontSize: '0.6rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.4rem' }}>
                                    Relatório da Missão
                                </div>
                                <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.65 }}>
                                    O artefato foi subtraído com precisão cirúrgica. Nossa análise de inteligência indica que o suspeito utiliza rotas internacionais clandestinas para escapar da jurisdição.
                                </p>
                            </div>

                            <div>
                                <div style={{ fontSize: '0.6rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.4rem' }}>
                                    Parâmetros da Operação
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    {[
                                        { Icon: Clock, label: 'Prazo máximo', val: `${d.days} dias` },
                                        { Icon: MapIcon, label: 'Cidades na rota', val: `${d.pathLength + 1} destinos` },
                                        { Icon: Shield, label: 'Nível de operação', val: d.label },
                                    ].map(({ Icon, label, val }) => (
                                        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <Icon size={13} color={d.color} style={{ flexShrink: 0 }} />
                                            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{label}:</span>
                                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: d.color }}>{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ width: '100%', height: '1px', background: 'rgba(51,65,85,0.5)' }} />

                            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.65 }}>
                                <strong style={{ color: '#22d3ee' }}>Investigue</strong> locais suspeitos,{' '}
                                <strong style={{ color: '#22d3ee' }}>viaje</strong> pelo globo e{' '}
                                <strong style={{ color: '#22d3ee' }}>emita o mandado correto</strong>{' '}
                                antes que o rastro desapareça.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{
                        padding: '0.5rem', borderTop: '1px solid rgba(51,65,85,0.4)',
                        textAlign: 'center', fontSize: '0.56rem',
                        fontFamily: 'var(--font-mono)', color: '#334155', letterSpacing: '0.15em',
                    }}>
                        CLASSIFICAÇÃO: ALTO SECRETO — ACESSO RESTRITO A AGENTES AUTORIZADOS
                    </div>
                </div>

                {/* Accept CTA */}
                <button
                    onClick={onStart}
                    style={{
                        padding: '1rem 1.5rem',
                        borderRadius: '0.8rem', border: 'none',
                        background: 'linear-gradient(135deg, #0891b2, #2563eb)',
                        color: '#fff', fontWeight: 900, fontSize: '1.05rem',
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                        fontFamily: 'var(--font-main)',
                        boxShadow: '0 6px 28px rgba(8,145,178,0.4)',
                        transition: 'transform 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(8,145,178,0.55)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 28px rgba(8,145,178,0.4)'; }}
                >
                    <Shield size={24} />
                    ACEITAR MISSÃO
                </button>
            </div>
        </div>
    );
}

// ─── Main export: orchestrates all steps ────────────────────────────────────
export function IntroView({ gameData, difficulty, onPreview, onStart }) {
    const [step, setStep] = useState('splash'); // 'splash' | 'config' | 'difficulty' | 'mission'

    const handleConfirmDifficulty = (chosenDiff) => {
        onPreview(chosenDiff); // generates mission with chosen difficulty
        setStep('mission');
    };

    if (step === 'splash') {
        return <SplashScreen onDone={() => setStep('difficulty')} />;
    }

    if (step === 'config') {
        return <ConfigScreen onBack={() => setStep('difficulty')} />;
    }

    if (step === 'mission') {
        return (
            <MissionScreen
                gameData={gameData}
                difficulty={difficulty}
                onStart={onStart}
                onBack={() => setStep('difficulty')}
            />
        );
    }

    return <DifficultyScreen onConfirm={handleConfirmDifficulty} onOpenConfig={() => setStep('config')} />;
}
