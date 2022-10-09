import {useEthers} from "@usedapp/core";
import {useModal} from "../hooks/useModal";
import {ConnectWalletModal} from "./ConnectWalletModal";

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
    </>
  )
}

export default Home
