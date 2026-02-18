
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  change: string;
  positive?: boolean;
  icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, positive = true, icon }) => {
  return (
    <div className="glass-morphism p-6 rounded-2xl flex flex-col gap-4 border border-slate-700/50 hover:border-orange-500/30 transition-all group">
      <div className="flex items-center justify-between">
        <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{icon}</span>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${positive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
          {positive ? '↑' : '↓'} {change}
        </span>
      </div>
      <div>
        <h4 className="text-slate-400 text-sm font-medium">{label}</h4>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;
