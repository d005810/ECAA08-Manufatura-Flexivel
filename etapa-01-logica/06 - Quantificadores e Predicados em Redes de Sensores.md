# Aula 06: Lógica de Predicados e Quantificadores na Manufatura Flexível

## 1. Fundamentos Matemáticos: Lógica de Primeira Ordem (FOL)

Enquanto a lógica proposicional trata sentenças atômicas indivisíveis, a **Lógica de Predicados** permite parametrizar propriedades sobre domínios e conjuntos finitos de ativos industriais da Célula de Manufatura Flexível.

1. **Predicado $P(x)$:** Função booleana $P: U \rightarrow \{0,1\}$, onde $U$ é o universo de discurso (ex: conjunto de esteiras $M$, conjunto de sensores ópticos $S$).
2. **Quantificador Universal ($\forall x \in U, P(x)$):**
   * "Para todo $x$ em $U$, $P(x)$ é Verdadeiro."
   * Expansão em domínio finito $U = \{x_1, x_2, ..., x_n\}$: $\forall x P(x) \equiv P(x_1) \land P(x_2) \land ... \land P(x_n)$
3. **Quantificador Existencial ($\exists x \in U, P(x)$):**
   * "Existe ao menos um $x$ em $U$ tal que $P(x)$ é Verdadeiro".
   * Expansão em domínio finito: $\exists x P(x) \equiv P(x_1) \lor P(x_2) \lor ... \lor P(x_n)$
     
  ## 2. Aplicação nos Universos de Discurso da Planta (SCADA)

  Definimos os seguintes domínios finitos (Universos $U$) baseados no P&ID do sistema:
  * $S_{\text{contagem}} = \{\text{US-301}, \text{US-302}, \text{US-303}\}$ (Sensores de loteamento)
  * $S_{\text{cor}} = \{\text{AS-201}, \text{AS-202}, \text{AS-203}\}$ (Sensores ópticos de inspeção)
  * $M_{\text{esteiras}} = \{\text{M-101}, \text{M-301}, \text{M-302}, \text{M-303}\}$ (Motores de transporte)

  ### 2.1. Exemplos de Predicados e Quantificadores
  * **Alarme Geral de Transbordo (Todas as caixas cheias):**
    $$\text{AlarmeTransbordo} \equiv \forall s \in S_{\text{contagem}}, \text{CaixaCheia}(s)$$
  * **Detecção de Falha na Rede de Instrumentos:**
    $$\text{FalhaRede} \equiv \exists x \in (S_{\text{contagem}} \cup S_{\text{cor}}), \text{EmFalha}(x)$$
  * **Validação de Triagem (Pelo menos um pistão atuando):**
    $$\text{TriagemAtiva} \equiv \exists a \in \{\text{XV-201}, \text{XV-202}, \text{XV-203}\}, \text{Atuado}(a)$$
