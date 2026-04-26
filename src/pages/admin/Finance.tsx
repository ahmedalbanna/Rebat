import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { CreditCard, TrendingUp, TrendingDown, DollarSign, Download, PieChart, ArrowUpRight, ArrowDownRight, Settings } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

export default function AdminFinance() {
  const stats = [
    { label: 'Monthly Revenue', value: 'SAR 128,450', trend: '+12.4%', up: true },
    { label: 'Driver Payouts', value: 'SAR 84,200', trend: '+5.2%', up: true },
    { label: 'Operating Costs', value: 'SAR 15,100', trend: '-2.1%', up: false },
    { label: 'Net Profit', value: 'SAR 29,150', trend: '+18.5%', up: true },
  ];

  const transactions = [
    { id: 'TX-4509', type: 'Subscription', user: 'Sarah Ahmed', amount: 'SAR 550.00', status: 'Settled', date: '2 min ago' },
    { id: 'TX-4508', type: 'Payout', user: 'Khalid Mohammed', amount: 'SAR (1,420.00)', status: 'Processing', date: '15 min ago' },
    { id: 'TX-4507', type: 'Subscription', user: 'Laila Ali', amount: 'SAR 120.00', status: 'Settled', date: '1 hour ago' },
    { id: 'TX-4506', type: 'Subscription', user: 'Noura F.', amount: 'SAR 600.00', status: 'Settled', date: '3 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Financial Hub</h1>
          <p className="text-slate-500 font-medium mt-1">Monitor revenue streams, margins, and automated driver payouts.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-indigo-100 flex items-center gap-2">
           <Download className="w-4 h-4" />
           Quarterly Report
        </Button>
      </header>

      {/* Financial Bento Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
         {stats.map((s) => (
           <Card key={s.label} className="rounded-[28px] border-slate-200 shadow-sm overflow-hidden group hover:border-indigo-200 transition-all">
              <CardHeader className="pb-2">
                 <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-2xl font-black text-slate-800 tracking-tight">{s.value}</p>
                 <div className={cn(
                    "flex items-center gap-1 mt-2 text-[10px] font-black uppercase tracking-wider",
                    s.up ? "text-emerald-500" : "text-rose-500"
                 )}>
                    {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {s.trend} <span className="text-slate-400 font-medium ml-1">vs last month</span>
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      <div className="grid md:grid-cols-12 gap-8">
         {/* Main Transaction Feed */}
         <Card className="md:col-span-8 rounded-[32px] border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6 flex flex-row justify-between items-center">
               <CardTitle className="text-sm font-bold text-slate-800">Recent Stream</CardTitle>
               <Button variant="ghost" size="sm" className="text-indigo-600 font-bold text-xs gap-1">
                  All Transactions <TrendingUp className="w-4 h-4" />
               </Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-100">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group">
                       <div className="flex items-center gap-4">
                          <div className={cn(
                             "p-2.5 rounded-2xl animate-in",
                             tx.type === 'Subscription' ? "bg-indigo-50 text-indigo-600" : "bg-rose-50 text-rose-600"
                          )}>
                             {tx.type === 'Subscription' ? <DollarSign className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-800 tracking-tight">{tx.user}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tx.type} • {tx.id}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className={cn(
                             "text-sm font-black tracking-tighter",
                             tx.type === 'Subscription' ? "text-slate-800" : "text-rose-600"
                          )}>{tx.amount}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">{tx.date}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Revenue Distribution */}
         <div className="md:col-span-4 space-y-6">
            <Card className="rounded-[32px] bg-slate-900 border-none text-white shadow-2xl p-2 h-[300px] flex flex-col items-center justify-center text-center">
               <CardHeader>
                  <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 justify-center">
                     <PieChart className="w-4 h-4 text-indigo-400" /> Subscription Share
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4 w-full">
                  <div className="relative h-24 w-24 mx-auto mb-4 border-8 border-indigo-600 rounded-full flex items-center justify-center">
                     <span className="text-lg font-black text-white">82%</span>
                     <div className="absolute inset-[-8px] border-8 border-slate-700 rounded-full border-t-transparent border-l-transparent"></div>
                  </div>
                  <div className="text-xs space-y-2 font-bold px-4">
                     <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full"></div> Monthly</span>
                        <span>82%</span>
                     </div>
                     <div className="flex justify-between items-center opacity-60">
                        <span className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-500 rounded-full"></div> Weekly</span>
                        <span>18%</span>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="rounded-[32px] border-indigo-100 bg-indigo-50/50 shadow-none p-4">
               <CardContent className="space-y-4">
                  <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                     <Settings className="w-4 h-4" /> Pricing Engine
                  </h4>
                  <div className="space-y-3">
                     <div className="flex justify-between text-[11px] font-bold text-slate-800">
                        <span>Min Distance Fee</span>
                        <span className="text-indigo-600 bg-white px-2 py-0.5 rounded-lg border border-indigo-100 shadow-sm">SAR 8.00</span>
                     </div>
                     <div className="flex justify-between text-[11px] font-bold text-slate-800">
                        <span>Max Radius (City)</span>
                        <span className="text-indigo-600 bg-white px-2 py-0.5 rounded-lg border border-indigo-100 shadow-sm">45 KM</span>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
