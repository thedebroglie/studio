'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FraudDetectionForm } from './fraud-detection-form';
import { ShieldCheck, FilePlus } from 'lucide-react';

// Mock data for demonstration purposes
const registeredIssuers = [
  { name: 'University of Cred-Pass', address: '0x123...abc' },
  { name: 'Global Tech Institute', address: '0x456...def' },
  { name: 'National University of Singapore', address: '0x789...ghi' },
];

const activeProposals = [
  { name: 'Future Leaders Academy', address: '0xabc...123', votes: 42 },
  { name: 'Blockchain Innovators Hub', address: '0xdef...456', votes: 18 },
];

export default function UniversityPortalPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 font-headline">
        University Portal
      </h1>
      <p className="text-muted-foreground mb-8">
        Manage your institution's credentials with cutting-edge security and
        efficiency.
      </p>

      <Tabs defaultValue="issue" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="issue">Issue Certificate</TabsTrigger>
          <TabsTrigger value="fraud-detection">Fraud Detection</TabsTrigger>
          <TabsTrigger value="registry">Issuer Registry</TabsTrigger>
        </TabsList>
        <TabsContent value="issue" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Issue a New Certificate</CardTitle>
              <CardDescription>
                Mint a new, tamper-proof credential on the blockchain.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-name">Student Name</Label>
                  <Input id="student-name" placeholder="e.g., Alice Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificate-title">Certificate Title</Label>
                  <Input
                    id="certificate-title"
                    placeholder="e.g., Master of Artificial Intelligence"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issue-date">Issue Date</Label>
                  <Input id="issue-date" type="date" />
                </div>
                <Button className="w-full sm:w-auto">Issue Certificate</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="fraud-detection" className="mt-6">
          <FraudDetectionForm />
        </TabsContent>
        <TabsContent value="registry" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Propose New Issuer</CardTitle>
                  <CardDescription>
                    Propose a new institution to be added to the registry. Requires DAO vote to be approved.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="issuer-name">Institution Name</Label>
                      <Input id="issuer-name" placeholder="e.g., MIT" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="issuer-address">Blockchain Address</Label>
                      <Input id="issuer-address" placeholder="0x..." />
                    </div>
                    <Button className="w-full">
                      <FilePlus className="mr-2 h-4 w-4" />
                      Submit Proposal
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Proposals</CardTitle>
                  <CardDescription>
                    Vote on pending proposals to the issuer registry.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {activeProposals.map((proposal) => (
                      <li key={proposal.address} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-semibold">{proposal.name}</p>
                          <p className="text-sm text-muted-foreground">{proposal.address}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{proposal.votes} Votes</span>
                            <Button size="sm">Vote</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Registered Issuers (Golden List)</CardTitle>
                 <CardDescription>
                    A curated list of trusted, verified credential issuers.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                 <ul className="space-y-4">
                  {registeredIssuers.map((issuer) => (
                    <li key={issuer.address} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                      <ShieldCheck className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="font-semibold">{issuer.name}</p>
                        <p className="text-sm text-muted-foreground">{issuer.address}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
