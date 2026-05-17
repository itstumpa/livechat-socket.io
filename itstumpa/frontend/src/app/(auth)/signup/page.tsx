"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

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

const features = [
  { icon: "⚡", text: "Real-time messaging" },
  { icon: "📎", text: "File & image sharing" },
  { icon: "✅", text: "Read receipts" },
  { icon: "🟢", text: "Online presence" },
];

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      setError(null);
      await api.post("/auth/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      router.push("/verify-email");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Signup failed";
      setError(message);
    }
  };

  return (
    <main className="min-h-screen bg-[#0F1419] flex">
      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1E2530] flex-col items-center justify-center p-12">
        {/* Mesh orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#8B5CF6]/25 rounded-full blur-3xl" style={{animation: "float 14s ease-in-out infinite"}} />
          <div className="absolute top-1/2 -right-20 w-72 h-72 bg-[#06B6D4]/20 rounded-full blur-3xl" style={{animation: "float 10s ease-in-out infinite reverse"}} />
          <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-[#10B981]/15 rounded-full blur-3xl" style={{animation: "float 16s ease-in-out infinite 2s"}} />
        </div>

        {/* Orbit rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-[#8B5CF6]/10 absolute" />
          <div className="w-[380px] h-[380px] rounded-full border border-[#06B6D4]/15 absolute" />
          <div className="w-[260px] h-[260px] rounded-full border border-[#10B981]/10 absolute" />
          {/* Orbiting dot purple */}
          <div className="w-[500px] h-[500px] absolute" style={{animation: "spin 20s linear infinite"}}>
            <div className="w-3 h-3 rounded-full bg-[#8B5CF6] shadow-lg shadow-[#8B5CF6]/50 absolute top-0 left-1/2 -translate-x-1/2" />
          </div>
          {/* Orbiting dot cyan */}
          <div className="w-[380px] h-[380px] absolute" style={{animation: "spin 14s linear infinite reverse"}}>
            <div className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] shadow-lg shadow-[#06B6D4]/50 absolute top-0 left-1/2 -translate-x-1/2" />
          </div>
          {/* Orbiting dot green */}
          <div className="w-[260px] h-[260px] absolute" style={{animation: "spin 9s linear infinite"}}>
            <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-lg shadow-[#10B981]/50 absolute top-0 left-1/2 -translate-x-1/2" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#8B5CF6] via-[#06B6D4] to-[#10B981] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#06B6D4]/30">
            <span className="text-white font-bold text-2xl">L</span>
          </div>
          <h2 className="text-3xl font-bold text-[#F1F5F9] mb-3">
            Start chatting<br />
            <span className="bg-linear-to-r from-[#8B5CF6] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
              instantly
            </span>
          </h2>
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
            Join thousands of users already connected on LiveChat.
          </p>

          <div className="flex flex-col gap-3 text-left">
            {features.map((f) => (
              <div key={f.text} className="flex items-center gap-3 bg-[#0F1419]/50 rounded-xl px-4 py-3 border border-[#334155]">
                <span className="text-lg">{f.icon}</span>
                <span className="text-[#F1F5F9] text-sm font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

{/* Right form panel */}
<div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-4 md:py-8 relative overflow-hidden">
  {/* Corner glow */}
  <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none" />

  {/* Mobile background orbs */}
  <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#8B5CF6]/15 rounded-full blur-3xl" />
    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#06B6D4]/15 rounded-full blur-3xl" />
  </div>

  <div className="relative z-10 w-full max-w-md">
    {/* Logo — mobile only */}
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
      <h1 className="text-2xl font-bold text-[#F1F5F9] mb-1">Create your account</h1>
      <p className="text-[#94A3B8] text-sm">Fill in the details to get started</p>
    </div>

    {/* Gradient border card */}
    <div className="relative rounded-2xl p-[1px] bg-linear-to-br from-[#8B5CF6]/40 via-[#06B6D4]/20 to-[#10B981]/40 shadow-2xl shadow-black/40">
      <div className="bg-[#1E2530] rounded-2xl p-6 sm:p-8">
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-[#F1F5F9] block mb-1.5">Full Name</label>
            <input
              {...register("name")}
              type="text"
              placeholder="John Doe"
              className="w-full bg-[#0F1419] border border-[#334155] rounded-xl px-4 py-3 text-[#F1F5F9] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#06B6D4] transition-colors"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

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
            <label className="text-sm font-medium text-[#F1F5F9] block mb-1.5">Password</label>
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

          <div>
            <label className="text-sm font-medium text-[#F1F5F9] block mb-1.5">Confirm Password</label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-[#0F1419] border border-[#334155] rounded-xl px-4 py-3 pr-11 text-[#F1F5F9] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#06B6D4] transition-colors"
              />
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); setShowConfirm((p) => !p); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
              >
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-[#8B5CF6] via-[#06B6D4] to-[#10B981] hover:opacity-90 transition-opacity shadow-lg shadow-[#06B6D4]/20 text-sm mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating account..." : "Create Account →"}
          </button>
        </form>

        <p className="text-center text-sm text-[#94A3B8] mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-[#06B6D4] hover:text-[#22D3EE] font-medium transition-colors">
            Sign in
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