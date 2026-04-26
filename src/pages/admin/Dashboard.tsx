import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Bus, TrendingUp, Users, Settings2, Map as MapIcon, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">System Overview</h1>
          <p className="text-slate-500 font-medium mt-1">Real-time control center for Rebat operations.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">System: Healthy</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm text-xs font-bold text-slate-600">
            Riyadh Central
          </div>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Fleet Tracking Component (Large) */}
        <div className="md:col-span-8 bg-white rounded-[32px] border border-slate-200 overflow-hidden relative shadow-sm min-h-[400px]">
          <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-slate-100">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Live Fleet Tracking</h3>
            <div className="flex gap-6">
              <div>
                <p className="text-2xl font-black text-indigo-600">42</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">In Motion</p>
              </div>
              <div className="border-l border-slate-200 pl-6">
                <p className="text-2xl font-black text-slate-800">186</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Students Onboard</p>
              </div>
            </div>
          </div>
          {/* Stylized Map Placeholder */}
          <div className="w-full h-full bg-slate-100 relative">
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
             {/* Driver Markers */}
             <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-indigo-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
             </div>
             <div className="absolute top-2/3 left-1/2 w-6 h-6 bg-indigo-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
             </div>
             <div className="absolute top-1/2 left-2/3 w-6 h-6 bg-indigo-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
             </div>
             {/* Destination Marker */}
             <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-rose-500 rounded-xl flex items-center justify-center shadow-indigo-200 shadow-xl transform rotate-45">
                <div className="w-3 h-3 bg-white rounded-full"></div>
             </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="md:col-span-4 bg-slate-900 rounded-[32px] p-8 text-white flex flex-col justify-between shadow-2xl shadow-indigo-100">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Regional Revenue</h3>
              <span className="text-[9px] bg-slate-800 px-2 py-1 rounded-lg text-slate-300 font-bold uppercase">Monthly Cycle</span>
            </div>
            <p className="text-4xl font-black mt-4 tracking-tighter">SAR 128,450</p>
            <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              +12.4% vs last period
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-slate-800/40 p-4 rounded-[20px] backdrop-blur">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Driver Payouts</p>
              <p className="text-lg font-bold">SAR 84.2K</p>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-[20px] backdrop-blur border border-slate-700/50">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Net Margin</p>
              <p className="text-lg font-bold text-indigo-400">SAR 44.2K</p>
            </div>
          </div>
        </div>

        {/* User Distribution */}
        <div className="md:col-span-3 bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">User Distribution</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs mb-2 items-center font-bold">
                <span className="text-slate-800">Students</span>
                <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">1,240</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2 items-center font-bold">
                <span className="text-slate-800">Drivers</span>
                <span className="text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg">85</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-slate-800 h-full rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Automation Center */}
        <div className="md:col-span-4 bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Core Automation</h3>
          <div className="space-y-3">
            {[
              { label: 'Auto Matching', active: true },
              { label: 'Dynamic Pricing', active: true },
              { label: 'Auto Finance', active: true },
            ].map((sys) => (
              <div key={sys.label} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
                <span className="text-sm font-bold text-slate-700">{sys.label}</span>
                <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${sys.active ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                   <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Logic (Bento Accent) */}
        <div className="md:col-span-5 bg-indigo-50/80 border border-indigo-100 rounded-[32px] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-4">Dynamic Engine</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-indigo-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Base Rate</p>
                <p className="text-xl font-black text-slate-800">SAR 15.00</p>
              </div>
              <div className="text-indigo-400 font-bold text-2xl">+</div>
              <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-indigo-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Per KM</p>
                <p className="text-xl font-black text-slate-800">SAR 2.50</p>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-indigo-600 mt-6 italic text-center font-medium opacity-80">
            "Automatic adjustment based on distance and load fee"
          </p>
        </div>

        {/* Recent Active Trips (List) */}
        <div className="md:col-span-12 bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Operations</h3>
            <Button variant="link" asChild className="text-xs font-bold text-indigo-600 gap-1 px-0">
               <Link to="/admin/trips">Manage All Trips <ChevronRight className="w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: '8902', driver: 'Ahmed S.', status: 'Pick-up', time: '07:15 AM', color: 'orange' },
              { id: '8905', driver: 'Khalid M.', status: 'En Route', time: '07:30 AM', color: 'indigo' },
              { id: '8908', driver: 'Omar F.', status: 'Arrived', time: '07:45 AM', color: 'emerald' },
            ].map((trip) => (
              <div key={trip.id} className="p-5 border border-slate-100 rounded-3xl hover:border-indigo-100 hover:bg-slate-50/50 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                   <p className="font-black text-slate-800">Trip #{trip.id}</p>
                   <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                     trip.color === 'orange' ? 'bg-orange-100 text-orange-700' : 
                     trip.color === 'indigo' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                   }`}>
                     {trip.status}
                   </span>
                </div>
                <p className="text-xs font-bold text-slate-500 mb-1 group-hover:text-slate-800 transition-colors">Driver: {trip.driver}</p>
                <p className="text-[10px] font-medium text-slate-400">{trip.time} • Batch assignment</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
