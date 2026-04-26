import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { CreditCard, Download, Receipt, ArrowUpRight } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function StudentBilling() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    const fetchSub = async () => {
      const d = await getDoc(doc(db, 'subscriptions', user.uid));
      if (d.exists()) setSubscription(d.data());
    };
    fetchSub();
  }, [user]);

  const transactions = [
    { id: 'TX-9012', date: 'Apr 01, 2026', amount: subscription?.price || 565, status: 'Paid', method: 'Mada ****4210' },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Billing & Payments</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your subscriptions and view transaction history.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 bg-slate-900 text-white rounded-3xl border-none p-2 overflow-hidden shadow-xl">
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Active Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-3xl font-bold">SAR {subscription?.price || '0.00'}</p>
              <p className="text-xs text-slate-400 mt-1 capitalize font-medium">{subscription?.type || 'No subscription'} Subscription</p>
            </div>
            <div className="pt-4 border-t border-slate-800">
               <div className="flex justify-between items-center text-xs">
                 <span className="text-slate-400">Next billing date</span>
                 <span className="font-bold">May 01, 2026</span>
               </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-sm font-bold text-slate-800">Payment History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="bg-slate-100 p-2 rounded-xl">
                        <Receipt className="w-5 h-5 text-slate-600" />
                     </div>
                     <div>
                       <p className="text-sm font-bold text-slate-800">{tx.id}</p>
                       <p className="text-[10px] font-medium text-slate-500">{tx.date} • {tx.method}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                       <p className="text-sm font-bold text-slate-800">SAR {tx.amount}</p>
                       <p className="text-[10px] font-bold text-emerald-600 uppercase">{tx.status}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-indigo-100 bg-indigo-50/50 rounded-3xl border-dashed">
        <CardContent className="flex flex-col md:flex-row items-center justify-between p-6 gap-4">
           <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-indigo-100">
                 <ArrowUpRight className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">Need to upgrade your plan?</p>
                <p className="text-xs text-slate-500 font-medium">Get lower rates for longer distances or more frequent trips.</p>
              </div>
           </div>
           <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6">View Plans</Button>
        </CardContent>
      </Card>
    </div>
  );
}
