# Visão — panlabs

> **Status:** escrito na sessão de grilling de concepção (2026-06-21), a partir dessa conversa. Decisões e seus porquês em [docs/adr/](adr/README.md). Linguagem e invariantes em [CONTEXT.md](CONTEXT.md). Design oficial travado em 2026-06-22 ("Chosen") e V1 **faseado** (V1.0 visual / V1.1 backend) — ver [ADR-0012](adr/0012-design-oficial-chosen-e-faseamento.md).

## O que é

panlabs é uma vitrine **pt-BR** no apex `panlabs.tech`: um **catálogo navegável das soluções SaaS do autor** que mostra o que cada uma é e leva o visitante até ela. **O assunto são as soluções.** panlabs não é a casa delas — é um **agregador read-only** que observa e linka; a única coisa que ele mesmo mede é o clique de saída.

## Posicionamento

**Catálogo de produtos reais, com alma de laboratório.** O assunto são as soluções que o autor criou; *laboratório vivo* é o **tom**, não o tema — experimentos com software assistido por IA que viraram SaaS de pé. Personalidade curiosa e inventiva, **profundidade técnica como substância** e um toque lúdico; premium **sem fingir escala** que não existe.

## Para quem

**Pares técnicos e recrutadores.** O valor do panlabs é **credibilidade/reputação**, não conversão — não há usuários ativos nem expectativa de crescimento no curto prazo, e o design não deve simular um funil para um fluxo inexistente.

## Princípio-norte

O repo de cada solução é a **fonte da verdade** sobre ela (seu domínio, sua migração, sua descrição factual via GitHub). O panlabs **observa e linka**; nunca é dono do que descreve uma solução. Isso o mantém eternamente fino e desacoplado.

## Escopo V1

- Uma **landing**: hero + grid de cards.
- **Card** por solução: prioriza, nesta ordem, **(1) o produto** — o que é e um jeito de entrar (o herói do card); **(2)** a ação "visitar"; **(3) vitalidade** como prova-de-vida discreta. *Quais* sinais e *como/onde* exibi-los é **forma — decisão do design**; um **preview/render visual do produto é forma — decisão do design**; o design oficial (Chosen) fez do **preview de 148px a assinatura do card**, então no V1 ele existe (set candidato em [CONTEXT.md](CONTEXT.md) e [ADR-0005](adr/0005-indicadores.md); prioridade em [ADR-0011](adr/0011-produto-primeiro-indicadores-secundarios.md); forma em [ADR-0012](adr/0012-design-oficial-chosen-e-faseamento.md)).
- **Redirect rastreado** `/go/[slug]` → 302 para a URL-alvo da solução (a única escrita do app). No as-built o CTA do card **já aponta para `/go`**; a *gravação* do clique depende de Postgres configurado no deploy (degradação graciosa) — ver a "Reconciliação as-built" no [ADR-0012](adr/0012-design-oficial-chosen-e-faseamento.md).

## Fora de escopo no V1

Páginas de detalhe, nota/comentário, feature-request→issue, usuários únicos por SaaS, app manifest, SSO/cookie compartilhado, bilíngue. Tudo nomeado em [CONTEXT.md → "Em breve"](CONTEXT.md).

## Sucesso do V1

A landing no ar em `panlabs.tech`, com ≥2 soluções (epistemix, traveltogether) em cards que redirecionam de fato, métrica de clique funcionando — e o critério que o autor definiu: **um sistema visual que o agrade o suficiente para querer continuar.** Sem o design agradando, não se fala em evoluir.
