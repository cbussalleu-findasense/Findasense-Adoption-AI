
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/20">F</div>
          <h1 className="text-xl font-bold tracking-tight">Findasense <span className="text-orange-500">AI</span></h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem 
            icon="📊" 
            label="Overview" 
            active={activeTab === 'overview'} 
            onClick={() => onTabChange('overview')} 
          />
          <NavItem 
            icon="🏢" 
            label="Departments" 
            active={activeTab === 'departments'} 
            onClick={() => onTabChange('departments')} 
          />
          <NavItem 
            icon="🌎" 
            label="Regions" 
            active={activeTab === 'regions'} 
            onClick={() => onTabChange('regions')} 
          />
          <div className="pt-4 pb-2 px-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reports</p>
          </div>
          <NavItem icon="🛠️" label="Models & Tools" onClick={() => {}} />
          <NavItem icon="💰" label="ROI Analysis" onClick={() => {}} />
        </nav>
        
        <div className="p-6 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <p className="text-xs text-slate-400 mb-2 uppercase font-bold">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm font-medium">All Models Online</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-y-auto">
        <header className="h-16 border-b border-slate-800 glass-morphism sticky top-0 z-30 flex items-center justify-between px-8">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
            {activeTab} <span className="text-slate-600 mx-2">/</span> Adoption Hub v2.1
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">LIVE DATA</span>
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs border border-slate-600">FS</div>
          </div>
        </header>
        
        <div className="p-8 pb-16">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: string; label: string; active?: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${active ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'}`}
  >
    <span className={active ? '' : 'grayscale opacity-70'}>{icon}</span>
    {label}
  </button>
);

export default Layout;
