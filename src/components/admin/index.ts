// Admin UI Components - Reusable components for the admin panel

// Data Display
export { default as DataTable } from './DataTable'
export type { DataTableProps, Column } from './DataTable'

// Forms
export {
  TextInput,
  Textarea,
  Select,
  DateInput,
  Checkbox,
  FormGroup,
} from './FormFields'
export type {
  TextInputProps,
  TextareaProps,
  SelectProps,
  SelectOption,
  DateInputProps,
  CheckboxProps,
  FormGroupProps,
} from './FormFields'

// Dashboard
export { default as DashboardCard, DashboardCardGrid } from './DashboardCard'
export type { DashboardCardProps, DashboardCardGridProps } from './DashboardCard'

export { default as StatsWidget, InlineStat } from './StatsWidget'
export type { StatsWidgetProps, StatItem, InlineStatProps } from './StatsWidget'

// Modals
export { default as Modal, ConfirmModal } from './Modal'
export type { ModalProps, ConfirmModalProps } from './Modal'

// Media
export { default as PhotoGallery, PhotoUploader } from './PhotoGallery'
export type { PhotoGalleryProps, Photo, PhotoUploaderProps } from './PhotoGallery'
