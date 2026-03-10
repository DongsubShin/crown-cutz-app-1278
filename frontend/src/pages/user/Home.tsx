import { Link } from 'react-router';

export default function Home() {
  return (
    <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-900 text-sm font-bold mb-6">
            ESTABLISHED 2024
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Precision Cuts for the <span className="text-primary">Modern Gentleman.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg">
            Experience the ultimate grooming service at Crown Cutz. From classic fades to modern styling, we ensure you leave looking like royalty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/booking" className="bg-primary text-white px-8 py-4 rounded-md font-bold text-center hover:opacity-90 transition shadow-lg">
              Book Appointment
            </Link>
            <Link to="/queue" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-md font-bold text-center hover:bg-slate-50 transition">
              Join Live Queue
            </Link>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="aspect-square rounded-2xl bg-slate-100 overflow-hidden shadow-2xl">
             <img src="/hero-barber.jpg" alt="Barber at work" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}