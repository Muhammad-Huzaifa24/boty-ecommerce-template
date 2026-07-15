"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Header } from "@/components/boty/header"

export default function LoginPage() {
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
            <div className="relative hidden lg:block min-h-[520px] bg-secondary/40">
              <Image
                src="/images/hero-model.jpg"
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
                <h1 className="font-serif text-2xl sm:text-3xl text-foreground mb-1 text-center lg:text-left">Log in to Boty</h1>
                <p className="text-sm text-muted-foreground text-center lg:text-left">Enter your details below</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-sm lg:max-w-none">
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

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-primary text-primary-foreground px-10 py-3 rounded-full text-sm tracking-wide hover:bg-primary/90 boty-transition"
                  >
                    Log In
                  </button>
                  <Link href="#" className="text-sm text-primary hover:underline boty-transition text-center sm:text-left">
                    Forgot Password?
                  </Link>
                </div>
              </form>

              <p className="mt-10 text-sm text-muted-foreground text-center">
                Don't have an account?{" "}
                <Link href="/signup" className="text-foreground font-medium hover:text-primary boty-transition">
                  Sign Up
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
