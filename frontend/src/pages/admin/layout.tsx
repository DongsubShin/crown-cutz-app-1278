import { Outlet, Navigate } from 'react-router';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { Icon } from '@iconify/react';

export default function AdminLayout() {
  // Simple auth check placeholder
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
          <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-lg w-64">
            <Icon icon="lucide:search" className="text-slate-400 mr-2" />
            <input type="text" placeholder="Search clients..." className="bg-transparent border-none text-sm focus:outline-none w-full" />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition">
              <Icon icon="lucide:bell" width="20" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}