import { Metadata } from 'next'
import ContactForm from '@/components/forms/ContactForm'
import Container from '@/components/ui/Container'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | Acer Forestry',
  description:
    'Get in touch with Acer Forestry for woodland establishment services in Scotland. Serving Highlands, Perthshire, and Morayshire.',
}

export default function ContactPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Acer Forestry',
            description:
              'Get in touch with Acer Forestry for woodland establishment services in Scotland.',
            url: 'https://acerforestry.co.uk/contact',
          }),
        }}
      />

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-forest text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Get In Touch
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Ready to discuss your woodland establishment project? We&apos;re here to help.
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-20 md:py-32 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-forest-600 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-forest-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                      <a
                        href="tel:07756513670"
                        className="text-forest-600 hover:underline"
                      >
                        07756 513 670
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-forest-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                      <a
                        href="mailto:dillan.hill@acerforestry.co.uk"
                        className="text-forest-600 hover:underline break-all"
                      >
                        dillan.hill@acerforestry.co.uk
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-forest-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Service Areas</h3>
                      <p className="text-slate-700">
                        Highlands, Perthshire, Morayshire, and throughout Scotland
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-forest-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Response Time</h3>
                      <p className="text-slate-700">
                        We typically respond within 24 hours on business days
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Directors */}
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Meet Our Directors</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-forest-600">Rob</p>
                    <p className="text-sm text-slate-600">Director</p>
                  </div>
                  <div>
                    <p className="font-medium text-forest-600">Dillan</p>
                    <p className="text-sm text-slate-600">Director</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700 mt-4">
                  Combined 26+ years of experience in woodland establishment
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
                <h2 className="text-2xl font-bold text-forest-600 mb-6">
                  Send Us A Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-forest text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Prefer To Talk Directly?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Give us a call and speak directly with Rob or Dillan about your project.
            </p>
            <a
              href="tel:07756513670"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent-400 text-forest-900 font-bold rounded-lg hover:bg-accent-500 transition-colors shadow-lg hover:shadow-xl"
            >
              <Phone className="w-5 h-5" />
              Call 07756 513 670
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
