/**
 * Utilitários para parsing e verificação de prazos e atrasos de ações
 */

export const parsePrazoDate = (prazoStr?: string): Date | null => {
  if (!prazoStr) return null;
  const clean = prazoStr.trim().toLowerCase();
  if (
    clean.includes('definir') || 
    clean.includes('semanal') || 
    clean === '-' ||
    clean === 'sistêmico' ||
    clean === 'sistemico'
  ) {
    return null;
  }

  // Formato DD/MM/YYYY (ex: 15/02/2026, 30/01/2026, 31/08/2026)
  const ddmmyyyyMatch = clean.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (ddmmyyyyMatch) {
    const day = parseInt(ddmmyyyyMatch[1], 10);
    const month = parseInt(ddmmyyyyMatch[2], 10) - 1;
    const year = parseInt(ddmmyyyyMatch[3], 10);
    return new Date(year, month, day, 23, 59, 59);
  }

  // Meses abreviados em português (ex: 23/set, 08/out, 04/nov, 10/dez, 15/fev)
  const monthMap: Record<string, number> = {
    jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
    jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11
  };

  // Formato DD/MMM (ex: 23/set, 08/out, 04/nov)
  const ddmmmMatch = clean.match(/^(\d{1,2})\/([a-z]{3})$/);
  if (ddmmmMatch) {
    const day = parseInt(ddmmmMatch[1], 10);
    const month = monthMap[ddmmmMatch[2]];
    if (month !== undefined) {
      return new Date(2026, month, day, 23, 59, 59);
    }
  }

  // Formato DD/MM (ex: 02/09, 21/10, 08/10, 31/10, 04/11)
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

export const formatShortDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
};

