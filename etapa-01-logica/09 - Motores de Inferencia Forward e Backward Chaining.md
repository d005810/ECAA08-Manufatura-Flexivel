# Aula 09: Motores de Inferência — Encadeamento para Frente e para Trás

## 1. Fundamentos Matemáticos: Algoritmos de Inferência em Lógica de Produção

Um **Motor de Inferência (*Inference Engine*)** é o algoritmo formal responsável por avaliar as regras de produção da base de conhecimento ($\mathcal{R}$) sobre os fatos ativos ($\mathcal{F}$) para produzir novas deduções ou auditar a causa-raiz de eventos na Célula de Manufatura Flexível.

### 1.1. Encadeamento para Frente (*Forward Chaining* — Data-Driven)
* **Princípio:** Inicia com os **fatos conhecidos** (leituras de sensores de campo como `s_topo`, `not_s_base`, `emergencia`) e dispara sucessivamente as regras cujos antecedentes são subconjuntos dos fatos (*Modus Ponens*), acumulando os consequentes até alcançar um ponto fixo (*Fixed Point*):
  $$\mathcal{F}_{k+1} = \mathcal{F}_k \cup \{C_i \mid \bigwedge A_i \subseteq \mathcal{F}_k\}$$
* **Aplicação em Manufatura:** Diagnóstico em tempo real de falhas operacionais e emissão de trips de intertravamento contínuo.

### 1.2. Encadeamento para Trás (*Backward Chaining* — Goal-Driven)
* **Princípio:** Inicia com uma **meta/hipótese** de diagnóstico (ex: *"O motor M-101 sofreu desarme de segurança?"*) e busca recursivamente quais antecedentes ou leituras sensoriais foram responsáveis por provar a meta (árvore de prova $AND/OR$).
* **Aplicação em Manufatura:** Investigação pós-falha (*Root Cause Analysis* / Auditoria SCADA).

---

## 2. Entregável da Aula 09

* **Motor Híbrido de Inferência em Python:** Implementação orientada a objetos dos algoritmos *Forward Chaining* e *Backward Chaining* com rastreamento completo da árvore de inferência (*Audit Trail*) para a Célula de Manufatura Flexível, avaliando inconsistências nos sensores `ZS-201`, `ZS-202`, chave de nível `LS-101`, loteamento de caixas e desarme do motor `M-101`.
