import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  Calendar, 
  FileText, 
  Edit3, 
  Trash2, 
  Check,
  AlertTriangle
} from 'lucide-react';
import { ProjectAction } from '../data/projectsData';
import { isActionOverdue } from '../utils/dateUtils';

interface ActionDetailModalProps {
  action: ProjectAction | null;
  onClose: () => void;
  onUpdateAction: (updated: ProjectAction) => void;
  onDeleteAction?: (id: string) => void;
}

export const ActionDetailModal: React.FC<ActionDetailModalProps> = ({
  action,
  onClose,
  onUpdateAction,
  onDeleteAction
}) => {
  if (!action) return null;

  // Estados dos campos da ação
  const [acao, setAcao] = useState<string>(action.acao);
  const [responsavel, setResponsavel] = useState<string>(action.responsavel);
  const [dataInicio, setDataInicio] = useState<string>(action.dataInicio);
  const [prazo, setPrazo] = useState<string>(action.prazo);
  const [como, setComo] = useState<string>(action.como);
  const [status, setStatus] = useState<ProjectAction['status']>(action.status);
  const [progresso, setProgresso] = useState<number>(action.progresso);

  // Estados de edição individual para cada campo indicado pela seta
  const [isEditingAcao, setIsEditingAcao] = useState(false);
  const [tempAcao, setTempAcao] = useState<string>(action.acao);

  const [isEditingResponsavel, setIsEditingResponsavel] = useState(false);
  const [tempResponsavel, setTempResponsavel] = useState<string>(action.responsavel);

  const [isEditingDataInicio, setIsEditingDataInicio] = useState(false);
  const [tempDataInicio, setTempDataInicio] = useState<string>(action.dataInicio);

  const [isEditingPrazo, setIsEditingPrazo] = useState(false);
  const [tempPrazo, setTempPrazo] = useState<string>(action.prazo);

  const [isEditingComo, setIsEditingComo] = useState(false);
  const [tempComo, setTempComo] = useState<string>(action.como);

  const isOverdue = isActionOverdue(prazo, status);

  // Sincronizar quando a ação selecionada mudar
  useEffect(() => {
    setAcao(action.acao);
    setTempAcao(action.acao);
    setResponsavel(action.responsavel);
    setTempResponsavel(action.responsavel);
    setDataInicio(action.dataInicio);
    setTempDataInicio(action.dataInicio);
    setPrazo(action.prazo);
    setTempPrazo(action.prazo);
    setComo(action.como);
    setTempComo(action.como);
    setStatus(action.status);
    setProgresso(action.progresso);

    setIsEditingAcao(false);
    setIsEditingResponsavel(false);
    setIsEditingDataInicio(false);
    setIsEditingPrazo(false);
    setIsEditingComo(false);
  }, [action]);

  // Salvar Ação / Título
  const handleSaveAcao = () => {
    const trimmed = tempAcao.trim() || acao;
    setAcao(trimmed);
    setIsEditingAcao(false);
    onUpdateAction({
      ...action,
      acao: trimmed,
      responsavel,
      dataInicio,
      prazo,
      como,
      status,
      progresso
    });
  };

  // Salvar Responsável
  const handleSaveResponsavel = () => {
    const trimmed = tempResponsavel.trim() || responsavel;
    setResponsavel(trimmed);
    setIsEditingResponsavel(false);
    onUpdateAction({
      ...action,
      acao,
      responsavel: trimmed,
      dataInicio,
      prazo,
      como,
      status,
      progresso
    });
  };

  // Salvar Data de Início
  const handleSaveDataInicio = () => {
    const trimmed = tempDataInicio.trim() || 'A definir';
    setDataInicio(trimmed);
    setIsEditingDataInicio(false);
    onUpdateAction({
      ...action,
      acao,
      responsavel,
      dataInicio: trimmed,
      prazo,
      como,
      status,
      progresso
    });
  };

  // Salvar Prazo (Quando)
  const handleSavePrazo = () => {
    const trimmed = tempPrazo.trim() || 'A definir';
    setPrazo(trimmed);
    setIsEditingPrazo(false);
    onUpdateAction({
      ...action,
      acao,
      responsavel,
      dataInicio,
      prazo: trimmed,
      como,
      status,
      progresso
    });
  };

  // Salvar Como (Detalhamento Operacional)
  const handleSaveComo = () => {
    const trimmed = tempComo.trim();
    setComo(trimmed);
    setIsEditingComo(false);
    onUpdateAction({
      ...action,
      acao,
      responsavel,
      dataInicio,
      prazo,
      como: trimmed,
      status,
      progresso
    });
  };

  // Atualização rápida de status
  const handleStatusChange = (newStatus: ProjectAction['status']) => {
    setStatus(newStatus);
    let newProg = progresso;
    if (newStatus === 'Finalizado' || newStatus === 'Sistêmico') {
      newProg = 100;
    } else if (newStatus === 'Não iniciado') {
      newProg = 0;
    } else if (newProg === 0 || newProg === 100) {
      newProg = 50;
    }
    setProgresso(newProg);

    onUpdateAction({
      ...action,
      acao,
      responsavel,
      dataInicio,
      prazo,
      como,
      status: newStatus,
      progresso: newProg
    });
  };

  // Atualização de progresso
  const handleProgressChange = (newVal: number) => {
    setProgresso(newVal);
    let newStat = status;
    if (newVal === 100) {
      newStat = 'Finalizado';
    } else if (newVal === 0) {
      newStat = 'Não iniciado';
    } else {
      newStat = 'Em andamento';
    }
    setStatus(newStat);

    onUpdateAction({
      ...action,
      acao,
      responsavel,
      dataInicio,
      prazo,
      como,
      progresso: newVal,
      status: newStat
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto no-print">
      <div 
        className="bg-white rounded-2xl w-[95%] sm:w-[75%] max-w-[75vw] shadow-2xl border border-slate-200 overflow-hidden my-8 transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="bg-[#113269] text-white px-6 py-4.5 flex items-center justify-between border-b border-blue-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/30 text-blue-300 flex items-center justify-center text-sm border border-blue-400/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {action.pilar}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-slate-800"
            title="Fechar Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Categoria / Etapa do Pilar (Invertido com cabeçalho) */}
          <div>
            <div className="text-sm font-bold text-blue-900 bg-blue-50/70 p-3 rounded-xl border border-blue-100 flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>{action.pilarCategoria || action.pilar}</span>
            </div>
          </div>

          {/* 1. AÇÃO - COM BOTÃO EDITAR */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Ação
              </span>
              {!isEditingAcao ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingAcao(true);
                    setTempAcao(acao);
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold px-2 py-0.5 rounded hover:bg-blue-50 transition"
                  title="Editar nome da ação"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editar</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveAcao}
                    className="text-xs text-emerald-600 hover:text-emerald-800 font-bold px-2 py-0.5 rounded hover:bg-emerald-50 transition flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Salvar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingAcao(false);
                      setTempAcao(acao);
                    }}
                    className="text-xs text-slate-500 hover:text-slate-700 px-1.5 py-0.5 rounded hover:bg-slate-100 transition"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            {isEditingAcao ? (
              <div className="mt-1.5 space-y-1">
                <input
                  type="text"
                  value={tempAcao}
                  onChange={e => setTempAcao(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleSaveAcao();
                    if (e.key === 'Escape') setIsEditingAcao(false);
                  }}
                  autoFocus
                  className="w-full p-2.5 text-sm font-bold text-slate-900 bg-white border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Nome ou título da ação..."
                />
                <span className="text-[10px] text-slate-400">Pressione Enter para salvar ou Esc para cancelar</span>
              </div>
            ) : (
              <h4 className="text-base font-bold text-slate-900 mt-1 leading-snug">
                {acao}
              </h4>
            )}
          </div>

          {/* GRID: RESPONSÁVEL, DATA DE INÍCIO, QUANDO (PRAZO) - CADA UM COM BOTÃO EDITAR */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            {/* 2. Responsável */}
            <div className="bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">
                  Responsável
                </span>
                {!isEditingResponsavel ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingResponsavel(true);
                      setTempResponsavel(responsavel);
                    }}
                    className="text-[11px] text-blue-600 hover:text-blue-800 flex items-center gap-0.5 font-semibold hover:underline"
                    title="Editar responsável"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Editar</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleSaveResponsavel}
                      className="text-[11px] text-emerald-600 hover:text-emerald-800 font-bold"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingResponsavel(false)}
                      className="text-[11px] text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {isEditingResponsavel ? (
                <div className="mt-1.5">
                  <input
                    type="text"
                    list="team-members-list"
                    value={tempResponsavel}
                    onChange={e => setTempResponsavel(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSaveResponsavel();
                      if (e.key === 'Escape') setIsEditingResponsavel(false);
                    }}
                    autoFocus
                    placeholder="Nome do responsável"
                    className="w-full p-1.5 text-xs font-bold text-slate-800 bg-white border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <datalist id="team-members-list">
                    <option value="Raquel" />
                    <option value="Eduardo" />
                    <option value="Karina" />
                    <option value="Fabiano" />
                    <option value="Erno" />
                    <option value="Marcyo" />
                    <option value="Juliana" />
                    <option value="Larissa" />
                  </datalist>
                </div>
              ) : (
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {responsavel ? responsavel.charAt(0).toUpperCase() : '?'}
                  </div>
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {responsavel || 'A definir'}
                  </span>
                </div>
              )}
            </div>

            {/* 3. Início */}
            <div className="bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">
                  Início
                </span>
                {!isEditingDataInicio ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingDataInicio(true);
                      setTempDataInicio(dataInicio);
                    }}
                    className="text-[11px] text-blue-600 hover:text-blue-800 flex items-center gap-0.5 font-semibold hover:underline"
                    title="Editar data de início"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Editar</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleSaveDataInicio}
                      className="text-[11px] text-emerald-600 hover:text-emerald-800 font-bold"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingDataInicio(false)}
                      className="text-[11px] text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {isEditingDataInicio ? (
                <div className="mt-1.5">
                  <input
                    type="text"
                    value={tempDataInicio}
                    onChange={e => setTempDataInicio(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSaveDataInicio();
                      if (e.key === 'Escape') setIsEditingDataInicio(false);
                    }}
                    autoFocus
                    placeholder="ex: 23/09 ou 23/set"
                    className="w-full p-1.5 text-xs font-medium text-slate-800 bg-white border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-slate-800 tabular-nums">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{dataInicio || 'A definir'}</span>
                </div>
              )}
            </div>

            {/* 4. Prazo de Entrega */}
            <div className="bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">
                  Prazo de Entrega
                </span>
                {!isEditingPrazo ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingPrazo(true);
                      setTempPrazo(prazo);
                    }}
                    className="text-[11px] text-blue-600 hover:text-blue-800 flex items-center gap-0.5 font-semibold hover:underline"
                    title="Editar prazo de entrega"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Editar</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleSavePrazo}
                      className="text-[11px] text-emerald-600 hover:text-emerald-800 font-bold"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingPrazo(false)}
                      className="text-[11px] text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {isEditingPrazo ? (
                <div className="mt-1.5">
                  <input
                    type="text"
                    value={tempPrazo}
                    onChange={e => setTempPrazo(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSavePrazo();
                      if (e.key === 'Escape') setIsEditingPrazo(false);
                    }}
                    autoFocus
                    placeholder="ex: 08/10 ou Semanal"
                    className="w-full p-1.5 text-xs font-bold text-[#113269] bg-white border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between gap-1 mt-1.5 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#113269] tabular-nums">
                    <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{prazo || 'A definir'}</span>
                  </div>
                  {isOverdue && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-300 shadow-2xs">
                      <AlertTriangle className="w-2.5 h-2.5 text-rose-600 shrink-0" />
                      <span>Atrasado</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 5. COMO - COM BOTÃO EDITAR */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Como
                </span>
                {!isEditingComo ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingComo(true);
                      setTempComo(como);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold px-2 py-0.5 rounded hover:bg-blue-50 transition"
                    title="Editar detalhamento operacional"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editar</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveComo}
                      className="text-xs text-emerald-600 hover:text-emerald-800 font-bold px-2 py-0.5 rounded hover:bg-emerald-50 transition flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Salvar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingComo(false);
                        setTempComo(como);
                      }}
                      className="text-xs text-slate-500 hover:text-slate-700 px-1.5 py-0.5 rounded hover:bg-slate-100 transition"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {isEditingComo ? (
              <textarea
                value={tempComo}
                onChange={e => setTempComo(e.target.value)}
                rows={3}
                autoFocus
                placeholder="Descreva o detalhamento operacional (como executar esta ação)..."
                className="w-full p-2.5 rounded-xl bg-white border-2 border-blue-400 text-xs text-slate-800 leading-relaxed font-normal focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            ) : (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-wrap">
                {como || 'Sem detalhamento operacional adicional.'}
              </div>
            )}
          </div>

          {/* Atualização Rápida de Status (Minimalista) */}
          <div className="pt-2.5 border-t border-slate-200">
            <div className="flex items-center gap-2.5 bg-slate-50/90 px-3 py-2 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight shrink-0">
                Status:
              </span>
              <div className="inline-flex p-0.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                {(['Não iniciado', 'Em andamento', 'Finalizado', 'Sistêmico'] as const).map(st => {
                  let activeClass = 'bg-slate-500 text-white shadow-xs';
                  if (st === 'Finalizado') activeClass = 'bg-emerald-600 text-white shadow-xs';
                  else if (st === 'Em andamento') activeClass = 'bg-blue-600 text-white shadow-xs';
                  else if (st === 'Sistêmico') activeClass = 'bg-purple-600 text-white shadow-xs';

                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(st)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                        status === st
                          ? activeClass
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {st === 'Finalizado' ? 'Concluído' : st}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div>
            {onDeleteAction && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Tem certeza que deseja remover esta ação do painel?')) {
                    onDeleteAction(action.id);
                    onClose();
                  }
                }}
                className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remover Ação</span>
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-[#113269] bg-[#FFCC00] hover:bg-[#e6b800] rounded-lg shadow-sm transition border border-amber-300/50"
          >
            Concluir & Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
