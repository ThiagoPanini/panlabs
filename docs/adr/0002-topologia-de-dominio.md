# ADR-0002: Topologia de domínio — apex só para a vitrine

- **Status:** aceito (2026-06-21)

## Contexto

O plano inicial era padronizar tudo em subdomínios de `panlabs.tech` (ex.: `epistemix.panlabs.tech`). A investigação revelou que:

- **epistemix** já vive num apex próprio (`epistemix.dev`), com `www./api./preview./painel.`, sessões `better-auth` e login OAuth.
- **traveltogether** vive em `traveltogether.thiagopanini.dev`.
- `panlabs.tech` ainda não foi adquirido.

Migrar uma app **viva e autenticada** é a operação mais arriscada do projeto: 301 do domínio antigo, troca de cookie-domain (derruba sessões), redirect URIs do OAuth, CORS do `api.`, base URL de tipos gerados, e nova zona Cloudflare.

## Decisão

`panlabs.tech` é um apex que hospeda **só a vitrine**. O panlabs **não** gerencia domínio nem migração das Soluções — isso é responsabilidade do **repo de cada uma**, em momento oportuno. O panlabs guarda por card uma `targetUrl` = onde a Solução vive hoje. Apps futuras podem nascer em `*.panlabs.tech`, mas isso é decidido e gerido **no repo da app**, não aqui.

## Consequências

- O lançamento do panlabs fica **desacoplado** de qualquer migração arriscada.
- Trocar o domínio de uma Solução = trocar **um campo** (`targetUrl`) aqui.
- **Custo:** a unidade da marca "lab" vive 100% no **design** da vitrine, não na URL. O trilho de cookie `.panlabs.tech` (SSO/analytics cross-app) fica adiado para o dia em que as apps migrarem.

## Alternativas rejeitadas

- **Migrar tudo antes de lançar** — refém da operação mais arriscada do projeto.
- **Subdomínios geridos pelo próprio panlabs** — violaria o princípio-norte ([ADR-0001](0001-vitrine-agregador-read-only.md)).
