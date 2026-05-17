"use client";

import { useAppDispatch } from "@/hooks/redux";
import api from "@/lib/axios";
import { connectSocket } from "@/lib/socket";
import { setUser } from "@/store/slices/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

const demoCreds = [
  { label: "Admin", email: "superadmin@livechat.com", password: "Admin@123" },
  { label: "User 1", email: "alice@example.com", password: "password123" },
  { label: "User 2", email: "bob@example.com", password: "password123" },
];

const stats = [
  { value: "10K+", label: "Messages sent" },
  { value: "500+", label: "Active users" },
  { value: "99.9%", label: "Uptime" },
];

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setError(null);
      const res = await api.post("/auth/signin", data);
      const raw = res.data.data;
      const user = raw.user ?? raw;
      dispatch(setUser(user));
      connectSocket();
      if (user.role === "USER") {
        router.push("/dashboard");
      } else {
        router.push("/admin");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid credentials";
      setError(message);
    }
  };

  const fillDemo = (email: string, password: string) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", password, { shouldValidate: true });
  };

  return (
    <main className="min-h-screen bg-[#0F1419] flex">

      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1E2530] flex-col items-center justify-center p-12">
        {/* Mesh orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#8B5CF6]/30 rounded-full blur-3xl" style={{animation: "float 14s ease-in-out infinite"}} />
          <div className="absolute top-1/2 -right-20 w-80 h-80 bg-[#06B6D4]/25 rounded-full blur-3xl" style={{animation: "float 10s ease-in-out infinite reverse"}} />
          <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-[#10B981]/20 rounded-full blur-3xl" style={{animation: "float 16s ease-in-out infinite 2s"}} />
        </div>

        {/* Orbit rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[560px] h-[560px] rounded-full border border-[#8B5CF6]/15 absolute" />
          <div className="w-[420px] h-[420px] rounded-full border border-[#06B6D4]/20 absolute" />
          <div className="w-[280px] h-[280px] rounded-full border border-[#10B981]/15 absolute" />
          <div className="w-[560px] h-[560px] absolute" style={{animation: "spin 22s linear infinite"}}>
            <div className="w-3.5 h-3.5 rounded-full bg-[#8B5CF6] shadow-lg shadow-[#8B5CF6]/60 absolute top-0 left-1/2 -translate-x-1/2" />
          </div>
          <div className="w-[420px] h-[420px] absolute" style={{animation: "spin 15s linear infinite reverse"}}>
            <div className="w-3 h-3 rounded-full bg-[#06B6D4] shadow-lg shadow-[#06B6D4]/60 absolute top-0 left-1/2 -translate-x-1/2" />
          </div>
          <div className="w-[280px] h-[280px] absolute" style={{animation: "spin 9s linear infinite"}}>
            <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-lg shadow-[#10B981]/60 absolute top-0 left-1/2 -translate-x-1/2" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-sm w-full">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#8B5CF6] via-[#06B6D4] to-[#10B981] flex items-center justify-center shadow-2xl shadow-[#06B6D4]/30">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-[#8B5CF6] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
              LiveChat
            </span>
          </div>

          <h2 className="text-3xl font-bold text-[#F1F5F9] mb-3">
            Welcome back<br />
            <span className="bg-linear-to-r from-[#8B5CF6] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
              to LiveChat
            </span>
          </h2>
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-10">
            Your conversations are waiting. Sign in and pick up right where you left off.
          </p>

          {/* Mock chat preview */}
          <div className="bg-[#0F1419] rounded-2xl border border-[#334155] p-4 text-left shadow-2xl shadow-black/40 mb-8">
            <div className="flex items-center gap-3 pb-3 border-b border-[#334155]">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white font-bold text-xs shrink-0">A</div>
              <div>
                <p className="text-[#F1F5F9] text-xs font-medium">Alice</p>
                <p className="text-[#10B981] text-[10px]">● Online</p>
              </div>
            </div>
            <div className="py-3 flex flex-col gap-2">
              <div className="flex justify-start">
                <span className="bg-[#1E2530] text-[#F1F5F9] text-xs px-3 py-2 rounded-2xl rounded-tl-sm max-w-[80%] border border-[#334155]">
                  Hey! Are you joining the call? 👋
                </span>
              </div>
              <div className="flex justify-end">
                <span className="bg-[#0E7490] text-white text-xs px-3 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
                  Yes, give me 2 mins! 🚀
                </span>
              </div>
              <div className="flex justify-start">
                <span className="bg-[#1E2530] text-[#F1F5F9] text-xs px-3 py-2 rounded-2xl rounded-tl-sm max-w-[80%] border border-[#334155]">
                  Perfect, see you there ✅
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-bounce" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-bounce [animation-delay:150ms]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-bounce [animation-delay:300ms]" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#0F1419]/60 rounded-xl p-3 border border-[#334155]">
                <p className="text-[#06B6D4] font-bold text-lg">{s.value}</p>
                <p className="text-[#94A3B8] text-[10px] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8 relative overflow-hidden">
        {/* Corner glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Mobile orbs */}
        <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#8B5CF6]/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#06B6D4]/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Logo mobile only */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#8B5CF6] via-[#06B6D4] to-[#10B981] flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-[#8B5CF6] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
                LiveChat
              </span>
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#F1F5F9] mb-1">Sign in</h1>
            <p className="text-[#94A3B8] text-sm">Enter your credentials to continue</p>
          </div>

          {/* Gradient border card */}
          <div className="relative rounded-2xl p-[1px] bg-linear-to-br from-[#8B5CF6]/40 via-[#06B6D4]/20 to-[#10B981]/40 shadow-2xl shadow-black/40">
            <div className="bg-[#1E2530] rounded-2xl p-6 sm:p-8">
              {error && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div>
                  <label className="text-sm font-medium text-[#F1F5F9] block mb-1.5">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-[#0F1419] border border-[#334155] rounded-xl px-4 py-3 text-[#F1F5F9] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#06B6D4] transition-colors"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-[#F1F5F9]">Password</label>
                    <Link href="/forgot-password" className="text-xs text-[#06B6D4] hover:text-[#22D3EE] transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full bg-[#0F1419] border border-[#334155] rounded-xl px-4 py-3 pr-11 text-[#F1F5F9] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#06B6D4] transition-colors"
                    />
                    <button
                      type="button"
                      onMouseDown={(e) => { e.preventDefault(); setShowPassword((p) => !p); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-[#8B5CF6] via-[#06B6D4] to-[#10B981] hover:opacity-90 transition-opacity shadow-lg shadow-[#06B6D4]/20 text-sm mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Signing in..." : "Sign In →"}
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 pt-5 border-t border-[#334155]">
                <p className="text-[#94A3B8] text-xs text-center mb-3 font-medium uppercase tracking-wide">
                  Demo Credentials
                </p>
                <div className="flex flex-col gap-2">
                  {demoCreds.map((cred) => (
                    <button
                      key={cred.email}
                      type="button"
                      onClick={() => fillDemo(cred.email, cred.password)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#0F1419] border border-[#334155] hover:border-[#06B6D4]/40 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          cred.label === "Admin"
                            ? "bg-[#8B5CF6]/20 text-[#8B5CF6]"
                            : "bg-[#06B6D4]/20 text-[#06B6D4]"
                        }`}>
                          {cred.label}
                        </span>
                        <span className="text-[#94A3B8] text-xs">{cred.email}</span>
                      </div>
                      <span className="text-[#334155] text-xs group-hover:text-[#06B6D4] transition-colors">
                        Fill →
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-center text-sm text-[#94A3B8] mt-6">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-[#06B6D4] hover:text-[#22D3EE] font-medium transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {["🔒 Secure", "⚡ Real-time", "🌍 Always on"].map((badge) => (
              <span key={badge} className="text-[#94A3B8] text-xs">{badge}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.03); }
        }
      `}</style>
    </main>
  );
}