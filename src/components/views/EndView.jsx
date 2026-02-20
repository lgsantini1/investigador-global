import { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export function EndView({ modal, onRestart, gameData }) {
    const isSuccess = modal?.type === 'success';
    // 'cutscene' shows the video animation, 'results' shows the object
    const [phase, setPhase] = useState(isSuccess ? 'cutscene' : 'results');

    useEffect(() => {
        if (phase === 'cutscene') {
            const timer = setTimeout(() => {
                setPhase('results');
            }, 5500); // 5.5 seconds cutscene
            return () => clearTimeout(timer);
        }
    }, [phase]);

    // Internal StyleSheet for the Cutscene Animations
    useEffect(() => {
        if (!document.getElementById('endview-animations')) {
            const style = document.createElement('style');
            style.id = 'endview-animations';
            style.innerHTML = `
                @keyframes slow-pan {
                    0% { transform: scale(1.05) translate(0, 0); }
                    100% { transform: scale(1.2) translate(-2%, 2%); }
                }
                @keyframes police-flash {
                    0%, 100% { background: rgba(239, 68, 68, 0.45); } /* Red */
                    50% { background: rgba(59, 130, 246, 0.45); } /* Blue */
                }
                @keyframes glitch-in {
                    0% { transform: translateX(-100px) skewX(20deg); opacity: 0; filter: blur(10px); }
                    60% { transform: translateX(10px) skewX(-10deg); opacity: 1; filter: contrast(1.5) drop-shadow(0 0 10px red); }
                    100% { transform: translateX(0) skewX(0); opacity: 1; filter: none; }
                }
                @keyframes stamp-down {
                    0% { transform: scale(3) rotate(-15deg); opacity: 0; }
                    50% { transform: scale(0.8) rotate(-5deg); opacity: 1; }
                    100% { transform: scale(1) rotate(-5deg); opacity: 1; box-shadow: 0 0 30px rgba(239,68,68,0.8); }
                }
                @keyframes fade-out {
                    0% { opacity: 1; }
                    100% { opacity: 0; }
                }
                @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    // ─── PHASE 1: CUTSCENE (Simulating a Video) ───
    if (phase === 'cutscene') {
        return (
            <div style={{
                position: 'fixed', inset: 0,
                background: '#000', overflow: 'hidden', zIndex: 100,
                animation: 'fade-out 0.5s ease 5s forwards' // Fades out exactly at the end
            }}>
                {/* Background City Image panning */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${gameData.city.arrestBg})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    animation: 'slow-pan 5.5s ease-out forwards'
                }} />

                {/* Strobe Police Lights Overlay */}
                <div style={{
                    position: 'absolute', inset: 0, mixBlendMode: 'overlay',
                    animation: 'police-flash 0.6s infinite'
                }} />

                {/* Dark Vignette */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.9) 100%)' }} />

                {/* Villain Character Sliding In */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, bottom: 0, width: '60%',
                    backgroundImage: `url(${gameData.villain.image})`,
                    backgroundSize: 'cover', backgroundPosition: 'top center',
                    maskImage: 'linear-gradient(to right, black 50%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 50%, transparent 100%)',
                    animation: 'glitch-in 0.8s ease-out 0.5s both'
                }} />

                {/* CAPTURED Stamp */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}>
                    <div style={{
                        background: 'rgba(239,68,68,0.95)', color: 'white',
                        padding: '1rem 3rem', fontWeight: 900, fontSize: '3.5rem',
                        letterSpacing: '0.3em',
                        border: '6px solid white', borderRadius: '8px',
                        textShadow: '0 4px 10px rgba(0,0,0,0.5)',
                        animation: 'stamp-down 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2s both'
                    }}>
                        CAPTURADO
                    </div>
                </div>
            </div>
        );
    }

    // ─── PHASE 2: RESULTS (Recovered Object) ───
    return (
        <div style={{
            position: 'fixed', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
            background: '#0f172a',
            backgroundImage: isSuccess && gameData?.city?.arrestBg ? `url(${gameData.city.arrestBg})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'fade-in 0.8s ease',
            zIndex: 100
        }}>
            {/* Dark overlay for readability */}
            {isSuccess && <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)' }} />}

            {/* If success, subtle villain shadow in background */}
            {isSuccess && gameData?.villain?.image && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, bottom: 0, width: '45%',
                    backgroundImage: `url(${gameData.villain.image})`,
                    backgroundSize: 'cover', backgroundPosition: 'top center',
                    maskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
                    opacity: 0.15, pointerEvents: 'none'
                }} />
            )}

            <div style={{
                width: '100%', maxWidth: '480px',
                background: 'rgba(15,23,42,0.9)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${isSuccess ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
                borderRadius: '1.25rem',
                overflow: 'hidden',
                boxShadow: `0 24px 64px rgba(0,0,0,0.7), 0 0 80px ${isSuccess ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)'}`,
                position: 'relative',
                zIndex: 10,
            }}>
                <div style={{
                    position: 'absolute', top: '-60%', left: '50%', transform: 'translateX(-50%)',
                    width: '300px', height: '300px', borderRadius: '50%',
                    background: isSuccess ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                    filter: 'blur(40px)', pointerEvents: 'none',
                }} />

                <div style={{ padding: '2.5rem 2rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
                    <div style={{
                        width: '80px', height: '80px',
                        margin: '0 auto 1.5rem',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: isSuccess ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                        color: isSuccess ? '#34d399' : '#f87171',
                        boxShadow: `0 0 40px ${isSuccess ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                    }}>
                        {isSuccess ? <ShieldCheck size={44} /> : <ShieldAlert size={44} />}
                    </div>

                    <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
                        {modal?.title}
                    </h1>

                    <div
                        style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '2rem' }}
                        dangerouslySetInnerHTML={{ __html: modal?.msg }}
                    />

                    <button
                        onClick={onRestart}
                        style={{
                            width: '100%',
                            padding: '0.9rem 1.5rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            background: 'linear-gradient(135deg, #0891b2, #2563eb)',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            cursor: 'pointer',
                            boxShadow: '0 4px 20px rgba(8,145,178,0.35)',
                            fontFamily: 'var(--font-main)',
                            transition: 'transform 0.15s, box-shadow 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(8,145,178,0.5)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(8,145,178,0.35)'; }}
                    >
                        JOGAR NOVAMENTE
                    </button>
                </div>
            </div>
        </div>
    );
}
