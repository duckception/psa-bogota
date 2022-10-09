import {useWallets} from "../providers/WalletsProvider/WalletsProvider";
import styled from "styled-components";
import {useEthers} from "@usedapp/core";

import MetaMask from '../images/metamask.png'
import Coinbase from '../images/coinbase.png'
import WConnect from '../images/walletConnect.png'
import W3auth from '../images/web3auth.jpeg'

export function ConnectWallet() {
  const { account } = useEthers()
  const {
    activateBrowserWallet,
    activateWalletLink,
    activateWalletConnect,
    activateWeb3AuthWallet,
    deactivateWallet
  } = useWallets();

  return (
    <>
      {
        account
          ? <>
            <h3>Account: {account}</h3>
            <ButtonsWrapper>
              {/* <Button onClick={async () => alert(await library?.getSigner().signMessage('Hello World'))}>Sign me</Button> */}
              <button onClick={deactivateWallet}>Disconnect Wallet</button>
            </ButtonsWrapper>
          </>
          : (<>
            <CenteredHeader>Connect With:</CenteredHeader>
            <ButtonsWrapper>
              <button onClick={activateBrowserWallet}><Img src={MetaMask} />&nbsp;Metamask</button>
              <button onClick={activateWeb3AuthWallet}><Img src={W3auth} />&nbsp;Web3Auth</button>
              <button onClick={activateWalletConnect}><Img src={WConnect} />&nbsp;WalletConnect</button>
              <button onClick={activateWalletLink}><Img src={Coinbase} />&nbsp;Coinbase Wallet</button>
            </ButtonsWrapper>
            <br/>
          </>)
      }
    </>
  )
}

const Img = styled.img`
  width: 18px;
  height: 18px;
`

const CenteredHeader = styled.h2`
  text-align: center;
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 20px;
`
