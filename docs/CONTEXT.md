# Contexto de Domínio — panlabs

Glossário e invariantes que definem a **linguagem comum** do panlabs. Lido por humanos e por agentes de IA antes de qualquer trabalho substantivo.

> panlabs é uma história **independente**: nada da linguagem, design ou contexto das outras soluções do autor se aplica aqui — só o *scaffolding de implantação* (Coolify/VPS) é compartilhado. Ver [ADR-0010](adr/0010-independencia-entre-apps.md).
>
> **Status:** escrito na sessão de concepção (2026-06-21). Decisões em [adr/](adr/README.md). Design oficial travado em 2026-06-22 ("Chosen") e V1 faseado — ver [ADR-0012](adr/0012-design-oficial-chosen-e-faseamento.md).

## Linguagem

**Solução** (`Solution`):
Um produto SaaS do autor exposto no panlabs — **o assunto** da vitrine; tudo no card existe para apresentá-la. Tem identidade editorial **curada** no repo do panlabs e vitalidade **puxada do GitHub**. Não é hospedada pelo panlabs.
_Evite_: "app do panlabs" — as soluções não pertencem ao panlabs.

**Card**:
A representação visual de uma **Solução** na landing. Prioridade, nesta ordem: **(1)** o **produto** — nome, o que é e um jeito de entrar (o herói do card); **(2)** a ação **"visitar"**; **(3)** **vitalidade** como prova-de-vida *secundária e discreta*. **Quais** indicadores, **quanto**, **onde** e com que **tratamento** são **forma — decisão do design, não deste documento.** Um **preview/render visual do produto** (screenshot, faux-UI, embed, comportamento de hover) é **opcional e não exigido**: o card é completo só com texto + ação, e *se* e *como* mostrar um visual fica **em aberto, sem enforcement** — decisão do design. O design oficial (Chosen) optou por incluí-lo — **preview de 148px (assinatura do card)**, ver [ADR-0012](adr/0012-design-oficial-chosen-e-faseamento.md). Set de indicadores candidatos em [ADR-0005](adr/0005-indicadores.md); prioridade em [ADR-0011](adr/0011-produto-primeiro-indicadores-secundarios.md).

**Slot do próximo experimento** (código: `PlaceholderCard`):
O terceiro item do grid do catálogo no V1 — **não é um Card** (não representa uma Solução). É um placeholder **inerte** (sem link, sem stats, sem CTA) que se apresenta como o *rascunho* de uma Solução futura: badge "em breve" no lugar da pílula de status e linhas/chips skeleton. Anuncia "próximo experimento a caminho" **sem fingir** vitalidade, redirect ou status reais — preserva a invariante de honestidade ([ADR-0012](adr/0012-design-oficial-chosen-e-faseamento.md)).
_Evite_: tratá-lo como Card ou como Solução; ele existe para não deixar o grid “mancar”, não para representar um produto.

**URL-alvo** (`targetUrl`):
Onde a Solução vive hoje (ex.: `https://epistemix.dev`, `https://traveltogether.thiagopanini.dev`). É um campo de config. Quando a Solução migrar de domínio (no repo dela), **só esse campo muda aqui**.

**Redirect rastreado** (`/go/[slug]`):
Route handler que grava o evento de clique (com timestamp) e responde 302 para a `targetUrl`. É a **única escrita** do panlabs e a única métrica que só ele pode medir.

**Acessos** (`clicks`):
Contagem de cliques de saída registrados pelo `/go/[slug]`. First-party, em Postgres.
_Evite_ confundir com **usuários únicos** (que vivem no banco de cada Solução — V2).

**Vitalidade**:
Sinais factuais puxados do GitHub por Solução — ⭐ stars, atividade de commits (52 semanas na fonte; o design renderiza 26 → sparkline), último push. Read-only, **cacheada** (API anônima = 60 req/h; com token = 5000/h).

**tech-chips**:
As ~3 tecnologias que importam (ex.: `Next · FastAPI · Postgres`). **Curadas** na entrada — o GitHub só enxerga *linguagens* de arquivo, não frameworks, então não dá para automatizar honestamente.

**status**:
Ciclo de vida curado da Solução: `idea → alpha → beta → live → sunset`. No V1.0, só `live` (epistemix) e `beta` (traveltogether) aparecem como badge; `alpha`/`idea`/`sunset` ficam reservados (ver [ADR-0012](adr/0012-design-oficial-chosen-e-faseamento.md)).

## Modelo de dados (esboço)

- **Entrada `Solution`** (curada, em código): `slug, nome, tagline, descrição, targetUrl, repo (owner/name), status, techChips[], tags[]` (+ `previewUrl?` **totalmente opcional** — só existe se o design escolher mostrar um visual; o catálogo funciona sem nenhum; no design oficial, um **screenshot estático por solução** (`shot-*.png`)).
- **Postgres**: `click_event(slug, ts)` (ou rollup `click_daily`).
- **GitHub** (cacheado): `stars, commit_activity (→ sparkline), pushed_at`.

## Invariantes

1. O panlabs **não hospeda** Solução nem gerencia domínio/migração delas. Cada Solução cuida de si no próprio repo.
2. A `targetUrl` é a **única amarra** entre panlabs e uma Solução. Trocar de domínio = trocar um campo.
3. Editorial é **curado** (código); vitalidade é **puxada** (GitHub, cacheada); acessos são **medidos** (Postgres). Três fontes, separadas por dono.
4. O panlabs é **read-only** sobre as Soluções; a única escrita é o evento de clique.
5. Indicadores são de **vitalidade e popularidade honesta** (commits, stars, cliques) — nunca operacionais. Saúde/uptime/latência foram **rejeitados** ([ADR-0005](adr/0005-indicadores.md)).
6. Indicadores **não fingem tendência** que não existe: cliques entram como número até haver volume; sparkline só onde o dado sustenta. *Se e como* exibi-los é **forma — decisão do design**.
7. Nada de design/contexto das outras soluções influencia o panlabs. Só o scaffolding de deploy é compartilhado.
8. O **produto é o herói** do card; indicadores são **prova-de-vida secundária**. Os docs travam **intenção e prioridade**; a **forma** (placement, contagem, tratamento visual — **inclusive se há ou não preview/render do produto, que não é requisito**) é decisão do design ([ADR-0011](adr/0011-produto-primeiro-indicadores-secundarios.md)).

## Em breve (V2+) — nomeado, não construído

- **Página de detalhe** por Solução (a superfície onde o resto do V2 mora).
- **Avaliação** (nota) e **Comentário** — exigem auth e moderação.
- **Feature-request → Issue**: pedido no panlabs vira issue real no repo-alvo. Versão barata: deep-link pro *"new issue"* do GitHub com template.
- **Usuários únicos por Solução** — exige alcançar o banco de cada app; nem todas têm auth obrigatória.
- **App manifest** (`/.well-known/panlabs.json`): a Solução se autodescreve; o panlabs deixa de curar editorial e vira agregador puro.
- **Sparkline de acessos** na face do card (quando houver volume).
- **Cookie `.panlabs.tech` / SSO** cross-app — só faz sentido se as Soluções migrarem para subdomínios de `panlabs.tech`.
- **Bilíngue / EN.**
