import React from 'react';
import { User } from './types/user';

const UserContext = React.createContext<Partial<User>>({});

export { UserContext };

export const useUserContext = () => React.useContext(UserContext);
