import type { ReactNode } from "react";
import { DashboardLayout } from "./sidebar";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex">
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}

export default Layout;
