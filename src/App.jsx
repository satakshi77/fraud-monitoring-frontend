import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import LiveMonitor from "./pages/LiveMonitor";
import AlertDesk from "./pages/AlertDesk";
import Cases from "./pages/Cases";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import Unauthorized from "./pages/Unauthorized";

import AuthProvider from "./context/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
      <Routes>

       
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

       
        <Route
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

      
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/live-monitor" element={<LiveMonitor />} />
          <Route path="/admin/alerts" element={<AlertDesk />} />
          <Route path="/admin/cases" element={<Cases />} />
          <Route path="/admin/analytics" element={<Analytics />} />
        </Route>

      </Routes>
  );
}