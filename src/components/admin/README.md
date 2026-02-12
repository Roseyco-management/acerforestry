# Admin UI Components

Reusable, fully-typed React components for the Acer Forestry admin panel. All components are built with TypeScript, styled with TailwindCSS using the Acer Forestry brand colors, and designed to be accessible and responsive.

## Installation

These components require the following dependencies:

```bash
npm install react-hook-form zod @hookform/resolvers lucide-react
```

## Components

### DataTable

A powerful data table component with sorting, pagination, and search functionality.

```tsx
import { DataTable, Column } from '@/components/admin'

interface Client {
  id: string
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive'
}

const columns: Column<Client>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'phone', header: 'Phone' },
  {
    key: 'status',
    header: 'Status',
    render: (client) => (
      <span className={client.status === 'active' ? 'text-green-600' : 'text-slate-500'}>
        {client.status}
      </span>
    ),
  },
]

<DataTable
  data={clients}
  columns={columns}
  pageSize={10}
  searchable
  searchPlaceholder="Search clients..."
  onRowClick={(client) => console.log(client)}
/>
```

**Props:**
- `data` - Array of data items
- `columns` - Column definitions with optional custom renderers
- `pageSize` - Items per page (default: 10)
- `searchable` - Enable search functionality (default: true)
- `onRowClick` - Callback when row is clicked

### Form Fields

Standardized form inputs with validation support.

```tsx
import { TextInput, Textarea, Select, DateInput, Checkbox, FormGroup } from '@/components/admin'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive']),
  startDate: z.string(),
  terms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
})

function MyForm() {
  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <FormGroup>
        <TextInput
          label="Full Name"
          required
          error={errors.name?.message}
          {...register('name')}
        />

        <TextInput
          label="Email Address"
          type="email"
          required
          error={errors.email?.message}
          helperText="We'll never share your email"
          {...register('email')}
        />

        <Textarea
          label="Description"
          rows={4}
          error={errors.description?.message}
          {...register('description')}
        />

        <Select
          label="Status"
          required
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ]}
          error={errors.status?.message}
          {...register('status')}
        />

        <DateInput
          label="Start Date"
          required
          error={errors.startDate?.message}
          {...register('startDate')}
        />

        <Checkbox
          label="I accept the terms and conditions"
          error={errors.terms?.message}
          {...register('terms')}
        />
      </FormGroup>
    </form>
  )
}
```

**Available Components:**
- `TextInput` - Standard text input with label and validation
- `Textarea` - Multi-line text input
- `Select` - Dropdown select with options
- `DateInput` - Date picker input
- `Checkbox` - Checkbox with label
- `FormGroup` - Container for consistent form field spacing

### DashboardCard

Metric cards for displaying statistics and KPIs.

```tsx
import { DashboardCard, DashboardCardGrid } from '@/components/admin'
import { Users, FolderOpen, Image, Mail } from 'lucide-react'

<DashboardCardGrid columns={4}>
  <DashboardCard
    title="Total Clients"
    value={42}
    description="Active clients"
    icon={Users}
    iconColor="text-forest-600"
    iconBgColor="bg-forest-50"
    trend={{ value: 12, isPositive: true, label: 'vs last month' }}
  />

  <DashboardCard
    title="Active Projects"
    value={15}
    icon={FolderOpen}
    iconColor="text-blue-600"
    iconBgColor="bg-blue-50"
  />

  <DashboardCard
    title="Photos Uploaded"
    value="1,234"
    icon={Image}
    iconColor="text-amber-600"
    iconBgColor="bg-amber-50"
    onClick={() => console.log('Navigate to photos')}
  />

  <DashboardCard
    title="Messages"
    value={8}
    description="Unread messages"
    icon={Mail}
    iconColor="text-red-600"
    iconBgColor="bg-red-50"
  />
</DashboardCardGrid>
```

**Props:**
- `title` - Card title
- `value` - Main metric value
- `description` - Optional description text
- `icon` - Lucide icon component
- `iconColor` - Icon color class
- `iconBgColor` - Icon background color class
- `trend` - Optional trend indicator with percentage
- `onClick` - Makes card clickable

### StatsWidget

Versatile metrics display widget with multiple variants.

```tsx
import { StatsWidget } from '@/components/admin'
import { Users, Calendar, MapPin } from 'lucide-react'

const stats = [
  {
    label: 'Team Members',
    value: 12,
    icon: Users,
    iconColor: 'text-forest-600',
    change: { value: 3, isPositive: true },
  },
  {
    label: 'Scheduled Visits',
    value: 28,
    icon: Calendar,
    iconColor: 'text-blue-600',
  },
  {
    label: 'Locations',
    value: 5,
    icon: MapPin,
    iconColor: 'text-amber-600',
  },
]

// Default variant (grid layout)
<StatsWidget title="Team Overview" stats={stats} />

// Compact variant (list layout)
<StatsWidget stats={stats} variant="compact" />

// Detailed variant (with more spacing)
<StatsWidget title="Detailed Stats" stats={stats} variant="detailed" />
```

**Variants:**
- `default` - Grid layout with icons and values
- `compact` - Compact list layout for sidebars
- `detailed` - Detailed layout with trend indicators

### Modal

Accessible modal dialog for confirmations, forms, and content.

```tsx
import { Modal, ConfirmModal } from '@/components/admin'
import { useState } from 'react'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  return (
    <>
      {/* Standard Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Client"
        description="Update client information"
        size="lg"
        footer={
          <>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button onClick={handleSave}>Save Changes</button>
          </>
        }
      >
        {/* Form content here */}
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Client"
        message="Are you sure you want to delete this client? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
      />
    </>
  )
}
```

**Props:**
- `isOpen` - Control modal visibility
- `onClose` - Close callback
- `title` - Modal title
- `description` - Optional description
- `size` - Modal size: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `footer` - Optional footer content
- `closeOnOverlayClick` - Close when clicking outside (default: true)
- `closeOnEscape` - Close on ESC key (default: true)

### PhotoGallery

Grid photo viewer with lightbox functionality.

```tsx
import { PhotoGallery, PhotoUploader, Photo } from '@/components/admin'

const photos: Photo[] = [
  {
    id: '1',
    src: '/images/project-1.jpg',
    title: 'Forest Assessment',
    description: 'Initial site survey',
  },
  {
    id: '2',
    src: '/images/project-2.jpg',
    title: 'Tree Marking',
    description: 'Marked trees for harvest',
  },
]

<PhotoGallery
  photos={photos}
  columns={4}
  gap="md"
  aspectRatio="square"
  showOverlay
  onPhotoDelete={(photo) => handleDelete(photo)}
/>

<PhotoUploader
  onUpload={(files) => handleUpload(files)}
  maxFiles={10}
  maxSizeMB={5}
/>
```

**Props:**
- `photos` - Array of photo objects
- `columns` - Grid columns: 2 | 3 | 4 | 5
- `gap` - Spacing between items
- `aspectRatio` - Image aspect ratio
- `showOverlay` - Show hover overlay with info
- `onPhotoClick` - Custom click handler
- `onPhotoDelete` - Enable delete functionality

## Design System

All components use the Acer Forestry brand colors:

- **Forest Green**: Primary color (`forest-600`)
- **Slate**: Neutral grays (`slate-*`)
- **Accent Green**: Highlights (`accent-*`)
- **Bronze**: Premium accents (`bronze-*`)

## Accessibility

All components follow accessibility best practices:

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader friendly

## TypeScript

All components are fully typed with TypeScript for type safety and better developer experience. Use the exported types for props and data structures.
