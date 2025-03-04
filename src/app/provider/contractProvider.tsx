'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ethers } from 'ethers';
import { useUpProvider } from "../upProvider";
import FactoryABI from '../json/Factory.json';
import SubscriptionABI from '../json/Subscription.json';
import { keccak256, toUtf8Bytes } from 'ethers';

const LUKSO_RPC = 'https://lukso.nownodes.io/3eae6d25-6bbb-4de1-a684-9f40dcc3f793';
const FACTORY_ADDRESS = "0x4170CBC17BF719307406787654336220d14980d4";

interface SubscriptionTier {
  name: string;
  price: string;
  isActive: boolean;
  tokenSymbol: string;
}

interface SubscriptionContract {
  address: string;
  name: string;
  tiers: SubscriptionTier[];
  tokenAddress: string;
  tokenSymbol: string;
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

  const getTokenSymbol = async (tokenAddress: string, provider: ethers.JsonRpcProvider) => {
    const symbolKey = keccak256(toUtf8Bytes('LSP4TokenSymbol'));
    const abi = ['function getData(bytes32 key) view returns (bytes)'];
    const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
    
    try {
      const symbolValue = await tokenContract.getData(symbolKey);
      return ethers.toUtf8String(symbolValue);
    } catch (error) {
      console.error('Error fetching token symbol:', error);
      return 'Unknown';
    }
  };

  const getTokenName = async (contractAddress: string, provider: ethers.JsonRpcProvider) => {
    const nameKey = keccak256(toUtf8Bytes('LSP4TokenName'));
    const abi = ['function getData(bytes32 key) view returns (bytes)'];
    const contract = new ethers.Contract(contractAddress, abi, provider);
    
    try {
      const nameValue = await contract.getData(nameKey);
      return ethers.toUtf8String(nameValue);
    } catch (error) {
      console.error('Error fetching token name:', error);
      return 'Unknown';
    }
  };

  const loadCreatorContracts = async () => {
    if (!walletConnected || !accounts[0]) return;

    setIsLoading(true);
    setError(null);

    try {
      const provider = new ethers.JsonRpcProvider(LUKSO_RPC);
      const factoryContract = new ethers.Contract(FACTORY_ADDRESS, FactoryABI, provider);
      
      const addresses = await factoryContract.getCreatorSubscriptions(accounts[0]);

      //console.log(addresses, "addresses");

      const contractsWithDetails = await Promise.all(
        addresses.map(async (address: string) => {
          const contract = new ethers.Contract(address, SubscriptionABI, provider);
          const name = await getTokenName(address, provider);
          const totalTiers = await contract.totalTiers();
          const tokenAddress = await contract.paymentToken();
          const tokenSymbol = await getTokenSymbol(tokenAddress, provider);
          
          //console.log(`Contract ${name} (${address}) has ${totalTiers} tiers`);
          
          const tiersCount = Number(totalTiers);
          const tiers = [];
          for (let i = 0; i < tiersCount; i++) {
            const tier = await contract.tiers(i);
            //console.log(`Contract ${name} - Tier ${i}:`, tier);
            tiers.push({
              name: tier.name,
              price: ethers.formatUnits(tier.price, 18),
              isActive: tier.isActive,
              tokenSymbol
            });
          }

          const result = {
            address,
            name,
            tiers,
            tokenAddress,
            tokenSymbol
          };
          //console.log(`Final contract data for ${name}:`, result);
          return result;
        })
      );

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