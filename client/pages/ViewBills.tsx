import Layout from "../components/Layout/Layout";
import RecipientBillCards from "../components/Card/RecipientBillCards";
import IssuerBillCards from "../components/Card/IssuerBillCards";

export default function ViewBills() {
  return (
    <body>
      <Layout>
        <div className="flex justify-around bg-gradient-to-r from-sky-500 to-indigo-500">
          <RecipientBillCards />
          <IssuerBillCards />
        </div>
      </Layout>
    </body>
  );
}
