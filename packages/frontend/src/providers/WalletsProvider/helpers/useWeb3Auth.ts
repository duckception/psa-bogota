import {useCallback, useEffect, useState} from "react";
import {Web3Auth, Web3AuthOptions} from "@web3auth/web3auth";
import {OpenloginAdapter} from "@web3auth/openlogin-adapter";
import {WEB3AUTH_CLIENT_ID} from "../../../constants/web3Auth";
import {ChainId, useEthers} from "@usedapp/core";
import {NETWORK_CONNECTIONS} from "../../../constants/chains";

export function useWeb3Auth() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const {activate} = useEthers()

  useEffect(() => {
    (async () => {
      const web3AuthCtorParams: Web3AuthOptions = {
        clientId: WEB3AUTH_CLIENT_ID,
        chainConfig: {
          chainNamespace: "eip155",
          chainId:  "0x0a",
          rpcTarget: NETWORK_CONNECTIONS[ChainId.Optimism]
        },
      }

      const web3auth = new Web3Auth(web3AuthCtorParams);
      const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
          clientId: WEB3AUTH_CLIENT_ID,
          network: "mainnet",
          uxMode: "popup",
        },
      });
      web3auth.configureAdapter(openloginAdapter);
      setWeb3auth(web3auth);
    })()
  }, [])

  const activateWallet = useCallback(async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }

    try {
      await web3auth.initModal();
      const provider = await web3auth.connect();
      await activate(provider as any);
    } catch (error) {
      console.log(error);
    }
  }, [activate, web3auth]);

  const deactivateWallet = useCallback(async () => {
    if (web3auth) {
      await web3auth.logout();
    }
  }, [web3auth])

  return {activateWallet, deactivateWallet}
}
