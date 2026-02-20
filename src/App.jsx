import { useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { useAudio } from './hooks/useAudio';
import { IntroView } from './components/views/IntroView';
import { InvestigateView } from './components/views/InvestigateView';
import { TravelView } from './components/views/TravelView';
import { DataView } from './components/views/DataView';
import { EndView } from './components/views/EndView';
import { Modal } from './components/Modal';
import { Search, Globe, Database, Map as MapIcon, Volume2, VolumeX } from 'lucide-react';

// Floating mute/unmute button — renders on top of everything
function MuteButton({ isMuted, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={isMuted ? 'Ativar som' : 'Silenciar'}
      style={{
        position: 'fixed', bottom: '4.5rem', right: '1rem',
        zIndex: 999,
        width: '38px', height: '38px',
        borderRadius: '50%',
        border: '1px solid rgba(51,65,85,0.8)',
        background: isMuted ? 'rgba(239,68,68,0.15)' : 'rgba(15,23,42,0.75)',
        backdropFilter: 'blur(12px)',
        color: isMuted ? '#f87171' : '#94a3b8',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: isMuted ? '0 0 12px rgba(239,68,68,0.3)' : '0 2px 8px rgba(0,0,0,0.4)',
      }}
      onMouseEnter={e => e.currentTarget.style.color = isMuted ? '#fca5a5' : '#f8fafc'}
      onMouseLeave={e => e.currentTarget.style.color = isMuted ? '#f87171' : '#94a3b8'}
    >
      {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
    </button>
  );
}

function App() {
  const {
    status,
    view,
    modal,
    gameData,
    difficulty,
    params,
    visitedCities,
    travelAnimation,
    getMatches,
    startGame,
    previewMission,
    restartGame,
    investigate,
    travel,
    issueWarrant,
    updateParam,
    closeModal,
    setView
  } = useGameState();

  const { playBGM, playSFX, stopBGM, toggleMute, isMuted } = useAudio();

  useEffect(() => {
    if (status === 'INTRO') {
      playBGM('suspense_intro');
    } else if (status === 'PLAYING') {
      if (view === 'TRAVEL' && travelAnimation?.active) {
        playSFX('airplane_flight');
      } else {
        const track = gameData?.city?.bgm || 'suspense_intro';
        playBGM(track);
      }
    } else if (status === 'END') {
      stopBGM();
    }
  }, [status, view, travelAnimation?.active, gameData?.city?.bgm, playBGM, playSFX, stopBGM]);

  // onPreview: generates the mission AND (re)starts intro music after user interaction
  const handlePreview = (chosenDiff) => {
    previewMission(chosenDiff);
    playBGM('suspense_intro'); // user just clicked — autoplay now allowed
  };

  const renderView = () => {
    switch (view) {
      case 'INVESTIGATE': return <InvestigateView gameData={gameData} onInvestigate={investigate} />;
      case 'TRAVEL': return <TravelView gameData={gameData} visitedCities={visitedCities} travelAnimation={travelAnimation} onTravel={travel} />;
      case 'DATA': return <DataView gameData={gameData} issueWarrant={issueWarrant} />;
      default: return null;
    }
  };

  // ─── INTRO / END ─────────────────────────────────────────────────────
  if (status === 'INTRO') {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#0f172a', overflow: 'hidden' }}>
        <IntroView
          gameData={gameData}
          difficulty={difficulty}
          onPreview={handlePreview}
          onStart={startGame}
        />
        <MuteButton isMuted={isMuted} onToggle={toggleMute} />
      </div>
    );
  }

  if (status === 'END') {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#0f172a', overflow: 'hidden' }}>
        <EndView modal={modal} onRestart={restartGame} gameData={gameData} />
        <MuteButton isMuted={isMuted} onToggle={toggleMute} />
      </div>
    );
  }

  // ─── PLAYING ─────────────────────────────────────────────────────────
  if (!gameData) return null;
  const { city, days, path, currentStep } = gameData;

  const navItems = [
    { id: 'INVESTIGATE', label: 'PISTAS', Icon: Search, activeColor: 'var(--color-primary)' },
    { id: 'TRAVEL', label: 'VIAJAR', Icon: Globe, activeColor: 'var(--color-accent)' },
    { id: 'DATA', label: 'DADOS', Icon: Database, activeColor: 'var(--color-success)' },
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      background: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'var(--font-main)',
      overflow: 'hidden',
    }}>
      {/* ── Cinematic background ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {city.image ? (
          <>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${city.image})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'blur(0px) brightness(0.72)',
              transform: 'scale(1.01)',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a 5%, rgba(15,23,42,0.38) 50%, rgba(15,23,42,0.15) 100%)' }} />
          </>
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, #1e293b 0%, #0f172a 70%)' }} />
        )}
      </div>

      {/* ── Header HUD ── */}
      <header style={{
        position: 'relative', zIndex: 20,
        flexShrink: 0,
        background: 'rgba(15,23,42,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(51,65,85,0.6)',
        padding: '0.75rem 1rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          {/* City info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
              <MapIcon size={12} color="var(--color-primary)" />
              <span style={{ fontSize: '0.6rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Local Atual</span>
              {difficulty && (
                <span style={{
                  fontSize: '0.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                  padding: '0.1rem 0.4rem', borderRadius: '0.2rem',
                  background: `${difficulty.color}22`, color: difficulty.color,
                  border: `1px solid ${difficulty.color}44`,
                }}>
                  {difficulty.badge}
                </span>
              )}
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.15 }}>
              {city.name}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)', marginTop: '0.1rem' }}>
              {city.country}
            </div>
          </div>

          {/* Days & progress */}
          <div style={{ flexShrink: 0, textAlign: 'right' }}>
            <div style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.2rem' }}>
              Prazo
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '1.4rem', lineHeight: 1,
              color: days <= 2 ? '#f87171' : '#34d399',
            }}>
              {Number.isInteger(days) ? `${days}.0` : days.toFixed(1)}
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', marginLeft: '0.3rem' }}>DIAS</span>
            </div>
            {/* Step tracker dots */}
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end', marginTop: '0.35rem' }}>
              {path.map((_, idx) => {
                const active = idx === currentStep;
                const done = idx < currentStep;
                return (
                  <div key={idx} style={{
                    height: '6px',
                    borderRadius: '3px',
                    width: active ? '18px' : '6px',
                    background: active ? '#22d3ee' : done ? '#10b981' : '#334155',
                    boxShadow: active ? '0 0 8px rgba(34,211,238,0.6)' : 'none',
                    transition: 'all 0.3s',
                  }} />
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* ── Scrollable content area ── */}
      <main style={{
        position: 'relative', zIndex: 10,
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
        padding: '1rem',
        paddingBottom: '5.5rem',
      }}>
        {renderView()}
      </main>

      {/* ── Bottom Navigation ── */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 30,
        background: 'rgba(15,23,42,0.92)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(51,65,85,0.6)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.4)',
        height: '60px',
        display: 'flex',
        alignItems: 'stretch',
      }}>
        <div style={{ display: 'flex', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          {navItems.map(({ id, label, Icon, activeColor }, i) => {
            const isActive = view === id;
            return (
              <>
                {i > 0 && (
                  <div key={`sep-${i}`} style={{ width: '1px', background: 'rgba(51,65,85,0.6)', flexShrink: 0 }} />
                )}
                <button
                  key={id}
                  onClick={() => setView(id)}
                  style={{
                    flex: 1,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: '3px',
                    color: isActive ? activeColor : '#64748b',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    fontFamily: 'var(--font-main)',
                  }}
                >
                  <Icon size={20} />
                  <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em' }}>{label}</span>
                  {isActive && (
                    <div style={{
                      position: 'absolute', bottom: 0,
                      width: '32px', height: '2px',
                      background: activeColor,
                      borderRadius: '2px 2px 0 0',
                      boxShadow: `0 0 8px ${activeColor}`,
                    }} />
                  )}
                </button>
              </>
            );
          })}
        </div>
      </nav>

      <Modal modal={modal} onClose={closeModal} />
      <MuteButton isMuted={isMuted} onToggle={toggleMute} />
    </div>
  );
}

export default App;
