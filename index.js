import Tabuleiro from "./src/classes/Tabuleiro";
import Jogador from "./src/classes/Jogador";
import "./style.css";

document.addEventListener("DOMContentLoaded", event => {
  //Start a new game when page loads with default values
  let depth = 1;
  let starting_player = 1;
  newGame(depth, starting_player);
  newGame2();
  document.getElementById("newgame").addEventListener("click", () => {
    var starting = document.getElementById("starting");
    var starting = starting.options[starting.selectedIndex].value;
    var depth = document.getElementById("depth");
    var depth = depth.options[depth.selectedIndex].value;
    newGame(depth, starting);
  });

  document.getElementById("newgame2").addEventListener("click", () => {
    newGame2();
  });
});

function hasClass(el, className) {
  if (el.classList) return el.classList.contains(className);
  else
    return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}
function addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += " " + className;
}
function removeClass(el, className) {
  if (el.classList) el.classList.remove(className);
  else if (hasClass(el, className)) {
    var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}
function drawWinningLine({ direction, row }) {
  let tabuleiro = document.getElementById("tabuleiro");
  tabuleiro.className = `${direction}${row}`;
  setTimeout(() => {
    tabuleiro.className += " full";
  }, 50);
}

function newGame(depth = 1, starting_player = 1) {
  //Inicializa com um novo jogador e o tabuleiro vazio
  let p = new Jogador(parseInt(depth));
  let b = new Tabuleiro(["", "", "", "", "", "", "", "", ""]);
  let dadosProfundidade = document.getElementById("profundidade");
  //Limpa todas as posições do tabuleiro
  let tabuleiro = document.getElementById("tabuleiro");
  tabuleiro.className = "";
  tabuleiro.innerHTML =
    '<div class="cell-0"></div><div class="cell-1"></div><div class="cell-2"></div><div class="cell-3"></div><div class="cell-4"></div><div class="cell-5"></div><div class="cell-6"></div><div class="cell-7"></div><div class="cell-8"></div>';

  //Salva as posicoes do tabuleiro em um array
  let html_cells = [...tabuleiro.children];
  //Inicializa algumas variáveis para uso
  let starting = parseInt(starting_player),
    maximizing = starting,
    player_turn = starting;

  //Se não for o humano, o computador joga
  if (!starting) {
    let center_and_corners = [0, 2, 4, 6, 8];
    let first_choice =
      center_and_corners[Math.floor(Math.random() * center_and_corners.length)];
    let symbol = !maximizing ? "x" : "o";
    b.inserir(symbol, first_choice);
    addClass(html_cells[first_choice], symbol);
    player_turn = 1; //Switch turns
  }

  b.estado.forEach((cell, index) => {
    html_cells[index].addEventListener(
      "click",
      () => {
        //If cell is already occupied or the board is in a terminal state or it's not humans turn, return false
        if (
          hasClass(html_cells[index], "x") ||
          hasClass(html_cells[index], "o") ||
          b.terminal() ||
          !player_turn
        )
          return false;
        let symbol = maximizing ? "x" : "o"; //Maximizing player is always 'x'
        //Update the Board class instance as well as the Board UI
        b.inserir(symbol, index);
        addClass(html_cells[index], symbol);
        //If it's a terminal move and it's not a draw, then human won
        if (b.terminal()) {
          let { winner } = b.terminal();
          drawWinningLine(b.terminal());
        }
        player_turn = 0; //Switch turns
        //Pega o melhor movimento e atuliza no tabuleiro
        p.melhorMovimento(b, !maximizing, best => {
          let symbol = !maximizing ? "x" : "o";
          b.inserir(symbol, best);
          addClass(html_cells[best], symbol);
          if (b.terminal()) {
            let { winner } = b.terminal();
            drawWinningLine(b.terminal());
          }
          player_turn = 1; //Switch turns
        });
      },
      false
    );
    if (cell) addClass(html_cells[index], cell);
  });
}

function newGame2() {
  let p = new Jogador(parseInt(depth));
  let b = new Tabuleiro(["", "", "", "", "", "", "", "", ""]);

  let tabuleiro2 = document.getElementById("tabuleiro2");
  tabuleiro2.className = "";
  tabuleiro2.innerHTML =
    '<div class="cell-0"></div><div class="cell-1"></div><div class="cell-2"></div><div class="cell-3"></div><div class="cell-4"></div><div class="cell-5"></div><div class="cell-6"></div><div class="cell-7"></div><div class="cell-8"></div>';

  let html_cells = [...tabuleiro2.children];

  b.estado.forEach((cell, index) => {
    html_cells[index].addEventListener(
      "click",
      () => {
        if (
          hasClass(html_cells[index], "x") ||
          hasClass(html_cells[index], "o") ||
          b.terminal()
        )
          return false;
        b.inserir("x", index);
        addClass(html_cells[index], "x");
        let posicao = p.melhorMovimentoArvoreDecisao(b);
        console.log(posicao);
        addClass(html_cells[posicao], "o");
      },
      false
    );
    if (cell) addClass(html_cells[index], cell);
  });
}
