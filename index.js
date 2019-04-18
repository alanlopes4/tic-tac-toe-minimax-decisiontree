import Tabuleiro from "./src/classes/Tabuleiro";
import Jogador from "./src/classes/Jogador";
//let tabuleiro = new Tabuleiro(["x", "o", "", "", "", "", "o", "", "x"]);
//tabuleiro.mostrarTabuleiro();
//let p = new Jogador();
//console.log(p.melhorMovimento(tabuleiro));
//console.log(p.mapa_nos);
import "./style.css";

document.addEventListener("DOMContentLoaded", event => {
  //Start a new game when page loads with default values
  let depth = -1;
  let starting_player = 1;
  newGame(depth, starting_player);
  document.getElementById("newgame").addEventListener("click", () => {
    var starting = document.getElementById("starting");
    var starting = starting.options[starting.selectedIndex].value;
    var depth = document.getElementById("depth");
    var depth = depth.options[depth.selectedIndex].value;
    newGame(depth, starting);
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

function newGame(depth = -1, starting_player = 1) {
  //Instantiating a new player and an empty tabuleiro
  let p = new Jogador(parseInt(depth));
  let b = new Tabuleiro(["", "", "", "", "", "", "", "", ""]);
  //Clearing all #tabuleiro classes and populating cells HTML
  let tabuleiro = document.getElementById("tabuleiro");
  tabuleiro.className = "";
  tabuleiro.innerHTML =
    '<div class="cell-0"></div><div class="cell-1"></div><div class="cell-2"></div><div class="cell-3"></div><div class="cell-4"></div><div class="cell-5"></div><div class="cell-6"></div><div class="cell-7"></div><div class="cell-8"></div>';

  //Storing HTML cells in an array
  let html_cells = [...tabuleiro.children];
  //Initializing some variables for internal use
  let starting = parseInt(starting_player),
    maximizing = starting,
    player_turn = starting;

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
