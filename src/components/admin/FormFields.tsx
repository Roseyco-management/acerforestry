'use client'

import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Base field props interface
interface BaseFieldProps {
  label: string
  error?: string
  helperText?: string
  required?: boolean
  className?: string
}

// Text Input Props
export interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    BaseFieldProps {}

/**
 * Standardized text input field with label, error handling, and validation
 */
export function TextInput({
  label,
  error,
  helperText,
  required,
  className,
  id,
  ...props
}: TextInputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('space-y-1.5', className)}>
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-white uppercase tracking-wide"
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        id={inputId}
        className={cn(
          'w-full px-4 py-2.5 border-2 rounded-lg transition-all',
          'focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'bg-forest-600 dark:bg-forest-900 text-white placeholder-white/50',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-forest-500 hover:border-forest-400'
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${inputId}-helper`} className="text-sm text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  )
}

// Textarea Props
export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseFieldProps {}

/**
 * Standardized textarea field with label, error handling, and validation
 */
export function Textarea({
  label,
  error,
  helperText,
  required,
  className,
  id,
  rows = 4,
  ...props
}: TextareaProps) {
  const textareaId = id || label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('space-y-1.5', className)}>
      <label
        htmlFor={textareaId}
        className="block text-sm font-semibold text-white uppercase tracking-wide"
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          'w-full px-4 py-2.5 border-2 rounded-lg transition-all resize-y',
          'focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'bg-forest-600 dark:bg-forest-900 text-white placeholder-white/50',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-forest-500 hover:border-forest-400'
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
        {...props}
      />
      {error && (
        <p id={`${textareaId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${textareaId}-helper`} className="text-sm text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  )
}

// Select Props
export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'>,
    BaseFieldProps {
  options: SelectOption[]
  placeholder?: string
}

/**
 * Standardized select dropdown field with label, error handling, and validation
 */
export function Select({
  label,
  error,
  helperText,
  required,
  className,
  id,
  options,
  placeholder,
  ...props
}: SelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('space-y-1.5', className)}>
      <label
        htmlFor={selectId}
        className="block text-sm font-semibold text-white uppercase tracking-wide"
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <select
        id={selectId}
        className={cn(
          'w-full px-4 py-2.5 border-2 rounded-lg transition-all',
          'focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'appearance-none bg-forest-600 dark:bg-forest-900 text-white border-forest-500',
          'bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")]',
          'bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-10',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-300 hover:border-slate-400'
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${selectId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${selectId}-helper`} className="text-sm text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  )
}

// Date Input Props
export interface DateInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>,
    BaseFieldProps {}

/**
 * Standardized date input field with label, error handling, and validation
 */
export function DateInput({
  label,
  error,
  helperText,
  required,
  className,
  id,
  ...props
}: DateInputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('space-y-1.5', className)}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={inputId}
        type="date"
        className={cn(
          'w-full px-4 py-2.5 border rounded-lg transition-all',
          'focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent',
          'disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-300 hover:border-slate-400'
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${inputId}-helper`} className="text-sm text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  )
}

// Checkbox Props
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: string
  helperText?: string
  className?: string
}

/**
 * Standardized checkbox field with label and validation
 */
export function Checkbox({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: CheckboxProps) {
  const checkboxId = id || label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-start">
        <input
          id={checkboxId}
          type="checkbox"
          className={cn(
            'mt-0.5 h-4 w-4 rounded border-slate-300 text-forest-600',
            'focus:ring-2 focus:ring-forest-600 focus:ring-offset-0',
            'transition-colors cursor-pointer',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:ring-red-500'
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined}
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className="ml-2 text-sm text-slate-700 cursor-pointer"
        >
          {label}
        </label>
      </div>
      {error && (
        <p id={`${checkboxId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${checkboxId}-helper`} className="text-sm text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  )
}

// Form Group - wrapper for grouping form fields
export interface FormGroupProps {
  children: React.ReactNode
  className?: string
}

/**
 * Container for grouping form fields with consistent spacing
 */
export function FormGroup({ children, className }: FormGroupProps) {
  return <div className={cn('space-y-4', className)}>{children}</div>
}
