// Dependencies.
import { useState } from 'react';
import { UserInfoContext } from './UserInfoContext.js';

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}
