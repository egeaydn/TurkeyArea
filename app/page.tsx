'use client';

import { useState } from 'react';
import TurkeyMapWrapper from '@/components/TurkeyMapWrapper';
import ProvinceCard from '@/components/ProvinceCard';
import { Province } from '@/lib/types';

export default function Home() {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            AreScore
          </h1>
          <p className="text-gray-600 text-lg">
            🗺️ Türkiye İnteraktif Harita - İl Bilgileri ve Hava Durumu
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">
          {/* Map Section */}
          <div className="bg-blue-200/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 overflow-hidden min-h-[600px] flex items-center justify-center hover:shadow-3xl transition-shadow duration-300">
            <TurkeyMapWrapper
              onHover={handleHover}
              onClick={handleClick}
              selectedProvince={selectedProvince || undefined}
            />
          </div>

          {/* Info Section */}
          <div className="sticky top-8">
            {displayProvince ? (
              <ProvinceCard
                provinceName={displayProvince}
                onClose={selectedProvince ? handleClose : undefined}
              />
            ) : (
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100 p-8 h-fit">
                <div className="text-6xl mb-4 text-center">👋</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  Hoş Geldiniz!
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">🖱️</span>
                    <span>Harita üzerindeki illerin üzerine gelin</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">👆</span>
                    <span>Tıklayarak detaylı bilgi görün</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">🌤️</span>
                    <span>Anlık hava durumunu takip edin</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-gray-500">
          <p>
            Veriler:{' '}
            <a
              href="https://api.turkiyeapi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              TürkiyeAPI
            </a>
            {' & '}
            <a
              href="https://openweathermap.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              OpenWeather
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
