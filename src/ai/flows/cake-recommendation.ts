'use server';

/**
 * @fileOverview Recommends cakes based on user preferences.
 *
 * - cakeRecommendation - A function that recommends cakes based on user preferences.
 * - CakeRecommendationInput - The input type for the cakeRecommendation function.
 * - CakeRecommendationOutput - The return type for the cakeRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CakeRecommendationInputSchema = z.object({
  dietaryRestrictions: z
    .string()
    .describe('Any dietary restrictions the user has (e.g., gluten-free, vegan).'),
  favoriteFlavors: z
    .string()
    .describe('The user\'s favorite flavors (e.g., chocolate, vanilla, strawberry).'),
  occasion: z.string().describe('The occasion for the cake (e.g., birthday, wedding, anniversary).'),
});
export type CakeRecommendationInput = z.infer<typeof CakeRecommendationInputSchema>;

const CakeRecommendationOutputSchema = z.object({
  recommendation: z.string().describe('The recommended cake based on the user\'s preferences.'),
  description: z.string().describe('A description of the recommended cake.'),
});
export type CakeRecommendationOutput = z.infer<typeof CakeRecommendationOutputSchema>;

export async function cakeRecommendation(input: CakeRecommendationInput): Promise<CakeRecommendationOutput> {
  return cakeRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cakeRecommendationPrompt',
  input: {schema: CakeRecommendationInputSchema},
  output: {schema: CakeRecommendationOutputSchema},
  prompt: `You are an expert cake recommender for Zoe's Sweet Delights.

  A customer is looking for a cake based on their preferences.  Recommend one cake from Zoe's Sweet Delights based on the following criteria:

  Dietary Restrictions: {{{dietaryRestrictions}}}
  Favorite Flavors: {{{favoriteFlavors}}}
  Occasion: {{{occasion}}}

  Consider the available cakes at Zoe's Sweet Delights. Here is a list of cakes that Zoe's Sweet Delights offers:

  [Provide a comprehensive and detailed list of the 9+ cakes, including names, descriptions, prices, and ingredients.  This list MUST be comprehensive.]

  Based on the criteria above, return a JSON object with the recommended cake and its description.
  `,
});

const cakeRecommendationFlow = ai.defineFlow(
  {
    name: 'cakeRecommendationFlow',
    inputSchema: CakeRecommendationInputSchema,
    outputSchema: CakeRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
