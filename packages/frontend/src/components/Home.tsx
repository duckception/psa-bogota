import {useEtherBalance, useEthers, useTokenBalance} from "@usedapp/core";
import {useModal} from "../hooks/useModal";
import {ConnectWalletModal} from "./ConnectWalletModal";
import {useCallback, useEffect, useState} from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import {ethers} from "ethers";
import {formatUnits} from "ethers/lib/utils";
import {StreamFeed} from "./stream/StreamFeed"
import styled from 'styled-components'


function Home() {
  const { account, library } = useEthers()
  const { isShown, toggle } = useModal()

  const [isStart, setIsStart] = useState(true)
  const [sf, setSf] = useState<Framework>()

  useEffect(() => {
    // declare the data fetching function
    const createSf = async () => {
      return await Framework.create({
        chainId: 10,
        provider: library
      });
    }

    // call the function
    createSf()
      .then((value) => setSf(value))
      // make sure to catch any error
      .catch(console.error);
  }, [account])

  //access the cfaV1 object via the Framework class
  //see below for a complete example
  // const flowInfo = await sf!.cfaV1.getFlowInfo(...)

  const doThis = useCallback(async () => {
    console.log(library, account, sf)
    const flowInfo = await sf?.cfaV1.getFlow({
      superToken: "0xd782AC4Ee247e0986522ca05c08Cda330DFc14c4",
      sender: account!,
      receiver: "0xD79231FAED76537008c408f87744da240032B89d",
      providerOrSigner: library?.getSigner(account)!
    })
    console.log("flowInfo", flowInfo)

    // const signer = sf?.createSigner({ privateKey: "0x460824d43c2067340b9e79058e3bb477acd97877bb221107abba3adacdf69620", provider: library });

    if (isStart) {
      console.log('STARTING')
      const createFlowOperation = sf?.cfaV1.createFlow({
        sender: account,
        receiver: "0xD79231FAED76537008c408f87744da240032B89d",
        superToken: "0xd782AC4Ee247e0986522ca05c08Cda330DFc14c4",
        flowRate: "1000000000"
      });

      // console.log(signer)
      console.log(library?.getSigner(account)!)

      try {
        const txnResponse = await createFlowOperation?.exec(library?.getSigner(account)!);
        console.log('after response')
        console.log(txnResponse)
        const txnReceipt = await txnResponse?.wait();
        console.log('after receipt')
        console.log(txnReceipt)
        setIsStart(!isStart)
      } catch (e) {
        console.error('FAIL')
        console.error(e)
      }
    } else {
      console.log('STOPPING', account)
      const createFlowOperation = sf?.cfaV1.deleteFlow({
        sender: account!,
        receiver: "0xD79231FAED76537008c408f87744da240032B89d",
        superToken: "0xd782AC4Ee247e0986522ca05c08Cda330DFc14c4",
        flowRate: "1000000000"
      });

      // console.log(signer)
      console.log(library?.getSigner(account)!)
      try {
        const txnResponse = await createFlowOperation?.exec(library?.getSigner(account)!);
        console.log('after response')
        console.log(txnResponse)
        const txnReceipt = await txnResponse?.wait();
        console.log('after receipt')
        console.log(txnReceipt)
        setIsStart(!isStart)
      } catch (e) {
        console.error('FAIL')
        console.error(e)
      }
    }


  }, [sf, library, account])

  const tokenBalance = useTokenBalance('0xd782AC4Ee247e0986522ca05c08Cda330DFc14c4', account)
  const etherBalance = useEtherBalance(account)

  return (
    <>
      <div>Account: {account}</div>
      <div>Token2 Balance: {formatUnits(tokenBalance ?? ethers.constants.Zero, 18)}</div>
      <div>Ether Balance: {formatUnits(etherBalance ?? ethers.constants.Zero, 18)}</div>
        <button onClick={toggle}>{account ? 'Change Wallet' : 'Connect Wallet'}</button>

      {isShown && (
        <ConnectWalletModal
          isShown={isShown}
          onRequestClose={toggle}
        />
      )}

      <br/>
      <br/>
      <button onClick={() => doThis()}>{isStart ? 'Play' : 'Pause'}</button>

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
