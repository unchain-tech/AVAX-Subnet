import IssuerBillCards from '../components/Card/IssuerBillCards';
import RecipientBillCards from '../components/Card/RecipientBillCards';
import Layout from '../components/Layout/Layout';

export default function ViewBills() {
  return (
    <Layout>
      <div className="xl:flex lg:flex md:flex justify-around bg-gradient-to-r from-sky-500 to-indigo-500">
        <RecipientBillCards />
        <IssuerBillCards />
      </div>
    </Layout>
  );
}
