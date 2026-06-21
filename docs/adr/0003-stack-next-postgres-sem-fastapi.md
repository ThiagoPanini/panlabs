# ADR-0003: Stack — Next.js fullstack + Postgres, sem FastAPI

- **Status:** aceito (2026-06-21)

## Contexto

O molde validado do autor é Next + FastAPI (hexagonal) + Postgres. O panlabs precisa apenas **gravar clique, ler agregado e buscar dados do GitHub** — não há domínio rico para modelar que justifique a cerimônia de ports & adapters.

## Decisão

**Next.js (App Router) fullstack + Postgres, sem FastAPI.** O Next fala direto com o Postgres. O route handler `/go/[slug]` grava o evento de clique e responde 302.

## Consequências

- Menos peças para manter; footprint mínimo.
- É o molde **subtraído**, não desviado — "Next fala com Postgres" já existe no ecossistema do autor.
- Se um dia surgir domínio rico, reintroduz-se uma API dedicada.

## Alternativas rejeitadas

- **Molde completo com FastAPI** — cerimônia hexagonal sem domínio; overkill a zero usuário.
- **Edge-native (Cloudflare D1 / Workers Analytics Engine)** — menor footprint na VPS, mas tecnologia nova fora do molde e lock-in na Cloudflare.
- **SQLite** — mais leve (sem container de banco), mas diverge da tecnologia de banco do resto da suíte.
