import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Bus, MapPin, Calendar, CreditCard } from 'lucide-react';

export default function Login() {
  const { user, signIn } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center border border-slate-200 bg-white rounded-3xl overflow-hidden shadow-xl">
        
        {/* Marketing / Presentation Side */}
        <div className="bg-indigo-600 p-10 text-white flex flex-col justify-center h-full">
          <div className="flex items-center gap-3 mb-6">
            <Bus className="w-10 h-10" />
            <h1 className="text-4xl font-bold tracking-tight">Rebat</h1>
          </div>
          <p className="text-xl text-indigo-100 mb-8 max-w-sm font-medium">
            Smart transportation matching students and drivers for a seamless university commute.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-500 rounded-full p-2 mt-1">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Fixed Schedules</h3>
                <p className="text-indigo-200 text-sm">Monthly or weekly subscriptions based on your classes.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-indigo-500 rounded-full p-2 mt-1">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Live Tracking</h3>
                <p className="text-indigo-200 text-sm">Know exactly where your driver is before the trip starts.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-indigo-500 rounded-full p-2 mt-1">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Dynamic Pricing</h3>
                <p className="text-indigo-200 text-sm">Fair pricing based automatically on distance and trip duration.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Side */}
        <div className="p-10 flex flex-col justify-center items-center h-full">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-500 mb-8">Sign in to manage your transportation.</p>

            <Button onClick={signIn} size="lg" className="w-full text-base rounded-xl" variant="outline">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Button>
            
            <p className="text-center text-xs text-slate-500 mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
