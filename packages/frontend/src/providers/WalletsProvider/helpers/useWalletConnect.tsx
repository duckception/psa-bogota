import {ChainId, useEthers} from "@usedapp/core";
import {useCallback} from "react";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {NETWORK_CONNECTIONS} from "../../../constants/chains";

export function useWalletConnect() {
  const {activate, deactivate} = useEthers()

  const activateWallet = useCallback(async () => {
    try {
      const connector = new WalletConnectConnector({
        rpc: NETWORK_CONNECTIONS,
        bridge: "https://bridge.walletconnect.org",
        qrcode: true,
      })
      await activate(connector);
    } catch (error) {
      console.log(error);
    }
  }, [activate]);

  const deactivateWallet = useCallback(() => {
    localStorage.removeItem("walletconnect");
  }, [deactivate]);

  return {activateWallet, deactivateWallet}
}
