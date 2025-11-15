import { http, createConfig } from 'wagmi';
import { celo, celoAlfajores } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [celo, celoAlfajores],
  connectors: [
    injected(),
    walletConnect({
      projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
      metadata: {
        name: 'Celo Token Giveaway',
        description: 'Celo üzerinde token gönderme aracı',
        url: 'https://your-app-url.com',
        icons: ['https://avatars.githubusercontent.com/u/37784886'],
      },
      showQrModal: true,
    }),
  ],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
});
