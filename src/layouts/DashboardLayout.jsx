import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950 ">
      
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
}