import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { MapPin, Calendar, Clock, CreditCard } from 'lucide-react';

export default function Subscribe() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  // Form State
  const [subscriptionType, setSubscriptionType] = useState<'monthly' | 'weekly'>('monthly');
  const [homePoint, setHomePoint] = useState('');
  const [university, setUniversity] = useState('');
  
  // Pricing logic (Mocked dynamic pricing)
  const basePrice = subscriptionType === 'monthly' ? 500 : 150;
  const distanceMultiplier = Math.random() * 50 + 10; // Dummy
  const finalPrice = Math.floor(basePrice + distanceMultiplier);

  const handleSubscribe = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Create subscription in DB
      await setDoc(doc(db, 'subscriptions', user.uid), {
        studentId: user.uid,
        type: subscriptionType,
        homePoint,
        university,
        price: finalPrice,
        status: 'active',
        createdAt: new Date().toISOString()
      });
      // In a real app we'd redirect to a payment gateway first
      navigate('/student');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">New Subscription</h1>
        <p className="text-slate-500 font-medium mt-1">Set up your weekly or monthly transport schedule.</p>
      </header>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">1. Route Details</CardTitle>
            <CardDescription className="text-xs font-medium">Enter your pickup and dropoff locations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
               <label className="text-sm font-medium">Home Location (GPS/Area)</label>
               <div className="relative">
                 <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                 <Input 
                   className="pl-10" 
                   placeholder="e.g. Al Olaya, Riyadh" 
                   value={homePoint}
                   onChange={e => setHomePoint(e.target.value)}
                 />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-sm font-medium">University / Workspace</label>
               <div className="relative">
                 <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                 <Input 
                   className="pl-10" 
                   placeholder="e.g. King Saud University" 
                   value={university}
                   onChange={e => setUniversity(e.target.value)}
                 />
               </div>
            </div>
            
            <Button onClick={() => setStep(2)} disabled={!homePoint || !university} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
              Continue
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">2. Schedule & Plan</CardTitle>
            <CardDescription className="text-xs font-medium">Select your active days and plan duration.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex gap-4">
                <Card className={`flex-1 cursor-pointer transition-colors shadow-none rounded-2xl ${subscriptionType === 'monthly' ? 'border-indigo-600 bg-indigo-50' : 'hover:bg-slate-50'}`}
                      onClick={() => setSubscriptionType('monthly')}>
                  <CardContent className="p-4 text-center">
                     <p className="font-bold text-lg">Monthly</p>
                     <p className="text-xs font-medium text-slate-500">Best value</p>
                  </CardContent>
                </Card>
                <Card className={`flex-1 cursor-pointer transition-colors shadow-none rounded-2xl ${subscriptionType === 'weekly' ? 'border-indigo-600 bg-indigo-50' : 'hover:bg-slate-50'}`}
                      onClick={() => setSubscriptionType('weekly')}>
                  <CardContent className="p-4 text-center">
                     <p className="font-bold text-lg">Weekly</p>
                     <p className="text-xs font-medium text-slate-500">Flexible</p>
                  </CardContent>
                </Card>
             </div>

             <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                <h4 className="font-bold flex items-center gap-2 mb-1 text-slate-800"><Clock className="w-4 h-4 text-slate-400"/> Fixed Schedule Notice</h4>
                <p className="text-xs font-medium text-slate-500">Your schedule will be locked to match you with a driver. You can only change it once per subscription period.</p>
             </div>

             <Button onClick={() => setStep(3)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
              Calculate Price
             </Button>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">3. Payment & Confirmation</CardTitle>
            <CardDescription className="text-xs font-medium">Review your dynamic price generated automatically.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-3xl p-6">
               <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">{subscriptionType} Plan</p>
                    <h3 className="text-3xl font-bold text-slate-800 mt-1">SAR {finalPrice}</h3>
                  </div>
                  <CreditCard className="w-8 h-8 text-indigo-300" />
               </div>
               
               <ul className="space-y-2 text-xs font-medium text-slate-500 border-t border-indigo-100 pt-4">
                 <li className="flex justify-between">
                   <span>Base Price</span>
                   <span>SAR {basePrice}</span>
                 </li>
                 <li className="flex justify-between">
                   <span>Distance & Load Fee</span>
                   <span>SAR {finalPrice - basePrice}</span>
                 </li>
               </ul>
            </div>

            <Button onClick={handleSubscribe} disabled={loading} className="w-full text-lg h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
              {loading ? 'Processing...' : 'Pay & Subscribe'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
