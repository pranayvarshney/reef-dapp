import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { WsProvider } from "@polkadot/rpc-provider";
import { Provider, Signer } from "@reef-defi/evm-provider";
import Uik from "@reef-defi/ui-kit";
import { Contract } from "ethers";
import { useState } from "react";
// import "./App.css";
// import reactLogo from "./assets/react.svg";
// import GreeterContract from "./contracts/Greeter.json";

function App() {
  const [count, setCount] = useState(0);
  const URL = "wss://rpc-testnet.reefscan.com/ws";
  const [signer, setSigner] = useState();
  const [isWalletConnected, setWalletConnected] = useState(false);

  const checkExtension = async () => {
    let allInjected = await web3Enable("Reef");

    if (allInjected.length === 0) {
      return false;
    }

    let injected;
    if (allInjected[0] && allInjected[0].signer) {
      injected = allInjected[0].signer;
    }

    const evmProvider = new Provider({
      provider: new WsProvider(URL),
    });

    evmProvider.api.on("ready", async () => {
      const allAccounts = await web3Accounts();

      allAccounts[0] && allAccounts[0].address && setWalletConnected(true);

      console.log(allAccounts);

      const wallet = new Signer(evmProvider, allAccounts[0].address, injected);

      // Claim default account
      if (!(await wallet.isClaimed())) {
        console.log(
          "No claimed EVM account found -> claimed default EVM account: ",
          await wallet.getAddress()
        );
        await wallet.claimDefaultAccount();
      }

      setSigner(wallet);
    });
  };

  return <div className="App">

    
  </div>;
}

export default App;
