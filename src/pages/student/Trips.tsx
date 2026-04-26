import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Bus, Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

export default function StudentTrips() {
  const { user } = useAuth();
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    // In a real app, we'd query a trips collection
    // For now, mirroring the "Recent active trips" from the design bento
    const fetchTrips = async () => {
      // Mocking fetch or empty state
      setLoading(false);
    };

    fetchTrips();
  }, [user]);

  const mockTrips = [
    { id: '8902', date: new Date(), route: 'Home to Uni', status: 'Completed', driver: 'Ahmed S.' },
    { id: '8850', date: new Date(Date.now() - 86400000), route: 'Uni to Home', status: 'Completed', driver: 'Ahmed S.' },
    { id: '8821', date: new Date(Date.now() - 172800000), route: 'Home to Uni', status: 'Completed', driver: 'Ahmed S.' },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Trip History</h1>
        <p className="text-slate-500 font-medium mt-1">Review your past university commutes.</p>
      </header>

      <div className="space-y-4">
        {mockTrips.map((trip) => (
          <Card key={trip.id} className="overflow-hidden border-slate-200">
            <CardContent className="p-0">
              <div className="flex items-center p-4">
                <div className="bg-indigo-50 p-3 rounded-2xl mr-4 border border-indigo-100">
                  <Bus className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-800">Trip #{trip.id}</p>
                      <p className="text-xs font-medium text-slate-500">{trip.route}</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">{trip.status}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-4 text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {format(trip.date, 'MMM dd, yyyy')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      7:30 AM
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {trip.driver}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {mockTrips.length === 0 && !loading && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">No trips recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
