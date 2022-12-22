import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import BankAbi from "../artifacts/Bank.json";
import TxAllowListAbi from "../artifacts/IAllowList.json";
import { Bank as BankType } from "../types";
import { IAllowList as TxAllowListType } from "../types";
import { getEthereum } from "../utils/ethereum";

export const BankAddress = "0x8C6dFbFC0b3e83cBBB82E4b5A187Bc9C0EcE0630";
export const TxAllowListAddress = "0x0200000000000000000000000000000000000002";

type PropsUseContract = {
  currentAccount: string | undefined;
};

type ReturnUseContract = {
  bank: BankType | undefined;
  txAllowList: TxAllowListType | undefined;
};

export const useContract = ({
  currentAccount,
}: PropsUseContract): ReturnUseContract => {
  const [bank, setBank] = useState<BankType>();
  const [txAllowList, setTxAllowList] = useState<TxAllowListType>();
  const ethereum = getEthereum();

  const getContract = useCallback(
    (
      contractAddress: string,
      abi: ethers.ContractInterface,
      storeContract: (_: ethers.Contract) => void
    ) => {
      if (!ethereum) {
        console.log("Ethereum object doesn't exist!");
        return;
      }
      if (!currentAccount) {
        // ログインしていない状態でコントラクトの関数を呼び出すと失敗するため
        // currentAccountがundefinedの場合はcontractオブジェクトもundefinedにします。
        console.log("currentAccount doesn't exist!");
        return;
      }
      try {
        // @ts-ignore: ethereum as ethers.providers.ExternalProvider
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner(); // 簡易実装のため, 引数なし = 初めのアカウント(account#0)を使用する
        const Contract = new ethers.Contract(contractAddress, abi, signer);
        storeContract(Contract);
      } catch (error) {
        console.log(error);
      }
    },
    [ethereum, currentAccount]
  );

  useEffect(() => {
    getContract(BankAddress, BankAbi.abi, (Contract: ethers.Contract) => {
      setBank(Contract as BankType);
    });
    getContract(
      TxAllowListAddress,
      TxAllowListAbi.abi,
      (Contract: ethers.Contract) => {
        setTxAllowList(Contract as TxAllowListType);
      }
    );
  }, [ethereum, currentAccount, getContract]);

  return {
    bank: bank,
    txAllowList: txAllowList,
  };
};
