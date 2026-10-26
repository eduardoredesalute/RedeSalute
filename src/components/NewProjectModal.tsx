import React, { useState } from 'react';
import { X, FolderPlus, Building2, DollarSign, Activity, Sparkles, Check, Layers } from 'lucide-react';
import { ProjectWorkspace, ProjectAction } from '../data/projectsData';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWorkspace: (workspace: ProjectWorkspace) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateWorkspace
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Gestão Estratégica');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState<'Building2' | 'DollarSign' | 'Activity' | 'FolderKanban' | 'Stethoscope'>('Building2');
  const [themeColor, setThemeColor] = useState('#113269');
  
  // Ação inicial para não iniciar vazio
  const [initialPilar, setInitialPilar] = useState('PLANEJAMENTO & DEFINIÇÃO DE METAS');
  const [initialAcao, setInitialAcao] = useState('');
  const [initialResp, setInitialResp] = useState('Raquel');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newId = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `projeto-${Date.now()}`;

    const initialActions: ProjectAction[] = [];
    if (initialAcao.trim()) {
      initialActions.push({
        id: `act-${Date.now()}`,
        pilar: initialPilar.toUpperCase().trim(),
        pilarCategoria: category,
        acao: initialAcao.trim(),
        responsavel: initialResp,
        dataInicio: '01/out',
        prazo: '31/out',
        como: 'Ação inicial de implantação e estruturação do painel operacional.',
        status: 'Em andamento',
        progresso: 25,
        prioridade: 'Alta',
        unidadeOuParceiro: 'Rede Salute'
      });
    }

    const newWorkspace: ProjectWorkspace = {
      id: newId,
      title: title.trim(),
      subtitle: subtitle.trim() || `Painel de Gestão e Acompanhamento - ${title.trim()}`,
      category: category.trim() || 'Gestão Estratégica',
      description: description.trim() || `Painel operacional de monitoramento de ações, pilares e cronogramas para ${title.trim()}.`,
      badge: category.trim() || 'Operações',
      iconName,
      themeColor,
      actions: initialActions,
      updatedAt: 'Outubro 2026',
      createdAt: new Date().toISOString()
    };

    onCreateWorkspace(newWorkspace);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        
        {/* Header do Modal */}
        <div className="bg-[#113269] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FFCC00]">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Criar Novo Painel de Projetos</h2>
              <p className="text-xs text-blue-200">
                Configure um novo painel com acompanhamento de ações, pilares e cronogramas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Nome do Projeto */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nome do Projeto / Painel *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: RECEITAS INTERNAS, EXAMES, TELEMEDICINA..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full text-sm font-semibold px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#113269] focus:bg-white"
            />
          </div>

          {/* Subtítulo & Categoria */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Subtítulo / Foco
              </label>
              <input
                type="text"
                placeholder="Ex: Gestão de Faturamento & Convênios"
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#113269]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Categoria / Área
              </label>
              <input
                type="text"
                placeholder="Ex: Finanças, Diagnósticos, Operações"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#113269]"
              />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Descrição do Painel
            </label>
            <textarea
              rows={2}
              placeholder="Descreva o objetivo geral e as metas operacionais deste painel..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#113269]"
            />
          </div>

          {/* Ícone & Cor Temática */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Ícone Representativo
              </label>
              <div className="flex items-center gap-2">
                {[
                  { id: 'Building2', label: 'Unidades', icon: Building2 },
                  { id: 'DollarSign', label: 'Receitas', icon: DollarSign },
                  { id: 'Activity', label: 'Exames', icon: Activity },
                  { id: 'FolderKanban', label: 'Geral', icon: Layers }
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setIconName(item.id as any)}
                      className={`p-2 rounded-lg border text-xs flex items-center justify-center transition ${
                        iconName === item.id
                          ? 'border-[#113269] bg-[#113269] text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                      title={item.label}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Cor Temática
              </label>
              <div className="flex items-center gap-2">
                {[
                  { color: '#113269', label: 'Azul Salute' },
                  { color: '#0c663b', label: 'Verde Saúde' },
                  { color: '#0369a1', label: 'Azul Claro' },
                  { color: '#7c2d12', label: 'Terracota' },
                  { color: '#4c1d95', label: 'Índigo' }
                ].map(c => (
                  <button
                    key={c.color}
                    type="button"
                    onClick={() => setThemeColor(c.color)}
                    className="w-7 h-7 rounded-full border-2 transition flex items-center justify-center"
                    style={{
                      backgroundColor: c.color,
                      borderColor: themeColor === c.color ? '#FFCC00' : 'transparent'
                    }}
                    title={c.label}
                  >
                    {themeColor === c.color && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Primeira Ação Inicial */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#113269] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Primeira Ação Inicial (Opcional)</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Nome do Pilar Estratégico
              </label>
              <input
                type="text"
                placeholder="Ex: INFRAESTRUTURA & EQUIPAMENTOS"
                value={initialPilar}
                onChange={e => setInitialPilar(e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-md uppercase"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Ação / O que fazer
                </label>
                <input
                  type="text"
                  placeholder="Ex: Realizar levantamento de demandas e cronograma"
                  value={initialAcao}
                  onChange={e => setInitialAcao(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Responsável
                </label>
                <select
                  value={initialResp}
                  onChange={e => setInitialResp(e.target.value)}
                  className="w-full text-xs px-2 py-1.5 bg-white border border-slate-300 rounded-md font-semibold text-slate-700"
                >
                  <option value="Raquel">Raquel</option>
                  <option value="Eduardo">Eduardo</option>
                  <option value="Karina">Karina</option>
                  <option value="Fabiano">Fabiano</option>
                  <option value="Erno">Erno</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-[#FFCC00] text-[#113269] hover:bg-amber-400 rounded-lg transition shadow-xs flex items-center gap-1.5 border border-amber-300"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Criar Painel</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
