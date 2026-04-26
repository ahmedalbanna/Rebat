import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Users, Bus, CreditCard, Settings, ShieldCheck, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';

export default function AdminLayout() {
  const { pathname } = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Trips', path: '/admin/trips', icon: Bus },
    { name: 'Finance', path: '/admin/finance', icon: CreditCard },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">R</div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">REBAT</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Admin Engine</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          <div className="mb-4 px-3">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Main Menu</p>
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-600")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
           <Button variant="ghost" className="w-full justify-start gap-3 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl" onClick={signOut}>
              <LogOut className="w-5 h-5" />
              Sign Out
           </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200 px-8 py-4 flex justify-between items-center md:hidden">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-sm">R</div>
              <h1 className="font-bold text-slate-800">REBAT Admin</h1>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Live</span>
              </div>
           </div>
        </header>
        
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
