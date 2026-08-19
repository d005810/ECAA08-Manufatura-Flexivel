# ECAA08-Manufatura-Flexivel
Motor computacional de supervisão, controle e diagnóstico para Célula de Manufatura Flexível - ECAA08.
## 1. Definição da Planta de Automação
## Processo Selecionado
**Célula de Manufatura Flexível e Triagem Automática de Peças.**
## 2. Descritivo de funcionamento
  A Célula de Manufatura Flexível opera de forma sequencial e automatizada para o recebimento, identificação, roteamento, loteamento e supervisão de segurança/diagnóstico de peças manufaturadas. O processo está estruturado em três setores principais de controle (Setor 100: Alimentação e Transporte, Setor 200: Inspeção e Triagem, e Setor 300: Loteamento, Segurança e Supervisão) e funciona da seguinte maneira:
## 2.1 Entrada e Alimentação: 
  As peças ficam armazenadas em um silo de alimentação. Após o comando de partida do sistema, a esteira transportadora principal é acionada e um pistão pneumático insere individualmente cada peça na esteira, liberando o início do ciclo de triagem.
## 2.2 Estação de Inspeção (Dimensional e Cor):
  A peça se desloca até a estação de medição, onde o processo de transporte é momentaneamente pausado. Neste ponto, ocorrem duas avaliações simultâneas:
- Inspeção Dimensional: Sensores de perfil ou chaves fim de curso determinam se a peça é Pequena ou Grande.
- Inspeção de Cor: Um sensor de visão (ou sensor de cor RGB) identifica a pigmentação da peça, classificando-a como Azul, Verde ou Vermelha.
## 2.3 Roteamento e Triagem:
Com base na combinação de cor e tamanho (como peças Grandes Vermelhas, Grandes Verdes ou Pequenas Azuis), o controlador aciona desviadores pneumáticos (pistões empurradores) posicionados ao longo da esteira para direcionar a peça à sua respectiva rota.
## 2.4 Estocagem
  A peça é direcionada para a rampa ou esteira secundária correspondente ao seu destino:
- **Contagem de Lotes:** Sensores de contagem nas saídas registram a quantidade de peças para a formação de lotes (batches) de expedição em caixas.
- **Controle de Capacidade:** Ao atingir o limite de capacidade da caixa (10 peças), o indicador de caixa cheia é ativado, bloqueando temporariamente a alimentação de novas peças no sistema para evitar acúmulo e transbordo até que o lote seja retirado e zerado.
## 2.5 Segurança e Supervisão de Alarmes
O processo conta com monitoramento contínuo de segurança e diagnósticos operacionais:
- **Dispositivos de Emergência:** Acionamento de botão de parada de emergência ou detecção de sobrecarga elétrica/térmica no motor da esteira.
- **Detecção de Falhas e Inconsistências:** O sistema supervisiona anomalias físicas e operacionais (como falha/incoerência nos sensores de tamanho e cor ou conflitos no silo).
- **Sinalização de Alerta:** Qualquer condição de risco, emergência ou inconsistência aciona o sinaleiro de alarme geral da planta, paralisando a operação para manutenção da segurança.
