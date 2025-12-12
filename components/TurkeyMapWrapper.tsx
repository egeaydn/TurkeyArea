// Turkey Map Component Wrapper
'use client';

import React, { useEffect, useState } from 'react';
import TurkeyMap from 'turkey-map-react';
import { TurkeyMapWrapperProps } from '@/lib/types';
import { getColorByPopulation } from '@/lib/populationUtils';

export default function TurkeyMapWrapper({ 
  onHover, 
  onClick
}: TurkeyMapWrapperProps) {
  const [cityColors, setCityColors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tüm illerin nüfuslarını çek ve renkleri hesapla
    async function fetchCityPopulations() {
      try {
        const response = await fetch('https://turkiyeapi.dev/api/v1/provinces');
        const result = await response.json();
        
        if (result.status === 'OK' && result.data) {
          const colors: Record<string, string> = {};
          
          result.data.forEach((province: { name: string; population: number }) => {
            const color = getColorByPopulation(province.population);
            // Türkçe karakterleri normalize et - harita ASCII bekliyor
            const normalizedName = province.name
              .replace(/ı/g, 'i')
              .replace(/İ/g, 'I')
              .replace(/ş/g, 's')
              .replace(/Ş/g, 'S')
              .replace(/ğ/g, 'g')
              .replace(/Ğ/g, 'G')
              .replace(/ü/g, 'u')
              .replace(/Ü/g, 'U')
              .replace(/ö/g, 'o')
              .replace(/Ö/g, 'O')
              .replace(/ç/g, 'c')
              .replace(/Ç/g, 'C');
            
            colors[normalizedName] = color;
          });
          
          console.log('Normalize edilmiş şehir renkleri:', colors);
          setCityColors(colors);
        }
      } catch (error) {
        console.error('Nüfus verileri yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCityPopulations();
  }, []);

  // customStyle objesini oluştur
  const customStyle = React.useMemo(() => {
    // Varsayılan stil - tüm iller için
    const defaultStyle: {
      idleColor: string;
      hoverColor: string;
      [key: string]: string | { idleColor: string; hoverColor: string };
    } = {
      idleColor: '#F3F2EC',
      hoverColor: '#E62727'
    };

    // Eğer renkler yüklenmemişse varsayılan stili döndür
    if (loading || Object.keys(cityColors).length === 0) {
      return defaultStyle;
    }

    // Şehir renklerini ekle
    Object.keys(cityColors).forEach((cityName) => {
      defaultStyle[cityName] = {
        idleColor: cityColors[cityName],
        hoverColor: '#E62727'
      };
    });

    console.log('CustomStyle uygulandı, toplam şehir:', Object.keys(cityColors).length);
    return defaultStyle;
  }, [cityColors, loading]);

  return (
    <div className="w-full flex items-center justify-center p-8">
      <div className="w-full max-w-5xl">
        <TurkeyMap
          hoverable={true}
          onHover={({ plateNumber, name }) => onHover({ name, plateNumber })}
          onClick={({ plateNumber, name }) => onClick({ name, plateNumber })}
          customStyle={customStyle}
        />
      </div>
    </div>
  );
}
