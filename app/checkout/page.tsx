"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useCart } from "@/components/boty/cart-context"

const countries = [
  "United States", "United Kingdom", "Canada", "Australia",
  "France", "Germany", "Italy", "Spain", "Netherlands", "Sweden",
]

const provinces: Record<string, string[]> = {
  "United States": ["Alabama","Alaska","Arizona","California","Colorado","Florida","Georgia","Hawaii","Illinois","New York","Texas","Washington"],
  "Canada": ["Alberta","British Columbia","Manitoba","New Brunswick","Ontario","Quebec","Saskatchewan"],
  "United Kingdom": ["England","Scotland","Wales","Northern Ireland"],
  "Australia": ["New South Wales","Queensland","South Australia","Tasmania","Victoria","Western Australia"],
}

type PaymentMethod = "bank_transfer" | "cod"

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const router = useRouter()
  const [country, setCountry] = useState("")
  const [payment, setPayment] = useState<PaymentMethod>("bank_transfer")

  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    clearCart()
    router.push("/success")
  }

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back */}
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground boty-transition mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          {/* Page Header */}
          <div className="mb-10">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block">Secure</span>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-12">

              {/* ── Left: Billing Details ── */}
              <div className="lg:col-span-2 space-y-8">

                {/* Billing Details Card */}
                <div className="bg-card rounded-3xl p-8 boty-shadow">
                  <h2 className="font-serif text-2xl text-foreground mb-6">Billing details</h2>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Jane"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary boty-transition text-sm"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary boty-transition text-sm"
                      />
                    </div>

                    {/* Company */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company Name <span className="text-muted-foreground text-xs">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Acme Inc."
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary boty-transition text-sm"
                      />
                    </div>

                    {/* Country */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Country / Region <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={country}
                          onChange={e => setCountry(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary boty-transition text-sm appearance-none"
                        >
                          <option value="">Select country</option>
                          {countries.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">▾</span>
                      </div>
                    </div>

                    {/* Street Address */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Street Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="123 Blossom Lane"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary boty-transition text-sm"
                      />
                    </div>

                    {/* Town / City */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Town / City <span className="text-destructive">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="New York"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary boty-transition text-sm"
                      />
                    </div>

                    {/* Province */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Province</label>
                      <div className="relative">
                        <select
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary boty-transition text-sm appearance-none"
                        >
                          <option value="">Select province</option>
                          {(provinces[country] ?? []).map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">▾</span>
                      </div>
                    </div>

                    {/* ZIP */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        ZIP Code <span className="text-destructive">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="10001"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary boty-transition text-sm"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone <span className="text-destructive">*</span>
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary boty-transition text-sm"
                      />
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="jane@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary boty-transition text-sm"
                      />
                    </div>

                    {/* Additional Info */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Additional Information
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Notes about your order, e.g. special delivery instructions."
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary boty-transition text-sm resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method Card */}
                <div className="bg-card rounded-3xl p-8 boty-shadow">
                  <h2 className="font-serif text-2xl text-foreground mb-6">Payment Method</h2>

                  <div className="space-y-4">
                    {/* Bank Transfer */}
                    <label className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer boty-transition ${payment === "bank_transfer" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="bank_transfer"
                        checked={payment === "bank_transfer"}
                        onChange={() => setPayment("bank_transfer")}
                        className="mt-0.5 accent-primary"
                      />
                      <div>
                        <p className="font-medium text-foreground text-sm">Direct Bank Transfer</p>
                        {payment === "bank_transfer" && (
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                            Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                          </p>
                        )}
                      </div>
                    </label>

                    {/* COD */}
                    <label className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer boty-transition ${payment === "cod" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={payment === "cod"}
                        onChange={() => setPayment("cod")}
                        className="mt-0.5 accent-primary"
                      />
                      <div>
                        <p className="font-medium text-foreground text-sm">Cash on Delivery</p>
                        {payment === "cod" && (
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                            Pay with cash upon delivery. Make sure you have the exact amount ready.
                          </p>
                        )}
                      </div>
                    </label>
                  </div>

                  <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{" "}
                    <Link href="/" className="text-primary hover:underline">privacy policy</Link>.
                  </p>
                </div>
              </div>

              {/* ── Right: Order Summary ── */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-3xl p-8 boty-shadow sticky top-28">
                  <h2 className="font-serif text-2xl text-foreground mb-6">Your Order</h2>

                  {/* Header row */}
                  <div className="flex justify-between text-xs tracking-wide uppercase text-muted-foreground pb-3 border-b border-border/50 mb-4">
                    <span>Product</span>
                    <span>Subtotal</span>
                  </div>

                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {items.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">Your cart is empty</p>
                    ) : items.map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">× {item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3 text-sm border-t border-border/50 pt-4 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-primary">Add ${(50 - subtotal).toFixed(2)} more for free shipping</p>
                    )}
                    <div className="flex justify-between text-base font-medium text-foreground pt-2 border-t border-border/50">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={items.length === 0}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium text-sm tracking-wide hover:bg-primary/90 boty-transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Place Order
                  </button>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  )
}
