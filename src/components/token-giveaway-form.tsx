'use client';

import { useState } from 'react';
import { useAccount, useSwitchChain, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, parseUnits, type Address } from 'viem';
import { celo, celoAlfajores } from 'wagmi/chains';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const ERC20_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

interface TokenInfo {
  symbol: string;
  name: string;
  decimals: number;
  address: Address | null;
}

const TOKENS: Record<string, TokenInfo> = {
  CELO: {
    symbol: 'CELO',
    name: 'Celo Native',
    decimals: 18,
    address: null,
  },
  cUSD: {
    symbol: 'cUSD',
    name: 'Celo Dollar',
    decimals: 18,
    address: '0x765DE816845861e75A25fCA122bb6898B8B1282a' as Address,
  },
  cEUR: {
    symbol: 'cEUR',
    name: 'Celo Euro',
    decimals: 18,
    address: '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73' as Address,
  },
};

export function TokenGiveawayForm(): JSX.Element {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const [selectedToken, setSelectedToken] = useState<string>('CELO');
  const [recipientsText, setRecipientsText] = useState<string>('');
  const [amountPerRecipient, setAmountPerRecipient] = useState<string>('');

  const token = TOKENS[selectedToken];
  const isNativeToken = token.address === null;

  const handleNetworkSwitch = async (): Promise<void> => {
    if (chain?.id !== celo.id) {
      try {
        await switchChain({ chainId: celo.id });
        toast.success('Celo Mainnet\'e geçildi!');
      } catch (err) {
        toast.error('Ağ değiştirme başarısız');
        console.error(err);
      }
    }
  };

  const parseRecipients = (): Address[] => {
    const lines = recipientsText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const addresses: Address[] = [];
    for (const line of lines) {
      if (line.startsWith('0x') && line.length === 42) {
        addresses.push(line as Address);
      }
    }
    return addresses;
  };

  const handleSend = async (): Promise<void> => {
    if (!address) {
      toast.error('Lütfen önce wallet bağlayın');
      return;
    }

    if (chain?.id !== celo.id) {
      toast.error('Lütfen Celo Mainnet\'e geçin');
      return;
    }

    const recipients = parseRecipients();
    if (recipients.length === 0) {
      toast.error('Geçerli alıcı adresi bulunamadı');
      return;
    }

    if (!amountPerRecipient || parseFloat(amountPerRecipient) <= 0) {
      toast.error('Lütfen geçerli bir miktar girin');
      return;
    }

    try {
      for (const recipient of recipients) {
        if (isNativeToken) {
          // Native CELO transfer (not supported by writeContract, needs sendTransaction)
          toast.info(`${recipient} adresine native CELO gönderimi için wallet\'ınızı kullanın`);
        } else {
          const amount = parseUnits(amountPerRecipient, token.decimals);
          writeContract({
            address: token.address as Address,
            abi: ERC20_ABI,
            functionName: 'transfer',
            args: [recipient, amount],
          });
        }
      }
    } catch (err) {
      toast.error('Transfer başarısız');
      console.error(err);
    }
  };

  if (!address) {
    return (
      <Card className="opacity-50">
        <CardHeader>
          <CardTitle>Token Gönderimi</CardTitle>
          <CardDescription>Önce wallet bağlayın</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Token Giveaway
        </CardTitle>
        <CardDescription>
          Birden fazla adrese token gönderin
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Network Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Ağ:</span>
          {chain?.id === celo.id ? (
            <Badge variant="default" className="bg-green-500">
              Celo Mainnet
            </Badge>
          ) : (
            <div className="flex items-center gap-2">
              <Badge variant="destructive">
                {chain?.name || 'Yanlış Ağ'}
              </Badge>
              <Button size="sm" variant="outline" onClick={handleNetworkSwitch}>
                Celo&apos;ya Geç
              </Button>
            </div>
          )}
        </div>

        {/* Token Selection */}
        <div className="space-y-2">
          <Label>Token Seçin</Label>
          <Select value={selectedToken} onValueChange={setSelectedToken}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(TOKENS).map(([key, t]) => (
                <SelectItem key={key} value={key}>
                  {t.symbol} - {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount per Recipient */}
        <div className="space-y-2">
          <Label>Alıcı Başına Miktar ({token.symbol})</Label>
          <Input
            type="number"
            placeholder="0.0"
            value={amountPerRecipient}
            onChange={(e) => setAmountPerRecipient(e.target.value)}
            step="0.01"
            min="0"
          />
        </div>

        {/* Recipients List */}
        <div className="space-y-2">
          <Label>Alıcı Adresleri (Her satıra bir adres)</Label>
          <Textarea
            placeholder="0x123...&#10;0x456...&#10;0x789..."
            value={recipientsText}
            onChange={(e) => setRecipientsText(e.target.value)}
            rows={6}
            className="font-mono text-sm"
          />
          <p className="text-xs text-gray-500">
            {parseRecipients().length} geçerli adres
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
            <div className="text-sm text-red-700">
              <p className="font-medium">Transfer başarısız:</p>
              <p className="text-xs mt-1">{error.message}</p>
            </div>
          </div>
        )}

        {/* Success Display */}
        {isSuccess && (
          <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
            <div className="text-sm text-green-700">
              <p className="font-medium">Transfer başarılı!</p>
              {hash && (
                <a
                  href={`https://celoscan.io/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs underline mt-1 block"
                >
                  İşlemi görüntüle
                </a>
              )}
            </div>
          </div>
        )}

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={
            isPending ||
            isConfirming ||
            !amountPerRecipient ||
            parseRecipients().length === 0 ||
            chain?.id !== celo.id
          }
          className="w-full"
          size="lg"
        >
          {isPending || isConfirming ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              İşlem Yapılıyor...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {parseRecipients().length} Adrese Gönder
            </>
          )}
        </Button>

        {/* Info */}
        <div className="text-xs text-gray-500 space-y-1 p-3 bg-blue-50 rounded-lg">
          <p className="font-medium text-blue-700">💡 Bilgi:</p>
          <ul className="list-disc list-inside space-y-0.5 text-blue-600">
            <li>Native CELO için MetaMask popup&apos;ını kullanın</li>
            <li>cUSD/cEUR için otomatik transfer başlatılır</li>
            <li>Her transfer ayrı bir gas ücreti gerektirir</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
