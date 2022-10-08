import {ChainId, useEthers} from "@usedapp/core";
import {useCallback} from "react";
import {WalletLinkConnector} from "@web3-react/walletlink-connector";
import {NETWORK_CONNECTIONS} from "../../../constants/chains";

const removeWalletLinkStorage = () => {
  Object.entries(localStorage)
    .map((entry) => entry[0])
    .filter((entry) => entry.substring(0, 11) === "-walletlink")
    .forEach((entry) => localStorage.removeItem(entry));
};

export function useWalletLink() {
  const {activate, deactivate} = useEthers()

  const activateWallet = useCallback(async () => {
    try {
      const connector = new WalletLinkConnector({
        url: NETWORK_CONNECTIONS[ChainId.Optimism],
        appName: "PSA Bogota",
        supportedChainIds: [10],
      })
      await activate(connector);
    } catch (error) {
      console.log(error);
    }
  }, [activate]);

  const deactivateWallet = useCallback(() => {
    removeWalletLinkStorage();
  }, [deactivate]);

  return {activateWallet, deactivateWallet}
}
