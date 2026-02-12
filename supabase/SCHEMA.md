# Acer Forestry Database Schema

This document provides a visual overview of the database structure and relationships.

## Entity Relationship Diagram

```
┌─────────────────┐
│     users       │
│─────────────────│
│ id (PK)         │
│ email           │
│ full_name       │
│ role            │◄────────────┐
│ is_active       │             │
│ created_at      │             │
│ updated_at      │             │
└─────────────────┘             │
                                │
                                │ assigned_to
                                │
┌─────────────────┐             │
│    clients      │             │
│─────────────────│             │
│ id (PK)         │             │
│ company_name    │             │
│ contact_name    │             │
│ email           │             │
│ phone           │             │
│ address         │             │
│ postcode        │             │
│ county          │             │
│ total_woodland  │             │
│ status          │             │
│ notes           │             │
│ created_at      │             │
│ updated_at      │             │
└────────┬────────┘             │
         │                      │
         │ 1:N                  │
         │                      │
         ▼                      │
┌─────────────────┐             │
│    projects     │             │
│─────────────────│             │
│ id (PK)         │             │
│ client_id (FK)  │             │
│ project_name    │             │
│ location        │             │
│ area_hectares   │             │
│ planting_year   │             │
│ tree_species[]  │             │
│ grant_scheme    │             │
│ status          │             │
│ start_date      │             │
│ completion_date │             │
│ total_cost      │             │
│ grant_amount    │             │
│ description     │             │
│ notes           │             │
│ created_at      │             │
│ updated_at      │             │
└────┬───────┬────┘             │
     │       │                  │
     │ 1:N   │ N:M              │
     │       │                  │
     ▼       └──────────┐       │
┌─────────────────┐     │       │
│ project_photos  │     │       │
│─────────────────│     │       │
│ id (PK)         │     │       │
│ project_id (FK) │     │       │
│ storage_path    │     │       │
│ file_name       │     │       │
│ file_size       │     │       │
│ mime_type       │     │       │
│ title           │     │       │
│ description     │     │       │
│ photo_date      │     │       │
│ photo_type      │     │       │
│ is_featured     │     │       │
│ display_order   │     │       │
│ created_at      │     │       │
│ updated_at      │     │       │
└─────────────────┘     │       │
                        │       │
                        ▼       │
              ┌─────────────────┐
              │  project_team   │
              │─────────────────│
              │ id (PK)         │
              │ project_id (FK) │
              │ team_member_id  │
              │ role_on_project │
              │ assigned_date   │
              │ created_at      │
              └────────┬────────┘
                       │
                       │ N:1
                       │
                       ▼
              ┌─────────────────┐
              │  team_members   │
              │─────────────────│
              │ id (PK)         │
              │ name            │
              │ role            │
              │ company_name    │
              │ email           │
              │ phone           │
              │ specializations │
              │ is_active       │
              │ availability    │
              │ projects_done   │
              │ quality_rating  │
              │ notes           │
              │ created_at      │
              │ updated_at      │
              └─────────────────┘


┌─────────────────────┐         ┌─────────────────────┐
│ website_content     │         │ contact_submissions │
│─────────────────────│         │─────────────────────│
│ id (PK)             │         │ id (PK)             │
│ content_key (UNIQUE)│         │ name                │
│ content_type        │         │ email               │
│ content_value       │         │ phone               │
│ page                │         │ company_name        │
│ section             │         │ message             │
│ description         │         │ service_interest    │
│ is_published        │         │ woodland_area       │
│ created_at          │         │ location            │
│ updated_at          │         │ status              │
└─────────────────────┘         │ assigned_to (FK)────┼────┐
                                │ notes               │    │
                                │ follow_up_date      │    │
                                │ source              │    │
                                │ created_at          │    │
                                │ updated_at          │    │
                                └─────────────────────┘    │
                                                           │
                                                           │
┌─────────────────────┐                                   │
│   activity_log      │                                   │
│─────────────────────│                                   │
│ id (PK)             │                                   │
│ user_id (FK)        │◄──────────────────────────────────┘
│ action              │
│ entity_type         │
│ entity_id           │
│ description         │
│ changes (JSONB)     │
│ ip_address          │
│ user_agent          │
│ created_at          │
└─────────────────────┘
```

## Table Descriptions

### Core Tables

#### users
Admin user accounts with role-based access control.
- **Roles**: admin, manager, viewer
- **Purpose**: Authentication and authorization for the admin system

#### clients
Forest managers and woodland owners who are customers.
- **Status**: active, inactive, prospect
- **Purpose**: Contact and project management

#### projects
Woodland establishment and management projects.
- **Status**: planning, in_progress, planting, maintenance, completed, on_hold
- **Purpose**: Track all project details, costs, timelines, and progress

#### team_members
Subcontractors, staff, and service providers.
- **Purpose**: Manage workforce and assign to projects

#### project_team
Junction table linking team members to projects.
- **Purpose**: Many-to-many relationship between projects and team members

### Supporting Tables

#### project_photos
Photo library for project documentation.
- **Photo Types**: before, during, after, progress, other
- **Purpose**: Visual documentation and portfolio building

#### website_content
CMS for managing website content.
- **Content Types**: text, html, markdown, image_url, json
- **Purpose**: Allow admins to update website content without code changes

#### contact_submissions
Lead management from website contact forms.
- **Status**: new, contacted, qualified, converted, closed, spam
- **Purpose**: Track and follow up on potential clients

#### activity_log
Audit trail of all admin actions.
- **Purpose**: Security, compliance, and debugging

## Key Relationships

1. **Client → Projects** (1:N)
   - One client can have multiple projects
   - Projects cannot exist without a client

2. **Project → Photos** (1:N)
   - Each project can have multiple photos
   - Photos are deleted if project is deleted (CASCADE)

3. **Project ↔ Team Members** (N:M)
   - Projects can have multiple team members
   - Team members can work on multiple projects
   - Linked via `project_team` junction table

4. **User → Contact Submissions** (1:N)
   - Contact submissions can be assigned to users for follow-up

5. **User → Activity Log** (1:N)
   - All user actions are logged for audit trail

## Indexes

Performance indexes are created on:
- All foreign keys
- Frequently queried columns (status, role, email, etc.)
- Date columns used for sorting and filtering
- Text columns used for searching

## Security

### Row-Level Security (RLS)
All tables have RLS enabled with policies that:
- Require authentication for all operations
- Restrict admin-only operations to users with 'admin' role
- Allow read access to authenticated users
- Control write access based on role

### Storage Security
- **project-photos**: Private bucket, authenticated access only
- **website-images**: Public bucket for website assets

## Data Types

### Arrays
- `tree_species[]`: List of tree species planted
- `specializations[]`: Team member skills and services

### JSONB
- `changes`: Stores before/after values in activity log

### Enumerations (CHECK constraints)
- User roles: admin, manager, viewer
- Client status: active, inactive, prospect
- Project status: planning, in_progress, planting, maintenance, completed, on_hold
- Photo types: before, during, after, progress, other
- Content types: text, html, markdown, image_url, json
- Contact status: new, contacted, qualified, converted, closed, spam

## Triggers

### Automatic Timestamp Updates
`updated_at` columns are automatically updated via triggers on:
- users
- clients
- projects
- team_members
- project_photos
- website_content
- contact_submissions

## Views

### project_photos_with_details
Convenient view that joins project photos with project and client information.

## Best Practices

1. **Always use transactions** for multi-table operations
2. **Log activity** for important actions (create, update, delete)
3. **Validate data** before insertion
4. **Use prepared statements** to prevent SQL injection
5. **Index wisely** - balance query performance with write overhead
6. **Archive old data** - especially activity_log after 90 days
7. **Regular backups** - use Supabase's built-in backup features
8. **Monitor performance** - check slow queries in Supabase dashboard

## Common Query Patterns

See `queries-reference.sql` for examples of:
- CRUD operations for all tables
- Complex joins for reporting
- Aggregation queries for dashboard statistics
- Full-text search patterns
- Date range queries
- Status filtering

## Migration Strategy

1. Initial schema: `20260212_initial_schema.sql`
2. Future migrations: Create new dated SQL files
3. Always test migrations in development first
4. Use transactions for complex migrations
5. Keep migrations in version control

## Scaling Considerations

For future growth:
- Consider partitioning `activity_log` by date
- Add materialized views for complex reporting queries
- Implement caching layer for frequently accessed data
- Use Supabase's connection pooling for high traffic
- Consider archiving old projects to separate tables
