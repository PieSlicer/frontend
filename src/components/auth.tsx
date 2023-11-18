import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { ethers } from "ethers";

import initWeb3Auth from "@/lib/web3auth";

export interface AuthContextProps {
  isConnected: boolean;
  provider: any;
  eoa: string | null;
  smartWallet: string | null;
  email: string | null | undefined;
  signInWithWeb3Auth: () => void;
  signOutWithWeb3Auth: () => void;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [web3Auth, setWeb3Auth] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [eoa, setEoa] = useState<any>(null);
  const [smartWallet, setSmartWallet] = useState<any>(null);
  const [email, setEmail] = useState<string | undefined>(undefined);

  const isConnected = useMemo(() => !!eoa, [eoa]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    let _web3Auth = web3Auth;
    if (!_web3Auth) {
      _web3Auth = await initWeb3Auth();
      setWeb3Auth(_web3Auth);
    }
    // Connected user
    if (_web3Auth.getProvider()) {
      setProvider(_web3Auth?.getProvider());
      const userInfo = await _web3Auth.getUserInfo();
      if (userInfo) {
        setEmail(userInfo.email);
      }
      const eoa = await getAccount();
      if (eoa) {
        setEoa(eoa);
      }
    }
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
    setEoa(eoa);
    setSmartWallet(safes[0]);
    const userInfo = await web3Auth.getUserInfo();
    if (userInfo) {
      setEmail(userInfo.email);
    }
  }

  function signOutWithWeb3Auth() {
    if (!web3Auth) return;
    web3Auth.signOut();
    signOut();
  }

  async function getAccount() {
    try {
      const ethersProvider = new  ethers.providers.Web3Provider(provider)
      const signer = ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      return address;
    } catch (error) {
      return error;
    }
  }

  const value = useMemo(() => ({
    provider, eoa, smartWallet, email, isConnected
  }), [provider, eoa, smartWallet, email, isConnected]);

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

