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
