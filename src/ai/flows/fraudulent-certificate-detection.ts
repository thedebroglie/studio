'use server';

/**
 * @fileOverview AI-powered fraud detection for certificates.
 *
 * This flow analyzes certificate data to identify potentially fraudulent certificates, helping to maintain the integrity of the institution's credentials.
 *
 * - `detectFraudulentCertificate` -  A function that takes certificate data as input and returns a confidence score indicating the likelihood of fraud.
 * - `FraudulentCertificateDetectionInput` - The input type for the detectFraudulentCertificate function.
 * - `FraudulentCertificateDetectionOutput` - The return type for the detectFraudulentCertificate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FraudulentCertificateDetectionInputSchema = z.object({
  certificateData: z
    .string()
    .describe('The certificate data to analyze, including student details, course information, and issuing institution.'),
});
export type FraudulentCertificateDetectionInput = z.infer<
  typeof FraudulentCertificateDetectionInputSchema
>;

const FraudulentCertificateDetectionOutputSchema = z.object({
  fraudConfidenceScore: z
    .number()
    .describe(
      'A score between 0 and 1 indicating the confidence level that the certificate is fraudulent.'
    ),
  reasoning: z.string().describe('Explanation of why the certificate was flagged.'),
});
export type FraudulentCertificateDetectionOutput = z.infer<
  typeof FraudulentCertificateDetectionOutputSchema
>;

export async function detectFraudulentCertificate(
  input: FraudulentCertificateDetectionInput
): Promise<FraudulentCertificateDetectionOutput> {
  return fraudulentCertificateDetectionFlow(input);
}

const fraudulentCertificateDetectionPrompt = ai.definePrompt({
  name: 'fraudulentCertificateDetectionPrompt',
  input: {schema: FraudulentCertificateDetectionInputSchema},
  output: {schema: FraudulentCertificateDetectionOutputSchema},
  prompt: `You are an AI expert in fraud detection, specializing in identifying potentially fraudulent certificates.
  Analyze the provided certificate data and determine the likelihood of fraud.

  Provide a fraudConfidenceScore between 0 and 1, where 0 indicates a very low likelihood of fraud and 1 indicates a very high likelihood of fraud.

  Also provide reasoning for the score assigned.

  Certificate Data: {{{certificateData}}}`,
});

const fraudulentCertificateDetectionFlow = ai.defineFlow(
  {
    name: 'fraudulentCertificateDetectionFlow',
    inputSchema: FraudulentCertificateDetectionInputSchema,
    outputSchema: FraudulentCertificateDetectionOutputSchema,
  },
  async input => {
    const {output} = await fraudulentCertificateDetectionPrompt(input);
    return output!;
  }
);
