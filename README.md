# 🗺️ AreScore - Türkiye İnteraktif Harita

**Türkiye'nin 81 ilini interaktif bir harita üzerinde keşfedin!** Nüfus yoğunluğu, hava durumu, Wikipedia bilgileri ve daha fazlası - hepsi tek bir modern web uygulamasında.

![Next.js](https://img.shields.io/badge/Next.js-15.5.7-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Özellikler

### 🎨 **Nüfus Yoğunluğu Heat Map**
- 81 il için gerçek zamanlı nüfus verisi ile dinamik renklendirme
- Krem tonlarından kırmızıya gradient (0-200K → 10M+)
- Her il, nüfusuna göre otomatik renk alır
- İstanbul en koyu kırmızı (#E62727) ile vurgulanır

### 🌤️ **Canlı Hava Durumu**
- OpenWeather API entegrasyonu
- Sıcaklık, nem, rüzgar hızı ve hissedilen sıcaklık
- Hava durumu ikonu ve açıklaması
- 10 dakikalık SWR cache ile performans optimizasyonu

### 📊 **Nüfus İstatistikleri**
- En kalabalık 10 ili gösteren interaktif bar chart
- Recharts kütüphanesi ile profesyonel görselleştirme
- Modal popup tasarımı - sayfayı bozmadan görüntüleme
- Kırmızı-Turkuaz alternatif renk paleti

### 🏛️ **Wikipedia Entegrasyonu**
- Her il için Türkçe Wikipedia bilgileri
- 3 sekmeli görünüm: Hakkında, Turizm, Kültür
- Görsel önizleme ve özet bilgi
- 24 saatlik cache ile hızlı yükleme

### 🎭 **Premium UI/UX**
- Özel renk paleti: #E62727 (Kırmızı), #1E93AB (Turkuaz), #F3F2EC (Krem), #DCDCDC (Gri)
- Framer Motion animasyonları (slide, scale, bounce)
- Glassmorphism ve gradient efektleri
- Responsive tasarım - mobil uyumlu

### ⚡ **Performans & Optimizasyon**
- Next.js 15 Turbopack ile hızlı build
- SWR ile akıllı data caching
- API route proxy ile CORS çözümü
- TypeScript ile tip güvenliği

---

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Kurulum

1. **Projeyi klonlayın**
```bash
git clone https://github.com/yourusername/area-score.git
cd area-score
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment değişkenlerini ayarlayın**
```bash
# .env.local dosyası oluşturun
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

> 🔑 OpenWeather API Key almak için: https://openweathermap.org/api

4. **Development sunucusunu başlatın**
```bash
npm run dev
```

5. **Tarayıcınızda açın**
```
http://localhost:3000
```

---

## 🛠️ Teknoloji Stack

### Frontend Framework
- **Next.js 15.5.7** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety

### Styling & Animation
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 11** - Animation library
- **Custom Color Palette** - Brand-specific design system

### Data & State Management
- **SWR 2.0** - Data fetching & caching
- **React Hooks** - State management

### Visualization & Maps
- **turkey-map-react 2.0.3** - Interactive SVG Turkey map
- **Recharts** - Chart library for statistics

### APIs
- **TürkiyeAPI** - İl bilgileri (nüfus, ilçe sayısı, alan kodu)
- **OpenWeather API** - Gerçek zamanlı hava durumu
- **Wikipedia REST API** - Şehir bilgileri ve görseller

---

## 📁 Proje Yapısı

```
area-score/
├── app/
│   ├── page.tsx              # Ana sayfa
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── api/
│       └── weather/
│           └── route.ts      # Weather API proxy
├── components/
│   ├── TurkeyMapWrapper.tsx  # İnteraktif harita (heat map)
│   ├── ProvinceCard.tsx      # İl detay kartı
│   ├── WeatherWidget.tsx     # Hava durumu widget
│   ├── StatisticsChart.tsx   # Nüfus grafiği
│   ├── HeatMapLegend.tsx     # Renk lejantı
│   ├── AdditionalInfo.tsx    # Wikipedia sekmeleri
│   └── LoadingSpinner.tsx    # Yükleme animasyonu
├── hooks/
│   ├── useProvinceInfo.ts    # İl bilgileri hook
│   ├── useWeather.ts         # Hava durumu hook
│   └── useWikipediaInfo.ts   # Wikipedia hook
├── lib/
│   ├── types.ts              # TypeScript types
│   ├── constants.ts          # Sabitler
│   ├── cities.ts             # 81 şehir listesi (ASCII mapping)
│   └── populationUtils.ts    # Nüfus renklendirme utilities
└── docs/
    ├── README.md             # Proje dokümantasyonu
    ├── tech-stack.md         # Teknoloji detayları
    ├── architecture.md       # Mimari açıklaması
    └── implementation-plan.md # Geliştirme planı
```

---

## 🎨 Özellik Detayları

### Heat Map Renklendirme
```typescript
// Nüfus aralıklarına göre renk skalası
0-200K      → #F3F2EC (Krem)
200K-500K   → #E8E6DC (Açık Bej)
500K-1M     → #B8D4DC (Açık Turkuaz)
1M-3M       → #7AC5D8 (Orta Turkuaz)
3M-5M       → #3FA9C4 (Koyu Turkuaz)
5M-10M      → #1E93AB (Ana Turkuaz)
10M+        → #E62727 (Kırmızı - İstanbul)
```

### API Kullanımı

**TürkiyeAPI**
```typescript
GET https://turkiyeapi.dev/api/v1/provinces
GET https://turkiyeapi.dev/api/v1/provinces/{name}
```

**OpenWeather**
```typescript
GET /api/weather?city={cityName}
// Proxy üzerinden - CORS sorununu çözer
```

**Wikipedia**
```typescript
GET https://tr.wikipedia.org/api/rest_v1/page/summary/{cityName}
```

---

## 🎯 Kullanım

1. **Harita Keşfi**
   - Fareyle bir ilin üzerine gelin → Hover efekti (kırmızı)
   - İle tıklayın → Sağda detaylı kart açılır

2. **İl Detayları**
   - Nüfus, ilçe sayısı, plaka, alan kodu
   - Anlık hava durumu
   - Wikipedia bilgileri (3 sekme)

3. **İstatistikler**
   - Sağ üstteki "İstatistikler" butonuna tıklayın
   - En kalabalık 10 ili grafik olarak görün
   - Modal dışına tıklayarak kapatın

4. **Heat Map**
   - Sol alttaki lejanttan renk skalasını görün
   - Her ilin rengi canlı nüfus verisine göre değişir

---

## 🌟 Gelecek Özellikler

- [ ] İl bazında ekonomi verileri
- [ ] Turizm yerleri görselleri (TripAdvisor API)
- [ ] Yerel yemekler ve festivaller
- [ ] Karşılaştırma modu (2 ili yan yana)
- [ ] Dark mode desteği
- [ ] PDF export (il raporu)
- [ ] Favori iller kaydetme
- [ ] Paylaşım özellikleri

---

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

## 👨‍💻 Geliştirici

**Projeyi Geliştiren:** [Your Name]

**Kullanılan Kaynaklar:**
- [TürkiyeAPI](https://turkiyeapi.dev) - İl bilgileri
- [OpenWeather](https://openweathermap.org) - Hava durumu
- [Wikipedia](https://tr.wikipedia.org) - Şehir bilgileri

---

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📸 Ekran Görüntüleri

> **Not:** Projenin ekran görüntülerini `screenshots/` klasörüne ekleyebilirsiniz.

---

## 🐛 Bilinen Sorunlar

- Gümüşhane için OpenWeather API 404 döndürüyor (ASCII mapping sorunu)
- Wikipedia bazı küçük iller için thumbnail sunmuyor

---

## 📞 İletişim

Sorularınız için issue açabilir veya pull request gönderebilirsiniz.

---

<div align="center">

Made with ❤️ by Ege


Made with ❤️ and ☕ in Turkey

</div>
