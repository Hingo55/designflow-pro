# Detailed Project Page Specification

## Overview
This document outlines the complete design and development plan for the detailed project page that allows users to view and manage individual projects and their associated models within the Design4 framework.

## Design Specification

### Overall Layout Structure
Following the existing site pattern with **SidebarProvider** containing:
- Left **Sidebar** (floating, hidden on mobile)
- Right **SidebarInset** with main content

### Sidebar Design

#### Header Section:
- Project icon + "Project Details"
- Brief description of project management capabilities

#### Navigation Groups:
1. **Quick Actions**
   - Edit Project
   - Export Project Report
   - Archive Project

2. **Filter Models**
   - By Phase (Discover, Define, Develop, Deliver)
   - By Status (Not Started, Initial, Drafted, Final)
   - Show All

3. **Navigate**
   - Back to Projects
   - Add New Model

### Main Content Area

#### 1. Breadcrumb Navigation
`Home / Resources / Projects / [Project Name]`

#### 2. Project Header Section
**Left Column:**
- **Project Name** (large, bold)
- **Short Description** (existing tile description)
- **Phase Badge** with icon and color

**Right Column:**
- **Overall Progress Bar** (calculated from model statuses)
- **Progress Percentage** (e.g., "47% Complete")
- **Last Modified** timestamp

#### 3. Project Metadata Cards Row
Four cards displaying:
- **Company/Organization** field (editable)
- **Total Models** count
- **Active Phase** (most common phase among models)
- **Project Status** (Active/Planning/Completed)

#### 4. Detailed Description Section
- **Expandable text area** for longer project description
- **Edit mode** toggle for inline editing

#### 5. Planning Notes Section
- **Rich text editor** for project planning notes
- **Collapsible section** to save space when not needed

#### 6. Models Table (Primary Focus)
**Table Structure:**
- **Model Name** (left-aligned, clickable link to model detail)
- **Phase** (badge with phase-specific colors):
  - Discover: Gold background (`design4-gold`)
  - Define: Purple background (`design4-purple`)
  - Develop: Green background (`design4-green`)
  - Deliver: Orange background (`design4-orange`)
- **Status** (dropdown selector):
  - Not Started (0%)
  - Initial (25%)
  - Drafted (50%)
  - Review (75%)
  - Final (100%)
- **Model Notes** (truncated with expand option)
- **Last Modified**
- **Actions** (Edit, Delete, Duplicate)

**Table Features:**
- **Sortable** by phase (default), name, status, date
- **Phase grouping** with colored section headers
- **Row hover effects** with phase-appropriate accent colors
- **Empty state** with "Add First Model" call-to-action

### Progress Calculation System
- Not Started = 0%
- Initial = 25%
- Drafted = 50%
- Review = 75%
- Final = 100%

**Formula:** `(Sum of all model status percentages) / (Total models * 100) * 100`

### Color System Integration
- **Discover models:** Gold accents, borders, hover states
- **Define models:** Purple accents, borders, hover states
- **Develop models:** Green accents, borders, hover states
- **Deliver models:** Orange accents, borders, hover states
- **Overall project:** Uses dominant phase color or neutral

### Responsive Considerations
- **Mobile:** Stack metadata cards, hide sidebar, simplify table to cards
- **Tablet:** Maintain table but reduce columns
- **Desktop:** Full layout as described

## Functionality Specification

### Dual Model Creation Workflow

#### Existing Flow (Continues as-is):
- User goes to `/resources/tools/outcomes-model-tool`
- Creates model directly in the tool
- Model auto-associates with current selected project
- User works on model immediately

#### New Flow (Added functionality):
- User is on detailed project page
- Clicks "Add Model" button/dropdown
- Selects model type (e.g., "Outcomes Model", "Customer Journey Map", etc.)
- Model gets created with:
  - Project association
  - "Not Started" status (0%)
  - Placeholder name (e.g., "New Outcomes Model")
  - Empty input/output data
- Model appears in the project's models table immediately

### Model Interaction on Project Page

#### "Jump Into" Functionality:
- Each model name in the table is **clickable**
- Clicking takes user to the appropriate tool page with that model loaded
- For example: Click "Customer Experience Strategy" → goes to `/resources/tools/customer-journey-map-tool` with that specific model's data pre-populated

#### Quick Actions:
- **Status updates** happen directly on project page (dropdown)
- **Notes editing** can happen inline
- **Navigation to work** happens via model name clicks

### UI Implementation Ideas

#### Add Model Interface:
Dropdown/Select organized by phase:
```
Discover Tools
├── Outcomes Model
├── Strategy Canvas
└── Market Analysis

Define Tools
├── Customer Journey Map
├── Value Proposition Canvas
└── Stakeholder Map

Develop Tools
├── Process Design
├── Capability Assessment
└── Implementation Plan

Deliver Tools
├── Performance Metrics
├── Value Delivery Framework
└── Operations Dashboard
```

#### Models Table Enhancement:
- **Model names** become navigation links
- **Status dropdowns** update immediately
- **Visual indicators** show which models are ready to work on vs. completed

## Step-by-Step Work Plan

### Phase 1: Design Confirmation & Layout

#### Step 1: Create Wireframe/Mockup
- Build static HTML wireframe showing complete layout
- Include all sections with placeholder content
- Apply Design4 colors and spacing
- **Review point:** Confirm layout, proportions, and visual hierarchy

#### Step 2: Build Basic Page Structure
- Create `/src/app/projects/[id]/page.tsx`
- Implement sidebar navigation matching existing pattern
- Set up main content grid/layout structure
- Add breadcrumb navigation
- **Review point:** Confirm responsive behavior and sidebar functionality

### Phase 2: Static Content Implementation

#### Step 3: Project Header Section
- Project name, description, phase badge
- Progress bar placeholder (static)
- Last modified timestamp
- **Review point:** Header styling and information hierarchy

#### Step 4: Metadata Cards Row
- Company/Organization field
- Total Models, Active Phase, Project Status cards
- Responsive grid layout
- **Review point:** Card design and mobile stacking

#### Step 5: Models Table Structure
- Table headers and mock data rows
- Phase-based color coding system
- Status dropdown (non-functional initially)
- Model notes truncation
- **Review point:** Table design, colors, and readability

#### Step 6: Additional Sections
- Detailed description expandable section
- Planning notes section
- Empty states and loading placeholders
- **Review point:** Complete static page review

### Phase 3: Navigation & Routing

#### Step 7: Wire Up Navigation
- Update project tiles to link to `/projects/[id]`
- Implement dynamic routing with project ID
- Add URL parameters handling
- **Review point:** Navigation flow works correctly

### Phase 4: Data Integration

#### Step 8: Fetch Real Project Data
- Integrate with existing project API
- Display actual project information
- Handle loading and error states
- **Review point:** Real data displays correctly

#### Step 9: Models Data Integration
- Fetch models for specific project using `apiClient.getModels(projectId)`
- Replace mock table data with real models
- Implement phase-based sorting
- **Review point:** Models display with correct colors and data

### Phase 5: Interactive Functionality

#### Step 10: Add Model Creation
- "Add Model" dropdown with phase organization
- Model type selection and creation
- Immediate table update after creation
- **Review point:** Model creation workflow

#### Step 11: Status Management
- Functional status dropdowns
- Progress calculation based on model statuses
- Real-time progress bar updates
- **Review point:** Status updates and progress calculation

#### Step 12: Model Navigation
- Clickable model names linking to appropriate tools
- Pre-populate tool forms with existing model data
- Handle model loading in tool pages
- **Review point:** Complete workflow from project → model → tool

### Phase 6: Polish & Enhancement

#### Step 13: Editing Capabilities
- Inline project description editing
- Planning notes rich text editor
- Company/organization field updates
- **Review point:** Editing experience

#### Step 14: Final Polish
- Loading states and animations
- Error handling and user feedback
- Mobile optimization
- Accessibility improvements
- **Review point:** Complete functionality testing

## Review Checkpoints
After each phase, we'll:
1. **Test functionality** on localhost
2. **Review visual design** against Design4 standards
3. **Confirm user experience** flows work intuitively
4. **Make adjustments** before proceeding to next phase

## Technical Implementation Notes

### File Structure
- Main page: `/src/app/projects/[id]/page.tsx`
- Components: Consider creating reusable components for:
  - Project header
  - Models table
  - Metadata cards
  - Add model dropdown

### API Integration
- Use existing `apiClient.getProjects()` for project data
- Use existing `apiClient.getModels(projectId)` for models data
- Extend API as needed for status updates and model creation

### Styling Considerations
- Follow existing Design4 color palette
- Use shadcn/ui components where possible
- Maintain consistency with existing pages
- Ensure proper responsive behavior

### State Management
- Consider project-level state management for models
- Handle loading states appropriately
- Implement optimistic updates for better UX

This specification provides a comprehensive foundation for building the detailed project page while maintaining consistency with the existing Design4 framework and user experience patterns.