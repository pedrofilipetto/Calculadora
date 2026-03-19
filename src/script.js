function imprimirValor(valor){
    const tela = document.getElementById('tela');
    if (!tela) {
        return;
    }

    if (tela.textContent === '0') {
        tela.textContent = valor;
        return;
    }

    tela.textContent += valor;
}

function resultado(){
    
}

function inverteOperador() {
    
}

function apagar(){
    const tela = document.getElementById('tela');
    tela.textContent = '0';
}

function apagarUltimoNum(){
    const tela = document.getElementById('tela');
    const valorAtual = tela.textContent || '';
    if (valorAtual.length <= 1 || valorAtual === '0') {
        tela.textContent = '0';
        return;
    }

    tela.textContent = valorAtual.slice(0, -1);
}
