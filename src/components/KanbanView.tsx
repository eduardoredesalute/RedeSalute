import React from 'react';
import { CheckCircle2, RotateCw, Clock, ArrowRight, ArrowLeft, Eye, AlertTriangle } from 'lucide-react';
import { ProjectAction } from '../data/projectsData';
import { isActionOverdue } from '../utils/dateUtils';

interface KanbanViewProps {
  projects: ProjectAction[];
  onSelectAction: (action: ProjectAction) => void;
  onStatusChange: (id: string, newStatus: 'Finalizado' | 'Em andamento' | 'Não iniciado' | 'Sistêmico') => void;
}

export const KanbanView: React.FC<KanbanViewProps> = ({
  projects,
  onSelectAction,
  onStatusChange
}) => {
  const columns: {
    status: 'Não iniciado' | 'Em andamento' | 'Finalizado' | 'Sistêmico';
    title: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
  }[] = [
    {
      status: 'Não iniciado',
      title: 'Não Iniciado',
      icon: <Clock className="w-4 h-4 text-slate-500" />,
      color: 'border-slate-300',
      bg: 'bg-slate-100/70'
    },
    {
      status: 'Em andamento',
      title: 'Em Andamento',
      icon: <RotateCw className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '8s' }} />,
      color: 'border-blue-400',
      bg: 'bg-blue-50/50'
    },
    {
      status: 'Finalizado',
      title: 'Concluído',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      color: 'border-emerald-400',
      bg: 'bg-emerald-50/50'
    },
    {
      status: 'Sistêmico',
      title: 'Sistêmico / Contínuo',
      icon: <RotateCw className="w-4 h-4 text-purple-600" />,
      color: 'border-purple-400',
      bg: 'bg-purple-50/50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
      {columns.map(col => {
        const items = projects.filter(p => p.status === col.status);

        return (
          <div
            key={col.status}
            className="bg-slate-50/90 rounded-xl border border-slate-200/80 p-3.5 space-y-3 flex flex-col min-h-[500px]"
          >
            {/* Cabeçalho da Coluna */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                {col.icon}
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  {col.title}
                </h3>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[#113269] tabular-nums font-sans">
                {items.length}
              </span>
            </div>

            {/* Lista de Cards */}
            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[720px] pr-0.5">
              {items.map(p => (
                <div
                  key={p.id}
                  className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-2xs hover:shadow-md hover:border-blue-300 transition group space-y-2.5"
                >
                  {/* Topo do Card */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider line-clamp-1" title={p.pilar}>
                      {p.pilarCategoria || p.pilar}
                    </span>
                    <button
                      onClick={() => onSelectAction(p)}
                      className="text-slate-400 hover:text-blue-600 p-0.5 transition"
                      title="Ver Detalhes"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Título da Ação */}
                  <h4 
                    onClick={() => onSelectAction(p)}
                    className="text-xs font-bold text-slate-900 leading-snug hover:text-blue-700 cursor-pointer"
                  >
                    {p.acao}
                  </h4>

                  {/* Responsável & Prazos */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100 font-sans">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="w-5 h-5 rounded-full bg-[#113269] text-white flex items-center justify-center text-[10px] font-bold">
                        {p.responsavel.charAt(0)}
                      </span>
                      <span>{p.responsavel}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {isActionOverdue(p.prazo, p.status) && (
                        <span className="inline-flex items-center gap-0.5 px-1 py-0.2 rounded text-[9px] font-extrabold bg-rose-100 text-rose-800 border border-rose-300">
                          <AlertTriangle className="w-2.5 h-2.5 text-rose-600" />
                          <span>Atrasado</span>
                        </span>
                      )}
                      <span className="tabular-nums font-semibold text-slate-700">
                        Prazo: {p.prazo || '-'}
                      </span>
                    </div>
                  </div>

                  {/* Barra de Progresso */}
                  <div className="flex items-center gap-2 pt-1 font-sans">
                    <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          p.progresso === 100
                            ? 'bg-emerald-500'
                            : p.progresso > 30
                            ? 'bg-[#113269]'
                            : 'bg-slate-400'
                        }`}
                        style={{ width: `${p.progresso}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 tabular-nums">
                      {p.progresso}%
                    </span>
                  </div>

                  {/* Transição de Status Rápida */}
                  <div className="flex items-center justify-between gap-1 pt-1.5 border-t border-slate-100 text-xs font-sans">
                    {col.status !== 'Não iniciado' ? (
                      <button
                        onClick={() =>
                          onStatusChange(
                            p.id,
                            col.status === 'Finalizado' ? 'Em andamento' : 'Não iniciado'
                          )
                        }
                        className="text-[11px] text-slate-500 hover:text-[#113269] flex items-center gap-1 font-medium transition"
                        title="Mover para status anterior"
                      >
                        <ArrowLeft className="w-3 h-3" />
                        <span>Voltar</span>
                      </button>
                    ) : <div />}

                    {col.status !== 'Finalizado' ? (
                      <button
                        onClick={() =>
                          onStatusChange(
                            p.id,
                            col.status === 'Não iniciado' ? 'Em andamento' : 'Finalizado'
                          )
                        }
                        className="text-[11px] text-[#113269] hover:text-blue-900 flex items-center gap-1 font-bold transition ml-auto"
                        title="Avançar status"
                      >
                        <span>{col.status === 'Não iniciado' ? 'Iniciar' : 'Concluir'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 ml-auto">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Entregue</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {items.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
                  Nenhuma ação nesta coluna
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
