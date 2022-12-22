import { useContext } from "react";
import CurrentAccountContext from "../../context/CurrentAccountProvider";
import { BillType, useContract } from "../../hooks/useContract";
import { sameAddresses } from "../../utils/compare";
import ViewBillCard from "./ViewBillCard";

export default function RecipientBillCards() {
  const [currentAccount] = useContext(CurrentAccountContext);
  const { bank, bills } = useContract({ currentAccount });

  const onClickCash = async (id: number) => {
    if (!currentAccount) {
      alert("connect wallet");
      return;
    }
    if (!bank) return;
    try {
      const txn = await bank.cashBill(id);
      await txn.wait();

      alert("Success");
    } catch (error) {
      alert(error);
    }
  };

  const callBackFn = (bill: BillType, index: number) => {
    if (currentAccount === undefined) return <div></div>;
    if (!sameAddresses(bill.recipient, currentAccount)) return <div></div>;
    return (
      <div key={index}>
        <ViewBillCard
          title="Bill to cash"
          button="cash"
          onClick={() => {
            onClickCash(index);
          }}
          bill={bill}
        />
      </div>
    );
  };

  return <div>{bills.map(callBackFn)}</div>;
}
