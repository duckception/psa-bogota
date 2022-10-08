import React from 'react'
import {createContext, ReactNode, useCallback, useContext} from "react";
import {useEthers} from "@usedapp/core";
import {useWeb3Auth} from "./helpers/useWeb3Auth";
import {useWalletConnect} from "./helpers/useWalletConnect";
import {useWalletLink} from "./helpers/useWalletLink";

interface WalletProviderProps {
  children: ReactNode;
}

const WalletsContext = createContext<{
  activateBrowserWallet: () => void;
  activateWalletConnect: () => Promise<void>;
  activateWalletLink: () => Promise<void>;
  activateWeb3AuthWallet: () => Promise<void>;
  deactivateWallet: () => Promise<void>;
}>({
  activateBrowserWallet: async () => {},
  activateWalletConnect: async () => {},
  activateWalletLink: async () => {},
  activateWeb3AuthWallet: async () => {},
  deactivateWallet: async () => {},
});

export const WalletsProvider = ({ children }: WalletProviderProps) => {
  const { activateBrowserWallet, deactivate: deactivateBrowserWallet } = useEthers();

  const walletConnect = useWalletConnect()
  const walletLink = useWalletLink()
  const web3AuthWallet = useWeb3Auth()

  const deactivateWallet = useCallback(async () => {
    walletConnect.deactivateWallet()
    walletLink.deactivateWallet()
    deactivateBrowserWallet();
    await web3AuthWallet.deactivateWallet()
  }, [deactivateBrowserWallet, web3AuthWallet, walletConnect, walletLink]);

  return (
    <WalletsContext.Provider
      value={{
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
