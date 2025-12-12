// Custom hook for fetching province information
import React from 'react';
import useSWR from 'swr';
import { ProvinceData } from '@/lib/types';
import { CACHE_DURATIONS } from '@/lib/constants';
import { getTurkiyeApiCityName } from '@/lib/cities';

const fetcher = async (url: string): Promise<ProvinceData> => {
  const res = await fetch(url);
  if (!res.ok) {
    // Daha detaylı hata mesajı için API yanıtını oku
    let errorMessage = `Failed to fetch province data (Status: ${res.status})`;
    try {
      const errorData = await res.json();
      if (errorData.message) {
        errorMessage += ` - ${errorData.message}`;
      }
    } catch {
      // JSON parse hatası olursa sadece status kullan
    }
    console.error(`❌ API Hatası [${res.status}]:`, url);
    throw new Error(errorMessage);
  }
  const data = await res.json();
  
  // API yanıtını kontrol et
  if (!data || (data.data && Array.isArray(data.data) && data.data.length === 0)) {
    console.warn(`⚠️ API yanıtı boş:`, url);
    throw new Error('Province data not found');
  }
  
  return data.data?.[0] || data; // TürkiyeAPI returns array in data property
};

export function useProvinceInfo(cityName?: string) {
  // TürkiyeAPI için şehir ismini formatla (orijinal Türkçe karakterli isim veya ilk harfi büyük)
  const apiCityName = cityName ? getTurkiyeApiCityName(cityName) : undefined;
  
  const url = apiCityName
    ? `https://api.turkiyeapi.dev/v1/provinces?name=${encodeURIComponent(apiCityName)}`
    : null;

  const { data, error, isLoading } = useSWR<ProvinceData>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: CACHE_DURATIONS.PROVINCE_DATA,
      revalidateOnReconnect: false,
      onError: (error, key) => {
        // Şehir ismini URL'den çıkar
        const cityFromUrl = key?.split('name=')[1]?.split('&')[0];
        const decodedCity = cityFromUrl ? decodeURIComponent(cityFromUrl) : apiCityName;
        console.error(`❌ VERİ YÜKLENEMEDİ - Şehir: "${cityName}" (API Format: "${apiCityName}")`, error);
      },
      onSuccess: (data, key) => {
        // Data boş veya undefined ise logla
        if (!data || (Array.isArray(data) && data.length === 0)) {
          const cityFromUrl = key?.split('name=')[1]?.split('&')[0];
          const decodedCity = cityFromUrl ? decodeURIComponent(cityFromUrl) : apiCityName;
          console.warn(`⚠️ VERİ BULUNAMADI - Şehir: "${cityName}" (API Format: "${apiCityName}") - API yanıtı boş`);
        }
      }
    }
  );

  // Data yüklendiğinde kontrol et
  React.useEffect(() => {
    if (!isLoading && cityName && !error) {
      if (!data) {
        console.warn(`⚠️ VERİ BULUNAMADI - Şehir: "${cityName}" (API Format: "${apiCityName}") - Data null/undefined`);
      }
    }
  }, [data, error, isLoading, cityName, apiCityName]);

  return {
    data,
    error,
    isLoading,
  };
}
