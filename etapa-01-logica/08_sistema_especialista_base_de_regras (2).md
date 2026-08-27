# Aula 08: Base de Conhecimento e Sistema Especialista em Lógica de Predicados

**Projeto SCADA-Core:** Linha de Triagem e Loteamento Inteligente (Manufatura Flexível)  
**Disciplina:** ECAA08 — Matemática Discreta / Automática  
**Contexto:** Engenharia de Controle e Automação  

---

## 1. Fundamentos: Sistemas Especialistas Baseados em Regras (FOL)

Um **Sistema Especialista Industrial** utiliza uma base de conhecimento estruturada em **Lógica de Primeira Ordem (FOL)** para realizar diagnóstico preditivo, inferência de falhas e tomada de decisão de roteamento em tempo real.

O motor de inferência avalia o conjunto de fatos atuais $\mathcal{F}$ da planta (leituras de I/O) contra a base de regras $\mathcal{R}$ através do mecanismo de **Encadeamento para Frente (*Forward Chaining*)** e **Modus Ponens**:

$$\frac{P(x), \quad \forall x (P(x) \rightarrow Q(x))}{Q(x)}$$

---

## 2. Base de Fatos e Tags do P&ID

A base de fatos é populada a cada ciclo de scan pelos sensores do sistema:
* **Sensores de Inspeção:** `ZS-201` (Base), `ZS-202` (Topo), `AS-201` (Cores RGB)
* **Alimentação:** `LS-101` (Nível Silo), `ZS-101` (Presença Saída), `XV-101` (Pistão Infeed)
* **Triagem:** `XV-301`, `XV-302`, `XV-303` (Pistões 1, 2 e 3)
* **Loteamento:** `US-301`, `US-302`, `US-303` (Contadores ópticos de caixas)
* **Segurança Geral:** `HS-301` (Botão Emergência), `HS-302` (Stack de Alarme $a_1$), `M-101` (Motor Esteira)

---

## 3. Base de Regras Dedutivas de Diagnóstico e Roteamento

### 3.1. Regras de Diagnóstico e Falha Sensorial
1. **R-DIAG-01 (Inconsistência Geométrica):**
   $$\forall p \in \mathcal{P}, \, (\neg \text{Base}(p) \land \text{Topo}(p)) \implies \text{Falha}(\text{ZS-201}) \land \text{Alarme}(a_1)$$
2. **R-DIAG-02 (Conflito Óptico de Cor):**
   $$\forall p \in \mathcal{P}, \, ((\text{Cor}(p, R) \land \text{Cor}(p, G)) \lor (\text{Cor}(p, R) \land \text{Cor}(p, B)) \lor (\text{Cor}(p, G) \land \text{Cor}(p, B))) \implies \text{Falha}(\text{AS-201}) \land \text{Alarme}(a_1)$$
3. **R-DIAG-03 (Inconsistência de Silo):**
   $$\text{SiloVazio}() \land \text{PecaNaSaida}() \implies \text{Falha}(\text{ZS-101}) \land \text{Alarme}(a_1)$$
4. **R-DIAG-04 (Pistão Travado):**
   $$\forall a \in A_{\text{atuadores}}, \, (\text{CMD}(a) \land \neg \text{FC}(a) \land \text{Timeout}(a)) \implies \text{FalhaMecanica}(a) \land \text{Alarme}(a_1)$$

### 3.2. Regras de Triagem e Classificação
1. **R-TRI-01 (Braço 1 - XV-301):**
   $$\forall p, \, (\text{Grande}(p) \land \text{Cor}(p, R) \land \neg \text{LoteCheio}(1) \land \neg \text{Emergencia}()) \implies \text{Acionar}(\text{XV-301})$$
2. **R-TRI-02 (Braço 2 - XV-302):**
   $$\forall p, \, (\text{Grande}(p) \land \text{Cor}(p, G) \land \neg \text{LoteCheio}(2) \land \neg \text{Emergencia}()) \implies \text{Acionar}(\text{XV-302})$$
3. **R-TRI-03 (Braço 3 - XV-303):**
   $$\forall p, \, (\text{Pequeno}(p) \land \text{Cor}(p, B) \land \neg \text{LoteCheio}(3) \land \neg \text{Emergencia}()) \implies \text{Acionar}(\text{XV-303})$$

### 3.3. Regras de Loteamento e Trip de Segurança
1. **R-LOT-01 (Lote Completo):**
   $$\forall c \in C_{\text{lotes}}, \, (\text{Contagem}(c) \ge 10 \implies \text{AlertaIntervencao}(c) \land \text{BloquearRota}(c))$$
2. **R-SEC-01 (Trip do Motor M-101):**
   $$\text{Emergencia}() \lor (\exists m, \text{Sobrecarga}(m)) \lor (\forall s, \text{LoteCheio}(s)) \implies \text{DesarmarMotor}(\text{M-101})$$

---

## 4. Entregável de Código
* Implementação do motor de inferência executável no notebook anexo: `08 - Base de Conhecimento e Sistema Especialista.ipynb`.
