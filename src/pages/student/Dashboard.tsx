import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Bus, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { format, addHours, isBefore } from 'date-fns';

export default function StudentDashboard() {
  const { user, userData } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(doc(db, 'subscriptions', user.uid), (doc) => {
      if (doc.exists()) {
        setSubscription(doc.data());
      } else {
        setSubscription(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  const reportAbsence = async () => {
    if (!user || !subscription) return;
    
    // Rule: Absence must be reported at least 12 hours before trip
    // For demo purposes, we'll assume the next trip is tomorrow at 7:30 AM
    const nextTripTime = new Date();
    nextTripTime.setDate(nextTripTime.getDate() + 1);
    nextTripTime.setHours(7, 30, 0, 0);

    const deadline = addHours(new Date(), 12);
    
    if (isBefore(deadline, nextTripTime)) {
      try {
        await updateDoc(doc(db, 'subscriptions', user.uid), {
          absences: arrayUnion(format(nextTripTime, 'yyyy-MM-dd'))
        });
        alert('Absence reported successfully.');
      } catch (e) {
        console.error(e);
      }
    } else {
      alert('Absence must be reported at least 12 hours before the trip.');
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium">Loading dashboard...</div>;

  const hasActiveSubscription = subscription && subscription.status === 'active';

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Hello, {userData?.name}</h1>
        <p className="text-slate-500 font-medium mt-1">Here is your transportation overview.</p>
      </header>

      {hasActiveSubscription ? (
        <div className="space-y-6">
          <Card className="border-indigo-100 bg-indigo-50 shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                <Bus className="w-4 h-4" />
                Next Trip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-indigo-600 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">Tomorrow, 7:30 AM</p>
                      <p className="text-xs font-medium text-slate-500">Upcoming trip</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">{subscription.homePoint} to {subscription.university}</p>
                      <p className="text-xs font-medium text-slate-500">Fixed Route</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 justify-center border-t border-indigo-200 pt-4 md:pt-0 md:border-t-0 md:border-l md:pl-6">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">Track Driver</Button>
                  <Button 
                    onClick={reportAbsence}
                    variant="outline" 
                    className="w-full text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-300 rounded-xl"
                  >
                    Report Absence
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-dashed border-2 border-slate-300 bg-slate-50 shadow-none rounded-3xl">
          <CardContent className="flex flex-col items-center text-center p-10">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-4">
              <Bus className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">No Active Subscription</h2>
            <p className="text-slate-500 font-medium text-sm mb-6 max-w-md">
              You need an active subscription to start taking trips. Set up your schedule and location to get started.
            </p>
            <Button asChild size="lg" className="rounded-xl bg-indigo-600 hover:bg-indigo-700">
              <Link to="/student/subscribe">Subscribe Now</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">My Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            {hasActiveSubscription ? (
              <div className="space-y-3">
                 <div className="flex justify-between items-center py-2 border-b border-slate-100">
                   <span className="font-bold text-slate-800 text-sm">Sun - Thu</span>
                   <span className="text-slate-500 text-sm font-medium">Standard Hours</span>
                 </div>
                 <Button variant="link" asChild className="px-0 w-full justify-start text-indigo-600 font-bold text-xs">
                    <Link to="/student/schedule">View full schedule</Link>
                 </Button>
              </div>
            ) : (
               <p className="text-xs font-medium text-slate-500 pb-4">Configure your weekly schedule when you subscribe.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plan Details</CardTitle>
          </CardHeader>
          <CardContent>
            {hasActiveSubscription ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-slate-500 uppercase">Type</span>
                  <span className="text-sm font-bold text-slate-800 capitalize">{subscription.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-slate-500 uppercase">Price</span>
                  <span className="text-sm font-bold text-slate-800">SAR {subscription.price}</span>
                </div>
                <Button variant="link" asChild className="px-0 w-full justify-start text-indigo-600 font-bold text-xs">
                    <Link to="/student/billing">Billing History</Link>
                 </Button>
              </div>
            ) : (
               <p className="text-xs font-medium text-slate-500 pb-4">Subscribe to see your plan details.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

