import React, { useState } from 'react';
import { X, Layers, Plus, Calendar, Clock, CheckCircle2, ChevronRight, User } from 'lucide-react';
import { ProjectAction } from '../data/projectsData';
import { 
  dateToIso, 
  isoToDisplayDate, 
  getTodayFormatted, 
  getAddDaysFormatted 
} from '../utils/dateUtils';

interface NewPillarModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceTitle: string;
  existingPilares?: string[];
  existingResponsaveis?: string[];
  onCreatePillar: (action: ProjectAction) => void;
}

const DEFAULT_CATEGORIES = [
  'GESTÃO ESTRATÉGICA',
  'INTELIGÊNCIA DE MERCADO',
  'FORMAÇÃO & RESIDÊNCIAS',
  'OPERAÇÕES',
  'MARKETING & COMUNICAÇÃO',
  'FINANCEIRO & CONTROLADORIA',
  'TECNOLOGIA & SISTEMAS'
];

export const NewPillarModal: React.FC<NewPillarModalProps> = ({
  isOpen,
  onClose,
  workspaceTitle,
  existingPilares = [],
  existingResponsaveis = ['Raquel', 'Eduardo'],
  onCreatePillar
}) => {
  const [pilarNome, setPilarNome] = useState('');
  const [categoria, setCategoria] = useState(DEFAULT_CATEGORIES[0]);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  // Primeira ação vinculada ao pilar
  const [acaoTitulo, setAcaoTitulo] = useState('Estruturação inicial do pilar e plano de ação');
  const [responsavel, setResponsavel] = useState(existingResponsaveis[0] || 'Raquel');
  const [isCustomResp, setIsCustomResp] = useState(false);
  const [customResp, setCustomResp] = useState('');
  const [dataInicio, setDataInicio] = useState(getTodayFormatted());
  const [prazo, setPrazo] = useState(getAddDaysFormatted(15));
  const [como, setComo] = useState('Definir diretrizes, cronograma de entregas e metas do pilar estratégico.');
  const [status, setStatus] = useState<ProjectAction['status']>('Não iniciado');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPilar = pilarNome.trim().toUpperCase();
    if (!finalPilar) {
      alert('Por favor, informe o nome do Pilar Estratégico.');
      return;
    }

    const finalCategory = isCustomCategory ? customCategory.trim().toUpperCase() : categoria;
    const finalResp = isCustomResp ? (customResp.trim() || 'Raquel') : responsavel;
    const finalAcao = acaoTitulo.trim() || 'Estruturação inicial do pilar';

    const newAction: ProjectAction = {
      id: `act-${Date.now()}`,
      pilar: finalPilar,
      pilarCategoria: finalCategory || 'GESTÃO ESTRATÉGICA',
      acao: finalAcao,
      responsavel: finalResp,
      dataInicio: dataInicio || getTodayFormatted(),
      prazo: prazo || 'Semanal',
      como: como.trim() || 'Definição das etapas de execução do pilar estratégico.',
      status: status,
      progresso: status === 'Finalizado' || status === 'Sistêmico' ? 100 : status === 'Em andamento' ? 25 : 0,
      prioridade: 'Alta',
      unidadeOuParceiro: 'Rede Salute'
    };

    onCreatePillar(newAction);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="bg-[#113269] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#0d2752]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-[#FFCC00]">
              <Layers className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-wider text-blue-200 uppercase flex items-center gap-1">
                <span>{workspaceTitle}</span>
                <ChevronRight className="w-3 h-3 text-blue-300" />
                <span>Pilar Estratégico</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Criar Novo Pilar Estratégico
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Seção 1: Dados do Pilar */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-[#113269]">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Identificação do Pilar</span>
            </div>

            {/* Nome do Pilar */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nome do Pilar Estratégico <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={pilarNome}
                onChange={e => setPilarNome(e.target.value)}
                placeholder="Ex: EXPANSÃO REGIONAL E NOVAS UNIDADES"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-semibold focus:ring-2 focus:ring-[#113269] focus:border-transparent outline-none uppercase"
                autoFocus
                required
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Este pilar agrupará as ações correspondentes no painel.
              </p>
            </div>

            {/* Categoria / Macro-Área */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Macro-Área / Categoria
              </label>
              {!isCustomCategory ? (
                <div className="flex gap-2">
                  <select
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#113269]"
                  >
                    {DEFAULT_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomCategory(true);
                      setCustomCategory('');
                    }}
                    className="px-2.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 whitespace-nowrap"
                  >
                    + Outra
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customCategory}
                    onChange={e => setCustomCategory(e.target.value)}
                    placeholder="Digite a nova macro-área..."
                    className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold uppercase outline-none focus:ring-2 focus:ring-[#113269]"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCustomCategory(false)}
                    className="px-2.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Seção 2: Primeira Ação Inicial do Pilar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#113269]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Primeira Ação deste Pilar (#1)</span>
              </div>
              <span className="text-[11px] text-slate-400">Inserida e renumerada automaticamente</span>
            </div>

            {/* Título da Ação */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Título da Ação <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={acaoTitulo}
                onChange={e => setAcaoTitulo(e.target.value)}
                placeholder="Ex: Definir plano de ação e métricas do pilar"
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#113269]"
                required
              />
            </div>

            {/* Responsável e Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Responsável
                </label>
                {!isCustomResp ? (
                  <div className="flex gap-2">
                    <select
                      value={responsavel}
                      onChange={e => setResponsavel(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#113269]"
                    >
                      {existingResponsaveis.map(resp => (
                        <option key={resp} value={resp}>{resp}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomResp(true);
                        setCustomResp('');
                      }}
                      className="px-2.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
                    >
                      + Novo
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customResp}
                      onChange={e => setCustomResp(e.target.value)}
                      placeholder="Nome do responsável..."
                      className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#113269]"
                    />
                    <button
                      type="button"
                      onClick={() => setIsCustomResp(false)}
                      className="px-2.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Status Inicial
                </label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as ProjectAction['status'])}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#113269]"
                >
                  <option value="Não iniciado">Não iniciado</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Sistêmico">Sistêmico (Rotina)</option>
                  <option value="Finalizado">Concluído</option>
                </select>
              </div>
            </div>

            {/* Datas com Calendário e Botões Rápidos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Início
                </label>
                <div className="relative flex items-center">
                  <input
                    type="date"
                    value={dateToIso(dataInicio)}
                    onChange={e => setDataInicio(isoToDisplayDate(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#113269]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Prazo
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setPrazo('Semanal')}
                      className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                        prazo === 'Semanal' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                      }`}
                    >
                      Semanal
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrazo('Mensal')}
                      className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                        prazo === 'Mensal' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                      }`}
                    >
                      Mensal
                    </button>
                  </div>
                </div>
                <input
                  type="date"
                  value={dateToIso(prazo)}
                  onChange={e => setPrazo(isoToDisplayDate(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#113269]"
                />
              </div>
            </div>

            {/* Detalhes Operacionais */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Como (Detalhamento)
              </label>
              <textarea
                value={como}
                onChange={e => setComo(e.target.value)}
                rows={2}
                placeholder="Descreva como esta primeira ação será executada..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#113269]"
              />
            </div>
          </div>

          {/* Botões do Rodapé */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#113269] hover:bg-[#0c244d] rounded-lg shadow-sm transition flex items-center gap-2 active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Criar Pilar Estratégico</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
