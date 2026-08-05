/**
* Ecos do Tempo - Sistema Dinâmico de Narrativa Interativa
*/
 
// Banco de Dados da História (Contendo 11 cenas estruturadas e 3 finais distintos)
const story = {
    inicio: {
        personagem: "Narrador",
        texto: "Você acorda em uma sala circular de pedra branca. À sua frente flutua um artefato mecânico em forma de ampulheta que emite uma pulsação azulada. Existem três portas pesadas de metal na sala.",
        escolhas: [
            { texto: "Tocar no artefato flutuante", destino: "tocar_artefato" },
            { texto: "Entrar na porta adornada com engrenagens", destino: "porta_tecnologica" },
            { texto: "Entrar na porta com runas mágicas antigas", destino: "porta_magica" },
            { texto: "Investigar a terceira porta, que está entreaberta", destino: "porta_sombria" }
        ]
    },
    tocar_artefato: {
        personagem: "Artefato",
        texto: "Ao aproximar seus dedos, uma voz ecoa diretamente na sua mente: 'Viajante do tempo, você interferiu no fluxo. Escolha o seu fardo antes que as linhas temporais colapsem.'",
        escolhas: [
            { texto: "Aceitar o fardo do Conhecimento", destino: "caminho_sabedoria" },
            { texto: "Aceitar o fardo da Força", destino: "caminho_confronto" },
            { texto: "Recuar e pegar a porta de engrenagens", destino: "porta_tecnologica" }
        ]
    },
    porta_tecnologica: {
        personagem: "Droide Sentinela",
        texto: "Você entra em um corredor metálico iluminado por neon. Um robô flutuante bloqueia seu caminho. 'Identifique-se ou seja vaporizado. Este setor pertence à Aliança de Ferro.'",
        escolhas: [
            { texto: "Tentar hackear o painel do robô", destino: "hackear_sucesso" },
            { texto: "Atacar o robô com pedaços de ferro do chão", destino: "combate_robo" },
            { texto: "Correr de volta para a sala inicial", destino: "inicio" }
        ]
    },
    porta_magica: {
        personagem: "Anciã do Culto",
        texto: "O ar é pesado e cheira a incenso. Uma mulher idosa, segurando um cajado brilhante, olha para você com surpresa. 'As profecias não previam sua chegada neste ciclo.'",
        escolhas: [
            { texto: "Pedir ajuda para voltar para casa", destino: "ajuda_ancia" },
            { texto: "Roubar o cajado dela e correr", destino: "roubo_cajado" }
        ]
    },
    porta_sombria: {
        personagem: "Sombra Espreitadora",
        texto: "A escuridão aqui é quase sólida. Algo se move rapidamente pelas paredes. Você sente um frio paralisante na espinha. Não há muito tempo para agir.",
        escolhas: [
            { texto: "Acender um fósforo que achou no bolso", destino: "luz_sombra" },
            { texto: "Avançar no escuro tateando as paredes", destino: "final_perdido" } // Leva direto a um final
        ]
    },
    caminho_sabedoria: {
        personagem: "Narrador",
        texto: "Sua mente se expande. Você vê o passado e o futuro simultaneamente. Você descobre que esta sala é o núcleo de uma máquina do tempo quebrada. Você sabe exatamente como consertá-la, mas precisará de uma fonte de energia mágica.",
        escolhas: [
            { texto: "Ir até a porta mágica buscar energia", destino: "porta_magica" },
            { texto: "Usar sua própria energia vital na máquina", destino: "final_sacrificio" } // Leva direto a um final
        ]
    },
    caminho_confronto: {
        personagem: "Narrador",
        texto: "Seus músculos fervem com energia pura. O artefato se desintegra e se funde aos seus braços em forma de manoplas de energia. Você se sente pronto para enfrentar qualquer ameaça.",
        escolhas: [
            { texto: "Invadir a porta de engrenagens para testar o poder", destino: "porta_tecnologica" },
            { texto: "Destruir a porta mágica com um soco", destino: "porta_magica" }
        ]
    },
    hackear_sucesso: {
        personagem: "Droide Sentinela",
        texto: "Sistemas reprogramados. Protocolo de segurança anulado. 'Bem-vindo, Criador. O painel central de controle temporal está liberado.'",
        escolhas: [
            { texto: "Ativar o painel e redefinir a linha temporal", destino: "final_salvacao" } // Leva direto a um final
        ]
    },
    combate_robo: {
        personagem: "Narrador",
        texto: "Você golpeia o robô, mas o metal dele é indestrutível. Ele contra-ataca com uma rajada de energia que te joga longe. Fraco e ferido, você mal consegue se arrastar.",
        escolhas: [
            { texto: "Usar suas forças restantes para entrar na porta mágica", destino: "porta_magica" },
            { texto: "Desistir e aceitar o fim no chão metálico", destino: "final_perdido" }
        ]
    },
    ajuda_ancia: {
        personagem: "Anciã do Culto",
        texto: "Ela sorri com compaixão. 'Para voltar, o ciclo deve ser fechado. Pegue este cristal e coloque-o no coração da máquina que te trouxe aqui.' Ela aponta para a sala de onde você veio.",
        escolhas: [
            { texto: "Voltar ao início e consertar a máquina", destino: "final_salvacao" }
        ]
    },
    roubo_cajado: {
        personagem: "Narrador",
        texto: "Você puxa o cajado de forma abrupta. A anciã grita e uma barreira mágica se fecha, trancando você na sala enquanto o teto começa a desabar sobre sua cabeça.",
        escolhas: [
            { texto: "Tentar usar o poder do cajado para quebrar a parede", destino: "final_sacrificio" },
            { texto: "Aceitar as consequências do seu roubo", destino: "final_perdido" }
        ]
    },
    luz_sombra: {
        personagem: "Narrador",
        texto: "A chama do fósforo revela que a criatura das sombras tem pavor de luz. Ela recua desesperadamente, revelando uma passagem secreta que leva de volta para a central tecnológica.",
        escolhas: [
            { texto: "Seguir pela passagem secreta", destino: "porta_tecnologica" }
        ]
    },
 
    // CENAS DOS FINAIS (Possuem estruturas sem escolhas futuras)
    final_salvacao: {
        personagem: "Final - Redenção e Salvação",
        texto: "Parabéns! Você conseguiu recalibrar os motores do tempo. A realidade ao seu redor se desfaz em partículas de luz dourada. Você acorda na sua própria cama, no seu próprio tempo, sabendo que salvou o universo de um paradoxo catastrófico.",
        escolhas: [] // Array vazio indica final de jogo
    },
    final_sacrificio: {
        personagem: "Final - O Sacrifício Heróico",
        texto: "O poder exigido era grande demais. Você canalizou toda a energia através do seu corpo. A máquina funciona e o tempo é restaurado, mas você se torna uma estátua eterna de pura energia guardando o templo do tempo por toda a eternidade.",
        escolhas: []
    },
    final_perdido: {
        personagem: "Final - Perdido nas Eras",
        texto: "Suas decisões te guiaram para um beco sem saída. Sem energia, sem respostas e preso na escuridão eterna do fluxo temporal esquecido. O tempo seguiu em frente sem você... Sua jornada termina aqui.",
        escolhas: []
    }
};
 
// Elementos da Interface DOM
const characterNameEl = document.getElementById("character-name");
const storyTextEl = document.getElementById("story-text");
const choicesContainer = document.getElementById("choices-container");
const sceneIndicatorEl = document.getElementById("scene-indicator");
const restartBtn = document.getElementById("restart-btn");
const dialogueBox = document.getElementById("dialogue-box");
 
// Função Principal para Carregar e Renderizar uma Cena
function loadScene(sceneId) {
    const currentScene = story[sceneId];
 
    if (!currentScene) {
        console.error("Cena não encontrada: " + sceneId);
        return;
    }
 
    // Aplica o efeito visual de fade-in para simular a transição suave de tela
    dialogueBox.classList.remove("fade-in");
    void dialogueBox.offsetWidth; // Truque para resetar animação do CSS
    dialogueBox.classList.add("fade-in");
 
    // Atualiza as informações de texto na interface
    characterNameEl.textContent = currentScene.personagem;
    storyTextEl.textContent = currentScene.texto;
    sceneIndicatorEl.textContent = `Cena: ${sceneId}`;
 
    // Limpa a área dos botões de escolhas anteriores
    choicesContainer.innerHTML = "";
 
    // Verifica se a cena atual é um Final de Jogo (sem escolhas adjacentes)
    if (currentScene.escolhas.length === 0) {
        // Esconde o container de escolhas normais e ativa o botão de reinício
        choicesContainer.classList.add("hidden");
        restartBtn.classList.remove("hidden");
    } else {
        // Garante que o contêiner de escolhas esteja visível e o reinício oculto
        choicesContainer.classList.remove("hidden");
        restartBtn.classList.add("hidden");
 
        // Cria e renderiza dinamicamente os botões necessários (até no máximo 4)
        currentScene.escolhas.forEach(escolha => {
            const button = document.createElement("button");
            button.classList.add("choice-btn");
            button.textContent = escolha.texto;
            // Define o evento de clique para direcionar à próxima cena
            button.addEventListener("click", () => {
                loadScene(escolha.destino);
            });
            choicesContainer.appendChild(button);
        });
    }
}
 
// Configura o Botão de Reinício da História
restartBtn.addEventListener("click", () => {
    loadScene("inicio");
});
 
// Inicializa a aplicação carregando a cena primária do jogo
document.addEventListener("DOMContentLoaded", () => {
    loadScene("inicio");
});