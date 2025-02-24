/**
 * @component UpProvider
 * @description Context provider that manages Universal Profile (UP) wallet connections and state
 * for LUKSO blockchain interactions on Grid. It handles wallet connection status, account management, and chain
 * information while providing real-time updates through event listeners.
 *
 * @provides {UpProviderContext} Context containing:
 * - provider: UP-specific wallet provider instance
 * - client: Viem wallet client for blockchain interactions
 * - chainId: Current blockchain network ID
 * - accounts: Array of connected wallet addresses
 * - contextAccounts: Array of Universal Profile accounts
 * - walletConnected: Boolean indicating active wallet connection
 * - selectedAddress: Currently selected address for transactions
 * - isSearching: Loading state indicator
 */
'use client';

import { createClientUPProvider } from "@lukso/up-provider";
import { createWalletClient, custom } from "viem";
import { lukso, luksoTestnet } from "viem/chains";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { BrowserProvider, type Eip1193Provider, ethers } from 'ethers'

interface UpProviderContext {
  provider: any;
  browserProvider: BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  chainId: number;
  accounts: string[];
  contextAccounts: string[];
  walletConnected: boolean;
  selectedAddress: string | null;
  setSelectedAddress: (address: string | null) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
}

const UpContext = createContext<UpProviderContext | undefined>(undefined);

const provider = typeof window !== "undefined" ? createClientUPProvider() : null;

export function useUpProvider() {
  const context = useContext(UpContext);
  if (!context) {
    throw new Error("useUpProvider must be used within a UpProvider");
  }
  return context;
}

interface UpProviderProps {
  children: ReactNode;
}

export function UpProvider({ children }: UpProviderProps) {
  const [chainId, setChainId] = useState<number>(0);
  const [accounts, setAccounts] = useState<Array<`0x${string}`>>([]);
  const [contextAccounts, setContextAccounts] = useState<Array<`0x${string}`>>([]);
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<`0x${string}` | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [browserProvider, setBrowserProvider] = useState<BrowserProvider | null>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        if (!provider) return;

        const _browserProvider = new ethers.BrowserProvider(provider as unknown as Eip1193Provider);
        if (!mounted) return;
        setBrowserProvider(_browserProvider);

        const _signer = await _browserProvider.getSigner();
        if (!mounted) return;
        setSigner(_signer);

        const network = await _browserProvider.getNetwork();
        const _chainId = Number(network.chainId);
        if (!mounted) return;
        setChainId(_chainId);

        const _accounts = await _browserProvider.listAccounts();
        if (!mounted) return;
        setAccounts(_accounts.map(account => account.address as `0x${string}`));

        const _contextAccounts = provider.contextAccounts;
        if (!mounted) return;
        setContextAccounts(_contextAccounts);
        setWalletConnected(_accounts.length > 0 && _contextAccounts.length > 0);
      } catch (error) {
        console.error(error);
      }
    }

    init();

    if (provider) {
      const accountsChanged = (_accounts: Array<`0x${string}`>) => {
        setAccounts(_accounts);
        setWalletConnected(_accounts.length > 0 && contextAccounts.length > 0);
      };

      const contextAccountsChanged = (_accounts: Array<`0x${string}`>) => {
        setContextAccounts(_accounts);
        setWalletConnected(accounts.length > 0 && _accounts.length > 0);
      };

      const chainChanged = (_chainId: number) => {
        setChainId(_chainId);
      };

      provider.on("accountsChanged", accountsChanged);
      provider.on("chainChanged", chainChanged);
      provider.on("contextAccountsChanged", contextAccountsChanged);

      return () => {
        mounted = false;
        provider.removeListener("accountsChanged", accountsChanged);
        provider.removeListener("contextAccountsChanged", contextAccountsChanged);
        provider.removeListener("chainChanged", chainChanged);
      };
    }
  }, [accounts.length, contextAccounts.length]);

  return (
    <UpContext.Provider
      value={{
        provider,
        browserProvider,
        signer,
        chainId,
        accounts,
        contextAccounts,
        walletConnected,
        selectedAddress,
        setSelectedAddress: (address: string | null) => setSelectedAddress(address as `0x${string}` | null),
        isSearching,
        setIsSearching,
      }}
    >
      <div className="min-h-screen flex items-center justify-center">
        {children}
      </div>
    </UpContext.Provider>
  );
} 