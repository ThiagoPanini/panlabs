# Acessibilidade

A11y **base** foi adição do as-built (ausente em Chosen, que é desktop-only) — o link é público e a
audiência abre no mobile/teclado ([ADR-0012](../adr/0012-design-oficial-chosen-e-faseamento.md)). Estes
são contratos, não enfeite: ao editar um componente, preserve-os.

## Foco

[`base.css`](../../src/styles/base.css) — anel de foco **só para teclado** (`:focus-visible`), sem mudar
nada para o ponteiro:

```css
a:focus-visible, button:focus-visible, [tabindex]:focus-visible {
  outline: 2px solid var(--accent-violet);
  outline-offset: 2px;
}
```

O CTA do card trata `:hover` e `:focus-visible` **igualmente** (mesmo anel de marca + seta) — foco de
teclado recebe o mesmo destaque do mouse.

## Reduced-motion

Cada componente animado carrega seu **próprio** bloco `@media (prefers-reduced-motion: reduce)` (a
co-localização das keyframes força isso). Inventário:

| Componente | Sob reduced-motion |
|---|---|
| Hero | typewriter congela com o texto **cheio** (`max-width: 13ch`); caret **estático** (visível, sem piscar) |
| SolutionCard | sem lift/zoom (`transform: none`); shot fixo em `scale(1.06)`; sparkline **já desenhada** (`dashoffset: 0`); CTA sem fluxo e sem seta |
| Slot do próximo experimento | shimmer **off** (linhas/chips parados, visíveis) |
| Global | `base.css` força `scroll-behavior: auto` |

Princípio: nada **some** sob reduced-motion — o efeito é removido, o conteúdo permanece no seu estado
final/legível.

## Forced-colors (alto contraste)

- A **marca** (logo) leva `forced-color-adjust: none` — exceção deliberada para o mark não virar um
  retângulo de sistema (`Header.module.css`).
- Os **ícones** usam `fill="currentColor"`, então herdam a cor do texto e **sobrevivem** ao forced-colors
  sem tratamento especial ([`Icon.tsx`](../../src/components/Icon/Icon.tsx)).

## Semântica & ARIA

- Marcação semântica: `header` / `main` / `section` / `article` / `h1` (hero) / `h3` (nome do card) /
  `ul`+`li` (tech-chips).
- `aria-hidden="true"` em tudo decorativo: cover do hero, caret, overlay e `statusDot` do card, `★`,
  `ctaArrow`, a `<svg>` da sparkline, e as linhas/chips skeleton do slot.
- `alt=""` em imagens decorativas (cover do hero, shot do card) — o conteúdo informativo vem do texto ao
  lado, não da imagem.
- `aria-label="Próximo experimento a caminho"` no slot (o `article` não tem texto que o nomeie por conta
  própria).
- Ícones: `aria-hidden="true"` + `focusable="false"`.

## Contraste sub-AA

**Trade-off consciente, não bug.** Duas micro-labels ficam **abaixo do limiar AA** para texto normal:

- `statLabel` — `--text-faint` (`#5f656e`) em **9.5px** (`SolutionCard`).
- nav-tagline — `#6a7079` em **10.5px** (`Header`).

O bump de 8.5→9.5px (ver [design-spec](design-spec.md)) **ameniza** mas não cruza o limiar (e o texto é
pequeno demais para contar como "texto grande"). **Mantido por fidelidade a Chosen** — decisão do dono.
São rótulos auxiliares de prova-de-vida secundária ([ADR-0011](../adr/0011-produto-primeiro-indicadores-secundarios.md)),
não conteúdo crítico.

> Se um dia for revisitado: subir para `--text-muted` (`#7a808a`) ou aumentar o tamanho cruza o limiar
> sem mexer no layout.

## Idioma & links

- `lang="pt-BR"` no `<html>`.
- O CTA abre em nova aba com `target="_blank" rel="noopener noreferrer"` (segurança de `window.opener`).
