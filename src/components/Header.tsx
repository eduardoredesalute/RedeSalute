import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Table, 
  Layers, 
  Kanban,
  LayoutGrid,
  ChevronDown,
  Check,
  DollarSign,
  Activity,
  FolderKanban,
  Stethoscope,
  ArrowLeft
} from 'lucide-react';
import { ProjectWorkspace } from '../data/projectsData';

interface HeaderProps {
  currentView: 'table' | 'pillars' | 'kanban';
  onViewChange: (view: 'table' | 'pillars' | 'kanban') => void;
  onOpenNewModal: () => void;
  totalProjects: number;
  onNavigateToCover?: () => void;
  activeWorkspace?: ProjectWorkspace;
  allWorkspaces?: ProjectWorkspace[];
  onSelectWorkspace?: (id: string) => void;
  onOpenNewProjectModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenNewModal,
  totalProjects,
  onNavigateToCover,
  activeWorkspace,
  allWorkspaces = [],
  onSelectWorkspace,
  onOpenNewProjectModal
}) => {
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSwitcherOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderIcon = (iconName?: string) => {
    const props = { className: "w-4 h-4" };
    switch (iconName) {
      case 'DollarSign': return <DollarSign {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Stethoscope': return <Stethoscope {...props} />;
      case 'FolderKanban': return <FolderKanban {...props} />;
      case 'Building2':
      default: return <Building2 {...props} />;
    }
  };

  return (
    <header className="bg-[#113269] text-white border-b border-blue-900/60 sticky top-0 z-30 shadow-md">
      <div className="w-full px-2.5 sm:px-4 lg:px-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3.5">
          
          {/* Logo, Botão Capa & Seletor de Painel */}
          <div className="flex items-center gap-3">
            
            {/* Botão Voltar para a Capa */}
            {onNavigateToCover && (
              <button
                onClick={onNavigateToCover}
                className="px-2.5 py-2 bg-[#0b244d] hover:bg-[#153c7a] text-blue-200 hover:text-white rounded-lg border border-blue-900/80 transition flex items-center gap-1.5 text-xs font-bold shadow-xs shrink-0"
                title="Voltar para a Capa dos Projetos"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#FFCC00]" />
                <span className="hidden sm:inline">Capa</span>
              </button>
            )}

            {/* Logo Marca Oficial Enviada */}
            <div 
              onClick={onNavigateToCover}
              className="bg-white px-2 py-1 rounded-lg shadow-sm border border-white/20 inline-flex items-center shrink-0 cursor-pointer hover:opacity-95 transition"
              title="Ir para a Capa de Projetos"
            >
              <img 
                src="/salute-logo-main.png" 
                alt="Salute" 
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </div>

            <span className="text-slate-400 hidden sm:inline">/</span>

            {/* Seletor do Painel Atual */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-2">
                {/* Dropdown Button */}
                <button
                  onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
                  className="px-2.5 py-1.5 rounded-lg bg-blue-900/70 hover:bg-blue-900 border border-blue-400/30 flex items-center gap-2 transition text-left group"
                >
                  <span className="text-xs font-extrabold text-white uppercase tracking-tight truncate max-w-[200px] sm:max-w-none">
                    {activeWorkspace ? activeWorkspace.title : 'Painel de Projetos'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-blue-300 transition-transform ${isSwitcherOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Menu Dropdown de Seleção de Painéis */}
              {isSwitcherOpen && (
                <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 text-slate-800 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3.5 py-2 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <span>Selecionar Painel</span>
                    <span className="text-blue-600">{allWorkspaces.length} projetos</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto p-1.5 space-y-1">
                    {allWorkspaces.map(ws => {
                      const isSelected = activeWorkspace?.id === ws.id;
                      return (
                        <button
                          key={ws.id}
                          onClick={() => {
                            if (onSelectWorkspace) onSelectWorkspace(ws.id);
                            setIsSwitcherOpen(false);
                          }}
                          className={`w-full p-2.5 rounded-lg text-left transition flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-[#113269] text-white shadow-xs'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div 
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-white/20 text-[#FFCC00]' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {renderIcon(ws.iconName)}
                            </div>
                            <div className="truncate">
                              <div className="text-xs font-bold truncate">
                                {ws.title}
                              </div>
                              <div className={`text-[10px] truncate ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                                {ws.actions.length} ações · {ws.category}
                              </div>
                            </div>
                          </div>

                          {isSelected && (
                            <Check className="w-4 h-4 text-[#FFCC00] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Ação de Adicionar Novo Painel */}
                  {onOpenNewProjectModal && (
                    <div className="p-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setIsSwitcherOpen(false);
                          onOpenNewProjectModal();
                        }}
                        className="w-full py-2 px-3 text-xs font-bold text-[#113269] hover:bg-amber-50 rounded-lg transition flex items-center justify-center gap-1.5 border border-dashed border-amber-300 bg-amber-50/50"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#113269]" />
                        <span>+ Criar Outro Painel</span>
                      </button>
                    </div>
                  )}

                  {/* Voltar para a Capa */}
                  {onNavigateToCover && (
                    <div className="px-2 pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setIsSwitcherOpen(false);
                          onNavigateToCover();
                        }}
                        className="w-full py-1.5 px-3 text-[11px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition flex items-center justify-center gap-1.5"
                      >
                        <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
                        <span>Ver Todos os Painéis na Capa</span>
                      </button>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>

          {/* Seletor de Visualização & Ações */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 no-print">
            
            {/* Alternador de visualização */}
            <div className="p-1 bg-[#0b244d] rounded-lg border border-blue-900/70 flex items-center gap-1 shadow-inner">
              <button
                onClick={() => onViewChange('table')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition ${
                  currentView === 'table'
                    ? 'bg-[#FFCC00] text-[#113269] shadow-xs border border-amber-300'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
                title="Tabela de Ações"
              >
                <Table className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tabela</span>
              </button>

              <button
                onClick={() => onViewChange('pillars')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition ${
                  currentView === 'pillars'
                    ? 'bg-[#FFCC00] text-[#113269] shadow-xs border border-amber-300'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
                title="Visão por Pilares Estratégicos"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Por Pilares</span>
              </button>

              <button
                onClick={() => onViewChange('kanban')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition ${
                  currentView === 'kanban'
                    ? 'bg-[#FFCC00] text-[#113269] shadow-xs border border-amber-300'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
                title="Quadro Kanban de Status"
              >
                <Kanban className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kanban</span>
              </button>
            </div>

            {/* Nova Ação */}
            <button
              onClick={onOpenNewModal}
              className="px-3.5 py-2 text-xs font-bold text-[#113269] bg-[#FFCC00] hover:bg-[#e6b800] rounded-lg shadow-sm transition flex items-center gap-1.5 border border-amber-300"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="whitespace-nowrap">Nova Ação</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
