import React, { useState, useEffect, useMemo } from 'react';
import { 
  RotateCw, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Clock, 
  Eye, 
  Sparkles,
  Info,
  CheckCheck,
  RefreshCw,
  CalendarCheck
} from 'lucide-react';
import { ProjectAction } from '../data/projectsData';
import { 
  getSundayWeekKey, 
  getCurrentSundayDate, 
  getNextSundayDate, 
  formatShortDate 
} from '../utils/dateUtils';

interface RoutineBlockProps {
  projects: ProjectAction[];
  workspaceId: string;
  onSelectAction: (action: ProjectAction) => void;
}

interface StoredRoutineData {
  weekKey: string;
  completedMap: Record<string, boolean>;
}

const STORAGE_KEY = 'rede_salute_routine_checks_v2';

export const RoutineBlock: React.FC<RoutineBlockProps> = ({
  projects,
  workspaceId,
  onSelectAction
}) => {
  // 1. Filtrar todas as ações com status "Sistêmico" do painel ativo
  const systemicActions = useMemo(() => {
    return projects.filter(p => p.status === 'Sistêmico');
  }, [projects]);

  // Chave da semana atual (baseada no domingo mais recente)
  const currentWeekKey = getSundayWeekKey();

  // 2. Estado dos checks com auto-reset a cada domingo
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: StoredRoutineData = JSON.parse(saved);
        // Se a semana gravada for idêntica à atual, mantém os checks
        if (parsed.weekKey === currentWeekKey && parsed.completedMap) {
          return parsed.completedMap;
        }
        // Caso contrário, é um novo domingo/semana: desmarca tudo automaticamente!
      }
    } catch (e) {
      console.error('Erro ao recuperar status da rotina:', e);
    }
    return {};
  });

  // Atualizar persistência quando completedMap mudar
  useEffect(() => {
    try {
      const payload: StoredRoutineData = {
        weekKey: currentWeekKey,
        completedMap
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Erro ao salvar status da rotina:', e);
    }
  }, [completedMap, currentWeekKey]);

  // Toggle do check de uma ação
  const handleToggleCheck = (actionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedMap(prev => {
      const nextState = { ...prev, [actionId]: !prev[actionId] };
      return nextState;
    });
  };

  // Botão opcional para desmarcar todos manualmente
  const handleUncheckAll = () => {
    setCompletedMap({});
  };

  // Contadores de progresso da rotina
  const totalRoutines = systemicActions.length;
  const completedCount = systemicActions.filter(a => !!completedMap[a.id]).length;
  const percentCompleted = totalRoutines > 0 ? Math.round((completedCount / totalRoutines) * 100) : 0;

  // Informações de datas do ciclo semanal (domingo a sábado)
  const currentSunday = getCurrentSundayDate();
  const nextSunday = getNextSundayDate();
  const weekLabel = `Ciclo: ${formatShortDate(currentSunday)} a ${formatShortDate(new Date(nextSunday.getTime() - 86400000))}`;
  const resetLabel = `Reinicia domingo (${formatShortDate(nextSunday)})`;

  const getAvatarBg = (responsavel: string) => {
    const r = (responsavel || '').toLowerCase();
    if (r.includes('raquel')) return 'bg-blue-600 text-white';
    if (r.includes('eduardo')) return 'bg-indigo-600 text-white';
    if (r.includes('karina')) return 'bg-rose-600 text-white';
    if (r.includes('fabiano')) return 'bg-amber-600 text-white';
    if (r.includes('erno')) return 'bg-emerald-600 text-white';
    return 'bg-slate-600 text-white';
  };

  return (
    <section className="w-full mt-8 pt-4 border-t-2 border-slate-200/80 font-sans">
      {/* CARD PRINCIPAL DO BLOCO ROTINA */}
      <div className="bg-white rounded-2xl border border-purple-200/90 shadow-sm overflow-hidden">
        
        {/* CABEÇALHO DO BLOCO */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#113269] text-white px-5 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-300/30 flex items-center justify-center shrink-0">
                <RotateCw className="w-5 h-5 text-purple-200" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                    Rotina
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-400/20 text-purple-200 border border-purple-300/30">
                    Sistêmico Semanal
                  </span>
                  <span className="text-xs text-purple-200/80 font-medium">
                    • {weekLabel}
                  </span>
                </div>
                <p className="text-xs text-purple-100/80 mt-0.5">
                  Ações de execução contínua com checklist semanal. {resetLabel}.
                </p>
              </div>
            </div>

            {/* Progresso e Ações do Cabeçalho */}
            <div className="flex items-center gap-3 self-start md:self-center">
              <div className="bg-white/10 backdrop-blur-xs rounded-xl px-3.5 py-1.5 border border-white/15 flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-purple-200 block leading-tight">
                    Progresso da Semana
                  </span>
                  <span className="text-sm font-extrabold text-white">
                    {completedCount} de {totalRoutines} feitos ({percentCompleted}%)
                  </span>
                </div>
                <div className="w-16 bg-white/20 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FFCC00] rounded-full transition-all duration-500"
                    style={{ width: `${percentCompleted}%` }}
                  />
                </div>
              </div>

              {completedCount > 0 && (
                <button
                  onClick={handleUncheckAll}
                  className="px-2.5 py-1.5 text-xs font-semibold text-purple-200 hover:text-white bg-white/5 hover:bg-white/15 rounded-lg border border-purple-300/20 transition flex items-center gap-1.5"
                  title="Desmarcar todos os itens desta semana"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desmarcar todos</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* CONTEÚDO: LISTA DE AÇÕES SISTÊMICAS OU ESTADO VAZIO */}
        {systemicActions.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            <Info className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-700">
              Nenhuma ação com status "Sistêmico" cadastrada neste painel.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Ações configuradas com status "Sistêmico" aparecerão automaticamente aqui com checklist semanal.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {systemicActions.map((action, index) => {
              const isChecked = !!completedMap[action.id];

              return (
                <div
                  key={action.id}
                  className={`p-4 sm:p-5 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${
                    isChecked 
                      ? 'bg-emerald-50/35 hover:bg-emerald-50/50' 
                      : 'hover:bg-purple-50/30 bg-white'
                  }`}
                >
                  {/* LADO ESQUERDO: CHECKBOX + INFORMAÇÕES COMPLETAS DA AÇÃO */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {/* BOTÃO INTERATIVO DO CHECK DE FEITO */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleCheck(action.id, e)}
                      className={`shrink-0 mt-0.5 p-1 rounded-xl transition flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-purple-500 ${
                        isChecked
                          ? 'text-emerald-600 hover:text-emerald-700 bg-emerald-100/80 hover:bg-emerald-200/80'
                          : 'text-slate-400 hover:text-purple-600 hover:bg-purple-100/60'
                      }`}
                      title={isChecked ? 'Marcar como não feito' : 'Marcar como feito esta semana'}
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                      ) : (
                        <Circle className="w-7 h-7" />
                      )}
                    </button>

                    {/* DADOS DA AÇÃO (REPETINDO AS INFORMAÇÕES DO PAINEL) */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      
                      {/* Linha de Tags / Pilar / Categoria */}
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        {action.pilarCategoria && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded border border-purple-200">
                            {action.pilarCategoria}
                          </span>
                        )}
                        <span className="text-xs font-semibold text-slate-600 truncate max-w-md">
                          {action.pilar}
                        </span>
                        
                        {/* Status Sistêmico */}
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-purple-600 text-white">
                          <RotateCw className="w-3 h-3 text-white" />
                          <span>Sistêmico</span>
                        </span>

                        {/* Indicador de Conclusão Semanal */}
                        {isChecked ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCheck className="w-3 h-3 text-emerald-700" />
                            <span>Feito esta semana</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>Pendente esta semana</span>
                          </span>
                        )}
                      </div>

                      {/* Título da Ação (O que) */}
                      <h3 
                        onClick={() => onSelectAction(action)}
                        className={`text-sm sm:text-base font-bold text-slate-900 cursor-pointer hover:text-blue-700 transition leading-snug ${
                          isChecked ? 'line-through text-slate-500' : ''
                        }`}
                      >
                        {action.acao}
                      </h3>

                      {/* Detalhamento Operacional (Como) */}
                      {action.como && (
                        <p className="text-xs text-slate-600 bg-slate-50/80 p-2 rounded-lg border border-slate-200/60 leading-relaxed font-sans">
                          <span className="font-bold text-slate-700">Como: </span>
                          {action.como}
                        </p>
                      )}

                      {/* Responsável, Início e Quando */}
                      <div className="flex items-center gap-4 flex-wrap text-xs text-slate-600 pt-0.5">
                        {/* Responsável (Quem) */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-400 font-medium">Responsável:</span>
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${getAvatarBg(action.responsavel)}`}>
                            {(action.responsavel || '?')[0].toUpperCase()}
                          </span>
                          <span className="font-bold text-slate-800">{action.responsavel}</span>
                        </div>

                        {/* Início */}
                        {action.dataInicio && (
                          <div className="flex items-center gap-1 text-slate-500">
                            <span className="text-[11px] text-slate-400">Início:</span>
                            <span className="font-semibold text-slate-700">{action.dataInicio}</span>
                          </div>
                        )}

                        {/* Prazo */}
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] text-slate-400">Prazo:</span>
                          <span className="font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200/60">
                            {action.prazo || 'Semanal'}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* LADO DIREITO: BOTÃO DE CHECK RÁPIDO & VER DETALHES */}
                  <div className="flex items-center gap-2 self-end lg:self-center shrink-0 pt-2 lg:pt-0">
                    <button
                      type="button"
                      onClick={(e) => handleToggleCheck(action.id, e)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ${
                        isChecked
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {isChecked ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>Concluído</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-3.5 h-3.5 text-slate-400" />
                          <span>Marcar Feito</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectAction(action)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition flex items-center gap-1"
                      title="Abrir ficha detalhada da ação"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Ver</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* RODAPÉ DO BLOCO COM INDICAÇÃO DO REINÍCIO NO DOMINGO */}
        <div className="bg-slate-50/90 px-5 py-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-purple-600" />
            <span>
              <strong>Ciclo Semanal:</strong> Todos os checks são desmarcados automaticamente a cada domingo às 00:00.
            </span>
          </div>
          <div className="text-slate-400 font-medium">
            Próximo reinício: <strong>domingo, {formatShortDate(nextSunday)}</strong>
          </div>
        </div>

      </div>
    </section>
  );
};
