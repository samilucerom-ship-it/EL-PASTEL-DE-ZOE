
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cakeRecommendation, type CakeRecommendationOutput } from '@/ai/flows/cake-recommendation';
import { Sparkles, Loader2, Cake, Heart, Utensils } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function RecommendationTool() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<CakeRecommendationOutput | null>(null);
  
  const [formData, setFormData] = useState({
    dietaryRestrictions: '',
    favoriteFlavors: '',
    occasion: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await cakeRecommendation(formData);
      setRecommendation(result);
    } catch (error) {
      console.error("Failed to get recommendation:", error);
    } finally {
      setLoading(false);
    }
  };

  const recommendedImage = recommendation 
    ? PlaceHolderImages.find(img => img.description === recommendation.recommendation)
    : null;

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <Card className="border-none shadow-xl bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-headline">
            <Sparkles className="text-secondary" /> Personaliza tu Búsqueda
          </CardTitle>
          <CardDescription className="text-base">
            Dinos qué estás buscando y Zoe elegirá por ti.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" /> Restricciones Dietéticas
              </Label>
              <Input 
                placeholder="Ej. Vegano, Sin Gluten, Ninguna..." 
                value={formData.dietaryRestrictions}
                onChange={(e) => setFormData({...formData, dietaryRestrictions: e.target.value})}
                className="rounded-xl border-secondary/20"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-primary" /> Sabores Favoritos
              </Label>
              <Input 
                placeholder="Ej. Chocolate belga, Frutas del bosque..." 
                value={formData.favoriteFlavors}
                onChange={(e) => setFormData({...formData, favoriteFlavors: e.target.value})}
                className="rounded-xl border-secondary/20"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Cake className="w-4 h-4 text-primary" /> Ocasión Especial
              </Label>
              <Select 
                value={formData.occasion}
                onValueChange={(val) => setFormData({...formData, occasion: val})}
              >
                <SelectTrigger className="rounded-xl border-secondary/20">
                  <SelectValue placeholder="Selecciona el evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cumpleaños">Cumpleaños</SelectItem>
                  <SelectItem value="boda">Boda</SelectItem>
                  <SelectItem value="aniversario">Aniversario</SelectItem>
                  <SelectItem value="bautizo">Bautizo / Baby Shower</SelectItem>
                  <SelectItem value="graduacion">Graduación</SelectItem>
                  <SelectItem value="reunion">Reunión Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full rounded-full bg-primary hover:bg-primary/90 py-6 text-lg shadow-md transition-all active:scale-95"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Cocinando tu recomendación...
                </>
              ) : "Obtener Recomendación Mágica"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="h-full flex flex-col justify-center">
        {recommendation ? (
          <Card className="border-2 border-secondary/30 shadow-2xl bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
            {recommendedImage && (
              <div className="relative h-64 w-full bg-muted/10">
                <Image 
                  src={recommendedImage.imageUrl} 
                  alt={recommendedImage.description}
                  fill
                  className="object-contain p-4"
                />
              </div>
            )}
            <div className="bg-secondary/10 py-4 px-6 border-b border-secondary/20">
              <Badge className="bg-secondary text-secondary-foreground font-bold">¡Nuestra Sugerencia!</Badge>
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <h4 className="text-3xl font-headline text-primary">{recommendation.recommendation}</h4>
                <div className="h-1 w-20 bg-secondary rounded-full" />
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground italic">
                "{recommendation.description}"
              </p>
              <div className="pt-4">
                <Button className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 w-full sm:w-auto px-8 py-6" asChild>
                  <a href={`https://wa.me/928175368?text=Hola,%20la%20IA%20me%20recomendó%20el%20pastel:%20${encodeURIComponent(recommendation.recommendation)}`} target="_blank" rel="noopener noreferrer">
                    <Sparkles className="w-4 h-4" /> Pedir este pastel ahora
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center p-12 border-2 border-dashed border-secondary/30 rounded-3xl space-y-4 bg-white/50">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cake className="w-10 h-10 text-primary opacity-50" />
            </div>
            <h4 className="text-2xl font-headline opacity-40">Esperando tus preferencias...</h4>
            <p className="text-muted-foreground opacity-60">
              Completa el formulario de la izquierda para que nuestra chef virtual te sugiera la mejor opción para tu evento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
