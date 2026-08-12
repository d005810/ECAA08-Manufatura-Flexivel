# ECAA08-Manufatura-Flexivel
Motor computacional de supervisão, controle e diagnóstico para Célula de Manufatura Flexível - ECAA08.
## 1. Definição da Planta de Automação
## Processo Selecionado
**Célula de Manufatura Flexível e Triagem Automática de Peças.**
## 2. Descritivo de funcionamento
  A Célula de Manufatura Flexível opera de forma sequencial para o recebimento, identificação, roteamento e estocagem de peças manufaturadas. O processo funciona da seguinte maneira:
## 2.1 Entrada e Alimentação: 
  As peças chegam à célula de triagem por meio de uma esteira transportadora principal de alimentação. Um sensor óptico de barreira detecta a entrada de uma nova peça no sistema, liberando o início do ciclo de triagem.
## 2.2 Estação de Inspeção (Dimensional e Cor):
  A peça se desloca até a estação de medição, onde o processo de transporte é momentaneamente pausado. Neste ponto, ocorrem duas avaliações simultâneas:
- Inspeção Dimensional: Sensores de perfil ou chaves fim de curso determinam se a peça é Pequena ou Grande.
- Inspeção de Cor: Um sensor de visão (ou sensor de cor RGB) identifica a pigmentação da peça, classificando-a como Azul, Verde ou Vermelha.
