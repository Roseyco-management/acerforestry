import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acer Forestry - Woodland Establishment Specialists | Scotland',
  description:
    'Professional tree planting and forestry contractors in Scotland. 26 years experience serving Highlands, Perthshire, and Morayshire. HSE compliant woodland establishment with high survival rates.',
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Acer Forestry</h1>
        <p className="text-lg text-gray-600">
          Professional forestry services for sustainable woodland management
        </p>
      </main>
    </div>
  )
}
