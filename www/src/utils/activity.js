// Days of the week labels.
const DAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

// Monday 00:00:00 of the week where date is.
export function startOfWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const fromMonday = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - fromMonday);
  return d;
}

// Sunday 23:59:59 of the week where date is.
export function endOfWeek(date) {
  const d = startOfWeek(date);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}

// Add weeks to a date.
export function addWeeks(date, weeks) {
  const d = new Date(date);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

// Add days to a date.
function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// Compare if two dates are in the same day.
function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// Compare if a date is between start and end dates (included).
function isWithin(date, start, end) {
  return date >= start && date <= end;
}

// Round to a single digit after the decimal point. 
function round1(n) {
  return Math.round(n * 10) / 10;
}

// Format date to '28.05'.
function formatDotDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}`;
}

// Format period to '28 mai - 25 juin'.
export function formatPeriod(start, end) {
  const fmt = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' });
  return `${fmt.format(start)} - ${fmt.format(end)}`;
}

// Format period to 'Du 23/06/2025 au 30/06/2025'.
export function formatRange(start, end) {
  const fmt = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return `Du ${fmt.format(start)} au ${fmt.format(end)}`;
}

// Sum distance per week starting at firstWeekStart.
export function toWeeklyDistance(sessions, firstWeekStart, weeks = 4) {
  return Array.from({ length: weeks }, (_, i) => {
    const ws = startOfWeek(addWeeks(firstWeekStart, i));
    const we = endOfWeek(ws);
    const km = sessions
      .filter((s) => isWithin(new Date(s.date), ws, we))
      .reduce((sum, s) => sum + s.distance, 0);
    return { label: `S${i + 1}`, km: round1(km), range: `${formatDotDate(ws)} au ${formatDotDate(we)}` };
  });
}

// Heart rate per day of the week starting at weekStart.
export function toDailyHeartRate(sessions, weekStart) {
  return DAY_LABELS.map((day, i) => {
    const d = addDays(weekStart, i);
    const session = sessions.find((s) => sameDay(new Date(s.date), d));
    if (!session) return { day, min: 0, max: 0, avg: 0 };
    return { day, min: session.heartRate.min, max: session.heartRate.max, avg: session.heartRate.average };
  });
}

// Totals for a single week.
export function summarizeWeek(sessions) {
  return {
    count: sessions.length,
    totalDistance: round1(sessions.reduce((sum, s) => sum + s.distance, 0)),
    totalDuration: sessions.reduce((sum, s) => sum + s.duration, 0),
  };
}

// Average of the weekly distance.
export function averageWeeklyKm(weekly) {
  if (!weekly.length) return 0;
  return round1(weekly.reduce((sum, w) => sum + w.km, 0) / weekly.length);
}

// Average of the session heart rate.
export function averageHeartRate(sessions) {
  if (!sessions.length) return 0;
  return Math.round(sessions.reduce((sum, s) => sum + s.heartRate.average, 0) / sessions.length);
}
