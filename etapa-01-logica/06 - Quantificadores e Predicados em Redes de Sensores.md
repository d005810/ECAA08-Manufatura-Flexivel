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
