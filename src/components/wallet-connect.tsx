'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, LogOut } from 'lucide-react';

export function WalletConnect(): JSX.Element {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Bağlandı
          </CardTitle>
          <CardDescription>
            {chain?.name || 'Unknown Network'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-sm font-mono break-all">
              {address}
            </p>
          </div>
          <Button 
            onClick={() => disconnect()} 
            variant="outline" 
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Bağlantıyı Kes
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Wallet Bağlantısı
        </CardTitle>
        <CardDescription>
          Celo&apos;ya token göndermek için wallet&apos;ınızı bağlayın
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => connect({ connector })}
              className="w-full"
              variant={connector.id === 'walletConnect' ? 'default' : 'outline'}
            >
              <Wallet className="mr-2 h-4 w-4" />
              {connector.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
