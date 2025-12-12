// Province Information Card Component
'use client';

import { motion } from 'framer-motion';
import { useProvinceInfo } from '@/hooks/useProvinceInfo';
import { ProvinceCardProps } from '@/lib/types';
import WeatherWidget from './WeatherWidget';
import AdditionalInfo from './AdditionalInfo';
import LoadingSpinner from './LoadingSpinner';
import { getColorByPopulation, getPopulationCategory } from '@/lib/populationUtils';

export default function ProvinceCard({ provinceName, onClose }: ProvinceCardProps) {
  const { data, error, isLoading } = useProvinceInfo(provinceName);

  return (
    <motion.div
      initial={{ x: 300, opacity: 0, scale: 0.9 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: 300, opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="bg-white/95 rounded-2xl shadow-2xl border-2 border-[#DCDCDC] p-7 w-full h-176 backdrop-blur-sm max-h-[85vh] overflow-y-auto"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#E62727] to-[#1E93AB] bg-clip-text text-transparent">
            {provinceName}
          </h2>
          <p className="text-xs text-gray-600 mt-1 font-medium">İl Bilgileri</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#E62727] hover:bg-[#E62727]/10 transition-all text-xl leading-none rounded-full w-8 h-8 flex items-center justify-center hover:rotate-90 duration-300"
            aria-label="Kapat"
          >
            ✕
          </button>
        )}
      </div>

      {isLoading && <LoadingSpinner />}

      {error && (
        <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">
          Veri yüklenirken hata oluştu.
        </div>
      )}

      {data && (
        <div className="space-y-5">
          {/* Nüfus Yoğunluğu Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white shadow-md"
            style={{ backgroundColor: getColorByPopulation(data.population) }}
          >
            <span>📊</span>
            <span>{getPopulationCategory(data.population)}</span>
          </div>

          {/* Info Items Grid - Equal heights */}
          <div className="grid grid-cols-2 gap-3">
            <InfoItem label="Nüfus" value={data.population.toLocaleString('tr-TR')} />
            <InfoItem label="İlçe Sayısı" value={data.districts.length.toString()} />
            <InfoItem label="Alan Kodu" value={data.areaCode} />
            <InfoItem label="Plaka" value={data.id.toString()} />
          </div>

          {/* Wikipedia & Additional Info - Bigger section */}
          <AdditionalInfo cityName={provinceName} />

          <div className="pt-4 border-t-2 border-[#DCDCDC]">
            <WeatherWidget city={provinceName} />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      className="bg-[#F3F2EC] p-3.5 rounded-xl border-2 border-[#DCDCDC] hover:border-[#1E93AB] transition-all cursor-default shadow-sm hover:shadow-md h-[90px] flex flex-col justify-center"
    >
      <p className="text-xs font-semibold text-[#1E93AB] mb-1">{label}</p>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </motion.div>
  );
}
