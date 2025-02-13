'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ethers } from 'ethers';
import { useUpProvider } from "../upProvider";
import FactoryABI from '../json/Factory.json';
import SubscriptionABI from '../json/Subscription.json';

const LUKSO_RPC = 'https://rpc.testnet.lukso.network';
const FACTORY_ADDRESS = "0xe861e6A7267Be14aC701e342fcf34e5D1F9e2AF0";

interface SubscriptionTier {
  name: string;
  price: string;
  isActive: boolean;
}

interface SubscriptionContract {
  address: string;
  name: string;
  tiers: SubscriptionTier[];
}

interface ContractsContextType {
  subscriptionContracts: SubscriptionContract[];
  isLoading: boolean;
  error: string | null;
  refreshContracts: () => Promise<void>;
}

const ContractsContext = createContext<ContractsContextType | undefined>(undefined);

export function useContracts() {
  const context = useContext(ContractsContext);
  if (!context) {
    throw new Error("useContracts must be used within a ContractsProvider");
  }
  return context;
}

export function ContractsProvider({ children }: { children: ReactNode }) {
  const { accounts, walletConnected } = useUpProvider();
  const [subscriptionContracts, setSubscriptionContracts] = useState<SubscriptionContract[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCreatorContracts = async () => {
    if (!walletConnected || !accounts[0]) return;

    setIsLoading(true);
    setError(null);

    try {
      const provider = new ethers.providers.JsonRpcProvider(LUKSO_RPC);
      const factoryContract = new ethers.Contract(FACTORY_ADDRESS, FactoryABI, provider);
      
      const addresses = await factoryContract.getCreatorSubscriptions(accounts[0]);
      console.log(accounts[0], "accounts[0]");
      console.log('Contract addresses:', addresses);

      const contractsWithDetails = await Promise.all(
        addresses.map(async (address: string) => {
          const contract = new ethers.Contract(address, SubscriptionABI, provider);
          const name = await contract.subscriptionName();
          const totalTiers = await contract.totalTiers();
          
          console.log(`Contract ${address}:`);
          console.log('- Name:', name);
          console.log('- Total tiers:', totalTiers.toString());
          
          const tiersCount = totalTiers.toNumber();
          console.log('- Tiers count:', tiersCount);
          
          // Fetch all tiers
          const tiers = [];
          for (let i = 0; i < tiersCount; i++) {
            const tier = await contract.tiers(i);
            console.log(`- Tier ${i}:`, tier);
            tiers.push({
              name: tier.name,
              price: ethers.utils.formatUnits(tier.price, 18),
              isActive: tier.isActive
            });
          }

          console.log('- Processed tiers:', tiers);

          return {
            address,
            name,
            tiers
          };
        })
      );

      console.log('Final contracts data:', contractsWithDetails);
      setSubscriptionContracts(contractsWithDetails);
    } catch (err) {
      console.error('Contract loading error:', err);
      setError('Failed to load contracts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCreatorContracts();
  }, [walletConnected]);

  return (
    <ContractsContext.Provider 
      value={{ 
        subscriptionContracts, 
        isLoading, 
        error,
        refreshContracts: loadCreatorContracts 
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
}