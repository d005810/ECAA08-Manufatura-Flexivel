# Aula 12: Matrizes de Incidência, Adjacência e Balanço de Fluxo Matricial de Peças

## 1. Fundamentos Matemáticos: A Matriz de Incidência Vértice-Aresta ($B$)

Seja um dígrafo $G = (V, E)$ com $\vert{}V\vert{} = n$ postos de trabalho e $\vert{}E\vert{} = m$ esteiras e desvios dirigidos. A **Matriz de Incidência** $B \in \{-1, 0, 1\}^{n \times m}$ é formalmente definida por:

$$B[i, j] = \begin{cases} -1, & \text{se a rota/esteira } e_j \text{ sai do posto } v_i \text{ (origem)} \\ +1, & \text{se a rota/esteira } e_j \text{ entra no posto } v_i \text{ (destino)} \\ 0, & \text{se o posto } v_i \text{ não incide na aresta } e_j \end{cases}$$

### Propriedades Formais:
1. **Soma por Coluna Nula:** Para qualquer rota de esteira $j \in \{1, \dots, m\}$, temos $\sum_{i=1}^n B[i, j] = 0$.
2. **Conservação de Fluxo em Regime Permanente:** $B \cdot \vec{Q} = \vec{S}$.

---

## 2. Aprofundamento Teórico

### 2.1. Interpretação Física da Propriedade da Soma Nula na FMS

A propriedade $\sum_{i=1}^n B[i,j] = 0$ decorre diretamente da integridade mecânica da linha: cada segmento de esteira ou calha $e_j = (u, v)$ conecta um posto emissor $u$ a um receptor $v$. Toda peça que deixa um posto deve obrigatoriamente entrar no posto subsequente. No regime estacionário, isso estabelece a versão discreta da **Primeira Lei de Kirchhoff**, governando o tráfego e a conservação do número de peças discretas ao longo dos atuadores da fábrica.

### 2.2. Matriz de Incidência vs. Matriz de Adjacência

| Aspecto | Matriz de Incidência $B$ | Matriz de Adjacência $A$ |
| --- | --- | --- |
| Dimensão | $n \times m$ (postos × segmentos de esteira) | $n \times n$ (postos × postos) |
| Entradas | $\{-1, 0, +1\}$ (estrutural) | pesos reais (distâncias em metros) ou $\{0,1\}$ |
| Uso principal | balanço de fluxo de peças, conservação, gargalos | roteamento, caminhos mínimos (Dijkstra) |
| Relação algébrica | $B B^T$ é a **matriz Laplaciana** $L$ do grafo | $A$ mapeia conectividade direta par a par |

A relação $L = B B^T = D - A$ (onde $D$ é a matriz diagonal de graus) conecta topologia a dinâmicas de difusão na linha. Em sistemas de supervisão SCADA, $B$ é a representação ideal para auditoria de perdas ou peças travadas em esteiras, enquanto $A$ e $W$ são usadas para o algoritmo de tempo de entrega da triagem.

### 2.3. Posto da Matriz e Topologia Acíclica (DAG)

Para uma rede de manufatura conexa com $n$ postos e $m$ esteiras, a dimensão do espaço de ciclos independentes (núcleo à direita de $B$) é dada por:

$$\dim(\ker(B)) = m - n + 1$$

Na malha padrão da nossa FMS ($n = 9$ nós e $m = 8$ arestas):
$$\dim(\ker(B)) = 8 - 9 + 1 = 0$$

Isso comprova formalmente que a linha é um **Dígrafo Acíclico Dirigido (DAG)**, onde nenhuma peça pode entrar em loop infinito sob operação normal. Caso uma esteira de recirculação do descarte `DESC-304` de volta ao `SILO-100` seja instalada ($m = 9$), a dimensão do espaço de ciclos sobe para $1$, criando o primeiro laço fechado de reaproveitamento.

### 2.4. Conservação de Fluxo de Peças como Sistema Linear

Na equação $B \cdot \vec{Q} = \vec{S}$:
* $\vec{Q} \in \mathbb{R}^m$ é o vetor de taxas de fluxo de peças em trânsito ($\text{peças}/\text{min}$);
* $\vec{S} \in \mathbb{R}^n$ é o balanço líquido nos postos.

Nos postos intermediários (`INSP-200`, `DIV-201`, `DIV-202`, `DIV-203`), a ausência de acúmulo impõe $S_i = 0.0$. O Silo de Infeed apresenta balanço líquido negativo (fonte primária de material), e as caixas de triagem (`CX-301..303`) apresentam balanço positivo correspondente ao total empacotado.

---

## 3. Exemplo Resolvido

**Pergunta:** Verifique analiticamente a coluna correspondente à aresta $e_3$ (Desvio DIV-201 → CX-301) na matriz $B$ e comprove a conservação topológica.

**Resolução:** A aresta $e_3$ parte do ponto de desvio `DIV-201` e incide na caixa `CX-301`. Portanto:
* Linha de `DIV-201`: $-1$ (origem)
* Linha de `CX-301`: $+1$ (destino)
* Todas as demais linhas: $0$
Soma da coluna: $\sum B[i, 3] = -1 + 1 + 0 = 0$. A conservação pontual se confirma.

---

## 4. Atividades de Investigação

1. Se a taxa de infeed do Silo for ajustada para $30\,\text{peças}/\text{min}$ e a linha operar com 50% de peças vermelhas e 50% de peças verdes, calcule o vetor de vazões $\vec{Q}$ e prove que os postos de desvio permanecem com saldo nulo.
2. Demonstre que a multiplicação $B B^T$ resulta na matriz Laplaciana $L = D - A$ para o grafo da linha de manufatura.
3. Se adicionarmos uma esteira de recirculação de caixas cheias `CX-301 -> SILO-100`, qual será a nova dimensão do espaço de ciclos?
4. Em termos de complexidade computacional, discuta a vantagem de armazenar a topologia como matriz esparsa de incidência quando a planta expande para dezenas de células de manufatura interligadas.

---

## 5. Entregável da Aula 12

* **Motor Matricial de Balanço de Fluxo:** Implementação automatizada da Matriz de Incidência $B \in \mathbb{R}^{n \times m}$ e solução do balanço estacionário de peças $B \cdot \vec{Q} = \vec{S}$ para a FMS.
