import { Outlet } from 'react-router';
import { UserNavbar } from '../../components/layout/UserNavbar';

export default function UserLayout() {
  return (
    <div className="min-h-screen bg-white">
      <UserNavbar />
      <main className="pt-20">
        <Outlet />
      </main>
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2024 Crown Cutz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}