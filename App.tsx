
import React, { useState, useEffect, useRef } from 'react';
import { 
  HeartPulse, Stethoscope, FlaskConical, Building2, Menu, X, Plus, Trash2, 
  Calendar, Phone, Mail, MapPin, MessageCircle, Clock, ChevronRight, 
  ShieldCheck, CheckCircle, Activity, UserCog, Users, UserPlus, Star, 
  CheckCircle2, Award, ArrowRight, Droplets, Brain, Wind, Smile, Zap, 
  ShoppingBag, Home as HomeIcon, Crosshair, Search, ChevronDown, Camera, List,
  ClipboardCheck, Truck, Shield, LogIn, User as UserIcon, LogOut, Key, UserPlus as UserPlusIcon,
  LayoutDashboard, Laptop, Headphones, ClipboardList, HelpingHand
} from 'lucide-react';
import { INITIAL_DOCTORS, INITIAL_LAB_TESTS, INITIAL_FACILITIES } from './data';
import { Doctor, LabTest, Facility, Appointment, View, NetworkType, User } from './types';

// --- Global UI Components ---

const Navbar: React.FC<{ 
  currentView: View; 
  setView: (v: View) => void; 
  setNetworkFilter: (t: NetworkType | 'All') => void;
  currentUser: User | null;
  onLogout: () => void;
  onOpenLogin: () => void;
}> = ({ currentView, setView, setNetworkFilter, currentUser, onLogout, onOpenLogin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAdmin = currentUser?.email === 'admin@ismart.com';

  const menuItems: { name: string; view: View }[] = [
    { name: 'Home', view: 'Home' },
    { name: 'About', view: 'About' },
    { name: 'Specialties', view: 'Specialties' },
    { name: 'Doctors', view: 'Doctors' },
    { name: 'Lab Services', view: 'LabTests' },
    { name: 'Contact', view: 'Contact' }
  ];

  const networkOptions: NetworkType[] = ['Hospital', 'Pharmacy', 'Patient Care Center', 'Home Care Expert'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNetworkDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b sticky top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('Home')}>
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-sm">
              <HeartPulse size={24} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black text-slate-900 tracking-tight">iSmart</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">HealthCare</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map(item => (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                className={`${currentView === item.view ? 'text-blue-600 font-bold' : 'text-black hover:text-blue-600 font-medium'} text-[15px] transition-colors duration-200`}
              >
                {item.name}
              </button>
            ))}
            
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                className={`${currentView === 'Networks' ? 'text-blue-600 font-bold' : 'text-black hover:text-blue-600 font-medium'} text-[15px] flex items-center gap-1.5 transition-colors duration-200`}
              >
                Networks <ChevronDown size={14} />
              </button>
              {isNetworkDropdownOpen && (
                <div className="absolute top-full -left-4 w-56 bg-white border border-slate-200 shadow-xl rounded-xl py-2 mt-2 animate-fadeInUp">
                  {networkOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setNetworkFilter(opt); setView('Networks'); setIsNetworkDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-semibold transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 ml-4">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setView('Dashboard')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-[13px] border border-slate-300 transition-all ${currentView === 'Dashboard' ? 'bg-blue-600 text-white border-blue-600' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    <UserIcon size={16} /> My Account
                  </button>
                  {isAdmin && (
                    <button 
                      onClick={() => setView('Admin')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-[13px] border border-slate-900 transition-all ${currentView === 'Admin' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'}`}
                    >
                      <UserCog size={16} /> Admin
                    </button>
                  )}
                  <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><LogOut size={20} /></button>
                </div>
              ) : (
                <button 
                  onClick={onOpenLogin}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all text-[13px] shadow-sm flex items-center gap-2"
                >
                  <LogIn size={16} /> Sign In
                </button>
              )}
            </div>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-900">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t p-6 space-y-4 shadow-2xl animate-fadeInUp">
          {menuItems.map(item => (
            <button key={item.view} onClick={() => { setView(item.view); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 font-bold text-[16px] ${currentView === item.view ? 'text-blue-600' : 'text-slate-800'}`}>
              {item.name}
            </button>
          ))}
          <div className="space-y-3 pt-4 border-t">
            {currentUser ? (
              <>
                <button onClick={() => { setView('Dashboard'); setIsMobileMenuOpen(false); }} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-[16px]">Dashboard</button>
                {isAdmin && <button onClick={() => { setView('Admin'); setIsMobileMenuOpen(false); }} className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold text-[16px]">Admin Portal</button>}
                <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="w-full border border-slate-300 py-3 rounded-lg font-bold text-[16px]">Logout</button>
              </>
            ) : (
              <button onClick={() => { onOpenLogin(); setIsMobileMenuOpen(false); }} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-[16px]">Sign In</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white border border-slate-300 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const SpecialtyIcon = ({ name, size = 24 }: { name: string, size?: number }) => {
  switch (name) {
    case 'Cardiologist': return <Droplets size={size} className="text-rose-500" />;
    case 'Neurologist': return <Brain size={size} className="text-indigo-500" />;
    case 'Pulmonologist': return <Wind size={size} className="text-blue-500" />;
    case 'Dentist': return <Smile size={size} className="text-emerald-500" />;
    case 'Physiologist': return <Activity size={size} className="text-amber-500" />;
    case 'Pediatrician': return <Zap size={size} className="text-purple-500" />;
    default: return <Stethoscope size={size} className="text-slate-500" />;
  }
};

// --- View Components ---

const Home: React.FC<{ 
  doctors: Doctor[]; 
  specialties: string[];
  setView: (v: View) => void; 
  onBook: (d: Doctor) => void;
  setDoctorFilter: (s: string) => void;
}> = ({ doctors, specialties, setView, onBook, setDoctorFilter }) => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative h-[85vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-30 brightness-75" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 z-10 w-full animate-fadeInUp">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">Elevate Your Health Care <br /><span className="text-blue-500">Experience with iSmart</span></h1>
            <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed">Simplify your healthcare journey with iSmart Health Care – the revolutionary solution that simplifies your life and empowers you to take control of your wellbeing.</p>
            <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl">
              <div className="flex-1 flex items-center px-4 py-2 border border-slate-100 rounded-xl bg-slate-50">
                <Search size={18} className="text-slate-400 mr-2" />
                <input placeholder="Search doctors, tests, or specialties..." className="bg-transparent outline-none text-sm font-medium w-full h-10" />
              </div>
              <button onClick={() => setView('Doctors')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2">Explore Now <ArrowRight size={18} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-4 text-center md:text-left">
            <div>
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Medical Categories</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Find by Medical Specialty</h2>
            </div>
            <button onClick={() => setView('Specialties')} className="bg-slate-50 hover:bg-slate-100 text-slate-900 px-6 py-3 rounded-xl font-bold border border-slate-200 transition-all flex items-center gap-2">View All Specialties <Plus size={18} /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {specialties.slice(0, 7).map((s, idx) => (
              <button key={s} onClick={() => { setDoctorFilter(s); setView('Doctors'); }} className="group bg-slate-50 border border-slate-300 hover:bg-white hover:shadow-md hover:border-blue-400 p-6 rounded-2xl transition-all flex flex-col items-center animate-fadeInUp">
                <div className="mb-4 group-hover:scale-110 transition-transform"><SpecialtyIcon name={s} size={32} /></div>
                <span className="text-xs font-bold text-slate-800">{s}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Our Services</span>
            <h2 className="text-4xl font-extrabold text-slate-900 mt-2">Comprehensive Healthcare Solutions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Home Care', icon: <HomeIcon size={32} />, text: 'Nursing, Post operative care, Physio services and many more.' },
              { title: 'Online Consultations', icon: <Laptop size={32} />, text: 'Speak to top doctors in your area, get an assessment and treatment plan in comfort of your home.' },
              { title: 'Prescription Management', icon: <ShoppingBag size={32} />, text: 'Personalized support from licensed pharmacists. Same day delivery.' },
              { title: 'Insurance assistance', icon: <Shield size={32} />, text: 'Comprehensive review of your policy to identify every possible coverage angle.' },
              { title: 'Lab Services', icon: <FlaskConical size={32} />, text: 'Convenient home collection of blood and samples. Schedule appointments online in just clicks.' },
              { title: 'Ambulance Services', icon: <Truck size={32} />, text: 'Seamless coordination with local hospitals and emergency services, Available 24/7.' }
            ].map((service, i) => (
              <Card key={i} className="p-10 flex flex-col items-center border-slate-300 group">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">{service.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-500 font-medium text-sm">{service.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Providing best care */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000" className="rounded-3xl shadow-xl w-full h-[550px] object-cover border border-slate-300" alt="Care" />
            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-2xl border border-slate-300 hidden md:block">
               <p className="text-4xl font-black text-blue-600">94%</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Convenient Home Care</p>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Providing the best care for you</span>
              <h2 className="text-4xl font-extrabold text-slate-900 mt-2">Elevate your health care experience</h2>
            </div>
            <p className="text-slate-500 leading-relaxed font-medium">iSmart Health Care – the revolutionary solution that simplifies your life and empowers you to take control of your wellbeing. Experience personalized and assisted services with iSmart Health Care.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4"><CheckCircle2 className="text-blue-500" size={20} /> <span className="font-bold text-slate-700">Compassionate Care 93%</span></div>
              <div className="flex items-center gap-4"><CheckCircle2 className="text-blue-500" size={20} /> <span className="font-bold text-slate-700">Professionalism 92%</span></div>
              <div className="flex items-center gap-4"><CheckCircle2 className="text-blue-500" size={20} /> <span className="font-bold text-slate-700">Affordable Services 88%</span></div>
            </div>
            <button onClick={() => setView('About')} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2">Experience Personalized Care <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Departments */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-10">Why Choose Us?</h2>
            <div className="space-y-4">
              {[
                { title: 'Best Case Strategy', icon: <ClipboardList size={20} /> },
                { title: 'Second Medical Opinion', icon: <HelpingHand size={20} /> },
                { title: 'Insurance Claim Support', icon: <ShieldCheck size={20} /> },
                { title: 'Home Care Services', icon: <HomeIcon size={20} /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-300 shadow-sm group hover:border-blue-400 transition-all">
                  <div className="bg-blue-50 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">{item.icon}</div>
                  <span className="font-bold text-slate-900">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-10">Our Departments</h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: 'Pharmacy', label: 'Home Delivery' },
                { name: 'Consultations', label: 'Online Support' },
                { name: 'Home Care', label: '24/7 Assistance' },
                { name: 'Lab Services', label: 'Fast Reporting' }
              ].map((dept, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-300 shadow-sm text-center flex flex-col items-center justify-center">
                  <h4 className="text-lg font-black text-blue-600 leading-tight">{dept.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{dept.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Medical Team</span>
            <h2 className="text-4xl font-extrabold text-slate-900 mt-2">Featured Specialists</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.slice(0, 3).map((doc) => (
              <Card key={doc.id} className="border-slate-300 flex flex-col items-center p-8">
                <img src={doc.image} className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-slate-50" alt={doc.name} />
                <h3 className="text-xl font-bold text-slate-900">{doc.name}</h3>
                <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-6">{doc.specialty}</p>
                <button onClick={() => onBook(doc)} className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-blue-600 transition-all text-[11px] tracking-widest uppercase">Book Appointment</button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900">Get In Touch</h2>
            <p className="text-slate-500 font-medium mt-4">Write us for case assessment and further assistance.</p>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-12 rounded-[40px] border border-slate-300 shadow-2xl">
            <input placeholder="Your Name" className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold text-sm" />
            <input placeholder="Email Address" className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold text-sm" />
            <input placeholder="Subject" className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold text-sm md:col-span-2" />
            <textarea placeholder="Message" rows={4} className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold text-sm md:col-span-2"></textarea>
            <button className="bg-blue-600 text-white py-6 rounded-2xl font-black text-lg md:col-span-2 shadow-xl hover:bg-blue-700 transition-all uppercase tracking-widest">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

// --- Admin Panel Component ---

const AdminPanel: React.FC<{ 
  doctors: Doctor[]; setDoctors: (d: Doctor[]) => void;
  tests: LabTest[]; setTests: (t: LabTest[]) => void;
  specialties: string[]; 
  facilities: Facility[]; setFacilities: (f: Facility[]) => void;
  appointments: Appointment[];
}> = ({ doctors, setDoctors, tests, setTests, specialties, facilities, setFacilities, appointments }) => {
  const [activeTab, setActiveTab] = useState<'Doctors' | 'Tests' | 'Networks' | 'Bookings'>('Doctors');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleSave = () => {
    const id = Date.now().toString();
    if (activeTab === 'Doctors') {
      if (!formData.name || !formData.specialty) return alert("Fill all fields");
      setDoctors([...doctors, { ...formData, id, experience: Number(formData.experience) || 0, availability: ['09:00 AM', '11:00 AM'], image: 'https://picsum.photos/seed/'+id+'/400/400' }]);
    } else if (activeTab === 'Tests') {
      if (!formData.name) return alert("Fill name");
      setTests([...tests, { ...formData, id, price: Number(formData.price) || 0 }]);
    } else if (activeTab === 'Networks') {
      if (!formData.name || !formData.type) return alert("Fill fields");
      setFacilities([...facilities, { ...formData, id, image: 'https://picsum.photos/seed/'+id+'/600/400' }]);
    }
    setShowAddModal(false);
    setFormData({});
  };

  return (
    <div className="py-24 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex border border-slate-300 min-h-[750px]">
          <div className="w-64 bg-slate-900 p-8 space-y-4 shrink-0">
            <h2 className="text-white font-black text-2xl mb-12 flex items-center gap-2"><UserCog className="text-blue-500" /> Admin</h2>
            {['Doctors', 'Tests', 'Networks', 'Bookings'].map(t => (
              <button key={t} onClick={() => setActiveTab(t as any)} className={`w-full text-left p-4 rounded-xl font-bold transition-all ${activeTab === t ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>{t}</button>
            ))}
          </div>
          <div className="flex-1 p-12 overflow-y-auto">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-3xl font-black text-slate-900">{activeTab} Management</h1>
              {activeTab !== 'Bookings' && <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all"><Plus size={20} /> Add New {activeTab.slice(0, -1)}</button>}
            </div>

            {activeTab === 'Bookings' ? (
              <div className="space-y-4">
                {appointments.map(a => (
                  <div key={a.id} className="bg-white p-6 rounded-2xl border border-slate-300 flex justify-between items-center shadow-sm">
                    <div>
                       <h4 className="font-bold text-slate-900">{a.patientName}</h4>
                       <p className="text-xs text-slate-400 font-medium">{a.patientEmail} | {a.patientPhone}</p>
                    </div>
                    <div className="text-right">
                       <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{a.type}: {a.targetName}</span>
                       <p className="text-sm font-bold text-slate-500 mt-1">{a.date} | {a.time}</p>
                    </div>
                  </div>
                ))}
                {appointments.length === 0 && <p className="py-20 text-center text-slate-400 font-bold">No live bookings recorded yet.</p>}
              </div>
            ) : (
               <div className="grid gap-4">
                 {(activeTab === 'Doctors' ? doctors : activeTab === 'Tests' ? tests : facilities).map((item: any) => (
                   <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-300 flex justify-between items-center shadow-sm">
                      <div className="flex items-center gap-4">
                        {item.image && <img src={item.image} className="w-12 h-12 rounded-lg object-cover" />}
                        <div>
                          <h4 className="font-bold text-slate-900">{item.name}</h4>
                          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{item.specialty || item.category || item.type}</p>
                        </div>
                      </div>
                      <button onClick={() => {
                        if (activeTab === 'Doctors') setDoctors(doctors.filter(d => d.id !== item.id));
                        if (activeTab === 'Tests') setTests(tests.filter(t => t.id !== item.id));
                        if (activeTab === 'Networks') setFacilities(facilities.filter(f => f.id !== item.id));
                      }} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                   </div>
                 ))}
               </div>
            )}
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden animate-fadeInUp shadow-2xl border border-slate-300">
            <div className="p-8 border-b flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900">Add New {activeTab.slice(0, -1)}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-900 transition p-1 hover:bg-slate-200 rounded-lg"><X size={24} /></button>
            </div>
            <div className="p-8 space-y-4">
              <input placeholder="Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
              {activeTab === 'Doctors' && (
                <>
                  <select value={formData.specialty || ''} onChange={e => setFormData({...formData, specialty: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none font-bold text-sm focus:border-blue-500">
                    <option value="">Select Specialty</option>
                    {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <input placeholder="Experience (Years)" type="number" onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
                  <input placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
                  <input placeholder="Phone" onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
                </>
              )}
              {activeTab === 'Tests' && (
                <>
                  <input placeholder="Category (e.g. General, Chronic)" onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
                  <input placeholder="Price (₹)" type="number" onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
                  <textarea placeholder="Description" onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none font-bold text-sm focus:border-blue-500"></textarea>
                </>
              )}
              {activeTab === 'Networks' && (
                <>
                  <select value={formData.type || ''} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none font-bold text-sm focus:border-blue-500">
                    <option value="">Select Network Type</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Patient Care Center">Patient Care Center</option>
                    <option value="Home Care Expert">Home Care Expert</option>
                  </select>
                  <input placeholder="Phone" onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
                  <input placeholder="Address" onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
                </>
              )}
              <button onClick={handleSave} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-blue-700 transition-all uppercase tracking-widest">Save & Publish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentView, setView] = useState<View>('Home');
  const [doctorFilter, setDoctorFilter] = useState<string>('All');
  const [networkFilter, setNetworkFilter] = useState<NetworkType | 'All'>('All');
  const [bookingTarget, setBookingTarget] = useState<Doctor | LabTest | null>(null);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'signin' | 'signup' }>({ isOpen: false, mode: 'signin' });
  
  const [users, setUsers] = useState<User[]>([
    { id: 'admin-1', name: 'iSmart Admin', email: 'admin@ismart.com', phone: '0000000000', password: 'admin' }
  ]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [tests, setTests] = useState<LabTest[]>(INITIAL_LAB_TESTS);
  const [specialties, setSpecialties] = useState<string[]>(['Cardiologist', 'Neurologist', 'Pulmonologist', 'Dentist', 'Physiologist', 'General Physician', 'Pediatrician']);
  const [facilities, setFacilities] = useState<Facility[]>(INITIAL_FACILITIES);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bookingTarget) return;
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const name = (form.elements.namedItem('patient') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)?.value;
    
    let user = currentUser;
    if (!user) {
      const existingUser = users.find(u => u.email === email);
      if (existingUser) user = existingUser;
      else {
        const newUser: User = { id: Date.now().toString(), name, email, phone, password };
        setUsers([...users, newUser]);
        user = newUser;
      }
      setCurrentUser(user);
    }

    const newAppointment: Appointment = {
      id: Date.now().toString() + Math.random(),
      type: 'specialty' in bookingTarget ? 'Doctor' : 'Lab',
      targetId: bookingTarget.id,
      targetName: bookingTarget.name,
      patientName: name,
      patientEmail: email,
      patientPhone: phone,
      userId: user.id,
      date: (form.elements.namedItem('date') as HTMLInputElement).value,
      time: (form.elements.namedItem('time') as HTMLSelectElement).value,
      status: 'Confirmed'
    };
    
    setAppointments([newAppointment, ...appointments]);
    setBookingTarget(null);
    setShowBookingSuccess(true);
    setTimeout(() => setShowBookingSuccess(false), 4000);
  };

  const handleAuthSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    
    if (authModal.mode === 'signin') {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setCurrentUser(user);
        setAuthModal({ ...authModal, isOpen: false });
        if (user.email === 'admin@ismart.com') setView('Admin');
        else setView('Dashboard');
      } else alert("Invalid credentials. Use admin@ismart.com / admin");
    } else {
      const name = (form.elements.namedItem('name') as HTMLInputElement).value;
      const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
      if (users.find(u => u.email === email)) alert("Email already exists.");
      else {
        const newUser: User = { id: Date.now().toString(), name, email, phone, password };
        setUsers([...users, newUser]);
        setCurrentUser(newUser);
        setAuthModal({ ...authModal, isOpen: false });
        setView('Dashboard');
      }
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'Home': return <Home doctors={doctors} specialties={specialties} setView={setView} onBook={setBookingTarget} setDoctorFilter={setDoctorFilter} />;
      case 'Dashboard': return currentUser ? <UserDashboard user={currentUser} appointments={appointments} setView={setView} /> : <Home doctors={doctors} specialties={specialties} setView={setView} onBook={setBookingTarget} setDoctorFilter={setDoctorFilter} />;
      case 'Specialties': return <SpecialtyPage specialties={specialties} setView={setView} setDoctorFilter={setDoctorFilter} />;
      case 'Doctors': return (
        <div className="py-24 bg-slate-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 text-center">
             <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Medical Specialists</h1>
             <div className="flex flex-wrap justify-center gap-2 mb-16">
                {['All', ...specialties].map(s => <button key={s} onClick={() => setDoctorFilter(s)} className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${doctorFilter === s ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}>{s}</button>)}
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {(doctorFilter === 'All' ? doctors : doctors.filter(d => d.specialty === doctorFilter)).map(doc => (
                  <Card key={doc.id} className="border-slate-300">
                    <img src={doc.image} className="h-64 w-full object-cover" alt={doc.name} />
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{doc.name}</h3>
                      <p className="text-slate-400 font-medium mb-6">{doc.specialty} • {doc.experience} Years Exp.</p>
                      <button onClick={() => setBookingTarget(doc)} className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-blue-600 transition-all text-xs tracking-widest uppercase shadow-md">Book Appointment</button>
                    </div>
                  </Card>
                ))}
             </div>
          </div>
        </div>
      );
      case 'LabTests': return (
        <div className="py-24 bg-slate-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-16">Laboratory Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              {tests.map(test => (
                <Card key={test.id} className="p-10 flex flex-col border-slate-300">
                  <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest w-fit border border-blue-100">{test.category}</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-6 mb-4">{test.name}</h3>
                  <p className="text-slate-500 font-medium mb-10 text-sm leading-relaxed flex-grow">{test.description}</p>
                  <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-3xl font-black text-slate-900">₹{test.price}</span>
                    <button onClick={() => setBookingTarget(test)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg text-xs hover:bg-blue-700 transition-all uppercase tracking-widest">Book Test</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      );
      case 'Networks': return (
        <div className="py-24 bg-slate-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 text-center">
             <h1 className="text-4xl font-extrabold text-slate-900 mb-16">Our Healthcare Network</h1>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {(networkFilter === 'All' ? facilities : facilities.filter(f => f.type === networkFilter)).map(f => (
                  <Card key={f.id} className="border-slate-300">
                    <img src={f.image} className="h-56 w-full object-cover" alt={f.name} />
                    <div className="p-8">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{f.type}</span>
                      <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">{f.name}</h3>
                      <div className="space-y-3 text-sm font-medium text-slate-500">
                        <div className="flex items-start gap-2"><MapPin size={16} className="text-blue-500 mt-0.5 shrink-0" /> {f.address}</div>
                        <div className="flex items-center gap-2"><Phone size={16} className="text-blue-500" /> {f.phone}</div>
                      </div>
                    </div>
                  </Card>
                ))}
             </div>
          </div>
        </div>
      );
      case 'Admin': return currentUser?.email === 'admin@ismart.com' ? <AdminPanel doctors={doctors} setDoctors={setDoctors} tests={tests} setTests={setTests} specialties={specialties} facilities={facilities} setFacilities={setFacilities} appointments={appointments} /> : <Home doctors={doctors} specialties={specialties} setView={setView} onBook={setBookingTarget} setDoctorFilter={setDoctorFilter} />;
      case 'Dashboard': return currentUser ? <UserDashboard user={currentUser} appointments={appointments} setView={setView} /> : <Home doctors={doctors} specialties={specialties} setView={setView} onBook={setBookingTarget} setDoctorFilter={setDoctorFilter} />;
      default: return <Home doctors={doctors} specialties={specialties} setView={setView} onBook={setBookingTarget} setDoctorFilter={setDoctorFilter} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50">
      <Navbar currentView={currentView} setView={setView} setNetworkFilter={setNetworkFilter} currentUser={currentUser} onLogout={() => { setCurrentUser(null); setView('Home'); }} onOpenLogin={() => setAuthModal({ isOpen: true, mode: 'signin' })} />
      <main className="flex-grow">{renderContent()}</main>

      <footer className="bg-slate-950 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-black">iSmart <span className="text-blue-500">HealthCare</span></h3>
            <p className="text-slate-400 text-sm leading-relaxed">Innovative digital healthcare platform delivering personalized care, reliable diagnostics, and streamlined access to medical experts.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-blue-500 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li onClick={() => setView('Home')} className="cursor-pointer hover:text-white transition-colors">Home</li>
              <li onClick={() => setView('Doctors')} className="cursor-pointer hover:text-white transition-colors">Doctors</li>
              <li onClick={() => setView('LabTests')} className="cursor-pointer hover:text-white transition-colors">Laboratory</li>
              <li onClick={() => setView('Networks')} className="cursor-pointer hover:text-white transition-colors">Network</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-blue-500 uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>Home Care Services</li>
              <li>Online Consultations</li>
              <li>Insurance Support</li>
              <li>Emergency Response</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-blue-500 uppercase tracking-widest text-xs">Connect</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-2"><Phone size={14} className="text-blue-500" /> +91 9529695297</li>
              <li className="flex items-center gap-2"><Mail size={14} className="text-blue-500" /> ismarthcs@gmail.com</li>
              <li className="flex items-start gap-2"><MapPin size={14} className="text-blue-500 mt-1" /> VT Road, Mansarovar, Jaipur</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 font-bold uppercase tracking-widest gap-4">
          <p>Copyright © 2022 iSmart HealthCare - All Rights Reserved</p>
          <div className="flex gap-6"><span>Privacy Policy</span><span>Terms & Conditions</span><span>Support</span></div>
        </div>
      </footer>

      {bookingTarget && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden animate-fadeInUp shadow-2xl relative border border-slate-300">
            <button onClick={() => setBookingTarget(null)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition p-2 bg-slate-100 rounded-xl"><X size={24} /></button>
            <div className="bg-slate-900 p-12 text-white text-center">
              <h2 className="text-3xl font-black mb-1 uppercase tracking-tight">Confirm Booking</h2>
              <p className="opacity-70 font-medium">Selected: <span className="text-blue-400 font-black">{bookingTarget.name}</span></p>
            </div>
            <form className="p-12 space-y-6" onSubmit={handleBookingSubmit}>
              <div className="space-y-4">
                <input name="patient" required defaultValue={currentUser?.name} placeholder="Patient Full Name" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="email" type="email" required defaultValue={currentUser?.email} placeholder="Email" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
                  <input name="phone" required defaultValue={currentUser?.phone} placeholder="Phone" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
                </div>
                {!currentUser && <input name="password" type="password" required placeholder="Create Profile Password" className="w-full p-4 rounded-xl bg-blue-50 border border-blue-100 outline-none font-bold text-sm focus:border-blue-500" />}
                <div className="grid grid-cols-2 gap-4">
                  <input name="date" type="date" required className="p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
                  <select name="time" required className="p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none font-bold text-sm focus:border-blue-500">
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl uppercase tracking-widest">Finalize Booking</button>
            </form>
          </div>
        </div>
      )}

      {authModal.isOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] w-full max-w-md overflow-hidden animate-fadeInUp shadow-2xl relative border border-slate-300">
            <button onClick={() => setAuthModal({ ...authModal, isOpen: false })} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition p-2 bg-slate-100 rounded-xl"><X size={24} /></button>
            <div className="bg-slate-900 p-10 text-white text-center">
              <h2 className="text-3xl font-black mb-2 uppercase tracking-tight">{authModal.mode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
              <p className="opacity-70 text-sm font-medium">Access the iSmart ecosystem</p>
            </div>
            <div className="flex border-b border-slate-100">
              <button onClick={() => setAuthModal({ ...authModal, mode: 'signin' })} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${authModal.mode === 'signin' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}>Sign In</button>
              <button onClick={() => setAuthModal({ ...authModal, mode: 'signup' })} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${authModal.mode === 'signup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}>Sign Up</button>
            </div>
            <form className="p-10 space-y-6" onSubmit={handleAuthSubmit}>
              <div className="space-y-4">
                {authModal.mode === 'signup' && (
                  <>
                    <input name="name" required placeholder="Full Name" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
                    <input name="phone" required placeholder="Phone Number" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
                  </>
                )}
                <input name="email" type="email" required placeholder="Email Address" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
                <input name="password" type="password" required placeholder="Password" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none font-bold text-sm focus:border-blue-500" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg uppercase tracking-widest">{authModal.mode === 'signin' ? 'Login' : 'Join Now'}</button>
              {authModal.mode === 'signin' && <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">Admin Credentials: admin@ismart.com / admin</p>}
            </form>
          </div>
        </div>
      )}

      {showBookingSuccess && <div className="fixed bottom-12 right-12 bg-white border border-slate-300 p-10 rounded-[40px] shadow-2xl flex items-center gap-6 animate-fadeInUp z-[300]"><div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600"><CheckCircle size={40} /></div><div><h4 className="font-black text-slate-900 text-xl">Booking Success!</h4><p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Visit dashboard for details.</p></div></div>}
    </div>
  );
}

const UserDashboard: React.FC<{ user: User; appointments: Appointment[]; setView: (v: View) => void }> = ({ user, appointments, setView }) => {
  const userAppointments = appointments.filter(a => a.userId === user.id);
  return (
    <div className="py-24 bg-slate-50 min-h-screen"><div className="max-w-7xl mx-auto px-4"><div className="grid grid-cols-1 lg:grid-cols-4 gap-12"><div className="lg:col-span-1"><div className="bg-white border border-slate-300 p-8 rounded-[30px] shadow-sm text-center"><div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black">{user.name[0]}</div><h2 className="text-2xl font-black text-slate-900 mb-2">{user.name}</h2><p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-6">{user.email === 'admin@ismart.com' ? 'Administrator' : 'Patient'}</p><div className="space-y-4 text-left border-t border-slate-100 pt-6"><div className="flex items-center gap-3 text-slate-600"><Mail size={16} className="text-blue-500 shrink-0" /><span className="text-sm font-medium truncate">{user.email}</span></div><div className="flex items-center gap-3 text-slate-600"><Phone size={16} className="text-blue-500 shrink-0" /><span className="text-sm font-medium">{user.phone}</span></div></div></div></div><div className="lg:col-span-3 space-y-12"><div><h3 className="text-2xl font-black text-slate-900 mb-8">Your Recent Activity</h3><div className="grid gap-4">{userAppointments.map(a => (<div key={a.id} className="bg-white p-6 rounded-2xl border border-slate-300 flex items-center justify-between group hover:border-blue-400 transition-all shadow-sm"><div className="flex items-center gap-6"><div className="bg-blue-50 p-4 rounded-xl text-blue-600"><Calendar size={24} /></div><div><h4 className="font-bold text-slate-900 text-lg">{a.targetName}</h4><p className="text-slate-400 text-sm font-medium">{a.type} Booking • {a.date} | {a.time}</p></div></div><span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Confirmed</span></div>))}{userAppointments.length === 0 && <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300"><p className="text-slate-400 font-bold">No bookings recorded in your history.</p></div>}</div></div></div></div></div></div>
  );
};

const SpecialtyPage: React.FC<{ specialties: string[]; setView: (v: View) => void; setDoctorFilter: (s: string) => void }> = ({ specialties, setView, setDoctorFilter }) => (
  <div className="py-24 bg-slate-50 min-h-screen"><div className="max-w-7xl mx-auto px-4 text-center"><h1 className="text-4xl font-extrabold text-slate-900 mb-16">Medical Specialists</h1><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{specialties.map(s => <button key={s} onClick={() => { setDoctorFilter(s); setView('Doctors'); }} className="bg-white border border-slate-300 p-10 rounded-2xl hover:shadow-xl transition-all flex flex-col items-center group"><div className="group-hover:scale-110 transition-transform"><SpecialtyIcon name={s} size={40} /></div><h3 className="font-bold text-slate-900 mt-4">{s}</h3></button>)}</div></div></div>
);
