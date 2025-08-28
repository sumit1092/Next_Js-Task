"use client";

import { useState } from "react";
import Header from "@/app/components/Header/Header";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import "@/app/components/Layout/SiteLayout.css";

function DashboardLayout({ children }) {
  const [hideSidebar, setHideSidebar] = useState(false);

  const handleCompressSidebar = () => {
    setHideSidebar((prev) => !prev);
  };

  return (
    <div className="dashboard-layout">
      <Header setShowSidebar={handleCompressSidebar} />

      <div className="dashboard-body">
        <Sidebar
          hideSidebar={hideSidebar}
          handleCompressSidebar={handleCompressSidebar}
        />

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;