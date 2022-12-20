import IssueBillForm from "../components/Form/IssueBillForm";
import Layout from "../components/Layout/Layout";

export default function IssueBill() {
  return (
    <body>
      <Layout>
        <IssueBillForm message={"IssueBill"} />
      </Layout>
    </body>
  );
}
