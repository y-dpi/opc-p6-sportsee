// Dependencies.
import { useEffect, useState } from 'react';
import { getUserActivity } from '../utils/api.js';

/**
 * Fetch user running sessions between startWeek and endWeek.
 * @param {Date} startWeek
 * @param {Date} endWeek
 */
export function useUserActivity(startWeek, endWeek) {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const start = startWeek.getTime();
  const end = endWeek.getTime();

  useEffect(() => {

    // Use fetched value.
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await getUserActivity(new Date(start), new Date(end));
        if (!cancelled) setActivity(data);

      } catch (err) {
        if (!cancelled) setError(err);

      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();

    return () => {
      cancelled = true;
    };
  }, [start, end]);

  return { activity, loading, error };
}
