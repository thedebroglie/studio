'use server';

/**
 * @fileOverview Flow for providing a confidence score for credential verification.
 *
 * - instantVerificationConfidenceScore -  A function that returns a confidence score for credential verification.
 * - InstantVerificationConfidenceScoreInput - The input type for the instantVerificationConfidenceScore function.
 * - InstantVerificationConfidenceScoreOutput - The return type for the instantVerificationConfidenceScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InstantVerificationConfidenceScoreInputSchema = z.object({
  candidateName: z.string().describe('The name of the candidate.'),
  certificateDetails: z.string().describe('Details of the certificate to be verified.'),
  verificationData: z.string().describe('Data obtained from blockchain verification.'),
});
export type InstantVerificationConfidenceScoreInput = z.infer<
  typeof InstantVerificationConfidenceScoreInputSchema
>;

const InstantVerificationConfidenceScoreOutputSchema = z.object({
  confidenceScore: z
    .number()
    .describe(
      'A confidence score (0-1) representing the trustworthiness of the verified credentials.'
    ),
  rationale: z.string().describe('Explanation for the assigned confidence score.'),
});
export type InstantVerificationConfidenceScoreOutput = z.infer<
  typeof InstantVerificationConfidenceScoreOutputSchema
>;

export async function instantVerificationConfidenceScore(
  input: InstantVerificationConfidenceScoreInput
): Promise<InstantVerificationConfidenceScoreOutput> {
  return instantVerificationConfidenceScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'instantVerificationConfidenceScorePrompt',
  input: {schema: InstantVerificationConfidenceScoreInputSchema},
  output: {schema: InstantVerificationConfidenceScoreOutputSchema},
  prompt: `You are an AI expert in credential verification.
  Your task is to analyze the provided information and provide a confidence score (0-1) for the trustworthiness of the credentials.

  Candidate Name: {{{candidateName}}}
  Certificate Details: {{{certificateDetails}}}
  Blockchain Verification Data: {{{verificationData}}}

  Based on this information, provide a confidence score and a brief rationale for your assessment.
  The confidence score should reflect the likelihood that the certificate is valid and belongs to the candidate.
`,
});

const instantVerificationConfidenceScoreFlow = ai.defineFlow(
  {
    name: 'instantVerificationConfidenceScoreFlow',
    inputSchema: InstantVerificationConfidenceScoreInputSchema,
    outputSchema: InstantVerificationConfidenceScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
