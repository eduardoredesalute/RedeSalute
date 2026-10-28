/**
 * Utilitários para parsing e verificação de prazos e atrasos de ações
 */

// Mapeamento de meses abreviados em português
const MONTH_MAP: Record<string, number> = {
  jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
  jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11
};

export const parsePrazoDate = (prazoStr?: string): Date | null => {
  if (!prazoStr) return null;
  const clean = prazoStr.trim().toLowerCase();
  if (
    clean.includes('definir') || 
    clean.includes('semanal') || 
    clean.includes('mensal') ||
    clean === '-' ||
    clean === 'sistêmico' ||
    clean === 'sistemico'
  ) {
    return null;
  }

  // 1. Formato ISO YYYY-MM-DD
  const isoMatch = clean.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    return new Date(year, month, day, 23, 59, 59);
  }

  // 2. Formato DD/MM/YYYY (ex: 15/02/2026, 19/06/2027, 23/11/2028)
  const ddmmyyyyMatch = clean.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (ddmmyyyyMatch) {
    const day = parseInt(ddmmyyyyMatch[1], 10);
    const month = parseInt(ddmmyyyyMatch[2], 10) - 1;
    const year = parseInt(ddmmyyyyMatch[3], 10);
    return new Date(year, month, day, 23, 59, 59);
  }

  // 3. Formato DD/MM/YY (ex: 19/06/27 -> 2027)
  const ddmmyyMatch = clean.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
  if (ddmmyyMatch) {
    const day = parseInt(ddmmyyMatch[1], 10);
    const month = parseInt(ddmmyyMatch[2], 10) - 1;
    const year2 = parseInt(ddmmyyMatch[3], 10);
    const fullYear = 2000 + year2;
    return new Date(fullYear, month, day, 23, 59, 59);
  }

  // 4. Formato DD/MMM/YYYY (ex: 23/set/2027)
  const ddmmmyyyyMatch = clean.match(/^(\d{1,2})\/([a-z]{3})\/(\d{4})$/);
  if (ddmmmyyyyMatch) {
    const day = parseInt(ddmmmyyyyMatch[1], 10);
    const month = MONTH_MAP[ddmmmyyyyMatch[2]];
    const year = parseInt(ddmmmyyyyMatch[3], 10);
    if (month !== undefined) {
      return new Date(year, month, day, 23, 59, 59);
    }
  }

  // 5. Formato DD/MMM (ex: 23/set, 08/out, 04/nov)
  const ddmmmMatch = clean.match(/^(\d{1,2})\/([a-z]{3})$/);
  if (ddmmmMatch) {
    const day = parseInt(ddmmmMatch[1], 10);
    const month = MONTH_MAP[ddmmmMatch[2]];
    if (month !== undefined) {
      return new Date(2026, month, day, 23, 59, 59);
    }
  }

  // 6. Formato DD/MM (ex: 02/09, 21/10, 08/10, 31/10, 04/11)
  const ddmmMatch = clean.match(/^(\d{1,2})\/(\d{1,2})$/);
  if (ddmmMatch) {
    const day = parseInt(ddmmMatch[1], 10);
    const month = parseInt(ddmmMatch[2], 10) - 1;
    return new Date(2026, month, day, 23, 59, 59);
  }

  return null;
};

/**
 * Retorna true se a ação está em aberto (Não iniciada ou Em andamento) e a data limite já passou.
 */
export const isActionOverdue = (prazo?: string, status?: string): boolean => {
  // Ações já finalizadas ou de rotina sistêmica nunca são marcadas como atrasadas
  if (status === 'Finalizado' || status === 'Sistêmico') {
    return false;
  }

  const dueDate = parsePrazoDate(prazo);
  if (!dueDate) return false;

  const now = new Date();
  return dueDate.getTime() < now.getTime();
};

/**
 * Retorna a data (00:00:00) do domingo da semana atual.
 * Se hoje for domingo, retorna hoje. Se for outro dia, retorna o domingo mais recente.
 */
export const getCurrentSundayDate = (): Date => {
  const now = new Date();
  const day = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  const sunday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day, 0, 0, 0, 0);
  return sunday;
};

/**
 * Retorna a chave única da semana no formato "YYYY-MM-DD" baseada no domingo.
 * A cada novo domingo, esta chave muda automaticamente.
 */
export const getSundayWeekKey = (): string => {
  const sunday = getCurrentSundayDate();
  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, '0');
  const day = String(sunday.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Retorna a data do próximo domingo (momento em que a rotina será desmarcada).
 */
export const getNextSundayDate = (): Date => {
  const currentSunday = getCurrentSundayDate();
  const nextSunday = new Date(currentSunday.getTime());
  nextSunday.setDate(currentSunday.getDate() + 7);
  return nextSunday;
};

/**
 * Formato curto DD/MM (para ciclo de rotina semanal)
 */
export const formatShortDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
};

/**
 * Formato completo DD/MM/YYYY (preserva sempre o ano)
 */
export const formatDisplayDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Converte uma data nos formatos aceitos no sistema (ex: "19/06/2027", "01/10", "23/set", "15/02/2026")
 * para o formato ISO YYYY-MM-DD utilizado no input type="date".
 * Preserva integralmente o ano 2026, 2027, 2028, etc.
 */
export const dateToIso = (dateStr?: string): string => {
  if (!dateStr) return '';
  const clean = dateStr.trim();
  
  // Se já for YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) return clean;

  // DD/MM/YYYY (ex: 19/06/2027, 15/02/2026, 20/12/2028)
  const ddmmyyyy = clean.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (ddmmyyyy) {
    const day = ddmmyyyy[1].padStart(2, '0');
    const month = ddmmyyyy[2].padStart(2, '0');
    const year = ddmmyyyy[3];
    return `${year}-${month}-${day}`;
  }

  // DD/MM/YY (ex: 19/06/27)
  const ddmmyy = clean.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
  if (ddmmyy) {
    const day = ddmmyy[1].padStart(2, '0');
    const month = ddmmyy[2].padStart(2, '0');
    const year = `20${ddmmyy[3]}`;
    return `${year}-${month}-${day}`;
  }

  // DD/MM (ano corrente padrão 2026)
  const ddmm = clean.match(/^(\d{1,2})\/(\d{1,2})$/);
  if (ddmm) {
    const day = ddmm[1].padStart(2, '0');
    const month = ddmm[2].padStart(2, '0');
    return `2026-${month}-${day}`;
  }

  // Fallback via parsePrazoDate
  const parsed = parsePrazoDate(clean);
  if (!parsed || isNaN(parsed.getTime())) return '';

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Converte valor vindo de input type="date" (YYYY-MM-DD) para string padrão no sistema (DD/MM/YYYY).
 * Preserva o ano 2026, 2027, 2028, etc. exatamente como o usuário selecionou no calendário.
 */
export const isoToDisplayDate = (isoStr: string): string => {
  if (!isoStr) return '';
  const parts = isoStr.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }
  return isoStr;
};

/**
 * Retorna a data de hoje formatada como DD/MM/YYYY.
 */
export const getTodayFormatted = (): string => {
  return formatDisplayDate(new Date());
};

/**
 * Retorna a data de hoje + N dias formatada como DD/MM/YYYY.
 */
export const getAddDaysFormatted = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return formatDisplayDate(d);
};
