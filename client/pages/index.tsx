import type { NextPage } from "next";
import { useCallback, useContext, useEffect, useState } from "react";
import CurrentAccountContext from "../context/CurrentAccountProvider";
import { useContract } from "../hooks/useContract";

const Home: NextPage = () => {
  const [currentAccount, connectWallet] = useContext(CurrentAccountContext);
  const { contract } = useContract({ currentAccount });

  const [value, setValue] = useState("");

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
          {"Connected to " + currentAccount}{" "}
          <button onClick={getValue}>getValue</button>
          <button onClick={changeValue}>changeValue</button>
          <p>num: {value}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
