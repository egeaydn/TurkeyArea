// Heat Map Legend Component
'use client';

import { motion } from 'framer-motion';
import { POPULATION_RANGES } from '@/lib/populationUtils';

export default function HeatMapLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border-2 border-[#DCDCDC] p-4"
    >
      <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
        <span>🗺️</span>
        Nüfus Yoğunluğu
      </h3>
      
      <div className="space-y-2">
        {POPULATION_RANGES.map((range, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className="w-8 h-4 rounded border border-gray-300"
              style={{ backgroundColor: range.color }}
            />
            <span className="text-xs text-gray-600 font-medium">
              {range.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
