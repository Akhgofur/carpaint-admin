import { getAdminsList } from "@/data/data.fn";
import { useAdmins } from "@/data/data.service";

const { useRouter } = require("next/router");
const { createContext, useEffect, useState, useMemo } = require("react");

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { push } = useRouter();

  useEffect(() => {
    const isAdmin = async () => {
      if (localStorage.getItem("token")) {
        const res = await getAdminsList();
        if (res?.status == 200) {
          return;
        } else if (res?.status == 401) {
          push("/login");
          return;
        } else {
          push("/login");
          return;
        }
      } else {
        push("/login");
        return;
      }
    };
    isAdmin();
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
