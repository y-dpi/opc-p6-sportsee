// Dependencies.
import { useState } from 'react';
import { UserInfoContext } from './UserInfoContext.js';

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const resetUserInfo = () => setUserInfo(null);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo, resetUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}
