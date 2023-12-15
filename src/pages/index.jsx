import AuthProvider from "@/context/auth";
import DshbHome from "@/widgets";

const { default: Layout } = require("@/layout");

const Home = () => {
  return (
    <AuthProvider>
      <Layout>
        <DshbHome />
      </Layout>
    </AuthProvider>
  );
};

export default Home;
