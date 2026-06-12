// Dependencies.
import { useState } from 'react';
import StatsKM from './StatsKM.jsx';
import { useUserActivity } from '../hooks/useUserActivity.js';
import { startOfWeek, endOfWeek, addWeeks, formatPeriod, toWeeklyDistance, averageWeeklyKm } from '../utils/activity.js';

// Distance bar graph over 4 weeks.
export default function DistanceGraph() {
  const [today] = useState(() => new Date());
  const [page, setPage] = useState(0);

  const firstWeekStart = startOfWeek(addWeeks(today, page * 4 - 3));
  const lastWeekEnd = endOfWeek(addWeeks(firstWeekStart, 3));

  const { activity } = useUserActivity(firstWeekStart, lastWeekEnd);
  const data = toWeeklyDistance(activity ?? [], firstWeekStart);

  return (
    <StatsKM
      title={`${averageWeeklyKm(data)}km en moyenne`}
      period={formatPeriod(firstWeekStart, lastWeekEnd)}
      data={data}
      onPrev={() => setPage((p) => p - 1)}
      onNext={() => setPage((p) => Math.min(p + 1, 0))}
      nextDisabled={page >= 0}
    />
  );
}
