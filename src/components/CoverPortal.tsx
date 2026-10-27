import React from 'react';
import { 
  Building2, 
  DollarSign, 
  Activity, 
  FolderKanban, 
  Stethoscope, 
  Plus, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Table, 
  Kanban,
  Users,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { ProjectWorkspace } from '../data/projectsData';

interface CoverPortalProps {
  workspaces: ProjectWorkspace[];
  onSelectWorkspace: (workspaceId: string, view?: 'table' | 'pillars' | 'kanban') => void;
  onOpenNewProjectModal: () => void;
  lastActiveWorkspaceId?: string;
}

export const CoverPortal: React.FC<CoverPortalProps> = ({
  workspaces,
  onSelectWorkspace,
  onOpenNewProjectModal,
  lastActiveWorkspaceId
}) => {
  // Helper para renderizar o ícone do projeto
  const renderIcon = (iconName: string, themeColor: string) => {
    const props = { className: "w-6 h-6 text-white" };
    switch (iconName) {
      case 'DollarSign':
        return <DollarSign {...props} />;
      case 'Activity':
        return <Activity {...props} />;
      case 'Stethoscope':
        return <Stethoscope {...props} />;
      case 'FolderKanban':
        return <FolderKanban {...props} />;
      case 'Building2':
      default:
        return <Building2 {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. CABEÇALHO DO PORTAL / CAPA */}
      <header className="bg-[#113269] text-white border-b border-blue-900/60 sticky top-0 z-30 shadow-md">
        <div className="w-full px-2.5 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between py-3.5 gap-4">
            
            {/* Logo Oficial Enviada & Título da Página no Topo */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3.5">
              <div className="bg-white px-2.5 py-1 rounded-lg shadow-sm border border-white/20 flex items-center shrink-0">
                <img 
                  src="/salute-logo-main.png" 
                  alt="Salute" 
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>
              <h1 className="text-xs sm:text-sm text-blue-100 font-extrabold tracking-tight font-sans">
                Central Integrada de Projetos & Painéis
              </h1>
            </div>

            {/* Ações Rápidas no Topo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onOpenNewProjectModal}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold bg-[#FFCC00] text-[#113269] hover:bg-amber-400 rounded-lg transition shadow-xs flex items-center gap-1.5 border border-amber-300"
              >
                <Plus className="w-4 h-4" />
                <span className="whitespace-nowrap">Criar Novo Painel</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 2. CONTEÚDO PRINCIPAL (OCUPAÇÃO TOTAL DA TELA) */}
      <main className="w-full px-2.5 sm:px-4 lg:px-6 py-6 flex-1 space-y-6">

        {/* GRADE DOS PAINÉIS DE PROJETOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workspaces.map(workspace => {
            const total = workspace.actions.length;
            const completed = workspace.actions.filter(a => a.status === 'Finalizado').length;
            const inProgress = workspace.actions.filter(a => a.status === 'Em andamento').length;
            const sistemico = workspace.actions.filter(a => a.status === 'Sistêmico').length;
            const notStarted = workspace.actions.filter(a => a.status === 'Não iniciado').length;
            const pct = total > 0 ? Math.round(((completed + sistemico) / total) * 100) : 0;
            const pillarsCount = new Set(workspace.actions.map(a => a.pilar)).size;
            const responsaveis = Array.from(new Set(workspace.actions.map(a => a.responsavel))).slice(0, 4);

            return (
              <div
                key={workspace.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:border-[#113269]/40"
              >
                {/* Topo do Card com Cor Temática */}
                <div>
                  <div 
                    className="p-5 text-white flex items-start justify-between relative overflow-hidden"
                    style={{ backgroundColor: workspace.themeColor || '#113269' }}
                  >
                    <div className="flex items-center gap-3.5 relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center border border-white/20 shadow-inner shrink-0">
                        {renderIcon(workspace.iconName, workspace.themeColor)}
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-white tracking-tight font-sans">
                          {workspace.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Corpo do Card */}
                  <div className="p-5 space-y-4">
                    
                    {/* Subtítulo & Descrição */}
                    <div className="space-y-1">
                      <h3 className="text-xs font-semibold text-[#113269] uppercase tracking-wider font-sans">
                        {workspace.subtitle}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                        {workspace.description}
                      </p>
                    </div>

                    {/* Barra de Progresso do Projeto */}
                    <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700">Taxa de Conclusão</span>
                        <span className="font-extrabold text-[#113269] tabular-nums">{pct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: pct === 100 ? '#10b981' : (workspace.themeColor || '#113269')
                          }}
                        />
                      </div>
                    </div>

                    {/* Métricas do Painel (Unboxed text) */}
                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="text-lg font-bold text-slate-800 tabular-nums">
                          {total}
                        </div>
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          Ações
                        </div>
                      </div>

                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="text-lg font-bold text-slate-800 tabular-nums">
                          {pillarsCount}
                        </div>
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          Pilares
                        </div>
                      </div>

                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="text-lg font-bold text-emerald-600 tabular-nums">
                          {completed}
                        </div>
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          Finalizadas
                        </div>
                      </div>
                    </div>

                    {/* Resumo de Status e Equipe */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <div className="flex items-center gap-1 font-medium">
                        <span className="text-emerald-700 font-bold">{completed} conc</span>
                        {sistemico > 0 && (
                          <>
                            <span>·</span>
                            <span className="text-amber-700 font-bold">{sistemico} sist</span>
                          </>
                        )}
                        <span>·</span>
                        <span className="text-blue-700 font-bold">{inProgress} and</span>
                        <span>·</span>
                        <span className="text-slate-600 font-bold">{notStarted} pend</span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{responsaveis.join(', ')}</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Rodapé do Card com Ação Primária */}
                <div className="p-5 pt-0">
                  {/* Botão Primário de Acesso */}
                  <button
                    onClick={() => onSelectWorkspace(workspace.id, 'table')}
                    className="w-full py-2.5 px-4 bg-[#FFCC00] text-[#113269] hover:bg-amber-400 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-xs flex items-center justify-center gap-2 border border-amber-300 group-hover:scale-[1.01]"
                  >
                    <span>Acessar Painel</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}

          {/* CARD DE ADIÇÃO: "+ CRIAR NOVO PAINEL" */}
          <div
            onClick={onOpenNewProjectModal}
            className="bg-white/80 hover:bg-white rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#113269] p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group hover:shadow-md min-h-[380px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-[#113269] text-blue-600 group-hover:text-[#FFCC00] flex items-center justify-center transition-all duration-200 shadow-xs mb-4">
              <Plus className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#113269] font-sans">
              Criar Outro Painel de Projetos
            </h3>

            <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed font-sans">
              Estruture um novo painel com acompanhamento de ações, pilares customizados, responsáveis e visualizações em Tabela e Kanban.
            </p>

            <div className="mt-5 px-4 py-2 text-xs font-bold bg-[#113269] text-white group-hover:bg-[#FFCC00] group-hover:text-[#113269] rounded-xl transition border border-transparent group-hover:border-amber-300">
              + Adicionar Painel
            </div>
          </div>

        </div>

        </main>

      {/* 6. RODAPÉ DA CAPA */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-8 text-xs text-slate-500 font-sans">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-bold text-slate-800">Rede Salute</span>
            <span>·</span>
            <span>Portal Central de Painéis Estratégicos</span>
            <span>·</span>
            <span className="text-blue-700">gestaodeprojetossalute.live</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-600 font-semibold">
              {workspaces.length} painéis ativos
            </span>
            <span>·</span>
            <button
              onClick={onOpenNewProjectModal}
              className="text-blue-600 hover:text-blue-800 font-bold"
            >
              + Novo Painel
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
