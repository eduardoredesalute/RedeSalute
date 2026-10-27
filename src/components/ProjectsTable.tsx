import React, { useMemo } from 'react';
import { 
  Eye, 
  CheckCircle2, 
  RotateCw, 
  Clock, 
  FilterX,
  AlertTriangle
} from 'lucide-react';
import { ProjectAction } from '../data/projectsData';
import { isActionOverdue } from '../utils/dateUtils';

interface ProjectsTableProps {
  projects: ProjectAction[];
  onSelectAction: (action: ProjectAction) => void;
  onQuickStatusChange: (id: string, newStatus: 'Finalizado' | 'Em andamento' | 'Não iniciado' | 'Sistêmico') => void;
  onResetFilters: () => void;
}

interface PillarGroup {
  pilar: string;
  pilarCategoria: string;
  items: { action: ProjectAction; globalIndex: number }[];
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  onSelectAction,
  onQuickStatusChange,
  onResetFilters
}) => {
  // Agrupamento unificado por Pilar Estratégico preservando a estrutura de ordem dos pilares e ações
  const pillarGroups = useMemo<PillarGroup[]>(() => {
    const groups: { [key: string]: PillarGroup } = {};
    const order: string[] = [];

    projects.forEach((action) => {
      const key = action.pilar;
      if (!groups[key]) {
        groups[key] = {
          pilar: action.pilar,
          pilarCategoria: action.pilarCategoria,
          items: []
        };
        order.push(key);
      }
      groups[key].items.push({ action, globalIndex: action.ordem || 0 });
    });

    // Garante que todas as ações tenham sua numeração estrita começando de 1
    let counter = 1;
    order.forEach(key => {
      groups[key].items.forEach(item => {
        if (!item.globalIndex) {
          item.globalIndex = counter;
        }
        counter++;
      });
    });

    return order.map(k => groups[k]);
  }, [projects]);

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
        <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
          <FilterX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800 mb-1">
          Nenhuma ação encontrada
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
          Nenhuma ação corresponde aos filtros selecionados. Tente limpar os filtros para ver todas as ações.
        </p>
        <button
          onClick={onResetFilters}
          className="px-4 py-2 bg-[#FFCC00] text-[#113269] text-xs font-bold rounded-lg shadow-xs hover:bg-[#e6b800] transition"
        >
          Limpar Filtros
        </button>
      </div>
    );
  }

  const getAvatarBg = (responsavel: string) => {
    const r = responsavel.toLowerCase();
    if (r.includes('raquel')) return 'bg-blue-600 text-white';
    if (r.includes('eduardo')) return 'bg-indigo-600 text-white';
    if (r.includes('karina')) return 'bg-rose-600 text-white';
    if (r.includes('fabiano')) return 'bg-amber-600 text-white';
    if (r.includes('erno')) return 'bg-emerald-600 text-white';
    return 'bg-slate-600 text-white';
  };

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50/95 text-[#113269] text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
              <th className="py-3.5 px-4 w-[24%] min-w-[240px] border-r border-slate-200 font-sans">
                Pilar Estratégico
              </th>
              <th className="py-3.5 px-3 w-12 text-center text-[#113269] font-sans">#</th>
              <th className="py-3.5 px-4 min-w-[280px] font-sans">Ação</th>
              <th className="py-3.5 px-4 w-[130px] whitespace-nowrap font-sans">Responsável</th>
              <th className="py-3.5 px-4 w-[95px] text-center whitespace-nowrap font-sans">Início</th>
              <th className="py-3.5 px-4 w-[130px] min-w-[120px] text-center whitespace-nowrap font-sans">Prazo</th>
              <th className="py-3.5 px-4 w-[140px] text-center whitespace-nowrap font-sans">Status</th>
              <th className="py-3.5 px-4 w-[80px] text-center no-print whitespace-nowrap font-sans">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pillarGroups.map((group) => {
              const rowCount = group.items.length;

              return group.items.map((itemObj, itemIndex) => {
                const p = itemObj.action;
                const isFirstInPillar = itemIndex === 0;
                const isLastInPillar = itemIndex === rowCount - 1;
                const isOverdue = isActionOverdue(p.prazo, p.status);

                // Cores de Status no padrão consolidado de softwares de gestão (Jira / Monday.com / Linear / ClickUp)
                let statusBadge = null;
                if (p.status === 'Finalizado') {
                  statusBadge = (
                    <span 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-emerald-600 text-white shadow-2xs tracking-wide"
                      title="Status: Concluído"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      <span>Concluído</span>
                    </span>
                  );
                } else if (p.status === 'Em andamento') {
                  statusBadge = (
                    <span 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-blue-600 text-white shadow-2xs tracking-wide"
                      title="Status: Em Andamento"
                    >
                      <RotateCw className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '8s' }} />
                      <span>Em Andamento</span>
                    </span>
                  );
                } else if (p.status === 'Sistêmico') {
                  statusBadge = (
                    <span 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-purple-600 text-white shadow-2xs tracking-wide"
                      title="Status: Sistêmico / Contínuo"
                    >
                      <RotateCw className="w-3.5 h-3.5 text-white" />
                      <span>Sistêmico</span>
                    </span>
                  );
                } else {
                  statusBadge = (
                    <span 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-slate-500 text-white shadow-2xs tracking-wide"
                      title="Status: Não Iniciado"
                    >
                      <Clock className="w-3.5 h-3.5 text-white" />
                      <span>Não Iniciado</span>
                    </span>
                  );
                }

                return (
                  <tr
                    key={p.id}
                    className={`transition-colors group ${
                      isOverdue 
                        ? 'bg-rose-50/25 hover:bg-rose-50/50' 
                        : 'hover:bg-blue-50/40'
                    } ${
                      isLastInPillar
                        ? 'border-b-2 border-slate-200/90'
                        : 'border-b border-slate-100'
                    }`}
                  >
                    {/* COLUNA 1 UNIFICADA: PILAR ESTRATÉGICO */}
                    {isFirstInPillar && (
                      <td
                        rowSpan={rowCount}
                        className="py-4 px-4 align-top bg-slate-50/80 border-r border-slate-200 text-slate-800 transition-colors"
                      >
                        <div className="sticky top-24 space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#113269] bg-blue-100/70 px-2 py-0.5 rounded border border-blue-200 inline-block font-sans">
                            {group.pilarCategoria}
                          </span>
                          <h4 
                            className="text-xs font-bold text-[#113269] leading-snug break-words font-sans"
                            title={group.pilar}
                          >
                            {group.pilar}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium pt-1 font-sans">
                            <span className="font-bold text-[#113269]">
                              {rowCount}
                            </span>
                            <span>{rowCount === 1 ? 'ação vinculada' : 'ações vinculadas'}</span>
                          </div>
                        </div>
                      </td>
                    )}

                    {/* # Index da Ação */}
                    <td className="py-3.5 px-3 text-center text-xs font-bold text-slate-500 tabular-nums font-sans">
                      {itemObj.action.ordem || itemObj.globalIndex}
                    </td>

                    {/* Ação (O que) */}
                    <td className="py-3.5 px-4 font-sans">
                      <div 
                        onClick={() => onSelectAction(p)}
                        className="text-xs font-bold text-slate-900 group-hover:text-[#113269] cursor-pointer leading-snug"
                      >
                        {p.acao}
                      </div>
                    </td>

                    {/* Responsável (Quem) */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-sans">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${getAvatarBg(
                            p.responsavel
                          )}`}
                        >
                          {p.responsavel.charAt(0)}
                        </span>
                        <span className="text-xs font-semibold text-slate-800">
                          {p.responsavel}
                        </span>
                      </div>
                    </td>

                    {/* Data Início */}
                    <td className="py-3.5 px-4 text-center text-xs font-semibold text-slate-700 whitespace-nowrap tabular-nums font-sans">
                      {p.dataInicio || '-'}
                    </td>

                    {/* Quando (Prazo) com Sinalizador de Atrasado */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap font-sans">
                      {isOverdue ? (
                        <div className="inline-flex flex-col items-center gap-1">
                          <span className="text-xs font-extrabold text-rose-700 tabular-nums">
                            {p.prazo}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-300 shadow-2xs">
                            <AlertTriangle className="w-2.5 h-2.5 text-rose-600 shrink-0" />
                            <span>Atrasado</span>
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-slate-800 whitespace-nowrap tabular-nums">
                          {p.prazo || '-'}
                        </span>
                      )}
                    </td>

                    {/* Status Badge Colorido */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap font-sans">
                      {statusBadge}
                    </td>

                    {/* Ações */}
                    <td className="py-3.5 px-4 text-center no-print whitespace-nowrap font-sans">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onSelectAction(p)}
                          className="px-2.5 py-1 text-xs font-bold text-[#113269] hover:text-white bg-slate-100 hover:bg-[#113269] rounded-lg transition border border-slate-200 flex items-center gap-1 shadow-2xs"
                          title="Ver ficha completa da ação"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Ver</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
