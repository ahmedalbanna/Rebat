import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, Calendar, CreditCard, Settings, Navigation } from 'lucide-react';
import { cn } from '../lib/utils';

export default function DriverLayout() {
  const { pathname } = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/driver', icon: Home },
    { name: 'Trips', path: '/driver/trips', icon: Navigation },
    { name: 'Earnings', path: '/driver/earnings', icon: CreditCard },
    { name: 'Settings', path: '/driver/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 font-sans">
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-white border-r border-slate-800">
        <div className="p-6 flex items-center gap-3">
          <Navigation className="w-8 h-8 text-emerald-400" />
          <h1 className="text-2xl font-bold tracking-tight">REBAT Driver</h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/driver' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive ? "bg-emerald-500/10 text-emerald-400 font-bold" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto pb-16 md:pb-0">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 text-white border-t border-slate-800 safe-area-pb z-50">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/driver' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex flex-col items-center py-3 px-2 flex-1",
                  isActive ? "text-emerald-400" : "text-slate-500"
                )}
              >
                <item.icon className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
