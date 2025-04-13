import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useUser } from '@/context/Usercontext';
import { Button } from '@/components/ui/button';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const role = userData.role || "user";
  
        // Store role in your global user context
        setUser({
          uid: user.uid,
          email: user.email,
          username: userData.username,
          role,
        });
  
        // ✅ Redirect based on role
        if (role === "admin") {
          navigate("/AdminDashboard");
        } else {
          navigate("/Profile");
        }
      } else {
        console.error("No user document found!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid credentials");
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full">Login</Button>
      </form>

      <p className="mt-4 text-sm text-center">
        Don’t have an account? <a href="/register" className="text-brand-500 hover:underline">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
