# ADR-0005: Indicadores — vitalidade e popularidade honesta

- **Status:** aceito (2026-06-21)

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
