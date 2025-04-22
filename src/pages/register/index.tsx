'use client';
import { useState } from 'react';
import { register } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await register({ email, password });
      router.push('/login');
    } catch (err) {
      console.error('Kayıt hatası:', err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Kayıt Ol</h1>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full mb-2" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Şifre" type="password" className="border p-2 w-full mb-2" />
      <button onClick={handleRegister} className="bg-blue-600 text-white px-4 py-2 rounded">Kayıt Ol</button>
    </div>
  );
}