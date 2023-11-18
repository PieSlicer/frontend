import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { ethers } from "ethers";

import initWeb3Auth from "@/lib/web3auth";
import useNounsPicture from '@/hooks/profilePicture';

import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { sepolia, mainnet } from 'wagmi/chains';
import { publicProvider } from "wagmi/providers/public";

export interface AuthContextProps {
  loading: boolean;
  isConnected: boolean;
  provider: any;
  eoa: string | null;
  smartWallet: string | null;
  email: string | null | undefined;
  picture: string | undefined;
  signInWithWeb3Auth: () => void;
  signOutWithWeb3Auth: () => void;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [web3Auth, setWeb3Auth] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [eoa, setEoa] = useState<any>(null);
  const [smartWallet, setSmartWallet] = useState<any>(null);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [picture, setPicture] = useState<string | undefined>(undefined);

  const newPofilePicture  = useNounsPicture();

  const isConnected = useMemo(() => !!eoa, [eoa]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (eoa && !picture && newPofilePicture) {
      setPicture(`data:image/svg+xml,${encodeURIComponent(newPofilePicture)}`);
    }
  } , [newPofilePicture, eoa, picture]);

  async function init() {
    setLoading(true);
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
      afterSignIn();
    }
    setLoading(false);
  }

  function afterSignIn() {
    if (newPofilePicture) {
      setPicture(`data:image/svg+xml,${encodeURIComponent(newPofilePicture)}`);
    }
  }

  function afterSignOut() {
    setEoa(null);
    setSmartWallet(null);
    setEmail(undefined);
    setPicture(undefined);
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
    afterSignIn();
  }

  function signOutWithWeb3Auth() {
    if (!web3Auth) return;
    web3Auth.signOut();
    afterSignOut();
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

  const currentChain = sepolia;
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [currentChain],
    [
      publicProvider()
    ]
  );

  // Set up wagmi client
  const wagmiClient = createConfig({
    autoConnect: true,
    connectors: [
      new Web3AuthConnector({
        chains,
        options: {
          web3AuthInstance: web3Auth,
        },
      }),
    ],
    publicClient,
    webSocketPublicClient,
  });

  const value = useMemo(() => ({
    loading, provider, eoa, smartWallet, email, picture, isConnected
  }), [loading, provider, eoa, smartWallet, email, isConnected]);

  return (
    <AuthContext.Provider value={{...value, signInWithWeb3Auth, signOutWithWeb3Auth }}>
      <WagmiConfig config={wagmiClient}>
          {children}
      </WagmiConfig>
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

