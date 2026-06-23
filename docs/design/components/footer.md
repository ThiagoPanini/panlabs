# Componente: Footer (Camada 3)

Terceira camada — o **fechamento de terminal**. Encerra a página do jeito que o hero a abriu: um prompt
`panini@panlabs:~$`, um `keep building and sharing` discreto com caret piscando, e um colofão de uma linha.
**Sem CTA, sem funil** — o laboratório só deixa o cursor piscando
([ADR-0007](../../adr/0007-audiencia-e-posicionamento.md)).

## Código

- [`src/components/Footer/Footer.tsx`](../../../src/components/Footer/Footer.tsx)
- [`src/components/Footer/Footer.module.css`](../../../src/components/Footer/Footer.module.css)

## Estrutura

```
<footer.footer>                        ← ink-940, border-top hairline
  <Reveal.inner>                       ← container 1080px, padding 48/40/104, mono, lh 1.9
    <Prompt cat next_steps.md/>
    <p.headline> keep building and sharing <span.caret/>
    <p.colophon> dark-native · pt-BR · Manrope + JetBrains Mono · sem CDN
```

## Forma

- `<footer>` é landmark `contentinfo`, **irmão** do `<main>` (fora dele) — ver
  [layout.md](../layout.md#estrutura-da-página-dom).
- **Prompt:** `<Prompt command="cat" arg="next_steps.md">` — ver [reveal.md](reveal.md).
- **Headline** (`.headline`): mono 15px, `--text-default`. `.caret` = bloco 8×15 `--accent-violet`,
  `footer-blink` (`--duration-blink`, step-end) — o mesmo piscar do caret do hero, aqui **sempre** piscando
  (não há input por vir).
- **Colofão** (`.colophon`): mono 11px, `--text-faint`. Honra os inegociáveis (dark-native, pt-BR, fontes
  auto-hospedadas, sem CDN).

## Movimento & a11y

- Keyframe `footer-blink` **co-localizada**. **Reduced-motion:** caret congela **visível** (sem piscar).
- `.caret` é `aria-hidden`.

## Responsivo

`≤ 639px`: `.inner` padding `40/20/72`.
