
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

const RecommendedCakeSchema = z.object({
  id: z.string().describe('The ID of the cake from the catalog (e.g., pastel-1).'),
  recommendation: z.string().describe('The name of the cake.'),
  description: z.string().describe('Why this cake is a great fit for the user.'),
});

const CakeRecommendationOutputSchema = z.object({
  suggestions: z.array(RecommendedCakeSchema).describe('A list of up to 3 recommended cakes.'),
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

  A customer is looking for recommendations based on:
  Dietary Restrictions: {{{dietaryRestrictions}}}
  Favorite Flavors: {{{favoriteFlavors}}}
  Occasion: {{{occasion}}}

  Based on their preferences, suggest up to 3 cakes from our catalog. You MUST use the exact ID and name provided below.

  Catalog:
  - id: pastel-1, name: Chocolate Fudge Premium, price: $45
  - id: pastel-2, name: Red Velvet Dream, price: $48
  - id: pastel-3, name: Strawberry Shortcake, price: $42
  - id: pastel-4, name: Vanilla Bean Classic, price: $38
  - id: pastel-5, name: Lemon Zest Delight, price: $40
  - id: pastel-6, name: Carrot Cake Supreme, price: $44
  - id: pastel-7, name: Tiramisu Especial, price: $52
  - id: pastel-8, name: Tres Leches Gourmet, price: $46
  - id: pastel-9, name: Cheesecake de la Casa, price: $50
  - id: pastel-10, name: Tentación de Chocolate, price: $35

  Return a JSON object with 'suggestions', each containing the 'id', 'recommendation' (name), and 'description'.
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
