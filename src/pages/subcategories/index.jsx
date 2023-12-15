import AuthProvider from "@/context/auth";
import Layout from "@/layout";
import SubcategoriesTable from "@/widgets/subcategories-table";

const Subcategories = () => {
  return (
    <AuthProvider>
      <Layout>
        <SubcategoriesTable />
      </Layout>
    </AuthProvider>
  );
};

export default Subcategories;
