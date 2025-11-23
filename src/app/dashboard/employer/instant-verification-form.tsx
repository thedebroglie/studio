'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  instantVerificationConfidenceScore,
  type InstantVerificationConfidenceScoreOutput,
} from '@/ai/flows/instant-verification-confidence-score';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  candidateName: z.string().min(2, { message: 'Candidate name is required.' }),
  certificateDetails: z
    .string()
    .min(10, { message: 'Certificate details are required.' }),
  verificationData: z
    .string()
    .min(10, { message: 'Blockchain verification data is required.' }),
});

export function InstantVerificationForm() {
  const [result, setResult] =
    useState<InstantVerificationConfidenceScoreOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      candidateName: '',
      certificateDetails: '',
      verificationData: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await instantVerificationConfidenceScore(values);
      setResult(response);
    } catch (e) {
      setError('An error occurred during verification. Please try again.');
      console.error(e);
    }
    setIsLoading(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Instant Verification</CardTitle>
          <CardDescription>
            Enter the details below to get an AI-powered confidence score.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="candidateName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Candidate Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="certificateDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Bachelor of Science, issued by..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="verificationData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blockchain Verification Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the transaction hash or data from the blockchain..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Verify Credential
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Verification Result</h2>
        {isLoading && (
          <Card className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </Card>
        )}
        {error && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
            </CardContent>
          </Card>
        )}
        {result && (
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>
                Confidence Score: {Math.round(result.confidenceScore * 100)}%
              </CardTitle>
              <CardDescription>
                An AI-assessed likelihood of the credential's authenticity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={result.confidenceScore * 100} className="mb-4 h-3" />
              <h3 className="font-semibold mt-6 mb-2">Rationale</h3>
              <p className="text-muted-foreground">{result.rationale}</p>
            </CardContent>
          </Card>
        )}
        {!isLoading && !result && !error && (
          <Card className="flex items-center justify-center h-64 border-dashed">
            <p className="text-muted-foreground">
              Verification results will appear here.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
