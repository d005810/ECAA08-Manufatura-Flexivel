# Aula 10: Avaliação Integrada do Módulo 1 — Motor de Intertravamento e Diagnóstico

**Projeto SCADA-Core:** Linha de Triagem e Loteamento Inteligente (Manufatura Flexível)  
**Disciplina:** ECAA08 — Automática / Matemática Discreta  
**Contexto:** Engenharia de Controle e Automação  

---

## 1. Escopo e Diretrizes do Desafio de Engenharia

Nesta avaliação integradora, consolidamos todos os fundamentos do **Módulo 1: Lógica Formal & Sistemas Especialistas**, operando de forma integrada na Célula de Manufatura Flexível:

1. **Mapeador Proposicional e Telemetria de Tags ISA-5.1:** Conversão contínua de sinais de campo (sensores ópticos `ZS-201/202`, sensores de cor `AS-201..203`, nível `LS-101`, botão `HS-301` e contagem `US-301..303`) em proposições booleanas atômicas.
2. **Motor de Intertravamento e Segurança:** Avaliação em tempo de varredura (*Scan Cycle*) da equação lógica de Trip e parada segura do motor `M-101` e alimentador `XV-101`.
3. **Sistema Especialista com Forward Chaining:** Aplicação de regras em Cláusulas de Horn para deduzir diagnósticos de causa-raiz (inconsistência geométrica, transbordo de lote, ambiguidade óptica de cor).

```mermaid
graph TD
    A["1. Telemetria Bruta de I/O da Planta<br>(LS-101, ZS-201, AS-201, US-301, HS-301...)"] --> B["2. Mapeador Proposicional<br>(Discretização Booleana dos Estados)"]
    B --> C["3. Equação de Intertravamento de Segurança<br>(Cálculo de Trip_Ativo do Motor M-101)"]
    B --> D["4. Base de Fatos Ativos F(t)"]
    D --> E["5. Motor de Inferência (Forward Chaining)"]
    E --> F["6. Diagnósticos Deduzidos e Alarmes (HS-302 / a1)"]
