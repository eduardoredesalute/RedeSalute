# Sincronização Online e Colaboração em Tempo Real

Plano para transformar a aplicação de gestão estratégica da Rede Salute em uma plataforma online compartilhada, com sincronização em nuvem instantânea (tempo real) via Firebase Firestore, permitindo que alterações feitas por qualquer membro da equipe apareçam imediatamente para todos os demais sem necessidade de login.

---

### Decisões do Usuário & Definições Confirmadas

> [!IMPORTANT]
> **Decisões confirmadas na etapa anterior:**
> 1. **Sincronização em Tempo Real na Nuvem:** Qualquer alteração em ações, status, datas ou pilares será replicada instantaneamente para todos os usuários conectados via listeners reativos (`onSnapshot`).
> 2. **Acesso Direto Sem Login:** Acesso livre e transparente sem exigência de autenticação por e-mail/senha, preservando a facilidade de uso diário da equipe.
> 3. **Migração Automática dos Dados Existentes:** Todo o planejamento atual (ações, pilares, projetos, históricos) mantido no navegador será automaticamente importado para a nuvem na primeira execução, garantindo zero perda de dados.

---

### 1. Visão Geral & Objetivo

Atualmente, o sistema persiste informações no `localStorage` do navegador de cada máquina. Ao compartilhar a URL com múltiplos gestores, as ações criadas ou alteradas em um computador não apareciam nos outros.

A integração com o **Firebase Firestore** resolve essa limitação:
- **Banco de Dados Centralizado:** Uma única fonte da verdade na nuvem para todos os painéis e ações.
- **Sincronização Ativa:** Quando a Raquel, o Eduardo ou qualquer gestor alterar um status, reordenar uma ação ou criar um pilar, a tela de todos os outros usuários conectados será atualizada em frações de segundo.
- **Resiliência Offline:** O Firestore possui cache local nativo que garante carregamento veloz e permite operar mesmo com oscilações momentâneas de internet.
- **Indicador Discreto de Conexão:** Um discreto indicador de sincronização no topo (ex: "Sincronizado na nuvem") para dar segurança visual à equipe.

---

### 2. Experiência do Usuário & Design Visual

- **Transparência Absoluta:** O usuário não precisará fazer login nem preencher formulários de cadastro. Ao abrir o link, o sistema conecta ao banco de dados e carrega o painel em tempo real.
- **Indicador de Status Online:**
  - No cabeçalho (Header) e no topo do Portal (CoverPortal), haverá um indicador sutil:
    - 🟢 `Nuvem Ativa (Tempo Real)` quando conectado e sincronizado.
    - 🟡 `Sincronizando...` quando houver gravação em andamento.
- **Feedback Colaborativo:**
  - Reordenações por drag-and-drop, atualizações de status ou novas ações gravadas em um computador refletem suavemente na tela dos demais participantes sem recarregar a página.

---

### 3. Decisões Técnicas & Arquitetura de Dados

#### Por que Firebase Firestore?
- **WebSockets / Event Stream Nativo:** A API `onSnapshot` do Firestore fornece atualização push bidirecional sem necessidade de configurar servidores WebSocket complexos.
- **Sem Fricção de Login:** Permite regras de leitura e escrita públicas ou com autenticação anônima sob medida para ambientes internos da clínica.
- **Migração Transparente:** Script de auto-seeding que verifica se a nuvem já possui dados; se estiver vazia, carrega e migra automaticamente todo o conjunto de dados atual do sistema.

#### Estrutura de Coleções no Firestore:
- `workspaces`: Coleção de painéis (Projetos Estratégicos / Captação e Disponibilidade de Agendas, Receitas Internas, Exames, etc.).
- Cada documento contém metadados do painel e o array ou subcoleção de `actions` com ordenação numérica estrita (`ordem: 1..N`).

---

### 4. Diagrama da Arquitetura & Fluxo de Dados

```
┌─────────────────────────────────────────────────────────┐
│                    Navegadores da Equipe                │
│                                                         │
│   ┌───────────────────┐         ┌───────────────────┐   │
│   │  Computador A     │         │  Computador B     │   │
│   │  (Eduardo / POA)  │         │  (Raquel / Unid.) │   │
│   └─────────▲─────────┘         └─────────▲─────────┘   │
└─────────────┼─────────────────────────────┼─────────────┘
              │                             │
              │  onSnapshot (Tempo Real)    │
              │  Writes / Updates           │
              ▼                             ▼
┌─────────────────────────────────────────────────────────┐
│              Google Cloud / Firebase Firestore          │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │ Coleção: workspaces                             │   │
│   │ ├── projetos-estrategicos (ações 1..N)          │   │
│   │ ├── receitas-internas                           │   │
│   │ └── exames                                      │   │
│   └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

### 5. Etapas de Execução

1. **Provisionamento do Firebase:**
   - Iniciar o assistente de provisionamento do Firebase Firestore no projeto do applet via ferramenta do sistema.
   - Definir regras de segurança (`firestore.rules`) permitindo leitura e escrita colaborativa da equipe.
2. **Camada de Serviço (`src/services/firebaseService.ts`):**
   - Inicialização do Firebase SDK com listener reativo `onSnapshot`.
   - Funções de sincronização: `subscribeWorkspaces`, `updateWorkspaceActions`, `saveWorkspace`.
   - Rotina de migração única para importar as ações atuais para o banco na primeira execução.
3. **Integração no `App.tsx`:**
   - Substituição do `localStorage` primário pela sincronização em nuvem via Firestore.
   - Manutenção de fallback seguro caso a rede falhe.
   - Indicador visual de status de sincronização no cabeçalho.
4. **Verificação & Testes:**
   - Compilação e validação de linter.
   - Teste de persistência e simulação de atualização concorrente.
