"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Header } from "@/components/boty/header"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/")
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center pt-20">
        <div className="w-full max-w-4xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 rounded-3xl overflow-hidden boty-shadow bg-card">

            {/* Left: Image Panel */}
            <div className="relative hidden lg:block min-h-[560px] bg-secondary/40">
              <Image
                src="/images/bento-skin-model.jpg"
                alt="Boty skincare"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>

            {/* Right: Form */}
            <div className="flex flex-col justify-center items-center lg:items-start px-6 sm:px-10 py-14 bg-background">
              <div className="w-full max-w-sm lg:max-w-none mb-8">
                <h1 className="font-serif text-2xl sm:text-3xl text-foreground mb-1 text-center lg:text-left">Create an account</h1>
                <p className="text-sm text-muted-foreground text-center lg:text-left">Enter your details below</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-sm lg:max-w-none">
                <div>
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground boty-transition text-sm"
                  />
                </div>

                <div>
                  <input
                    required
                    type="email"
                    placeholder="Email or Phone Number"
                    className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground boty-transition text-sm"
                  />
                </div>

                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground boty-transition text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground boty-transition"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3 rounded-full text-sm tracking-wide hover:bg-primary/90 boty-transition"
                  >
                    Create Account
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 border border-border text-foreground py-3 rounded-full text-sm hover:bg-muted boty-transition"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign up with Google
                  </button>
                </div>
              </form>

              <p className="mt-8 text-sm text-muted-foreground text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-foreground font-medium hover:text-primary boty-transition">
                  Log In
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
