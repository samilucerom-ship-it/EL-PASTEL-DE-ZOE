
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Zoe's Sweet Delights | EL_PASTEL_DE_ZOE",
  description: 'Gourmet cakes for every special occasion. Handcrafted with love by Zoe.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Belleza&family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
