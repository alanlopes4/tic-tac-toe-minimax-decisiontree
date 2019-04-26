import Tabuleiro from "./Tabuleiro";
import { checarDuplos, intersecaoDupla, intersecaoSimples } from "./util";
class Player {
  constructor(max_profundidade = -1) {
    this.max_profundidade = max_profundidade;
    this.mapa_nos = new Map();
    this.primeiro_jogada = true;
  }
  melhorMovimento(
    tabuleiro,
    maximizing = true,
    callback = () => {},
    profundidade = 0
  ) {
    if (!tabuleiro instanceof Tabuleiro) {
      throw "o primeiro argumento do melhorMovimento deve ser uma instancia da classe Tabuleiro.";
    }

    //tabuleiro.mostrarTabuleiro(profundidade);

    if (profundidade == 0) this.mapa_nos.clear();
    if (tabuleiro.terminal() || profundidade == this.max_profundidade) {
      if (tabuleiro.terminal().vencedor == "x") {
        return 100 - profundidade;
      } else if (tabuleiro.terminal().vencedor == "o") {
        return -100 + profundidade;
      }
      return 0;
    }
    //O jogador atual é maximizado
    if (maximizing) {
      //Initializ best to the lowest possible value
      let best = -100;
      //Loop through all empty cells
      tabuleiro.getMovimentosDisponiveis().forEach(indice => {
        //Initialize a new tabuleiro with the current estado (slice() is used to create a new array and not modify the original)
        let child = new Tabuleiro(tabuleiro.estado.slice());
        //Create a child node by inseriring the maximizing symbol x into the current emoty cell
        child.inserir("x", indice);
        //Recursively calling melhorMovimento this time with the new tabuleiro and minimizing turn and incrementing the profundidade
        let node_value = this.melhorMovimento(
          child,
          false,
          callback,
          profundidade + 1
        );
        //Updating best value
        best = Math.max(best, node_value);

        //If it's the main function call, not a recursive one, map each heuristic value with it's moves indicies
        if (profundidade == 0) {
          //Comma seperated indicies if multiple moves have the same heuristic value
          var moves = this.mapa_nos.has(node_value)
            ? `${this.mapa_nos.get(node_value)},${indice}`
            : indice;
          this.mapa_nos.set(node_value, moves);
        }
      });
      //If it's the main call, return the indice of the best move or a random indice if multiple indicies have the same value
      if (profundidade == 0) {
        if (typeof this.mapa_nos.get(best) == "string") {
          var arr = this.mapa_nos.get(best).split(",");
          var rand = Math.floor(Math.random() * arr.length);
          var ret = arr[rand];
        } else {
          ret = this.mapa_nos.get(best);
        }
        //run a callback after calculation and return the indice
        callback(ret);
        return ret;
      }
      //If not main call (recursive) return the heuristic value for next calculation
      return best;
    }
    if (!maximizing) {
      //Initializ best to the highest possible value
      let best = 100;
      //Loop through all empty cells
      tabuleiro.getMovimentosDisponiveis().forEach(indice => {
        //Initialize a new tabuleiro with the current estado (slice() is used to create a new array and not modify the original)
        let child = new Tabuleiro(tabuleiro.estado.slice());
        //Create a child node by inseriring the minimizing symbol o into the current emoty cell
        child.inserir("o", indice);

        //Recursively calling melhorMovimento this time with the new tabuleiro and maximizing turn and incrementing the profundidade
        let node_value = this.melhorMovimento(
          child,
          true,
          callback,
          profundidade + 1
        );
        //Updating best value
        best = Math.min(best, node_value);

        //If it's the main function call, not a recursive one, map each heuristic value with it's moves indicies
        if (profundidade == 0) {
          //Comma seperated indicies if multiple moves have the same heuristic value
          var moves = this.mapa_nos.has(node_value)
            ? this.mapa_nos.get(node_value) + "," + indice
            : indice;
          this.mapa_nos.set(node_value, moves);
        }
      });
      //If it's the main call, return the indice of the best move or a random indice if multiple indicies have the same value
      if (profundidade == 0) {
        if (typeof this.mapa_nos.get(best) == "string") {
          var arr = this.mapa_nos.get(best).split(",");
          var rand = Math.floor(Math.random() * arr.length);
          var ret = arr[rand];
        } else {
          ret = this.mapa_nos.get(best);
        }
        //run a callback after calculation and return the indice
        callback(ret);
        return ret;
      }
      //If not main call (recursive) return the heuristic value for next calculation
      return best;
    }
  }

  melhorMovimentoArvoreDecisao(tabuleiro) {
    var posicao = -1;
    if (!tabuleiro instanceof Tabuleiro) {
      throw "o primeiro argumento do melhorMovimento deve ser uma instancia da classe Tabuleiro.";
    }
    //Se for a primeira jogada
    if (this.primeiro_jogada) {
      //Se o usuário marcar no centro do tabuleiro
      if (tabuleiro.estado[4] == "x") {
        tabuleiro.inserir("o", 0); //inseri o simbolo na primeiro posicao
        posicao = 0;
      } else {
        tabuleiro.inserir("o", 4); //inseiro o simbolo no meio do tabuleiro
        posicao = 4;
      }
      this.primeiro_jogada = false;
    } else {
      var result = checarDuplos(tabuleiro, "o"); //checa se o jogador 'o' tem duplos feitos,
      if (result != -1) {
        //caso positivo
        tabuleiro.inserir("o", result.posicao); //marca na posicao e ganha o jogo
        posicao = result.posicao;
      } else {
        //caso negativo
        result = checarDuplos(tabuleiro, "x"); //procura se o adversario 'x' tem duplos
        if (result != -1) {
          //caso positivo
          tabuleiro.inserir("o", result.posicao); //marca na posicao para nao deixar o adversario ganhar
          posicao = result.posicao;
        } else {
          result = intersecaoDupla(tabuleiro, "x"); //se encontrar uma intersecao dupla do adversario
          if (result != -1) {
            tabuleiro.inserir("o", result); //marca em uma posicao que impede ele de ganhar
            posicao = result;
          } else {
            result = intersecaoSimples(tabuleiro, "x");
            if (result != -1) {
              tabuleiro.inserir("o", result);
              posicao = result;
            }
          }
        }
      }
    }
    return posicao;
  }
}
export default Player;
