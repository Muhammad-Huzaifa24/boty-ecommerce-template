import Link from "next/link"
import { Check } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center py-32">
        <div className="text-center max-w-sm mx-auto px-6">
          {/* Checkmark circle */}
          <div className="w-20 h-20 rounded-full bg-card boty-shadow flex items-center justify-center mx-auto mb-8">
            <Check className="w-8 h-8 text-foreground" strokeWidth={2} />
          </div>

          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Order Placed!
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-10">
            Thank you for your{" "}
            <span className="text-primary">order</span>. We'll send a confirmation to
            your email shortly.
          </p>

          <Link
            href="/shop"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide hover:bg-primary/90 boty-transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
