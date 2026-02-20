import { X, AlertTriangle, ShieldCheck } from 'lucide-react';

export function Modal({ modal, onClose }) {
    if (!modal) return null;

    const colors = {
        danger: { border: 'rgba(239,68,68,0.5)', icon: '#f87171', glow: 'rgba(239,68,68,0.15)' },
        success: { border: 'rgba(16,185,129,0.5)', icon: '#34d399', glow: 'rgba(16,185,129,0.15)' },
        info: { border: 'rgba(34,211,238,0.5)', icon: '#22d3ee', glow: 'rgba(34,211,238,0.15)' },
    };
    const c = colors[modal.type] || colors.info;

    const IconComp = modal.type === 'danger' ? AlertTriangle : modal.type === 'success' ? ShieldCheck : null;

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 999,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1rem',
                background: 'rgba(0,0,0,0.75)',
                backdropFilter: 'blur(6px)',
                animation: 'fadeIn 0.2s ease',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    width: '100%', maxWidth: '520px',
                    background: 'rgba(15,23,42,0.95)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${c.border}`,
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: `0 24px 60px rgba(0,0,0,0.8), 0 0 0 1px ${c.glow}`,
                    animation: 'slideUp 0.25s ease',
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.85rem 1.25rem',
                    background: 'rgba(30,41,59,0.6)',
                    borderBottom: '1px solid rgba(51,65,85,0.6)',
                }}>
                    <h3 style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        fontWeight: 700, fontSize: '0.8rem',
                        textTransform: 'uppercase', letterSpacing: '0.12em',
                        color: '#f8fafc', margin: 0,
                    }}>
                        {IconComp && <IconComp size={16} color={c.icon} />}
                        {modal.title}
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: '#64748b', padding: '0.25rem', borderRadius: '0.25rem',
                            display: 'flex', alignItems: 'center',
                            transition: 'color 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#f8fafc'}
                        onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div
                    style={{ padding: '1.5rem', textAlign: 'center', fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.7 }}
                    dangerouslySetInnerHTML={{ __html: modal.msg }}
                />

                {/* Footer */}
                <div style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid rgba(51,65,85,0.5)', background: 'rgba(15,23,42,0.5)' }}>
                    <button
                        onClick={onClose}
                        style={{
                            width: '100%',
                            padding: '0.7rem',
                            borderRadius: '0.6rem',
                            border: '1px solid rgba(51,65,85,0.8)',
                            background: 'rgba(30,41,59,0.8)',
                            color: '#f8fafc',
                            fontWeight: 700, fontSize: '0.8rem',
                            textTransform: 'uppercase', letterSpacing: '0.12em',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-main)',
                            transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(51,65,85,0.9)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(30,41,59,0.8)'}
                    >
                        CONTINUAR
                    </button>
                </div>
            </div>
        </div>
    );
}
