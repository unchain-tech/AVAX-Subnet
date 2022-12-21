import { useEffect, useState } from "react";
import SubmitButton from "../components/Button/SubmitButton";
import ViewAccountCard from "../components/Card/ViewAccountCard";
import InputField from "../components/Field/InputField";
import Layout from "../components/Layout/Layout";

export default function Admin() {
  const [address, setAddress] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const onClickChange = async () => {
    alert(JSON.stringify(address));
  };

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
        <div className="bg-gradient-to-r from-sky-500 to-indigo-500">
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm h-fit my-10 mx-auto">
            <form>
              <InputField
                label="Address to change access"
                placeholder="address"
                onChange={(value) => setAddress(value)}
              />
              <SubmitButton title="change" onClick={onClickChange} />
            </form>
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
        </div>
      </Layout>
    </body>
  );
}
