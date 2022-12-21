import { useEffect, useState } from "react";
import ViewBillCard, { BillType } from "../components/Card/ViewBillCard";
import Layout from "../components/Layout/Layout";

export default function ViewBills() {
  const [billsOfRecipient, setBillsOfRecipient] = useState<BillType[]>([]);
  const [billsOfIssuer, setBillsOfIssuer] = useState<BillType[]>([]);

  const onClickCash = async (index: number, bill: BillType) => {
    alert(
      "on click Cash:" + JSON.stringify(index) + ":" + JSON.stringify(bill)
    );
  };

  const onClickPay = async (index: number, bill: BillType) => {
    alert("on click Pay:" + JSON.stringify(index) + ":" + JSON.stringify(bill));
  };

  useEffect(() => {
    let s: BillType[] = [];
    for (let index = 0; index < 5; index++) {
      let c: BillType = {
        amount: "10",
        dueDate: "2022",
        issuer: "issuer",
        recipient: "recipient",
        active: true,
      };
      s.push(c);
    }
    setBillsOfRecipient(s);

    let p: BillType[] = [];
    for (let index = 0; index < 5; index++) {
      let c: BillType = {
        amount: "10",
        dueDate: "2022",
        issuer: "issuer",
        recipient: "recipient",
        active: true,
      };
      p.push(c);
    }
    setBillsOfIssuer(p);
  }, []);

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
