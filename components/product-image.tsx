"use client";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={`max-w-full max-h-full object-contain ${className}`}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = "/placeholder.svg";
      }}
    />
  );
}
