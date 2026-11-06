import { ProjectAction } from '../data/projectsData';

/**
 * Organiza a lista de ações garantindo que ações do mesmo pilar fiquem agrupadas juntas
 * respeitando a estrutura de ordem dos pilares e das ações existentes,
 * e renumera todas as ações começando de 1.
 */
export const renumberAndOrganizeActions = (
  actions: ProjectAction[]
): ProjectAction[] => {
  const pillarOrder: string[] = [];
  const pillarGroups = new Map<string, ProjectAction[]>();

  actions.forEach(act => {
    const pilarKey = act.pilar.trim();
    if (!pillarGroups.has(pilarKey)) {
      pillarGroups.set(pilarKey, []);
      pillarOrder.push(pilarKey);
    }
    pillarGroups.get(pilarKey)!.push(act);
  });

  const organized: ProjectAction[] = [];
  pillarOrder.forEach(pilarKey => {
    const items = pillarGroups.get(pilarKey) || [];
    organized.push(...items);
  });

  // Renumera rigorosamente começando de 1
  return organized.map((action, index) => ({
    ...action,
    ordem: index + 1
  }));
};

/**
 * Insere uma nova ação mantendo a estrutura de ordem dos pilares e ações:
 * - Se o pilar já existir, a nova ação é inserida logo após a última ação daquele pilar.
 * - Se for um pilar novo, a ação é adicionada ao final.
 * - Em seguida, todas as ações são renumeradas começando de 1.
 */
export const insertAndRenumberAction = (
  existingActions: ProjectAction[],
  newAction: ProjectAction
): ProjectAction[] => {
  let lastIndexForPilar = -1;
  const targetPilar = newAction.pilar.trim().toLowerCase();

  for (let i = 0; i < existingActions.length; i++) {
    if (existingActions[i].pilar.trim().toLowerCase() === targetPilar) {
      lastIndexForPilar = i;
    }
  }

  let updatedList: ProjectAction[];
  if (lastIndexForPilar !== -1) {
    // Insere ao final das ações do pilar existente
    updatedList = [...existingActions];
    updatedList.splice(lastIndexForPilar + 1, 0, newAction);
  } else {
    // Novo pilar adicionado ao final
    updatedList = [...existingActions, newAction];
  }

  // Renumera todas as ações começando de 1
  return renumberAndOrganizeActions(updatedList);
};

/**
 * Reordena pilares inteiros com base no arrastar e soltar (drag and drop).
 * Move todas as ações do pilar de origem para a nova posição (antes ou depois do pilar de destino),
 * mantendo as ações agrupadas e renumerando todas as ações sequencialmente de 1 a N.
 */
export const reorderPillars = (
  actions: ProjectAction[],
  sourcePillar: string,
  targetPillar: string,
  dropPosition: 'before' | 'after' = 'before'
): ProjectAction[] => {
  const sP = sourcePillar.trim();
  const tP = targetPillar.trim();
  if (!sP || !tP || sP.toLowerCase() === tP.toLowerCase()) {
    return actions;
  }

  // Identifica a lista atual de pilares e seus grupos de ações
  const currentPillars: string[] = [];
  const pillarActionsMap = new Map<string, ProjectAction[]>();

  actions.forEach(a => {
    const key = a.pilar.trim();
    if (!pillarActionsMap.has(key)) {
      pillarActionsMap.set(key, []);
      currentPillars.push(key);
    }
    pillarActionsMap.get(key)!.push(a);
  });

  const srcIdx = currentPillars.findIndex(p => p.toLowerCase() === sP.toLowerCase());
  const tgtIdx = currentPillars.findIndex(p => p.toLowerCase() === tP.toLowerCase());

  if (srcIdx === -1 || tgtIdx === -1 || srcIdx === tgtIdx) {
    return actions;
  }

  // Remove o pilar de origem
  const newPillars = currentPillars.filter((_, idx) => idx !== srcIdx);
  // Encontra o novo índice do target
  const newTgtIdx = newPillars.findIndex(p => p.toLowerCase() === tP.toLowerCase());
  const insertIdx = dropPosition === 'before' ? newTgtIdx : newTgtIdx + 1;

  newPillars.splice(insertIdx, 0, currentPillars[srcIdx]);

  // Reconstrói a lista plana de ações respeitando a nova ordem de pilares
  const reordered: ProjectAction[] = [];
  newPillars.forEach(p => {
    const list = pillarActionsMap.get(p) || [];
    reordered.push(...list);
  });

  // Renumera 1..N
  return reordered.map((action, index) => ({
    ...action,
    ordem: index + 1
  }));
};

/**
 * Reordena uma ação específica arrastada para antes ou depois de outra ação alvo.
 * - Se movida dentro do mesmo pilar, altera a posição interna da ação.
 * - Se movida para outro pilar, atualiza pilar e pilarCategoria da ação para o pilar de destino.
 * - Ao final, renumera todas as ações de 1 a N mantendo a consistência dos pilares.
 */
export const reorderActionItem = (
  actions: ProjectAction[],
  sourceActionId: string,
  targetActionId: string,
  dropPosition: 'before' | 'after' = 'before'
): ProjectAction[] => {
  if (sourceActionId === targetActionId) return actions;

  const sourceIndex = actions.findIndex(a => a.id === sourceActionId);
  const targetIndex = actions.findIndex(a => a.id === targetActionId);

  if (sourceIndex === -1 || targetIndex === -1) {
    return actions;
  }

  const sourceAction = actions[sourceIndex];
  const targetAction = actions[targetIndex];

  // Se estiver cruzando de pilar, adota o pilar e categoria do destino
  const updatedSourceAction: ProjectAction = {
    ...sourceAction,
    pilar: targetAction.pilar,
    pilarCategoria: targetAction.pilarCategoria
  };

  // Cria a lista sem o item de origem
  const withoutSource = actions.filter(a => a.id !== sourceActionId);
  const newTargetIndex = withoutSource.findIndex(a => a.id === targetActionId);

  if (newTargetIndex === -1) return actions;

  const insertIndex = dropPosition === 'before' ? newTargetIndex : newTargetIndex + 1;
  withoutSource.splice(insertIndex, 0, updatedSourceAction);

  // Reorganiza por pilares para garantir contiguidade e renumera 1..N
  return renumberAndOrganizeActions(withoutSource);
};

