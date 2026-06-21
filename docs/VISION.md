# Visão — panlabs

> **Status:** escrito na sessão de grilling de concepção (2026-06-21), a partir dessa conversa. Decisões e seus porquês em [docs/adr/](adr/README.md). Linguagem e invariantes em [CONTEXT.md](CONTEXT.md).

## O que é

panlabs é uma vitrine **pt-BR**, hospedada no apex `panlabs.tech`, que expõe as soluções SaaS do autor como um catálogo navegável e redireciona o visitante para onde cada solução vive. **Não é a casa das soluções** — é um **agregador read-only** com a única métrica que só ele pode medir: o clique de saída.

## Posicionamento

**Laboratório vivo.** panlabs assume o próprio nome: é o lugar onde experimentos com software assistido por IA viram SaaS reais, que ficam de pé. A personalidade é curiosa, inventiva, com **profundidade técnica como substância** e um toque lúdico — premium **sem fingir escala** que não existe.

## Para quem

**Pares técnicos e recrutadores.** O valor do panlabs é **credibilidade/reputação**, não conversão — não há usuários ativos nem expectativa de crescimento no curto prazo, e o design não deve simular um funil para um fluxo inexistente.

## Princípio-norte

O repo de cada solução é a **fonte da verdade** sobre ela (seu domínio, sua migração, sua descrição factual via GitHub). O panlabs **observa e linka**; nunca é dono do que descreve uma solução. Isso o mantém eternamente fino e desacoplado.

## Escopo V1

- Uma **landing**: hero + grid de cards.
- **Card** por solução: `status · tech-chips (curados) · ⭐ stars · sparkline de commits · nº de acessos` + ação "visitar".
- **Redirect rastreado** `/go/[slug]` → 302 para a URL-alvo da solução (a única escrita do app).

## Fora de escopo no V1

Páginas de detalhe, nota/comentário, feature-request→issue, usuários únicos por SaaS, app manifest, SSO/cookie compartilhado, bilíngue. Tudo nomeado em [CONTEXT.md → "Em breve"](CONTEXT.md).

## Sucesso do V1

A landing no ar em `panlabs.tech`, com ≥2 soluções (epistemix, traveltogether) em cards que redirecionam de fato, métrica de clique funcionando — e o critério que o autor definiu: **um sistema visual que o agrade o suficiente para querer continuar.** Sem o design agradando, não se fala em evoluir.
