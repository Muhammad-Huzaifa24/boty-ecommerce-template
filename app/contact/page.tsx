"use client"

import { useState } from "react"
import { MapPin, Phone, Clock } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          {/* Page Header */}
          <div className="text-center mb-14">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Get In Touch With Us
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
              For more information about our products &amp; services, please feel free to drop us
              an email. Our staff always be there to help you out. Do not hesitate!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left: Contact Info */}
            <div className="space-y-8">
              {/* Address */}
              <div className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-card boty-shadow flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-2">Address</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    235 5th SE Avenue, New York<br />
                    NY10000, United States
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-card boty-shadow flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-2">Phone</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Mobile: +(84) 546-6789<br />
                    Hotline: +(84) 456-6789
                  </p>
                </div>
              </div>

              {/* Working Time */}
              <div className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-card boty-shadow flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-2">Working Time</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Monday–Friday: 9:00 – 22:00<br />
                    Saturday–Sunday: 9:00 – 21:00
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-card rounded-3xl p-8 boty-shadow">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-2">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your name</label>
                    <input
                      required
                      type="text"
                      placeholder="Abc"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary boty-transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email address</label>
                    <input
                      required
                      type="email"
                      placeholder="Abcdefef.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary boty-transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="This is an optional"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary boty-transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Hi! I'd like to ask about..."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary boty-transition text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm tracking-wide hover:bg-primary/90 boty-transition"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
