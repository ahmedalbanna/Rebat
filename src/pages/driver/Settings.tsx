import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { User, Smartphone, Bell, Shield, LogOut, Save, Bus, Camera } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function DriverSettings() {
  const { user, userData, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    phone: userData?.phone || '',
    vehicleModel: 'Toyota Camry 2023',
    plateNumber: 'ABC 1234',
  });

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        phone: formData.phone,
        vehicleModel: formData.vehicleModel,
        plateNumber: formData.plateNumber,
      });
      alert('Profile updated successfully');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Driver Settings</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your professional profile and vehicle information.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="rounded-[32px] border-slate-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 relative group cursor-pointer overflow-hidden">
                 <User className="w-8 h-8" />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                 </div>
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-slate-800">Personal Information</CardTitle>
                <CardDescription className="text-xs">Your public profile seen by students.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <Input 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="rounded-xl border-slate-200 h-11" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                  <Input 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="rounded-xl border-slate-200 h-11" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-slate-200">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                 <Bus className="w-4 h-4 text-emerald-600" /> Vehicle Details
              </CardTitle>
              <CardDescription className="text-xs">Registered vehicle used for student pickups.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Model & Year</label>
                   <Input 
                     value={formData.vehicleModel} 
                     onChange={e => setFormData({...formData, vehicleModel: e.target.value})}
                     className="rounded-xl border-slate-200 h-11" 
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plate Number</label>
                   <Input 
                     value={formData.plateNumber} 
                     onChange={e => setFormData({...formData, plateNumber: e.target.value})}
                     className="rounded-xl border-slate-200 h-11" 
                   />
                 </div>
               </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
             <Button 
               onClick={handleSave} 
               disabled={loading}
               className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-10 h-11 shadow-lg shadow-emerald-100 flex items-center gap-2"
             >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save Settings'}
             </Button>
          </div>
        </div>

        <div className="space-y-6">
           <Card className="rounded-[32px] border-slate-200 bg-slate-50 shadow-none">
              <CardHeader>
                 <CardTitle className="text-xs font-bold text-slate-800 uppercase tracking-widest">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">Account Verified</span>
                    <div className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">Active</div>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">Background Check</span>
                    <div className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">Passed</div>
                 </div>
              </CardContent>
           </Card>

           <div className="space-y-2">
             <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl text-slate-600 font-bold hover:bg-slate-100">
                <Bell className="w-4 h-4" /> Notifications
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl text-slate-600 font-bold hover:bg-slate-100">
                <Shield className="w-4 h-4" /> Security & Privacy
             </Button>
             <div className="pt-4 mt-4 border-t border-slate-100">
                <Button 
                  onClick={signOut}
                  variant="ghost" 
                  className="w-full justify-start gap-3 rounded-xl text-rose-600 font-bold hover:bg-rose-50 hover:text-rose-700"
                >
                   <LogOut className="w-4 h-4" /> Log Out
                </Button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
