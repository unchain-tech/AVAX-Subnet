import IssueBillForm from "../components/Form/IssueBillForm";
import Layout from "../components/Layout/Layout";

export default function IssueBill() {
  return (
    <body>
      <Layout>
        <div className="flex justify-around bg-gradient-to-r from-sky-500 to-indigo-500 h-screen">
          <IssueBillForm message={"IssueBill"} />
        </div>
      </Layout>
    </body>
  );
}
