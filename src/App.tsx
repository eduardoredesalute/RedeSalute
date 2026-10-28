/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  INITIAL_PROJECTS, 
  INITIAL_WORKSPACES, 
  ProjectWorkspace, 
  ProjectAction 
} from './data/projectsData';
import { Header } from './components/Header';
import { CoverPortal } from './components/CoverPortal';
import { MetricCards } from './components/MetricCards';
import { FilterBar } from './components/FilterBar';
import { ProjectsTable } from './components/ProjectsTable';
import { PillarsView } from './components/PillarsView';
import { KanbanView } from './components/KanbanView';
import { RoutineBlock } from './components/RoutineBlock';
import { ActionDetailModal } from './components/ActionDetailModal';
import { NewActionModal } from './components/NewActionModal';
import { NewPillarModal } from './components/NewPillarModal';
import { NewProjectModal } from './components/NewProjectModal';
import { 
  Building2, 
  Plus, 
  FolderKanban, 
  DollarSign, 
  Activity 
} from 'lucide-react';
import { 
  insertAndRenumberAction, 
  renumberAndOrganizeActions 
} from './utils/actionUtils';

const WORKSPACES_STORAGE_KEY = 'rede_salute_workspaces_v5';
const LAST_WORKSPACE_KEY = 'rede_salute_last_workspace_id';
const SCREEN_STORAGE_KEY = 'rede_salute_current_screen';

export default function App() {
  // 1. Estado dos Workspaces / Painéis (com persistência no localStorage)
  const [workspaces, setWorkspaces] = useState<ProjectWorkspace[]>(() => {
    try {
      const saved = localStorage.getItem(WORKSPACES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((ws: ProjectWorkspace) => ({
            ...ws,
            actions: renumberAndOrganizeActions(ws.actions || [])
          }));
        }
      }
      // Migração de versões anteriores: carregar INITIAL_WORKSPACES atualizados e preservar painéis customizados
      const legacy = localStorage.getItem('rede_salute_workspaces_v4') || localStorage.getItem('rede_salute_workspaces_v3') || localStorage.getItem('rede_salute_workspaces_v2');
      if (legacy) {
        const parsedLegacy = JSON.parse(legacy);
        if (Array.isArray(parsedLegacy) && parsedLegacy.length > 0) {
          const customWorkspaces = parsedLegacy.filter(
            (ws: ProjectWorkspace) => !['projetos-estrategicos', 'receitas-internas', 'exames'].includes(ws.id)
          );
          return [...INITIAL_WORKSPACES, ...customWorkspaces].map((ws: ProjectWorkspace) => ({
            ...ws,
            actions: renumberAndOrganizeActions(ws.actions || [])
          }));
        }
      }
    } catch (e) {
      console.error('Erro ao ler workspaces do localStorage:', e);
    }
    return INITIAL_WORKSPACES.map((ws: ProjectWorkspace) => ({
      ...ws,
      actions: renumberAndOrganizeActions(ws.actions || [])
    }));
  });

  // Salvar workspaces no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WORKSPACES_STORAGE_KEY, JSON.stringify(workspaces));
    } catch (e) {
      console.error('Erro ao salvar workspaces no localStorage:', e);
    }
  }, [workspaces]);

  // 2. Tela atual: 'cover' (Capa / Portal de Projetos) ou 'project' (Painel do Projeto)
  const [currentScreen, setCurrentScreen] = useState<'cover' | 'project'>(() => {
    try {
      const saved = localStorage.getItem(SCREEN_STORAGE_KEY);
      if (saved === 'project' || saved === 'cover') {
        return saved;
      }
    } catch (e) {}
    // Começa na CAPA conforme solicitação do usuário
    return 'cover';
  });

  // 3. ID do workspace atualmente selecionado
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(LAST_WORKSPACE_KEY);
      if (saved) return saved;
    } catch (e) {}
    return 'projetos-estrategicos';
  });

  useEffect(() => {
    try {
      localStorage.setItem(LAST_WORKSPACE_KEY, activeWorkspaceId);
      localStorage.setItem(SCREEN_STORAGE_KEY, currentScreen);
    } catch (e) {}
  }, [activeWorkspaceId, currentScreen]);

  // Workspace ativo
  const activeWorkspace = useMemo(() => {
    return workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];
  }, [workspaces, activeWorkspaceId]);

  // Ações do workspace ativo
  const projects = useMemo(() => {
    return activeWorkspace ? activeWorkspace.actions : [];
  }, [activeWorkspace]);

  // Estados de visualização e filtros do painel
  const [currentView, setCurrentView] = useState<'table' | 'pillars' | 'kanban'>('table');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPilar, setSelectedPilar] = useState<string>('todos');
  const [selectedResp, setSelectedResp] = useState<string>('todos');
  const [selectedDate, setSelectedDate] = useState<string>('todos');

  // Modais
  const [selectedAction, setSelectedAction] = useState<ProjectAction | null>(null);
  const [isNewActionOpen, setIsNewActionOpen] = useState<boolean>(false);
  const [isNewPillarOpen, setIsNewPillarOpen] = useState<boolean>(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState<boolean>(false);

  // Lista única de Pilares mantendo a estrutura e ordem de aparição dos pilares
  const allPilares = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    projects.forEach(p => {
      if (!seen.has(p.pilar)) {
        seen.add(p.pilar);
        list.push(p.pilar);
      }
    });
    return list;
  }, [projects]);

  const allResponsaveis = useMemo(() => {
    return Array.from(new Set(projects.map(p => p.responsavel))).sort();
  }, [projects]);

  // Filtragem dos projetos em memória
  const filteredProjects = useMemo(() => {
    return projects.filter(item => {
      const matchesStatus =
        statusFilter === 'todos' || item.status === statusFilter;
      const matchesPilar =
        selectedPilar === 'todos' || item.pilar === selectedPilar;
      const matchesResp =
        selectedResp === 'todos' ||
        item.responsavel.toLowerCase() === selectedResp.toLowerCase();

      // Filtro de Data / Calendário
      const matchesDate = (() => {
        if (selectedDate === 'todos') return true;
        const d = selectedDate.toLowerCase().trim();
        if (d === 'sem_data') {
          return (
            (item.dataInicio && item.dataInicio.toLowerCase().includes('definir')) ||
            (item.prazo && item.prazo.toLowerCase().includes('definir'))
          );
        }
        const monthNumMap: Record<string, string> = {
          jan: '/01/', fev: '/02/', mar: '/03/', abr: '/04/',
          mai: '/05/', jun: '/06/', jul: '/07/', ago: '/08/',
          set: '/09/', out: '/10/', nov: '/11/', dez: '/12/'
        };
        const monthNum = monthNumMap[d];
        const check = (val?: string) => {
          if (!val) return false;
          const v = val.toLowerCase();
          if (v.includes(d)) return true;
          if (monthNum && (v.includes(monthNum) || v.endsWith(monthNum.slice(0, 3)))) return true;
          return false;
        };
        return check(item.dataInicio) || check(item.prazo);
      })();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.acao.toLowerCase().includes(q) ||
        item.pilar.toLowerCase().includes(q) ||
        item.responsavel.toLowerCase().includes(q) ||
        item.como.toLowerCase().includes(q) ||
        (item.unidadeOuParceiro && item.unidadeOuParceiro.toLowerCase().includes(q));

      return matchesStatus && matchesPilar && matchesResp && matchesSearch && matchesDate;
    });
  }, [projects, statusFilter, selectedPilar, selectedResp, selectedDate, searchQuery]);

  // Helper para atualizar ações no workspace ativo
  const updateActiveWorkspaceActions = (updater: (prev: ProjectAction[]) => ProjectAction[]) => {
    setWorkspaces(prevWorkspaces =>
      prevWorkspaces.map(ws => {
        if (ws.id === activeWorkspaceId) {
          return {
            ...ws,
            actions: updater(ws.actions),
            updatedAt: 'Outubro 2026'
          };
        }
        return ws;
      })
    );
  };

  // Handlers para ações
  const handleUpdateAction = (updated: ProjectAction) => {
    updateActiveWorkspaceActions(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    setSelectedAction(updated);
  };

  const handleQuickStatusChange = (
    id: string,
    newStatus: 'Finalizado' | 'Em andamento' | 'Não iniciado' | 'Sistêmico'
  ) => {
    updateActiveWorkspaceActions(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        let newProg = p.progresso;
        if (newStatus === 'Finalizado' || newStatus === 'Sistêmico') newProg = 100;
        else if (newStatus === 'Não iniciado') newProg = 0;
        else if (p.progresso === 0 || p.progresso === 100) newProg = 50;
        return {
          ...p,
          status: newStatus,
          progresso: newProg
        };
      })
    );
  };

  const handleDeleteAction = (id: string) => {
    updateActiveWorkspaceActions(prev => renumberAndOrganizeActions(prev.filter(p => p.id !== id)));
    setSelectedAction(null);
  };

  const handleAddAction = (newAction: ProjectAction) => {
    updateActiveWorkspaceActions(prev => insertAndRenumberAction(prev, newAction));
    setIsNewActionOpen(false);
  };

  const handleCreatePillar = (actionWithNewPillar: ProjectAction) => {
    updateActiveWorkspaceActions(prev => insertAndRenumberAction(prev, actionWithNewPillar));
    setIsNewPillarOpen(false);
  };

  const handleResetFilters = () => {
    setStatusFilter('todos');
    setSearchQuery('');
    setSelectedPilar('todos');
    setSelectedResp('todos');
    setSelectedDate('todos');
  };

  // Navegar para um painel específico a partir da Capa ou Header
  const handleSelectWorkspace = (workspaceId: string, view?: 'table' | 'pillars' | 'kanban') => {
    setActiveWorkspaceId(workspaceId);
    if (view) {
      setCurrentView(view);
    }
    handleResetFilters();
    setCurrentScreen('project');
  };

  // Criar novo workspace / painel
  const handleCreateWorkspace = (newWorkspace: ProjectWorkspace) => {
    setWorkspaces(prev => [...prev, newWorkspace]);
    setActiveWorkspaceId(newWorkspace.id);
    handleResetFilters();
    setCurrentScreen('project');
  };


  // Se a tela atual for a CAPA, renderizamos o CoverPortal
  if (currentScreen === 'cover') {
    return (
      <>
        <CoverPortal
          workspaces={workspaces}
          onSelectWorkspace={handleSelectWorkspace}
          onOpenNewProjectModal={() => setIsNewProjectOpen(true)}
          lastActiveWorkspaceId={activeWorkspaceId}
        />

        {isNewProjectOpen && (
          <NewProjectModal
            isOpen={isNewProjectOpen}
            onClose={() => setIsNewProjectOpen(false)}
            onCreateWorkspace={handleCreateWorkspace}
          />
        )}
      </>
    );
  }

  // TELA DO PAINEL DO PROJETO SELECIONADO
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. CABEÇALHO DO PAINEL */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenNewModal={() => setIsNewActionOpen(true)}
        onOpenNewPillarModal={() => setIsNewPillarOpen(true)}
        totalProjects={projects.length}
        onNavigateToCover={() => setCurrentScreen('cover')}
        activeWorkspace={activeWorkspace}
        allWorkspaces={workspaces}
        onSelectWorkspace={handleSelectWorkspace}
        onOpenNewProjectModal={() => setIsNewProjectOpen(true)}
      />

      {/* 2. CONTEÚDO PRINCIPAL (OCUPAÇÃO TOTAL DA TELA) */}
      <main className="w-full px-2.5 sm:px-4 lg:px-5 py-4 flex-1 space-y-4">
        
        {/* Banner do Título do Projeto Ativo */}
        <div className="pb-1 border-b border-slate-200">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#113269] tracking-tight font-sans">
            {activeWorkspace.title}
          </h1>
        </div>

        {/* 3. CARDS DE RESUMO (MÉTRICAS) */}
        <MetricCards
          projects={projects}
          activeStatusFilter={statusFilter}
          onSelectStatus={setStatusFilter}
        />

        {/* 4. FILTROS E BUSCA RÁPIDA (COM SELETOR DE DATA / CALENDÁRIO) */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          selectedPilar={selectedPilar}
          onPilarChange={setSelectedPilar}
          selectedResp={selectedResp}
          onRespChange={setSelectedResp}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          allPilares={allPilares}
          allResponsaveis={allResponsaveis}
          totalFiltered={filteredProjects.length}
          totalProjects={projects.length}
          onResetFilters={handleResetFilters}
          projects={projects}
        />

        {/* 5. VISUALIZAÇÃO SELECIONADA */}
        {currentView === 'table' && (
          <ProjectsTable
            projects={filteredProjects}
            onSelectAction={setSelectedAction}
            onQuickStatusChange={handleQuickStatusChange}
            onResetFilters={handleResetFilters}
          />
        )}

        {currentView === 'pillars' && (
          <PillarsView
            projects={filteredProjects}
            onSelectAction={setSelectedAction}
          />
        )}

        {currentView === 'kanban' && (
          <KanbanView
            projects={filteredProjects}
            onSelectAction={setSelectedAction}
            onStatusChange={handleQuickStatusChange}
          />
        )}

        {/* 6. BLOCO ROTINA (AÇÕES SISTÊMICAS COM AUTO-RESET NO DOMINGO) */}
        <RoutineBlock
          projects={projects}
          workspaceId={activeWorkspace.id}
          onSelectAction={setSelectedAction}
        />

      </main>

      {/* 7. MODAIS */}
      {selectedAction && (
        <ActionDetailModal
          action={selectedAction}
          onClose={() => setSelectedAction(null)}
          onUpdateAction={handleUpdateAction}
          onDeleteAction={handleDeleteAction}
        />
      )}

      {isNewActionOpen && (
        <NewActionModal
          isOpen={isNewActionOpen}
          onClose={() => setIsNewActionOpen(false)}
          onAddAction={handleAddAction}
          pilares={allPilares.length > 0 ? allPilares : ['AÇÕES OPERACIONAIS']}
          existingActions={projects}
        />
      )}

      {isNewPillarOpen && (
        <NewPillarModal
          isOpen={isNewPillarOpen}
          onClose={() => setIsNewPillarOpen(false)}
          workspaceTitle={activeWorkspace.title}
          existingPilares={allPilares}
          existingResponsaveis={allResponsaveis}
          onCreatePillar={handleCreatePillar}
        />
      )}

      {isNewProjectOpen && (
        <NewProjectModal
          isOpen={isNewProjectOpen}
          onClose={() => setIsNewProjectOpen(false)}
          onCreateWorkspace={handleCreateWorkspace}
        />
      )}

      {/* 8. RODAPÉ */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500 font-sans">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium">
            <button
              onClick={() => setCurrentScreen('cover')}
              className="font-bold text-[#113269] hover:underline"
            >
              ← Voltar à Capa
            </button>
            <span>·</span>
            <span className="font-bold text-slate-800">Rede Salute</span>
            <span>·</span>
            <span>{activeWorkspace.title}</span>
            <span>·</span>
            <span className="text-blue-700">gestaodeprojetossalute.live</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="text-slate-600 hover:text-slate-900 font-medium hover:underline"
            >
              Imprimir Relatório
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
