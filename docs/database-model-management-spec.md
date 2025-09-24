# Database & Model Management Specification

## **Database Schema**

### **USERS**
- `id` (primary key)
- `email`
- `name`
- `created_at`
- `updated_at`

### **PROJECTS**
- `id` (primary key)
- `user_id` (foreign key → users.id)
- `name`
- `description`
- `phase` (discover/define/develop/deliver)
- `status` (active/completed/archived)
- `created_at`
- `updated_at`

### **MODELS**
- `id` (primary key)
- `project_id` (foreign key → projects.id)
- `user_id` (foreign key → users.id)
- `type` (outcomes_model/value_proposition/customer_journey/etc.)
- `name`
- `status` (draft/published)
- `input_data` (JSON - stores form inputs before AI processing)
- `output_data` (JSON - stores final AI-generated model)
- `created_at`
- `updated_at`

## **Relationships**
- **Users** → **Projects** (one-to-many): A user can have multiple projects
- **Projects** → **Models** (one-to-many): A project can contain multiple models
- **Users** → **Models** (one-to-many): Direct ownership for efficient querying

## **Core Functionality (Simple Tier)**

### **Basic CRUD Operations**
- Create, read, update, delete models and projects
- User ownership of all models and projects
- Basic data storage for tool inputs and AI outputs
- PDF export capability (already implemented)
- Project organization to group related models

### **Model Continuation & Iteration**
Users can return to any previously created model with three options:

1. **"Edit Original Inputs"**
   - Loads `input_data` from selected model
   - Pre-populates tool form with original inputs
   - User can modify and regenerate

2. **"Continue from Results"**
   - Takes `output_data` from selected model
   - AI converts detailed output back to enhanced input format
   - Pre-populates tool with richer, AI-enhanced starting data
   - User can further refine before regenerating

3. **"Merge & Enhance"**
   - Combines both `input_data` and `output_data`
   - AI creates optimal enhanced input combining original and results
   - Provides richest starting point for iteration

## **Technical Implementation**

### **Data Storage**
- JSON fields provide flexibility for different tool schemas
- Type field identifies which tool created each model
- Dual foreign keys (project_id, user_id) enable efficient queries
- Status fields enable simple workflow management

### **AI Enhancement Service**
- New API endpoint: `/models/{id}/smart-populate`
- AI prompt converts `output_data` to enhanced `input_data` format
- Maintains compatibility with existing tool input schemas
- No database schema changes required

### **User Interface**
- "Load Previous Model" options in tool interfaces
- "Continue Previous Model" buttons on tool entry pages
- "Duplicate Model" functionality in project management
- Clear indicators of model iteration history

## **Future Extensibility**
- JSON storage supports schema evolution without migrations
- Model type field enables tool-specific enhancement strategies
- Dual relationships support future collaboration features
- Status fields prepared for workflow expansion

This specification provides the foundation for iterative model development while maintaining simplicity and extensibility.