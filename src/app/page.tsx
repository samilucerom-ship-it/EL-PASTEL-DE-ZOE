import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Instagram, Facebook, Smartphone, Star, ArrowRight } from 'lucide-react';
import { ImageModal } from '@/components/ImageModal';

const WHATSAPP_NUMBER = "928175368";
const SOCIAL_HANDLE = "EL_PASTEL_DE_ZOE";

const mainCakes = [
  { id: 'pastel-1', rating: 4.9, reviews: 124 },
  { id: 'pastel-2', rating: 5.0, reviews: 89 },
  { id: 'pastel-3', rating: 4.8, reviews: 156 },
  { id: 'pastel-4', rating: 4.7, reviews: 92 },
  { id: 'pastel-5', rating: 4.9, reviews: 105 },
  { id: 'pastel-6', rating: 4.8, reviews: 78 },
  { id: 'pastel-7', rating: 5.0, reviews: 65 },
  { id: 'pastel-8', rating: 4.9, reviews: 112 },
  { id: 'pastel-9', rating: 4.7, reviews: 88 },
  { id: 'pastel-10', rating: 5.0, reviews: 95 },
];

const seasonalDesserts = [
  { id: 'postre-1', rating: 4.9, reviews: 45 },
  { id: 'postre-2', rating: 4.8, reviews: 32 },
  { id: 'postre-3', rating: 4.7, reviews: 56 },
  { id: 'postre-4', rating: 4.9, reviews: 28 },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/20">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-2xl transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <h1 className="text-2xl font-headline font-bold text-primary tracking-widest transition-transform duration-300 group-hover:scale-105">
              EL PASTEL DE ZOE
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-10 font-headline text-lg tracking-wide">
            <a href="#products" className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full transition-colors">Pasteles</a>
            <a href="#more-desserts" className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full transition-colors">Postres</a>
            <a href="#contact" className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full transition-colors">Contacto</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="secondary" className="hidden sm:flex rounded-full gap-2 luxury-shadow hover:scale-105 active:scale-95 transition-all duration-300 bg-secondary" asChild>
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
        <section className="relative h-[85vh] md:h-[95vh] flex items-center overflow-hidden bg-neutral-900">
          <Image 
            src="/assets/Banner.png" 
            alt="Banner El Pastel de Zoe" 
            fill 
            className="object-cover opacity-80 scale-105 animate-pulse duration-[10000ms]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-background z-[1]" />
          
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center text-white">
            <div className="space-y-8 max-w-4xl">
              <Badge variant="outline" className="text-white border-white/50 px-6 py-1.5 uppercase tracking-[0.3em] text-xs bg-white/10 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-1000">
                Artesanía de Lujo
              </Badge>
              <h2 className="text-6xl md:text-8xl font-headline leading-none drop-shadow-2xl text-white animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
                Dulzura en cada <br />
                <span className="text-primary italic font-bold relative inline-block">
                  bocado.
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 blur-sm"></span>
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-white font-semibold max-w-2xl mx-auto bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 luxury-shadow animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 shadow-2xl">
                Transformamos ingredientes premium en momentos inolvidables para tu paladar.
              </p>
              <div className="flex flex-wrap justify-center gap-6 animate-in fade-in zoom-in duration-1000 delay-500">
                <Button size="lg" className="rounded-full px-10 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:luxury-shadow transition-all duration-300 text-lg group" asChild>
                  <a href="#products">
                    Ver Catálogo <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-50">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section id="products" className="py-32 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col items-center text-center mb-24 space-y-6">
              <span className="text-primary font-bold tracking-[0.4em] text-xs uppercase">Colección Exclusiva</span>
              <h3 className="text-5xl md:text-6xl font-headline">Nuestras Creaciones</h3>
              <div className="w-24 h-1 bg-primary rounded-full"></div>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Cada pastel es una obra maestra de diseño y sabor, elaborada a mano con pasión y los mejores ingredientes del mundo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {mainCakes.map((cake, index) => {
                const imageData = PlaceHolderImages.find(img => img.id === cake.id);
                return (
                  <Card key={cake.id} className={`group overflow-hidden border-none luxury-shadow hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] transition-all duration-700 bg-white hover:-translate-y-4 rounded-[2rem] ${index % 2 !== 0 ? 'md:mt-8' : ''}`}>
                    <CardHeader className="p-0 relative h-[550px] overflow-hidden">
                      {imageData && (
                        <ImageModal 
                          src={imageData.imageUrl} 
                          alt={imageData.description} 
                          imageHint={imageData.imageHint || 'cake'}
                          className="transition-transform duration-[2000ms] group-hover:scale-110"
                        />
                      )}
                      <div className="absolute top-6 right-6 glass-card px-3 py-1.5 rounded-full z-10 flex items-center gap-1.5 text-yellow-500 font-bold scale-90 group-hover:scale-110 transition-transform duration-500">
                        <Star className="w-4 h-4 fill-current" />
                        {cake.rating}
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-4">
                      <CardTitle className="text-2xl md:text-3xl font-headline tracking-wide group-hover:text-primary transition-colors duration-300">{imageData?.description}</CardTitle>
                      <p className="text-muted-foreground leading-relaxed italic line-clamp-2">
                        Una experiencia sensorial única que combina texturas delicadas con sabores intensos y equilibrados.
                      </p>
                      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest pt-2">
                        <span className="w-8 h-px bg-border"></span>
                        {cake.reviews} valoraciones de clientes
                      </div>
                    </CardContent>
                    <CardFooter className="p-8 pt-0">
                      <Button className="w-full rounded-full bg-secondary hover:bg-secondary/90 hover:scale-[1.02] active:scale-95 transition-all duration-300 text-secondary-foreground gap-2 py-6 text-base font-semibold border-none" asChild>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20interesa%20el%20pastel%20${encodeURIComponent(imageData?.description || '')}`} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="w-5 h-5" />
                          Consultar Disponibilidad
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Desserts Section */}
        <section id="more-desserts" className="py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-24 space-y-4">
              <span className="text-primary font-bold tracking-[0.4em] text-xs uppercase">Dulces Detalles</span>
              <h3 className="text-5xl font-headline">Postres Individuales</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic font-light">
                "Pequeños tesoros que endulzan el alma."
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {seasonalDesserts.map((dessert) => {
                const imageData = PlaceHolderImages.find(img => img.id === dessert.id);
                return (
                  <Card key={dessert.id} className="group overflow-hidden border-none shadow-sm hover:luxury-shadow transition-all duration-500 bg-white rounded-[1.5rem] hover:-translate-y-2">
                    <CardHeader className="p-0 relative h-72 overflow-hidden">
                      {imageData && (
                        <ImageModal 
                          src={imageData.imageUrl} 
                          alt={imageData.description} 
                          imageHint={imageData.imageHint || 'dessert'}
                          className="group-hover:scale-105 duration-700"
                        />
                      )}
                    </CardHeader>
                    <CardContent className="p-6 text-center">
                      <CardTitle className="text-xl font-headline mb-2 group-hover:text-primary transition-colors">{imageData?.description}</CardTitle>
                      <div className="text-yellow-500 flex justify-center gap-0.5 scale-75">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button variant="secondary" className="w-full rounded-full shadow-sm text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform" asChild>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20interesa%20el%20postre%20${encodeURIComponent(imageData?.description || '')}`} target="_blank" rel="noopener noreferrer">
                          Pedir Ahora
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-white border-t pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 items-start">
            <div className="space-y-8">
              <h2 className="text-4xl font-headline text-primary font-bold tracking-widest">EL PASTEL DE ZOE</h2>
              <p className="text-muted-foreground leading-loose text-lg font-light">
                Creando experiencias gastronómicas inolvidables a través de la alta pastelería artesanal. Calidad, diseño y amor en cada detalle.
              </p>
              <div className="flex items-center gap-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-muted p-3 rounded-full hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 luxury-shadow text-primary">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-muted p-3 rounded-full hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 luxury-shadow text-primary">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="bg-muted p-3 rounded-full hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 luxury-shadow text-primary flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                  </svg>
                </a>
                <div className="text-sm font-bold tracking-[0.2em] text-primary/70 uppercase">@{SOCIAL_HANDLE}</div>
              </div>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-2xl font-headline font-bold border-b pb-4">Contáctanos</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="bg-primary/10 p-4 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Smartphone className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">WhatsApp</p>
                    <span className="text-2xl font-headline">{WHATSAPP_NUMBER}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed font-light">
                  Haz tu pedido con anticipación para asegurar la disponibilidad. Endulzamos tus eventos más especiales.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-2xl font-headline font-bold border-b pb-4">Club Zoe</h4>
              <p className="text-muted-foreground font-light text-lg">Únete a nuestra lista exclusiva para recibir lanzamientos de temporada y promociones especiales.</p>
              <div className="flex gap-2 bg-muted p-2 rounded-full focus-within:ring-2 focus-within:ring-primary/30 transition-all">
                <input 
                  type="email" 
                  placeholder="Email exclusivo" 
                  className="bg-transparent border-none rounded-full px-6 py-3 flex-grow focus:outline-none text-sm font-light"
                />
                <Button className="rounded-full bg-primary text-primary-foreground px-8 hover:scale-105 transition-transform">ÚNETE</Button>
              </div>
            </div>
          </div>
          
          <div className="mt-24 pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground/60 font-light italic tracking-wider uppercase">
            <div>&copy; {new Date().getFullYear()} Zoe's Sweet Delights. Alta Repostería.</div>
            <div className="flex gap-8">
              <span>Lima, Perú</span>
              <span>@EL_PASTEL_DE_ZOE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
