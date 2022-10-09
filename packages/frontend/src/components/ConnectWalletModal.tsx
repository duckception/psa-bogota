import React, {ReactNode, useCallback, useState} from 'react'
import styled, {css} from 'styled-components'

import BGX from '../images/BGX.svg'
import MetaMask from '../images/metamask.png'
import Coinbase from '../images/coinbase.png'
import WConnect from '../images/walletConnect.png'
import W3auth from '../images/web3auth.jpeg'
import {useWallets, WALLETS} from "../providers/WalletsProvider/WalletsProvider";
import {Modal} from "./Modal/Modal";
import colors from "../styles/colors";
import {helpers} from "../styles/helpers";

interface ConnectWalletModalProps {
  isShown: boolean
  onRequestClose: () => void
}

export function ConnectWalletModal(props: ConnectWalletModalProps) {
  const {
    isShown,
    onRequestClose,
  } = props

  const {
    activeWallet,
    setActiveWallet,
    activateBrowserWallet,
    activateWalletLink,
    activateWalletConnect,
    activateWeb3AuthWallet,
    deactivateWallet
  } = useWallets();

  const [connecting, setConnecting] = useState<number | null>(null)

  async function setCurrentWallet(wallet: WALLETS) {
    setConnecting(wallet)
    switch (wallet) {
      case WALLETS.WalletConnect:
        await activateWalletConnect()
        break
      case WALLETS.CoinbaseWallet:
        await activateWalletLink()
        break
      case WALLETS.Web3Auth:
        setTimeout(onRequestClose, 4000)
        await activateWeb3AuthWallet()
        break
      default:
        await activateBrowserWallet()
    }
    setActiveWallet(wallet)
    setConnecting(null)
  }

  const isWalletButtonDisabled = !!connecting
  const isWalletConnected = (wallet: WALLETS) => (!connecting && activeWallet === wallet)
  const isConnecting = (wallet: WALLETS) => connecting === wallet

  const onWalletConnected = (wallet: WALLETS) => () => {
    if (isWalletConnected(wallet)) {
      return
    }
    setCurrentWallet(wallet)
  }

  return (
    <Modal isShown={isShown} onRequestClose={onRequestClose} customStyles={modalStyles}>
      <ConnectContainer>
        <LogoContainer>
          <img src={BGX} alt="BGX" />
        </LogoContainer>
        <h3>Connect Wallet</h3>
        <WalletMenu>
          <WalleMenuItem
            isConnected={isWalletConnected(WALLETS.MetaMask)}
            onConnectClick={onWalletConnected(WALLETS.MetaMask)}
            isConnecting={isConnecting(WALLETS.MetaMask)}
            disabled={isWalletButtonDisabled}
            onDisconnectClick={deactivateWallet}
            logo={<img src={MetaMask} alt="MetaMask logo" />}
            walletName="MetaMask"
          />
          <WalleMenuItem
            isConnected={isWalletConnected(WALLETS.WalletConnect)}
            onConnectClick={onWalletConnected(WALLETS.WalletConnect)}
            isConnecting={isConnecting(WALLETS.WalletConnect)}
            disabled={isWalletButtonDisabled}
            onDisconnectClick={deactivateWallet}
            logo={<img src={WConnect} alt="WalletConnect logo" />}
            walletName="WalletConnect"
          />
          <WalleMenuItem
            isConnected={isWalletConnected(WALLETS.CoinbaseWallet)}
            onConnectClick={onWalletConnected(WALLETS.CoinbaseWallet)}
            isConnecting={isConnecting(WALLETS.CoinbaseWallet)}
            disabled={isWalletButtonDisabled}
            onDisconnectClick={deactivateWallet}
            logo={<img src={Coinbase} alt="Coinbase Wallet logo" />}
            walletName="Coinbase Wallet"
          />
          <WalleMenuItem
            isConnected={isWalletConnected(WALLETS.Web3Auth)}
            onConnectClick={onWalletConnected(WALLETS.Web3Auth)}
            isConnecting={isConnecting(WALLETS.Web3Auth)}
            disabled={isWalletButtonDisabled}
            onDisconnectClick={deactivateWallet}
            logo={<img src={W3auth} alt="Web3Auth logo" />}
            walletName="Web3Auth"
          />
        </WalletMenu>
        <WalletSelectorText>
          <span>New to Ethereum ?</span>
          <a href="https://ethereum.org/en/wallets/" target="_blank" rel="noreferrer">
            Learn more about wallets
          </a>
        </WalletSelectorText>
      </ConnectContainer>
    </Modal>
  )
}

interface WalleMenuItemProps {
  disabled: boolean
  isConnected: boolean
  isConnecting?: boolean
  onConnectClick: () => void
  onDisconnectClick: () => void
  logo: ReactNode
  walletName: string
}

export const WalleMenuItem = ({
                                disabled,
                                isConnected,
                                isConnecting,
                                onConnectClick,
                                onDisconnectClick,
                                logo,
                                walletName,
                              }: WalleMenuItemProps) => {
  const handleConnectClick = useCallback(() => {
    if (isConnected && !isConnecting) {
      onDisconnectClick()
    } else {
      onConnectClick()
    }
  }, [isConnected, isConnecting])

  return (
    <WalletMenuItem disabled={disabled}>
      <LogoWrapper>{logo}</LogoWrapper>
      {isConnecting && <Text>Connecting...</Text>}
      {!isConnected && !isConnecting && <Text>{walletName}</Text>}
      <WalletMenuButton disabled={disabled} onClick={handleConnectClick} />
      {isConnected && !isConnecting && <DisconnectText>Disconnect</DisconnectText>}
    </WalletMenuItem>
  )
}


const ConnectContainer = styled.div`
  text-align: center;

  h3 {
    font-weight: 500;
    font-size: 22px;
    line-height: 32px;
    color: ${colors.palette.stone}
    margin: 0 auto 16px;
  }

  p {
    margin: 0;
    font-weight: 300;
    font-size: 14px;
    line-height: 20px;
    color: ${colors.palette.waterloo};

    a {
      display: inline-block;
      margin-left: 5px;
    }
  }

  a {
    color: ${colors.colors.brand};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const LogoContainer = styled.div`
  ${helpers.flexCenter}
  height: 80px;
  width: 80px;
  margin: 0px auto 16px;
  background: ${colors.palette.cobalt};
  border-radius: 50%;
  box-shadow: 0px 12px 32px rgba(6, 20, 57, 0.05), 0px 8px 16px rgba(6, 20, 57, 0.05), 0px 4px 8px rgba(6, 20, 57, 0.03);

  img {
    margin-top: 2px;
    height: 46px;
    width: 46px;
  }
`

const WalletMenu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
`

const WalletMenuItem = styled.li<{ disabled: boolean }>`
  ${helpers.flexCenter}
  position: relative;
  flex-direction: column;
  margin: 0 8px 16px;
  max-width: 100px;
  width: 100px;
  height: 100px;
  padding: 8px;
  border: solid 1px ${colors.borderColor};
  border-radius: ${colors.borderRadius};
  background: none;
  color: ${colors.colors.black};

  ${({ disabled }) =>
  disabled &&
  css`
      color: ${colors.colors.gray[4]};
      background: ${colors.colors.gray[1]};
      cursor: not-allowed;
    `}

  ${({ disabled }) =>
  !disabled &&
  css`
      &:hover {
        border: 1px solid ${colors.colors.brand};
        box-shadow: 0px 4px 12px rgba(2, 10, 33, 0.05), 0px 2px 6px rgba(2, 10, 33, 0.05),
          0px 2px 2px rgba(2, 10, 33, 0.02);
      }
    `}
`

const WalletMenuButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
`
const textStyles = css`
  font-size: 12px;
  line-height: 18px;
`

const Text = styled.span`
  ${textStyles}
  color: inherit;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const DisconnectText = styled(Text)`
  color: ${colors.colors.danger};
`

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 53px;
  height: 54px;
  margin-bottom: 5px;

  img {
    max-width: 100%;
  }
`

const WalletSelectorText = styled.div`
  margin-top: 4px;

  span {
    display: block;
    color: ${colors.colors.black};
  }
`

const modalStyles = {
  modal: { maxWidth: '420px' },
  header: { borderBottom: 'none' },
  content: { paddingTop: 0 },
}

