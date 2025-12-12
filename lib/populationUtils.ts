// Nüfus yoğunluğu hesaplama ve heat map renklendirme utilities

import { TURKISH_CITIES } from './cities';

// Her ilin nüfus verisi (2024 tahmini - TürkiyeAPI'den gelecek)
export const POPULATION_RANGES = [
  { min: 0, max: 200000, color: '#E0F2FE', label: '0-200K' },
  { min: 200000, max: 500000, color: '#BAE6FD', label: '200K-500K' },
  { min: 500000, max: 1000000, color: '#7DD3FC', label: '500K-1M' },
  { min: 1000000, max: 3000000, color: '#38BDF8', label: '1M-3M' },
  { min: 3000000, max: 5000000, color: '#0EA5E9', label: '3M-5M' },
  { min: 5000000, max: 10000000, color: '#0284C7', label: '5M-10M' },
  { min: 10000000, max: Infinity, color: '#0369A1', label: '10M+' },
];

export function getColorByPopulation(population: number): string {
  for (const range of POPULATION_RANGES) {
    if (population >= range.min && population < range.max) {
      return range.color;
    }
  }
  return POPULATION_RANGES[0].color;
}

export function getPopulationCategory(population: number): string {
  for (const range of POPULATION_RANGES) {
    if (population >= range.min && population < range.max) {
      return range.label;
    }
  }
  return POPULATION_RANGES[0].label;
}

// Bölge bazlı istatistikler
export const REGION_STATISTICS = {
  'Marmara': { cities: 11, avgPopulation: 0 },
  'Ege': { cities: 8, avgPopulation: 0 },
  'Akdeniz': { cities: 8, avgPopulation: 0 },
  'İç Anadolu': { cities: 13, avgPopulation: 0 },
  'Karadeniz': { cities: 18, avgPopulation: 0 },
  'Doğu Anadolu': { cities: 14, avgPopulation: 0 },
  'Güneydoğu Anadolu': { cities: 9, avgPopulation: 0 },
};

// İl nüfus sıralama
export function getTopCitiesByPopulation(cities: any[], limit: number = 10) {
  return cities
    .sort((a, b) => b.population - a.population)
    .slice(0, limit);
}

// Formatters
export function formatPopulation(population: number): string {
  if (population >= 1000000) {
    return `${(population / 1000000).toFixed(1)}M`;
  }
  if (population >= 1000) {
    return `${(population / 1000).toFixed(0)}K`;
  }
  return population.toString();
}
