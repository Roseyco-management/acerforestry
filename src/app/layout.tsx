import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import MainLayout from '@/components/layout/MainLayout'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://acerforestry.co.uk'),
  title: {
    default: 'Acer Forestry - Woodland Establishment Specialists | Scotland',
    template: '%s | Acer Forestry',
  },
  description:
    'Professional woodland establishment contractors serving Highlands, Perthshire, and Morayshire. HSE compliant tree planting with 26 years experience.',
  keywords: [
    'woodland establishment',
    'tree planting Scotland',
    'forestry contractors',
    'HSE compliant',
    'Highlands',
    'Perthshire',
    'Morayshire',
    'silviculture',
  ],
  authors: [{ name: 'Acer Forestry Ltd' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Acer Forestry',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Acer Forestry - Professional Woodland Establishment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <MainLayout>{children}</MainLayout>

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T8D6192HYW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T8D6192HYW');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vctdn13vdm");
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2129581217798932');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2129581217798932&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Acer Forestry Ltd',
              description:
                'Professional woodland establishment and forestry services',
              url: 'https://acerforestry.co.uk',
              telephone: '+44-7756-513670',
              email: 'dillan.hill@acerforestry.co.uk',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'GB',
                addressRegion: 'Scotland',
              },
              areaServed: ['Highlands', 'Perthshire', 'Morayshire'],
              serviceType: [
                'Woodland Establishment',
                'Tree Planting',
                'Ground Preparation',
                'Fertilising',
                'Forest Maintenance',
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
