# Aula 11: Teoria dos Grafos — Modelagem de Esteiras e Rotas de Triagem

## 1. Fundamentos Matemáticos: Definição Formal de Dígrafos Ponderados de Manufatura

Em uma Célula de Manufatura Flexível (*Flexible Manufacturing System – FMS*), o fluxo de transporte contínuo e a triagem de peças sólidas são formalmente modelados através de um **Grafo Dirigido e Ponderado (Dígrafo)**:

$$G = (V, E, W)$$

Onde:
1. **$V = \{v_1, v_2, \dots, v_n\}$** é o conjunto finito de **vértices (nós topológicos)**: silo de infeed, calhas de transferência, túnel óptico de inspeção dimensional/cor, desvios pneumáticos e caixas de loteamento.
2. **$E \subseteq V \times V$** é o conjunto de **arestas dirigidas (arcos)** de esteiras transportadoras com sentido unívoco de movimentação de material.
3. **$W: E \rightarrow \mathbb{R}^+$** é a **função de ponderação**, que associa a cada segmento de transporte o seu comprimento físico $L\text{ [m]}$ (ou tempo nominal de deslocamento sob velocidade da esteira $M\text{-}101$).

```mermaid
graph LR
    SILO["SILO-100: Silo Infeed"] -->|"0.8m - XV-101"| INSP["INSP-200: Tunel Optico"]
    INSP -->|"1.2m - M-101"| DIV1["DIV-201: Ponto de Desvio 1"]
    DIV1 -->|"0.5m - XV-201"| CX1["CX-301: Caixa 1 - Vermelha"]
    DIV1 -->|"1.0m - M-101"| DIV2["DIV-202: Ponto de Desvio 2"]
    DIV2 -->|"0.5m - XV-202"| CX2["CX-302: Caixa 2 - Verde"]
    DIV2 -->|"1.0m - M-101"| DIV3["DIV-203: Ponto de Desvio 3"]
    DIV3 -->|"0.5m - XV-203"| CX3["CX-303: Caixa 3 - Azul"]
    DIV3 -->|"0.8m - M-101"| DESC["DESC-304: Calha de Descarte"]
