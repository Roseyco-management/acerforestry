# Admin Components - Quick Reference

## Import Syntax

```tsx
import {
  // Data Display
  DataTable,

  // Forms
  TextInput,
  Textarea,
  Select,
  DateInput,
  Checkbox,
  FormGroup,

  // Dashboard
  DashboardCard,
  DashboardCardGrid,
  StatsWidget,
  InlineStat,

  // Modals
  Modal,
  ConfirmModal,

  // Media
  PhotoGallery,
  PhotoUploader,
} from '@/components/admin'

// Icons
import { Users, Mail, Calendar } from 'lucide-react'
```

---

## DataTable - Quick Start

```tsx
const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (item) => <Badge>{item.status}</Badge>,
  },
]

<DataTable
  data={items}
  columns={columns}
  pageSize={10}
  searchable
/>
```

---

## Forms - Quick Start

```tsx
<FormGroup>
  <TextInput
    label="Name"
    required
    error={errors.name?.message}
    {...register('name')}
  />

  <Select
    label="Type"
    options={[
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ]}
    {...register('type')}
  />

  <Textarea
    label="Notes"
    rows={4}
    {...register('notes')}
  />

  <DateInput
    label="Start Date"
    {...register('startDate')}
  />

  <Checkbox
    label="I agree"
    {...register('agree')}
  />
</FormGroup>
```

---

## Dashboard Cards - Quick Start

```tsx
<DashboardCardGrid columns={4}>
  <DashboardCard
    title="Total Users"
    value={42}
    icon={Users}
    iconColor="text-forest-600"
    iconBgColor="bg-forest-50"
    trend={{ value: 12, isPositive: true }}
  />
</DashboardCardGrid>
```

---

## Stats Widget - Quick Start

```tsx
<StatsWidget
  title="Overview"
  stats={[
    {
      label: 'Total',
      value: 100,
      icon: Users,
      iconColor: 'text-forest-600',
    },
  ]}
  variant="default" // or "compact" or "detailed"
/>
```

---

## Modal - Quick Start

```tsx
const [isOpen, setIsOpen] = useState(false)

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit Item"
  size="md"
  footer={
    <>
      <button onClick={() => setIsOpen(false)}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </>
  }
>
  <FormGroup>
    {/* Form fields here */}
  </FormGroup>
</Modal>

// Confirmation
<ConfirmModal
  isOpen={confirmOpen}
  onClose={() => setConfirmOpen(false)}
  onConfirm={handleDelete}
  title="Delete Item"
  message="Are you sure?"
  confirmVariant="danger"
/>
```

---

## Photo Gallery - Quick Start

```tsx
const photos = [
  { id: '1', src: '/img.jpg', title: 'Photo 1' },
]

<PhotoGallery
  photos={photos}
  columns={4}
  gap="md"
  aspectRatio="square"
  onPhotoDelete={(photo) => handleDelete(photo)}
/>

<PhotoUploader
  onUpload={(files) => handleUpload(files)}
  maxFiles={10}
/>
```

---

## Common Patterns

### With react-hook-form

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

const { register, formState: { errors }, handleSubmit } = useForm({
  resolver: zodResolver(schema),
})

<TextInput
  label="Name"
  error={errors.name?.message}
  {...register('name')}
/>
```

### Custom Table Cell

```tsx
{
  key: 'status',
  header: 'Status',
  render: (item) => (
    <span className={
      item.status === 'active'
        ? 'text-green-600'
        : 'text-slate-500'
    }>
      {item.status}
    </span>
  ),
}
```

### Conditional Rendering

```tsx
<DashboardCard
  title="Messages"
  value={unreadCount}
  icon={Mail}
  iconColor={unreadCount > 0 ? 'text-red-600' : 'text-slate-600'}
  iconBgColor={unreadCount > 0 ? 'bg-red-50' : 'bg-slate-50'}
/>
```

---

## Color Reference

```tsx
// Primary (Forest Green)
iconColor="text-forest-600"
iconBgColor="bg-forest-50"

// Info (Blue)
iconColor="text-blue-600"
iconBgColor="bg-blue-50"

// Warning (Amber)
iconColor="text-amber-600"
iconBgColor="bg-amber-50"

// Danger (Red)
iconColor="text-red-600"
iconBgColor="bg-red-50"

// Success (Green)
iconColor="text-green-600"
iconBgColor="bg-green-50"

// Neutral (Slate)
iconColor="text-slate-600"
iconBgColor="bg-slate-50"
```

---

## Size Reference

### Modal Sizes
- `sm` - Max width 28rem (448px)
- `md` - Max width 32rem (512px) - Default
- `lg` - Max width 42rem (672px)
- `xl` - Max width 56rem (896px)
- `full` - Full width with margin

### Dashboard Grid Columns
- `1` - Single column
- `2` - 2 columns on md+
- `3` - 2 on md, 3 on lg+
- `4` - 2 on md, 4 on lg+ - Default

### Photo Gallery Columns
- `2` - 2 columns on sm+
- `3` - 2 on sm, 3 on lg+
- `4` - 2 on sm, 3 on lg, 4 on xl+ - Default
- `5` - 2 base, 3 on sm, 4 on lg, 5 on xl+

---

## Accessibility Tips

1. **Always provide labels** for form fields
2. **Use semantic HTML** - buttons for actions, links for navigation
3. **Add ARIA labels** for icon-only buttons
4. **Test keyboard navigation** - Tab, Enter, Escape
5. **Ensure color contrast** - Use provided color combinations
6. **Provide error messages** - Clear, actionable feedback

---

## Performance Tips

1. **Memoize large datasets** before passing to DataTable
2. **Use pagination** for lists over 100 items
3. **Lazy load images** in PhotoGallery
4. **Debounce search** in DataTable for live APIs
5. **Optimize re-renders** with React.memo if needed

---

## Common Issues

### Form validation not working
- Install: `npm install react-hook-form zod @hookform/resolvers`
- Import zodResolver: `import { zodResolver } from '@hookform/resolvers/zod'`

### Icons not showing
- Install: `npm install lucide-react`
- Import icons: `import { IconName } from 'lucide-react'`

### Table not sorting
- Ensure `sortable: true` in column definition
- Check data type consistency in column values

### Modal not closing
- Verify `isOpen` state is properly managed
- Check `onClose` handler updates state

---

## Need Help?

- See `README.md` for comprehensive documentation
- See `EXAMPLES.tsx` for working code examples
- See `ADMIN_COMPONENTS_SUMMARY.md` for implementation details
