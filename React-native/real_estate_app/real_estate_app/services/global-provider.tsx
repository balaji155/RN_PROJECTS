import { createContext,ReactNode, useContext } from "react";
import { getUser } from "./appwrite";
import { useAppwrite } from "./hooks/useAppwrite";

interface User {    
   $id: string;
   name: string;
   avatar: string;
   email: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: (params: Record<string, string | number>) => Promise<void>;

}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

const GlobalContextProvider = ({children}: {children: ReactNode}) => {
    const { data: user,loading,refetch } = useAppwrite({
        fn: getUser
    })

    const isLoggedIn = !!user

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            user,
            loading,
            refetch
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext)
    if(!context) throw new Error('useGlobalContext must be used within a GlobalContextProvider')

    return context
}

export default GlobalContextProvider;