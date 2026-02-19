
import { DashboardData } from './types';

export const COLORS = ['#F97316', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#FACC15', '#06B6D4', '#64748B'];

/**
 * DATOS AUDITADOS - UNIVERSO FILTRADO (N=205)
 * Basado exclusivamente en el cruce de Actividad + Datos Demográficos.
 */
export const MOCK_DATA: DashboardData = {
  summary: {
    totalActiveUsers: 110, 
    totalUsers: 205,
    avgAdoptionRate: 53.6,
    topRegion: 'AMERICAS (Colombia Hub)',
    topPractice: 'Intelligence'
  },
  practiceData: [
    { name: 'Engagement', adoptionRate: 58, users: 82, activeUsers: 48 },
    { name: 'Intelligence', adoptionRate: 85, users: 32, activeUsers: 27 },
    { name: 'Content', adoptionRate: 45, users: 28, activeUsers: 13 },
    { name: 'Project', adoptionRate: 32, users: 25, activeUsers: 8 },
    { name: 'Strategy', adoptionRate: 78, users: 14, activeUsers: 11 },
    { name: 'Consulting', adoptionRate: 40, users: 10, activeUsers: 4 },
    { name: 'Finance/Corp', adoptionRate: 25, users: 14, activeUsers: 3 },
  ],
  regionData: [
    { name: 'AMERICAS', users: 124, adoptionRate: 56.5 },
    { name: 'EMEA', users: 81, adoptionRate: 49.3 },
  ],
  locationData: [
    { country: 'Colombia', users: 84, activeRate: 62 },
    { country: 'Spain', users: 81, activeRate: 49 },
    { country: 'Mexico', users: 32, activeRate: 44 },
    { country: 'Chile', users: 4, activeRate: 25 },
    { country: 'Peru', users: 3, activeRate: 33 },
    { country: 'Costa Rica', users: 1, activeRate: 100 },
  ],
  levelData: [
    { level: 'Expert', count: 72, avgAdoption: 68 },
    { level: 'Specialist', count: 65, avgAdoption: 42 },
    { level: 'Coordinator', count: 32, avgAdoption: 35 },
    { level: 'Lead/Head', count: 18, avgAdoption: 88 },
    { level: 'Manager', count: 12, avgAdoption: 82 },
    { level: 'Support', count: 6, avgAdoption: 15 },
  ],
  toolAdoption: [
    { tool: 'Uso General', high: 17, medium: 93, low: 45, none: 50 },
    { tool: 'Gemini App', high: 13, medium: 41, low: 22, none: 129 },
    { tool: 'Gmail AI', high: 62, medium: 24, low: 18, none: 101 },
    { tool: 'Presentaciones', high: 38, medium: 31, low: 35, none: 101 },
  ],
};

export const TREND_DATA = [
  { month: 'Enero 2026', adoption: 44.2, activeUsers: 84 },
  { month: 'Febrero 2026', adoption: 53.6, activeUsers: 110 },
];

export const ENRICHED_POWER_USERS = [
  { 
    email: 'facundo@findasense.com', 
    practice: 'Client Success', 
    region: 'AMERICAS', 
    level: 'Manager', 
    location: 'Mexico', 
    gemini: 'Intermedia', 
    days: 24 
  },
  { 
    email: 'hector.galicia@findasense.com', 
    practice: 'Intelligence', 
    region: 'AMERICAS', 
    level: 'Expert', 
    location: 'Mexico', 
    gemini: 'Alta', 
    days: 20 
  },
  { 
    email: 'ilaria.foglio@findasense.com', 
    practice: 'Engagement', 
    region: 'EMEA', 
    level: 'Specialist', 
    location: 'Spain', 
    gemini: 'Intermedia', 
    days: 20 
  },
  { 
    email: 'alba.sanchez@findasense.com', 
    practice: 'Engagement', 
    region: 'EMEA', 
    level: 'Expert', 
    location: 'Spain', 
    gemini: 'Alta', 
    days: 19 
  },
  { 
    email: 'julia.giorgi@findasense.com', 
    practice: 'Intelligence', 
    region: 'EMEA', 
    level: 'Expert', 
    location: 'Spain', 
    gemini: 'Alta', 
    days: 17 
  }
];

export const STRATEGIC_INSIGHTS = `• La tasa de adopción del 53.6% indica una masa crítica alcanzada, superando la mitad del universo auditado, lo que valida la utilidad de las herramientas en el flujo de trabajo diario.

• Para cerrar la brecha en Project Management (32%), se recomienda implementar "AI-Sprints" de 15 minutos semanales enfocados en automatización de minutas y seguimiento de tareas.

• Movilizar a los 129 inactivos de la Gemini App representaría un incremento potencial del 117% en la capacidad de procesamiento de información estratégica en tiempo real.`;
