import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { CreditCard, Wallet, TrendingUp, Calendar, Download } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function DriverEarnings() {
  const { user } = useAuth();

  const transactions = [
    { id: 'PAY-4402', date: 'Apr 25, 2026', amount: 1250.00, status: 'Processing', note: 'Weekly Payout' },
    { id: 'PAY-4310', date: 'Apr 18, 2026', amount: 1420.00, status: 'Completed', note: 'Weekly Payout' },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Earnings & Payouts</h1>
        <p className="text-slate-500 font-medium mt-1">Track your performance and financial settlements.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 text-white border-none rounded-3xl p-2 shadow-xl">
           <CardHeader>
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Available Balance
              </CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
              <div>
                <p className="text-4xl font-bold tracking-tight">SAR 1,250.00</p>
                <p className="text-xs text-emerald-400 font-bold mt-1 flex items-center gap-1">
                   <TrendingUp className="w-3 h-3" />
                   +8% vs last week
                </p>
              </div>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold rounded-xl h-11">
                 Request Payout
              </Button>
           </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
           <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Trips</CardTitle>
           </CardHeader>
           <CardContent>
              <p className="text-3xl font-bold text-slate-800">42</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Current Billing Cycle</p>
           </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
           <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Net</CardTitle>
           </CardHeader>
           <CardContent>
              <p className="text-3xl font-bold text-slate-800">SAR 5,220.00</p>
              <p className="text-xs text-slate-500 font-medium mt-1">April 2026</p>
           </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-sm font-bold text-slate-800">Payout History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 p-2.5 rounded-2xl">
                    <Calendar className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{tx.note}</p>
                    <p className="text-[10px] font-medium text-slate-500">{tx.date} • {tx.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">SAR {tx.amount}</p>
                    <div className="flex justify-end mt-0.5">
                       <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                         tx.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                       }`}>
                         {tx.status}
                       </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-300 hover:text-indigo-600">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
