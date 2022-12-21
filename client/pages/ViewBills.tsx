import { useEffect, useState } from "react";
import ViewBillCard from "../components/Card/ViewBillCard";
import Layout from "../components/Layout/Layout";

export default function ViewBills() {
  const [billsOfRecipient, setBillsOfRecipient] = useState<string[]>([]);
  const [billsOfIssuer, setBillsOfIssuer] = useState<string[]>([]);

  const onClickCash = async (index: number, message: string) => {
    alert(
      "on click Cash:" + JSON.stringify(index) + ":" + JSON.stringify(message)
    );
  };

  const onClickPay = async (index: number, message: string) => {
    alert(
      "on click Pay:" + JSON.stringify(index) + ":" + JSON.stringify(message)
    );
  };

  useEffect(() => {
    let s: string[] = [];
    for (let index = 0; index < 5; index++) {
      s.push("cashContent");
    }
    setBillsOfRecipient(s);

    let p: string[] = [];
    for (let index = 0; index < 5; index++) {
      p.push("payContent");
    }
    setBillsOfIssuer(p);
  }, []);

  return (
    <body>
      <Layout>
        <div className="flex justify-around bg-gradient-to-r from-sky-500 to-indigo-500">
          <div>
            {billsOfRecipient.map((message, index) => {
              return (
                <div key={index} className="flex justify-center">
                  <ViewBillCard
                    title="cash"
                    onClick={() => {
                      onClickCash(index, message);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div>
            {billsOfIssuer.map((message, index) => {
              return (
                <div key={index} className="flex justify-center">
                  <ViewBillCard
                    title="pay"
                    onClick={() => {
                      onClickPay(index, message);
                    }}
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
