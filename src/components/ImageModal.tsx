"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface ImageModalProps {
  src: string;
  alt: string;
  imageHint?: string;
  className?: string;
}

export function ImageModal({ src, alt, imageHint, className }: ImageModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={cn("relative cursor-zoom-in w-full h-full group", className)}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={imageHint}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 text-primary px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm">
              Ver imagen completa
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] md:max-w-4xl p-0 overflow-hidden border-none bg-transparent shadow-none gap-0">
        <VisuallyHidden.Root>
          <DialogTitle>{alt}</DialogTitle>
          <DialogDescription>Vista ampliada de {alt}</DialogDescription>
        </VisuallyHidden.Root>
        <div className="relative w-full h-[85vh] flex items-center justify-center">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
