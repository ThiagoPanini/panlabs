# ADR-0001: panlabs como vitrine/agregador read-only

- **Status:** aceito (2026-06-21)

## Contexto

O autor tem SaaS (epistemix, traveltogether, + futuras) espalhadas por domínios distintos e quer uma interface única que as exponha. A descrição inicial continha uma tensão: *"redirecionador Premium"* (manda o usuário embora) versus uma lista de features de **plataforma** (nota, comentário, feature-request, usuários únicos) que implicam dados próprios, identidade e moderação.

## Decisão

O V1 do panlabs é uma **vitrine + redirecionador rastreado**, um **agregador read-only**. Não possui contas, nota nem comentário. A única escrita é o **evento de clique** (`/go/[slug]`).

**Princípio-norte:** o repo de cada Solução é a fonte da verdade sobre ela; o panlabs observa e linka.

## Consequências

- panlabs fica fino, barato e desacoplado das Soluções.
- Funcionalidades de plataforma (engajamento, identidade) ficam registradas pro V2 (ver [CONTEXT.md → Em breve](../CONTEXT.md)).
- O "Premium" vem do **design e da curadoria dos produtos**; indicadores honestos são **reforço secundário**, não o atrativo principal nem features sociais (ver [ADR-0011](0011-produto-primeiro-indicadores-secundarios.md)).

## Alternativas rejeitadas

- **Meta-plataforma com contas/nota/comentário no V1** — teatro de empty-state a zero usuário, mais custo de auth/moderação sem retorno.
- **Backend de analytics pesado no V1** — desproporcional ao estágio.
