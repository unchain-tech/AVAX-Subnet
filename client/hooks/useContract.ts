import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import Contract from "../artifacts/Counter.json";
import { Counter as ContractType } from "../types";
import { getEthereum } from "../utils/ethereum";

export const ContractAddress = "0x6593B6F30BEA2C6e9d9d92Ed4B6fAf2e21D028f5";

type PropsUseContract = {
  currentAccount: string | undefined;
};

type ReturnUseContract = {
  contract: ContractType | undefined;
};

export const useContract = ({
  currentAccount,
}: PropsUseContract): ReturnUseContract => {
  const [contract, setContract] = useState<ContractType>();
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
    getContract(ContractAddress, Contract.abi, (Contract: ethers.Contract) => {
      setContract(Contract as ContractType);
    });
  }, [ethereum, currentAccount, getContract]);

  return {
    contract,
  };
};
