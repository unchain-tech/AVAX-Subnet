import { useEffect, useState } from "react";
import ViewAccountCard from "../components/Card/ViewAccountCard";
import AdminForm from "../components/Form/AdminForm";
import Layout from "../components/Layout/Layout";

export default function Admin() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    let s: string[] = [];
    for (let index = 0; index < 5; index++) {
      s.push("akiyama");
    }
    setItems(s);
  }, []);

  return (
    <body>
      <Layout>
        <div>
          <AdminForm message={"out account"} />
        </div>
        <div>
          {items.map((message, index) => {
            return (
              <div key={index} className="flex justify-center">
                <ViewAccountCard message={message} />
              </div>
            );
          })}
        </div>
      </Layout>
    </body>
  );
}
