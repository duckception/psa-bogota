import {Chain, ChainId, Optimism} from "@usedapp/core";

export const SUPPORTED_CHAINS: Chain[] = [Optimism]

export const NETWORK_CONNECTIONS = {
  [ChainId.Optimism]: 'https://optimism-mainnet.gateway.pokt.network/v1/lb/a2622878193e174c71d1b319',
}

