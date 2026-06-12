// Dependencies.
import { useState } from 'react';
import StatsBPM from './StatsBPM.jsx';
import { useUserActivity } from '../hooks/useUserActivity.js';
import { startOfWeek, endOfWeek, addWeeks, formatPeriod, toDailyHeartRate, averageHeartRate } from '../utils/activity.js';

// Heart rate graph over a single week.
export default function HeartRateGraph() {
  const [today] = useState(() => new Date());
  const [page, setPage] = useState(0);

  const weekStart = startOfWeek(addWeeks(today, page));
  const weekEnd = endOfWeek(weekStart);

  const { activity } = useUserActivity(weekStart, weekEnd);
  const sessions = activity ?? [];

  return (
    <StatsBPM
      title={`${averageHeartRate(sessions)} BPM`}
      period={formatPeriod(weekStart, weekEnd)}
      data={toDailyHeartRate(sessions, weekStart)}
      onPrev={() => setPage((p) => p - 1)}
      onNext={() => setPage((p) => Math.min(p + 1, 0))}
      nextDisabled={page >= 0}
    />
  );
}
