export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      solutions: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          category: string
          image: string
          rating: number | null
          downloads: number
          active_users: number
          verified: boolean
          subscription: boolean
          developer_id: string
          features: Json
          technologies: Json
          requirements: Json
          screenshots: Json
          demo_url: string | null
          documentation_url: string | null
          release_date: string
          last_update: string
          version: string
          supported_languages: Json
          industries: Json
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          category: string
          image: string
          rating?: number | null
          downloads?: number
          active_users?: number
          verified?: boolean
          subscription?: boolean
          developer_id: string
          features?: Json
          technologies?: Json
          requirements?: Json
          screenshots?: Json
          demo_url?: string | null
          documentation_url?: string | null
          release_date?: string
          last_update?: string
          version: string
          supported_languages?: Json
          industries?: Json
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          category?: string
          image?: string
          rating?: number | null
          downloads?: number
          active_users?: number
          verified?: boolean
          subscription?: boolean
          developer_id?: string
          features?: Json
          technologies?: Json
          requirements?: Json
          screenshots?: Json
          demo_url?: string | null
          documentation_url?: string | null
          release_date?: string
          last_update?: string
          version?: string
          supported_languages?: Json
          industries?: Json
          created_at?: string
        }
      }
      developer_profiles: {
        Row: {
          user_id: string
          skills: Json
          languages: Json
          certifications: Json
          hourly_rate: number | null
          availability: string | null
          github_url: string | null
          linkedin_url: string | null
          completed_projects: number
          active_projects: number
        }
        Insert: {
          user_id: string
          skills?: Json
          languages?: Json
          certifications?: Json
          hourly_rate?: number | null
          availability?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          completed_projects?: number
          active_projects?: number
        }
        Update: {
          user_id?: string
          skills?: Json
          languages?: Json
          certifications?: Json
          hourly_rate?: number | null
          availability?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          completed_projects?: number
          active_projects?: number
        }
      }
      business_profiles: {
        Row: {
          user_id: string
          company_size: string | null
          industry: string | null
          tax_id: string | null
          billing_email: string | null
          billing_address: Json | null
        }
        Insert: {
          user_id: string
          company_size?: string | null
          industry?: string | null
          tax_id?: string | null
          billing_email?: string | null
          billing_address?: Json | null
        }
        Update: {
          user_id?: string
          company_size?: string | null
          industry?: string | null
          tax_id?: string | null
          billing_email?: string | null
          billing_address?: Json | null
        }
      }
      reviews: {
        Row: {
          id: string
          solution_id: string
          user_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          solution_id: string
          user_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          solution_id?: string
          user_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}