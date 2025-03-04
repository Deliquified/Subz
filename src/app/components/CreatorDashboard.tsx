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
import { Progress } from "@/components/ui/progress";

interface CreatorDashboardProps {
  account: string | null;
  provider: any; // Changed from ethers.providers.Web3Provider
  signer: any;
  browserProvider: any;
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

interface DeploymentStep {
  status: 'pending' | 'processing' | 'complete' | 'error';
  message: string;
}

const TransactionScreen = ({ 
  steps, 
  progress, 
  error, 
  onRetry, 
  onCancel, 
  isComplete 
}: { 
  steps: DeploymentStep[];
  progress: number;
  error: boolean;
  onRetry: () => void;
  onCancel: () => void;
  isComplete: boolean;
}) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isComplete) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onCancel();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isComplete, onCancel]);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="bg-background border rounded-lg shadow-lg w-[400px] p-6">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-lg font-semibold">
                {error ? "Transaction Failed" : 
                 isComplete ? "Success!" : 
                 "Creating Subscription"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {error ? "There was an error processing your transaction" :
                 isComplete ? "Your subscription has been created" :
                 "Please wait while we process your transaction"}
              </p>
            </div>

            <Progress value={progress} className="w-full animate-pulse" />

            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  {step.status === 'pending' && (
                    <div className="h-2 w-2 rounded-full bg-muted" />
                  )}
                  {step.status === 'processing' && (
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  )}
                  {step.status === 'complete' && (
                    <svg
                      className="h-4 w-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {step.status === 'error' && (
                    <svg
                      className="h-4 w-4 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  <span className={`text-sm ${
                    step.status === 'processing' ? 'text-blue-500 font-medium' :
                    step.status === 'complete' ? 'text-green-500' :
                    step.status === 'error' ? 'text-red-500' :
                    'text-muted-foreground'
                  }`}>
                    {step.message}
                  </span>
                </div>
              ))}
            </div>

            {error && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={onCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={onRetry}
                  className="flex-1"
                >
                  Try Again
                </Button>
              </div>
            )}

            {isComplete && (
              <div className="text-center space-y-2">
                <Button 
                  onClick={onCancel}
                  className="w-full"
                >
                  Redirecting...
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CreatorDashboard({ account, provider, signer, browserProvider }: CreatorDashboardProps) {
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

  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success'>('idle');
  const [countdown, setCountdown] = useState(2);

  const FACTORY_ADDRESS = "0x4170CBC17BF719307406787654336220d14980d4";

  const { profileData, isLoading } = useProfile();
  const { accounts } = useUpProvider();
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(false);
  const [error, setError] = useState(false);
  const [showTransactionScreen, setShowTransactionScreen] = useState(false);

  const [selectedToken, setSelectedToken] = useState<Token>(SUPPORTED_TOKENS[0]);

  // Add these to existing state declarations
  const [deployedContract, setDeployedContract] = useState<string | null>(null);

  // Add these new state declarations where other states are defined
  const [deploymentSteps, setDeploymentSteps] = useState<DeploymentStep[]>([
    { status: 'pending', message: 'Deploy subscription contract' },
    { status: 'pending', message: 'Create subscription tiers' },
  ]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Reset states when switching views
  useEffect(() => {
    if (activeView === 'create') {
      setNewContractForm({ name: '', stablecoin: '' });
      setSubscriptionTiers([]);
      setNewTier({ name: '', price: '' });
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

  const handleRetry = () => {
    setError(false);
    setProgress(0);
    setDeploymentSteps([
      { status: 'pending', message: 'Deploy subscription contract' },
      { status: 'pending', message: 'Create subscription tiers' },
    ]);
    createSubscriptionContract();
  };

  const handleCancel = () => {
    setShowTransactionScreen(false);
    setActiveView('manage');
    resetForm();
    setDeploymentStatus('idle');
    setProgress(0);
    setError(false);
  };

  useEffect(() => {
    if (deploymentStatus === 'idle') {
      setShowTransactionScreen(false);
    }
  }, [deploymentStatus]);

  const createSubscriptionContract = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!provider || !account || !subscriptionTiers.length) return;

    setShowTransactionScreen(true);
    setIsCreatingContract(true);
    setProgress(0);
    setError(false);
    setDeploymentStatus('deploying');
    
    try {
      // Update status for contract deployment
      setDeploymentSteps(steps => steps.map((step, i) => 
        i === 0 ? { ...step, status: 'processing' } : step
      ));
      setProgress(25);

      const rpcProvider = new ethers.JsonRpcProvider('https://lukso.nownodes.io/3eae6d25-6bbb-4de1-a684-9f40dcc3f793');
      const factoryContract = new ethers.Contract(FACTORY_ADDRESS, FactoryABI, rpcProvider);
      const factoryDeployment = new ethers.Contract(FACTORY_ADDRESS, FactoryABI, signer);

      const tx = await factoryDeployment.createSubscription(
        newContractForm.name,
        account,
        selectedToken.address
      );

      const receipt = await rpcProvider.waitForTransaction(tx.hash);
      
      if (receipt?.status === 1) {
        // Update status for successful contract deployment
        setDeploymentSteps(steps => steps.map((step, i) => 
          i === 0 ? { ...step, status: 'complete' } : step
        ));
        setProgress(50);

        const subscriptions = await factoryContract.getCreatorSubscriptions(account);
        
        if (subscriptions.length > 0) {
          const updatedSubscriptions = await factoryContract.getCreatorSubscriptions(account);
          const deployedContract = updatedSubscriptions[updatedSubscriptions.length - 1];
          
          // Update status for tier creation
          setDeploymentSteps(steps => steps.map((step, i) => 
            i === 1 ? { ...step, status: 'processing' } : step
          ));
          
          // Create tiers
          const totalTiers = subscriptionTiers.length;
          for (let i = 0; i < totalTiers; i++) {
            const tier = subscriptionTiers[i];
            const price = ethers.parseUnits(tier.price, 18);
            const subscriptionContract = new ethers.Contract(deployedContract, SubscriptionABI, signer);
            
            setDeploymentSteps(steps => steps.map((step, idx) => 
              idx === 1 ? { ...step, message: `Creating tier ${i + 1} of ${totalTiers}` } : step
            ));
            
            const tx = await subscriptionContract.createTier(tier.name, price);
            await rpcProvider.waitForTransaction(tx.hash);
            
            // Update progress based on tier creation
            setProgress(50 + ((i + 1) / totalTiers) * 50);
          }

          // Update final status
          setDeploymentSteps(steps => steps.map((step, i) => 
            i === 1 ? { ...step, status: 'complete', message: 'Created subscription tiers' } : step
          ));
          setProgress(100);
          
          // Set success state and handle cleanup
          setDeploymentStatus('success');
          setTimeout(() => {
            refreshContracts();
            setIsCreatingContract(false);
            resetForm();
          }, 2000);
        }
      }
      
    } catch (error) {
      console.error("Error creating subscription:", error);
      // Update status for error
      setDeploymentSteps(steps => steps.map(step => 
        step.status === 'processing' ? { ...step, status: 'error' } : step
      ));
      setDeploymentStatus('idle');
      setIsCreatingContract(false);
      setError(true);
      toast({
        title: "Error",
        description: "Failed to create subscription. Please try again.",
        variant: "destructive",
        duration: 2000
      });
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

  // Add this helper function to clean up the form reset
  const resetForm = () => {
    setNewContractForm({ name: '', stablecoin: '' });
    setSubscriptionTiers([]);
    setNewTier({ name: '', price: '' });
    setSelectedToken(SUPPORTED_TOKENS[0]);
    setDeploymentSteps([
      { status: 'pending', message: 'Deploy subscription contract' },
      { status: 'pending', message: 'Create subscription tiers' },
    ]);
    setProgress(0);
    setCurrentStepIndex(0);
  };

  if (isLoadingSubscriptions) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {showTransactionScreen && (
        <TransactionScreen
          steps={deploymentSteps}
          progress={progress}
          error={error}
          onRetry={handleRetry}
          onCancel={handleCancel}
          isComplete={deploymentStatus === 'success'}
        />
      )}
      
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
                        type="button"
                        onClick={addTier}
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
                  type="submit"
                  disabled={isCreatingContract || !newContractForm.name || subscriptionTiers.length === 0}
                  className="w-full"
                >
                  {isCreatingContract ? "Creating Subscription..." : "Create Subscription"}
                </Button>
              </div>
            </form>
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
                                      const url = `https://subz-two.vercel.app/${account}/${sub.address}`;
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