import NextImage, { ImageProps } from 'next/image'

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder'> {
  fallback?: string
}

export default function Image({ fallback, ...props }: OptimizedImageProps) {
  return (
    <NextImage
      {...props}
      placeholder="blur"
      blurDataURL={fallback || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=='}
      loading="lazy"
      quality={85}
    />
  )
}
