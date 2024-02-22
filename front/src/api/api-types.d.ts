export namespace Api {
  interface LoginDto {
    id: string;
    password: string;
  }

  interface BackendResponse {
    ok?: boolean;
    data?: Record<string, any>;
  }

  interface LoginResponse {
    refreshToken: string;
    data: {
      accessToken?: string;
      id?: string;
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
      status?: 'ACTIVE' | 'INACTIVE' | 'NOT_VERIFIED';
    };
  }

  interface ApiInstance {
    get: <T>(path: string, options?: { params: Record<string, string> }) => Promise<T>;
    post: <T>(path: string, options?: { data: Record<string, string> }) => Promise<T>;
    put: <T>(path: string, options?: { data: Record<string, string> }) => Promise<T>;
    delete: <T>(path: string, options?: { data: Record<string, string> }) => Promise<T>;
  }
}
