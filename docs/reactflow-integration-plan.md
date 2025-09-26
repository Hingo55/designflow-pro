# ReactFlow Integration Plan for DesignFlow Pro

## **Tool Concept: Design4Biz Visual Workflow Builder**

A visual workflow builder that helps users map their business strategies using the Design4.biz framework (Why → How → What). This will be an interactive diagramming tool where users can:

- **Create strategic workflow diagrams** linking purpose, process, and outcomes
- **Build business model canvases** visually
- **Map stakeholder journeys** and decision flows
- **Design organizational structures** and process flows
- **Export and share** their visual frameworks

## **Phase 1: Foundation Setup**
1. **Install ReactFlow** - Modern flow library with excellent TypeScript support
2. **Research integration** - Understand current project structure and identify best integration points
3. **Design tool concept** - Define specific use cases for Design4Biz context

## **Phase 2: Core Implementation**
4. **Base ReactFlow component** - Integrate with existing shadcn/ui design system
5. **Custom node types** - Create Design4Biz specific nodes (Why/How/What, stakeholders, processes)
6. **Tool page/route** - Add new route with proper layout matching existing design

## **Phase 3: Data Persistence**
7. **Database schema** - Add tables for saving flow diagrams
8. **API endpoints** - CRUD operations for flow persistence
9. **Project integration** - Connect flows to existing project system

## **Phase 4: Advanced Features**
10. **Export functionality** - PDF, PNG, JSON export capabilities
11. **Testing & polish** - Ensure quality and user experience

## **Key Benefits**
- **Visual strategy mapping** for Design4Biz methodology
- **Collaborative planning** tool for business frameworks
- **Integration** with existing project management system
- **Export capabilities** for presentations and documentation

## **Technical Implementation Details**

### ReactFlow Package Installation
```bash
npm install @reactflow/core @reactflow/controls @reactflow/background @reactflow/minimap
npm install @reactflow/node-resizer @reactflow/node-toolbar
```

### Custom Node Types to Create
- **Why Node** - Purpose/mission statements
- **How Node** - Process/strategy definitions
- **What Node** - Outcome/deliverable specifications
- **Stakeholder Node** - People/organizations involved
- **Decision Node** - Choice points in workflows
- **Process Node** - Action steps and procedures

### Database Schema Additions
```sql
-- Flows table
CREATE TABLE public.flows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  flow_data JSONB NOT NULL, -- ReactFlow nodes and edges
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.flows ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own flows" ON public.flows
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own flows" ON public.flows
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flows" ON public.flows
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own flows" ON public.flows
  FOR DELETE USING (auth.uid() = user_id);
```

### File Structure
```
src/
├── components/
│   └── flow/
│       ├── FlowBuilder.tsx
│       ├── nodes/
│       │   ├── WhyNode.tsx
│       │   ├── HowNode.tsx
│       │   ├── WhatNode.tsx
│       │   └── index.ts
│       └── controls/
│           ├── FlowToolbar.tsx
│           └── NodePanel.tsx
├── app/
│   └── flows/
│       ├── page.tsx
│       └── [id]/
│           └── page.tsx
└── lib/
    └── flow-utils.ts
```

### Integration Points
- **Projects system** - Flows belong to projects
- **Authentication** - User-specific flow access
- **shadcn/ui** - Consistent styling with existing components
- **Export system** - Leverage existing PDF/PNG export utilities

This integration will add significant value to DesignFlow Pro by providing a visual tool that complements the strategic framework with interactive diagramming capabilities.