import { useEffect, useState } from "react";
import ViewCard from "../components/Card/ViewCard";
import Layout from "../components/Layout/Layout";

export default function ViewBills() {
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
        <div className="flex justify-around">
          <div>
            {items.map((message, index) => {
              return (
                <div key={index} className="flex justify-center">
                  <ViewCard message={message} />
                </div>
              );
            })}
          </div>
          <div>
            {items.map((message, index) => {
              return (
                <div key={index} className="flex justify-center">
                  <ViewCard message={message} />
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </body>
  );
}
