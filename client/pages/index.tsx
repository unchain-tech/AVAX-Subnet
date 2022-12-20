import type { NextPage } from "next";
import Layout from "../components/Layout/Layout";

const Home: NextPage = () => {
  return (
    <body>
      <Layout>
        <div className="bg-home min-h-screen bg-cover bg-center object-cover">
          <h1 className="text-5xl font-bold">
            UNCHAIN Finance with blockchain
          </h1>
        </div>
      </Layout>
    </body>
  );
};

export default Home;
