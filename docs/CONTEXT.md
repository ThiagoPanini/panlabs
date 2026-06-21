# Contexto de Domínio — panlabs

Glossário e invariantes que definem a **linguagem comum** do panlabs. Lido por humanos e por agentes de IA antes de qualquer trabalho substantivo.

> panlabs é uma história **independente**: nada da linguagem, design ou contexto das outras soluções do autor se aplica aqui — só o *scaffolding de implantação* (Coolify/VPS) é compartilhado. Ver [ADR-0010](adr/0010-independencia-entre-apps.md).
>
> **Status:** escrito na sessão de concepção (2026-06-21). Decisões em [adr/](adr/README.md).

## Linguagem

**Solução** (`Solution`):
Um produto SaaS do autor exposto no panlabs. Tem identidade editorial **curada** no repo do panlabs e vitalidade **puxada do GitHub**. Não é hospedada pelo panlabs.
_Evite_: "app do panlabs" — as soluções não pertencem ao panlabs.

**Card**:
A representação visual de uma Solução na landing. Mostra `status · tech-chips · stars · sparkline de commits · acessos` e a ação "visitar".

**URL-alvo** (`targetUrl`):
Onde a Solução vive hoje (ex.: `https://epistemix.dev`, `https://traveltogether.thiagopanini.dev`). É um campo de config. Quando a Solução migrar de domínio (no repo dela), **só esse campo muda aqui**.

**Redirect rastreado** (`/go/[slug]`):
Route handler que grava o evento de clique (com timestamp) e responde 302 para a `targetUrl`. É a **única escrita** do panlabs e a única métrica que só ele pode medir.

**Acessos** (`clicks`):
Contagem de cliques de saída registrados pelo `/go/[slug]`. First-party, em Postgres.
_Evite_ confundir com **usuários únicos** (que vivem no banco de cada Solução — V2).

**Vitalidade**:
Sinais factuais puxados do GitHub por Solução — ⭐ stars, atividade de commits (52 semanas → sparkline), último push. Read-only, **cacheada** (API anônima = 60 req/h; com token = 5000/h).

**tech-chips**:
As ~3 tecnologias que importam (ex.: `Next · FastAPI · Postgres`). **Curadas** na entrada — o GitHub só enxerga *linguagens* de arquivo, não frameworks, então não dá para automatizar honestamente.

**status**:
Ciclo de vida curado da Solução: `idea → alpha → beta → live → sunset`.

## Modelo de dados (esboço)

- **Entrada `Solution`** (curada, em código): `slug, nome, tagline, descrição, targetUrl, repo (owner/name), status, techChips[], tags[]`.
- **Postgres**: `click_event(slug, ts)` (ou rollup `click_daily`).
- **GitHub** (cacheado): `stars, commit_activity (→ sparkline), pushed_at`.

## Invariantes

1. O panlabs **não hospeda** Solução nem gerencia domínio/migração delas. Cada Solução cuida de si no próprio repo.
2. A `targetUrl` é a **única amarra** entre panlabs e uma Solução. Trocar de domínio = trocar um campo.
3. Editorial é **curado** (código); vitalidade é **puxada** (GitHub, cacheada); acessos são **medidos** (Postgres). Três fontes, separadas por dono.
4. O panlabs é **read-only** sobre as Soluções; a única escrita é o evento de clique.
5. Indicadores são de **vitalidade e popularidade honesta** (commits, stars, cliques) — nunca operacionais. Saúde/uptime/latência foram **rejeitados** ([ADR-0005](adr/0005-indicadores.md)).
6. **Uma sparkline por card** (a de commits). Cliques aparecem como número até haver volume que justifique tendência.
7. Nada de design/contexto das outras soluções influencia o panlabs. Só o scaffolding de deploy é compartilhado.

## Em breve (V2+) — nomeado, não construído

- **Página de detalhe** por Solução (a superfície onde o resto do V2 mora).
- **Avaliação** (nota) e **Comentário** — exigem auth e moderação.
- **Feature-request → Issue**: pedido no panlabs vira issue real no repo-alvo. Versão barata: deep-link pro *"new issue"* do GitHub com template.
- **Usuários únicos por Solução** — exige alcançar o banco de cada app; nem todas têm auth obrigatória.
- **App manifest** (`/.well-known/panlabs.json`): a Solução se autodescreve; o panlabs deixa de curar editorial e vira agregador puro.
- **Sparkline de acessos** na face do card (quando houver volume).
- **Cookie `.panlabs.tech` / SSO** cross-app — só faz sentido se as Soluções migrarem para subdomínios de `panlabs.tech`.
- **Bilíngue / EN.**
