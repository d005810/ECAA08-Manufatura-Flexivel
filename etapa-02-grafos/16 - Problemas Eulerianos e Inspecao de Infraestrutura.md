# Aula 16: Problemas Eulerianos e Inspeção de Manutenção na Manufatura

## 1. Fundamentos Matemáticos: Teorema de Euler e Circuitos Eulerianos

Um **Circuito Euleriano** em um grafo não-dirigido conexo existe se e somente se **todos os vértices tiverem grau par**. Em grafos dirigidos, exige-se $\text{deg}^+(v) = \text{deg}^-(v)$ para todo nó.

---

## 2. Aprofundamento Teórico

### 2.1. Contexto Histórico: O Problema das Pontes de Königsberg

O estudo de Teoria dos Grafos como disciplina matemática nasce formalmente em **1736**, quando Leonhard Euler resolveu o problema das sete pontes de Königsberg: a cidade (atual Kaliningrado) tinha quatro regiões de terra conectadas por sete pontes sobre o rio Pregel, e a pergunta era se existia um passeio que atravessasse cada ponte exatamente uma vez, retornando ao ponto de partida. Euler provou que **não**, e ao fazê-lo formulou o critério geral que hoje leva seu nome — sendo por isso considerado o marco fundador da Teoria dos Grafos. A aula de hoje aplica exatamente o mesmo raciocínio a um problema estruturalmente idêntico: percorrer cada trecho de esteira e passarela exatamente uma vez para manutenção preventiva.

### 2.2. Definição Formal e Prova do Teorema (Caso Não-Dirigido)

**Teorema (Euler, 1736):** Um multigrafo conexo $G$ possui um circuito euleriano se e somente se todo vértice tem grau par.

**Prova (necessidade):** se existe um circuito euleriano, cada vez que o circuito "passa por" um vértice $v$ (sem ser o início/fim), ele consome uma aresta de entrada e uma de saída — contribuindo $+2$ ao grau de $v$. Como o circuito é fechado, mesmo o vértice inicial/final tem suas arestas de entrada e saída emparelhadas dessa forma. Logo, o grau de todo vértice deve ser par.

**Prova (suficiência, esboço construtivo):** se todos os graus são pares, é possível construir um circuito fechado a partir de qualquer vértice (pois nunca "ficamos presos" sem saída — sempre que entramos em um vértice por uma aresta não usada, resta um número par de arestas não usadas, logo pelo menos uma saída livre, exceto no vértice inicial ao completar o ciclo). Se esse circuito não usar todas as arestas, o subgrafo restante ainda tem todos os graus pares e compartilha pelo menos um vértice com o circuito já construído (pois o grafo é conexo); um novo circuito é construído nesse subgrafo e "costurado" ao anterior no vértice compartilhado. Repetindo esse processo, esgotam-se todas as arestas. $\blacksquare$

Esse argumento construtivo é precisamente o que o **Algoritmo de Hierholzer** (1873) formaliza e implementa de maneira eficiente.

### 2.3. Adaptação para Dígrafos e o Contexto da Manufatura

Em um grafo dirigido, o critério análogo é $\deg^+(v) = \deg^-(v)$ para todo vértice — ou seja, todo nó deve "receber" tantas arestas quanto "emite". Na nossa Planta de Manufatura Flexível, simularemos a rota de um **técnico de manutenção** (ou um robô de inspeção autônomo) que precisa percorrer as passarelas ao longo de todas as esteiras para verificar o desgaste das lonas, alinhamento dos roletes e calibração dos sensores. 

Como a passarela de manutenção permite que o técnico caminhe em ambos os sentidos (ida e volta), a rede é modelada com arestas **não-dirigidas**. Daí o uso do critério de grau par simples, e não do critério dirigido.

### 2.4. O Algoritmo de Hierholzer — Análise Detalhada

O algoritmo implementado em `calcular_circuito_hierholzer` segue a estratégia de **pilha explícita com remoção de arestas visitadas**:

1. Empilha o vértice inicial (ex: Base de Manutenção).
2. Enquanto o vértice no topo da pilha (`u`) tiver arestas não visitadas, avança para um vizinho `v` (removendo a aresta de ambas as listas de adjacência, já que o grafo é não-dirigido) e empilha `v`.
3. Quando o vértice no topo não tem mais arestas disponíveis, ele é desempilhado e anexado ao circuito final.
4. Ao término, o circuito é invertido (pois foi construído de trás para frente).

**Complexidade:** $O(|E|)$, pois cada aresta é removida (visitada) exatamente uma vez, e cada vértice entra e sai da pilha um número de vezes proporcional ao seu grau. Essa é a complexidade ótima possível para o problema.

### 2.5. Relação com o Problema do Carteiro Chinês

Quando a planta física **não** satisfaz o critério de Euler (existem estações/vértices de grau ímpar), o problema de "percorrer todas as passarelas com o menor custo total, permitindo repetições onde necessário" é conhecido como **Problema do Carteiro Chinês** (*Chinese Postman Problem*, Kwan Mei-Ko, 1962). A solução consiste em: 
(i) identificar as estações de grau ímpar; 
(ii) encontrar o **emparelhamento de custo mínimo** entre elas (usando caminhos mínimos de Dijkstra); 
(iii) duplicar as arestas desses caminhos, tornando artificialmente todos os graus pares; 
(iv) aplicar Hierholzer no grafo aumentado. 

Esse problema é solucionável em tempo polinomial $O(n^3)$ usando o Algoritmo de Edmonds.

---

## 3. Exemplo Resolvido

**Pergunta:** Verifique manualmente, pelo Lema do Aperto de Mãos, que a rede de inspeção da nossa Manufatura Flexível (composta por 9 passarelas interligando as estações) tem todos os graus pares.

**Resolução:** Cada passarela de inspeção contribui $+1$ ao grau de cada uma de suas duas estações extremas. Contando as incidências por estação (vértice):
* `Base_Manutencao`: aparece nas passarelas `p1` e `p6` → grau $2$.
* `Estacao_Silo`: aparece em `p1, p2, p7, p9` → grau $4$.
* `Estacao_Inspecao`: aparece em `p2, p3, p8, p9` → grau $4$.
* `Estacao_Triagem`: aparece em `p3, p4, p7, p8` → grau $4$.
* `Caixa_Lote_1`: aparece em `p4, p5` → grau $2$.
* `Caixa_Lote_2`: aparece em `p5, p6` → grau $2$.

Todos os graus são pares ($2$ ou $4$), confirmando que é possível que o técnico saia da Base, inspecione todas as esteiras exatamente uma vez e retorne para a Base sem repetir caminho (`Grafo é Euleriano: True`).

---

## 4. Atividades de Investigação

1. Adicione uma décima passarela `Caixa_Lote_2 -> Caixa_Lote_1` (paralela à `p5` existente) e verifique se o grafo da planta permanece euleriano. Quais estações passam a ter grau ímpar?
2. Para o cenário do item anterior, aplique manualmente a estratégia do Problema do Carteiro Chinês: qual percurso precisaria ser percorrido duas vezes (duplicado) para restaurar a paridade de todos os graus minimizando a caminhada extra?
3. Compare o circuito gerado por `calcular_circuito_hierholzer` partindo da `Base_Manutencao` com um circuito hipotético partindo da `Estacao_Triagem`. Ambos são igualmente válidos? O comprimento total percorrido muda?
4. Pesquise a solução do problema original das Sete Pontes de Königsberg e desenhe o grafo correspondente, identificando os graus de cada uma das quatro regiões de terra.

---

## 5. Entregável da Aula 16

* **Algoritmo de Rota de Inspeção Euleriana em Python:** Mapeamento da malha de passarelas da manufatura e cálculo do circuito ótimo de manutenção preventiva com o algoritmo de Hierholzer.
