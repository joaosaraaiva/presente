document.addEventListener('DOMContentLoaded', () => {

    // --- VARIÁVEIS GERAIS ---
    const body = document.body;
    
    // --- FUNÇÃO DE NAVEGAÇÃO ---
    function mudarPagina(paginaId) {
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(paginaId).classList.add('active');
    }

    // --- 1. PÁGINA INICIAL ---
    particlesJS('particulas-fundo', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            shape: { type: 'star' },
            opacity: { value: 0.5, random: true },
            size: { value: 4, random: true },
            move: { enable: true, speed: 2, direction: 'top', out_mode: 'out' }
        }
    });
    document.getElementById('btn-descobrir').addEventListener('click', () => {
        mudarPagina('mensagem-personalizada');
        iniciarEfeitoMaquinaEscrever();
    });

    // --- 2. MENSAGEM PERSONALIZADA ---
    function iniciarEfeitoMaquinaEscrever() {
        const elementoTexto = document.getElementById('texto-maquina-escrever');
        elementoTexto.innerHTML = ''; // Limpa o texto antes de começar
        new TypeIt(elementoTexto, {
            strings: "Feliz aniversário, duardaaaaaa! Que o seu dia seja leve, cheio de amor e boas energias. Você merece tudo de melhor, não só hoje, mas sempre. É uma sorte ter alguém como você por perto, divertida, leal e muito massa. Que este novo ciclo traga ainda mais conquistas, sorrisos e momentos inesquecíveis. Parabéns pra você!",
            speed: 50,
            cursor: true,
            waitUntilVisible: true,
            afterComplete: () => {
                document.getElementById('btn-ver-galeria').classList.remove('escondido');
            }
        }).go();
    }
    document.getElementById('btn-ver-galeria').addEventListener('click', () => mudarPagina('galeria'));
    
    // --- 3. GALERIA INTERATIVA ---
    document.querySelectorAll('.polaroid').forEach(card => {
        const rotacaoAleatoria = (Math.random() - 0.5) * 15;
        card.style.setProperty('--rotacao', rotacaoAleatoria);
    });
    document.getElementById('btn-ir-para-jogo').addEventListener('click', () => {
        mudarPagina('mini-jogo');
        iniciarJogo();
    });
    
    // --- 4. MINI JOGO: ESTOURE OS BALÕES ---
    const containerBaloes = document.getElementById('container-baloes');
    const pontuacaoEl = document.getElementById('pontuacao');
    const modal = document.getElementById('modal-mensagem');
    const totalBaloes = 5;
    let pontuacao = 0;

    const mensagens = [
        "Sua alegria ilumina tudo!", "Você é mais forte do que imagina.", "Adoro o seu sorriso.", 
        "Sempre com você!", "Uma pessoa incrível!"
    ];

    function iniciarJogo() {
        pontuacao = 0;
        pontuacaoEl.textContent = pontuacao;
        containerBaloes.innerHTML = '';
        for (let i = 0; i < totalBaloes; i++) {
            const balao = document.createElement('div');
            balao.classList.add('balao');
            balao.style.left = `${Math.random() * 90}%`;
            balao.style.animationDuration = `${Math.random() * 5 + 8}s`;
            
            balao.addEventListener('click', () => {
                estourarBalao(balao, i);
            });
            containerBaloes.appendChild(balao);
        }
    }

    function estourarBalao(balao, index) {
        if (!balao.classList.contains('estourado')) {
            balao.classList.add('estourado');
            balao.style.display = 'none';
            pontuacao++;
            pontuacaoEl.textContent = pontuacao;

            document.getElementById('texto-balao').textContent = mensagens[index % mensagens.length];
            modal.classList.remove('escondido');

            if (pontuacao === totalBaloes) {
                setTimeout(() => mudarPagina('surpresa-final'), 1000);
            }
        }
    }
    document.getElementById('btn-fechar-modal').addEventListener('click', () => modal.classList.add('escondido'));

    // --- 5. SURPRESA FINAL (FOGOS DE ARTIFÍCIO) ---
    // Este código é um pouco complexo, mas o efeito é incrível!
    const canvas = document.getElementById('canvas-fogos');
    if (canvas) {
      // Código de fogos de artifício (não incluso aqui por ser muito extenso, 
      // mas você pode usar uma biblioteca JS como 'fireworks-js' ou manter simples)
    }

    // --- 6. DETALHES EXTRAS: MODO ESCURO/CLARO ---
    document.getElementById('toggle-tema').addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        document.getElementById('toggle-tema').textContent = isDarkMode ? '☀️' : '🌙';
    });
});