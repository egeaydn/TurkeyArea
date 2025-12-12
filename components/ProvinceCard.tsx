// Province Information Card Component
'use client';

import { motion } from 'framer-motion';
import { useProvinceInfo } from '@/hooks/useProvinceInfo';
import { ProvinceCardProps } from '@/lib/types';
import WeatherWidget from './WeatherWidget';
import LoadingSpinner from './LoadingSpinner';

export default function ProvinceCard({ provinceName, onClose }: ProvinceCardProps) {
  const { data, error, isLoading } = useProvinceInfo(provinceName);

  return (
    <motion.div
      initial={{ x: 300, opacity: 0, scale: 0.9 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: 300, opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="bg-gradient-to-br from-white via-white to-blue-50 rounded-2xl shadow-2xl border border-blue-100 p-7 w-full h-fit backdrop-blur-sm"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {provinceName}
          </h2>
          <p className="text-xs text-gray-500 mt-1">İl Bilgileri</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all text-xl leading-none rounded-full w-8 h-8 flex items-center justify-center hover:rotate-90 duration-300"
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
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="Nüfus" value={data.population.toLocaleString('tr-TR')} />
            <InfoItem label="İlçe Sayısı" value={data.districts.length.toString()} />
            <InfoItem label="Alan Kodu" value={data.areaCode} />
            <InfoItem label="Plaka" value={data.id.toString()} />
          </div>

          <div className="pt-4 border-t border-gray-200">
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
      whileHover={{ scale: 1.05, y: -2 }}
      className="bg-gradient-to-br from-slate-50 to-blue-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all cursor-default shadow-sm hover:shadow-md"
    >
      <p className="text-xs font-medium text-blue-600 mb-1.5">{label}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </motion.div>
  );
}
