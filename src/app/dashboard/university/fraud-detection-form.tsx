'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  detectFraudulentCertificate,
  type FraudulentCertificateDetectionOutput,
} from '@/ai/flows/fraudulent-certificate-detection';
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
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Loader2, ShieldAlert, ShieldCheck } from 'lucide-react';

const formSchema = z.object({
  certificateData: z
    .string()
    .min(20, { message: 'Please provide detailed certificate data to analyze.' }),
});

export function FraudDetectionForm() {
  const [result, setResult] =
    useState<FraudulentCertificateDetectionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificateData: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await detectFraudulentCertificate(values);
      setResult(response);
    } catch (e) {
      setError('An error occurred during analysis. Please try again.');
      console.error(e);
    }
    setIsLoading(false);
  }

  const score = result ? result.fraudConfidenceScore * 100 : 0;
  const isFraudulent = score > 50;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Fraud Detection</CardTitle>
          <CardDescription>
            Analyze certificate data to identify potential signs of fraud.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="certificateData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the full certificate data (e.g., JSON or text format) here for analysis."
                        rows={10}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze for Fraud
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Analysis Result</h2>
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
          <Card
            className={isFraudulent ? 'border-destructive' : 'border-chart-2'}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                {isFraudulent ? (
                  <ShieldAlert className="h-8 w-8 text-destructive" />
                ) : (
                  <ShieldCheck className="h-8 w-8 text-chart-2" />
                )}
                <div>
                  <CardTitle
                    className={
                      isFraudulent ? 'text-destructive' : 'text-chart-2'
                    }
                  >
                    {isFraudulent ? 'High Fraud Risk' : 'Low Fraud Risk'}
                  </CardTitle>
                  <CardDescription>
                    Confidence of fraud: {Math.round(score)}%
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress
                value={score}
                className={
                  isFraudulent
                    ? '[&>div]:bg-destructive'
                    : '[&>div]:bg-chart-2'
                }
              />
              <h3 className="font-semibold mt-6 mb-2">Reasoning</h3>
              <p className="text-muted-foreground">{result.reasoning}</p>
            </CardContent>
          </Card>
        )}
        {!isLoading && !result && !error && (
          <Card className="flex items-center justify-center h-64 border-dashed">
            <p className="text-muted-foreground">
              Analysis results will appear here.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
