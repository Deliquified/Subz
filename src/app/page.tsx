"use client"

import Image from "next/image";
import { useUpProvider } from "./upProvider";
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import LSP8 from './json/LSP8.json'
import LSP7 from './json/LSP7.json'
import CreatorDashboard from './components/CreatorDashboard';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import UniversalProfileArtifact from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { contextAccounts, accounts, walletConnected, client, provider } = useUpProvider();

  const isGridOwner = contextAccounts[0]?.toLowerCase() === accounts[0]?.toLowerCase();

  if (!walletConnected) {
    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>
            Click the Universal Profile icon in the top left corner to connect your wallet
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!isGridOwner) {
    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Wrong Grid</CardTitle>
          <CardDescription>
            You can only manage subscriptions from your own Grid
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Visit your Grid to manage your subscriptions
          </p>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = `https://universaleverything.io/${accounts[0]}?assetGroup=grid`}
            className="w-full"
          >
            Go to My Grid →
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full h-full">
      <CreatorDashboard account={accounts[0]} provider={provider} client={client} />
    </div>
  );
}

/*
<div className="grid grid-cols-[300px_1fr] gap-8">
  <button onClick={() => {deploy()}}>deploy contract</button>
  <button onClick={() => {deployStablecoin()}}>deploy stablecoin</button>
  <button onClick={() => {tier()}}>tier</button>
</div>
*/