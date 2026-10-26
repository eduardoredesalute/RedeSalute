import React from 'react';
import { CheckCircle2, RotateCw, Clock4, ListFilter } from 'lucide-react';
import { ProjectAction } from '../data/projectsData';

interface MetricCardsProps {
  projects: ProjectAction[];
  activeStatusFilter: string;
  onSelectStatus: (status: string) => void;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  projects,
  activeStatusFilter,
  onSelectStatus
}) => {
  const total = projects.length;
  const inProgress = projects.filter(p => p.status === 'Em andamento').length;
  const completed = projects.filter(p => p.status === 'Finalizado').length;
  const sistemico = projects.filter(p => p.status === 'Sistêmico').length;
  const notStarted = projects.filter(p => p.status === 'Não iniciado').length;

  return (
    <div className={`grid grid-cols-2 ${sistemico > 0 ? 'sm:grid-cols-3 lg:grid-cols-5' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-2 sm:gap-2.5`}>
        
        {/* Card 1: Total */}
        <div
          onClick={() => onSelectStatus('todos')}
          className={`cursor-pointer bg-white px-3.5 py-2.5 rounded-lg border transition shadow-xs group ${
            activeStatusFilter === 'todos'
              ? 'border-[#113269] ring-2 ring-[#FFCC00] shadow-sm bg-amber-50/25'
              : 'border-slate-200/80 hover:border-blue-400 hover:shadow-xs'
          }`}
          title="Ver todas as ações"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
              Total de Ações
            </span>
            <div className="flex items-center gap-1 shrink-0">
              {activeStatusFilter === 'todos' && (
                <span className="bg-[#FFCC00] text-[#113269] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                  Ativo
                </span>
              )}
              <div className="w-5 h-5 rounded-md bg-blue-50 text-[#113269] flex items-center justify-center">
                <ListFilter className="w-3 h-3" />
              </div>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-[#113269] tabular-nums">
              {total}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">ações ativas</span>
          </div>
        </div>

        {/* Card 2: Em Andamento */}
        <div
          onClick={() => onSelectStatus('Em andamento')}
          className={`cursor-pointer bg-white px-3.5 py-2.5 rounded-lg border transition shadow-xs group ${
            activeStatusFilter === 'Em andamento'
              ? 'border-[#113269] ring-2 ring-[#FFCC00] shadow-sm bg-amber-50/25'
              : 'border-slate-200/80 hover:border-blue-400 hover:shadow-xs'
          }`}
          title="Filtrar em andamento"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
              Em Andamento
            </span>
            <div className="flex items-center gap-1 shrink-0">
              {activeStatusFilter === 'Em andamento' && (
                <span className="bg-[#FFCC00] text-[#113269] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                  Ativo
                </span>
              )}
              <div className="w-5 h-5 rounded-md bg-blue-50 text-[#113269] flex items-center justify-center">
                <RotateCw className="w-3 h-3" />
              </div>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-[#113269] tabular-nums">
              {inProgress}
            </span>
            <span className="text-[11px] text-slate-500 font-semibold">
              ({total > 0 ? Math.round((inProgress / total) * 100) : 0}%)
            </span>
          </div>
        </div>

        {/* Card 3: Concluídos */}
        <div
          onClick={() => onSelectStatus('Finalizado')}
          className={`cursor-pointer bg-white px-3.5 py-2.5 rounded-lg border transition shadow-xs group ${
            activeStatusFilter === 'Finalizado'
              ? 'border-[#113269] ring-2 ring-[#FFCC00] shadow-sm bg-amber-50/25'
              : 'border-slate-200/80 hover:border-emerald-400 hover:shadow-xs'
          }`}
          title="Filtrar concluídos"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
              Concluídos
            </span>
            <div className="flex items-center gap-1 shrink-0">
              {activeStatusFilter === 'Finalizado' && (
                <span className="bg-[#FFCC00] text-[#113269] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                  Ativo
                </span>
              )}
              <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3" />
              </div>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-emerald-600 tabular-nums">
              {completed}
            </span>
            <span className="text-[11px] text-slate-500 font-semibold">
              ({total > 0 ? Math.round((completed / total) * 100) : 0}%)
            </span>
          </div>
        </div>

        {/* Card 4: Sistêmico */}
        {sistemico > 0 && (
          <div
            onClick={() => onSelectStatus('Sistêmico')}
            className={`cursor-pointer bg-white px-3.5 py-2.5 rounded-lg border transition shadow-xs group ${
              activeStatusFilter === 'Sistêmico'
                ? 'border-[#113269] ring-2 ring-[#FFCC00] shadow-sm bg-purple-50/25'
                : 'border-slate-200/80 hover:border-purple-400 hover:shadow-xs'
            }`}
            title="Filtrar sistêmico"
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
                Sistêmico
              </span>
              <div className="flex items-center gap-1 shrink-0">
                {activeStatusFilter === 'Sistêmico' && (
                  <span className="bg-[#FFCC00] text-[#113269] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                    Ativo
                  </span>
                )}
                <div className="w-5 h-5 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center">
                  <RotateCw className="w-3 h-3" />
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-purple-700 tabular-nums">
                {sistemico}
              </span>
              <span className="text-[11px] text-slate-500 font-semibold">
                ({total > 0 ? Math.round((sistemico / total) * 100) : 0}%)
              </span>
            </div>
          </div>
        )}

        {/* Card 5: Não Iniciados */}
        <div
          onClick={() => onSelectStatus('Não iniciado')}
          className={`cursor-pointer bg-white px-3.5 py-2.5 rounded-lg border transition shadow-xs group ${
            activeStatusFilter === 'Não iniciado'
              ? 'border-[#113269] ring-2 ring-[#FFCC00] shadow-sm bg-amber-50/25'
              : 'border-slate-200/80 hover:border-slate-400 hover:shadow-xs'
          }`}
          title="Filtrar não iniciados"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
              Não Iniciados
            </span>
            <div className="flex items-center gap-1 shrink-0">
              {activeStatusFilter === 'Não iniciado' && (
                <span className="bg-[#FFCC00] text-[#113269] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                  Ativo
                </span>
              )}
              <div className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center">
                <Clock4 className="w-3 h-3" />
              </div>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-slate-700 tabular-nums">
              {notStarted}
            </span>
            <span className="text-[11px] text-slate-500 font-semibold">
              ({total > 0 ? Math.round((notStarted / total) * 100) : 0}%)
            </span>
          </div>
        </div>

      </div>
  );
};
