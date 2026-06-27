import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Sidebar() {

  const linkBaseClass = "flex items-center justify-between px-4 py-2.5 rounded-md transition-all duration-150 text-sm font-medium border-l-2";
  const { user } = useContext(AuthContext);
  const navItems = [
  {name:"Dashboard",path:"/dashboard"},
  {name:"Live Monitor",path:"/admin/live-monitor"},
  {name:"Alerts",path:"/admin/alerts"},
  {name:"Cases",path:"/admin/cases"},
  {name:"Analytics",path:"/admin/analytics"},
  {name: "Settings",path:"/settings"}
];
  return (
    <div className="w-64 h-screen bg-slate-950 text-slate-200 flex flex-col justify-between p-6 border-r border-slate-900 sticky top-0 selection:bg-emerald-500/30">
      
    
      <div>
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400" />
          <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
            FraudShield
          </h2>
        </div>
        
       <nav className="flex flex-col gap-1">

{navItems.map(item => (

<NavLink
key={item.path}
to={item.path}
className={({isActive}) =>
`${linkBaseClass}
${isActive
? 'bg-slate-900 text-emerald-400 border-emerald-500'
: 'text-slate-500 border-transparent hover:bg-slate-900/50 hover:text-slate-300'
}`
}
>

<span>{item.name}</span>

</NavLink>

))}

</nav>

        <div className="border-t border-slate-900 pt-5 px-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-xs text-slate-400">
              {user?.name ? user.name.charAt(0) : "U"}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-400">{user?.name || "Analyst Console"}</span>
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">{user?.role || "Secured Node"}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}