"use client"

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import FactoryABI from '../json/Factory.json';
import SubscriptionABI from '../json/Subscription.json';
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, Users, Copy } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProfile } from '../provider/profileProvider';
import { useToast } from "@/hooks/use-toast";
import { useContracts } from '../provider/contractProvider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUpProvider } from '../upProvider';
import { SUPPORTED_TOKENS, Token } from "../types/tokens";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreatorDashboardProps {
  account: string | null;
  provider: any; // Changed from ethers.providers.Web3Provider
  client: any;
}

interface SubscriptionTier {
  name: string;
  price: string;
}

interface Subscription {
  contractAddress: string;
  name: string;
  blockNumber: number;
  timestamp: number;
  transactionHash: string;
}

export default function CreatorDashboard({ account, provider, client }: CreatorDashboardProps) {
  const { toast } = useToast();
  const { subscriptionContracts, refreshContracts } = useContracts();
  const [isCreatingContract, setIsCreatingContract] = useState(false);
  const [newContractForm, setNewContractForm] = useState({
    name: '',
    stablecoin: ''
  });

  const [activeView, setActiveView] = useState<'manage' | 'create'>('manage');

  const [subscriptionTiers, setSubscriptionTiers] = useState<SubscriptionTier[]>([]);
  const [newTier, setNewTier] = useState<SubscriptionTier>({ name: '', price: '' });

  const [creationStep, setCreationStep] = useState<'details' | 'tiers'>('details');

  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success'>('idle');
  const [countdown, setCountdown] = useState(2);

  const FACTORY_ADDRESS = "0x1F4aa0a6eC5ec3c21FBabcb6aAD6e3dE45775c7a";

  const { profileData, isLoading } = useProfile();
  const { accounts } = useUpProvider();
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedToken, setSelectedToken] = useState<Token>(SUPPORTED_TOKENS[0]);

  // Add these to existing state declarations
  const [deploymentPhase, setDeploymentPhase] = useState<'details' | 'tiers' | 'complete'>('details');
  const [deployedContract, setDeployedContract] = useState<string | null>(null);

  // Reset states when switching views
  useEffect(() => {
    if (activeView === 'create') {
      setNewContractForm({ name: '', stablecoin: '' });
      setSubscriptionTiers([]);
      setNewTier({ name: '', price: '' });
      setCreationStep('details');
      setDeploymentStatus('idle');
    }
  }, [activeView]);

  // Handle success countdown
  useEffect(() => {
    if (deploymentStatus === 'success') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setActiveView('manage');
            setDeploymentStatus('idle');
            return 2;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [deploymentStatus]);

  const createSubscriptionContract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider || !account) return;

    setIsCreatingContract(true);
    setDeploymentStatus('deploying');
    
    try {
      const tx = await client.writeContract({
        account: account,
        address: FACTORY_ADDRESS,
        abi: FactoryABI,
        functionName: 'createSubscription',
        args: [
          newContractForm.name,
          account,
          "0x1C08D5127CFD0674D16De0d2da482bdb950675FB" //selectedToken.address
        ]
      });

      // Wait for deployment
      await new Promise(resolve => setTimeout(resolve, 15000));
      
      // Query factory contract for latest deployment
      const rpcProvider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.lukso.network');
      const factoryContract = new ethers.Contract(FACTORY_ADDRESS, FactoryABI, rpcProvider);
      const subscriptions = await factoryContract.getCreatorSubscriptions(account);
      
      if (subscriptions.length > 0) {
        const latestContract = subscriptions[subscriptions.length - 1];
        setDeployedContract(latestContract);
        setDeploymentPhase('tiers');
        toast({
          title: "Success!",
          description: "Contract deployed. Now add your subscription tiers.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      setDeploymentStatus('idle');
      toast({
        title: "Error",
        description: "Failed to create subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingContract(false);
    }
  };

  const addTier = () => {
    if (subscriptionTiers.length >= 3) return;
    if (!newTier.name || !newTier.price) return;
    
    setSubscriptionTiers([...subscriptionTiers, newTier]);
    setNewTier({ name: '', price: '' });
  };

  const removeTier = (index: number) => {
    setSubscriptionTiers(subscriptionTiers.filter((_, i) => i !== index));
  };

  const createTier = async (tier: SubscriptionTier) => {
    if (!deployedContract || !account) return;

    try {
      const price = ethers.utils.parseUnits(tier.price, 18);
      
      await client.writeContract({
        account: account,
        address: deployedContract,
        abi: SubscriptionABI,
        functionName: 'createTier',
        args: [tier.name, price]
      });

      toast({
        title: "Success!",
        description: `Tier "${tier.name}" created successfully.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error creating tier:", error);
      toast({
        title: "Error",
        description: "Failed to create tier. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoadingSubscriptions) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {activeView === 'create' ? (
        <div className="h-screen p-6">
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setActiveView('manage')}
              className="mb-6"
            >
              ← Back to Dashboard
            </Button>

            {deploymentPhase === 'details' ? (
              <form onSubmit={createSubscriptionContract}>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium">Subscription Name</label>
                    <Input
                      value={newContractForm.name}
                      onChange={(e) => setNewContractForm({...newContractForm, name: e.target.value})}
                      placeholder="Enter Subscription Name"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Select Token</label>
                    <Select
                      value={selectedToken.address}
                      onValueChange={(value) => {
                        const token = SUPPORTED_TOKENS.find(t => t.address === value);
                        if (token) setSelectedToken(token);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            <Image
                              src={selectedToken.icon}
                              alt={selectedToken.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                            {selectedToken.name}
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {SUPPORTED_TOKENS.map((token) => (
                          <SelectItem key={token.address} value={token.address}>
                            <div className="flex items-center gap-2">
                              <Image
                                src={token.icon}
                                alt={token.name}
                                width={24}
                                height={24}
                                className="rounded-full"
                              />
                              {token.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isCreatingContract || !newContractForm.name}
                    className="w-full"
                  >
                    {isCreatingContract ? "Creating Contract..." : "Create Contract"}
                  </Button>
                </div>
              </form>
            ) : deploymentPhase === 'tiers' ? (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Add Subscription Tiers</label>
                  <div className="mt-2 space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newTier.name}
                        onChange={(e) => setNewTier({...newTier, name: e.target.value})}
                        placeholder="Tier name"
                        className="flex-1"
                      />
                      <Input
                        value={newTier.price}
                        onChange={(e) => setNewTier({...newTier, price: e.target.value})}
                        placeholder={`Price in ${selectedToken.name}`}
                        type="number"
                        className="w-48"
                      />
                      <Button 
                        onClick={() => {
                          createTier(newTier);
                          setSubscriptionTiers([...subscriptionTiers, newTier]);
                          setNewTier({ name: '', price: '' });
                        }}
                        disabled={!newTier.name || !newTier.price || subscriptionTiers.length >= 3}
                      >
                        Add Tier
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {subscriptionTiers.map((tier, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <p className="font-medium">{tier.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {tier.price} {selectedToken.name}
                            </p>
                          </div>
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeTier(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    // Reset all creation-related states
                    setDeploymentPhase('details');
                    setDeployedContract(null);
                    setNewContractForm({ name: '', stablecoin: '' });
                    setSubscriptionTiers([]);
                    setNewTier({ name: '', price: '' });
                    setSelectedToken(SUPPORTED_TOKENS[0]);
                    setDeploymentStatus('idle');
                    
                    // Switch view and refresh contracts
                    setActiveView('manage');
                    refreshContracts();
                  }}
                  disabled={subscriptionTiers.length === 0}
                  className="w-full mt-6"
                >
                  Complete Setup
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[280px_1fr] h-screen">
          <div className="border-r bg-background">
            <div className="h-full flex flex-col">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
                <div className="space-y-4">
                  <Button 
                    variant="secondary"
                    className="w-full justify-start"
                    onClick={() => setActiveView('manage')}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Subscriptions
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setActiveView('create')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create
                  </Button>
                </div>
              </div>
              
              <div className="mt-auto p-4 border-t">
                <div className="flex items-center gap-3">
                  <Avatar>
                    {profileData?.profileImage ? (
                      <AvatarImage src={profileData.profileImage} />
                    ) : (
                      <AvatarFallback>
                        {profileData?.name?.slice(0, 2) || account?.slice(0, 2) || 'UP'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {profileData?.name || `${account?.slice(0, 6)}...${account?.slice(-4)}`}
                    </p>
                    <p className="text-xs text-muted-foreground">Creator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-screen overflow-auto">
            <div className="p-6">
              {/*<h1 className="text-2xl font-bold mb-6">Manage</h1>*/}
              <div className="grid grid-cols-2 gap-6">
                {/*<Card>
                  <CardHeader>
                    <CardTitle>Total Subscribers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">0</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">$0</p>
                  </CardContent>
                </Card>*/}

                <Card className="col-span-3">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Your Subscriptions</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          refreshContracts();
                          toast({
                            title: "Refreshing...",
                            description: "Updating your subscription list",
                            variant: "default",
                          });
                        }}
                      >
                        <svg
                          className="h-4 w-4 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                          <path d="M21 3v5h-5" />
                          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                          <path d="M3 21v-5h5" />
                        </svg>
                        Refresh
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-full overflow-y-auto">
                      {subscriptionContracts.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No Subscriptions Yet
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {subscriptionContracts.map((sub) => (
                            <div 
                              key={sub.address} 
                              className="flex flex-col p-6 border rounded-lg hover:border-primary/20 transition-colors"
                            >
                              <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-4">
                                  <h3 className="text-md font-semibold text-foreground">
                                    {sub.name}
                                  </h3>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      // Create temporary input element
                                      const tempInput = document.createElement('input');
                                      const url = `${window.location.origin}/${account}/${sub.address}`;
                                      tempInput.value = url;
                                      document.body.appendChild(tempInput);
                                      
                                      // Select and copy
                                      tempInput.select();
                                      try {
                                        document.execCommand('copy');
                                        toast({
                                          title: "Link copied!",
                                          description: "Go to your grid > create new item > paste link as website link",
                                          variant: "default",
                                        });
                                      } catch (err) {
                                        toast({
                                          title: "Error",
                                          description: "Failed to copy link. Please try again.",
                                          variant: "destructive",
                                        });
                                      }
                                      
                                      // Cleanup
                                      document.body.removeChild(tempInput);
                                    }}
                                  >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add To Grid
                                  </Button>
                                </div>
                              </div>
                              
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="w-[200px]">Tier Name</TableHead>
                                    <TableHead className="w-[200px]">Price</TableHead>
                                    <TableHead className="text-right">Status</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {sub.tiers.map((tier, index) => (
                                    <TableRow key={index}>
                                      <TableCell className="w-[200px]">{tier.name}</TableCell>
                                      <TableCell className="w-[200px]">{tier.price} {tier.tokenSymbol}</TableCell>
                                      <TableCell className="text-right">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                          tier.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                          {tier.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}