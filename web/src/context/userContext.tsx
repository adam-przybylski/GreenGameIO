import {ReactNode, createContext, useContext, useState, FC} from "react";
import {AccountType} from "../types/accountType.ts";



interface UserState {
  account: AccountType | null;
  setAccount: (item: AccountType | null) => void;
}

const UserContext = createContext<UserState>({} as UserState);

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider : FC<UserContextProviderProps> = ({ children } : {children: ReactNode}) => {
  const [account, setAccount] = useState<AccountType | null>(null)

  // useEffect(() => {
  //   if (account?.token) {
  //     localStorage.setItem('token', JSON.stringify(account.token))
  //   }
  // }, [account])

  return <UserContext.Provider value={{account, setAccount}}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export default UserContextProvider;
