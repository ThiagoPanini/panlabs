# ADR-0013: Semântica da vitalidade live — commits e PRs

- **Status:** aceito (2026-06-22) · concretiza a **Nota (2026-06-22)** de [ADR-0005](0005-indicadores.md) (definir a semântica honesta dos números reinstanciados pelo design) · usa o cache/fallback de vitalidade (#14) e respeita o rate-limit do [ADR-0006](0006-catalogo-tres-fontes.md).

## Contexto

O design oficial ([ADR-0012](0012-design-oficial-chosen-e-faseamento.md)) reinstanciou **commits** e **PRs** na face do card, mas com números **curados**. O V1.1 troca esses números pelos dados **live** do GitHub — e isso exige fixar **o que** cada número conta, antes que "commits" e "PRs" virem rótulos ambíguos (a própria preocupação registrada nas rejeições do [ADR-0005](0005-indicadores.md)).

Hipóteses descartadas: janela móvel de 12 meses (atividade recente já é função do **commit-heartbeat**/sparkline — duplicaria o sinal); contagem por release/tag (nem todo repo versiona assim).

## Decisão

Na face do card, para cada solução com `repo`:

- **commits** = total de commits no **branch default**, **all-time** (história inteira). Como a API do GitHub não expõe o total direto, lê-se a página `rel="last"` do header `Link` de `GET /repos/{repo}/commits?per_page=1` (com `per_page=1`, o nº da última página = nº de commits). Sem header de paginação ⇒ conta os commits retornados (0 ou 1).
- **PRs** = pull requests **merged**, **all-time**, via `total_count` de `GET /search/issues?q=repo:{repo}+is:pr+is:merged`.
- **commit-heartbeat** (sparkline) permanece o sinal de **atividade recente** (últimas 26 semanas, [ADR-0005](0005-indicadores.md)). commits/PRs são o **acumulado**; o heartbeat é o **ritmo** — papéis distintos, sem duplicação.

Aplicado a **todas as soluções reais** do catálogo (não só a vitrine de uma): cada `Solution` com `repo` resolve vitalidade live; sem `repo`, mantém o curado.

## Consequências

- Números **monotônicos** (acumulado) — nunca "caem", então não enganam por flutuação de janela.
- **merged** (não abertos): conta trabalho integrado, não PRs em voo.
- Dois GETs a mais por repo (commits + search). `search` tem rate-limit próprio; mitigado pelo cache/revalidate de 1h (#14) — navegação normal é servida do cache.
- Cada sinal **degrada para o valor curado** quando o GitHub está indisponível (#14); o card e o build estático nunca quebram.
