# ADR-0011: Produto primeiro; indicadores secundários (correção de ênfase)

- **Status:** aceito (2026-06-21) — refina [ADR-0001](0001-vitrine-agregador-read-only.md) e [ADR-0005](0005-indicadores.md)

## Contexto

Os primeiros protótipos de design (dispatch de 2026-06-21) trataram os **indicadores** como o assunto do panlabs — o termo *"laboratório vivo de sinais"* apareceu repetidamente. A investigação nos próprios docs confirmou a causa-raiz: eles **super-especificaram os sinais e sub-especificaram o produto**.

- `VISION.md` e `CONTEXT.md` definiam **Card** como uma fileira de widgets (`status · tech-chips · stars · sparkline · acessos + visitar`) — nome/tagline/descrição/visual da solução não entravam na definição do card, só no modelo de dados.
- Várias frases colavam a **identidade**/"Premium" do panlabs aos indicadores (`ADR-0001`, `ADR-0005`, e `VISION` definindo o produto pela "única métrica que só ele pode medir").
- O peso textual do `CONTEXT.md` (verbetes, invariantes) pendia para os sinais; "Solução" ganhava duas linhas.

Um agente de design leu isso fielmente e concluiu que os sinais eram o protagonista.

## Decisão

1. **O produto é o herói.** O assunto do panlabs são as **soluções SaaS**; cada card existe para apresentar uma solução (o que é + um jeito de entrar). *Laboratório vivo* é **tom**, não tema.
2. **Indicadores são prova-de-vida secundária.** O set de [ADR-0005](0005-indicadores.md) continua válido, mas subordinado ao produto — nunca o atrativo principal.
3. **Docs travam intenção e prioridade; o design é dono da forma.** *Quais* sinais, *quanto*, *onde* e com que *tratamento* aparecem na face do card são decisão de design — os docs não prescrevem layout. Foi a prescrição de forma (a fileira fixa de widgets) que sequestrou a prioridade.

## Consequências

- `Card` passa a ser definido por **prioridade de intenção** (produto → ação → vitalidade discreta), não por lista de widgets — corrigido em `VISION.md` e `CONTEXT.md`.
- Frases que colavam identidade a indicadores foram corrigidas em `VISION.md` e `ADR-0001`; `ADR-0005` ganhou nota de status apontando para cá.
- Prompts de dispatch para design passam a afirmar produto-primeiro e a devolver a forma ao agente.
- Risco inverso registrado: **não** sobre-especificar forma "para garantir produto-primeiro" — isso repetiria o erro na direção oposta.

## Alternativas rejeitadas

- **Reescrever VISION/CONTEXT do zero** — desproporcional; o problema era ênfase, não fundação.
- **Manter os docs e corrigir só no prompt** — deixaria a fonte de verdade contradizendo o prompt; o próximo agente releria o viés.
