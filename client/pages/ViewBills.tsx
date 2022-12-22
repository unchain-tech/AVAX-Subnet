import { useCallback, useContext, useEffect, useState } from "react";
import ViewBillCard, { BillType } from "../components/Card/ViewBillCard";
import Layout from "../components/Layout/Layout";
import CurrentAccountContext from "../context/CurrentAccountProvider";
import { useContract } from "../hooks/useContract";
import { weiToAvax } from "../utils/formatter";

export default function ViewBills() {
  const [currentAccount] = useContext(CurrentAccountContext);
  const { bank } = useContract({ currentAccount });

  const [billsOfRecipient, setBillsOfRecipient] = useState<BillType[]>([]);
  const [billsOfIssuer, setBillsOfIssuer] = useState<BillType[]>([]);

  const sameAddresses = (address1: string, address2: string) => {
    return address1.toLocaleLowerCase() === address2.toLocaleLowerCase();
  };

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

  const onClickCash = async (index: number, bill: BillType) => {
    alert(
      "on click Cash:" + JSON.stringify(index) + ":" + JSON.stringify(bill)
    );
  };

  const onClickPay = async (index: number, bill: BillType) => {
    alert("on click Pay:" + JSON.stringify(index) + ":" + JSON.stringify(bill));
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
                      onClickCash(index, bill);
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
                      onClickPay(index, bill);
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
