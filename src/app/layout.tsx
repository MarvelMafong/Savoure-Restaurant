import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Savoure — Where the World Sits at One Table',
  description: 'Global fusion fine dining in the heart of Tribeca, New York. Reservations at 142 West Ember Lane.',
  keywords: 'fine dining, global fusion, New York, Tribeca, tasting menu, restaurant',
  openGraph: {
    title: 'Savoure NYC',
    description: 'Where the world sits at one table.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}