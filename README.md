# 🎁 Celo Token Giveaway

Celo blockchain üzerinde toplu token dağıtımı yapmanızı sağlayan modern, kullanıcı dostu bir web uygulaması. Farcaster Mini App olarak kullanıma hazır!
App Linki: https://farcaster.xyz/miniapps/ai7fdrtiukY7/farcaster-follower-boost
## ✨ Özellikler

- 🔗 **Çoklu Wallet Desteği**: MetaMask, WalletConnect (300+ mobil wallet)
- 💚 **Celo Token Desteği**: CELO, cUSD, cEUR
- 📤 **Toplu Gönderim**: Tek seferde onlarca adrese token gönderin
- 🔄 **Otomatik Ağ Geçişi**: Celo Mainnet'e tek tıkla geçiş
- 📊 **Gerçek Zamanlı Durum**: Transfer işlemlerini canlı takip edin
- 🎨 **Modern Arayüz**: shadcn/ui ile şık, responsive tasarım
- 📱 **Mobil Uyumlu**: Tüm cihazlarda kusursuz çalışır
- 🚀 **Farcaster Ready**: Mini App olarak hazır

## 🛠️ Teknolojiler

- **Next.js 15** - React framework
- **Wagmi v2** - Ethereum React hooks
- **Viem** - TypeScript Ethereum library
- **WalletConnect v2** - Mobil wallet entegrasyonu
- **TailwindCSS** - Utility-first CSS
- **shadcn/ui** - UI component library
- **TypeScript** - Type safety

## 📋 Gereksinimler

- Node.js 18.x veya üzeri
- npm, yarn, pnpm veya bun
- MetaMask veya WalletConnect destekli bir wallet
- WalletConnect Project ID (ücretsiz)

## 🚀 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/sinirlibiber/celo-token-giveaway.git
cd celo-token-giveaway
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
# veya
yarn install
# veya
pnpm install
# veya
bun install
```

### 3. WalletConnect Yapılandırması

1. https://cloud.walletconnect.com/ adresine gidin
2. Ücretsiz hesap oluşturun
3. Yeni proje oluşturun
4. Project ID'nizi kopyalayın
5. `src/lib/wagmi-config.ts` dosyasını açın
6. `YOUR_WALLETCONNECT_PROJECT_ID` yerine Project ID'nizi yapıştırın

```typescript
// src/lib/wagmi-config.ts
export const projectId = 'BURAYA_PROJECT_ID_YAPISTIRIN';
```

### 4. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
# veya
bun dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📦 Build & Deploy

### Production Build

```bash
npm run build
npm run start
```

### Vercel'e Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sinirlibiber/CeloToken_Giveaway-)

```bash
# Vercel CLI ile deploy
npm i -g vercel
vercel
```

### Diğer Platformlar

- **Netlify**: `npm run build` sonrası `.next` klasörünü deploy edin
- **Docker**: Dockerfile ekleyerek container olarak çalıştırabilirsiniz

## 💡 Kullanım

### 1. Wallet Bağlayın
- **Desktop**: "Injected" (MetaMask) veya "WalletConnect" (QR kod)
- **Mobil**: "WalletConnect" (otomatik wallet açılır)

### 2. Token Seçin
- CELO (Celo native token)
- cUSD (Celo Dollar - stablecoin)
- cEUR (Celo Euro - stablecoin)

### 3. Miktar ve Adresleri Girin
```
0x1234567890123456789012345678901234567890
0xabcdefabcdefabcdefabcdefabcdefabcdefabcd
0x9876543210987654321098765432109876543210
```

### 4. Gönder!
Her adrese aynı miktarda token gönderilir. İşlem durumunu real-time takip edebilirsiniz.

## 🔧 Yapılandırma

### Desteklenen Tokenlar

Token listesini düzenlemek için `src/components/TokenGiveawayApp.tsx` dosyasını açın:

```typescript
const TOKEN_ADDRESSES = {
  CELO: '0x471EcE3750Da237f93B8E339c536989b8978a438',
  cUSD: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
  cEUR: '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73',
  // Yeni token ekleyin
};
```

### Celo Network Ayarları

Network yapılandırması `src/lib/wagmi-config.ts` dosyasında:

```typescript
import { celo } from 'wagmi/chains';

export const config = createConfig({
  chains: [celo], // Testnet için: celoAlfajores
  // ...
});
```

## 📁 Proje Yapısı

```
celo-token-giveaway/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + Farcaster metadata
│   │   ├── page.tsx            # Ana sayfa + Farcaster SDK
│   │   └── api/
│   │       └── proxy/          # API proxy
│   ├── components/
│   │   ├── TokenGiveawayApp.tsx # Ana uygulama
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/
│   │   ├── wagmi-config.ts     # Wagmi & WalletConnect config
│   │   └── utils.ts            # Yardımcı fonksiyonlar
│   └── hooks/                  # Farcaster hooks
├── public/
│   └── .well-known/
│       └── farcaster.json      # Farcaster manifest
├── WALLETCONNECT_SETUP.md      # Detaylı WC kurulum
└── package.json
```

## 🐛 Sorun Giderme

### WalletConnect Bağlanmıyor
- Project ID'yi kontrol edin
- Tarayıcı console'unda hata mesajlarına bakın
- WalletConnect Cloud dashboard'dan proje durumunu kontrol edin

### Celo Network'e Bağlanamıyorum
- MetaMask'ta Celo network'ü ekleyin
- Uygulama otomatik olarak network değişikliği isteyecektir

### Transaction Başarısız Oluyor
- Yeterli CELO (gas fee için) olduğundan emin olun
- Token bakiyenizi kontrol edin
- Alıcı adreslerin doğru olduğundan emin olun

## 🔐 Güvenlik

- Private key'ler asla saklanmaz veya sunucuya gönderilmez
- Tüm işlemler kullanıcının wallet'ında onaylanır
- Akıllı kontrat kodları açık kaynaklıdır
- Token transferleri doğrudan blockchain üzerinde yapılır

## 🤝 Katkıda Bulunun

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/harika-ozellik`)
3. Commit edin (`git commit -m 'Harika özellik eklendi'`)
4. Push edin (`git push origin feature/harika-ozellik`)
5. Pull Request açın

## 📝 Lisans

MIT License - detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👤 İletişim

**Gumus (base.eth)**
- GitHub: [@sinirlibiber](https://github.com/sinirlibiber)
- Farcaster: https://farcaster.xyz/gumusbey

## 🙏 Teşekkürler

- [Celo](https://celo.org/) - Mobil odaklı blockchain
- [Wagmi](https://wagmi.sh/) - React Hooks for Ethereum
- [WalletConnect](https://walletconnect.com/) - Wallet bağlantı protokolü
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components

---

**Powered by Celo 💚 • Built by Gumus base.eth**

⭐ Bu projeyi faydalı bulduysan yıldız vermeyi unutma!
