import { Icon } from '@iconify/react';

const stats = [
  { label: 'Today\'s Revenue', value: '$1,240', icon: 'lucide:dollar-sign', color: 'bg-emerald-100 text-emerald-600' },
  { label: 'Active Bookings', value: '12', icon: 'lucide:calendar', color: 'bg-blue-100 text-blue-600' },
  { label: 'Queue Length', value: '4', icon: 'lucide:users', color: 'bg-amber-100 text-amber-600' },
  { label: 'New Clients', value: '8', icon: 'lucide:user-plus', color: 'bg-purple-100 text-purple-600' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={stat.color + " p-2 rounded-lg"}>
                <Icon icon={stat.icon} className="text-xl" />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+12%</span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {/* Activity List Placeholder */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Icon icon="lucide:user" className="text-slate-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">John Doe completed a Skin Fade</p>
                  <p className="text-xs text-slate-500">24 minutes ago</p>
                </div>
                <span className="text-sm font-bold text-slate-900">$35.00</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 mb-4">Top Barbers</h3>
          <div className="space-y-6">
            {/* Barbers List Placeholder */}
            {['Alex Rivera', 'Sam Chen', 'Marcus Bell'].map((name, i) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    {name[0]}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">${950 - (i * 100)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}