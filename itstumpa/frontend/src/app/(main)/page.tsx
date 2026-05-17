import Link from "next/link";

const stats = [
  { value: "10K+", label: "Messages Sent" },
  { value: "500+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "<50ms", label: "Latency" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0F1419] overflow-x-hidden">

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">

        {/* Background mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-[#8B5CF6]/15 rounded-full blur-[100px]" style={{animation:"float 16s ease-in-out infinite"}} />
          <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] bg-[#06B6D4]/12 rounded-full blur-[100px]" style={{animation:"float 12s ease-in-out infinite reverse"}} />
          <div className="absolute -bottom-32 left-1/3 w-[360px] h-[360px] bg-[#10B981]/10 rounded-full blur-[100px]" style={{animation:"float 20s ease-in-out infinite 4s"}} />
        </div>

        {/* Orbit rings — smaller, centered, with glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Ring 1 */}
          <div className="absolute w-[420px] h-[420px] rounded-full"
            style={{border:"1px solid rgba(139,92,246,0.12)", boxShadow:"0 0 30px rgba(139,92,246,0.04) inset"}} />
          {/* Ring 2 */}
          <div className="absolute w-[300px] h-[300px] rounded-full"
            style={{border:"1px solid rgba(6,182,212,0.15)", boxShadow:"0 0 25px rgba(6,182,212,0.05) inset"}} />
          {/* Ring 3 */}
          <div className="absolute w-[180px] h-[180px] rounded-full"
            style={{border:"1px solid rgba(16,185,129,0.12)", boxShadow:"0 0 20px rgba(16,185,129,0.04) inset"}} />

          {/* Orbiting dots */}
          <div className="absolute w-[420px] h-[420px]" style={{animation:"spin 28s linear infinite"}}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"
              style={{boxShadow:"0 0 10px 3px rgba(139,92,246,0.6)"}} />
          </div>
          <div className="absolute w-[300px] h-[300px]" style={{animation:"spin 18s linear infinite reverse"}}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#06B6D4]"
              style={{boxShadow:"0 0 8px 3px rgba(6,182,212,0.6)"}} />
          </div>
          <div className="absolute w-[180px] h-[180px]" style={{animation:"spin 10s linear infinite"}}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#10B981]"
              style={{boxShadow:"0 0 6px 2px rgba(16,185,129,0.6)"}} />
          </div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#334155] bg-[#1E2530]/60 text-xs text-[#94A3B8] mb-6 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Real-time messaging platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5 tracking-tight">
                Connect{" "}
                <span className="bg-linear-to-r from-[#8B5CF6] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
                  Instantly,
                </span>
                <br />
                <span className="text-[#F1F5F9]">Chat Seamlessly</span>
              </h1>

              <p className="text-[#94A3B8] sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Lightning-fast real-time conversations with file sharing, read receipts, and typing indicators — all in one beautiful platform.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-white text-sm bg-linear-to-r from-[#8B5CF6] via-[#06B6D4] to-[#10B981] hover:opacity-90 transition-opacity shadow-lg shadow-[#06B6D4]/20"
                >
                  Start for Free →
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-[#F1F5F9] text-sm border border-[#334155] bg-[#1E2530]/60 hover:border-[#06B6D4]/40 hover:bg-[#1E2530] transition-all backdrop-blur-sm"
                >
                  Sign In
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 pt-8 border-t border-[#334155]/60">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-xl sm:text-2xl font-bold bg-linear-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">{s.value}</p>
                    <p className="text-[#94A3B8] text-[10px] sm:text-xs mt-0.5 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — mock chat */}
            <div className="hidden lg:block">
              <div className="relative mx-auto max-w-sm">
                {/* Card glow */}
                <div className="absolute inset-0 bg-linear-to-br from-[#8B5CF6]/15 via-[#06B6D4]/10 to-[#10B981]/10 rounded-3xl blur-2xl scale-110 pointer-events-none" />

                <div className="relative bg-[#1E2530] rounded-2xl border border-[#334155]/80 overflow-hidden shadow-2xl shadow-black/60">
                  {/* Window bar */}
                  <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#334155] bg-[#0F1419]/60">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <div className="relative shrink-0">
                        <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white font-bold text-[10px]">A</div>
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#10B981] rounded-full border border-[#1E2530]" />
                      </div>
                      <div>
                        <p className="text-[#F1F5F9] text-xs font-semibold leading-none">Alice Johnson</p>
                        <p className="text-[#10B981] text-[10px] mt-0.5">● Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="px-4 py-4 flex flex-col gap-2.5">
                    <div className="flex justify-start">
                      <div className="flex items-end gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-linear-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white font-bold text-[9px] shrink-0">A</div>
                        <span className="bg-[#0F1419] border border-[#334155]/60 text-[#F1F5F9] text-xs px-3 py-2 rounded-2xl rounded-tl-sm">
                          Hey! Did you see the new design? 👀
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <span className="bg-[#0E7490] text-white text-xs px-3 py-2 rounded-2xl rounded-tr-sm">
                        Yes! It looks amazing 🔥
                      </span>
                    </div>

                    <div className="flex justify-start">
                      <div className="flex items-end gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-linear-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white font-bold text-[9px] shrink-0">A</div>
                        <span className="bg-[#0F1419] border border-[#334155]/60 text-[#F1F5F9] text-xs px-3 py-2 rounded-2xl rounded-tl-sm">
                          Shipping today! ✅
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <span className="bg-[#0E7490] text-white text-xs px-3 py-2 rounded-2xl rounded-tr-sm">
                        Can&apos;t wait! 🚀
                      </span>
                    </div>

                    {/* Typing */}
                    <div className="flex justify-start">
                      <div className="flex items-end gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-linear-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white font-bold text-[9px] shrink-0">A</div>
                        <div className="bg-[#0F1419] border border-[#334155]/60 px-3 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-[#94A3B8] animate-bounce" />
                          <div className="w-1 h-1 rounded-full bg-[#94A3B8] animate-bounce [animation-delay:150ms]" />
                          <div className="w-1 h-1 rounded-full bg-[#94A3B8] animate-bounce [animation-delay:300ms]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="px-4 py-3 border-t border-[#334155] bg-[#0F1419]/40 flex items-center gap-2">
                    <div className="flex-1 bg-[#1E2530] border border-[#334155]/60 rounded-xl px-3 py-2 text-[#94A3B8] text-xs">
                      Type a message...
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white text-[10px] shrink-0">
                      ➤
                    </div>
                  </div>
                </div>

                {/* Floating badge — top right */}
                <div className="absolute -top-3 -right-6 bg-[#1E2530] border border-[#334155] rounded-xl px-3 py-2 shadow-xl flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[10px]">🟢</div>
                  <div>
                    <p className="text-[#F1F5F9] text-[10px] font-semibold leading-none">Bob is online</p>
                    <p className="text-[#94A3B8] text-[9px] mt-0.5">Just now</p>
                  </div>
                </div>

                {/* Floating badge — bottom left */}
                <div className="absolute -bottom-3 -left-6 bg-[#1E2530] border border-[#334155] rounded-xl px-3 py-2 shadow-xl flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 flex items-center justify-center text-[10px]">✓✓</div>
                  <div>
                    <p className="text-[#F1F5F9] text-[10px] font-semibold leading-none">Message read</p>
                    <p className="text-[#94A3B8] text-[9px] mt-0.5">2 seconds ago</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#334155]/60 py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-linear-to-br from-[#8B5CF6] via-[#06B6D4] to-[#10B981] flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">L</span>
            </div>
            <span className="font-bold text-sm bg-linear-to-r from-[#8B5CF6] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
              LiveChat
            </span>
          </div>
          <p className="text-[#94A3B8] text-xs">
            © {new Date().getFullYear()} LiveChat. Built for real-time communication.
          </p>
          <div className="flex gap-5">
            <Link href="/about" className="text-[#94A3B8] hover:text-[#F1F5F9] text-xs transition-colors">About the project</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </main>
  );
}