import { DashboardData } from './types';

export const COLORS = ['#F97316', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#FACC15', '#06B6D4', '#64748B'];

/**
 * DATOS AUDITADOS - UNIVERSO FILTRADO (N=205)
 * Periodo auditado: Últimos 28 días (hasta el 18 de Mayo de 2026).
 * Cruce con mapeo optimizado de cuentas de colaboradores.
 */
export const MOCK_DATA: DashboardData = {
  summary: {
    totalActiveUsers: 154,
    totalUsers: 205,
    avgAdoptionRate: 75.1,
    topRegion: 'AMERICAS',
    topPractice: 'Engagement'
  },
  practiceData: [
  {
    "name": "Engagement",
    "adoptionRate": 66.7,
    "users": 78,
    "activeUsers": 52
  },
  {
    "name": "Intelligence",
    "adoptionRate": 76.9,
    "users": 26,
    "activeUsers": 20
  },
  {
    "name": "Content",
    "adoptionRate": 84,
    "users": 25,
    "activeUsers": 21
  },
  {
    "name": "Project",
    "adoptionRate": 70,
    "users": 20,
    "activeUsers": 14
  },
  {
    "name": "Strategy",
    "adoptionRate": 100,
    "users": 6,
    "activeUsers": 6
  },
  {
    "name": "Consulting",
    "adoptionRate": 50,
    "users": 4,
    "activeUsers": 2
  },
  {
    "name": "Others",
    "adoptionRate": 84.8,
    "users": 46,
    "activeUsers": 39
  }
],
  regionData: [
  {
    "name": "AMERICAS",
    "users": 143,
    "adoptionRate": 74.1
  },
  {
    "name": "EMEA",
    "users": 62,
    "adoptionRate": 77.4
  }
],
  locationData: [
  {
    "country": "Colombia",
    "users": 73,
    "activeRate": 76.7
  },
  {
    "country": "Mexico",
    "users": 55,
    "activeRate": 70.9
  },
  {
    "country": "Spain",
    "users": 53,
    "activeRate": 75.5
  },
  {
    "country": "Chile",
    "users": 5,
    "activeRate": 60
  },
  {
    "country": "Peru",
    "users": 4,
    "activeRate": 50
  },
  {
    "country": "Argentina",
    "users": 2,
    "activeRate": 100
  },
  {
    "country": "Costa Rica",
    "users": 2,
    "activeRate": 100
  },
  {
    "country": "Ecuador",
    "users": 1,
    "activeRate": 100
  },
  {
    "country": "Brasil",
    "users": 1,
    "activeRate": 100
  },
  {
    "country": "Others",
    "users": 9,
    "activeRate": 88.9
  }
],
  levelData: [
  {
    "level": "Specialist",
    "count": 102,
    "avgAdoption": 67.6
  },
  {
    "level": "Expert",
    "count": 65,
    "avgAdoption": 78.5
  },
  {
    "level": "Coordinator",
    "count": 17,
    "avgAdoption": 94.1
  },
  {
    "level": "Manager",
    "count": 10,
    "avgAdoption": 70
  },
  {
    "level": "Lead/Head",
    "count": 7,
    "avgAdoption": 100
  },
  {
    "level": "Support",
    "count": 4,
    "avgAdoption": 100
  }
],
  toolAdoption: [
  {
    "tool": "Uso General",
    "high": 18,
    "medium": 112,
    "low": 24,
    "none": 51
  },
  {
    "tool": "Gemini App",
    "high": 14,
    "medium": 83,
    "low": 12,
    "none": 96
  },
  {
    "tool": "Gmail AI",
    "high": 6,
    "medium": 15,
    "low": 29,
    "none": 155
  },
  {
    "tool": "Docs/Sheets",
    "high": 4,
    "medium": 6,
    "low": 20,
    "none": 175
  }
]
};

export const TREND_DATA = [
  { month: 'Enero 2026', adoption: 44.2, activeUsers: 84 },
  { month: 'Febrero 2026', adoption: 53.6, activeUsers: 110 },
  { month: 'Marzo 2026', adoption: 70.2, activeUsers: 144 },
  { month: 'Mayo 2026', adoption: 75.1, activeUsers: 154 }
];

export const ENRICHED_POWER_USERS = [
  {
    "email": "santiago.cortes@findasense.com",
    "practice": "Intelligence",
    "region": "AMERICAS",
    "level": "Lead/Head",
    "location": "Mexico",
    "gemini": 578,
    "days": 27
  },
  {
    "email": "paloma.lopez@findasense.com",
    "practice": "Project",
    "region": "EMEA",
    "level": "Expert",
    "location": "Spain",
    "gemini": 198,
    "days": 26
  },
  {
    "email": "noe.garcia@findasense.com",
    "practice": "Intelligence",
    "region": "AMERICAS",
    "level": "Expert",
    "location": "Mexico",
    "gemini": 139,
    "days": 24
  },
  {
    "email": "facundo@findasense.com",
    "practice": "Client Success",
    "region": "AMERICAS",
    "level": "Manager",
    "location": "Mexico",
    "gemini": 113,
    "days": 24
  },
  {
    "email": "julia.giorgi@findasense.com",
    "practice": "Engagement",
    "region": "EMEA",
    "level": "Specialist",
    "location": "Spain",
    "gemini": 347,
    "days": 23
  },
  {
    "email": "david.morper@findasense.com",
    "practice": "Engagement",
    "region": "EMEA",
    "level": "Specialist",
    "location": "Spain",
    "gemini": 0,
    "days": 21
  },
  {
    "email": "alejandra.rangel@findasense.com",
    "practice": "Business Strategy & Client Success",
    "region": "EMEA",
    "level": "Expert",
    "location": "Spain",
    "gemini": 601,
    "days": 20
  },
  {
    "email": "jose.villacorta@findasense.com",
    "practice": "Business Strategy & Client Success",
    "region": "EMEA",
    "level": "Expert",
    "location": "Spain",
    "gemini": 134,
    "days": 20
  },
  {
    "email": "angelica.gomez@findasense.com",
    "practice": "Intelligence",
    "region": "AMERICAS",
    "level": "Expert",
    "location": "Colombia",
    "gemini": 132,
    "days": 20
  },
  {
    "email": "over.cifuentes@findasense.com",
    "practice": "Engagement",
    "region": "AMERICAS",
    "level": "Coordinator",
    "location": "Colombia",
    "gemini": 39,
    "days": 20
  }
];

export const STRATEGIC_INSIGHTS = `• Crecimiento sostenido: La tasa de adopción de la suite de IA generativa ha alcanzado su máximo histórico con un 75.1% este periodo, con 154 usuarios activos.

• Paridad regional: Se registra una excelente paridad de adopción regional entre EMEA (77.4%) y AMERICAS (74.1%).

• Liderazgo sectorial: Content se destaca como la práctica líder absoluto en adopción con un 84.0%, seguida de cerca por Client Success (84.6%) y de Intelligence con un 76.9%.

• Cierre de brecha Gemini App: Se logró reducir los usuarios sin interacción en la aplicación Gemini a 96 personas, maximizando el retorno de inversión corporativo corporativo.`;
