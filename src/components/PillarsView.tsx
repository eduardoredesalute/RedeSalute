import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Layers, CheckCircle2, RotateCw, Clock, Eye } from 'lucide-react';
import { ProjectAction } from '../data/projectsData';

interface PillarsViewProps {
  projects: ProjectAction[];
  onSelectAction: (action: ProjectAction) => void;
}

export const PillarsView: React.FC<PillarsViewProps> = ({
  projects,
  onSelectAction
}) => {
  // Group projects by pilar
  const pilarGroups = projects.reduce<Record<string, ProjectAction[]>>((acc, curr) => {
    if (!acc[curr.pilar]) {
      acc[curr.pilar] = [];
    }
    acc[curr.pilar].push(curr);
    return acc;
  }, {});

  const pilarKeys = Object.keys(pilarGroups);

  // Expanded states (default: first 4 open, or all open)
  const [expandedPilares, setExpandedPilares] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    pilarKeys.forEach((key, idx) => {
      initial[key] = idx < 6; // open first 6 by default
    });
    return initial;
  });

  const togglePilar = (pilar: string) => {
    setExpandedPilares(prev => ({
      ...prev,
      [pilar]: !prev[pilar]
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    pilarKeys.forEach(k => (allOpen[k] = true));
    setExpandedPilares(allOpen);
  };

  const collapseAll = () => {
    setExpandedPilares({});
  };

  return (
    <div className="space-y-4">
      {/* Barra de Controle de Expansão */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Organizado em {pilarKeys.length} Pilares Estratégicos</span>
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Expandir Todos
          </button>
          <span>·</span>
          <button
            onClick={collapseAll}
            className="text-slate-600 hover:text-slate-800 font-semibold"
          >
            Recolher Todos
          </button>
        </div>
      </div>

      {/* Grid de Pilares */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pilarKeys.map(pilar => {
          const items = pilarGroups[pilar];
          const isExpanded = !!expandedPilares[pilar];
          const total = items.length;
          const completed = items.filter(i => i.status === 'Finalizado').length;
          const inProgress = items.filter(i => i.status === 'Em andamento').length;
          const sistemico = items.filter(i => i.status === 'Sistêmico').length;
          const notStarted = items.filter(i => i.status === 'Não iniciado').length;
          
          const avgProgress = Math.round(
            items.reduce((acc, curr) => acc + (curr.progresso || 0), 0) / total
          );

          const categoria = items[0]?.pilarCategoria || 'Estratégico';

          return (
            <div
              key={pilar}
              className="bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition overflow-hidden"
            >
              {/* Header do Pilar */}
              <div
                onClick={() => togglePilar(pilar)}
                className="p-4 cursor-pointer hover:bg-slate-50/80 transition flex items-start justify-between gap-3 select-none"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                      {categoria}
                    </span>
                    <h4 className="text-sm font-bold text-[#113269] leading-snug">
                      {pilar}
                    </h4>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <span>{total} ações</span>
                      <span>·</span>
                      <span className="text-emerald-700 font-medium">{completed} concl.</span>
                      {sistemico > 0 && (
                        <>
                          <span>·</span>
                          <span className="text-amber-700 font-medium">{sistemico} sist.</span>
                        </>
                      )}
                      <span>·</span>
                      <span className="text-blue-700 font-medium">{inProgress} andam.</span>
                      {notStarted > 0 && (
                        <>
                          <span>·</span>
                          <span className="text-slate-600 font-medium">{notStarted} pend.</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#113269] tabular-nums font-sans">
                      {avgProgress}%
                    </span>
                    <div className="w-16 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                      <div
                        className="bg-[#113269] h-full rounded-full"
                        style={{ width: `${avgProgress}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-slate-400 hover:text-slate-600 p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Lista de Ações do Pilar (Expandida) */}
              {isExpanded && (
                <div className="border-t border-slate-100 divide-y divide-slate-100 bg-slate-50/40">
                  {items.map(action => {
                    let statusIcon = null;
                    if (action.status === 'Finalizado') {
                      statusIcon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
                    } else if (action.status === 'Em andamento') {
                      statusIcon = <RotateCw className="w-3.5 h-3.5 text-[#113269] shrink-0 animate-spin" style={{ animationDuration: '9s' }} />;
                    } else if (action.status === 'Sistêmico') {
                      statusIcon = <RotateCw className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
                    } else {
                      statusIcon = <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
                    }

                    return (
                      <div
                        key={action.id}
                        className="p-3.5 flex items-center justify-between gap-3 hover:bg-white transition"
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div className="mt-0.5">{statusIcon}</div>
                          <div className="min-w-0">
                            <p 
                              onClick={() => onSelectAction(action)}
                              className="text-xs font-semibold text-slate-800 hover:text-[#113269] cursor-pointer truncate font-sans"
                              title={action.acao}
                            >
                              {action.acao}
                            </p>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 font-sans">
                              <span>Resp: <strong className="text-slate-700">{action.responsavel}</strong></span>
                              <span>·</span>
                              <span className="tabular-nums">Prazo: {action.prazo}</span>
                              {action.unidadeOuParceiro && (
                                <>
                                  <span>·</span>
                                  <span className="text-[#113269] font-bold">{action.unidadeOuParceiro}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-bold text-slate-700 tabular-nums font-sans">
                            {action.progresso}%
                          </span>
                          <button
                            onClick={() => onSelectAction(action)}
                            className="p-1.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-md transition"
                            title="Ver Detalhes"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
