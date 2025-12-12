// Additional Province Information Component
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { useWikipediaInfo } from '@/hooks/useWikipediaInfo';
import LoadingSpinner from './LoadingSpinner';

interface AdditionalInfoProps {
  cityName: string;
}

type TabType = 'about' | 'tourism' | 'culture';

export default function AdditionalInfo({ cityName }: AdditionalInfoProps) {
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const { data, error, isLoading } = useWikipediaInfo(cityName);

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'about', label: 'Hakkında', icon: '📖' },
    { id: 'tourism', label: 'Turizm', icon: '🏛️' },
    { id: 'culture', label: 'Kültür', icon: '🎭' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full"
    >
      {/* Horizontal Tab Cards - Larger */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`p-4 rounded-xl font-semibold text-sm transition-all shadow-md h-[110px] flex flex-col items-center justify-center ${
              activeTab === tab.id
                ? 'bg-gradient-to-br from-[#E62727] to-[#c41f1f] text-white shadow-xl scale-105'
                : 'bg-white text-gray-700 hover:shadow-lg border-2 border-[#DCDCDC]'
            }`}
          >
            <div className="text-3xl mb-2">{tab.icon}</div>
            <div className="text-sm font-bold">{tab.label}</div>
          </motion.button>
        ))}
      </div>

      {/* Content Card */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl border-2 border-[#DCDCDC] shadow-lg overflow-hidden"
      >
        <div className="p-5">
          {activeTab === 'about' && (
            <div>
              {isLoading && <LoadingSpinner />}
              
              {error && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Bilgi yüklenemedi
                </p>
              )}

              {data && (
                <div className="space-y-4">
                  <div className="flex gap-4">
                    {data.thumbnail && (
                      <Image
                        src={data.thumbnail.source}
                        alt={data.title}
                        width={128}
                        height={128}
                        className="w-32 h-32 object-cover rounded-lg border-2 border-[#DCDCDC] flex-shrink-0"
                        unoptimized
                      />
                    )}
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-2 text-lg">{data.title}</h4>
                      {data.description && (
                        <p className="text-sm text-[#E62727] font-semibold mb-2">
                          {data.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {data.extract}
                  </p>

                  <a
                    href={`https://tr.wikipedia.org/wiki/${encodeURIComponent(cityName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#E62727] hover:text-[#1E93AB] font-semibold transition-colors"
                  >
                    Daha fazla bilgi
                    <span>→</span>
                  </a>
                </div>
              )}
            </div>
          )}

          {activeTab === 'tourism' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏛️</span>
                <p className="text-sm font-bold text-gray-800">
                  <strong className="text-[#E62727]">{cityName}</strong> bölgesindeki popüler turistik yerler:
                </p>
              </div>
              <div className="bg-[#F3F2EC] rounded-lg p-5 text-sm text-gray-700 border-2 border-[#DCDCDC]">
                <p className="italic">
                  Turistik yerler yakında eklenecek. Wikipedia ve TripAdvisor entegrasyonu üzerinde çalışılıyor...
                </p>
              </div>
            </div>
          )}

          {activeTab === 'culture' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎭</span>
                <p className="text-sm font-bold text-gray-800">
                  <strong className="text-[#E62727]">{cityName}</strong> kültürel özellikleri:
                </p>
              </div>
              <div className="bg-[#F3F2EC] rounded-lg p-5 text-sm text-gray-700 border-2 border-[#DCDCDC]">
                <p className="italic">
                  Yerel yemekler, festivaller ve kültürel özellikler yakında eklenecek...
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
