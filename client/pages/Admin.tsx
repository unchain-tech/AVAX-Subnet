import { useEffect, useState } from "react";
import AllBillCards from "../components/Card/AllBillCards";
import ViewAccountCard from "../components/Card/ViewAccountCard";
import AdminForm from "../components/Form/AdminForm";
import Layout from "../components/Layout/Layout";

//TODO completeBill
export default function Admin() {
  const [dishonoredAddresses, setDishonoredAddresses] = useState<string[]>([]);

  useEffect(() => {
    let s: string[] = [];
    for (let index = 0; index < 5; index++) {
      s.push("akiyama");
    }
    setDishonoredAddresses(s);
  }, []);

  return (
    <body>
      <Layout>
        <div className="flex justify-around bg-gradient-to-r from-sky-500 to-indigo-500">
          <div>
            <AllBillCards />
          </div>
          <div>
            <div className="my-20">
              <AdminForm />
            </div>
            <div className="my-20 mx-20">
              <div>dishonored</div>
              {dishonoredAddresses.map((address, index) => {
                return (
                  <div key={index} className="flex justify-center">
                    <div className="my-1">
                      <ViewAccountCard address={address} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </body>
  );
}
