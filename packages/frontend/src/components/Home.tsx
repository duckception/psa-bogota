import {useEthers} from "@usedapp/core";
import {useModal} from "../hooks/useModal";
import {ConnectWalletModal} from "./ConnectWalletModal";
import {StreamFeed} from "./stream/StreamFeed"
import styled from 'styled-components'



function Home() {
  const { account } = useEthers()
  const { isShown, toggle } = useModal()

  return (
    <>
      <div>Hi</div>
      {/*<ConnectWallet />*/}
      <div>Account: {account}</div>
      <button onClick={toggle}>Connect Wallet</button>
      {isShown && (
        <ConnectWalletModal
          isShown={isShown}
          onRequestClose={toggle}
        />
      )}

      {!isShown && account ? 
      <StreamFeedWrapper>
        <StreamFeed/> 

      </StreamFeedWrapper>
      : null}
    </>
  )
}

const StreamFeedWrapper = styled.div`
  width: 48vw;
  height: 27vh;
`

export default Home
