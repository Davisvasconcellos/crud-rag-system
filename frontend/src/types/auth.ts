export interface UserPlan {
  id: number;
  name: string;
  description?: string;
  price?: string | number;
}

export interface AuthUser {
  id_code: string;
  name: string;
  email: string;
  phone?: string;
  role: 'master' | 'admin' | 'manager' | 'volunteer' | 'people' | string;
  avatar_url?: string | null;
  status: 'active' | 'inactive' | 'pending_verification' | 'banned' | string;
  email_verified: boolean;
  plan_id?: number | null;
  plan_start?: string | null;
  plan_end?: string | null;
  created_at?: string;
  plan?: UserPlan | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponseData {
  user: AuthUser;
  token: string;
  expiresIn: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: unknown;
}
