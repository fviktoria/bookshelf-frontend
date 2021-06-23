import React from 'react';
import { User } from './types/user';

const UserContext = React.createContext<any>({});

export { UserContext };

export const useUserContext = () => React.useContext(UserContext);
