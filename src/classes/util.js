export function checarDuplos(tabuleiro, simbolo) {
  //chegando Horizontais
  if (
    tabuleiro.estado[0] == tabuleiro.estado[1] &&
    tabuleiro.estado[0] == simbolo &&
    tabuleiro.estado[2] == ""
  )
    return {
      vencedor: tabuleiro.estado[0],
      direcao: "H",
      linha: 1,
      posicao: 2
    };
  if (
    tabuleiro.estado[0] == tabuleiro.estado[2] &&
    tabuleiro.estado[0] == simbolo &&
    tabuleiro.estado[1] == ""
  )
    return {
      vencedor: tabuleiro.estado[0],
      direcao: "H",
      linha: 1,
      posicao: 1
    }; // o | ? | o -> 1
  if (
    tabuleiro.estado[1] == tabuleiro.estado[2] &&
    tabuleiro.estado[1] == simbolo &&
    tabuleiro.estado[0] == ""
  )
    return {
      vencedor: tabuleiro.estado[1],
      direcao: "H",
      linha: 1,
      posicao: 0
    }; // ? | o | o -> 0

  if (
    tabuleiro.estado[3] == tabuleiro.estado[4] &&
    tabuleiro.estado[3] == simbolo &&
    tabuleiro.estado[5] == ""
  )
    return {
      vencedor: tabuleiro.estado[3],
      direcao: "H",
      linha: 2,
      posicao: 5
    }; // o | o | ? -> 2
  if (
    tabuleiro.estado[3] == tabuleiro.estado[5] &&
    tabuleiro.estado[3] == simbolo &&
    tabuleiro.estado[4] == ""
  )
    return {
      vencedor: tabuleiro.estado[3],
      direcao: "H",
      linha: 2,
      posicao: 4
    }; // o | ? | o -> 1
  if (
    tabuleiro.estado[4] == tabuleiro.estado[5] &&
    tabuleiro.estado[4] == simbolo &&
    tabuleiro.estado[3] == ""
  )
    return {
      vencedor: tabuleiro.estado[4],
      direcao: "H",
      linha: 2,
      posicao: 3
    }; // ? | o | o -> 0

  if (
    tabuleiro.estado[6] == tabuleiro.estado[7] &&
    tabuleiro.estado[6] == simbolo &&
    tabuleiro.estado[8] == ""
  )
    return {
      vencedor: tabuleiro.estado[6],
      direcao: "H",
      linha: 3,
      posicao: 8
    }; // o | o | ? -> 2
  if (
    tabuleiro.estado[6] == tabuleiro.estado[8] &&
    tabuleiro.estado[6] == simbolo &&
    tabuleiro.estado[7] == ""
  )
    return {
      vencedor: tabuleiro.estado[6],
      direcao: "H",
      linha: 3,
      posicao: 7
    }; // o | ? | o -> 1
  if (
    tabuleiro.estado[7] == tabuleiro.estado[8] &&
    tabuleiro.estado[7] == simbolo &&
    tabuleiro.estado[6] == ""
  )
    return {
      vencedor: tabuleiro.estado[7],
      direcao: "H",
      linha: 3,
      posicao: 6
    }; // ? | o | o -> 0

  //Checar verticais
  if (
    tabuleiro.estado[0] == tabuleiro.estado[3] &&
    tabuleiro.estado[0] == simbolo &&
    tabuleiro.estado[6] == ""
  )
    return {
      vencedor: tabuleiro.estado[0],
      direcao: "V",
      coluna: 1,
      posicao: 6
    }; // o | o | ? -> 2
  if (
    tabuleiro.estado[0] == tabuleiro.estado[6] &&
    tabuleiro.estado[0] == simbolo &&
    tabuleiro.estado[3] == ""
  )
    return {
      vencedor: tabuleiro.estado[0],
      direcao: "V",
      coluna: 1,
      posicao: 3
    }; // o | ? | o -> 1
  if (
    tabuleiro.estado[3] == tabuleiro.estado[6] &&
    tabuleiro.estado[3] == simbolo &&
    tabuleiro.estado[0] == ""
  )
    return {
      vencedor: tabuleiro.estado[3],
      direcao: "V",
      coluna: 1,
      posicao: 0
    }; // ? | o | o -> 0

  if (
    tabuleiro.estado[1] == tabuleiro.estado[4] &&
    tabuleiro.estado[1] == simbolo &&
    tabuleiro.estado[7] == ""
  )
    return {
      vencedor: tabuleiro.estado[1],
      direcao: "V",
      coluna: 2,
      posicao: 7
    }; // o | o | ? -> 2
  if (
    tabuleiro.estado[1] == tabuleiro.estado[7] &&
    tabuleiro.estado[1] == simbolo &&
    tabuleiro.estado[4] == ""
  )
    return {
      vencedor: tabuleiro.estado[1],
      direcao: "V",
      coluna: 2,
      posicao: 4
    }; // o | ? | o -> 1
  if (
    tabuleiro.estado[4] == tabuleiro.estado[7] &&
    tabuleiro.estado[4] == simbolo &&
    tabuleiro.estado[1] == ""
  )
    return {
      vencedor: tabuleiro.estado[4],
      direcao: "V",
      coluna: 2,
      posicao: 1
    }; // ? | o | o -> 0

  if (
    tabuleiro.estado[2] == tabuleiro.estado[5] &&
    tabuleiro.estado[2] == simbolo &&
    tabuleiro.estado[8] == ""
  )
    return {
      vencedor: tabuleiro.estado[2],
      direcao: "V",
      coluna: 3,
      posicao: 8
    }; // o | o | ? -> 2
  if (
    tabuleiro.estado[2] == tabuleiro.estado[8] &&
    tabuleiro.estado[2] == simbolo &&
    tabuleiro.estado[5] == ""
  )
    return {
      vencedor: tabuleiro.estado[2],
      direcao: "V",
      coluna: 3,
      posicao: 5
    }; // o | ? | o -> 1
  if (
    tabuleiro.estado[5] == tabuleiro.estado[8] &&
    tabuleiro.estado[5] == simbolo &&
    tabuleiro.estado[2] == ""
  )
    return {
      vencedor: tabuleiro.estado[5],
      direcao: "V",
      coluna: 3,
      posicao: 2
    }; // ? | o | o -> 0

  //Checar diagonais
  if (
    tabuleiro.estado[0] == tabuleiro.estado[4] &&
    tabuleiro.estado[0] == simbolo &&
    tabuleiro.estado[8] == ""
  )
    return { vencedor: tabuleiro.estado[0], direcao: "D", posicao: 8 }; // o | o | ? -> 2
  if (
    tabuleiro.estado[0] == tabuleiro.estado[8] &&
    tabuleiro.estado[0] == simbolo &&
    tabuleiro.estado[4] == ""
  )
    return { vencedor: tabuleiro.estado[0], direcao: "D", posicao: 4 }; // o | ? | o -> 1
  if (
    tabuleiro.estado[4] == tabuleiro.estado[8] &&
    tabuleiro.estado[4] == simbolo &&
    tabuleiro.estado[0] == ""
  )
    return { vencedor: tabuleiro.estado[4], direcao: "D", posicao: 0 }; // ? | o | o -> 0

  if (
    tabuleiro.estado[2] == tabuleiro.estado[4] &&
    tabuleiro.estado[2] == simbolo &&
    tabuleiro.estado[6] == ""
  )
    return { vencedor: tabuleiro.estado[2], direcao: "D", posicao: 6 }; // o | o | ? -> 2
  if (
    tabuleiro.estado[2] == tabuleiro.estado[6] &&
    tabuleiro.estado[2] == simbolo &&
    tabuleiro.estado[4] == ""
  )
    return { vencedor: tabuleiro.estado[2], direcao: "D", posicao: 4 }; // o | ? | o -> 1
  if (
    tabuleiro.estado[4] == tabuleiro.estado[6] &&
    tabuleiro.estado[4] == simbolo &&
    tabuleiro.estado[2] == ""
  )
    return { vencedor: tabuleiro.estado[4], direcao: "D", posicao: 2 }; // ? | o | o -> 0

  return -1;
}
export function intersecaoDupla(tabuleiro, simbolo) {
  if (
    tabuleiro.estado[0] == tabuleiro.estado[8] &&
    tabuleiro.estado[0] == simbolo
  )
    if (tabuleiro.estado[1] == "") return 1;
    else if (tabuleiro.estado[3] == "") return 3;
    else if (tabuleiro.estado[5] == "") return 5;
    else if (tabuleiro.estado[7] == "") return 7;

  if (
    tabuleiro.estado[2] == tabuleiro.estado[6] &&
    tabuleiro.estado[2] == simbolo
  )
    if (tabuleiro.estado[1] == "") return 1;
    else if (tabuleiro.estado[3] == "") return 3;
    else if (tabuleiro.estado[5] == "") return 5;
    else if (tabuleiro.estado[7] == "") return 7;

  return -1;
}

export function intersecaoSimples(tabuleiro, simbolo) {
  if (
    tabuleiro.estado[0] == tabuleiro.estado[5] &&
    tabuleiro.estado[0] == simbolo
  )
    if (tabuleiro.estado[8] == "") return 8;
    else if (tabuleiro.estado[1] == "") return 1;
    else if (tabuleiro.estado[2] == "") return 2;

  if (
    tabuleiro.estado[2] == tabuleiro.estado[7] &&
    tabuleiro.estado[2] == simbolo
  )
    if (tabuleiro.estado[5] == "") return 5;
    else if (tabuleiro.estado[6] == "") return 6;
    else if (tabuleiro.estado[8] == "") return 8;

  if (
    tabuleiro.estado[8] == tabuleiro.estado[3] &&
    tabuleiro.estado[8] == simbolo
  )
    if (tabuleiro.estado[7] == "") return 7;
    else if (tabuleiro.estado[6] == "") return 6;
    else if (tabuleiro.estado[0] == "") return 0;

  if (
    tabuleiro.estado[6] == tabuleiro.estado[1] &&
    tabuleiro.estado[6] == simbolo
  )
    if (tabuleiro.estado[3] == "") return 3;
    else if (tabuleiro.estado[2] == "") return 2;
    else if (tabuleiro.estado[0] == "") return 0;

  return -1;
}
