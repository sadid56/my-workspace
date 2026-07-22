import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginContent() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials. Please try again.");
      }

      qc.invalidateQueries({ queryKey: ["user"] });
      navigate(callbackUrl);
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen relative overflow-hidden dark:from-gray-900 dark:via-gray-950 dark:to-gray-900'>
      <div className='relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8'>
        {/* Login Card */}
        <div className='w-full max-w-md'>
          <Card className='relative overflow-hidden border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl'>
            {/* Card accent */}
            <div className='absolute top-0 left-0 w-full h-1 bg-orange-400' />

            <CardHeader className='space-y-2 text-center'>
              <CardTitle className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Welcome Back</CardTitle>
            </CardHeader>

            <CardContent className='space-y-6'>
              {errorMsg && (
                <Alert variant='destructive' className='border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'>
                  <AlertDescription className='text-red-800 dark:text-red-300'>{errorMsg}</AlertDescription>
                </Alert>
              )}

              {/* Email Form */}
              <form onSubmit={handleEmailLogin} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email' className='text-gray-700 dark:text-gray-300'>
                    Email Address
                  </Label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                    <Input
                      id='email'
                      type='email'
                      placeholder='name@example.com'
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className='pl-10 h-11 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-400'
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='password' className='text-gray-700 dark:text-gray-300'>
                    Password
                  </Label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                    <Input
                      id='password'
                      type={showPassword ? "text" : "password"}
                      placeholder='Enter your password'
                      required
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className='pl-10 pr-10 h-11 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-400'
                      disabled={loading}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3 hover:bg-transparent'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className='h-4 w-4 text-gray-400' /> : <Eye className='h-4 w-4 text-gray-400' />}
                    </Button>
                  </div>
                </div>

                <Button
                  type='submit'
                  className='w-full bg-amber-500 hover:bg-amber-600 h-11 cursor-pointer text-white shadow-lg hover:shadow-xl transition-all duration-200'
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </>
                  )}
                </Button>
              </form>

              {/* Security Note */}
              <div className='rounded-lg border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/20 p-3'>
                <div className='flex items-start gap-2'>
                  <Shield className='h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5' />
                  <p className='text-xs text-blue-800 dark:text-blue-300'>
                    Your data is protected with enterprise-grade security and encryption.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
