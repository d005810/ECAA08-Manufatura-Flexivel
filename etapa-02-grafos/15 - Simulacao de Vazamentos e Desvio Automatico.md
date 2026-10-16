# Aula 15: Simulação de Falhas e Redirecionamento Automático de Peças

## 1. Fundamentos Matemáticos: Reconfiguração Dinâmica de Grafos em Tempo Real

Na detecção de um travamento (*jamming*) ou falha em um segmento de esteira ou braço de triagem $(u, v)$, o sistema SCADA executa a punição topológica $W(u, v) \leftarrow \infty$ e recalcula instantaneamente a rota via Dijkstra (ou lógica de roteamento em grafos) para acionar rotas de contingência e comutar os braços pneumáticos.

---

## 2. Aprofundamento Teórico

### 2.1. Grafos Dinâmicos e o Conceito de Reponderação

Um **grafo dinâmico** é aquele cujo conjunto de arestas ou pesos varia ao longo do tempo, $G_t = (V, E_t, W_t)$. Em nossa Planta de Manufatura Flexível, os vértices representam os pontos de decisão (Estação de Inspeção, Saídas de Triagem) e as arestas representam os trechos de esteira. A técnica de reponderação usada nesta aula — atribuir $W(u,v) \leftarrow \infty$ a um trecho isolado ou travado — é a forma mais simples de modelar uma mudança topológica. Ao invés de remover fisicamente a aresta da estrutura de dados do controlador, basta torná-la "infinitamente cara". Isso garante que o algoritmo de roteamento não direcione peças para um braço pneumático defeituoso ou uma esteira secundária travada, preservando o histórico de que a rota física existe (apenas está em falha ou manutenção).

### 2.2. Recomputar do Zero vs. Algoritmos Incrementais

A estratégia adotada — **recomputar caminhos do zero** a cada mudança de peso ou status de sensor — é robusta e tem custo $O((|V|+|E|)\log|V|)$ por recomputação. Na nossa fábrica (que possui poucos nós de decisão entre o Silo e as Caixas de Loteamento), esse tempo é irrisório. No entanto, em sistemas logísticos de grande escala (centrais de distribuição da Amazon ou Correios com milhares de esteiras e desvios cruzados), essa abordagem se torna custosa. Nesses casos, utiliza-se estruturas de dados especializadas (árvores de menor caminho dinâmicas, *dynamic shortest path trees*) que atualizam apenas a porção do grafo afetada pela falha do atuador.

### 2.3. Tempo de Decisão como Métrica de Engenharia

O tempo de decisão do recálculo de rotas no controlador (CLP) é medido em milissegundos, frequentemente limitado apenas pelo **ciclo de scan** do CLP (tipicamente $10$ a $50\text{ ms}$). Um algoritmo de roteamento que processa em frações de milissegundo é ordens de magnitude mais rápido que o tempo típico de atuação de um atuador pneumático (o tempo para um pistão estender e retrair fisicamente leva entre $100$ e $300\text{ ms}$). Isso confirma que, na automação discreta, **o gargalo de cadência (throughput) está na cinemática física, não no cálculo computacional**.

### 2.4. Conectividade, Pontes e Vértices de Articulação

A simulação de travamento levanta uma pergunta estrutural importante: **quais equipamentos, se falharem, param completamente a planta?** Um trecho cuja remoção aumenta o número de componentes conexos do grafo é chamado de **ponte** (*bridge*); um vértice com a mesma propriedade é um **vértice de articulação** (*cut vertex*). 

Na nossa planta, a **Esteira Principal (M-101)** é uma ponte clássica. Se ela falhar ($W(\text{Silo}, \text{Inspeção}) \leftarrow \infty$), não há rota alternativa e o grafo é desconectado (parada total da produção). Já a falha da **Esteira Secundária 1** pode não ser uma ponte se o sistema estiver programado para desviar peças vermelhas para uma "Caixa de Rejeito" ou "Overflow" no final da esteira principal.

**Algoritmo de detecção de pontes (Tarjan, 1974):** executa uma única DFS ($O(|V|+|E|)$) para encontrar tempos de descoberta. Esse algoritmo identificaria **de antemão** gargalos críticos (como a esteira principal M-101 ou o túnel de sensores), permitindo que a engenharia justifique o investimento em redundância física (uma segunda esteira em paralelo).

### 2.5. Resiliência de Rede: k-Conectividade

Dizemos que um grafo é **$k$-aresta-conexo** se é necessário remover pelo menos $k$ arestas para desconectá-lo. Uma manufatura verdadeiramente flexível e tolerante a falhas busca aumentar sua conectividade. Se a planta tivesse duas esteiras principais em paralelo (redundância), ela seria $2$-aresta-conexa nesse estágio, garantindo que a falha de um único motor não zerasse a produção.

---

## 3. Exemplo Resolvido

**Pergunta:** Suponha que a planta possui uma esteira secundária de "Overflow" (transbordo) no final da linha para peças que não foram triadas. Se a **Esteira Secundária 1** (destino original das peças vermelhas) travar e, simultaneamente, a **Esteira de Overflow** também estiver cheia, qual será a decisão lógica do SCADA ao ler uma peça vermelha na Inspeção?

**Resolução:** Ambas as arestas de destino viáveis para a peça vermelha estarão com peso $\infty$. O grau de saída efetivo de rotas seguras para aquela peça será zero. O algoritmo retornará custo $\infty$ (sem rota segura). O SCADA, ao receber essa resposta, acionará o intertravamento global de segurança, ativando a Parada de Emergência ($e_1 \leftarrow 1$) e desligando a Esteira Principal M-101 para evitar colisão e derramamento de peças no chão de fábrica. A rede não é resiliente a essas duas falhas simultâneas de destino.

---

## 4. Atividades de Investigação

1. Implemente uma função que teste, para cada equipamento da planta (vértices e arestas), se sua falha (reponderação para $\infty$) para a produção inteira. Quantas "pontes" existem na nossa arquitetura atual?
2. Compare o tempo de ciclo de scan de um CLP comercial (ex: Siemens S7-1200) com o tempo típico de avanço de um cilindro pneumático ISO padrão. Quantas verificações lógicas o CLP consegue fazer enquanto o braço ainda está se movendo?
3. Proponha uma modificação no layout físico da planta (inserindo novos desvios ou esteiras transversais) para tornar o sistema de Loteamento resiliente a falhas nas caixas. Onde essa rota deveria se originar e terminar?
4. Pesquise o conceito de *dynamic shortest path trees* e explique por que a recomputação total se torna impraticável em um centro de distribuição logístico gigante com dezenas de milhares de trechos de roletes motorizados.

---

## 5. Entregável da Aula 15

* **Simulador de Roteamento e Falhas Discretas:** Teste de estresse com injeção programada de falha em atuadores pneumáticos (simulando encravamento) e validação do desvio de peças ou parada segura da planta em milissegundos.
