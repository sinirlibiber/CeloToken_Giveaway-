'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '@/lib/wagmi-config';
import { WalletConnect } from '@/components/wallet-connect';
import { TokenGiveawayForm } from '@/components/token-giveaway-form';
import { Toaster } from '@/components/ui/sonner';
import { Coins, Gift } from 'lucide-react';
import { useState, useEffect } from 'react';
import { sdk } from "@farcaster/miniapp-sdk";
import { useAddMiniApp } from "@/hooks/useAddMiniApp";
import { useQuickAuth } from "@/hooks/useQuickAuth";
import { useIsInFarcaster } from "@/hooks/useIsInFarcaster";

const queryClient = new QueryClient();

function AppContent(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="h-10 w-10 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Celo Token Giveaway
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celo blockchain üzerinde CELO, cUSD ve cEUR token&apos;larını birden fazla adrese kolayca gönderin
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          <WalletConnect />
          <TokenGiveawayForm />
        </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Coins className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold">Çoklu Token</h3>
            </div>
            <p className="text-sm text-gray-600">
              CELO, cUSD ve cEUR token&apos;larını destekler
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold">Toplu Gönderim</h3>
            </div>
            <p className="text-sm text-gray-600">
              Tek seferde onlarca adrese token gönderin
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="h-5 w-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h3 className="font-semibold">Hızlı & Güvenli</h3>
            </div>
            <p className="text-sm text-gray-600">
              Celo&apos;nun düşük gas ücretlerinden yararlanın
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Powered by Celo 💚 • Build Gumus base.eth •{' '}
            <a 
              href="https://github.com/sinirlibiber" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-700 transition-colors"
            >
              Github
            </a>
          </p>
        </div>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default function Page(): JSX.Element {
    const { addMiniApp } = useAddMiniApp();
    const isInFarcaster = useIsInFarcaster()
    useQuickAuth(isInFarcaster)
    useEffect(() => {
      const tryAddMiniApp = async () => {
        try {
          await addMiniApp()
        } catch (error) {
          console.error('Failed to add mini app:', error)
        }

      }

    

      tryAddMiniApp()
    }, [addMiniApp])
    useEffect(() => {
      const initializeFarcaster = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 100))
          
          if (document.readyState !== 'complete') {
            await new Promise<void>(resolve => {
              if (document.readyState === 'complete') {
                resolve()
              } else {
                window.addEventListener('load', () => resolve(), { once: true })
              }

            })
          }

    

          await sdk.actions.ready()
          console.log('Farcaster SDK initialized successfully - app fully loaded')
        } catch (error) {
          console.error('Failed to initialize Farcaster SDK:', error)
          
          setTimeout(async () => {
            try {
              await sdk.actions.ready()
              console.log('Farcaster SDK initialized on retry')
            } catch (retryError) {
              console.error('Farcaster SDK retry failed:', retryError)
            }

          }, 1000)
        }

      }

    

      initializeFarcaster()
    }, [])
  const [client] = useState(() => queryClient);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <AppContent />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
