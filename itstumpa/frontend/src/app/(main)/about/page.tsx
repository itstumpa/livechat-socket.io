import Link from "next/link";

const values = [
  {
    title: "Speed First",
    description: "Every millisecond counts. Optimized relentlessly to deliver the fastest messaging experience.",
  },
  {
    title: "Privacy Matters",
    description: "Your data is yours. End-to-end encryption and zero data mining, guaranteed.",
  },
  {
    title: "Simple by Design",
    description: "Powerful features shouldn't be complicated. Intuitive interfaces, zero learning curve.",
  },
];

const milestones = [
  { year: "2023", event: "Started learning full-stack development" },
  { year: "2024", event: "Built first real-time messaging prototype" },
  { year: "2025", event: "Launched LiveChat beta version" },
  { year: "2026", event: "Reached 10K+ active users" },
];

const skills = [
  "Next.js & React",
  "Node.js & Express",
  "TypeScript",
  "Prisma ORM",
  "WebSocket & Real-time",
  "PostgreSQL",
  "Tailwind CSS",
  "REST APIs",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0F1419] overflow-x-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-[#8B5CF6]/15 rounded-full blur-[100px]" style={{animation:"float 16s ease-in-out infinite"}} />
        <div className="absolute top-1/2 -right-32 w-[400px] h-[400px] bg-[#06B6D4]/12 rounded-full blur-[100px]" style={{animation:"float 12s ease-in-out infinite reverse"}} />
        <div className="absolute bottom-0 left-1/4 w-[360px] h-[360px] bg-[#10B981]/10 rounded-full blur-[100px]" style={{animation:"float 20s ease-in-out infinite 4s"}} />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20"> 
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#334155] bg-[#1E2530]/60 text-xs text-[#94A3B8] mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Built with passion
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5 tracking-tight">
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
                Building the Future
              </span>
              <br />
              <span className="text-[#F1F5F9]">of Communication</span>
            </h1>

            <p className="text-[#94A3B8] sm:text-lg leading-relaxed max-w-2xl mx-auto">
              A passion project turned into a full-fledged real-time messaging platform, built from the ground up with love and dedication.
            </p>
          </div>

          {/* Creator Section - Enhanced Visibility */}
          <div className="relative mb-20">
            {/* Stronger glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/20 via-[#06B6D4]/15 to-[#10B981]/15 rounded-3xl blur-3xl" />
            
            <div className="relative bg-gradient-to-br from-[#1E2530] to-[#0F1419] border-2 border-[#06B6D4]/30 rounded-2xl p-8 sm:p-12 shadow-2xl shadow-[#06B6D4]/10">


            
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6] via-[#06B6D4] to-[#10B981] rounded-2xl blur-xl opacity-50" />
     
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#F1F5F9] mb-2">Tumpa Das</h2>
                  <p className="text-[#06B6D4] font-semibold text-lg mb-4">Full-Stack Web Developer & Founder</p>
                  
                  <p className="text-[#CBD5E1]   leading-relaxed mb-4">
                    Full-stack web developer with over 1 year of professional experience building modern, scalable web applications. 
                    Specialized in real-time communication systems, API development, and responsive user interfaces.
                  </p>
                  
                  <p className="text-[#CBD5E1]   leading-relaxed">
                    LiveChat started as a personal challenge to master WebSocket technology and real-time architecture. 
                    What began as a learning project evolved into a production-ready platform serving thousands of users. 
                    Every line of code, every feature, and every optimization reflects a commitment to excellence and continuous learning.
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-8 pt-8 border-t border-[#06B6D4]/20">
                <h3 className="text-[#F1F5F9] font-semibold text-lg mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-[#8B5CF6] via-[#06B6D4] to-[#10B981] rounded-full" />
                  Tech Stack & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-lg bg-[#0F1419] border border-[#06B6D4]/40 text-[#E2E8F0] text-sm font-medium hover:border-[#06B6D4]/60 hover:bg-[#1E2530] transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/15 via-[#06B6D4]/10 to-[#10B981]/10 rounded-3xl blur-2xl" />
            
            <div className="relative bg-gradient-to-br from-[#1E2530] to-[#0F1419] border-2 border-[#8B5CF6]/30 rounded-2xl p-8 sm:p-12 shadow-xl shadow-[#8B5CF6]/10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F1F5F9] mb-4 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-gradient-to-b from-[#8B5CF6] to-[#06B6D4] rounded-full" />
                The Mission
              </h2>
              <p className="text-[#CBD5E1]   sm:text-lg leading-relaxed">
                To create a messaging platform that prioritizes speed, simplicity, and user privacy. 
                Real-time communication should feel instant—no lag, no friction, just pure connection. 
                By combining modern web technologies with thoughtful design, LiveChat delivers an experience 
                that feels both powerful and effortless.
              </p>
            </div>
          </div>


          {/* CTA */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/20 via-[#06B6D4]/15 to-[#10B981]/15 rounded-3xl blur-3xl" />
            
            <div className="relative bg-gradient-to-br from-[#1E2530] to-[#0F1419] border-2 border-[#10B981]/30 rounded-2xl p-8 sm:p-12 text-center shadow-2xl shadow-[#10B981]/10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F1F5F9] mb-4">
                Experience the Difference
              </h2>
              <p className="text-[#CBD5E1]   mb-8 max-w-xl mx-auto">
                Join thousands of users enjoying lightning-fast, secure real-time conversations.
              </p>
              <Link
                href="/signup"
                className="inline-block px-8 py-3 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#10B981] hover:opacity-90 transition-opacity shadow-lg shadow-[#06B6D4]/30"
              >
                Get Started Free →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#334155]/60 py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#8B5CF6] via-[#06B6D4] to-[#10B981] flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">L</span>
            </div>
            <span className="font-bold text-sm bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
              LiveChat
            </span>
          </div>
          <p className="text-[#94A3B8] text-xs">
            © {new Date().getFullYear()} LiveChat. Built for real-time communication.
          </p>
          <div className="flex gap-5">
            <Link href="/" className="text-[#94A3B8] hover:text-[#F1F5F9] text-xs transition-colors"> ← Back to Home</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </main>
  );
}