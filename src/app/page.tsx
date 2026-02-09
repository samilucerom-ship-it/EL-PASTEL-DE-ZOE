
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Instagram, Facebook, Smartphone, Star } from 'lucide-react';
import { RecommendationTool } from '@/components/RecommendationTool';

const WHATSAPP_NUMBER = "928175368";
const SOCIAL_HANDLE = "EL_PASTEL_DE_ZOE";

const mainCakes = [
  { id: 'pastel-1', price: '$45', rating: 4.9, reviews: 124 },
  { id: 'pastel-2', price: '$48', rating: 5.0, reviews: 89 },
  { id: 'pastel-3', price: '$42', rating: 4.8, reviews: 156 },
  { id: 'pastel-4', price: '$38', rating: 4.7, reviews: 92 },
  { id: 'pastel-5', price: '$40', rating: 4.9, reviews: 105 },
  { id: 'pastel-6', price: '$44', rating: 4.8, reviews: 78 },
  { id: 'pastel-7', price: '$52', rating: 5.0, reviews: 65 },
  { id: 'pastel-8', price: '$46', rating: 4.9, reviews: 112 },
  { id: 'pastel-9', price: '$50', rating: 4.7, reviews: 88 },
  { id: 'pastel-10', price: '$35', rating: 5.0, reviews: 95 },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-headline font-bold text-primary tracking-wider">
              EL PASTEL DE ZOE
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-headline text-lg">
            <a href="#products" className="hover:text-primary transition-colors">Postres</a>
            <a href="#recommendations" className="hover:text-primary transition-colors">Recomendaciones</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contacto</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="secondary" className="hidden sm:flex rounded-full gap-2 border-secondary" asChild>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Pedido WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[75vh] md:h-[90vh] flex items-center overflow-hidden bg-black">
          <Image 
            src="/assets/Banner.png" 
            alt="Banner El Pastel de Zoe" 
            fill 
            className="object-contain opacity-90 z-0"
            priority
          />
          {/* Dark Overlay Layer for Contrast */}
          <div className="absolute inset-0 bg-black/40 z-[1]" />
          
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center text-white">
            <div className="space-y-6 max-w-3xl">
              <Badge variant="outline" className="text-white border-white px-4 py-1 uppercase tracking-widest text-xs bg-black/30 backdrop-blur-sm">
                Hecho con Amor
              </Badge>
              <h2 className="text-5xl md:text-7xl font-headline leading-tight drop-shadow-xl text-white">
                Dulzura en cada bocado, <br />
                <span className="text-primary italic font-bold">momentos inolvidables.</span>
              </h2>
              <p className="text-xl text-white font-medium max-w-2xl mx-auto bg-black/20 backdrop-blur-md rounded-lg p-4">
                Descubre nuestra exquisita selección de pasteles artesanales diseñados para celebrar la vida.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg text-lg" asChild>
                  <a href="#products">Ver Catálogo</a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 border-white text-white hover:bg-white/10 text-lg bg-transparent" asChild>
                  <a href="#recommendations">Encuentra tu Pastel</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase - Main Section */}
        <section id="products" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-4">
                <h3 className="text-4xl font-headline">Nuestras Creaciones de Pasteles</h3>
                <p className="text-muted-foreground text-lg max-w-xl">
                  Cada pastel es una obra maestra única, elaborada con los mejores ingredientes y mucho cariño.
                </p>
              </div>
              <div className="flex gap-4">
                <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm">Artesanal</Badge>
                <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm">Gourmet</Badge>
                <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm">Premium</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainCakes.map((cake) => {
                const imageData = PlaceHolderImages.find(img => img.id === cake.id);
                return (
                  <Card key={cake.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                    <CardHeader className="p-0 relative h-72 overflow-hidden bg-muted/10">
                      {imageData && (
                        <Image 
                          src={imageData.imageUrl} 
                          alt={imageData.description} 
                          fill 
                          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                          data-ai-hint={imageData.imageHint || 'cake'}
                        />
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm">
                        <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                          <Star className="w-4 h-4 fill-current" />
                          {cake.rating}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-2xl font-headline">{imageData?.description}</CardTitle>
                        <span className="text-xl font-bold text-primary">{cake.price}</span>
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        Exquisita combinación de sabores diseñada para deleitar tu paladar. Una de nuestras opciones más queridas.
                      </p>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <span>{cake.reviews} valoraciones</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-sm gap-2" asChild>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20interesa%20el%20pastel%20${encodeURIComponent(imageData?.description || '')}`} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="w-4 h-4" />
                          Consultar por WhatsApp
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Recommender Tool */}
        <section id="recommendations" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
              <h3 className="text-4xl font-headline">¿No sabes cuál elegir?</h3>
              <p className="text-muted-foreground text-lg">
                Nuestra Inteligencia Artificial te ayudará a encontrar el pastel perfecto según tus gustos y ocasión.
              </p>
            </div>
            <RecommendationTool />
          </div>
        </section>
      </main>

      {/* Footer & Social Media */}
      <footer id="contact" className="bg-white border-t py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-headline text-primary">EL PASTEL DE ZOE</h2>
              <p className="text-muted-foreground leading-relaxed">
                Transformando momentos ordinarios en recuerdos extraordinarios a través del arte de la pastelería.
              </p>
              <div className="flex items-center gap-4 text-secondary">
                <a href="https://facebook.com" className="hover:scale-110 transition-transform">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://instagram.com" className="hover:scale-110 transition-transform">
                  <Instagram className="w-6 h-6" />
                </a>
                <span className="text-sm font-bold tracking-widest">@{SOCIAL_HANDLE}</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xl font-headline font-bold">Contáctanos</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg">928 175 368</span>
                </div>
                <p className="text-muted-foreground">
                  Estamos ubicados en el corazón de la ciudad, listos para endulzar tu día.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-headline font-bold">Suscríbete</h4>
              <p className="text-muted-foreground">Recibe ofertas exclusivas y novedades de nuestra cocina.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Tu correo" 
                  className="bg-background border rounded-full px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button className="rounded-full bg-primary text-primary-foreground px-6">OK</Button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground italic">
            &copy; {new Date().getFullYear()} Zoe's Sweet Delights. Todos los derechos reservados. @EL_PASTEL_DE_ZOE
          </div>
        </div>
      </footer>
    </div>
  );
}
