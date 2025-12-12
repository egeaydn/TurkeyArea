// Nüfus yoğunluğu hesaplama ve heat map renklendirme utilities

// Her ilin nüfus verisi (2024 tahmini - TürkiyeAPI'den gelecek)
// Kırmızı tonları: açık pembe/krem'den koyu kırmızıya
export const POPULATION_RANGES = [
  { min: 0, max: 200000, color: '#FFF5F5', label: '0-200K' }, // Çok açık pembe/krem
  { min: 200000, max: 500000, color: '#FFE5E5', label: '200K-500K' }, // Açık pembe
  { min: 500000, max: 1000000, color: '#FFCCCC', label: '500K-1M' }, // Açık kırmızımsı
  { min: 1000000, max: 3000000, color: '#FF9999', label: '1M-3M' }, // Orta açık kırmızı
  { min: 3000000, max: 5000000, color: '#FF6666', label: '3M-5M' }, // Orta kırmızı
  { min: 5000000, max: 10000000, color: '#FF3333', label: '5M-10M' }, // Koyu kırmızı
  { min: 10000000, max: Infinity, color: '#E62727', label: '10M+' }, // Çok koyu kırmızı
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
export function getTopCitiesByPopulation(cities: Array<{ population: number }>, limit: number = 10) {
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
