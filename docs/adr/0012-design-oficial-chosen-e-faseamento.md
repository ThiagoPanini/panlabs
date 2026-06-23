# ADR-0012: Design oficial "Chosen" e faseamento do V1 (V1.0 visual / V1.1 backend)

- **Status:** aceito (2026-06-22) — refina [ADR-0005](0005-indicadores.md), [ADR-0008](0008-superficie-v1-landing-unica.md) e [ADR-0011](0011-produto-primeiro-indicadores-secundarios.md)

## Contexto

Após rodadas de prototipação no Claude Design, um protótipo — **"Chosen"** (`.claude/design/panlabs/project/panlabs.dc.html`) — foi escolhido como o design **oficial e absoluto** do V1: a versão que o autor quer implementar literalmente. Os insumos extraídos (design-spec, tokens, theme.css, `components/*`, layout, a11y, handoff) vivem em `.claude/design/panlabs`.

Onde Chosen e os docs de concepção (2026-06-21) divergem, **o design tem prioridade** — é a forma que o autor de fato deseja, e o [ADR-0011](0011-produto-primeiro-indicadores-secundarios.md) já estabeleceu que **forma é decisão do design**. Uma sabatina (2026-06-22) percorreu as divergências e fechou escopo e faseamento.

## Decisão

1. **Chosen é o design oficial e único do V1.** Implementar literalmente, recriando com fidelidade na stack ([ADR-0003](0003-stack-next-postgres-sem-fastapi.md)). O **preview visual de 148px** no topo do card é a *assinatura* do design — deixa de ser "opcional" na prática (segue sendo escolha do design, que a tornou central).

2. **V1 é faseado.** A feature que força a quebra é o **pipeline de vitalidade ao vivo do GitHub** (fetch + cache + rate-limit + fallback): backend pesado, invisível no design e ortogonal ao critério de sucesso (o sistema visual agradar).
   - **V1.0 — visual no ar:** front-end + deploy, **sem DB, sem GitHub**. Vitalidade **curada estática** (números reais do dia do build). CTA linka **direto** à `targetUrl`. Inclui **responsivo** e **a11y base** (não estão em Chosen, mas o link é público e a audiência abre no mobile). Deploy em `panlabs.tech` (Cloudflare + Coolify, só container Next).
   - **V1.1 — app de verdade:** `/go/[slug]` + Postgres (re-rota o CTA), vitalidade **live do GitHub** + cache/fallback, auto-hospedar fontes/ícones, logo SVG.

3. **Catálogo V1.0 = 2 soluções reais + 1 placeholder.** epistemix (`live`) e traveltogether (`beta`) redirecionam de fato. O 3º card é um **placeholder anônimo `// TODO`** — sem link, sem stats, sem CTA, preview vazio, zero motion. É o lugar do estágio "em breve" sem renderizar badge. **querymind não é real**; entra via PR ([ADR-0006](0006-catalogo-tres-fontes.md)) quando existir.

4. **Onde o design contraria ADR anterior, o design vence.** A face do card traz `stars · commits · PRs · sparkline de commits`. `commits` (absoluto) e `PRs` foram **rejeitados na face** pelo [ADR-0005](0005-indicadores.md), mas a autoridade de forma do design ([ADR-0011](0011-produto-primeiro-indicadores-secundarios.md)) os reinstancia. As preocupações do ADR-0005 (número sem significado / definição ambígua) viram **trabalho de V1.1**: definir a semântica honesta de cada um ao ligar os dados live. **Cliques** ficam medidos-não-exibidos — e, na prática, só medidos a partir do V1.1.

## Consequências

- O critério de sucesso do V1 ([VISION](../VISION.md)) é atingido já no **V1.0**: landing no ar, ≥2 soluções que redirecionam, sistema visual para avaliar.
- Docs reconciliados para não contradizer o que será construído (princípio do [ADR-0011](0011-produto-primeiro-indicadores-secundarios.md)): nota em `ADR-0005`, ajustes em `VISION.md` e `CONTEXT.md`.
- No V1.0 só `live` e `beta` aparecem como badge; `alpha`/`idea`/`sunset` ficam reservados.
- A sparkline renderiza **26 semanas** (Chosen); a fonte GitHub (`commit_activity`) traz 52 — recorta-se no V1.1.
- Deploy do V1.0 já como app Next (Node), não export estático, para que o V1.1 (route handlers + DB) seja **aditivo**, não re-plataforma.

## Alternativas rejeitadas

- **Implementar tudo num lançamento só** (vitalidade live + `/go`) — põe o backend mais pesado no caminho crítico do que só precisa ser avaliado visualmente.
- **Honrar o ADR-0005 removendo commits/PRs da face** — contraria o design oficial; o autor optou pelo literal.
- **Desktop-only literal no V1.0** — Chosen não é responsivo, mas o link é público e credibilidade é o valor declarado ([ADR-0007](0007-audiencia-e-posicionamento.md)).
- **3º card como querymind real ou teaser com stats** — fingir vitalidade/redirect de algo inexistente fere a honestidade; placeholder anônimo resolve.

## Reconciliação as-built (2026-06-23)

Sabatina de oficialização do design (Fase 2). Onde o as-built divergiu da **letra** deste ADR, registra-se aqui: a **intenção e as invariantes** foram preservadas; a **forma** evoluiu (princípio do [ADR-0011](0011-produto-primeiro-indicadores-secundarios.md)). O original acima fica como registro histórico.

- **§3 — "Slot do próximo experimento" (era "placeholder anônimo `// TODO`").** O 3º card enviado tem badge **"em breve"** (na posição da pílula de status) e linhas/chips **skeleton com shimmer**, em vez do `// TODO` anônimo de zero-motion. A **invariante é preservada**: segue **inerte** (sem link, sem stats, sem CTA) e **não finge** ser Solução real — o badge não é um status real (`live`/`beta`) e o skeleton não são dados falsos. As restrições literais "sem badge" e "zero motion" ficam **superadas** pela forma, que comunica "próximo experimento a caminho" melhor que um slot morto. Termo canônico no [CONTEXT.md](../CONTEXT.md); identificador de código: `PlaceholderCard`.

- **§2 — O faseamento V1.0/V1.1 colapsou na implementação.** Em vez de "lançar V1.0 e depois adicionar o backend V1.1", o as-built embarca a **superfície completa de uma vez** (`/go/[slug]` + camada de Postgres + vitalidade *live* do GitHub) com **degradação graciosa**: o redirect `/go` sempre responde e só a **gravação do clique** no-opa quando falta `DATABASE_URL`; a vitalidade cai para os valores **curados** quando falta `GITHUB_TOKEN`/rede. A fronteira de fase virou, na prática, um **toggle de infra** (presença de `DATABASE_URL`/`GITHUB_TOKEN` no deploy), não um marco de release — "V1.0/V1.1" permanecem como marcos **históricos** de planejamento. Consequência de forma: o CTA do card aponta para `/go/[slug]` (redirect rastreado, nova aba), **não** o link direto descrito em §2.
