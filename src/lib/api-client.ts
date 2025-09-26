import { supabase } from '@/lib/supabase'

class ApiClient {
  private async getAuthHeaders(): Promise<Record<string, string>> {
    const { data: { session } } = await supabase.auth.getSession()

    if (session?.access_token) {
      return {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    }

    return {
      'Content-Type': 'application/json'
    }
  }

  private async getCurrentUserId(): Promise<string | null> {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.user?.id || null
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = await this.getAuthHeaders()

    const response = await fetch(`/api${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      try {
        const error = JSON.parse(errorText)
        throw new Error(error.error || `HTTP ${response.status}`)
      } catch {
        throw new Error(errorText || `HTTP ${response.status}`)
      }
    }

    return response.json()
  }

  // Projects API
  async getProjects() {
    const userId = await this.getCurrentUserId()
    if (!userId) {
      throw new Error('Authentication required')
    }
    return this.request<{ projects: any[] }>(`/projects`)
  }

  async createProject(data: { name: string; description?: string; phase: string; status?: string }) {
    const userId = await this.getCurrentUserId()
    if (!userId) {
      throw new Error('Authentication required')
    }

    return this.request<{ project: any }>('/projects', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async updateProject(id: string, data: Partial<{ name: string; description?: string; shortDescription?: string; phase: string; status: string; planning_notes?: string; company?: string }>) {
    const userId = await this.getCurrentUserId()
    if (!userId) {
      throw new Error('Authentication required')
    }

    return this.request<{ project: any }>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async deleteProject(id: string) {
    const userId = await this.getCurrentUserId()
    if (!userId) {
      throw new Error('Authentication required')
    }

    return this.request<{ message: string }>(`/projects/${id}`, {
      method: 'DELETE'
    })
  }

  // Models API
  async getModels(projectId?: string, type?: string) {
    const params = new URLSearchParams()
    const userId = await this.getCurrentUserId()

    if (!userId) {
      throw new Error('Authentication required')
    }

    if (projectId) params.append('projectId', projectId)
    if (type) params.append('type', type)
    params.append('userId', userId)

    const query = params.toString() ? `?${params.toString()}` : ''
    return this.request<{ models: any[] }>(`/models${query}`)
  }

  async createModel(data: {
    project_id: string
    type: string
    name: string
    status?: string
    input_data?: any
    output_data?: any
  }) {
    const userId = await this.getCurrentUserId()
    if (!userId) {
      throw new Error('Authentication required')
    }

    return this.request<{ model: any }>('/models', {
      method: 'POST',
      body: JSON.stringify({ ...data, user_id: userId })
    })
  }

  async updateModel(id: string, data: Partial<{
    name: string
    status: string
    input_data: any
    output_data: any
  }>) {
    const userId = await this.getCurrentUserId()
    if (!userId) {
      throw new Error('Authentication required')
    }

    return this.request<{ model: any }>(`/models/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...data, user_id: userId })
    })
  }

  async deleteModel(id: string) {
    const userId = await this.getCurrentUserId()
    if (!userId) {
      throw new Error('Authentication required')
    }

    return this.request<{ message: string }>(`/models/${id}?userId=${userId}`, {
      method: 'DELETE'
    })
  }

  async smartPopulate(id: string, mode: 'original' | 'enhanced' | 'merged') {
    const userId = await this.getCurrentUserId()
    if (!userId) {
      throw new Error('Authentication required')
    }

    return this.request<{
      populated_data: any
      mode: string
      model_type: string
      model_name: string
    }>(`/models/${id}/smart-populate`, {
      method: 'POST',
      body: JSON.stringify({ mode, user_id: userId })
    })
  }
}

export const apiClient = new ApiClient()