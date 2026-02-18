
export interface DepartmentMetric {
  name: string;
  adoptionRate: number;
  users: number;
  activeUsers: number;
}

export interface RegionMetric {
  name: string;
  users: number;
  adoptionRate: number;
}

export interface LocationMetric {
  country: string;
  users: number;
  activeRate: number;
}

export interface LevelMetric {
  level: string;
  count: number;
  avgAdoption: number;
}

export interface ToolUsage {
  tool: string;
  high: number;
  medium: number;
  low: number;
  none: number;
}

export interface DashboardData {
  summary: {
    totalActiveUsers: number;
    totalUsers: number;
    avgAdoptionRate: number;
    topRegion: string;
    topPractice: string;
  };
  practiceData: DepartmentMetric[];
  regionData: RegionMetric[];
  locationData: LocationMetric[];
  levelData: LevelMetric[];
  toolAdoption: ToolUsage[];
}
