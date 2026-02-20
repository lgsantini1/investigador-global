import { useEffect, useRef, useCallback, useState } from 'react';

export function useAudio() {
    const bgmRef = useRef(new Audio());
    const sfxRef = useRef(new Audio());
    const pendingTrackRef = useRef(null); // track requested before user interaction
    const [isMuted, setIsMuted] = useState(false);
    const isMutedRef = useRef(false); // ref for use inside callbacks

    useEffect(() => {
        bgmRef.current.loop = true;
        bgmRef.current.volume = 0.3;
        sfxRef.current.volume = 0.6;

        // If autoplay was blocked, a click anywhere will trigger the pending track
        const handleFirstInteraction = () => {
            if (pendingTrackRef.current && !isMutedRef.current) {
                bgmRef.current.play().catch(() => { });
            }
        };
        document.addEventListener('click', handleFirstInteraction, { once: true });

        return () => {
            bgmRef.current.pause();
            sfxRef.current.pause();
            document.removeEventListener('click', handleFirstInteraction);
        };
    }, []);

    const playBGM = useCallback((trackName) => {
        if (!trackName) {
            bgmRef.current.pause();
            return;
        }

        pendingTrackRef.current = trackName;

        // If the same track is already loaded, just ensure it's playing
        if (bgmRef.current.src.includes(trackName)) {
            if (!isMutedRef.current && bgmRef.current.paused) {
                bgmRef.current.play().catch(() => { });
            }
            return;
        }

        bgmRef.current.src = `${import.meta.env.BASE_URL}assets/audio/${trackName}.mp3`;

        if (!isMutedRef.current) {
            bgmRef.current.play().catch(() => {
                // autoplay blocked — will resume on next user interaction via the listener
            });
        }
    }, []);

    const stopBGM = useCallback(() => {
        pendingTrackRef.current = null;
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
    }, []);

    const playSFX = useCallback((soundName) => {
        if (isMutedRef.current) return;
        sfxRef.current.src = `${import.meta.env.BASE_URL}assets/audio/${soundName}.mp3`;
        sfxRef.current.play().catch(() => { });
    }, []);

    const toggleMute = useCallback(() => {
        const nowMuted = !isMutedRef.current;
        isMutedRef.current = nowMuted;
        setIsMuted(nowMuted);

        if (nowMuted) {
            bgmRef.current.pause();
            sfxRef.current.pause();
        } else {
            // Resume the pending track if there is one
            if (pendingTrackRef.current) {
                bgmRef.current.play().catch(() => { });
            }
        }
    }, []);

    return { playBGM, stopBGM, playSFX, toggleMute, isMuted };
}
