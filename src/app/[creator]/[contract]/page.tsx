'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, HelpCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubscriptionABI from '../../json/Subscription.json';
import { useUpProvider } from '../../upProvider';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import LSP3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import UniversalProfileArtifacts from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface Tier {
  id: number;
  name: string;
  price: string;
  isActive: boolean;
  tokenSymbol: string;
}

interface ProfileData {
  name?: string;
  description?: string;
  profileImage?: string;
}

interface SubscriptionStatus {
  isActive: boolean;
  expiry: number;
  tierId: number;
  tierName?: string;
}

export default function SubscriptionPage() {
  const { creator, contract } = useParams();
  const { accounts, walletConnected, provider, client } = useUpProvider();
  const { toast } = useToast();
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [creatorProfile, setCreatorProfile] = useState<ProfileData | null>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadCreatorProfile();
    loadContractData();
    if (walletConnected && accounts[0]) {
      checkSubscriptionStatus();
    }
  }, [creator, walletConnected, accounts[0]]);

  const loadCreatorProfile = async () => {
    try {
      const profile = new ERC725(
        LSP3ProfileSchema as ERC725JSONSchema[], 
        creator as string, 
        'https://42.rpc.thirdweb.com', 
        { ipfsGateway: 'https://api.universalprofile.cloud/ipfs' }
      );

      const profileData = await profile.fetchData('LSP3Profile');
      
      if (profileData.value && typeof profileData.value === 'object' && 'LSP3Profile' in profileData.value) {
        const { LSP3Profile } = profileData.value;
        setCreatorProfile({
          name: LSP3Profile.name || 'Unknown',
          description: LSP3Profile.description,
          profileImage: LSP3Profile.profileImage?.[0]?.url.replace('ipfs://', 'https://api.universalprofile.cloud/ipfs/')
        });
      }
    } catch (error) {
      console.error('Error loading creator profile:', error);
    }
  };

  const loadContractData = async () => {
    try {
      const rpcProvider = new ethers.providers.JsonRpcProvider('https://42.rpc.thirdweb.com');
      const subscriptionContract = new ethers.Contract(contract as string, SubscriptionABI, rpcProvider);
      
      const totalTiers = await subscriptionContract.totalTiers();
      const tokenAddress = await subscriptionContract.paymentToken(); 
      
      // Get token symbol using LSP4 standard
      const symbolKey = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('LSP4TokenSymbol'));
      const tokenContract = new ethers.Contract(tokenAddress, ['function getData(bytes32) view returns (bytes)'], rpcProvider);
      const symbolValue = await tokenContract.getData(symbolKey);
      const tokenSymbol = ethers.utils.toUtf8String(symbolValue);

      const tiersData = [];
      for (let i = 0; i < totalTiers.toNumber(); i++) {
        const tier = await subscriptionContract.tiers(i);
        tiersData.push({
          id: i,
          name: tier.name,
          price: ethers.utils.formatUnits(tier.price, 18),
          isActive: tier.isActive,
          tokenSymbol
        });
      }
      
      setTiers(tiersData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading contract data:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription data",
        variant: "destructive",
      });
    }
  };

  const checkSubscriptionStatus = async () => {
    try {
      const rpcProvider = new ethers.providers.JsonRpcProvider('https://42.rpc.thirdweb.com');
      const subscriptionContract = new ethers.Contract(contract as string, SubscriptionABI, rpcProvider);
      
      const subscriber = await subscriptionContract.subscribers(accounts[0]);
      const isActive = subscriber.isActive;
      const expiry = subscriber.expiry.toNumber();
      const tierId = subscriber.tierId.toNumber();
      
      if (isActive) {
        // Get tier name
        const tier = await subscriptionContract.tiers(tierId);
        setSubscriptionStatus({
          isActive,
          expiry,
          tierId,
          tierName: tier.name
        });
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const handleApprove = async () => {
    if (!walletConnected || selectedTier === null) return;
    
    setIsApproving(true);
    try {
      const rpcProvider = new ethers.providers.JsonRpcProvider('https://42.rpc.thirdweb.com');
      const subscriptionContract = new ethers.Contract(contract as string, SubscriptionABI, rpcProvider);
      const tokenAddress = await subscriptionContract.paymentToken();

      const tokenInterface = new ethers.utils.Interface([
        'function authorizeOperator(address operator, uint256 amount, bytes data) external'
      ]);

      const authorizeData = tokenInterface.encodeFunctionData('authorizeOperator', [
        contract,
        ethers.constants.MaxUint256,
        '0x'
      ]);

      // Fire and forget the transaction
      client.writeContract({
        account: accounts[0],
        address: accounts[0],
        abi: UniversalProfileArtifacts.abi,
        functionName: 'execute',
        args: [
          0,
          tokenAddress,
          0,
          authorizeData
        ]
      });

      // Immediately set as approved
      setIsApproved(true);
      toast({
        title: "Transaction Sent",
        description: "Please confirm the transaction in your wallet",
        variant: "default",
      });

    } catch (error) {
      console.error('Error approving:', error);
      toast({
        title: "Error",
        description: "Failed to authorize. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsApproving(false);
    }
  };

  const handleSubscribe = async () => {
    if (!walletConnected || selectedTier === null || !isApproved) return;
    
    setSubscribing(true);
    try {
      const subscriptionInterface = new ethers.utils.Interface([
        'function subscribe(uint256) external'
      ]);

      const subscribeData = subscriptionInterface.encodeFunctionData('subscribe', [
        selectedTier
      ]);

      // Fire and forget the transaction
      client.writeContract({
        account: accounts[0],
        address: accounts[0],
        abi: UniversalProfileArtifacts.abi,
        functionName: 'execute',
        args: [
          0,
          contract,
          0,
          subscribeData
        ]
      });

      // Immediately show success
      setShowSuccess(true);
      toast({
        title: "Transaction Sent",
        description: "Please confirm the transaction in your wallet",
        variant: "default",
      });

    } catch (error) {
      console.error('Error subscribing:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubscribing(false);
    }
  };

  const handleNavigateHome = () => {
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!walletConnected) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>
              Connect your Universal Profile to subscribe to {creatorProfile?.name || 'this creator'}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <TooltipProvider>
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                {creatorProfile?.profileImage ? (
                  <AvatarImage src={creatorProfile.profileImage} />
                ) : (
                  <AvatarFallback>
                    {creator?.slice(0, 2)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">
                  {creatorProfile?.name || `${creator?.slice(0, 6)}...${creator?.slice(-4)}`}
                </h2>
                <Button 
                  variant="link" 
                  className="px-0 text-muted-foreground hover:text-primary"
                  onClick={() => window.open(`https://universaleverything.io/${creator}?assetType=owned&assetGroup=grid`, '_blank')}
                >
                  View Grid <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>    

            {isSubscribed ? (
              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="text-lg font-semibold mb-2">Active Subscription</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between">
                      <span className="text-muted-foreground">Tier:</span>
                      <span className="font-medium">{subscriptionStatus?.tierName}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-muted-foreground">Expires:</span>
                      <span className="font-medium">
                        {new Date(subscriptionStatus?.expiry! * 1000).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-green-500 font-medium">Active</span>
                    </p>
                  </div>
                </div>
                {/*<Button 
                  onClick={handleNavigateHome}
                  className="w-full"
                >
                  Return to Homepage
                </Button>*/}
              </div>
            ) : showSuccess ? (
              <div className="space-y-4 text-center">
                <div className="py-4">
                  <div className="text-4xl mb-2">🎉</div>
                  <h3 className="text-xl font-semibold mb-2">Successfully Subscribed!</h3>
                  <p className="text-muted-foreground mb-4">
                    Your subscription has been activated
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    setShowSuccess(false);
                    checkSubscriptionStatus();
                  }}
                  className="w-full"
                >
                  View Subscription Details
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Select
                    value={selectedTier?.toString() || ''}
                    onValueChange={(value) => setSelectedTier(Number(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a tier" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiers.filter(tier => tier.isActive).map((tier) => (
                        <SelectItem key={tier.id} value={tier.id.toString()}>
                          {tier.name} - {tier.price} {tier.tokenSymbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <HelpCircle className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[300px] p-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">How to Subscribe</CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs space-y-2">
                          <p>1. Select your preferred tier</p>
                          <p>2. Authorize the subscription contract (one-time)</p>
                          <p>3. Complete your subscription</p>
                        </CardContent>
                      </Card>
                    </TooltipContent>
                  </Tooltip>
                </div>

                {!isApproved ? (
                  <Button 
                    onClick={handleApprove} 
                    disabled={selectedTier === null || isApproving || !walletConnected || countdown !== null}
                    className="w-full"
                  >
                    {countdown !== null ? (
                      <>
                        <span className="mr-2">Processing...</span>
                        <span className="animate-spin">⚙️</span>
                      </>
                    ) : isApproving ? (
                      <>
                        <span className="mr-2">Authorizing...</span>
                        <span className="animate-spin">⚙️</span>
                      </>
                    ) : (
                      "Authorize Subscription"
                    )}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubscribe} 
                    disabled={selectedTier === null || subscribing || !walletConnected || countdown !== null}
                    className="w-full"
                  >
                    {countdown !== null ? (
                      <>
                        <span className="mr-2">Processing...</span>
                        <span className="animate-spin">⚙️</span>
                      </>
                    ) : subscribing ? (
                      <>
                        <span className="mr-2">Subscribing...</span>
                        <span className="animate-spin">⚙️</span>
                      </>
                    ) : (
                      "Complete Subscription"
                    )}
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </TooltipProvider>
    </div>
  );
}