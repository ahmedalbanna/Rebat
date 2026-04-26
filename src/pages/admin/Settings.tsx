import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Shield, Users, Bell, DollarSign, Globe, Lock, Save } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<'system' | 'admins' | 'security'>('system');

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">System Configuration</h1>
        <p className="text-slate-500 font-medium mt-1">Control core engine parameters and administrative access.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 space-y-1">
          {[
            { id: 'system', label: 'Engine Settings', icon: Globe },
            { id: 'admins', label: 'Admin Team', icon: Users },
            { id: 'security', label: 'Policies & Security', icon: Lock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === tab.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-slate-500 hover:bg-slate-100"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === 'system' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <Card className="rounded-[32px] border-slate-200">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-slate-800">Dynamic Pricing Engine</CardTitle>
                  <CardDescription className="text-xs">Configure the variables used for automatic fee calculation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Base Monthly Fee (SAR)</label>
                       <Input defaultValue="500" className="rounded-xl border-slate-200" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Base Weekly Fee (SAR)</label>
                       <Input defaultValue="150" className="rounded-xl border-slate-200" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Distance Multiplier (SAR/KM)</label>
                       <Input defaultValue="2.5" className="rounded-xl border-slate-200" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Peak Hour Surcharge (%)</label>
                       <Input defaultValue="15" className="rounded-xl border-slate-200" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[32px] border-slate-200">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-slate-800">Operational Constraints</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                         <p className="text-sm font-bold text-slate-800">Auto-Matching</p>
                         <p className="text-[10px] text-slate-500 font-medium">Automatically pair students with nearest available drivers.</p>
                      </div>
                      <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                         <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                         <p className="text-sm font-bold text-slate-800">Absence Reporting Deadline</p>
                         <p className="text-[10px] text-slate-500 font-medium">How many hours before trip can absence be reported.</p>
                      </div>
                      <div className="flex items-center gap-2">
                         <Input defaultValue="12" className="w-16 h-8 text-center rounded-lg" />
                         <span className="text-xs font-bold text-slate-400">HRS</span>
                      </div>
                   </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'admins' && (
            <Card className="rounded-[32px] border-slate-200 animate-in fade-in slide-in-from-bottom-4">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                   <CardTitle className="text-sm font-bold text-slate-800">Administrative Staff</CardTitle>
                   <CardDescription className="text-xs">Manage workspace permissions for core team.</CardDescription>
                </div>
                <Button size="sm" className="bg-indigo-600 rounded-xl text-xs h-9">+ Add Admin</Button>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="divide-y divide-slate-100">
                    {[
                      { name: 'Ahmed Al-Banna', role: 'Super Admin', email: 'ahmed@rebat.sa' },
                      { name: 'Sara Faisal', role: 'Operations', email: 'sara@rebat.sa' },
                    ].map((admin) => (
                      <div key={admin.email} className="flex items-center justify-between p-4 px-6 hover:bg-slate-50 transition-colors">
                         <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xs">
                               {admin.name.charAt(0)}
                            </div>
                            <div>
                               <p className="text-sm font-bold text-slate-800">{admin.name}</p>
                               <p className="text-[10px] font-medium text-slate-500">{admin.email} • {admin.role}</p>
                            </div>
                         </div>
                         <Button variant="ghost" size="sm" className="text-slate-400 text-xs">Edit</Button>
                      </div>
                    ))}
                 </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end pt-4">
             <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
