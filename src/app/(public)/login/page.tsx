"use client"; 

import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";

const LoginPage = () => {
  // Define state variables for email and password
  const router = useRouter();
  const notify = () => toast.success("Login successful!"); 

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Create the onsubmit handler
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      setLoading(false);
      if(response.ok){
        toast.success("Login successful!");
        setTimeout(() => router.push("/dashboard"), 1000); 
      } else {
        const {error} = await response.json().catch(() => ({
          error: "Login failed",
        }))
        toast.error(error);  
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-sans font-semibold text-center">Login</h1>
        <label className="block">
          <span className="text-sm text-gray-600">Email</span>
          <input className="mt-1 w-full rounded-lg border p-2" 
          value={email} onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          />
        </label>
        <label className="block">
          <span className="text-sm text-gray-600">Password</span>
          <input className="mt-1 w-full rounded-lg border p-2" type="password" value={password} onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
          />
        </label>
        <button 
        onClick={notify}
        disabled={loading} 
        type="submit" 
        className="w-full rounded-lg bg-blue-600 p-2 text-white font-bold shadow-md shadow-blue-300 hover:shadow-lg transition-all duration-300">
          {loading ? <Spinner /> : "Login"}
        </button>
      </form>
    </main>
  )
}

export default LoginPage;