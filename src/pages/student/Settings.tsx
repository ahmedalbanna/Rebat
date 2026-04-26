import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { User, Smartphone, Bell, Shield, LogOut, Save, Camera, CreditCard } from 'lucide-react';

export default function StudentSettings() {
  const { user, userData, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    phone: userData?.phone || '',
  });

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        phone: formData.phone,
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
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your personal profile and subscription preferences.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="rounded-[32px] border-slate-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-[20px] flex items-center justify-center text-indigo-600 relative group cursor-pointer overflow-hidden">
                 <User className="w-8 h-8" />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                 </div>
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-slate-800">Student Profile</CardTitle>
                <CardDescription className="text-xs">Your personal details for driver identification.</CardDescription>
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
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mobile Number</label>
                  <Input 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="+966"
                    className="rounded-xl border-slate-200 h-11" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-slate-200">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                 <CreditCard className="w-4 h-4 text-indigo-600" /> Default Payment Method
              </CardTitle>
              <CardDescription className="text-xs">Used for automatic subscription renewal.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[8px] text-white font-bold tracking-widest">MADA</div>
                     <span className="text-sm font-bold text-slate-800">Ending in 4210</span>
                  </div>
                  <Button variant="link" className="text-indigo-600 font-bold text-xs p-0">Change</Button>
               </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
             <Button 
               onClick={handleSave} 
               disabled={loading}
               className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-12 h-11 shadow-lg shadow-indigo-100 flex items-center gap-2"
             >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save Profile'}
             </Button>
          </div>
        </div>

        <div className="space-y-6">
           <div className="space-y-2">
             <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl text-slate-600 font-bold hover:bg-slate-100">
                <Bell className="w-4 h-4" /> Notification Prefs
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl text-slate-600 font-bold hover:bg-slate-100">
                <Shield className="w-4 h-4" /> Security & Devices
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
