import { cn } from '@/lib/utils'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'

export interface ValueProp {
  title: string
  description: string
  icon?: string
}

export interface ValuePropsProps {
  values: ValueProp[]
  columns?: 2 | 3
  className?: string
}

/**
 * Grid of value proposition cards
 * Responsive layout: 1 column mobile, 2-3 columns desktop
 */
export default function ValueProps({
  values,
  columns = 3,
  className,
}: ValuePropsProps) {
  const gridCols = columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'

  return (
    <div className={cn('grid grid-cols-1 gap-6 md:gap-8', gridCols, className)}>
      {values.map((value, index) => (
        <Card key={index}>
          {value.icon && (
            <div className="text-4xl mb-4" role="img" aria-label={value.title}>
              {value.icon}
            </div>
          )}
          <Heading as="h3" size="sm" className="mb-3">
            {value.title}
          </Heading>
          <p className="text-slate leading-relaxed">{value.description}</p>
        </Card>
      ))}
    </div>
  )
}
