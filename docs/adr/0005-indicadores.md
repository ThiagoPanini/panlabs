# ADR-0005: Indicadores — vitalidade e popularidade honesta

- **Status:** aceito (2026-06-21) · **ênfase recontextualizada por [ADR-0011](0011-produto-primeiro-indicadores-secundarios.md)** — este ADR define o *set candidato* de indicadores; eles são **secundários ao produto** e sua prioridade/forma na face do card é decisão do design · **forma instanciada pelo design oficial em [ADR-0012](0012-design-oficial-chosen-e-faseamento.md)**.

## Contexto

A diferenciação do panlabs ("redirecionador Premium **com indicadores**") dependia de definir **o que** cada card indica. Considerou-se saúde/uptime/latência, contadores de uso, sparklines e vários sinais do GitHub. Reframe-chave: **a zero usuário, o indicador honesto não é popularidade — mas vitalidade também conta**, desde que medida sem vaidade.

## Decisão

Indicadores na face do card:

`status (curado) · tech-chips (curados) · ⭐ stars (GitHub) · commit-heartbeat (sparkline, GitHub) · acessos (nº, first-party)`

**Uma sparkline por card** — a de commits (mede o autor construindo; viva mesmo sem tráfego). Cliques entram como **número** até haver volume.

## Consequências

- O card é honesto mesmo a zero usuário.
- Evita-se vaidade e *stat-overload*.
- Exige cache dos dados do GitHub (rate-limit).

## Alternativas rejeitadas

- **Saúde / uptime / latência** — não interessam ao autor; panlabs-como-status-page descartado.
- **Commits totais (absoluto)** — número grande sem significado; usa-se o heartbeat.
- **Forks / watchers / contributors** — enganosos num lab solo (~0 ou ~1).
- **PRs / issues na face** — definição ambígua; ficam para detalhe/V2 (issues abertas são a ponte barata do feature-request→issue do V2).

> **Nota (2026-06-22).** O design oficial "Chosen" **reinstanciou `commits` (absoluto) e `PRs` na face** do card, pela autoridade de forma do design ([ADR-0011](0011-produto-primeiro-indicadores-secundarios.md)/[ADR-0012](0012-design-oficial-chosen-e-faseamento.md)). As rejeições acima continuam válidas como *preocupação* — a semântica honesta de cada um foi definida no **V1.1** por [ADR-0013](0013-semantica-vitalidade-live-commits-prs.md) (commits = all-time no branch default; PRs = merged all-time).
