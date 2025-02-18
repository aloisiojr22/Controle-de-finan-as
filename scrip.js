// Selecionando os elementos do HTML
const nomeInput = document.getElementById('nome');
const valorInput = document.getElementById('valor');
const tipoSelect = document.getElementById('tipo');
const saldoDisplay = document.getElementById('saldo');
const transacoesLista = document.getElementById('transacoes-lista');
const form = document.getElementById('form');

// Variáveis para armazenar o saldo e as transações
let saldo = 0;
let transacoes = [];

// Função para atualizar o saldo na tela
function atualizarSaldo() {
  saldoDisplay.textContent = `R$ ${saldo.toFixed(2)}`;
}

// Função para criar o item da transação na lista
function criarItemTransacao(nome, valor, tipo) {
  const li = document.createElement('li');
  li.classList.add(tipo === 'entrada' ? 'entrada' : 'saida');
  li.textContent = `${nome}: R$ ${valor.toFixed(2)}`;
  transacoesLista.appendChild(li);
}

// Função para atualizar as transações na tela
function atualizarTransacoes() {
  transacoesLista.innerHTML = ''; // Limpar a lista de transações
  transacoes.forEach(transacao => {
    criarItemTransacao(transacao.nome, transacao.valor, transacao.tipo);
  });
}

// Função para adicionar uma nova transação
function adicionarTransacao(event) {
  event.preventDefault(); // Prevenir o envio do formulário

  const nome = nomeInput.value.trim();
  const valor = parseFloat(valorInput.value.trim());
  const tipo = tipoSelect.value;

  if (nome && !isNaN(valor)) {
    // Atualiza o saldo
    if (tipo === 'entrada') {
      saldo += valor;
    } else {
      saldo -= valor;
    }

    // Adiciona a transação no array
    transacoes.push({ nome, valor, tipo });

    // Limpa os campos do formulário
    nomeInput.value = '';
    valorInput.value = '';

    // Atualiza a tela
    atualizarSaldo();
    atualizarTransacoes();
  } else {
    alert('Preencha todos os campos corretamente!');
  }
}

// Adicionando evento de submissão do formulário
form.addEventListener('submit', adicionarTransacao);

// Inicializa o saldo
atualizarSaldo();
