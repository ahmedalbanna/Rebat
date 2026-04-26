import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Calendar, Clock, AlertTriangle, Save } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function StudentSchedule() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState<any>({
    sun: { pickup: '07:30', dropoff: '14:00' },
    mon: { pickup: '07:30', dropoff: '14:00' },
    tue: { pickup: '07:30', dropoff: '14:00' },
    wed: { pickup: '07:30', dropoff: '14:00' },
    thu: { pickup: '07:30', dropoff: '14:00' },
  });

  useEffect(() => {
    if (!user) return;
    const fetchSub = async () => {
      const d = await getDoc(doc(db, 'subscriptions', user.uid));
      if (d.exists()) {
        const data = d.data();
        setSubscription(data);
        if (data.schedule) setSchedule(data.schedule);
      }
      setLoading(false);
    };
    fetchSub();
  }, [user]);

  const handleSave = async () => {
    if (!user || !subscription) return;
    if (subscription.scheduleChanged) {
      alert('You have already used your one-time schedule change for this subscription period.');
      return;
    }
    
    try {
      await updateDoc(doc(db, 'subscriptions', user.uid), {
        schedule,
        scheduleChanged: true
      });
      alert('Schedule updated successfully!');
      setSubscription({...subscription, scheduleChanged: true});
    } catch (e) {
      console.error(e);
    }
  };

  const days = [
    { key: 'sun', label: 'Sunday' },
    { key: 'mon', label: 'Monday' },
    { key: 'tue', label: 'Tuesday' },
    { key: 'wed', label: 'Wednesday' },
    { key: 'thu', label: 'Thursday' },
  ];

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium">Loading schedule...</div>;

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Weekly Schedule</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your fixed pickup and drop-off times.</p>
      </header>

      {!subscription ? (
         <Card className="border-dashed border-2 border-slate-300 bg-slate-50 shadow-none text-center p-12">
            <p className="text-slate-500 font-medium">Please subscribe first to set your schedule.</p>
         </Card>
      ) : (
        <div className="space-y-6">
          <Card className="border-amber-100 bg-amber-50 shadow-none overflow-hidden">
             <CardContent className="p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                   <p className="text-sm font-bold text-amber-900">One-Time Change Policy</p>
                   <p className="text-xs text-amber-700 font-medium leading-relaxed">
                     To maintain efficient driver matching, you are only allowed one schedule modification per subscription period.
                   </p>
                </div>
             </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
               <CardTitle className="text-sm font-bold text-slate-800">Commute Timings</CardTitle>
               <CardDescription className="text-xs font-medium">Set when the driver should pick you up from home and when you leave the university.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-100">
                  {days.map((day) => (
                    <div key={day.key} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-6 hover:bg-slate-50/50 transition-colors">
                       <span className="font-bold text-slate-800 tracking-tight">{day.label}</span>
                       <div className="flex items-center gap-3">
                         <div className="relative flex-1">
                           <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                           <Input 
                             type="time" 
                             className="pl-9 h-9 rounded-xl border-slate-200 focus:ring-indigo-600 text-sm font-medium"
                             value={schedule[day.key].pickup} 
                             onChange={(e) => setSchedule({...schedule, [day.key]: {...schedule[day.key], pickup: e.target.value}})}
                           />
                         </div>
                         <span className="text-[10px] uppercase font-bold text-slate-400">To Uni</span>
                       </div>
                       <div className="flex items-center gap-3">
                         <div className="relative flex-1">
                           <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                           <Input 
                             type="time" 
                             className="pl-9 h-9 rounded-xl border-slate-200 focus:ring-indigo-600 text-sm font-medium" 
                             value={schedule[day.key].dropoff}
                             onChange={(e) => setSchedule({...schedule, [day.key]: {...schedule[day.key], dropoff: e.target.value}})}
                           />
                         </div>
                         <span className="text-[10px] uppercase font-bold text-slate-400">To Home</span>
                       </div>
                    </div>
                  ))}
               </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
             <Button 
               onClick={handleSave} 
               disabled={subscription?.scheduleChanged}
               className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 flex items-center gap-2"
             >
               <Save className="w-4 h-4" />
               Save Schedule
             </Button>
          </div>
        </div>
      )}
    </div>
  );
}
