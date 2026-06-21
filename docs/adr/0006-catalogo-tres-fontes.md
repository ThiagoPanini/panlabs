# ADR-0006: Catálogo — três fontes separadas por dono

- **Status:** aceito (2026-06-21)

## Contexto

De onde vêm os dados de cada card: editorial (nome, tagline, descrição, status), vitalidade (stars, commits, tech) e acessos.

## Decisão

Três fontes, separadas por **dono**:

- **Editorial = curado** em código no repo do panlabs (entrada `Solution` tipada por app).
- **Vitalidade = puxada** do GitHub e **cacheada**.
- **Acessos = medidos** em Postgres.

Adicionar/editar uma Solução = **um PR** (o PR é o admin; sem UI de cadastro).

## Consequências

- Simples, versionado, revisável; funciona mesmo se a app estiver fora do ar.
- O texto editorial pode **envelhecer** vs a realidade (atualização manual).
- Cache **obrigatório** pelo rate-limit do GitHub (anônimo 60/h; com token 5000/h).

## Alternativas rejeitadas

- **Tudo em Postgres + admin UI** — overkill a 2-3 apps; o PR já é o admin.
- **App manifest auto-descritivo** (`/.well-known/panlabs.json`) — elegante e DRY, mas exige tocar cada app + camada de fetch/cache/fallback. Registrado pro V2.
- **Híbrido (curar identidade + puxar volátil do manifest)** — mais peças móveis desde o dia 1.
