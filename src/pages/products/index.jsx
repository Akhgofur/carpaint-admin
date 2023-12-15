import AuthProvider from "@/context/auth";
import Layout from "@/layout";
import dynamic from "next/dynamic";
const ProductsTable = dynamic(() => import("@/widgets/products-table"), {ssr: false});

const Products = () => {
  return (
    <AuthProvider>
      <Layout>
        <ProductsTable />
      </Layout>
    </AuthProvider>
  );
};

export default Products;
