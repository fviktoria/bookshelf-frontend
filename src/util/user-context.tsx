import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import React, { Consumer, Context } from 'react';
import { MutatorCallback } from 'swr/dist/types';
import { useUserQuery } from '../hooks/queries/use-user-query';
import { User } from './types/user';
import { UserToken } from './types/user-token';

type UserContext = {
  user: User;
  mutateUser: MutatorCallback<User>;
  error: boolean;
};

const UserContext = React.createContext<Partial<UserContext>>({
  user: undefined,
  mutateUser: undefined,
  error: undefined,
});

export const UserContextProvider = ({ props, children }: any) => {
  const token = Cookies.get('token');
  const decodedToken: UserToken | undefined = token ? jwtDecode(token) : undefined;
  const { user, error, mutate: mutateUser } = useUserQuery(decodedToken?.data.user.id);

  const value = React.useMemo(() => ({ user, mutateUser, error }), [user, mutateUser, error]);

  return (
    <UserContext.Provider value={value} {...props}>
      {children}
    </UserContext.Provider>
  );
};

// a hook to use whenever we need to consume data from `GlobalStateProvider`.
// So, We don't need React.useContext everywhere we need data from GlobalStateContext.

export function useUserContext() {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('You need to wrap UserContextProvider.');
  }

  return context;
}

export const UserContextConsumer: any = ({ children }: any) => {
  return <UserContext.Consumer>{children}</UserContext.Consumer>;
};