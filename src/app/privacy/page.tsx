import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'

export const metadata: Metadata = {
  title: 'Privacy Policy | Acer Forestry',
  description:
    'Privacy policy for Acer Forestry Ltd. Learn how we collect, use, and protect your personal information.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Privacy Policy - Acer Forestry',
            description:
              'Privacy policy for Acer Forestry Ltd. Learn how we collect, use, and protect your personal information.',
            url: 'https://acerforestry.co.uk/privacy',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://acerforestry.co.uk',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Privacy Policy',
                item: 'https://acerforestry.co.uk/privacy',
              },
            ],
          }),
        }}
      />

      <Container>
        <div className="max-w-4xl mx-auto prose prose-slate">
          <Heading as="h1" size="xl" className="mb-8">
            Privacy Policy
          </Heading>

          <p className="text-slate-600 mb-8">
            <strong>Last updated:</strong> February 2026
          </p>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              1. Introduction
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              Acer Forestry Ltd (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you visit our website or use our services.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              2. Information We Collect
            </Heading>
            <Heading as="h3" size="md" className="mb-3">
              Personal Information
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              When you contact us, we may collect:
            </p>
            <ul className="list-disc pl-6 text-slate-700 mb-6">
              <li>Name and contact information (email, phone number)</li>
              <li>Company name and business details</li>
              <li>Project information and requirements</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <Heading as="h3" size="md" className="mb-3">
              Automatically Collected Information
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              When you visit our website, we automatically collect:
            </p>
            <ul className="list-disc pl-6 text-slate-700 mb-6">
              <li>IP address and browser type</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website and search terms</li>
              <li>Device information and operating system</li>
            </ul>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              3. How We Use Your Information
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-slate-700 mb-6">
              <li>Respond to your inquiries and provide our services</li>
              <li>Communicate with you about projects and opportunities</li>
              <li>Improve our website and user experience</li>
              <li>Analyze website usage and trends</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              4. Analytics and Cookies
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use the following analytics services to improve our website:
            </p>
            <ul className="list-disc pl-6 text-slate-700 mb-6">
              <li>
                <strong>Google Analytics:</strong> Tracks website usage and
                visitor behavior
              </li>
              <li>
                <strong>Microsoft Clarity:</strong> Records user sessions to
                improve user experience
              </li>
              <li>
                <strong>Meta Pixel:</strong> Tracks conversions and website
                activity
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">
              You can opt out of these services through your browser settings or
              by using browser extensions that block tracking.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              5. Information Sharing
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third
              parties. We may share information with:
            </p>
            <ul className="list-disc pl-6 text-slate-700 mb-6">
              <li>Service providers who assist in operating our website</li>
              <li>Analytics providers (as listed above)</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              6. Data Security
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security
              measures to protect your personal information. However, no method
              of transmission over the internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              7. Your Rights
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              Under UK data protection law, you have the right to:
            </p>
            <ul className="list-disc pl-6 text-slate-700 mb-6">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Request data portability</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">
              To exercise these rights, contact us at
              dillan.hill@acerforestry.co.uk
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              8. Data Retention
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              We retain your personal information only for as long as necessary
              to fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required by law.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              9. Changes to This Policy
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              10. Contact Us
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please contact
              us:
            </p>
            <div className="bg-slate-50 p-6 rounded-lg">
              <p className="text-slate-700 mb-2">
                <strong>Acer Forestry Ltd</strong>
              </p>
              <p className="text-slate-700 mb-2">
                Email: dillan.hill@acerforestry.co.uk
              </p>
              <p className="text-slate-700">Phone: 07756 513 670</p>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
