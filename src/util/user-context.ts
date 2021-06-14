import React from 'react';

const UserContext = React.createContext({ user: {} });

export { UserContext };

export const useUserContext = () => React.useContext(UserContext);
