let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;
let rodadaAtiva = false;

const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');
const resposta = document.getElementById('resposta');

// Pré-carrega imagens
const preloadImages = () => {
  const smileImg = new Image();
  smileImg.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
  
  const sadImg = new Image();
  sadImg.src = "./img/sad.png";
};

function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  rodadaAtiva = false;
  
  document.querySelectorAll(".card").forEach(card => {
    card.className = "card inicial";
    card.textContent = card.id;
    card.innerHTML = card.id;
  });
  
  atualizaPlacar();
  btnJogarNovamente.classList.add('visivel');
  btnJogarNovamente.classList.remove('invisivel');
  btnReiniciar.classList.add('invisivel');
  btnReiniciar.classList.remove('visivel');
  resposta.textContent = 'Tente adivinhar aonde está o Sorriso.';
}

function jogarNovamente() {
  rodadaAtiva = true;
  
  document.querySelectorAll(".card").forEach(card => {
    card.className = "card inicial";
    card.textContent = card.id;
    card.innerHTML = card.id;
  });
  
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
  
  const img = new Image();
  img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
  img.alt = "Smile feliz";
  img.style.width = "80px";
  card.appendChild(img);
}

function verifica(card) {
  if (!jogar) {
    alert('Clique em "Reiniciar" para começar novo jogo');
    return;
  }

  if (!rodadaAtiva) {
    alert('Clique em "Jogar novamente" para iniciar');
    return;
  }

  rodadaAtiva = false;
  tentativas++;

  if (tentativas >= 5) {
    btnJogarNovamente.classList.add('invisivel');
    btnReiniciar.classList.remove('invisivel');
  }

  const sorteado = Math.floor(Math.random() * 4);
  
  if (card.id == sorteado.toString()) {
    acertou(card);
    acertos++;
    resposta.textContent = "Parabéns! Você acertou!";
  } else {
    card.className = "card errou";
    card.innerHTML = '';
    
    const imgErro = new Image();
    imgErro.src = "./img/sad.png";
    imgErro.alt = "Carinha triste";
    imgErro.style.width = "80px";
    card.appendChild(imgErro);

    const cardSorteado = document.getElementById(sorteado);
    acertou(cardSorteado);
    resposta.textContent = `Ops! O smile estava no card ${sorteado}.`;
  }

  atualizaPlacar();
}

// Event listeners
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);

// Inicialização
preloadImages();
reiniciar();