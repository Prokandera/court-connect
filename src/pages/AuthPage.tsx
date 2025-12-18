import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register, isLoading } = useAuthStore();
  
  const [mode, setMode] = useState<'login' | 'register'>(searchParams.get('mode') === 'register' ? 'register' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = mode === 'login' ? await login(email, password) : await register(email, password, name);
    if (success) {
      toast({ title: mode === 'login' ? "Welcome back!" : "Account created!" });
      navigate('/book');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
            <span className="text-3xl">🏸</span>
          </div>
          <h1 className="font-display text-3xl font-bold">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-muted-foreground mt-2">{mode === 'login' ? 'Sign in to continue booking' : 'Join us and start playing'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div><Label>Name</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required /></div>
          )}
          <div><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></div>
          <div><Label>Password</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required /></div>
          <Button type="submit" className="w-full" disabled={isLoading}>{mode === 'login' ? 'Sign In' : 'Create Account'}</Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-primary font-medium hover:underline">
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
        
        <p className="text-center text-xs text-muted-foreground">Demo: Use admin@example.com for admin access</p>
      </div>
    </div>
  );
};

export default AuthPage;
