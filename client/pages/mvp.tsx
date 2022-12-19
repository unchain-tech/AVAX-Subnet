import type { NextPage } from "next";
import { useCallback, useContext, useEffect, useState } from "react";
import CurrentAccountContext from "../context/CurrentAccountProvider";
import { useContract } from "../hooks/useContract";

const Home: NextPage = () => {
  const [currentAccount, connectWallet] = useContext(CurrentAccountContext);
  const { contract, txAllowList } = useContract({ currentAccount });

  const [value, setValue] = useState("");
  const [address, setAddress] = useState("");

  const getValue = useCallback(async () => {
    if (!currentAccount) {
      alert("connect wallet");
      return;
    }
    if (!contract) return;
    try {
      const num = await contract.get_num();
      setValue(num.toString());
      alert(num.toString());
    } catch (error) {
      alert(error);
    }
  }, [currentAccount, contract]);

  const changeValue = useCallback(async () => {
    if (!currentAccount) {
      alert("connect wallet");
      return;
    }
    if (!contract) return;
    try {
      const txn = await contract.count();
      txn.wait();
      alert("success");
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }, [currentAccount, contract]);

  const enable = useCallback(async () => {
    if (!currentAccount) {
      alert("connect wallet");
      return;
    }
    if (!txAllowList) return;
    try {
      const txn = await txAllowList.setEnabled(address);
      txn.wait();
      alert("success");
    } catch (error) {
      // https://www.freecodecamp.org/news/object-object-in-javascript-meaning-in-js/
      alert(JSON.stringify(error));
    }
  }, [currentAccount, txAllowList, address]);

  const non = useCallback(async () => {
    if (!currentAccount) {
      alert("connect wallet");
      return;
    }
    if (!txAllowList) return;
    try {
      const txn = await txAllowList.setNone(address);
      txn.wait();
      alert("success");
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }, [currentAccount, txAllowList, address]);

  // useEffect(() => {
  //   getValue();
  // }, [getValue]);

  return (
    <div>
      {currentAccount == undefined ? (
        <div onClick={connectWallet}> Connect to wallet </div>
      ) : (
        <div>
          {" "}
          {"Connected to " + currentAccount}
          <p></p>
          <button onClick={getValue}>getValue</button>
          <button onClick={changeValue}>changeValue</button>
          <p>num: {value}</p>
          <div>
            {"address to enable: "}
            <input type="text" onChange={(e) => setAddress(e.target.value)} />
          </div>
          <p>address: {address}</p>
          <button onClick={enable}>enable</button>
          <button onClick={non}>non</button>
        </div>
      )}
    </div>
  );
};

export default Home;
