// Dependencies.
import { useState } from 'react';
import PieChart from './PieChart.jsx';
import StatCard from './StatCard.jsx';
import { useUserActivity } from '../hooks/useUserActivity.js';
import { startOfWeek, endOfWeek, formatRange, summarizeWeek } from '../utils/activity.js';

// The backend does not expose a weekly goal, so use the same value for everyone.
const WEEKLY_GOAL = 10;

// This week summary.
export default function CurrentWeek() {
  const [today] = useState(() => new Date());
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);

  const { activity } = useUserActivity(weekStart, weekEnd);
  const { count, totalDistance, totalDuration } = summarizeWeek(activity ?? []);

  return (
    <section className='flex flex-col gap-4'>
      <div>
        <h2 className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-text-primary)'>Cette semaine</h2>
        <p className='mt-1 text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-secondary)'>{formatRange(weekStart, weekEnd)}</p>
      </div>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr]'>
        <PieChart value={count} goal={WEEKLY_GOAL} subtitle='Courses hebdomadaire réalisées' />
        <div className='flex flex-col gap-6'>
          <StatCard label="Durée d'activité" value={String(totalDuration)} unit='minutes' />
          <StatCard label='Distance' value={String(totalDistance)} unit='kilomètres' valueClassName='text-(--color-text-orange)' />
        </div>
      </div>
    </section>
  );
}
