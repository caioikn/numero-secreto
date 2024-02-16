function exibirTextoNaTela(tag, texto) {
    const campo = document.querySelector(tag);
    campo.innerHTML = texto;

    responsiveVoice.speak(
        texto, 
        'Brazilian Portuguese Female', 
        {
            rate: 1.2
        }
    );
}

function verificarChute() {
    const chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        const palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        const mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;

        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemTentativas);

        const botaoReiniciar = document.getElementById('reiniciar');
        botaoReiniciar.removeAttribute('disabled');
        botaoReiniciar.style.cursor = 'pointer';
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }

        Number(chute) > 0 ? tentativas++ : tentativas;

        limparCampo();
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10.');
}

function gerarNumeroAleatorio() {
    const numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    const quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);

        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();

    limparCampo();

    tentativas = 1;

    exibirMensagemInicial();

    const botaoReiniciar = document.getElementById('reiniciar');
    botaoReiniciar.setAttribute('disabled', true);
    botaoReiniciar.style.cursor = 'initial';
}

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

exibirMensagemInicial();
