// Turkey Map Component Wrapper
'use client';

import React, { useEffect, useState } from 'react';
import TurkeyMap from 'turkey-map-react';
import { TurkeyMapWrapperProps } from '@/lib/types';
import { getColorByPopulation } from '@/lib/populationUtils';
import { API_ENDPOINTS } from '@/lib/constants';
import { normalizeTurkishChars } from '@/lib/cities';

export default function TurkeyMapWrapper({ 
  onHover, 
  onClick, 
  selectedProvince 
}: TurkeyMapWrapperProps) {
  const [cityColors, setCityColors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const mapContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tüm illerin nüfuslarını çek ve renkleri hesapla
    async function fetchCityPopulations() {
      try {
        // Doğru API endpoint'ini kullan
        const response = await fetch(`${API_ENDPOINTS.TURKIYE_API}/provinces`);
        const result = await response.json();
        
        if (result.status === 'OK' && result.data && Array.isArray(result.data)) {
          const colors: Record<string, string> = {};
          const normalizedMap: Record<string, string> = {}; // Normalize edilmiş isim -> Orijinal isim mapping
          const missingData: string[] = []; // Veri eksik olan şehirler
          
          result.data.forEach((province: any) => {
            if (province.name && province.population) {
              const color = getColorByPopulation(province.population);
              const normalizedName = normalizeTurkishChars(province.name);
              
              // Hem orijinal hem de normalize edilmiş isimle sakla
              colors[province.name] = color;
              colors[normalizedName] = color;
              normalizedMap[normalizedName] = province.name;
            } else if (province.name) {
              // İsmi var ama nüfus yok
              missingData.push(province.name);
            }
          });
          
          console.log('✅ Şehir renkleri yüklendi, toplam:', Object.keys(colors).length);
          if (missingData.length > 0) {
            console.warn('⚠️ NÜFUS VERİSİ EKSİK OLAN ŞEHİRLER:', missingData);
          }
          setCityColors(colors);
        } else {
          console.warn('API yanıtı beklenen formatta değil:', result);
        }
      } catch (error) {
        console.error('Nüfus verileri yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCityPopulations();
  }, []);

  // Harita render edildikten sonra renkleri uygula ve hover event'lerini ekle
  useEffect(() => {
    if (loading || Object.keys(cityColors).length === 0 || !mapContainerRef.current) {
      return;
    }

    // SVG'in render olmasını bekle
    const applyColors = () => {
      const svg = mapContainerRef.current?.querySelector('svg');
      if (!svg) {
        // SVG henüz render olmamış, tekrar dene
        setTimeout(applyColors, 50);
        return;
      }

      const paths = svg.querySelectorAll('path');
      const hoverColor = '#E62727';

      const citiesWithoutColor: string[] = []; // Renk bulunamayan şehirler
      
      paths.forEach((path) => {
        // Path elementinin data-city-name veya title attribute'undan şehir ismini bul
        let cityName = path.getAttribute('data-city-name') || path.getAttribute('title') || '';
        
        // Eğer direkt eşleşme yoksa normalize edilmiş versiyonu dene
        let originalColor = cityColors[cityName];
        if (!originalColor && cityName) {
          const normalizedName = normalizeTurkishChars(cityName);
          originalColor = cityColors[normalizedName] || cityColors[cityName];
          if (originalColor && normalizedName !== cityName) {
            // Normalize edilmiş isimle eşleştiyse, orijinal ismi de sakla
            cityColors[cityName] = originalColor;
          }
        }
        
        // Renk bulunamadıysa listeye ekle
        if (cityName && !originalColor) {
          if (!citiesWithoutColor.includes(cityName)) {
            citiesWithoutColor.push(cityName);
          }
        }
        
        if (cityName && originalColor) {
          
          // Eğer zaten uygulanmışsa tekrar uygulama
          if (path.getAttribute('data-color-applied') === 'true') {
            return;
          }
          
          // Orijinal rengi uygula ve sakla
          path.setAttribute('fill', originalColor);
          path.setAttribute('data-original-fill', originalColor);
          path.setAttribute('data-color-applied', 'true');
          path.style.transition = 'fill 0.3s ease';
          path.style.fill = originalColor; // CSS ile de uygula

          // Hover event'lerini ekle - capture phase'de çalıştır ki kütüphanenin event'lerinden önce çalışsın
          const handleMouseEnter = (e: Event) => {
            e.stopPropagation(); // Kütüphanenin event'lerini durdur
            const target = e.currentTarget as SVGPathElement;
            target.setAttribute('fill', hoverColor);
            target.style.fill = hoverColor;
            
            // Aynı şehre ait tüm path'leri bul ve güncelle
            const allPaths = svg.querySelectorAll(`path[data-city-name="${cityName}"], path[title="${cityName}"]`);
            allPaths.forEach((p) => {
              (p as SVGPathElement).setAttribute('fill', hoverColor);
              (p as SVGPathElement).style.fill = hoverColor;
            });
          };

          const handleMouseLeave = (e: Event) => {
            e.stopPropagation(); // Kütüphanenin event'lerini durdur
            const target = e.currentTarget as SVGPathElement;
            target.setAttribute('fill', originalColor);
            target.style.fill = originalColor;
            
            // Aynı şehre ait tüm path'leri geri yükle
            const allPaths = svg.querySelectorAll(`path[data-city-name="${cityName}"], path[title="${cityName}"]`);
            allPaths.forEach((p) => {
              const pElement = p as SVGPathElement;
              const pOriginalColor = pElement.getAttribute('data-original-fill') || originalColor;
              pElement.setAttribute('fill', pOriginalColor);
              pElement.style.fill = pOriginalColor;
            });
          };

          // Capture phase'de event listener ekle
          path.addEventListener('mouseenter', handleMouseEnter, true);
          path.addEventListener('mouseleave', handleMouseLeave, true);

          // Cleanup function için event listener'ları sakla
          (path as any)._mouseEnterHandler = handleMouseEnter;
          (path as any)._mouseLeaveHandler = handleMouseLeave;
        }
      });
      
      // Renk bulunamayan şehirleri konsola yazdır
      if (citiesWithoutColor.length > 0) {
        console.warn('⚠️ HARİTADA RENK BULUNAMAYAN ŞEHİRLER:', citiesWithoutColor);
        console.warn('   Toplam:', citiesWithoutColor.length, 'şehir');
      }
    };

    const timeoutId = setTimeout(applyColors, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      const svg = mapContainerRef.current?.querySelector('svg');
      if (svg) {
        const paths = svg.querySelectorAll('path');
        paths.forEach((path) => {
          if ((path as any)._mouseEnterHandler) {
            path.removeEventListener('mouseenter', (path as any)._mouseEnterHandler, true);
          }
          if ((path as any)._mouseLeaveHandler) {
            path.removeEventListener('mouseleave', (path as any)._mouseLeaveHandler, true);
          }
        });
      }
    };
  }, [cityColors, loading]);

  // Her şehir için renk uygulayan wrapper fonksiyonu - sadece data attribute'larını ekle
  const cityWrapper = React.useCallback((cityComponent: React.ReactElement, cityData: { name: string; plateNumber: number; id: string; path: string }) => {
    const cityColor = cityColors[cityData.name] || '#FFF5F5';
    
    // SVG elementinin yapısını kontrol et ve data attribute'larını ekle
    const applyDataAttributes = (element: React.ReactElement): React.ReactElement => {
      // Eğer element bir path veya g elementi ise data attribute'larını ekle
      if (element.type === 'path' || element.type === 'g') {
        const newProps: any = {
          ...element.props,
          'data-city-name': cityData.name, // Şehir ismini sakla
          'data-original-fill': cityColor, // Orijinal rengi sakla
          title: cityData.name, // Title'a da ekle (kütüphane kullanıyor olabilir)
        };

        // Child elementleri de işle
        if (element.props.children) {
          const children = React.Children.map(element.props.children, (child) => {
            if (React.isValidElement(child)) {
              return applyDataAttributes(child);
            }
            return child;
          });
          newProps.children = children;
        }

        return React.cloneElement(element, newProps);
      }

      return element;
    };

    return applyDataAttributes(cityComponent);
  }, [cityColors]);

  return (
    <div className="w-full flex items-center justify-center p-8">
      <div className="w-full max-w-5xl" ref={mapContainerRef}>
        <TurkeyMap
          hoverable={true}
          onHover={({ plateNumber, name }) => {
            onHover({ name, plateNumber });
          }}
          onClick={({ plateNumber, name }) => onClick({ name, plateNumber })}
          cityWrapper={cityWrapper}
        />
      </div>
    </div>
  );
}
