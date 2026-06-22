# panlabs

Vitrine/agregador **read-only** em pt-BR no apex `panlabs.tech` que cataloga as soluções SaaS do autor. História **independente** — nada do design/contexto das outras soluções se aplica aqui; só o scaffolding de deploy é compartilhado.

Orientação de domínio antes de qualquer trabalho substantivo:

- [docs/CONTEXT.md](docs/CONTEXT.md) — glossário + invariantes (linguagem comum).
- [docs/VISION.md](docs/VISION.md) — o que é, posicionamento, escopo e critério de sucesso do V1.
- [docs/adr/](docs/adr/README.md) — decisões de arquitetura (0001–0012).

Design oficial ("Chosen") e faseamento **V1.0 visual / V1.1 backend** em [ADR-0012](docs/adr/0012-design-oficial-chosen-e-faseamento.md). Onde o design contraria um ADR sobre *forma*, **o design vence** ([ADR-0011](docs/adr/0011-produto-primeiro-indicadores-secundarios.md)); ADRs seguem mandando em *intenção e invariantes*.

## Agent skills

### Issue tracker

Issues vivem no GitHub (`ThiagoPanini/panlabs`), via `gh` CLI. PRs externos **não** são superfície de triagem. See `docs/agents/issue-tracker.md`.

### Triage labels

Vocabulário canônico verbatim: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context; os docs de domínio moram em `docs/` (não na raiz). See `docs/agents/domain.md`.
