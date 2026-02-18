import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pandit Ji Services - Professional Hindu Priest for Puja in Delhi NCR | Wedding, Griha Pravesh, Navratri',
  description: 'Book experienced Pandit Rajesh Sharma for authentic Vedic ceremonies in Delhi NCR. 15+ years experience in wedding puja, griha pravesh, navratri, ganesh puja, naamkaran, and all Hindu rituals. Available across Delhi, Gurgaon, Noida. Call +91 9876543210',
  keywords: 'pandit booking delhi, hindu priest delhi ncr, wedding pandit, griha pravesh puja, navratri puja, pandit ji delhi, vedic ceremonies, puja services delhi, pandit in gurgaon, pandit in noida, marriage pandit, housewarming puja, ganesh puja pandit',
  authors: [{ name: 'Pandit Ji Services' }],
  openGraph: {
    title: 'Pandit Ji Services - Expert Hindu Priest for All Ceremonies in Delhi NCR',
    description: 'Experienced Pandit for wedding, griha pravesh, navratri and all Hindu pujas in Delhi NCR. Book now for authentic Vedic rituals.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Pandit Ji Services'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pandit Ji Services - Professional Puja Services Delhi NCR',
    description: 'Book experienced Pandit for authentic Hindu ceremonies. 15+ years experience. Serving Delhi NCR.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-verification-code'
  },
  alternates: {
    canonical: 'https://sacred-booking-site.preview.emergentagent.com'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ea580c" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🕉️</text></svg>" />
        
        {/* Schema.org markup for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Pandit Ji Services',
              description: 'Professional Hindu priest services for all Vedic ceremonies and pujas',
              image: 'https://images.unsplash.com/photo-1703045199207-5312874d9e54',
              '@id': 'https://sacred-booking-site.preview.emergentagent.com',
              url: 'https://sacred-booking-site.preview.emergentagent.com',
              telephone: '+919876543210',
              email: 'contact@panditjiservices.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Delhi',
                addressRegion: 'Delhi NCR',
                addressCountry: 'IN'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 28.6139,
                longitude: 77.2090
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday'
                ],
                opens: '06:00',
                closes: '21:00'
              },
              priceRange: '$$',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '500'
              },
              areaServed: [
                {
                  '@type': 'City',
                  name: 'Delhi'
                },
                {
                  '@type': 'City',
                  name: 'Gurgaon'
                },
                {
                  '@type': 'City',
                  name: 'Noida'
                },
                {
                  '@type': 'City',
                  name: 'Faridabad'
                },
                {
                  '@type': 'City',
                  name: 'Ghaziabad'
                }
              ],
              serviceType: [
                'Wedding Ceremony',
                'Griha Pravesh',
                'Navratri Puja',
                'Ganesh Puja',
                'Naamkaran Sanskar',
                'Satyanarayan Katha',
                'Vastu Shanti',
                'Hindu Rituals'
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}