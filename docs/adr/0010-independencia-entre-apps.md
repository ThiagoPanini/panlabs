# ADR-0010: Independência entre apps

- **Status:** aceito (2026-06-21)

## Contexto

Risco de importar linguagem, design ou contexto das outras soluções do autor (epistemix, traveltogether) para o panlabs, tratando seus documentos como DNA herdado.

## Decisão

panlabs é **product/design-independente**. Nenhum `CONTEXT.md`/`DESIGN.md`/`PRODUCT.md`, marca, voz ou anti-referência das outras soluções se aplica aqui. **Só o scaffolding de implantação** é compartilhado: forma do monorepo, tooling (biome/ruff/lefthook/commitlint) e a VPS Coolify ([ADR-0004](0004-hospedagem-vps-coolify-compartilhada.md)).

## Consequências

- Cada decisão de produto/design se justifica **por si** — nunca "porque o epistemix faz assim".
- Evita-se coerência falsa por herança.
