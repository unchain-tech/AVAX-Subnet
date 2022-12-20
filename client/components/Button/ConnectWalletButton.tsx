import CurrentAccountContext from "../../context/CurrentAccountProvider";
import { useContext } from "react";

export default function ConnectWalletButton() {
  const [currentAccount, connectWallet] = useContext(CurrentAccountContext);

  return (
    <div>
      {currentAccount == undefined ? (
        <div
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={connectWallet}
        >
          Connect to wallet
        </div>
      ) : (
        <div className=""> {"Connected to " + currentAccount} </div>
      )}
    </div>
  );
}
