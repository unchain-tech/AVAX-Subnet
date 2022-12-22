import { useCallback, useContext, useEffect, useState } from "react";
import ViewBillCard, { BillType } from "../components/Card/ViewBillCard";
import Layout from "../components/Layout/Layout";
import CurrentAccountContext from "../context/CurrentAccountProvider";
import { useContract } from "../hooks/useContract";
import { sameAddresses } from "../utils/compare";
import { weiToAvax } from "../utils/formatter";

//TODO 整理
//TODO billの状態で色やボタンdisableかえる
export default function ViewBills() {
  const [currentAccount] = useContext(CurrentAccountContext);
  const { bank } = useContract({ currentAccount });

  const [billsOfRecipient, setBillsOfRecipient] = useState<BillType[]>([]);
  const [billsOfIssuer, setBillsOfIssuer] = useState<BillType[]>([]);

  const getBills = useCallback(async () => {
    if (!currentAccount) {
      alert("connect wallet");
      return;
    }
    if (!bank) return;
    try {
      const numOfBills = await bank.getNumberOfBills();

      for (let index = 0; index < numOfBills.toNumber(); index++) {
        const billOrigin = await bank.allBills(index);
        const bill: BillType = {
          amount: weiToAvax(billOrigin.amount),
          dueDate: "0",
          issuer: billOrigin.issuer,
          recipient: billOrigin.recipient,
          active: true,
        };

        if (sameAddresses(bill.issuer, currentAccount)) {
          setBillsOfIssuer((prevState) => [...prevState, bill]);
        }
        if (sameAddresses(bill.recipient, currentAccount)) {
          setBillsOfRecipient((prevState) => [...prevState, bill]);
        }
      }
    } catch (error) {
      alert(error);
    }
  }, [currentAccount, bank]);

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

  const onClickPay = async (id: number) => {
    if (!currentAccount) {
      alert("connect wallet");
      return;
    }
    if (!bank) return;
    try {
      const amount = await bank.getAmountToPayBill(id);

      const txn = await bank.lockToken({ value: amount });
      await txn.wait();

      alert("Success");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getBills();
  }, [getBills]);

  return (
    <body>
      <Layout>
        <div className="flex justify-around bg-gradient-to-r from-sky-500 to-indigo-500">
          <div>
            {billsOfRecipient.map((bill, index) => {
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
            })}
          </div>
          <div>
            {billsOfIssuer.map((bill, index) => {
              return (
                <div key={index}>
                  <ViewBillCard
                    title="Bill to pay"
                    button="pay"
                    onClick={() => {
                      onClickPay(index);
                    }}
                    bill={bill}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </body>
  );
}
