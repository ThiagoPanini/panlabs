# ADR-0014: Autonomia total dos agentes no escopo do projeto

- **Status:** aceito (2026-06-24)

## Contexto

O panlabs é um projeto **experimental, solo e de baixo risco**: o operador é o único desenvolvedor, não há usuários reais com SLA, e todos os dados são reproduzíveis (código no git, infra recriável via Coolify, banco zerado em segundos). Até aqui faltava uma doutrina codificada de autonomia — o agente pedia aprovação mesmo para operações rotineiras (merge, deploy, env), gerando atrito sem ganho de segurança.

A VPS é **compartilhada** ([ADR-0004](0004-hospedagem-vps-coolify-compartilhada.md)): outros projetos do operador rodam no mesmo Coolify. Isso cria um blast-radius real se o agente operar no projeto errado — daí o único caso de parada de escopo.

## Decisão

**O agente opera com autonomia total sobre tudo que é escopo do projeto** — implementar, fazer deploy/redeploy, mexer em env, gerar segredo que a máquina consegue gerar, rodar migration, criar/dropar recurso próprio no Coolify e **mergear PR verde**. Isso é a norma; faça sozinho, sem reafirmar autonomia a cada vez.

**Pare e chame o operador em exatamente 4 casos:**

1. **Trancaria para fora** — senha de root/painel, credencial de acesso do operador, qualquer regra de firewall, ou rotacionar o token de infra que o próprio MCP usa.
2. **Recriaria o substrato** — destruir/recriar a VM ou o servidor Coolify.
3. **Exige segredo de terceiro** — `client_secret` de OAuth, API key paga de console externo; qualquer segredo que o agente não consegue gerar sozinho.
4. **Tocaria outro projeto no Coolify** — antes de qualquer operação mutante, confirme que o recurso (app, banco, volume) pertence a este projeto. Na dúvida, pergunte.

**Na dúvida sobre cair num dos quatro, pare. Fora deles, faça.**

## Premissa

Esta fronteira pressupõe: projeto experimental, operador solo, zero usuários reais, dados reproduzíveis. Se qualquer premissa mudar (ver Gatilhos abaixo), a fronteira se reaperta.

## Consequências

- O agente mergeia PRs verdes, faz deploy e rotaciona secrets que ele mesmo gerou sem pedir confirmação.
- O fluxo `worktree → commit → push → PR automático → merge` roda inteiro sem intervenção humana.
- A única barreira real é o blast-radius do Coolify compartilhado — resolvida pela regra 4 (confirmar alvo antes de mutar).

## Gatilhos de reabertura

Reabrir este ADR e reapertar a fronteira quando:
- Houver usuários reais com SLA ou expectativa de disponibilidade.
- O projeto virar multi-tenant ou receber dados de terceiros sensíveis.
- A VPS/ambiente ganhar dedicação por projeto (blast-radius compartilhado desaparece, mas novos riscos surgem).
- O operador deixar de ser o único desenvolvedor.

## Alternativas rejeitadas

- **Eixo de reversibilidade/risco (semáforo 🟢🟡🔴)** — cria ambiguidade sobre o que conta como "reversível" e força o agente a avaliar risco a cada operação. Com premissa experimental/solo, a avaliação quase nunca muda a decisão; o custo de atrito é real e o ganho é ilusório.
- **Aprovação por categoria de operação** (deploy, merge, delete...) — mesma lógica: categorias genéricas não capturam o risco real (que é escopo, não tipo de operação).
