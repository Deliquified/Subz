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
import { LogOut, Plus, Users } from "lucide-react";
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

interface CreatorDashboardProps {
  account: string | null;
  provider: any; // Changed from ethers.providers.Web3Provider
  client: any;
}

interface SubscriptionTier {
  name: string;
  price: string;
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

  const [createStep, setCreateStep] = useState<'details' | 'tiers'>('details');

  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success'>('idle');
  const [countdown, setCountdown] = useState(2);

  const FACTORY_ADDRESS = "0xe861e6A7267Be14aC701e342fcf34e5D1F9e2AF0";

  const { profileData, isLoading } = useProfile();

  // Reset states when switching views
  useEffect(() => {
    if (activeView === 'create') {
      setNewContractForm({ name: '', stablecoin: '' });
      setSubscriptionTiers([]);
      setNewTier({ name: '', price: '' });
      setCreateStep('details');
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
      const tx = await provider.writeContract({
        account: account,
        address: FACTORY_ADDRESS,
        abi: FactoryABI,
        functionName: 'createSubscription',
        args: [
          newContractForm.name,
          account,
          "0x1C08D5127CFD0674D16De0d2da482bdb950675FB"
        ]
      });

      // Simulate deployment time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (tx) {
        setDeploymentStatus('success');
        await refreshContracts();
        toast({
          title: "Success!",
          description: "Your subscription contract has been deployed.",
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

            {createStep === 'details' ? (
              <Card>
                <CardHeader>
                  <CardTitle>Create New Subscription</CardTitle>
                  <CardDescription>Define your subscription tiers and prices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Subscription Name</label>
                      <Input
                        value={newContractForm.name}
                        onChange={(e) => setNewContractForm({...newContractForm, name: e.target.value})}
                        placeholder="Enter Subscription Name"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => setCreateStep('tiers')}
                        disabled={!newContractForm.name}
                      >
                        Next →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {deploymentStatus === 'deploying' ? 'Deploying Contract...' :
                     deploymentStatus === 'success' ? 'Contract Deployed!' :
                     'Subscription Tiers'}
                  </CardTitle>
                  <CardDescription>
                    {deploymentStatus === 'deploying' ? 'Please wait while we deploy your contract' :
                     deploymentStatus === 'success' ? `Redirecting to dashboard in ${countdown}s` :
                     'Add up to 3 subscription tiers'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {deploymentStatus === 'deploying' ? (
                    <div className="flex flex-col items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                      <p className="mt-4 text-sm text-muted-foreground">This may take a few moments...</p>
                    </div>
                  ) : deploymentStatus === 'success' ? (
                    <div className="flex flex-col items-center py-8">
                      <div className="text-green-500 text-xl">✓</div>
                      <p className="mt-4 text-sm text-muted-foreground">Contract successfully deployed!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
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
                          placeholder="Price (in USD)"
                          type="number"
                          className="w-48"
                        />
                        <Button 
                          onClick={addTier}
                          disabled={subscriptionTiers.length >= 3}
                        >
                          Add
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {subscriptionTiers.map((tier, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                            <div>
                              <p className="font-medium">{tier.name}</p>
                              <p className="text-sm text-muted-foreground">${tier.price}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeTier(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>

                      {subscriptionTiers.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          Add at least one tier to create the contract
                        </p>
                      )}

                      <div className="flex justify-between pt-4">
                        <Button 
                          variant="outline"
                          onClick={() => setCreateStep('details')}
                        >
                          ← Back
                        </Button>
                        <Button 
                          onClick={createSubscriptionContract}
                          disabled={isCreatingContract || subscriptionTiers.length === 0}
                        >
                          {isCreatingContract ? "Creating..." : "Create Contract"}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
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
              <h1 className="text-2xl font-bold mb-6">Manage</h1>
              <div className="grid grid-cols-2 gap-6">
                <Card>
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
                </Card>

                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Your Subscriptions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-full overflow-y-auto">
                      {subscriptionContracts.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No Subscriptions Yet
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {subscriptionContracts.map((contract) => (
                            <div 
                              key={contract.address} 
                              className="flex flex-col p-6 border rounded-lg hover:border-primary/20 transition-colors"
                            >
                              <div className="flex justify-between items-center mb-6">
                                <div>
                                  <h3 className="text-lg font-semibold text-foreground">
                                    {contract.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Subscription Contract
                                  </p>
                                </div>
                                <a 
                                  href={`https://explorer.execution.mainnet.lukso.network/address/${contract.address}`}
                                  target="_blank"
                                  rel="noopener noreferrer" 
                                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {contract.address.slice(0, 6)}...{contract.address.slice(-4)}
                                </a>
                              </div>
                              
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Tier Name</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {contract.tiers.length === 0 ? (
                                    <TableRow>
                                      <TableCell colSpan={2} className="text-center text-muted-foreground">
                                        No tiers configured
                                      </TableCell>
                                    </TableRow>
                                  ) : (
                                    contract.tiers.map((tier, index) => (
                                      <TableRow key={index}>
                                        <TableCell className="font-medium">{tier.name}</TableCell>
                                        <TableCell className="text-right">
                                          ${Number(tier.price).toFixed(2)}
                                        </TableCell>
                                      </TableRow>
                                    ))
                                  )}
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