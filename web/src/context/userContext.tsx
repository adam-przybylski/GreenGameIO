import { FC, ReactNode, createContext, useContext } from "react";

export type AccountType = "Admin" | "Normal";

interface ContextState {
  accountType: AccountType;
}

const UserContext = createContext<ContextState>({} as ContextState);

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const state: ContextState = {
    accountType: "Normal",
  };
  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export default UserContextProvider;
