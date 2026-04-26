import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, Calendar, CreditCard, Settings, Bus } from 'lucide-react';
import { cn } from '../lib/utils';

export default function StudentLayout() {
  const { pathname } = useLocation();

  const navItems = [
    { name: 'Home', path: '/student', icon: Home },
    { name: 'Trips', path: '/student/trips', icon: Bus },
    { name: 'Schedule', path: '/student/schedule', icon: Calendar },
    { name: 'Billing', path: '/student/billing', icon: CreditCard },
    { name: 'Settings', path: '/student/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200">
        <div className="p-6 flex items-center gap-3">
          <Bus className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">REBAT</h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/student' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive ? "bg-indigo-50 text-indigo-700 font-bold" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-16 md:pb-0">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 safe-area-pb z-50">
        <div className="flex justify-around">
          {navItems.slice(0, 4).map((item) => {
            const isActive = pathname === item.path || (item.path !== '/student' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex flex-col items-center py-3 px-2 flex-1",
                  isActive ? "text-indigo-600" : "text-slate-400"
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
