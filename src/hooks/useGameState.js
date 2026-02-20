import { useState, useCallback, useEffect } from 'react';
import { CITIES, VILLAINS, LOOT, DIFFICULTIES, DAY_COST_INVESTIGATE, DAY_COST_TRAVEL } from '../config/gameData';

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

export function useGameState() {
    const [status, setStatus] = useState("INTRO"); // INTRO, PLAYING, END
    const [view, setView] = useState("INVESTIGATE"); // INVESTIGATE, TRAVEL, DATA
    const [modal, setModal] = useState(null); // { title, msg, type }
    const [gameData, setGameData] = useState(null);
    const [difficulty, setDifficulty] = useState(DIFFICULTIES.field); // rookie | field | elite
    const [params, setParams] = useState({ gender: "", hair: "", auto: "", feature: "" });
    const [visitedCities, setVisitedCities] = useState([]);
    const [travelAnimation, setTravelAnimation] = useState({ active: false, from: null, to: null, progress: 0 });

    const generateMission = useCallback((diff) => {
        const d = diff || DIFFICULTIES.field;
        const cityKeys = Object.keys(CITIES);
        const startCityKey = pick(cityKeys);
        const villain = pick(VILLAINS);

        const otherCities = cityKeys.filter(c => c !== startCityKey);
        const pathLength = Math.min(d.pathLength, otherCities.length);
        const path = [startCityKey, ...shuffle(otherCities).slice(0, pathLength)];

        setParams({ gender: "", hair: "", auto: "", feature: "" });
        setModal(null);
        setVisitedCities([startCityKey]);
        setTravelAnimation({ active: false, from: null, to: null, progress: 0 });

        setGameData({
            villain,
            loot: pick(LOOT),
            path,
            currentStep: 0,
            days: d.days,
            clueChance: d.clueChance,
            city: CITIES[startCityKey],
            cityLogs: []
        });
    }, []);

    // Pre-generate a default mission on mount so IntroView can preview the loot
    useState(() => {
        generateMission(DIFFICULTIES.field);
    });

    // Called when player confirms difficulty — generates mission for the briefing screen
    const previewMission = useCallback((chosenDifficulty) => {
        const d = chosenDifficulty || DIFFICULTIES.field;
        setDifficulty(d);
        generateMission(d);
    }, [generateMission]);

    // Called when player clicks "ACEITAR MISSÃO" — just flips to PLAYING
    const startGame = useCallback(() => {
        setStatus("PLAYING");
        setView("INVESTIGATE");
    }, []);

    const restartGame = useCallback(() => {
        // Go back to INTRO so player can pick difficulty again
        setGameData(null);
        setStatus("INTRO");
    }, []);

    const getMatches = useCallback(() => {
        return VILLAINS.filter(v =>
            (!params.gender || v.gender === params.gender) &&
            (!params.hair || v.hair === params.hair) &&
            (!params.auto || v.auto === params.auto) &&
            (!params.feature || v.feature === params.feature)
        );
    }, [params]);

    const investigate = useCallback((place) => {
        if (!gameData || gameData.days <= 0) return;

        const { city, path, currentStep, villain } = gameData;
        const correctCityKey = path[currentStep];
        const isCorrectLocation = city.name === CITIES[correctCityKey]?.name;
        const isFinalCity = currentStep === path.length - 1;
        const nextCityKey = path[currentStep + 1];

        let msg = "";
        let isClue = false;

        if (!isCorrectLocation) {
            const randomMsg = [
                "Não vi ninguém com essa descrição.",
                "Sou novo na cidade, não conheço ninguém.",
                "Desculpe, estou com pressa."
            ];
            msg = pick(randomMsg);
        } else if (isFinalCity) {
            msg = "Cuidado! Vi alguém muito suspeito rondando por aqui agora mesmo! Parece estar nervoso.";
            isClue = true;
        } else {
            const nextCity = CITIES[nextCityKey];
            const clueChance = gameData.clueChance ?? 0.6;
            const roll = Math.random();

            if (roll < clueChance) {
                // Geographic / cultural clue — logic reflects difficulty
                const types = ["geo", "landmark", "culture"];
                const diffLevel = gameData.difficulty || 'field';
                msg = nextCity.nextClues[diffLevel][pick(types)];
            } else {
                // Villain trait clue — requires cross-referencing the data screen
                const diffLevel = gameData.difficulty || 'field';
                let traits = [];

                // Subtle behavioral clues mapped per villain (never mention the trait directly)
                const behaviorClues = {
                    "Carmen Vermelha": {
                        field: ["Não pediu ajuda de ninguém, mesmo perdida.", "Recusou o cardápio e pediu pelo nome exato do prato."],
                        elite: ["Os garçons comentaram que deixou a conta sem assinar, como se o lugar não merecesse sua assinatura.", `Algo ficou esquecido na mesa — ${villain.quirk}`]
                    },
                    "Barão Bomba": {
                        field: ["Bateu o punho na mesa ao discutir o preço.", "Exigiu ser atendido antes de todos os outros clientes."],
                        elite: ["Insistia que todos à volta se referissem a ele por algum título que ninguém reconheceu.", `Chamou a atenção: ${villain.quirk}`]
                    },
                    "Lady Lâmina": {
                        field: ["Mudou de mesa três vezes sem explicação aparente.", "Saiu pela entrada dos fundos, mesmo sem precisar."],
                        elite: ["Ninguém conseguiu prever qual rua ela tomou. Desapareceu entre dois batimentos de cílios.", `Notei algo incomum que ela deixou cair: ${villain.quirk}`]
                    },
                    "Dr. Dados": {
                        field: ["Usava luvas mesmo dentro do restaurante.", "Pediu para limpar a mesa antes de sentar, e depois de sentar também."],
                        elite: ["Foi embora abruptamente porque alguém encostou em sua mala sem avisar.", `Alguém me disse que ela tinha esse hábito estranho: ${villain.quirk}`]
                    },
                    "Condessa Code": {
                        field: ["Ficou tirando fotos de tudo ao redor com um sorriso deliberado.", "Comentou em voz alta quantas pessoas estavam olhando para ela."],
                        elite: ["Pediu para reposicionar uma escultura só para ficar melhor na foto dela.", `O mais estranho: ${villain.quirk}`]
                    }
                };

                const villainBehavior = behaviorClues[villain.name];

                if (diffLevel === 'rookie') {
                    traits = [
                        `Tinha cabelos ${villain.hair}.`,
                        `Chegou dirigindo um(a) ${villain.auto}.`,
                        `O suspeito era do gênero ${villain.gender}.`
                    ];
                } else if (diffLevel === 'field' && villainBehavior) {
                    traits = [
                        `Chegou dirigindo um(a) ${villain.auto}.`,
                        `Notei que usava um(a) ${villain.feature}.`,
                        ...villainBehavior.field
                    ];
                } else if (villainBehavior) { // elite
                    traits = [
                        `Notei que usava um(a) ${villain.feature}.`,
                        ...villainBehavior.elite
                    ];
                } else {
                    traits = [`Notei que usava um(a) ${villain.feature}.`];
                }

                msg = pick(traits);
            }
            isClue = true;
        }

        setModal({
            title: isClue ? `PISTA ENCONTRADA: ${place}` : `INVESTIGAÇÃO: ${place}`,
            msg: `"${msg}"`,
            type: isClue ? "success" : "info"
        });

        setGameData(prev => ({
            ...prev,
            days: Math.max(0, prev.days - DAY_COST_INVESTIGATE),
            cityLogs: [{ place, text: msg, isClue }, ...prev.cityLogs]
        }));
    }, [gameData]);

    const startTravelAnimation = useCallback((destKey, onComplete) => {
        if (!gameData || travelAnimation.active) return;

        const fromCity = gameData.city.name;

        setTravelAnimation({
            active: true,
            from: fromCity,
            to: destKey,
            progress: 0
        });

        setView("TRAVEL");

        // We can simulate the progress in the Hook or handle it in the component.
        // Handling in the hook for simplicity
        let progress = 0;
        const interval = setInterval(() => {
            progress += 0.03;
            setTravelAnimation(prev => ({ ...prev, progress: Math.min(progress, 1) }));

            if (progress >= 1) {
                clearInterval(interval);
                onComplete(destKey);
            }
        }, 50);
    }, [gameData, travelAnimation.active]);

    const completeTravel = useCallback((destKey) => {
        setGameData(prev => {
            const nextData = { ...prev };
            if (nextData.days < DAY_COST_TRAVEL) {
                nextData.days = 0;
            }

            const nextCorrectCity = nextData.path[nextData.currentStep + 1];
            if (destKey === nextCorrectCity) {
                nextData.currentStep++;
            }

            nextData.city = CITIES[destKey];
            nextData.days = Math.max(0, nextData.days - DAY_COST_TRAVEL);
            nextData.cityLogs = [];
            return nextData;
        });

        setVisitedCities(prev => {
            if (!prev.includes(destKey)) return [...prev, destKey];
            return prev;
        });

        setView("INVESTIGATE");
        setTravelAnimation({ active: false, from: null, to: null, progress: 0 });
    }, []);

    const travel = useCallback((destKey) => {
        startTravelAnimation(destKey, completeTravel);
    }, [startTravelAnimation, completeTravel]);

    // Accept the filtered suspect directly from DataView so we don't depend on stale hook params
    const issueWarrant = useCallback((suspect) => {
        if (!suspect) {
            setModal({ title: "ERRO DE DADOS", msg: "Nenhum suspeito selecionado.", type: "danger" });
            return;
        }

        if (suspect.name !== gameData.villain.name) {
            setModal({ title: "MANDADO INVÁLIDO", msg: "Você emitiu o mandado para a pessoa errada!", type: "danger" });
        } else if (gameData.currentStep === gameData.path.length - 1) {
            setStatus("END");
            setModal({
                title: "MISSÃO CUMPRIDA!",
                msg: `Parabéns Detetive! Você capturou ${suspect.name} e recuperou ${gameData.loot.name}. O Investigador Global agradece seu serviço.<br><br><img src="${gameData.loot.image}" style="max-height: 200px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);" />`,
                type: "success"
            });
        } else {
            setModal({
                title: "MANDADO CONFIRMADO",
                msg: `Mandado para ${suspect.name} está ativo. Agora encontre onde ${suspect.gender === 'Feminino' ? 'ela' : 'ele'} está escondido(a)!`,
                type: "success"
            });
        }
    }, [gameData]);

    const updateParam = useCallback((key, value) => {
        setParams(prev => ({ ...prev, [key]: value }));
    }, []);

    const closeModal = useCallback(() => {
        setModal(null);
    }, []);

    // Check for Game Over condition (time's up)
    useEffect(() => {
        if (status === "PLAYING" && gameData && gameData.days <= 0) {
            setStatus("END");
            setModal({
                title: "TEMPO ESGOTADO!",
                msg: `O prazo da Interpol chegou ao fim e você perdeu o rastro. O suspeito escapou com ${gameData.loot.name} e você foi afastado do caso.`,
                type: "danger"
            });
        }
    }, [gameData?.days, status]);

    return {
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
    };
}
