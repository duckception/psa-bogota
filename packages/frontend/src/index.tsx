import { Config, DAppProvider } from '@usedapp/core'
import React from 'react'

import { App } from './App'
import { FontStyles } from './styles/fonts'
import {createRoot} from "react-dom/client";
import {WalletsProvider} from "./providers/WalletsProvider/WalletsProvider";

const config: Config = {}

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
