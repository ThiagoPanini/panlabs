# ADR-0004: Hospedagem na VPS Coolify compartilhada

- **Status:** aceito (2026-06-21) · atualizado (2026-06-24) com esquema de nomes e blast-radius

## Contexto

Havia preocupação com limitação de recursos da VPS Hostinger/Coolify já usada pelas outras soluções.

## Decisão

panlabs roda na **mesma VPS via Coolify** (um container Next + um Postgres pequeno). O substrato compartilhado é a VPS Hostinger gerenciada pelo Coolify em `vps.panlabs.tech`.

## Esquema de nomes em 3 camadas

| Camada | Exemplo |
|--------|---------|
| **(a) Guarda-chuva público** — apex da vitrine e subdomínios das soluções | `panlabs.tech`, `ethitorial.panlabs.tech`, `travelmanager.panlabs.tech` |
| **(b) Infra do operador** — painel Coolify e namespace de imagens | painel em `vps.panlabs.tech`; imagens `ghcr.io/thiagopanini/<projeto>-<app>` |
| **(c) Isolamento por projeto** — cada projeto tem Coolify Project + zona DNS + Postgres próprios | `panlabs` isolado de `ethitorial`, `travelmanager` etc. no mesmo Coolify |

## Blast-radius aceito

O risco de **correlated failure** (VPS cai → tudo cai) já existe para as outras apps; o panlabs só vira mais um inquilino. Aceitável porque o portfólio é experimental, solo e de baixo risco — ver premissa em [ADR-0014](0014-autonomia-total-dos-agentes.md).

O agente confirma que o recurso Coolify (app, banco, volume) pertence ao projeto antes de qualquer operação mutante — regra 4 do [ADR-0014](0014-autonomia-total-dos-agentes.md).

## Gatilho de reabertura

Quando algum projeto ganhar VPS/ambiente dedicado, ou quando houver usuários reais com SLA, reabrir e avaliar isolamento de infra.

## Consequências

- Deploy familiar e rápido; footprint **negligível** (um Next + um Postgres pequeno é leve perto de uma app web+api+postgres completa).
- Nomes canônicos definidos nas 3 camadas — qualquer referência ao domínio do painel usa `vps.panlabs.tech`.

## Alternativas rejeitadas

- **Hosting dedicado/externo** — custo e fricção sem retorno no estágio atual.
