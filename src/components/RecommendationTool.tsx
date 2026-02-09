
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cakeRecommendation, type CakeRecommendationOutput } from '@/ai/flows/cake-recommendation';
import { Sparkles, Loader2, Cake, Heart, Utensils, MessageCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

export function RecommendationTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CakeRecommendationOutput | null>(null);
  
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
      setResult(result);
    } catch (error) {
      console.error("Failed to get recommendation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-5 gap-8 items-start">
      <Card className="lg:col-span-2 border-none shadow-xl bg-primary/5">
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
              <Label className="flex items-center gap-2 text-foreground font-bold">
                <Heart className="w-4 h-4 text-primary" /> Restricciones Dietéticas
              </Label>
              <Input 
                placeholder="Ej. Vegano, Sin Gluten, Ninguna..." 
                value={formData.dietaryRestrictions}
                onChange={(e) => setFormData({...formData, dietaryRestrictions: e.target.value})}
                className="rounded-xl border-secondary/20 bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground font-bold">
                <Utensils className="w-4 h-4 text-primary" /> Sabores Favoritos
              </Label>
              <Input 
                placeholder="Ej. Chocolate belga, Frutas del bosque..." 
                value={formData.favoriteFlavors}
                onChange={(e) => setFormData({...formData, favoriteFlavors: e.target.value})}
                className="rounded-xl border-secondary/20 bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground font-bold">
                <Cake className="w-4 h-4 text-primary" /> Ocasión Especial
              </Label>
              <Select 
                value={formData.occasion}
                onValueChange={(val) => setFormData({...formData, occasion: val})}
              >
                <SelectTrigger className="rounded-xl border-secondary/20 bg-white">
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
              className="w-full rounded-full bg-primary hover:bg-primary/90 py-6 text-lg shadow-md transition-all active:scale-95 text-white"
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

      <div className="lg:col-span-3 h-full">
        {result ? (
          <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {result.suggestions.map((suggestion, index) => {
              const imageData = PlaceHolderImages.find(img => img.id === suggestion.id);
              return (
                <Card key={suggestion.id} className="group overflow-hidden border-2 border-secondary/10 shadow-lg bg-white flex flex-col md:flex-row">
                  <div className="relative w-full md:w-48 h-48 bg-muted/5 flex-shrink-0">
                    {imageData && (
                      <Image 
                        src={imageData.imageUrl} 
                        alt={imageData.description}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                    {index === 0 && (
                      <div className="absolute top-2 left-2 z-10">
                        <Badge className="bg-primary text-white">Top Pick ✨</Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow p-6 flex flex-col justify-between">
                    <div>
                      <h4 className="text-2xl font-headline text-primary mb-2">{suggestion.recommendation}</h4>
                      <p className="text-muted-foreground leading-relaxed italic">
                        "{suggestion.description}"
                      </p>
                    </div>
                    <div className="mt-4">
                      <Button variant="secondary" className="rounded-full gap-2 text-sm h-9" asChild>
                        <a href={`https://wa.me/928175368?text=Hola,%20la%20IA%20me%20recomendó%20el%20pastel:%20${encodeURIComponent(suggestion.recommendation)}`} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="w-4 h-4" /> Consultar disponibilidad
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-secondary/30 rounded-3xl space-y-6 bg-white/50">
            <div className="grid grid-cols-2 gap-4 opacity-20 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-16 bg-primary/20 rounded-2xl rotate-12 flex items-center justify-center">
                  <Cake className="w-8 h-8 text-primary" />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-headline text-foreground/60">¿Buscas algo especial?</h4>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Completa el formulario y nuestra Chef Virtual buscará en nuestro catálogo las mejores opciones para tu celebración.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
