import React from 'react';
import { Search, X } from 'lucide-react';
import { ProjectAction } from '../data/projectsData';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter?: string;
  onStatusChange?: (status: string) => void;
  selectedPilar?: string;
  onPilarChange?: (pilar: string) => void;
  selectedResp?: string;
  onRespChange?: (resp: string) => void;
  selectedDate?: string;
  onDateChange?: (date: string) => void;
  allPilares?: string[];
  allResponsaveis?: string[];
  totalFiltered?: number;
  totalProjects?: number;
  onResetFilters: () => void;
  projects: ProjectAction[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter = 'todos',
  selectedPilar = 'todos',
  selectedResp = 'todos',
  selectedDate = 'todos',
  onResetFilters,
  projects
}) => {
  const isFiltered =
    searchQuery.trim() !== '' ||
    statusFilter !== 'todos' ||
    selectedPilar !== 'todos' ||
    selectedResp !== 'todos' ||
    selectedDate !== 'todos';

  const total = projects.length;
  const totalProgressSum = projects.reduce((acc, p) => acc + (p.progresso || 0), 0);
  const averageProgress = total > 0 ? Math.round(totalProgressSum / total) : 0;

  return (
    <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200/80 shadow-xs no-print">
      
      {/* Linha Única: Caixa de Busca e Progresso Geral do Planejamento */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        
        {/* Input de Busca */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Buscar por ação, pilar, responsável, detalhes (ex: Sinaxys, SIMERS, CREMERS, Alvorada)..."
            className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#113269] focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Botão de Limpar Busca */}
        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="px-2.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition flex items-center gap-1 shrink-0 self-start md:self-auto"
            title="Limpar filtros aplicados"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Limpar</span>
          </button>
        )}

        {/* Progresso Geral do Planejamento na mesma linha */}
        <div className="w-full md:w-80 lg:w-96 shrink-0 bg-slate-50/80 px-3.5 py-2 rounded-lg border border-slate-200 flex flex-col justify-center">
          <div className="flex items-center justify-between text-[11px] mb-1 font-medium">
            <span className="font-bold text-[#113269] truncate">Progresso Geral do Planejamento</span>
            <span className="font-extrabold text-[#113269] tabular-nums text-xs ml-2 shrink-0">
              {averageProgress}%
            </span>
          </div>
          <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-[#113269] to-emerald-500 transition-all duration-500"
              style={{ width: `${averageProgress}%` }}
            />
          </div>
        </div>

      </div>

    </div>
  );
};
