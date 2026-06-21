# ADR-0004: Hospedagem na VPS Coolify compartilhada

- **Status:** aceito (2026-06-21)

## Contexto

Havia preocupação com limitação de recursos da VPS Hostinger/Coolify já usada pelas outras soluções.

## Decisão

panlabs roda na **mesma VPS via Coolify** (um container Next + um Postgres pequeno).

## Consequências

- Deploy familiar e rápido; footprint **negligível** para este app (um Next + um Postgres pequeno é leve perto de uma app web+api+postgres completa).
- O risco de **correlated failure** (VPS cai → tudo cai) já existe para as outras apps; o panlabs só vira mais um inquilino. Aceitável a zero usuário.

## Alternativas rejeitadas

- **Hosting dedicado/externo** — custo e fricção sem retorno no estágio atual.
