
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PieChart, Pie,
  AreaChart, Area
} from 'recharts';
import Layout from './components/Layout';
import MetricCard from './components/MetricCard';
import { MOCK_DATA, COLORS, ENRICHED_POWER_USERS, TREND_DATA, STRATEGIC_INSIGHTS } from './constants';

const GlobalChampionsTable = ({ 
  title = "AI Champions", 
  subtitle = "Perfiles con data demográfica completa",
  filterKey, 
  filterValue 
}: { 
  title?: string;
  subtitle?: string;
  filterKey?: 'practice' | 'region'; 
  filterValue?: string;
}) => {
  const filteredUsers = useMemo(() => {
    if (!filterKey || !filterValue || filterValue === 'All') return ENRICHED_POWER_USERS;
    return ENRICHED_POWER_USERS.filter(u => {
      const val = u[filterKey].toLowerCase();
      const search = filterValue.toLowerCase();
      return val.includes(search) || search.includes(val);
    });
  }, [filterKey, filterValue]);

  return (
    <div className="glass-morphism rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl shadow-orange-500/5">
      <div className="p-6 border-b border-slate-800 bg-slate-800/30 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="text-2xl">🌟</span> {title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">{subtitle}</p>
        </div>
        <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
          {filteredUsers.length} Encontrados
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900/50 text-slate-500 text-[10px] uppercase tracking-wider font-black">
              <th className="px-6 py-4">Colaborador</th>
              <th className="px-6 py-4">Practice / Hub</th>
              <th className="px-6 py-4">Nivel Gemini</th>
              <th className="px-6 py-4">Impacto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.email} className="hover:bg-orange-500/5 transition-all group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-200 group-hover:text-orange-500 transition-colors">{user.email.split('@')[0]}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-300">{user.practice}</span>
                      <span className="text-[10px] text-slate-500">{user.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${user.gemini === 'Alta' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                      {user.gemini}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono font-bold text-emerald-500">{user.days}d activos</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500 italic text-sm">
                  No hay Champions registrados en esta selección.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Filtros
  const [selectedPractice, setSelectedPractice] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const usageSegments = [
    { name: 'Activos', value: 110, fill: '#F97316' },
    { name: 'Baja Actividad', value: 45, fill: '#334155' },
    { name: 'Inactivos', value: 50, fill: '#1e293b' },
  ];

  const practices = useMemo(() => ['All', ...MOCK_DATA.practiceData.map(p => p.name)], []);
  const regions = useMemo(() => ['All', ...MOCK_DATA.regionData.map(r => r.name)], []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard label="Universo Auditado" value={MOCK_DATA.summary.totalUsers} change="N=205" icon="👥" />
              <MetricCard label="Usuarios Activos" value={MOCK_DATA.summary.totalActiveUsers} change={`${MOCK_DATA.summary.avgAdoptionRate}% Tasa`} icon="⚡" />
              <MetricCard label="Brecha Gemini App" value="129" change="Por activar" positive={false} icon="🤖" />
              <MetricCard label="Práctica Líder" value="Intelligence" change="85% Adopción" icon="🏆" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-morphism p-6 rounded-2xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <span className="text-xl">📈</span> Tendencia de Adopción (MoM)
                  </h3>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Enero vs Febrero 2026</div>
                </div>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={TREND_DATA}>
                      <defs>
                        <linearGradient id="colorAdop" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} unit="%" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
                      <Area type="monotone" dataKey="adoption" name="Adopción %" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorAdop)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-800/30 rounded-xl border border-slate-700/50 text-center">
                    <p className="text-[10px] text-slate-500 uppercase font-black">Incremento MoM</p>
                    <p className="text-xl font-bold text-emerald-500">+9.4%</p>
                  </div>
                  <div className="p-3 bg-slate-800/30 rounded-xl border border-slate-700/50 text-center">
                    <p className="text-[10px] text-slate-500 uppercase font-black">Nuevos Usuarios</p>
                    <p className="text-xl font-bold text-orange-500">+26</p>
                  </div>
                </div>
              </div>

              <div className="glass-morphism p-6 rounded-2xl border border-orange-500/20 bg-orange-500/5">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-orange-400">
                  <span className="text-xl">🧠</span> Strategic Insights (Directo)
                </h3>
                <div className="prose prose-invert prose-sm max-h-[350px] overflow-y-auto custom-scrollbar">
                  <div className="text-slate-300 leading-relaxed text-sm">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{STRATEGIC_INSIGHTS}</pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="glass-morphism p-6 rounded-2xl border border-slate-700/50">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="text-xl">🎯</span> Segmentación de Headcount Real
                  </h3>
                  <div className="h-[300px] w-full flex items-center">
                    <ResponsiveContainer width="60%" height="100%">
                      <PieChart>
                        <Pie data={usageSegments} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                          {usageSegments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="w-[40%] space-y-4">
                      {usageSegments.map((seg) => (
                        <div key={seg.name} className="flex flex-col">
                          <span className="text-[10px] text-slate-500 uppercase font-black">{seg.name}</span>
                          <span className="text-lg font-bold">{seg.value} <span className="text-xs font-normal">pers.</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
               <GlobalChampionsTable />
            </div>
          </div>
        );

      case 'departments':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-morphism p-6 rounded-2xl border border-slate-700/50">
              <div>
                <h3 className="text-lg font-bold">Análisis por Práctica</h3>
                <p className="text-xs text-slate-500">Filtrar métricas y champions por departamento</p>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-slate-400 uppercase">Practice:</label>
                <select 
                  value={selectedPractice}
                  onChange={(e) => setSelectedPractice(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-sm rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                >
                  {practices.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-morphism p-8 rounded-2xl border border-slate-700/50">
                <h3 className="text-xl font-bold mb-8">Adopción por Practice (N=205)</h3>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_DATA.practiceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} width={100} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
                      <Bar dataKey="adoptionRate" name="Adopción %" fill="#F97316" radius={[0, 4, 4, 0]} barSize={25}>
                        {MOCK_DATA.practiceData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={selectedPractice === 'All' || entry.name === selectedPractice ? '#F97316' : '#334155'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <GlobalChampionsTable 
                title={`Champions: ${selectedPractice === 'All' ? 'Global' : selectedPractice}`}
                filterKey="practice"
                filterValue={selectedPractice}
              />
            </div>
          </div>
        );

      case 'regions':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-morphism p-6 rounded-2xl border border-slate-700/50">
              <div>
                <h3 className="text-lg font-bold">Análisis Regional</h3>
                <p className="text-xs text-slate-500">Explorar desempeño geográfico</p>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-slate-400 uppercase">Región:</label>
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-sm rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                >
                  {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MetricCard 
                label="AMERICAS (N=124)" 
                value="56.5%" 
                change="Líder Global" 
                icon="🌎" 
                positive={selectedRegion === 'All' || selectedRegion === 'AMERICAS'} 
              />
              <MetricCard 
                label="EMEA (N=81)" 
                value="49.3%" 
                change="En crecimiento" 
                icon="🌍" 
                positive={selectedRegion === 'All' || selectedRegion === 'EMEA'}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-morphism p-6 rounded-2xl border border-slate-700/50 h-full">
                <h3 className="text-lg font-bold mb-6">Hubs de Alto Rendimiento</h3>
                <div className="overflow-x-auto h-full">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-800/50 text-slate-500 text-[10px] uppercase font-black">
                        <th className="px-6 py-4">Hub</th>
                        <th className="px-6 py-4">Tasa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {MOCK_DATA.locationData.map((loc) => (
                        <tr key={loc.country} className="hover:bg-slate-800/30">
                          <td className="px-6 py-4 font-bold text-sm">{loc.country}</td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-bold text-orange-500">{loc.activeRate}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <GlobalChampionsTable 
                title={`Champions Regionales: ${selectedRegion === 'All' ? 'Global' : selectedRegion}`}
                filterKey="region"
                filterValue={selectedRegion}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white">Findasense <span className="text-orange-500 uppercase">{activeTab}</span></h1>
            <p className="text-slate-500 mt-2 font-medium italic">Universo: 205 registros auditados.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-5 py-3 rounded-2xl text-right shadow-xl">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Corte del Reporte</p>
            <p className="text-xs font-bold text-slate-200">Últimos 30 días</p>
            <p className="text-[10px] text-orange-500 font-mono mt-1 font-bold">FEBRERO 04, 2026</p>
          </div>
        </div>
      </div>
      {renderContent()}
    </Layout>
  );
};

export default App;
