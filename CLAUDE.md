# panlabs

Vitrine/agregador **read-only** em pt-BR no apex `panlabs.tech` que cataloga as soluções SaaS do autor. História **independente** — nada do design/contexto das outras soluções se aplica aqui; só o scaffolding de deploy é compartilhado.

Orientação de domínio antes de qualquer trabalho substantivo:

- [docs/CONTEXT.md](docs/CONTEXT.md) — glossário + invariantes (linguagem comum).
- [docs/VISION.md](docs/VISION.md) — o que é, posicionamento, escopo e critério de sucesso do V1.
- [docs/adr/](docs/adr/README.md) — decisões de arquitetura (0001–0014).

Design oficial ("Chosen") e faseamento **V1.0 visual / V1.1 backend** em [ADR-0012](docs/adr/0012-design-oficial-chosen-e-faseamento.md). Onde o design contraria um ADR sobre *forma*, **o design vence** ([ADR-0011](docs/adr/0011-produto-primeiro-indicadores-secundarios.md)); ADRs seguem mandando em *intenção e invariantes*. O contrato de design **as-built** (tokens, layout, componentes, a11y) vive em [docs/design/](docs/design/README.md) — leia antes de qualquer trabalho visual/UI.

## Agent skills

### Issue tracker

Issues vivem no GitHub (`ThiagoPanini/panlabs`), via `gh` CLI. PRs externos **não** são superfície de triagem. See `docs/agents/issue-tracker.md`.

### Triage labels

Vocabulário canônico verbatim: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context; os docs de domínio moram em `docs/` (não na raiz). See `docs/agents/domain.md`.

### Design system

Contrato de design **as-built** em `docs/design/` (fonte-da-verdade = código; Chosen é origem creditada, gitignored). Token, não literal; keyframes co-localizadas; reduced-motion por componente. See `docs/agents/design.md`.

## Autonomia e fluxo de desenvolvimento

Doutrina completa em [ADR-0014](docs/adr/0014-autonomia-total-dos-agentes.md) e [docs/agents/workflow.md](docs/agents/workflow.md).

**O agente opera com autonomia total** — implementar, mergear PR verde, fazer deploy/redeploy, mexer em env, criar/dropar recurso próprio no Coolify. Faça sozinho, sem reafirmar autonomia a cada operação.

**Pare e chame o operador em exatamente 4 casos:** (1) trancaria para fora (senha root, credencial, token de infra do MCP); (2) recriaria o substrato (VM/Coolify); (3) exige segredo de terceiro (OAuth `client_secret`, API key paga); (4) tocaria outro projeto no Coolify (confirme o alvo antes de mutar).

### Fluxo padrão

`/grill-with-docs` → `/to-issues` → `/tdd` + **caveman full** (padrão) → worktree por issue → commit → push → PR automático → **merge autônomo no verde** → encadear.

"Implementa as issues" = modo autônomo completo: coleta issues `ready-for-agent`, worktree por issue, implementa, mergeia, encadeia sem parar.

### Prompts

Salvar em `prompts/AAAAMMDDHHMMSS_slug-kebab.md` (pt-BR, `# Título` no topo, sem frontmatter). Nunca só inline.
