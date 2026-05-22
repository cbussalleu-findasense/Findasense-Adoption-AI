
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PieChart, Pie,
  AreaChart, Area
} from 'recharts';
import Layout from './components/Layout';
import MetricCard from './components/MetricCard';
import { MOCK_DATA, COLORS, ENRICHED_POWER_USERS, TREND_DATA, STRATEGIC_INSIGHTS } from './constants';
import { INACTIVE_USERS } from './inactive_data';

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
                    {typeof user.gemini === 'number' ? (
                      <div className="flex flex-col">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border w-fit ${
                          user.gemini >= 15 ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 
                          user.gemini >= 5 ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                          'bg-slate-500/10 text-slate-400 border-slate-500/20'
                        }`}>
                          {user.gemini >= 15 ? 'Alta' : user.gemini >= 5 ? 'Intermedia' : 'Baja'}
                        </span>
                        <span className="text-[9px] text-slate-500 mt-1 font-mono">{user.gemini} días</span>
                      </div>
                    ) : (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${user.gemini === 'Alta' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                        {user.gemini}
                      </span>
                    )}
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

  // Filtros de Inactivos
  const [inactiveSearch, setInactiveSearch] = useState('');
  const [inactivePractice, setInactivePractice] = useState('All');
  const [inactiveLocation, setInactiveLocation] = useState('All');
  const [inactiveTenure, setInactiveTenure] = useState('All');
  const [inactiveLevel, setInactiveLevel] = useState('All');
  const [copied, setCopied] = useState(false);

  const usageSegments = useMemo(() => {
    const usoGeneral = MOCK_DATA.toolAdoption.find(t => t.tool === 'Uso General');
    const high = usoGeneral?.high || 0;
    const medium = usoGeneral?.medium || 0;
    const low = usoGeneral?.low || 0;
    const none = usoGeneral?.none || 0;
    return [
      { name: 'Activos', value: high + medium, fill: '#F97316' },
      { name: 'Baja Actividad', value: low, fill: '#334155' },
      { name: 'Inactivos', value: none, fill: '#1e293b' },
    ];
  }, []);

  const latestMoMIncrement = useMemo(() => {
    if (TREND_DATA.length < 2) return '+0%';
    const last = TREND_DATA[TREND_DATA.length - 1].adoption;
    const prev = TREND_DATA[TREND_DATA.length - 2].adoption;
    const diff = last - prev;
    return `${diff >= 0 ? '+' : ''}${diff.toFixed(1)}%`;
  }, []);

  const latestNewActive = useMemo(() => {
    if (TREND_DATA.length < 2) return '+0';
    const last = TREND_DATA[TREND_DATA.length - 1].activeUsers;
    const prev = TREND_DATA[TREND_DATA.length - 2].activeUsers;
    const diff = last - prev;
    return `${diff >= 0 ? '+' : ''}${diff}`;
  }, []);

  const practices = useMemo(() => ['All', ...MOCK_DATA.practiceData.map(p => p.name)], []);
  const regions = useMemo(() => ['All', ...MOCK_DATA.regionData.map(r => r.name)], []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard label="Universo Auditado" value={MOCK_DATA.summary.totalUsers} change={`N=${MOCK_DATA.summary.totalUsers}`} icon="👥" />
              <MetricCard label="Usuarios Activos" value={MOCK_DATA.summary.totalActiveUsers} change={`${MOCK_DATA.summary.avgAdoptionRate}% Tasa`} icon="⚡" />
              <MetricCard label="Brecha Gemini App" value={MOCK_DATA.toolAdoption.find(t => t.tool === 'Gemini App')?.none || 0} change="Por activar" positive={false} icon="🤖" />
              <MetricCard label="Práctica Líder" value={MOCK_DATA.summary.topPractice} change={`${MOCK_DATA.practiceData.find(p => p.name === MOCK_DATA.summary.topPractice)?.adoptionRate || 0}% Adopción`} icon="🏆" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-morphism p-6 rounded-2xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <span className="text-xl">📈</span> Tendencia de Adopción (MoM)
                  </h3>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Evolución Histórica MoM</div>
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
                    <p className="text-xl font-bold text-emerald-500">{latestMoMIncrement}</p>
                  </div>
                  <div className="p-3 bg-slate-800/30 rounded-xl border border-slate-700/50 text-center">
                    <p className="text-[10px] text-slate-500 uppercase font-black">Nuevos Usuarios</p>
                    <p className="text-xl font-bold text-orange-500">{latestNewActive}</p>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="lg:col-span-1 space-y-6">
                  <div className="glass-morphism p-6 rounded-2xl border border-slate-700/50">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <span className="text-xl">🎯</span> Segmentación Headcount
                    </h3>
                    <div className="h-[200px] w-full flex items-center">
                      <ResponsiveContainer width="60%" height="100%">
                        <PieChart>
                          <Pie data={usageSegments} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                            {usageSegments.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="w-[40%] space-y-2">
                        {usageSegments.map((seg) => (
                          <div key={seg.name} className="flex flex-col">
                            <span className="text-[9px] text-slate-500 uppercase font-black">{seg.name}</span>
                            <span className="text-sm font-bold">{seg.value} <span className="text-[10px] font-normal">pers.</span></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="glass-morphism p-6 rounded-2xl border border-slate-700/50">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <span className="text-xl">📊</span> Adopción por Level
                    </h3>
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={MOCK_DATA.levelData}>
                          <PolarGrid stroke="#1e293b" />
                          <PolarAngleAxis dataKey="level" tick={{ fill: '#64748b', fontSize: 9 }} />
                          <Radar
                            name="Adopción %"
                            dataKey="avgAdoption"
                            stroke="#F97316"
                            fill="#F97316"
                            fillOpacity={0.5}
                          />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
               </div>

               <div className="lg:col-span-2">
                  <GlobalChampionsTable />
               </div>
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
                label="AMERICAS (N=143)" 
                value="68.5%" 
                change="Líder en Headcount" 
                icon="🌎" 
                positive={selectedRegion === 'All' || selectedRegion === 'AMERICAS'} 
              />
              <MetricCard 
                label="EMEA (N=62)" 
                value="74.2%" 
                change="Líder en Adopción" 
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

      case 'tools': {
        const toolsChartData = MOCK_DATA.toolAdoption.map(t => ({
          name: t.tool,
          'Alta': t.high,
          'Intermedia': t.medium,
          'Baja': t.low,
          'Inactivos': t.none,
          'Total Activos': t.high + t.medium + t.low
        }));

        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Explicación Clave sobre la Taxonomía de Gemini en Workspace */}
            <div className="glass-morphism p-6 rounded-2xl border border-orange-500/30 bg-orange-500/5 leading-relaxed">
              <div className="flex gap-4 items-start">
                <span className="text-3xl">💡</span>
                <div>
                  <h3 className="text-base font-bold text-orange-400">Taxonomía de Gemini en Google Workspace</h3>
                  <p className="text-sm text-slate-300 mt-2">
                    En Google Workspace, la IA de Gemini está <strong>integrada en toda la suite</strong> de productividad corporativa de forma transversal, de modo que:
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-400 mt-3 space-y-2 pl-2">
                    <li><strong className="text-slate-200">Uso General (Universo Consolidado de IA):</strong> Registra usuarios activos en <em>cualquier</em> interacción de IA (redactando correos en Gmail, resumiendo o analizando contenido en Docs/Sheets, o en el portal unificado). Refleja la adopción corporativa total: <strong className="text-emerald-400">75.1% (154 personas activas)</strong>.</li>
                    <li><strong className="text-slate-200">Aplicación Gemini (gemini.google.com):</strong> Representa el uso directo del portal de chat standalone. Ha sido adoptado por <strong className="text-orange-400">109 personas</strong>.</li>
                    <li><strong className="text-slate-200">Gmail AI:</strong> Registra la interacción nativa con la IA desde la bandeja (ayuda para redactar, resúmenes, paneles inteligentes). Cuenta con <strong className="text-indigo-400">50 personas activas</strong>.</li>
                    <li><strong className="text-slate-200">Docs / Sheets AI:</strong> Uso de funciones de asistencia para redacción, análisis y fórmulas en editores tradicionales de Workspace. Cuenta con <strong className="text-purple-400">30 personas activas</strong>.</li>
                  </ul>
                  <p className="text-xs text-amber-400/95 font-bold mt-4 italic">
                    ⚠️ Nota Crítica de Gestión: No se debe asumir que el uso de la IA se limita a la "Aplicación Gemini". De hecho, 45 colaboradores (29.2% de los activos) utilizan las capacidades cognitivas de Gemini de forma exclusiva dentro de herramientas integradas (Gmail/Docs/Sheets) sin entrar al portal de chat tradicional.
                  </p>
                </div>
              </div>
            </div>

            {/* Comparación Gráfica de Herramientas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass-morphism p-6 rounded-2xl border border-slate-700/50">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="text-xl">📊</span> Distribución de Niveles de Actividad por Herramienta
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={toolsChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
                      <Legend />
                      <Bar dataKey="Alta" stackId="a" fill="#F97316" />
                      <Bar dataKey="Intermedia" stackId="a" fill="#3B82F6" />
                      <Bar dataKey="Baja" stackId="a" fill="#10B981" />
                      <Bar dataKey="Inactivos" stackId="a" fill="#1E293B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#F97316]"></div>
                    <span>Nivel Alta</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#3B82F6]"></div>
                    <span>Nivel Intermedia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#10B981]"></div>
                    <span>Nivel Baja</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#1E293B]"></div>
                    <span>Cero Actividad (Inactivos)</span>
                  </div>
                </div>
              </div>

              {/* Tarjetas de Métricas de Herramientas */}
              <div className="space-y-4">
                <div className="p-5 glass-morphism rounded-xl border border-slate-700/50 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[10px] text-slate-500 uppercase font-black">Uso Consolidado (IA General)</h4>
                    <span className="text-2xl font-bold text-white mt-1 block">154 Activos <span className="text-xs text-emerald-500 font-normal">/ 205 Colabs.</span></span>
                    <p className="text-xs text-slate-400 mt-2 font-medium">La métrica definitiva de la incorporación de Gemini en Findasense (75.1% de adopción).</p>
                  </div>
                  <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 rounded p-2 text-center text-xs font-bold text-emerald-500 uppercase">
                    75.1% Cobertura Total
                  </div>
                </div>

                <div className="p-5 glass-morphism rounded-xl border border-slate-700/50 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[10px] text-slate-500 uppercase font-black">Adopción del Chat Standalone</h4>
                    <span className="text-2xl font-bold text-white mt-1 block">109 Activos <span className="text-xs text-orange-500 font-normal">/ 205 Colabs.</span></span>
                    <p className="text-xs text-slate-400 mt-2 font-medium">Uso explícito en el portal unificado web (gemini.google.com).</p>
                  </div>
                  <div className="mt-4 bg-orange-500/10 border border-orange-500/20 rounded p-2 text-center text-xs font-bold text-orange-500 uppercase">
                    53.2% Adoptó el Portal Web
                  </div>
                </div>

                <div className="p-5 glass-morphism rounded-xl border border-slate-700/50 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[10px] text-slate-500 uppercase font-black">Adopción Exclusiva en Apps Integradas</h4>
                    <span className="text-2xl font-bold text-white mt-1 block">45 Activos <span className="text-xs text-indigo-400 font-normal">/ 154 Activos</span></span>
                    <p className="text-xs text-slate-400 mt-2 font-medium">Colaboradores que usan Gemini exclusivamente nativo dentro de Gmail, Docs, o Sheets.</p>
                  </div>
                  <div className="mt-4 bg-indigo-500/10 border border-indigo-500/20 rounded p-2 text-center text-xs font-bold text-indigo-400 uppercase">
                    29.2% Adopción Exclusiva Nativa
                  </div>
                </div>
              </div>
            </div>

            {/* Ficha técnica explicativa detallada */}
            <div className="glass-morphism p-8 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-bold mb-4">Hoja de Ruta del Colaborador en la Adopción de IA</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-sm mb-3">1</div>
                  <h4 className="text-sm font-bold text-white">Adopción Invisible Nática</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">
                    Muchos usuarios inician su camino escribiendo correos con ayuda del asistente "Help me write" de Gmail. Esta adopción no requiere salir de su flujo cotidiano.
                  </p>
                </div>
                <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-sm mb-3">2</div>
                  <h4 className="text-sm font-bold text-white">Evolución al Portal Web</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">
                    Al comprender las capacidades de razonamiento del modelo, los usuarios escalan sus flujos de trabajo abriendo <code className="text-slate-300 font-mono">gemini.google.com</code> para procesar archivos completos o planificar estrategias.
                  </p>
                </div>
                <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-sm mb-3">3</div>
                  <h4 className="text-sm font-bold text-white">Power Users Consolidados</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">
                    Nuestros champions integran ambos mundos de forma simbiótica: usan el chat para análisis estratégico y las integraciones de Gmail/Docs para la ejecución operativa diaria.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'roi': {
        const roiStages = [
          { name: 'Redacción de Contenidos', hoursSaved: 3.5, activeUsers: 52 },
          { name: 'Soporte y Respuestas', hoursSaved: 2.1, activeUsers: 50 },
          { name: 'Análisis e Inteligencia', hoursSaved: 4.2, activeUsers: 20 },
          { name: 'Gestión de Proyectos', hoursSaved: 1.8, activeUsers: 14 }
        ];

        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Cabecera ROI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 glass-morphism rounded-2xl border border-orange-500/20 bg-orange-500/5">
                <span className="text-2xl">⏳</span>
                <h4 className="text-slate-400 text-xs uppercase font-black tracking-wider mt-2">Eficiencia Semanal Promedio</h4>
                <p className="text-3xl font-black mt-1 text-orange-500">2.4 horas</p>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">Ahorradas por usuario activo cada semana en tareas administrativas y de redacción.</p>
              </div>

              <div className="p-6 glass-morphism rounded-2xl border border-slate-700/50">
                <span className="text-2xl">⏱️</span>
                <h4 className="text-slate-400 text-xs uppercase font-black tracking-wider mt-2">Impacto Mensual Consolidado</h4>
                <p className="text-3xl font-black mt-1 text-white">1,478 horas</p>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">Volumen de tiempo neto reutilizado para actividades de mayor valor estratégico y creativo global.</p>
              </div>

              <div className="p-6 glass-morphism rounded-2xl border border-slate-700/50">
                <span className="text-2xl">⚡</span>
                <h4 className="text-slate-400 text-xs uppercase font-black tracking-wider mt-2">Ganancia Operativa Equivalente</h4>
                <p className="text-3xl font-black mt-1 text-emerald-500">9.2 FTEs</p>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">Capacidad técnica liberada para el servicio al cliente y expansión de nuevos negocios Findasense.</p>
              </div>
            </div>

            {/* Cuadro de Productividad por Caso de Uso */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-morphism p-6 rounded-2xl border border-slate-700/50">
                <h3 className="text-lg font-bold mb-4">Ahorro Estimado por Caso de Uso Clave</h3>
                <p className="text-xs text-slate-400 mb-6 font-medium">Basado en benchmarking corporativo e indicadores internos de uso de Gemini en Findasense.</p>
                <div className="space-y-5">
                  {roiStages.map((stage, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-end text-xs">
                        <span className="font-bold text-slate-300">{stage.name}</span>
                        <span className="text-slate-400"><strong className="text-orange-500">{stage.hoursSaved}h</strong> guardadas/semana ({stage.activeUsers} usuarios)</span>
                      </div>
                      <div className="w-full bg-slate-900 border border-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full rounded-full" style={{ width: `${(stage.hoursSaved / 5) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-morphism p-6 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-4">Retorno No Financiero (Inversión Cualitativa)</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <span className="text-emerald-500 text-lg">✓</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">Reducción del estrés laboral</h4>
                        <p className="text-[11px] text-slate-400 font-medium">Automatización de tareas repetitivas o iniciales como redactar borradores complejos o digerir hilos de correo copiosos.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-emerald-500 text-lg">✓</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">Agilidad en toma de decisiones</h4>
                        <p className="text-[11px] text-slate-400 font-medium">Análisis veloz en la hoja de cálculo y resúmenes automáticos usando la integración de Gemini directamente en Workspace.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-emerald-500 text-lg">✓</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">Calidad creativa homogeneizada</h4>
                        <p className="text-[11px] text-slate-400 font-medium">Facilidad para rebotar ideas estratégicas, titulares o esquemas de contenido con la Aplicación Gemini (gemini.google.com).</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 select-none border-t border-slate-800 pt-4 flex justify-between items-center mt-6 font-medium">
                  <span>* FTE = Full Time Equivalent (40h semanales de trabajo)</span>
                  <span>Findasense AI Center of Excellence © 2026</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'inactives': {
        const locations = ["All", "Colombia", "Mexico", "Spain", "Peru", "Chile", "GLOBAL"];
        const practicesInactives = ["All", "Engagement", "Project", "Intelligence", "Content", "Finance", "Consulting", "Client Success", "Business Strategy & Client Success", "Media"];
        const tenures = ["All", "Nuevos (< 6 meses)", "De 6 meses a 1 año", "De 1 a 2 años", "De 2 a 3 años", "Más de 3 años"];
        const levelsInactives = ["All", "Specialist", "Expert", "Coordinator", "Manager"];

        const filteredInactives = INACTIVE_USERS.filter(u => {
          const matchesSearch = u.name.toLowerCase().includes(inactiveSearch.toLowerCase()) || 
                                u.email.toLowerCase().includes(inactiveSearch.toLowerCase()) ||
                                u.position.toLowerCase().includes(inactiveSearch.toLowerCase());
          const matchesPractice = inactivePractice === 'All' || u.practice === inactivePractice;
          const matchesLocation = inactiveLocation === 'All' || u.location === inactiveLocation;
          const matchesTenure = inactiveTenure === 'All' || u.tenureLabel === inactiveTenure;
          const matchesLevel = inactiveLevel === 'All' || u.level === inactiveLevel;
          
          return matchesSearch && matchesPractice && matchesLocation && matchesTenure && matchesLevel;
        });

        // Group analyses for the currently filtered selection
        const locStatsData = (() => {
          const counts: Record<string, number> = {};
          filteredInactives.forEach(u => {
            counts[u.location] = (counts[u.location] || 0) + 1;
          });
          return Object.keys(counts).map(country => ({
            name: country,
            Inactivos: counts[country]
          })).sort((a,b) => b.Inactivos - a.Inactivos);
        })();

        const tenureStatsData = (() => {
          const order = ["Nuevos (< 6 meses)", "De 6 meses a 1 año", "De 1 a 2 años", "De 2 a 3 años", "Más de 3 años"];
          const counts: Record<string, number> = {};
          filteredInactives.forEach(u => {
            counts[u.tenureLabel] = (counts[u.tenureLabel] || 0) + 1;
          });
          return order.map(t => ({
            name: t,
            Inactivos: counts[t] || 0
          }));
        })();

        // List of emails
        const emailsBulk = filteredInactives.map(u => u.email).join('; ');

        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Cabecera de Métricas de Inactividad */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 glass-morphism rounded-2xl border border-red-500/20 bg-red-500/5">
                <span className="text-2xl">🛑</span>
                <h4 className="text-slate-400 text-xs uppercase font-black tracking-wider mt-2">Inactivos Totales</h4>
                <p className="text-3xl font-black mt-1 text-red-500">51 Colabs.</p>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">De un universo total de 205 colaboradores (24.9% de brecha digital).</p>
              </div>

              <div className="p-6 glass-morphism rounded-2xl border border-slate-700/50">
                <span className="text-2xl">🏢</span>
                <h4 className="text-slate-400 text-xs uppercase font-black tracking-wider mt-2">Práctica Crítica</h4>
                <p className="text-3xl font-black mt-1 text-white">Engagement</p>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">26 colaboradores inactivos en esta área (51% de toda la inactividad).</p>
              </div>

              <div className="p-6 glass-morphism rounded-2xl border border-slate-700/50">
                <span className="text-2xl">🌎</span>
                <h4 className="text-slate-400 text-xs uppercase font-black tracking-wider mt-2">Hubs con Mayor Brecha</h4>
                <p className="text-3xl font-black mt-1 text-white">CO & MX</p>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">Colombia cuenta con 17 inactivos y México con 16 inactivos.</p>
              </div>

              <div className="p-6 glass-morphism rounded-2xl border border-slate-700/50">
                <span className="text-2xl">⏳</span>
                <h4 className="text-slate-400 text-xs uppercase font-black tracking-wider mt-2">Paradoja de Antigüedad</h4>
                <p className="text-3xl font-black mt-1 text-orange-500">19 Colabs.</p>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">Cuentan con más de 3 años de antigüedad y aún no registran interacción activa.</p>
              </div>
            </div>

            {/* Dos Gráficos Estadísticos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-morphism p-6 rounded-2xl border border-slate-700/50">
                <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                  <span className="text-lg">📍</span> Inactivos por Ubicación (Mapeo Actual)
                </h3>
                <div className="h-[250px] w-full">
                  {locStatsData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={locStatsData} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                        <XAxis type="number" stroke="#64748b" tickLine={false} axisLine={false} />
                        <YAxis dataKey="name" type="category" stroke="#64748b" width={80} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
                        <Bar dataKey="Inactivos" fill="#EF4444" radius={[0, 4, 4, 0]} barSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500 italic text-sm">Sin datos para la selección actual</div>
                  )}
                </div>
              </div>

              <div className="glass-morphism p-6 rounded-2xl border border-slate-700/50">
                <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                  <span className="text-lg">⏳</span> Inactivos por Rango de Antigüedad (Tenure)
                </h3>
                <div className="h-[250px] w-full">
                  {tenureStatsData.some(d => d.Inactivos > 0) ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={tenureStatsData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} fontSize={10} />
                        <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
                        <Bar dataKey="Inactivos" fill="#F97316" radius={[4, 4, 0, 0]} barSize={25} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500 italic text-sm">Sin datos para la selección actual</div>
                  )}
                </div>
              </div>
            </div>

            {/* Alertas Estratégicas y Recomendaciones */}
            <div className="glass-morphism p-6 rounded-2xl border border-red-500/20 bg-red-500/5 leading-relaxed">
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                <span>⚡</span> Recomendación Táctica de COE Findasense
              </h3>
              <p className="text-xs text-slate-300">
                Los datos indican que la inactividad de Inteligencia Artificial en Findasense no ocurre al azar. El <strong>51% (26 personas)</strong> están localizadas de manera corporativa dentro de la Práctica de <strong>Engagement</strong>. Adicionalmente, hay una presencia sustancial de perfiles senior (más de 3 años de antigüedad) que no han adoptado la herramienta. Recomendamos diseñar un programa de formación dirigido específicamente al equipo de Engagement de Colombia y México, apalancando a los "AI Champions" de esas mismas oficinas como mentores.
              </p>
            </div>

            {/* Filtros e Buscador Interactivos */}
            <div className="glass-morphism p-6 rounded-2xl border border-slate-700/50 space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold">Base de Datos de Colaboradores Inactivos</h3>
                  <p className="text-xs text-slate-500">Filtrar para focalizar listas de correos e iniciativas</p>
                </div>
                
                {/* Copiar Correos */}
                <button
                  onClick={() => {
                    try {
                      navigator.clipboard.writeText(emailsBulk);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 3000);
                    } catch (err) {
                      // Fallback implicit
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 leading-none border  ${
                    copied 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                      : 'bg-orange-500 text-white border-orange-600 hover:bg-orange-600 shadow-lg shadow-orange-500/10'
                  }`}
                >
                  <span>{copied ? '✓ Copiado' : '📋 Copiar toda la lista de correos'}</span>
                  <span className="bg-white/20 px-1.5 py-0.5 rounded text-[9px]">{filteredInactives.length}</span>
                </button>
              </div>

              {/* Los dropdowns de filtros */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Buscar</label>
                  <input
                    type="text"
                    placeholder="Buscar por nombre o cargo..."
                    value={inactiveSearch}
                    onChange={(e) => setInactiveSearch(e.target.value)}
                    className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Práctica</label>
                  <select
                    value={inactivePractice}
                    onChange={(e) => setInactivePractice(e.target.value)}
                    className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    {practicesInactives.map(p => <option key={p} value={p}>{p === 'All' ? 'Todas' : p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Ubicación</label>
                  <select
                    value={inactiveLocation}
                    onChange={(e) => setInactiveLocation(e.target.value)}
                    className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    {locations.map(l => <option key={l} value={l}>{l === 'All' ? 'Todas' : l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nivel</label>
                  <select
                    value={inactiveLevel}
                    onChange={(e) => setInactiveLevel(e.target.value)}
                    className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    {levelsInactives.map(l => <option key={l} value={l}>{l === 'All' ? 'Todos' : l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Antigüedad</label>
                  <select
                    value={inactiveTenure}
                    onChange={(e) => setInactiveTenure(e.target.value)}
                    className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    {tenures.map(t => <option key={t} value={t}>{t === 'All' ? 'Todos' : t}</option>)}
                  </select>
                </div>
              </div>

              {/* Copiar en Bloque en caso de fallar Clipboard en Iframe */}
              <div className="pt-2">
                <details className="cursor-pointer group">
                  <summary className="text-xs text-slate-400 hover:text-orange-500 select-none transition-colors">
                    Ver correos en bloque (formato semicolon para copiar directamente)
                  </summary>
                  <div className="mt-3">
                    <textarea
                      readOnly
                      value={emailsBulk || "No hay correos en la selección actual."}
                      onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                      className="w-full h-16 bg-slate-900 text-slate-300 font-mono text-xs p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-slate-700 resize-none animate-in fade-in duration-300"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">💡 Da un click adentro para seleccionar todo el texto y copiar rápidamente en tu correo o chat.</p>
                  </div>
                </details>
              </div>
            </div>

            {/* La Tabla de Inactivos */}
            <div className="glass-morphism rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="px-6 py-4 bg-slate-800/30 border-b border-slate-800 flex justify-between items-center animate-in fade-in">
                <h4 className="font-bold text-slate-200">Listado de Personas por Activar ({filteredInactives.length})</h4>
                <div className="text-[10px] text-slate-500 font-mono">Snapshot Actual</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-900/50 text-slate-500 text-[10px] uppercase font-black tracking-wider border-b border-slate-800">
                      <th className="px-6 py-4">Colaborador</th>
                      <th className="px-6 py-4">Practice</th>
                      <th className="px-6 py-4">Ubicación</th>
                      <th className="px-6 py-4">Nivel / Cargo</th>
                      <th className="px-6 py-4">Antigüedad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredInactives.length > 0 ? (
                      filteredInactives.map((user) => (
                        <tr key={user.email} className="hover:bg-slate-800/20 group transition-all">
                          <td className="px-6 py-3.5">
                            <div className="font-bold text-slate-200 group-hover:text-red-400 transition-colors">{user.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{user.email}</div>
                          </td>
                          <td className="px-6 py-3.5">
                            <span className="text-xs font-bold text-slate-300">{user.practice}</span>
                          </td>
                          <td className="px-6 py-3.5">
                            <span className="text-xs text-slate-300">{user.location}</span>
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-200">{user.level}</span>
                              <span className="text-[10px] text-slate-500 italic max-w-xs truncate">{user.position}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="flex flex-col">
                              <span className="text-xs font-mono font-bold text-orange-500">{user.tenureYears} años</span>
                              <span className="text-[9px] text-slate-500 font-medium">{user.tenureLabel}</span>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic text-sm">
                          Ningún inactivo cumple con estos filtros. ¡Prueba otra combinación!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

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
            <p className="text-xs font-bold text-slate-200">Últimos 28 días</p>
            <p className="text-[10px] text-orange-500 font-mono mt-1 font-bold">18 DE MAYO DE 2026</p>
          </div>
        </div>
      </div>
      {renderContent()}
    </Layout>
  );
};

export default App;
