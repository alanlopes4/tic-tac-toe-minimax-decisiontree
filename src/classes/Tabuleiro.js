/**
 * @desc Esta classe representa o tabuleiro, contem métodos que checa o estado do tabuleiro, insere um simbolo, etc
 * @param {Array} estado - Um array representando o estado do tabuleiro
 */

var stringProfundidade = "";
var nivelAnterior = -2;

class Tabuleiro {
  //Inicializando o tabuleiro
  constructor(estado = ["", "", "", "", "", "", "", "", ""]) {
    this.estado = estado;
  }
  //Mostra o tabuleiro no console
  mostrarTabuleiro(nivel) {
    let stringFormatada = "";
    this.estado.forEach((posicao, indice) => {
      stringFormatada += posicao ? ` ${posicao} |` : "   |";
      if ((indice + 1) % 3 == 0) {
        stringFormatada = stringFormatada.slice(0, -1);
        if (indice < 8)
          stringFormatada +=
            "\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n";
      }
    });

    console.log(
      "%c" + `PROFUNDIDADE: ${nivel} \n` + stringFormatada,
      "color: #6d4e42;font-size:16px"
    );
  }

  //Checa se o tabuleiro está vazio
  //every testa se todos os elementos do array satisfaz a condição
  vazio() {
    return this.estado.every(posicao => !posicao);
  }
  //Checa se o tabuleiro está cheio
  cheio() {
    return this.estado.every(posicao => posicao);
  }
  /**
   * Insere um novo simbolo(x, o) no tabuleiro
   * @param {String} simbolo
   * @param {Number} posicao
   * @return {Boolean} booleano que representa se a ação foi realizada com sucesso
   */
  inserir(simbolo, posicao) {
    if (posicao > 8 || this.estado[posicao]) return false; //Se a posição está ocupada ou não existe
    this.estado[posicao] = simbolo;
    return true;
  }

  //Retorn um array contendo movimentos disponíveis para o estado atual
  getMovimentosDisponiveis() {
    const movimentos = [];
    this.estado.forEach((posicao, indice) => {
      if (!posicao) movimentos.push(indice);
    });
    return movimentos;
  }
  /**
   * Checa se o tabuleito tem um estado terminal. um jogador pode ganhar ou o tabuleiro está cheio e ninguém ganha
   * @return {Object} Um objeto contendo o vencedor, direcao do vencedor e o numero da linha
   */
  terminal() {
    //Retorna falso se o tabuleiro está vazio
    if (this.vazio()) return false;
    //Checando vencedores horizontais
    if (
      this.estado[0] == this.estado[1] &&
      this.estado[0] == this.estado[2] &&
      this.estado[0]
    ) {
      return { vencedor: this.estado[0], direcao: "H", linha: 1 };
    }
    if (
      this.estado[3] == this.estado[4] &&
      this.estado[3] == this.estado[5] &&
      this.estado[3]
    ) {
      return { vencedor: this.estado[3], direcao: "H", linha: 2 };
    }
    if (
      this.estado[6] == this.estado[7] &&
      this.estado[6] == this.estado[8] &&
      this.estado[6]
    ) {
      return { vencedor: this.estado[6], direcao: "H", linha: 3 };
    }
    //chegagem vertical
    if (
      this.estado[0] == this.estado[3] &&
      this.estado[0] == this.estado[6] &&
      this.estado[0]
    ) {
      return { vencedor: this.estado[0], direcao: "V", linha: 1 };
    }
    if (
      this.estado[1] == this.estado[4] &&
      this.estado[1] == this.estado[7] &&
      this.estado[1]
    ) {
      return { vencedor: this.estado[1], direcao: "V", linha: 2 };
    }
    if (
      this.estado[2] == this.estado[5] &&
      this.estado[2] == this.estado[8] &&
      this.estado[2]
    ) {
      return { vencedor: this.estado[2], direcao: "V", linha: 3 };
    }
    //checagem diagonal
    if (
      this.estado[0] == this.estado[4] &&
      this.estado[0] == this.estado[8] &&
      this.estado[0]
    ) {
      return { vencedor: this.estado[0], direcao: "D", linha: 1 };
    }
    if (
      this.estado[2] == this.estado[4] &&
      this.estado[2] == this.estado[6] &&
      this.estado[2]
    ) {
      return { vencedor: this.estado[2], direcao: "D", linha: 2 };
    }
    //Se nao há vencedor e o tabuleiro está cheio, então é empate
    if (this.cheio()) {
      return { vencedor: "empate" };
    }

    //caso contrario retorna falso
    return false;
  }
}
export default Tabuleiro;
