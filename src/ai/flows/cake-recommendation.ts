
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

  A customer is looking for a cake based on their preferences. Recommend ONE cake from Zoe's Sweet Delights catalog based on:

  Dietary Restrictions: {{{dietaryRestrictions}}}
  Favorite Flavors: {{{favoriteFlavors}}}
  Occasion: {{{occasion}}}

  Available Cakes at Zoe's Sweet Delights:
  1. Chocolate Fudge Premium ($45): Rich chocolate layers with Belgian fudge.
  2. Red Velvet Dream ($48): Classic red velvet with silky cream cheese frosting.
  3. Strawberry Shortcake ($42): Light sponge cake with fresh strawberries and cream.
  4. Vanilla Bean Classic ($38): Elegant vanilla bean cake with Madagascar vanilla frosting.
  5. Lemon Zest Delight ($40): Refreshing lemon-infused cake with citrus glaze.
  6. Carrot Cake Supreme ($44): Moist carrot cake with walnuts and spice.
  7. Tiramisu Especial ($52): Coffee-soaked layers with mascarpone mousse.
  8. Tres Leches Gourmet ($46): Traditional three-milk cake with a gourmet touch.
  9. Cheesecake de la Casa ($50): Creamy New York style cheesecake with berry coulis.
  10. Tentación de Chocolate ($35): Dark chocolate moist cake for true cocoa lovers.

  Return a JSON object with the 'recommendation' (the name of the cake) and its 'description' (why it's perfect for them).
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
