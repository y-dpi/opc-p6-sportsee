// Dependencies.
import { useContext, useEffect, useState } from 'react';
import { UserInfoContext } from '../context/UserInfoContext.js';
import { getUserInfo } from '../utils/api.js';

// Get user information, fetch once and cache in context.
export function useUserInfo() {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error('useUserInfo() must be used within a UserInfoProvider.');
  }

  const { userInfo, setUserInfo } = context;
  const [loading, setLoading] = useState(!userInfo);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    // Use cached value.
    if (userInfo) return;

    // Use fetched value.
    let cancelled = false;
    getUserInfo()
      .then((data) => {
        if (!cancelled) setUserInfo(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [userInfo, setUserInfo]);

  return { userInfo, loading, error };
}
