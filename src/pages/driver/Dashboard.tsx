import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { MapPin, Navigation, Users, CreditCard } from 'lucide-react';

export default function DriverDashboard() {
  const { userData } = useAuth();
  
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Driver Portal</h1>
        <p className="text-slate-500 font-medium mt-1">Welcome back, {userData?.name}</p>
      </header>

      <Card className="border-emerald-100 bg-emerald-50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            Active Trip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                 <div className="flex items-start gap-3">
                   <div className="bg-white p-2 rounded-2xl shadow-sm border border-emerald-100 mt-0.5">
                     <Users className="w-4 h-4 text-emerald-600" />
                   </div>
                   <div>
                     <p className="font-bold text-slate-800">4 Students</p>
                     <p className="text-xs font-medium text-slate-500">Al Olaya to King Saud University</p>
                   </div>
                 </div>
              </div>
            </div>
            <div className="flex flex-col justify-center border-t border-emerald-200 pt-4 md:pt-0 md:border-t-0 md:border-l md:pl-6">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">Start Navigation</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Monthly Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-800">SAR 0.00</p>
            <p className="text-xs font-medium text-slate-500 mt-1">No trips completed yet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Total Trips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-800">0</p>
            <p className="text-xs font-medium text-slate-500 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
