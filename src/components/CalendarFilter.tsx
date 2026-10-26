import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X, CalendarDays, Check } from 'lucide-react';
import { ProjectAction } from '../data/projectsData';

interface CalendarFilterProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  projects: ProjectAction[];
}

type MonthKey = 'jan' | 'fev' | 'mar' | 'abr' | 'mai' | 'jun' | 'jul' | 'ago' | 'set' | 'out' | 'nov' | 'dez';

const MONTHS: { key: MonthKey; name: string; days: number; startWeekday: number; numStr: string }[] = [
  { key: 'jan', name: 'Janeiro 2026', days: 31, startWeekday: 4, numStr: '01' },
  { key: 'fev', name: 'Fevereiro 2026', days: 28, startWeekday: 0, numStr: '02' },
  { key: 'mar', name: 'Março 2026', days: 31, startWeekday: 0, numStr: '03' },
  { key: 'abr', name: 'Abril 2026', days: 30, startWeekday: 3, numStr: '04' },
  { key: 'mai', name: 'Maio 2026', days: 31, startWeekday: 5, numStr: '05' },
  { key: 'jun', name: 'Junho 2026', days: 30, startWeekday: 1, numStr: '06' },
  { key: 'jul', name: 'Julho 2026', days: 31, startWeekday: 3, numStr: '07' },
  { key: 'ago', name: 'Agosto 2026', days: 31, startWeekday: 6, numStr: '08' },
  { key: 'set', name: 'Setembro 2026', days: 30, startWeekday: 2, numStr: '09' },
  { key: 'out', name: 'Outubro 2026', days: 31, startWeekday: 4, numStr: '10' },
  { key: 'nov', name: 'Novembro 2026', days: 30, startWeekday: 0, numStr: '11' },
  { key: 'dez', name: 'Dezembro 2026', days: 31, startWeekday: 2, numStr: '12' },
];

export const CalendarFilter: React.FC<CalendarFilterProps> = ({
  selectedDate,
  onDateChange,
  projects
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(() => {
    // Default to July (6) or October (9) based on project
    return 6; // Julho
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const monthInfo = MONTHS[currentMonthIndex];

  // Mapa de ações por dia do mês
  const actionsByDay = useMemo(() => {
    const map: Record<number, ProjectAction[]> = {};

    projects.forEach(p => {
      const checkAndAdd = (dateStr?: string) => {
        if (!dateStr) return;
        const s = dateStr.toLowerCase().trim();
        const hasMonth =
          s.includes(`/${monthInfo.key}`) ||
          s.includes(`/${monthInfo.numStr}/`) ||
          s.includes(`/${monthInfo.numStr}`) ||
          s.endsWith(`/${monthInfo.numStr}`);
        if (hasMonth) {
          const dayStr = s.split('/')[0].trim();
          const dayNum = parseInt(dayStr, 10);
          if (!isNaN(dayNum) && dayNum >= 1 && dayNum <= 31) {
            if (!map[dayNum]) map[dayNum] = [];
            if (!map[dayNum].includes(p)) map[dayNum].push(p);
          }
        }
      };
      checkAndAdd(p.dataInicio);
      checkAndAdd(p.prazo);
    });

    return map;
  }, [projects, monthInfo]);

  // Contagem para o filtro atual
  const activeCount = useMemo(() => {
    if (selectedDate === 'todos') return 0;
    const q = selectedDate.toLowerCase().trim();
    return projects.filter(p => {
      if (q === 'sem_data') {
        return (
          (p.dataInicio && p.dataInicio.toLowerCase().includes('definir')) ||
          (p.prazo && p.prazo.toLowerCase().includes('definir'))
        );
      }
      return (
        (p.dataInicio && p.dataInicio.toLowerCase().includes(q)) ||
        (p.prazo && p.prazo.toLowerCase().includes(q))
      );
    }).length;
  }, [selectedDate, projects]);

  const formatButtonLabel = () => {
    if (selectedDate === 'todos') {
      return 'Calendário';
    }
    const foundMonth = MONTHS.find(m => m.key === selectedDate || m.numStr === selectedDate);
    if (foundMonth) return `${foundMonth.name.split(' ')[0]} (Mês)`;
    if (selectedDate === 'sem_data') return 'A definir';
    return selectedDate;
  };

  const handlePrevMonth = () => {
    setCurrentMonthIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(prev => Math.min(MONTHS.length - 1, prev + 1));
  };

  const handleSelectDay = (day: number) => {
    const formatted = `${day < 10 ? '0' + day : day}/${monthInfo.numStr}`;
    onDateChange(formatted);
    setIsOpen(false);
  };

  const handleSelectFullMonth = (mKey: MonthKey) => {
    const idx = MONTHS.findIndex(m => m.key === mKey);
    if (idx !== -1) {
      setCurrentMonthIndex(idx);
      onDateChange(mKey);
      setIsOpen(false);
    }
  };

  const isSelected = selectedDate !== 'todos';

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Botão de Disparo do Calendário */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 border shadow-xs ${
          isSelected
            ? 'bg-[#FFCC00] text-[#113269] border-amber-400 ring-2 ring-amber-300/60'
            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
        }`}
        title="Filtrar ações por data ou calendário"
      >
        <Calendar className={`w-4 h-4 ${isSelected ? 'text-[#113269]' : 'text-[#113269]'}`} />
        <span className="whitespace-nowrap font-sans">{formatButtonLabel()}</span>
        {isSelected && (
          <span className="bg-[#113269] text-white text-[10px] px-1.5 py-0.2 rounded-full tabular-nums">
            {activeCount}
          </span>
        )}
      </button>

      {/* Popover com Calendário Interativo */}
      {isOpen && (
        <div className="absolute right-0 sm:right-auto sm:left-0 mt-2 z-50 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header do Popover */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#113269] uppercase tracking-wider font-sans">
              <CalendarDays className="w-4 h-4 text-[#113269]" />
              <span>Seletor de Data</span>
            </div>
            {isSelected && (
              <button
                type="button"
                onClick={() => {
                  onDateChange('todos');
                  setIsOpen(false);
                }}
                className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                <span>Limpar</span>
              </button>
            )}
          </div>

          {/* Atalhos Rápidos por Mês */}
          <div className="py-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Filtrar por Mês Completo
            </span>
            <div className="grid grid-cols-4 gap-1">
              <button
                type="button"
                onClick={() => handleSelectFullMonth('jun')}
                className={`py-1 px-1.5 rounded-md text-[11px] font-bold transition text-center ${
                  selectedDate === 'jun'
                    ? 'bg-[#FFCC00] text-[#113269] border border-amber-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Junho
              </button>
              <button
                type="button"
                onClick={() => handleSelectFullMonth('jul')}
                className={`py-1 px-1.5 rounded-md text-[11px] font-bold transition text-center ${
                  selectedDate === 'jul'
                    ? 'bg-[#FFCC00] text-[#113269] border border-amber-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Julho
              </button>
              <button
                type="button"
                onClick={() => handleSelectFullMonth('ago')}
                className={`py-1 px-1.5 rounded-md text-[11px] font-bold transition text-center ${
                  selectedDate === 'ago'
                    ? 'bg-[#FFCC00] text-[#113269] border border-amber-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Agosto
              </button>
              <button
                type="button"
                onClick={() => handleSelectFullMonth('out')}
                className={`py-1 px-1.5 rounded-md text-[11px] font-bold transition text-center ${
                  selectedDate === 'out'
                    ? 'bg-[#FFCC00] text-[#113269] border border-amber-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Outubro
              </button>
            </div>
          </div>

          {/* Navegador do Mês */}
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handlePrevMonth}
              disabled={currentMonthIndex === 0}
              className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-700"
              title="Mês anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-[#113269] font-sans">
              {monthInfo.name}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              disabled={currentMonthIndex === MONTHS.length - 1}
              className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-700"
              title="Próximo mês"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Grid de Dias da Semana */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 py-1 uppercase">
            <span>Dom</span>
            <span>Seg</span>
            <span>Ter</span>
            <span>Qua</span>
            <span>Qui</span>
            <span>Sex</span>
            <span>Sáb</span>
          </div>

          {/* Grid de Dias do Mês */}
          <div className="grid grid-cols-7 gap-1 text-center pt-1 pb-2">
            {/* Espaços vazios antes do 1º dia */}
            {Array.from({ length: monthInfo.startWeekday }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-7" />
            ))}

            {/* Dias do mês */}
            {Array.from({ length: monthInfo.days }).map((_, idx) => {
              const day = idx + 1;
              const dayFormatted = day < 10 ? '0' + day : day;
              const dateStringNum = `${dayFormatted}/${monthInfo.numStr}`;
              const dateStringKey = `${dayFormatted}/${monthInfo.key}`;
              const isSelectedDay = selectedDate === dateStringNum || selectedDate === dateStringKey;
              const actionsOnThisDay = actionsByDay[day] || [];
              const hasActions = actionsOnThisDay.length > 0;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`relative h-7 rounded-md text-xs font-semibold flex items-center justify-center transition group ${
                    isSelectedDay
                      ? 'bg-[#FFCC00] text-[#113269] font-extrabold shadow-xs ring-1 ring-amber-400'
                      : hasActions
                      ? 'bg-blue-50 text-[#113269] font-bold hover:bg-amber-100'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                  title={
                    hasActions
                      ? `${dateStringNum}: ${actionsOnThisDay.length} ação(ões)`
                      : dateStringNum
                  }
                >
                  <span className="tabular-nums font-sans">{day}</span>
                  {hasActions && !isSelectedDay && (
                    <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#113269]" />
                  )}
                  {hasActions && isSelectedDay && (
                    <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#113269]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Rodapé com Ações Extras */}
          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => {
                onDateChange('sem_data');
                setIsOpen(false);
              }}
              className={`text-[11px] font-semibold px-2 py-1 rounded transition ${
                selectedDate === 'sem_data'
                  ? 'bg-[#FFCC00] text-[#113269] font-bold'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              Sem data / A definir
            </button>

            <button
              type="button"
              onClick={() => {
                onDateChange('todos');
                setIsOpen(false);
              }}
              className="text-[11px] font-bold text-[#113269] hover:underline"
            >
              Ver todas
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
