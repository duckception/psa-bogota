import {Config, DAppProvider, Optimism} from '@usedapp/core'
import React from 'react'

import { App } from './App'
import { FontStyles } from './styles/fonts'
import {createRoot} from "react-dom/client";
import {WalletsProvider} from "./providers/WalletsProvider/WalletsProvider";
import {NETWORK_CONNECTIONS} from "./constants/chains";

const config: Config = {
  readOnlyChainId: Optimism.chainId,
  readOnlyUrls: NETWORK_CONNECTIONS,
  pollingInterval: 500,
  notifications: {
    checkInterval: 500
  }
}

const container = document.getElementById('root')
const root = createRoot(container!);

root.render(
  <DAppProvider config={config}>
    <WalletsProvider>
      <FontStyles />
      <App />
    </WalletsProvider>
  </DAppProvider>,
)
