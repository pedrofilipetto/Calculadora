function imprimirValor(valor) {
  const tela = document.getElementById("tela");
  if (!tela) {
    return;
  }

  const operadores = ["+", "-", "x", "÷", "%"];

  if (tela.textContent === "0") {
    if (operadores.includes(valor)) {
      tela.textContent += valor;
      return;
    }

    if (valor === "0") {
      return;
    }

    tela.textContent = valor;
    return;
  }

  tela.textContent += valor;
}

function resultado() {
  const tela = document.getElementById("tela");
  let conta = tela.textContent;

  conta = conta.replace("x", "*");
  conta = conta.replace("÷", "/");
  conta = conta.replace(",", ".");

  let resultado = eval(conta);

  tela.textContent = resultado;
}

function inverteOperador() {
  const tela = document.getElementById("tela");
  if (!tela) {
    return;
  }

  let conta = tela.textContent || "";

  if (!conta || conta == "0") {
    return;
  }

  const caracteres = conta.split("");
  const operadores = ["+", "-", "x", "÷"];

  const indiceUltimoOperador = caracteres.findLastIndex((char, i) => {
    return operadores.includes(char) && conta[i - 1] !== "(";
  });

  let parteAnterior = "";
  let ultimoNumero = conta;

  if (indiceUltimoOperador !== -1) {
    parteAnterior = conta.slice(0, indiceUltimoOperador + 1);
    ultimoNumero = conta.slice(indiceUltimoOperador + 1);
  }

  if (ultimoNumero === "") {
    return;
  }

  if (ultimoNumero.startsWith("(-") && ultimoNumero.endsWith(")")) {
    let numeroPuro = ultimoNumero.slice(2, -1);
    tela.textContent = parteAnterior + numeroPuro;
  } else {
    tela.textContent = parteAnterior + "(-" + ultimoNumero + ")";
  }

  if (typeof atualizarBotaoIgual === "function") atualizarBotaoIgual();
}

function apagar() {
  const tela = document.getElementById("tela");
  tela.textContent = "0";
}

function apagarUltimoNum() {
  const tela = document.getElementById("tela");
  const valorAtual = tela.textContent || "";
  if (valorAtual.length <= 1 || valorAtual === "0") {
    tela.textContent = "0";
    return;
  }

  tela.textContent = valorAtual.slice(0, -1);
}
