import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
 
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div>
      <div className="max-w-4xl h-full space-y-8 pb-10">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-white">System Settings</h1>
          <p className="text-slate-500 text-sm">Manage your session, security, and preferences.</p>
        </div>

        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 uppercase mb-4">Account Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">Email</p>
              <p className="text-sm font-medium text-slate-700">{user?.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">Role</p>
              <p className="text-sm font-medium text-slate-700">{user?.role}</p>
            </div>
          </div>
        </div>

        
        <div className="bg-white p-6 rounded-xl border border-rose-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 uppercase mb-4">Security</h3>
          <p className="text-sm text-slate-500 mb-6">
            Ending your session will require you to re-authenticate before accessing the Risk Operations dashboard again.
          </p>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-all font-medium text-sm border border-rose-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout Session
          </button>
        </div>
      </div>
    </div>
  );
}