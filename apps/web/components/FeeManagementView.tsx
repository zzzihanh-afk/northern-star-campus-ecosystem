'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Receipt,
  Plus,
  CheckCircle,
  Download,
  AlertCircle,
  Clock,
  Filter,
} from 'lucide-react';

export const FeeManagementView: React.FC = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [studentCode, setStudentCode] = useState('NSC2025001');
  const [amount, setAmount] = useState('5000');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [payments, setPayments] = useState([
    { id: '1', receipt: 'REC-2025-11001', student: 'Rahim Ahmed (NSC2025001)', feeTitle: 'Monthly Tuition (Nov 2025)', amount: 5000, method: 'Online Gateway', date: 'Nov 05, 2025', status: 'Paid' },
    { id: '2', receipt: 'REC-2025-11002', student: 'Sadia Islam (NSC2025002)', feeTitle: 'Monthly Tuition (Nov 2025)', amount: 5000, method: 'Cash Deposit', date: 'Nov 06, 2025', status: 'Paid' },
    { id: '3', receipt: 'REC-2025-11003', student: 'Tahsin Alam (NSC2025003)', feeTitle: 'Monthly Tuition (Nov 2025)', amount: 5000, method: 'Bank Transfer', date: 'Nov 07, 2025', status: 'Paid' },
  ]);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const newReceipt = `REC-2025-${Math.floor(10000 + Math.random() * 90000)}`;
    const newPayment = {
      id: String(Date.now()),
      receipt: newReceipt,
      student: `${studentCode} - Recorded`,
      feeTitle: 'Tuition Fee Payment',
      amount: Number(amount) || 5000,
      method: paymentMethod.toUpperCase(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Paid',
    };

    setPayments([newPayment, ...payments]);
    setShowPaymentModal(false);
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
            Fee & Financial Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tuition fee structure, manual and online gateway collection recording, invoices and audit trails.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPaymentModal(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center space-x-2 shadow-md shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      {paymentSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center space-x-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Payment recorded and receipt generated! Status immediately updated across web & mobile portals.</span>
        </div>
      )}

      {/* Financial Stat Cards matching Reference 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Fee Collected (This Month)</span>
          <p className="text-2xl font-black text-slate-900 mt-1">৳ 3,75,500</p>
          <span className="text-xs font-semibold text-emerald-600 flex items-center mt-1">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> +12% from last month
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Pending Invoices</span>
          <p className="text-2xl font-black text-amber-500 mt-1">৳ 45,000</p>
          <span className="text-xs text-slate-400 mt-1 block">9 student accounts pending</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Active Payment Gateway</span>
          <p className="text-base font-bold text-blue-600 mt-1">Integration Interface Ready</p>
          <span className="text-[11px] text-slate-500 mt-1 block">bKash, Nagad, SSLCommerz, Bank Deposit</span>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900">Recent Payment Transactions</h3>
          <span className="text-xs text-slate-400">Total Recorded: {payments.length}</span>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4">Receipt No</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Fee Description</th>
              <th className="py-3 px-4">Method</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/80">
                <td className="py-3 px-4 font-mono font-bold text-blue-600">{p.receipt}</td>
                <td className="py-3 px-4 font-bold text-slate-900">{p.student}</td>
                <td className="py-3 px-4 text-slate-600">{p.feeTitle}</td>
                <td className="py-3 px-4 text-slate-500">{p.method}</td>
                <td className="py-3 px-4 text-slate-500">{p.date}</td>
                <td className="py-3 px-4 font-black text-slate-900">৳ {p.amount.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Record Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Record Authorized Fee Payment</h3>
            <p className="text-xs text-slate-500 mb-4">Manual collection or verified bank payment receipt entry.</p>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Identifier</label>
                <input
                  type="text"
                  value={studentCode}
                  onChange={(e) => setStudentCode(e.target.value)}
                  placeholder="e.g. NSC2025001"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Amount Paid (৳)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Channel</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="cash">Cash Counter</option>
                  <option value="bank">Direct Bank Transfer</option>
                  <option value="bkash">bKash Merchant Pay</option>
                  <option value="nagad">Nagad Pay</option>
                  <option value="card">POS Card</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20"
                >
                  Confirm & Issue Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
