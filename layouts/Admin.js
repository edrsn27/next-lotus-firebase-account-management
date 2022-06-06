import { useEffect } from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import { useAuth } from "context/AuthProvider";
import { useRouter } from "next/router";
import PageChange from "components/PageChange/PageChange.js";

export default function Admin({ children }) {
  const router = useRouter();
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && !currentUser) router.push("/auth/login");
  }, [currentUser, loading]);
  if (!currentUser) return "loading...";
  if (currentUser)
    return (
      <>
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
          <AdminNavbar />
          {/* Header */}
          <HeaderStats />
          <div className="w-full px-4 mx-auto -m-24 md:px-10">
            {children}
            <FooterAdmin />
          </div>
        </div>
      </>
    );
}
