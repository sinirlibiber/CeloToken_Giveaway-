# WalletConnect Kurulum Talimatları

## WalletConnect Project ID Alma

WalletConnect özelliğini kullanmak için bir Project ID almanız gerekiyor:

### Adımlar:

1. **WalletConnect Cloud'a Git**
   - https://cloud.walletconnect.com/ adresine gidin
   - Ücretsiz hesap oluşturun

2. **Yeni Proje Oluşturun**
   - "Create New Project" butonuna tıklayın
   - Proje adı: `Celo Token Giveaway`
   - Proje URL'i: Deploy ettiğiniz URL

3. **Project ID Alın**
   - Proje oluşturulduktan sonra Dashboard'da `Project ID` görünecek
   - Bu ID'yi kopyalayın

4. **Kodu Güncelleyin**
   - `src/lib/wagmi-config.ts` dosyasını açın
   - `YOUR_WALLETCONNECT_PROJECT_ID` yerine aldığınız Project ID'yi yapıştırın

```typescript
walletConnect({
  projectId: 'buraya-project-id-yapistirin', // ← Buraya
  metadata: {
    name: 'Celo Token Giveaway',
    description: 'Celo üzerinde token gönderme aracı',
    url: 'https://your-app-url.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  },
  showQrModal: true,
})
```

## Desteklenen Wallet'lar

WalletConnect ile şu wallet'ları kullanabilirsiniz:

- 📱 **MetaMask Mobile**
- 🦊 **Trust Wallet**
- 🌈 **Rainbow Wallet**
- 💚 **Valora** (Celo'ya özel)
- 🔵 **Coinbase Wallet**
- Ve 300+ diğer wallet

## Kullanım

1. Kullanıcılar "WalletConnect" butonuna tıklar
2. QR kod modal açılır
3. Mobil wallet ile QR kodu tarar
4. Wallet'ta bağlantıyı onaylar
5. Uygulama kullanıma hazır!

## Test Etme

- Desktop'ta: QR kodu mobil cihazınızla tarayın
- Mobil'de: Doğrudan wallet uygulaması açılır (deep link)

## Sorun Giderme

**QR Kod Açılmıyor:**
- Project ID'nin doğru girildiğinden emin olun
- Tarayıcı konsolunu kontrol edin

**Bağlantı Kopuyor:**
- İnternet bağlantınızı kontrol edin
- Wallet uygulamasını yeniden başlatın

**Mobilde Çalışmıyor:**
- URL'nin HTTPS olduğundan emin olun
- Wallet uygulamasının güncel olduğundan emin olun
