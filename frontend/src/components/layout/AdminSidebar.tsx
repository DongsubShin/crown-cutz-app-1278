import { Link, useLocation } from 'react-router';
import { Icon } from '@iconify/react';
import { cn } from '../../lib/utils';

const navItems = [
  { group: 'Main', items: [
    { label: 'Dashboard', icon: 'lucide:layout-dashboard', href: '/admin' },
    { label: 'Live Queue', icon: 'lucide:users-round', href: '/admin/queue' },
  ]},
  { group: 'Management', items: [
    { label: 'Clients', icon: 'lucide:contact-2', href: '/admin/clients' },
    { label: 'Commission', icon: 'lucide:banknote', href: '/admin/commission' },
    { label: 'Loyalty', icon: 'lucide:award', href: '/admin/loyalty' },
  ]}
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-60 h-full border-r border-slate-200 flex flex-col flex-shrink-0 bg-white">
      <div className="p-6">
        <span className="text-xl font-bold text-primary">Crown Cutz</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((group) => (
          <div key={group.group} className="pb-4">
            <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {group.group}
            </p>
            {group.items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === item.href 
                    ? "bg-primary/10 text-primary" 
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <Icon icon={item.icon} className="mr-3 text-lg" />
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}