'use client';
import { useState } from 'react';
import { login } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
      document.cookie = `token=${res.data.access_token}; path=/`; // Tarayıcıda saklanır
      router.push('/dashboard');
    } catch (err) {
      console.error('Giriş hatası:', err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Giriş Yap</h1>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full mb-2" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Şifre" type="password" className="border p-2 w-full mb-2" />
      <button onClick={handleLogin} className="bg-green-600 text-white px-4 py-2 rounded">Giriş</button>
    </div>
  );
}