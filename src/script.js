function imprimirValor(valor) {
  const tela = document.getElementById("tela");
  if (!tela) {
    return;
  }

  if (tela.textContent === "Indeterminado") {
    return;
  }

  const operadores = ["+", "-", "x", "÷", "%"];

  if (tela.textContent === "0") {
    if (operadores.includes(valor)) {
      tela.textContent += valor;
      return;
    }

    if (valor === ",") {
      tela.textContent = "0,";
      return;
    }

    if (valor === "0") {
      tela.textContent = "0";
      return;
    }

    tela.textContent = valor;
    return;
  }

  if (valor === ",") {
    const expressaoAtual = tela.textContent;
    const separadores = ["+", "-", "x", "÷", "%"];
    const indiceUltimoSeparador = Math.max(
      ...separadores.map((separador) => expressaoAtual.lastIndexOf(separador)),
    );
    const numeroAtual = expressaoAtual.slice(indiceUltimoSeparador + 1);

    if (numeroAtual.includes(",")) {
      return;
    }
  }

  if (valor !== "0" && valor !== "," && !operadores.includes(valor)) {
    const ultimoChar = tela.textContent[tela.textContent.length - 1];
    const penultimoChar = tela.textContent[tela.textContent.length - 2];

    if (
      ultimoChar === "0" &&
      penultimoChar &&
      operadores.includes(penultimoChar)
    ) {
      tela.textContent = tela.textContent.slice(0, -1) + valor;
      return;
    }
  }

  tela.textContent += valor;
}

function resultado() {
  const tela = document.getElementById("tela");
  if (!tela || tela.textContent === "Indeterminado") {
    return;
  }

  let conta = tela.textContent;

  if (conta.includes("%")) {
    conta = processarPorcentagem(conta);
  }

  conta = conta.replace("x", "*");
  conta = conta.replace("÷", "/");
  conta = conta.replace(",", ".");

  try {
    let resultado = eval(conta);

    // Trata divisão por zero e outros erros matemáticos
    if (!isFinite(resultado)) {
      tela.textContent = "Indeterminado";
      return;
    }

    if (isNaN(resultado)) {
      tela.textContent = "Indeterminado";
      return;
    }

    tela.textContent = resultado;
  } catch (erro) {
    tela.textContent = "Indeterminado";
  }
}

function processarPorcentagem(expressao) {
  // + e -: usa percentual sobre o valor anterior (ex.: 200+10% -> 200+20)
  const padraoSomaSub = /(\d+(?:\.\d+)?)\s*([\+\-])\s*(\d+(?:\.\d+)?)%/g;
  expressao = expressao.replace(
    padraoSomaSub,
    (match, num1, operador, num2) => {
      const valor1 = parseFloat(num1.replace(",", "."));
      const valor2 = parseFloat(num2.replace(",", "."));
      const percentualCalculado = (valor1 * valor2) / 100;

      return valor1 + operador + percentualCalculado;
    },
  );

  // x e ÷: transforma percentual em decimal (ex.: 200x10% -> 200*0.1)
  const padraoMultDiv = /(\d+(?:\.\d+)?)\s*([x÷])\s*(\d+(?:\.\d+)?)%/g;
  expressao = expressao.replace(
    padraoMultDiv,
    (match, num1, operador, num2) => {
      const valor1 = parseFloat(num1.replace(",", "."));
      const valor2 = parseFloat(num2.replace(",", "."));
      const decimal = valor2 / 100;

      if (operador === "x") {
        return valor1 + "*" + decimal;
      }

      return valor1 + "/" + decimal;
    },
  );

  // Percentual isolado (ex.: 50% -> 0.5)
  const padraoIsolado = /(\d+(?:\.\d+)?)%/g;
  expressao = expressao.replace(padraoIsolado, (match, num) => {
    const valor = parseFloat(num.replace(",", "."));
    return String(valor / 100);
  });

  return expressao;
}

function inverteOperador() {
  const tela = document.getElementById("tela");
  if (!tela) {
    return;
  }

  if (tela.textContent === "Indeterminado") {
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

  if (valorAtual === "Indeterminado") {
    tela.textContent = "0";
    return;
  }

  if (valorAtual.length <= 1 || valorAtual === "0") {
    tela.textContent = "0";
    return;
  }

  tela.textContent = valorAtual.slice(0, -1);
}
