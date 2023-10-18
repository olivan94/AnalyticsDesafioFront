# Color Guess
Desafio Frontend Analytics — advinhe o código HEX das cores

![image](https://github.com/olivan94/AnalyticsDesafioFront/blob/main/assets/Captura%20de%20tela%202023-10-18%20181351.png)

## Como o jogo funciona?
O jogo consiste em acertar o máximo possível de cores em 30s. Quando o jogo inicia, uma cor aleatória irá aparecer e com ela 3 opções de resposta (em hexadecimal), sendo duas incorretas (geradas aleatoriamente), e uma correta.

A cada rodada, uma nova cor aparece, e o jogador terá 10s para responder e resultar em ganho ou perda de pontuação:
- Se o jogador não responder a tempo, ele perde 2 pontos.
- Se o jogador responder a tempo, mas errado, perderá 1 ponto.
- Se o jogador responder a tempo e corretamente, ganhará 5 pontos.

## Funcionalidades obrigatórias
- O jogo só começa quando o jogador decide.
- Caso o jogador atualize, ou feche a página:
  - High Score deverá persiste.
  - Se um jogo estiver em andamento, volta ao estado inicial com o botão `START`.
  - Pilha referente a última partida concluída persiste.
- Se o jogador quiser, ele pode reiniciar a partida a qualquer momento.
- Se o jogador quiser, ele pode limpar todos os dados já salvos pelo jogo.
- Existe uma barra indicando o tempo restante de jogo.
- Caso o usuário não forneça uma resposta dentro de 10s, uma resposta errada é computada. Caso o usuário não responda nenhuma vez, haverão 3 respostas erradas que foram computadas automaticamente pelo sistema.
- Toda vez que uma resposta nova é fornecida, o timer de 10s é resetado mas o de 30s continua.
- A barra sempre reflete o timer geral (30s).

## Experiência do usuário
- Textos com fundo colorido têm contraste agradável, o texto tem uma cor escura ou clara defininda automaticamente a depender do fundo.
- O painel lateral funciona como uma pilha, ou seja, a cada rodada as respostas mais recentes aparecem no topo.
- O painel lateral cresce verticalmente e infinitamente, e o scroll existe apenas nele.

<!-- ![image](https://user-images.githubusercontent.com/47633508/195155499-50b2a888-5810-4a91-8d98-99c6dceac268.png)

![image](https://github.com/gustavoittner/AnalyticsDesafioFront/assets/47633508/7c841a46-979c-487e-9b62-24192e5b3bcc) -->
