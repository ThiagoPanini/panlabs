# ADR-0008: Superfície V1 — landing única

- **Status:** aceito (2026-06-21)

## Contexto

Definir a superfície do V1: uma página só ou múltiplas (com páginas de detalhe por app).

## Decisão

V1 é **uma landing** (hero + grid de cards). **Sem páginas de detalhe** por app. "Visitar" passa pelo `/go/[slug]` (redirect rastreado, não é página).

## Consequências

- Uma tela só para acertar no protótipo; nada de páginas vazias.
- **Páginas de detalhe** ficam registradas como a superfície natural do **V2** — onde nota/comentário e o sparkline histórico de acessos vão morar.
