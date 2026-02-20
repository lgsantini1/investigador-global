# 🕵️‍♂️ Investigador Global

Bem-vindo ao **Investigador Global**, um jogo web de dedução e perseguição inspirado em clássicos de investigação criminal. Assuma o papel de um agente da Interpol, viaje pelo mundo, interrogue testemunhas e desvende a identidade e o paradeiro de mentes criminosas geniais antes que o tempo acabe.

## 🎯 Objetivo do Jogo
Um artefato inestimável foi roubado. Sua missão é:
1. Começar a investigação na cena do crime.
2. Interrogar testemunhas em diversos locais da tela `PISTAS`.
3. Usar seus conhecimentos básicos de geografia, história e cultura global para deduzir em qual cidade o suspeito se escondeu e viajar até lá.
4. Coletar e cruzar pistas sobre a aparência, o veículo e o comportamento do vilão.
5. Inserir essas características na área de `DADOS` da Interpol para reduzir a lista de suspeitos.
6. Acessar o Dossiê das mentes criminosas e emitir um **Mandado de Prisão** contra o verdadeiro culpado.
7. Chegar ao destino final e capturá-lo antes do prazo de (dias) da missão estourar! O menor deslize pode fazer você perder a rota inteira.

## 🌟 Funcionalidades
* **Geração Procedural de Missões:** Cada partida combina cidades iniciais, rotas, suspeitos e artefatos de forma aleatória — nunca é a mesma perseguição duas vezes.
* **Sistema de Dificuldades (Rookie, Field, Elite):** Dificuldades mais intensas diminuem o limite de dias e mudam do uso de pistas visuais explícitas para indicações de comportamento implícitas, te forçando a deduzir a identidade a partir da Lore/História do suspeito nos dossiês.
* **Mecânica de Game Over:** Viagens incorretas ou tempo estourado interrompem sua missão com uma tela vermelha implacável — o criminoso escapa com o item.
* **Sistema de Áudio Dinâmico imersivo:** Trilha sonora envolvente estilo *Synthwave/Spy* cujo tema muda conforma você explora as cidades ao redor do mundo, acompanhada de sons responsivos para cliques, alertas, viagens e cutscenes de vitória.
* **Interface Neon-Noir e Terminal Seguro:** UI construída visando imersão total numa central de espionagem dark mode, com micro-interações incríveis para navegação, filtros, botões e telas modais.
* **Manual Embutido na Partida ("Como Jogar"):** Um passo-a-passo in-game rápido acessível da tela de níveis para marinheiros de primeira viagem.

## 🛠️ Tecnologias Principais
* **React + Vite**
* **Arquitetura modular de CSS**
* **Lucide React** (Pacote de iconografia)
* **Gerenciamento de Estado de Jogo:** Lógica toda feita via Hooks personalizados (e.g. `useGameState.js`, `useAudio.js`).

## 🚀 Como Executar Localmente

### Passo a passo
1. Clone o repositório em seu projeto:
   ```bash
   git clone https://github.com/lgsantini1/investigador-global.git
   ```
2. Acesse a pasta do terminal onde o projeto foi clonado:
   ```bash
   cd investigador-global
   ```
3. Instale as dependências com NPM (ou yarn, se preferir):
   ```bash
   npm install
   ```
4. Inicie o servidor frontend focado em desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse a porta local indicada no seu console (geralmente `http://localhost:5173`).

---
_Crie memórias fantásticas explorando países através deste puzzle retrô reinventado._ 🌎🔍
