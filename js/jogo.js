let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true; // Começa desativado
let rodadaAtiva = true;

const btnIniciar = document.getElementById('iniciar');
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');
const resposta = document.getElementById('resposta');

const SMILE_URL = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
const SAD_URL = "./img/sad.png";

const criarImagem = (src, alt) => {
  const img = new Image();
  img.src = src;
  img.alt = alt;
  img.style.width = "80px";
  return img;
};

const resetarCards = () => {
  document.querySelectorAll(".card").forEach(card => {
    card.className = "card inicial";
    card.textContent = card.id;
  });
};

const preloadImages = () => {
  criarImagem(SMILE_URL, "Smile feliz");
  criarImagem(SAD_URL, "Carinha triste");
};


function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  rodadaAtiva = true;

  resetarCards();
  atualizaPlacar();

  btnJogarNovamente.classList.remove('invisivel');
  btnReiniciar.classList.add('invisivel');

  resposta.textContent = 'Tente adivinhar aonde está o Sorriso.';
}

function iniciarJogo() {
  jogar = true;
  reiniciar();

  // Oculta botão "Iniciar", mostra "Jogar Novamente"
  btnIniciar.classList.add('invisivel');
  btnJogarNovamente.classList.remove('visivel');
}

function jogarNovamente() {
  rodadaAtiva = true;
  resetarCards();
  resposta.textContent = 'Tente adivinhar novamente!';
}

function atualizaPlacar() {
  desempenho = tentativas > 0 ? (acertos / tentativas) * 100 : 0;
  resposta.innerHTML = `
    <span style="margin: 0 10px;">Acertos: ${acertos}</span>
    <span style="margin: 0 10px;">Tentativas: ${tentativas}</span>
    <span style="margin: 0 10px;">Taxa: ${Math.round(desempenho)}%</span>
  `;
}

function acertou(card) {
  card.className = "card acertou";
  card.innerHTML = '';
  card.appendChild(criarImagem(SMILE_URL, "Smile feliz"));
}

function verifica(card) {
  if (!jogar) return alert('Clique em "Iniciar Jogo" para começar');
  if (!rodadaAtiva) return alert('Clique em "Jogar novamente" para iniciar');

  rodadaAtiva = false;
  tentativas++;

  if (tentativas >= 5) {
    btnJogarNovamente.classList.add('invisivel');
    btnReiniciar.classList.remove('invisivel');
  }

  const sorteado = Math.floor(Math.random() * 4);

  if (card.id === sorteado.toString()) {
    acertou(card);
    acertos++;
    resposta.textContent = "Parabéns! Você acertou!";
  } else {
    card.className = "card errou";
    card.innerHTML = '';
    card.appendChild(criarImagem(SAD_URL, "Carinha triste"));

    const cardSorteado = document.getElementById(sorteado);
    acertou(cardSorteado);
    resposta.textContent = `Ops! O smile estava no card ${sorteado}.`;
  }

  atualizaPlacar();
}

// Event listeners
btnIniciar.addEventListener('click', iniciarJogo);
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);

// Inicialização
preloadImages();
