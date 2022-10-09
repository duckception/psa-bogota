import React, {useState} from 'react'
import {createContext, ReactNode, useCallback, useContext} from "react";
import {useEthers} from "@usedapp/core";
import {useWeb3Auth} from "./helpers/useWeb3Auth";
import {useWalletConnect} from "./helpers/useWalletConnect";
import {useWalletLink} from "./helpers/useWalletLink";

export enum WALLETS {
  MetaMask = 1,
  WalletConnect,
  CoinbaseWallet,
  Web3Auth,
}

interface WalletProviderProps {
  children: ReactNode;
}

const WalletsContext = createContext<{
  activeWallet: WALLETS | null;
  setActiveWallet: (wallet: WALLETS | null) => void;
  activateBrowserWallet: () => void;
  activateWalletConnect: () => Promise<void>;
  activateWalletLink: () => Promise<void>;
  activateWeb3AuthWallet: () => Promise<void>;
  deactivateWallet: () => Promise<void>;
}>({
  activeWallet: null,
  setActiveWallet: async () => {},
  activateBrowserWallet: async () => {},
  activateWalletConnect: async () => {},
  activateWalletLink: async () => {},
  activateWeb3AuthWallet: async () => {},
  deactivateWallet: async () => {},
});

export const WalletsProvider = ({ children }: WalletProviderProps) => {
  const { activateBrowserWallet, deactivate: deactivateBrowserWallet } = useEthers();

  const [activeWallet, setActiveWallet] = useState<WALLETS | null>(null)

  const walletConnect = useWalletConnect()
  const walletLink = useWalletLink()
  const web3AuthWallet = useWeb3Auth()

  const deactivateWallet = useCallback(async () => {
    setActiveWallet(null)
    walletConnect.deactivateWallet()
    walletLink.deactivateWallet()
    deactivateBrowserWallet();
    await web3AuthWallet.deactivateWallet()
  }, [deactivateBrowserWallet, web3AuthWallet, walletConnect, walletLink]);

  return (
    <WalletsContext.Provider
      value={{
        activeWallet,
        setActiveWallet,
        activateBrowserWallet,
        activateWalletConnect: walletConnect.activateWallet,
        activateWalletLink: walletLink.activateWallet,
        activateWeb3AuthWallet: web3AuthWallet.activateWallet,
        deactivateWallet,
      }}
    >
      {children}
    </WalletsContext.Provider>
  );
}

export const useWallets = () => useContext(WalletsContext);
