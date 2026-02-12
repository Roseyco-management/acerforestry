'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface ContactFormProps {
  variant?: 'inline' | 'modal'
  onSuccess?: () => void
}

export default function ContactForm({ variant = 'inline', onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    location: '',
    service_interest: '',
    woodland_area: '',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      // Prepare submission data
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        company_name: formData.company_name.trim() || undefined,
        location: formData.location.trim() || undefined,
        service_interest: formData.service_interest || undefined,
        woodland_area: formData.woodland_area ? parseFloat(formData.woodland_area) : undefined,
        message: formData.message.trim(),
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setStatus('success')

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company_name: '',
          location: '',
          service_interest: '',
          woodland_area: '',
          message: '',
        })
        setStatus('idle')
        onSuccess?.()
      }, 2000)
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form. Please try again.')
    }
  }

  const isSubmitting = status === 'submitting'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {isSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900">Thank you for your message!</h3>
            <p className="text-sm text-green-700 mt-1">
              We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Something went wrong</h3>
            <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
            placeholder="Your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
            placeholder="07123 456 789"
          />
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="company_name" className="block text-sm font-medium text-slate-700 mb-2">
            Company / Estate
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
            placeholder="Your company or estate name"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
            placeholder="Highlands, Perthshire, etc."
          />
        </div>

        {/* Service Interest */}
        <div>
          <label htmlFor="service_interest" className="block text-sm font-medium text-slate-700 mb-2">
            Service Interest
          </label>
          <select
            id="service_interest"
            name="service_interest"
            value={formData.service_interest}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
          >
            <option value="">Select a service...</option>
            <option value="Tree Planting">Tree Planting</option>
            <option value="Ground Preparation">Ground Preparation</option>
            <option value="Woodland Maintenance">Woodland Maintenance</option>
            <option value="Fencing & Protection">Fencing & Protection</option>
            <option value="Woodland Surveys">Woodland Surveys</option>
            <option value="Full Woodland Establishment">Full Woodland Establishment</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Woodland Area */}
      <div>
        <label htmlFor="woodland_area" className="block text-sm font-medium text-slate-700 mb-2">
          Woodland Area (hectares)
        </label>
        <input
          type="number"
          id="woodland_area"
          name="woodland_area"
          min="0"
          step="0.1"
          value={formData.woodland_area}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
          placeholder="e.g., 25.5"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent resize-none disabled:bg-slate-100 disabled:cursor-not-allowed"
          placeholder="Tell us about your woodland establishment needs..."
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="w-full md:w-auto px-8 py-4 bg-forest-600 text-white font-semibold rounded-lg hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Sent!
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </div>

      {/* Privacy Notice */}
      <p className="text-sm text-slate-600">
        By submitting this form, you agree to our{' '}
        <a href="/privacy" className="text-forest-600 hover:underline">
          Privacy Policy
        </a>
        . We&apos;ll only use your information to respond to your inquiry.
      </p>
    </form>
  )
}
