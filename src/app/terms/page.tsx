import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'

export const metadata: Metadata = {
  title: 'Terms of Service | Acer Forestry',
  description:
    'Terms of service for Acer Forestry Ltd. Review our terms and conditions for using our website and services.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white py-20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Terms of Service - Acer Forestry',
            description:
              'Terms of service for Acer Forestry Ltd. Review our terms and conditions for using our website and services.',
            url: 'https://acerforestry.co.uk/terms',
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
                name: 'Terms of Service',
                item: 'https://acerforestry.co.uk/terms',
              },
            ],
          }),
        }}
      />

      <Container>
        <div className="max-w-4xl mx-auto prose prose-slate">
          <Heading as="h1" size="xl" className="mb-8">
            Terms of Service
          </Heading>

          <p className="text-slate-600 mb-8">
            <strong>Last updated:</strong> February 2026
          </p>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              1. Acceptance of Terms
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              By accessing and using the Acer Forestry Ltd website
              (&quot;Website&quot;), you accept and agree to be bound by these
              Terms of Service (&quot;Terms&quot;). If you do not agree to
              these Terms, please do not use our Website or services.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              2. Use of Website
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              You may use this Website for lawful purposes only. You agree not
              to:
            </p>
            <ul className="list-disc pl-6 text-slate-700 mb-6">
              <li>
                Use the Website in any way that violates applicable laws or
                regulations
              </li>
              <li>
                Attempt to gain unauthorized access to any part of the Website
              </li>
              <li>
                Introduce viruses, trojans, or other malicious material
              </li>
              <li>
                Collect or harvest information about other users without their
                consent
              </li>
              <li>Interfere with the proper functioning of the Website</li>
            </ul>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              3. Services Description
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              Acer Forestry Ltd provides professional forestry services
              including tree planting, ground preparation, forest maintenance,
              and related woodland establishment services. The information on
              this Website is for general information purposes and does not
              constitute a binding offer or contract.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Specific service agreements are established through direct
              communication and formal contracts. This Website serves as an
              informational resource and contact point.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              4. Accuracy of Information
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              We strive to ensure that information on this Website is accurate
              and up-to-date. However, we make no warranties or representations
              about the accuracy, completeness, or suitability of the
              information provided.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Service descriptions, pricing, and availability are subject to
              change without notice. Always confirm details directly with Acer
              Forestry Ltd before making decisions based on Website information.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              5. Intellectual Property
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              All content on this Website, including text, graphics, logos,
              images, and software, is the property of Acer Forestry Ltd or its
              licensors and is protected by UK and international copyright laws.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              You may view and print content for personal, non-commercial use
              only. You may not reproduce, distribute, modify, or create
              derivative works without our prior written permission.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              6. Third-Party Links
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              This Website may contain links to third-party websites. These
              links are provided for your convenience only. We do not endorse or
              take responsibility for the content, privacy policies, or
              practices of third-party websites.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              7. Limitation of Liability
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              To the fullest extent permitted by law, Acer Forestry Ltd shall
              not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of this
              Website.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              We do not warrant that the Website will be uninterrupted,
              error-free, or free from viruses or other harmful components.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              8. Indemnification
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              You agree to indemnify and hold harmless Acer Forestry Ltd, its
              directors, employees, and agents from any claims, damages, losses,
              liabilities, and expenses arising from your use of the Website or
              violation of these Terms.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              9. Service Contracts
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              These Terms govern use of this Website only. Actual forestry
              services provided by Acer Forestry Ltd are governed by separate
              service agreements and contracts.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              All service contracts are subject to negotiation and mutual
              agreement. Terms and conditions specific to forestry services will
              be outlined in formal contracts.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              10. Governing Law
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              These Terms are governed by and construed in accordance with the
              laws of England and Wales. Any disputes arising from these Terms
              or use of this Website shall be subject to the exclusive
              jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              11. Changes to Terms
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              We reserve the right to modify these Terms at any time. Changes
              will be effective immediately upon posting to this Website. Your
              continued use of the Website after changes are posted constitutes
              acceptance of the modified Terms.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              We recommend reviewing these Terms periodically. The &quot;Last
              updated&quot; date at the top indicates when Terms were last
              revised.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              12. Termination
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              We reserve the right to terminate or suspend access to our Website
              immediately, without prior notice, for any reason, including
              breach of these Terms.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              13. Severability
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              If any provision of these Terms is found to be unenforceable or
              invalid, that provision shall be limited or eliminated to the
              minimum extent necessary so that these Terms shall otherwise
              remain in full force and effect.
            </p>
          </section>

          <section className="mb-12">
            <Heading as="h2" size="lg" className="mb-4">
              14. Contact Information
            </Heading>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact
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
