import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { MapPin, Navigation, Users, Clock, CheckCircle2 } from 'lucide-react';

export default function DriverTrips() {
  const { user } = useAuth();
  const [activeTrips, setActiveTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mocking active trips for the driver as per requirements
  const mockTrips = [
    { 
      id: 'T-101', 
      type: 'Morning Run', 
      time: '07:30 AM', 
      students: [
        { name: 'Sarah Ali', pickup: 'Al Olaya', status: 'Pending' },
        { name: 'Laila Khalid', pickup: 'Al Malqa', status: 'Pending' },
      ],
      destination: 'King Saud University',
      status: 'Ready'
    }
  ];

  useEffect(() => {
    // In a real system, we'd listen to assigned trips for this driver
    setLoading(false);
  }, [user]);

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Assigned Trips</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your active student transport routes.</p>
      </header>

      <div className="space-y-6">
        {mockTrips.length > 0 ? (
          mockTrips.map((trip) => (
            <Card key={trip.id} className="border-emerald-100 bg-white overflow-hidden shadow-sm">
              <CardHeader className="bg-emerald-50/50 border-b border-emerald-100 flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-emerald-100 font-bold text-emerald-700 text-xs uppercase tracking-wider">
                    {trip.type}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">{trip.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-full border border-emerald-200">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                   <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">{trip.status}</span>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Student Pickups</h3>
                    <div className="space-y-3">
                      {trip.students.map((student, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="flex items-center gap-3">
                            <Users className="w-4 h-4 text-slate-400" />
                            <div>
                               <p className="text-sm font-bold text-slate-800">{student.name}</p>
                               <p className="text-[10px] font-medium text-slate-500">{student.pickup}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase text-emerald-600 hover:bg-emerald-50">
                            Confirm
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between space-y-6">
                    <div className="space-y-2">
                       <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Destination</h3>
                       <div className="flex items-center gap-2 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                          <MapPin className="w-5 h-5 text-indigo-600" />
                          <span className="font-bold text-slate-800 text-sm">{trip.destination}</span>
                       </div>
                    </div>
                    
                    <div className="flex gap-3">
                       <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 gap-2">
                         <Navigation className="w-5 h-5" />
                         Start Route
                       </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">No trips scheduled for today.</p>
          </div>
        )}
      </div>
    </div>
  );
}
