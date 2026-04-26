import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, query, limit } from 'firebase/firestore';
import { Users, GraduationCap, Bus, Search, Filter, MoreHorizontal, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { cn } from '../../lib/utils';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'users'), limit(50));
    const unsub = onSnapshot(q, (snapshot) => {
      const u = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">User Management</h1>
          <p className="text-slate-500 font-medium mt-1">Manage student and driver profiles and access controls.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-xl border-slate-200">Export CSV</Button>
           <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6">+ Add User</Button>
        </div>
      </header>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="rounded-[24px] border-slate-200 shadow-sm">
           <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Users</CardTitle>
           </CardHeader>
           <CardContent>
              <p className="text-3xl font-bold text-slate-800">{users.length}</p>
           </CardContent>
        </Card>
        <Card className="rounded-[24px] border-slate-200 shadow-sm">
           <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                Students
              </CardTitle>
           </CardHeader>
           <CardContent>
              <p className="text-3xl font-bold text-slate-800">{users.filter(u => u.role === 'student').length}</p>
           </CardContent>
        </Card>
        <Card className="rounded-[24px] border-slate-200 shadow-sm">
           <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Bus className="w-3.5 h-3.5 text-emerald-600" />
                Drivers
              </CardTitle>
           </CardHeader>
           <CardContent>
              <p className="text-3xl font-bold text-slate-800">{users.filter(u => u.role === 'driver').length}</p>
           </CardContent>
        </Card>
        <Card className="rounded-[24px] border-slate-200 shadow-sm">
           <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                Admins
              </CardTitle>
           </CardHeader>
           <CardContent>
              <p className="text-3xl font-bold text-slate-800">{users.filter(u => u.role === 'admin').length}</p>
           </CardContent>
        </Card>
      </div>

      <Card className="rounded-[32px] border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="Search by name, role or phone..." 
                  className="pl-10 h-10 rounded-xl border-slate-200 focus:ring-indigo-600 text-sm font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-lg gap-2 text-slate-600 font-bold border-slate-200 h-9">
                   <Filter className="w-4 h-4" /> Filter
                </Button>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-slate-50/30 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                       <th className="px-6 py-4">User</th>
                       <th className="px-6 py-4">Role</th>
                       <th className="px-6 py-4">Contact</th>
                       <th className="px-6 py-4">Account Status</th>
                       <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                               <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
                                  {u.name?.charAt(0) || 'U'}
                               </div>
                               <div>
                                  <p className="text-sm font-bold text-slate-800">{u.name}</p>
                                  <p className="text-[10px] font-medium text-slate-500">ID: {u.id.substring(0, 8)}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-4">
                            <span className={cn(
                               "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                               u.role === 'student' ? "bg-indigo-50 text-indigo-700" :
                               u.role === 'driver' ? "bg-emerald-50 text-emerald-700" :
                               u.role === 'admin' ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-400"
                            )}>
                               {u.role || 'New'}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-sm font-medium text-slate-600">
                            {u.phone || 'N/A'}
                         </td>
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5">
                               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                               <span className="text-xs font-bold text-slate-700">Verified</span>
                            </div>
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
           {filteredUsers.length === 0 && (
             <div className="text-center py-20">
                <p className="text-slate-500 font-medium italic">No users found matching your search.</p>
             </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
