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
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="issue">Issue Certificate</TabsTrigger>
          <TabsTrigger value="fraud-detection">Fraud Detection</TabsTrigger>
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
      </Tabs>
    </div>
  );
}
