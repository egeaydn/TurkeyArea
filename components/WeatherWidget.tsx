// Weather Widget Component
'use client';

import { motion } from 'framer-motion';
import { useWeather } from '@/hooks/useWeather';
import { WeatherWidgetProps } from '@/lib/types';
import LoadingSpinner from './LoadingSpinner';

export default function WeatherWidget({ city }: WeatherWidgetProps) {
  const { data, error, isLoading } = useWeather(city);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-sm text-red-500 p-4 bg-red-50 rounded-lg">
        Hava durumu yüklenemedi
      </div>
    );
  }

  if (!data) return null;

  const temp = Math.round(data.main.temp);
  const description = data.weather[0]?.description || 'Bilinmiyor';
  const icon = data.weather[0]?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-blue-100 via-cyan-50 to-sky-100 rounded-xl p-5 border border-blue-200 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🌤️</span>
        <h3 className="text-sm font-bold text-blue-900">
          Anlık Hava Durumu
        </h3>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {icon && (
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
              className="w-20 h-20 drop-shadow-lg"
            />
          )}
          <div>
            <p className="text-4xl font-extrabold bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {temp}°C
            </p>
            <p className="text-sm text-gray-700 capitalize font-medium mt-1">{description}</p>
          </div>
        </div>

        <div className="text-right space-y-2">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs">
            <p className="text-gray-500 font-medium">Nem</p>
            <p className="text-blue-700 font-bold">{data.main.humidity}%</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs">
            <p className="text-gray-500 font-medium">Rüzgar</p>
            <p className="text-blue-700 font-bold">{Math.round(data.wind.speed)} m/s</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
