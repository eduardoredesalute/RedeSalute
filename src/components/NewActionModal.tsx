import React, { useState } from 'react';
import { X, Plus, Building2, Calendar, Clock } from 'lucide-react';
import { ProjectAction } from '../data/projectsData';
import { 
  dateToIso, 
  isoToDisplayDate, 
  getTodayFormatted, 
  getAddDaysFormatted 
} from '../utils/dateUtils';

interface NewActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAction: (newAction: ProjectAction) => void;
  pilares: string[];
  existingActions?: ProjectAction[];
}

export const NewActionModal: React.FC<NewActionModalProps> = ({
  isOpen,
  onClose,
  onAddAction,
  pilares,
  existingActions
}) => {
  if (!isOpen) return null;

  const defaultPilar = pilares[0] || 'CLÍNICAS CONCORRENTES - BUSCA ATIVA PELA INTERNET OU IN LOCO';
  const defaultCategory = existingActions?.find(
    a => a.pilar.trim().toLowerCase() === defaultPilar.trim().toLowerCase()
  )?.pilarCategoria || 'Estratégico';

  const [pilar, setPilar] = useState<string>(defaultPilar);
  const [categoria, setCategoria] = useState<string>(defaultCategory);
  const [acao, setAcao] = useState<string>('');
  const [responsavel, setResponsavel] = useState<string>('Raquel');
  const [dataInicio, setDataInicio] = useState<string>('');
  const [prazo, setPrazo] = useState<string>('');
  const [unidadeOuParceiro, setUnidadeOuParceiro] = useState<string>('');
  const [como, setComo] = useState<string>('');
  const [status, setStatus] = useState<ProjectAction['status']>('Não iniciado');
  const [progresso, setProgresso] = useState<number>(0);

  const handlePilarChange = (newPilar: string) => {
    setPilar(newPilar);
    if (existingActions) {
      const match = existingActions.find(
        a => a.pilar.trim().toLowerCase() === newPilar.trim().toLowerCase()
      );
      if (match?.pilarCategoria) {
        setCategoria(match.pilarCategoria);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acao.trim()) {
      alert('Por favor, informe a descrição da Ação.');
      return;
    }

    const newAction: ProjectAction = {
      id: 'act-' + Date.now(),
      pilar,
      pilarCategoria: categoria || 'Estratégico',
      acao: acao.trim(),
      responsavel,
      dataInicio: dataInicio.trim() || 'A definir',
      prazo: prazo.trim() || 'A definir',
      como: como.trim() || 'Instruções operacionais a detalhar.',
      status,
      progresso: status === 'Finalizado' ? 100 : progresso,
      unidadeOuParceiro: unidadeOuParceiro.trim() || undefined
    };

    onAddAction(newAction);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto no-print">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="bg-[#113269] text-white px-6 py-4 flex items-center justify-between border-b border-blue-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-300 flex items-center justify-center text-sm border border-blue-400/20">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Cadastrar Nova Ação</h3>
              <p className="text-xs text-slate-300">Adicione uma nova tarefa vinculada aos pilares da Salute</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          
          {/* Pilar */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Pilar Estratégico *
            </label>
            <select
              value={pilar}
              onChange={e => handlePilarChange(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
              required
            >
              {pilares.map(p => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Categoria do Pilar */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Categoria / Macro-área
            </label>
            <input
              type="text"
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
              placeholder="Ex: Inteligência de Mercado, Canais Digitais, Órgãos de Classe"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          {/* Nome da Ação */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Ação *
            </label>
            <textarea
              value={acao}
              onChange={e => setAcao(e.target.value)}
              placeholder="Descreva com clareza o objetivo da ação..."
              rows={2}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
              required
            />
          </div>

          {/* Grid: Responsável, Início, Prazo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Responsável *
              </label>
              <select
                value={responsavel}
                onChange={e => setResponsavel(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
              >
                <option value="Eduardo">Eduardo</option>
                <option value="Fabiano">Fabiano</option>
                <option value="Juliana">Juliana</option>
                <option value="Larissa">Larissa</option>
                <option value="Raquel">Raquel</option>
                <option value="Karina">Karina</option>
                <option value="Erno">Erno</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Início
              </label>
              <input
                type="date"
                value={dateToIso(dataInicio)}
                onChange={e => {
                  if (e.target.value) setDataInicio(isoToDisplayDate(e.target.value));
                }}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-800 font-sans tabular-nums text-xs font-semibold cursor-pointer"
              />
              <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setDataInicio('Semanal')}
                  className={`px-1.5 py-0.5 text-[10px] font-bold rounded border transition ${
                    dataInicio.toLowerCase() === 'semanal'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                      : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                  }`}
                >
                  Semanal
                </button>
                <button
                  type="button"
                  onClick={() => setDataInicio('Mensal')}
                  className={`px-1.5 py-0.5 text-[10px] font-bold rounded border transition ${
                    dataInicio.toLowerCase() === 'mensal'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                  }`}
                >
                  Mensal
                </button>
                <button
                  type="button"
                  onClick={() => setDataInicio(getTodayFormatted())}
                  className="px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200 rounded hover:bg-blue-50 hover:text-blue-700 transition"
                >
                  Hoje
                </button>
              </div>
              {dataInicio && (
                <p className="text-[10px] text-blue-700 font-bold mt-1">
                  Definido: {dataInicio}
                </p>
              )}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Prazo de Entrega
              </label>
              <input
                type="date"
                value={dateToIso(prazo)}
                onChange={e => {
                  if (e.target.value) setPrazo(isoToDisplayDate(e.target.value));
                }}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-800 font-sans tabular-nums text-xs font-semibold cursor-pointer"
              />
              <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setPrazo('Semanal')}
                  className={`px-1.5 py-0.5 text-[10px] font-bold rounded border transition ${
                    prazo.toLowerCase() === 'semanal'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                      : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                  }`}
                >
                  Semanal
                </button>
                <button
                  type="button"
                  onClick={() => setPrazo('Mensal')}
                  className={`px-1.5 py-0.5 text-[10px] font-bold rounded border transition ${
                    prazo.toLowerCase() === 'mensal'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                  }`}
                >
                  Mensal
                </button>
                <button
                  type="button"
                  onClick={() => setPrazo(getTodayFormatted())}
                  className="px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200 rounded hover:bg-blue-50 hover:text-blue-700 transition"
                >
                  Hoje
                </button>
                <button
                  type="button"
                  onClick={() => setPrazo(getAddDaysFormatted(7))}
                  className="px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200 rounded hover:bg-blue-50 hover:text-blue-700 transition"
                >
                  +7d
                </button>
              </div>
              {prazo && (
                <p className="text-[10px] text-blue-700 font-bold mt-1">
                  Definido: {prazo}
                </p>
              )}
            </div>
          </div>


          {/* Unidade ou Parceiro */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Unidade / Parceiro Envolvido (Opcional)
            </label>
            <input
              type="text"
              value={unidadeOuParceiro}
              onChange={e => setUnidadeOuParceiro(e.target.value)}
              placeholder="Ex: Sinaxys, AMRIGS, Gravataí, Hospital São Lucas"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          {/* Como */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Como
            </label>
            <textarea
              value={como}
              onChange={e => setComo(e.target.value)}
              placeholder="Descreva etapas, contatos, valores, prazos e orientações operacionais..."
              rows={3}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          {/* Status & Progresso Inicial */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Status Inicial
              </label>
              <select
                value={status}
                onChange={e => {
                  const s = e.target.value as ProjectAction['status'];
                  setStatus(s);
                  if (s === 'Finalizado' || s === 'Sistêmico') setProgresso(100);
                  else if (s === 'Não iniciado') setProgresso(0);
                  else if (progresso === 0) setProgresso(25);
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
              >
                <option value="Não iniciado">Não Iniciado</option>
                <option value="Em andamento">Em Andamento</option>
                <option value="Finalizado">Concluído</option>
                <option value="Sistêmico">Sistêmico</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Progresso Inicial:</span>
                <span className="font-bold text-[#113269] tabular-nums">{progresso}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={progresso}
                onChange={e => setProgresso(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
              />
            </div>
          </div>

          {/* Ações do Formulário */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-[#113269] bg-[#FFCC00] hover:bg-[#e6b800] rounded-lg shadow-sm transition border border-amber-300/50"
            >
              Salvar Ação
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
