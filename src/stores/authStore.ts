import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import { mockUser, mockAdmin } from '@/data/mockData';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email: string, _password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Mock login - admin@example.com logs in as admin
        if (email === 'admin@example.com') {
          set({ user: mockAdmin, isAuthenticated: true, isLoading: false });
          return true;
        }
        
        // Any other email logs in as regular user
        set({ 
          user: { ...mockUser, email, name: email.split('@')[0] }, 
          isAuthenticated: true, 
          isLoading: false 
        });
        return true;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      register: async (email: string, _password: string, name: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        set({ 
          user: { 
            id: `user-${Date.now()}`,
            email, 
            name, 
            isAdmin: false 
          }, 
          isAuthenticated: true, 
          isLoading: false 
        });
        return true;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
