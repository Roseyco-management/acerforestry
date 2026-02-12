# Team Management CRUD Implementation

## Overview
Complete team member management system for contractors, staff, and subcontractors with certification tracking and project assignment views.

## Files Created

### Database Layer
- **`/src/lib/db/team.ts`** - Database access functions
  - `listTeamMembers(filters)` - List with role, status, availability filters
  - `getTeamMember(id)` - Get single member
  - `createTeamMember(data)` - Create new member
  - `updateTeamMember(id, data)` - Update member
  - `deleteTeamMember(id, hard)` - Soft/hard delete
  - `getMemberProjects(memberId)` - Get assigned projects
  - `getTeamMembersWithExpiredCertifications()` - Find expired certs
  - `getTeamMemberStats()` - Team statistics

### API Routes
- **`/src/app/api/admin/team/route.ts`** - List & create endpoints
  - GET - List team members with filters
  - POST - Create team member

- **`/src/app/api/admin/team/[id]/route.ts`** - Single member CRUD
  - GET - Get member with projects
  - PUT - Update member
  - DELETE - Soft delete member

### Pages
- **`/src/app/admin/team/page.tsx`** - Team list view
  - Filterable data table (role, status, availability)
  - Stats cards (total, active, available, busy)
  - Certification tracking with expiry warnings
  - Hourly rate display
  - Searchable by name, email, phone, company

- **`/src/app/admin/team/new/page.tsx`** - Add team member
  - Complete member form
  - Dynamic certification management
  - Expiry date tracking
  - Hourly rate input
  - Availability status selection

- **`/src/app/admin/team/[id]/page.tsx`** - Edit team member
  - View assigned projects
  - Edit all member details
  - Manage certifications
  - Track performance stats
  - Soft delete option

### Database Migration
- **`/supabase/migrations/20260212_add_team_certifications_hourly_rate.sql`**
  - Added `certifications` JSONB field (array of {name, expiryDate})
  - Added `hourly_rate` DECIMAL(10,2) field
  - Created GIN index for certification queries

### Type Updates
- **`/src/lib/supabase/types.ts`** - Added new fields to TeamMember types

## Features

### Core Functionality
- Full CRUD operations for team members
- Role-based filtering (Tree Planting Contractor, Fencing Specialist, etc.)
- Status filtering (active/inactive)
- Availability tracking (available/busy/unavailable)
- Company/contractor differentiation

### Certification Management
- Add/remove certifications
- Expiry date tracking
- Visual warnings for expired certifications
- Multiple certifications per member

### Financial Tracking
- Hourly rate management
- Billing support

### Project Integration
- View assigned projects per team member
- Project role tracking
- Assignment date history
- Client information display
- Direct navigation to project details

### Performance Metrics
- Projects completed counter
- Quality rating (out of 5.00)
- Performance statistics display

### Search & Filtering
- Full-text search (name, email, phone, company)
- Multi-filter support (role + status + availability)
- Real-time filtering

## Data Structure

### Certification Object
```typescript
{
  name: string          // e.g., "Chainsaw Operator License"
  expiryDate: string   // ISO date string
}
```

### Team Member Fields
- Basic: name, role, company_name
- Contact: email, phone
- Professional: specializations, certifications, hourly_rate
- Status: is_active, availability_status
- Performance: projects_completed, quality_rating
- Metadata: notes, created_at, updated_at

## Usage

### Accessing Team Management
1. Navigate to `/admin/team`
2. View all team members with stats
3. Filter by role, status, or availability
4. Search by name, email, phone, or company
5. Click row to edit member

### Adding Team Member
1. Click "Add Team Member" button
2. Fill in basic information (name, role, company)
3. Add contact details (email, phone)
4. Set hourly rate and availability
5. Add certifications with expiry dates
6. Add notes if needed
7. Submit to create

### Editing Team Member
1. Click on member in list view
2. View assigned projects
3. Update any field
4. Add/remove certifications
5. View performance stats
6. Save changes or deactivate member

### Filtering & Search
- Role filter: Select specific role type
- Status filter: Active or inactive members
- Availability filter: Available, busy, or unavailable
- Search: Type to search across all text fields
- Filters combine for precise results

## API Response Format

### List Response
```json
{
  "success": true,
  "data": [...],
  "count": 10
}
```

### Single Member Response
```json
{
  "success": true,
  "data": {
    ...memberData,
    "projects": [...]
  }
}
```

## Integration Points

### With Projects
- Team members can be assigned to projects via project_team junction table
- View all project assignments in edit page
- Navigate to project details from team member page

### With Clients
- Projects link team members to clients
- Track which team members work with which clients

### With Dashboard
- Team stats feed into dashboard analytics
- Certification expiry warnings can trigger notifications

## Future Enhancements
- Bulk import team members from CSV
- Certification expiry email notifications
- Time tracking and billing integration
- Performance review system
- Team member availability calendar
- Skills matrix and competency tracking
