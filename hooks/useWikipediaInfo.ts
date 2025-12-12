// Wikipedia API hook for additional city information
import useSWR from 'swr';
import { normalizeTurkishChars } from '@/lib/cities';

interface WikipediaSummary {
  title: string;
  description: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
}

const fetcher = async (url: string): Promise<WikipediaSummary> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch Wikipedia data');
  return res.json();
};

export function useWikipediaInfo(cityName?: string) {
  // Şehir ismini normalize et ve küçük harfe çevir
  const normalizedCityName = cityName ? normalizeTurkishChars(cityName) : undefined;
  
  const url = normalizedCityName
    ? `https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(normalizedCityName)}`
    : null;

  const { data, error, isLoading } = useSWR<WikipediaSummary>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 86400000, // 24 hours - Wikipedia data doesn't change often
    }
  );

  return {
    data,
    error,
    isLoading,
  };
}
