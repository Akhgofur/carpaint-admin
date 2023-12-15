import AuthProvider from "@/context/auth";
import Layout from "@/layout";
import CategoriesTable from "@/widgets/categories-table";

const Categories = () => {
  return (
    <AuthProvider>
      <Layout>
        <CategoriesTable />
      </Layout>
    </AuthProvider>
  );
};

export default Categories;
