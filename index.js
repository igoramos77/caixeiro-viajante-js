/* Um campo do vetor que contera a melhor rota */
function Rota() {
  var cidade1, cidade2, custo;
}

function PCVOtimo() {

  /* 
  *   Verifica se a permutação passada como parâmetro tem custo melhor que o custo
  *   já obtido. Caso positivo, então monta a rota correspondente à permutação como
  *   sendo a melhor rota (e armazena no vetor melhorRota, retornando tambem o custo 
  *   total da melhor rota 
  */
  const melhorCaminho = (Grafo, refPMCMR, permutacao) => {
      var cid1, cid2, custo
      const proxDaRota = new Array(refPMCMR.melhorRota.length); // Sequencia de cidades de uma rota. Indice = cidade; Valor = prox. da rota

      // Monta uma rota com a permutação. A primeira cidade é a 0
      cid1 = 0
      cid2 = permutacao[1]
      custo = Grafo[cid1][cid2]
      proxDaRota[cid1] = cid2

      for (let j = 2; j < refPMCMR.melhorRota.length; j++) {
          cid1 = cid2
          cid2 = permutacao[j]
          custo += Grafo[cid1][cid2]
          proxDaRota[cid1] = cid2
      }

      // Retorno a cidade inicial e fim do cliclo da viajem
      proxDaRota[cid2] = 0
      custo += Grafo[cid2][0] // Custo total

      // Busca o menor custo e guarda a melhor rota
      if (custo < refPMCMR.melhorCusto) {
          refPMCMR.melhorCusto = custo
          cid2 = 0
          for (let k = 0; k < refPMCMR.melhorRota.length; k++) {
              cid1 = cid2
              cid2 = proxDaRota[cid1]
              refPMCMR.melhorRota[k].cidade1 = cid1
              refPMCMR.melhorRota[k].cidade2 = cid2
              refPMCMR.melhorRota[k].custo = Grafo[cid1][cid2]
          }
      }
  }

  /*  
  *   Gera os possiveis caminhos entre a cidade zero e as outras (N-1) envolvidas
  *   na busca, armazenando-os no vetor permutacao, um por vez, e a cada permutacao
  *   gerada, chama a funcao melhorCaminho que escolhe o caminho (a permutacao) de
  *   menor custo.
  */
  const permuta = (permutacao, Grafo, refPMCMR, controle, k) => {
      var i
      permutacao[k] = ++controle

      if (controle == (refPMCMR.melhorRota.length - 1)) {
          melhorCaminho(Grafo, refPMCMR, permutacao)
      } else {
          for (i = 1; i < refPMCMR.melhorRota.length; i++) {
              if (permutacao[i] == 0) {
                  permuta(permutacao, Grafo, refPMCMR, controle, i)
              }
          }
      }

      controle--
      permutacao[k] = 0
  }

  /*
  *   Gera os possiveis caminhos entre a cidade zero e todas as outras envolvidas
  *   na rota da viagem do caixeiro e escolhe a melhor rota entre todas.
  */
  this.geraEscolheCaminhos = (Grafo, refPMCMR) => {
      var controle = -1
      refPMCMR.melhorCusto = Infinity

      for (let i = 0; i < refPMCMR.melhorRota.length; i++) {
          refPMCMR.melhorRota[i] = new Rota();
      }

      permuta(refPMCMR.permutacao, Grafo, refPMCMR, controle, 1)
  }

  // Imprime o resultado da operação
  this.imprimeMelhorCaminho = (refPMCMR) => {

      console.log('\nCusto minimo para a viajem do caixeiro: ' + refPMCMR.melhorCusto)
      console.log('melhor caminho para a viajem do caixeiro:\n')
      console.log('--- De ------ P/ ------ Custo')
      for (let i = 0; i < refPMCMR.melhorRota.length; i++) {
          console.log(`--- ${refPMCMR.melhorRota[i].cidade1} ------- ${refPMCMR.melhorRota[i].cidade2} ------- ${refPMCMR.melhorRota[i].custo}`)
      }
  }
}

// Recebe uma matriz de pesos que representa um grafo não direcionado
function start(Grafo) {
  var numCidades = Grafo.length
  var melhorCusto

  const caixeiro = new PCVOtimo

  const permutacao = new Array(numCidades)
  const melhorRota = new Array(numCidades)

  /* @refPMCMR:
  *   Objeto utilizado para passar as variaveis permutacao, melhorCusto
  *   e melhorRota por referencia
  */
  const refPMCMR = {
      permutacao,
      melhorCusto,
      melhorRota
  }

  // Inicializa todos os valores de permutação com 0. 
  // (Em js, um vetor que não foi inicializado retorna undefined em todas os indices)
  for (let i = 0; i < refPMCMR.permutacao.length; i++) {
      refPMCMR.permutacao[i] = 0
  }

  caixeiro.geraEscolheCaminhos(Grafo, refPMCMR)
  caixeiro.imprimeMelhorCaminho(refPMCMR)
}

// Os indices i e j representam os vertices. Ja os valores v[i][j], representam o custo entre estes vertices.

const Grafo = [
[0, 10, 15, 5, 12],
[10, 0, 70, 52, 27],
[15, 70, 0, 120, 14],
[5, 52, 120, 0, 38],
[12, 27, 14, 38, 0]
];


start(Grafo);