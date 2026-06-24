import { Clock, RefreshCcw, Truck } from 'lucide-react';

export default function StoreInfoCard() {
  return (
    <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600 space-y-3 border border-slate-100">
      <div className="flex items-start gap-3">
        <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-slate-900">Shipping</p>
          <p>3-5 business days</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <RefreshCcw className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-slate-900">Returns</p>
          <p>30-day refund policy</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-slate-900">Support</p>
          <p>Mon-Fri, 9 AM - 6 PM</p>
        </div>
      </div>
    </div>
  );
}
