'use client';

import { useState, useEffect } from 'react';
import TurkeyMapWrapper from '@/components/TurkeyMapWrapper';
import ProvinceCard from '@/components/ProvinceCard';
import StatisticsChart from '@/components/StatisticsChart';
import HeatMapLegend from '@/components/HeatMapLegend';
import { Province } from '@/lib/types';

export default function Home() {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [showStatistics, setShowStatistics] = useState(false);
  const [citiesData, setCitiesData] = useState<Array<{ name: string; population: number; districts: number }>>([]);

  const handleHover = (province: Province | null) => {
    if (!selectedProvince) {
      setHoveredProvince(province?.name || null);
    }
  };

  const handleClick = (province: Province) => {
    setSelectedProvince(province.name);
    setHoveredProvince(null);
  };

  const handleClose = () => {
    setSelectedProvince(null);
  };

  const displayProvince = selectedProvince || hoveredProvince;

  // Fetch all cities data for statistics
  useEffect(() => {
    const mockData = [
      { name: 'İstanbul', population: 15655924, districts: 39 },
      { name: 'Ankara', population: 5747325, districts: 25 },
      { name: 'İzmir', population: 4462056, districts: 30 },
      { name: 'Bursa', population: 3139744, districts: 17 },
      { name: 'Antalya', population: 2619832, districts: 19 },
      { name: 'Adana', population: 2274106, districts: 15 },
      { name: 'Konya', population: 2277017, districts: 31 },
      { name: 'Şanlıurfa', population: 2155060, districts: 13 },
      { name: 'Gaziantep', population: 2130432, districts: 9 },
      { name: 'Kocaeli', population: 2033441, districts: 12 },
    ];
    setCitiesData(mockData);
  }, []);

  return (
    <main className="min-h-screen bg-[#F3F2EC] relative">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#E62727] via-[#1E93AB] to-[#E62727] bg-clip-text text-transparent mb-2">
            AreScore
          </h1>
          <p className="text-gray-700 text-base font-medium">
            🗺️ Türkiye İnteraktif Harita - İl Bilgileri ve Hava Durumu
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-6 items-start">
          {/* Map Section */}
          <div className="relative">
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-[#DCDCDC] overflow-hidden min-h-[700px] flex items-center justify-center hover:shadow-3xl transition-all duration-300 group">
              <TurkeyMapWrapper
                onHover={handleHover}
                onClick={handleClick}
                selectedProvince={selectedProvince || undefined}
              />
              
              {/* Heat Map Legend - Floating Bottom Left */}
              <div className="absolute bottom-6 left-6 z-10">
                <HeatMapLegend />
              </div>

              {/* Statistics Button - Floating Top Right */}
              <button
                onClick={() => setShowStatistics(!showStatistics)}
                className="absolute top-6 right-6 z-10 px-5 py-2.5 bg-gradient-to-r from-[#1E93AB] to-[#E62727] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2 backdrop-blur-sm"
              >
                <span>{showStatistics ? '📊' : '📈'}</span>
                <span className="hidden sm:inline">{showStatistics ? 'İstatistikleri Gizle' : 'İstatistikler'}</span>
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="sticky top-6">
            {displayProvince ? (
              <ProvinceCard
                provinceName={displayProvince}
                onClose={selectedProvince ? handleClose : undefined}
              />
            ) : (
              <div className="bg-white/90 rounded-3xl shadow-xl border-2 border-[#DCDCDC] p-8 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 animate-bounce">🗺️</div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-[#E62727] to-[#1E93AB] bg-clip-text text-transparent mb-2">
                    Hoş Geldiniz!
                  </h3>
                  <p className="text-sm text-gray-600">Türkiye&apos;nin her yerini keşfedin</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#1E93AB]/10 hover:bg-[#1E93AB]/20 transition-colors border border-[#1E93AB]/20">
                    <span className="text-2xl">🖱️</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Üzerine Gelin</p>
                      <p className="text-xs text-gray-600">İllerin üzerine fareyi getirin</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#E62727]/10 hover:bg-[#E62727]/20 transition-colors border border-[#E62727]/20">
                    <span className="text-2xl">👆</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Tıklayın</p>
                      <p className="text-xs text-gray-600">Detaylı bilgi için tıklayın</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#1E93AB]/10 hover:bg-[#1E93AB]/20 transition-colors border border-[#1E93AB]/20">
                    <span className="text-2xl">🌤️</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Hava Durumu</p>
                      <p className="text-xs text-gray-600">Anlık hava durumunu görün</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#E62727]/10 hover:bg-[#E62727]/20 transition-colors border border-[#E62727]/20">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">İstatistikler</p>
                      <p className="text-xs text-gray-600">Nüfus verilerini inceleyin</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-xs text-gray-600">
          <p>
            Veriler:{' '}
            <a
              href="https://api.turkiyeapi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1E93AB] hover:text-[#E62727] hover:underline font-medium transition-colors"
            >
              TürkiyeAPI
            </a>
            {' • '}
            <a
              href="https://openweathermap.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1E93AB] hover:text-[#E62727] hover:underline font-medium transition-colors"
            >
              OpenWeather
            </a>
            {' • '}
            <a
              href="https://tr.wikipedia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1E93AB] hover:text-[#E62727] hover:underline font-medium transition-colors"
            >
              Wikipedia
            </a>
          </p>
        </footer>
      </div>

      {showStatistics && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowStatistics(false)}>
          <div 
            className="bg-[#F3F2EC] rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border-2 border-[#DCDCDC]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#1E93AB] to-[#E62727] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  📊 Nüfus İstatistikleri
                </h2>
                <p className="text-white/90 text-sm mt-1">En kalabalık 10 il</p>
              </div>
              <button
                onClick={() => setShowStatistics(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {citiesData.length > 0 && (
                <StatisticsChart data={citiesData} />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
