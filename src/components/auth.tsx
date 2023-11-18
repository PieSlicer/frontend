import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import initWeb3Auth from "@/lib/web3auth";


export interface AuthContextProps {
  isConnected: boolean;
  provider: any;
  eoa: string | null;
  smartWallet: any;
  signInWithWeb3Auth: () => void;
  signOutWithWeb3Auth: () => void;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [web3Auth, setWeb3Auth] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [eoa, setEoa] = useState<any>(null);
  const [smartWallet, setSmartWallet] = useState<any>(null);

  const isConnected = useMemo(() => !!eoa, [eoa]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const web3Auth = await initWeb3Auth();
    if (!web3Auth) return;
    setWeb3Auth(web3Auth);
    setProvider(web3Auth?.getProvider());
  }

  function signOut() {
    setEoa(null);
    setSmartWallet(null);
  }

  async function signInWithWeb3Auth() {
    if (!web3Auth) return;
    const authKitSignData = await web3Auth.signIn();
    if (!authKitSignData) return;
    const { eoa, safes } = authKitSignData;
    console.log('eoa', eoa);
    console.log('safes', safes);
    setEoa(eoa);
    setSmartWallet(safes[0]);
  }

  function signOutWithWeb3Auth() {
    if (!web3Auth) return;
    web3Auth.signOut();
    signOut();
  }

  const value = useMemo(() => ({ provider, eoa, smartWallet, isConnected }), [ provider, eoa, smartWallet, isConnected]);

  return (
    <AuthContext.Provider value={{...value, signInWithWeb3Auth, signOutWithWeb3Auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

