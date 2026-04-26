import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, query, limit } from 'firebase/firestore';
import { Bus, MapPin, Clock, Users, Search, Filter, MoreHorizontal, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { cn } from '../../lib/utils';

export default function AdminTrips() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const mockTrips = [
    { id: '8902', student: 'Sarah Ahmed', driver: 'Ahmed Saeed', route: 'Al Olaya -> KSU', status: 'In Progress', time: '07:15 AM' },
    { id: '8905', student: 'Laila Ali', driver: 'Khalid Mohammed', route: 'Al Malqa -> KSU', status: 'Completed', time: '07:30 AM' },
    { id: '8908', student: 'Noura F.', driver: 'Omar Faisal', route: 'Al Wisham -> KSU', status: 'Pending', time: '07:45 AM' },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Global Operations</h1>
          <p className="text-slate-500 font-medium mt-1">Live trip tracking and historical commute logs.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-xl border-slate-200">Export Logs</Button>
           <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6">Manual Dispatch</Button>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="rounded-[24px] border-slate-200 shadow-sm border-l-4 border-l-indigo-600">
           <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Today</CardTitle>
           </CardHeader>
           <CardContent>
              <p className="text-3xl font-bold text-slate-800">142</p>
           </CardContent>
        </Card>
        <Card className="rounded-[24px] border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
           <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed</CardTitle>
           </CardHeader>
           <CardContent>
              <p className="text-3xl font-bold text-slate-800">128</p>
           </CardContent>
        </Card>
        <Card className="rounded-[24px] border-slate-200 shadow-sm border-l-4 border-l-amber-500">
           <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending</CardTitle>
           </CardHeader>
           <CardContent>
              <p className="text-3xl font-bold text-slate-800">14</p>
           </CardContent>
        </Card>
      </div>

      <Card className="rounded-[32px] border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="Search by ID, student or driver..." 
                  className="pl-10 h-10 rounded-xl border-slate-200 focus:ring-indigo-600 text-sm font-medium"
                />
             </div>
             <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-lg gap-2 text-slate-600 font-bold border-slate-200 h-9">
                   <Filter className="w-4 h-4" /> Filter Status
                </Button>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-slate-50/30 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                       <th className="px-6 py-4">Trip ID</th>
                       <th className="px-6 py-4">Participants</th>
                       <th className="px-6 py-4">Route / Time</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {mockTrips.map((trip) => (
                      <tr key={trip.id} className="hover:bg-slate-50 transition-colors">
                         <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-800">#{trip.id}</p>
                            <p className="text-[10px] font-medium text-slate-500">Batch Q-2</p>
                         </td>
                         <td className="px-6 py-4">
                            <div className="space-y-1">
                               <div className="flex items-center gap-2">
                                  <Users className="w-3.5 h-3.5 text-indigo-500" />
                                  <span className="text-xs font-bold text-slate-700">{trip.student}</span>
                               </div>
                               <div className="flex items-center gap-2">
                                  <Bus className="w-3.5 h-3.5 text-emerald-500" />
                                  <span className="text-[10px] font-medium text-slate-500">Driver: {trip.driver}</span>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                               <MapPin className="w-3.5 h-3.5 text-slate-400" />
                               {trip.route}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
                               <Clock className="w-3.5 h-3.5" />
                               {trip.time}
                            </div>
                         </td>
                         <td className="px-6 py-4">
                            <span className={cn(
                               "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit",
                               trip.status === 'Completed' ? "bg-emerald-50 text-emerald-700" :
                               trip.status === 'In Progress' ? "bg-indigo-50 text-indigo-700" : "bg-amber-50 text-amber-700"
                            )}>
                               {trip.status === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-1.5 h-1.5 bg-current rounded-full" />}
                               {trip.status}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600">
                               <MoreHorizontal className="w-5 h-5" />
                            </Button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
