import AuthProvider from "@/context/auth";
import BrandsTable from "@/widgets/brands-table";
import Layout from "@/layout"

const Brands = () => {
  return (
    <AuthProvider>
      <Layout>
        <BrandsTable />
      </Layout>
    </AuthProvider>
  );
};

export default Brands;
