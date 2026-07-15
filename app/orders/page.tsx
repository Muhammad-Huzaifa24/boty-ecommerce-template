"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Package, FileText, CheckCircle2, Clock, Truck, XCircle } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

// ── Dummy Data ──────────────────────────────────────────────
const orders = [
  {
    id: "ORD-2024-001",
    date: "June 28, 2025",
    status: "delivered",
    total: 194,
    shipping: 0,
    items: [
      { id: "radiance-serum", name: "Radiance Serum", description: "Vitamin C brightening formula", price: 68, quantity: 2, image: "/images/products/serum-bottles-1.png" },
      { id: "hydra-cream",    name: "Hydra Cream",    description: "Deep moisture with hyaluronic acid", price: 54, quantity: 1, image: "/images/products/cream-jars-colored.png" },
    ],
    address: { name: "Jane Doe", street: "123 Blossom Lane", city: "New York", zip: "10001", country: "United States" },
    payment: "Direct Bank Transfer",
  },
  {
    id: "ORD-2024-002",
    date: "July 5, 2025",
    status: "processing",
    total: 120,
    shipping: 9.99,
    items: [
      { id: "renewal-oil", name: "Renewal Oil", description: "Nourishing facial oil blend", price: 72, quantity: 1, image: "/images/products/amber-dropper-bottles.png" },
      { id: "glow-serum",  name: "Glow Serum",  description: "Niacinamide brightening boost",   price: 58, quantity: 1, image: "/images/products/spray-bottles.png" },
    ],
    address: { name: "Jane Doe", street: "123 Blossom Lane", city: "New York", zip: "10001", country: "United States" },
    payment: "Cash on Delivery",
  },
  {
    id: "ORD-2024-003",
    date: "July 12, 2025",
    status: "shipped",
    total: 78,
    shipping: 0,
    items: [
      { id: "age-defense-serum", name: "Age Defense Serum", description: "Retinol & peptide complex", price: 78, quantity: 1, image: "/images/products/amber-dropper-bottles.png" },
    ],
    address: { name: "Jane Doe", street: "123 Blossom Lane", city: "New York", zip: "10001", country: "United States" },
    payment: "Direct Bank Transfer",
  },
  {
    id: "ORD-2024-004",
    date: "July 14, 2025",
    status: "cancelled",
    total: 54,
    shipping: 9.99,
    items: [
      { id: "hydra-cream", name: "Hydra Cream", description: "Deep moisture with hyaluronic acid", price: 54, quantity: 1, image: "/images/products/cream-jars-colored.png" },
    ],
    address: { name: "Jane Doe", street: "123 Blossom Lane", city: "New York", zip: "10001", country: "United States" },
    payment: "Cash on Delivery",
  },
]

type Order = typeof orders[0]

// ── Status helpers ──────────────────────────────────────────
const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  delivered:  { label: "Delivered",  color: "bg-emerald-100 text-emerald-700",  icon: CheckCircle2 },
  processing: { label: "Processing", color: "bg-amber-100 text-amber-700",     icon: Clock },
  shipped:    { label: "Shipped",    color: "bg-blue-100 text-blue-700",        icon: Truck },
  cancelled:  { label: "Cancelled",  color: "bg-red-100 text-red-600",          icon: XCircle },
}

// ── Invoice Modal ───────────────────────────────────────────
function InvoiceModal({ order, onClose }: { order: Order; onClose: () => void }) {
  const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0)
  const status = statusConfig[order.status]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-background rounded-3xl boty-shadow w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground boty-transition"
          aria-label="Close invoice"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6 pr-8">
            <div>
              <h2 className="font-serif text-3xl text-foreground mb-1">Invoice</h2>
              <p className="text-sm text-muted-foreground">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="font-serif text-2xl text-foreground">Boty</p>
              <p className="text-xs text-muted-foreground mt-0.5">Natural Skincare</p>
            </div>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="bg-card rounded-2xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Billed To</p>
              <p className="font-medium text-foreground">{order.address.name}</p>
              <p className="text-muted-foreground">{order.address.street}</p>
              <p className="text-muted-foreground">{order.address.city}, {order.address.zip}</p>
              <p className="text-muted-foreground">{order.address.country}</p>
            </div>
            <div className="bg-card rounded-2xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Order Info</p>
              <p className="text-muted-foreground">Date: <span className="text-foreground">{order.date}</span></p>
              <p className="text-muted-foreground mt-1">Payment: <span className="text-foreground">{order.payment}</span></p>
              <p className="text-muted-foreground mt-1">Status:</p>
              <span className={`inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                <status.icon className="w-3 h-3" />
                {status.label}
              </span>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 text-xs uppercase tracking-wide text-muted-foreground pb-2 border-b border-border/50 mb-3">
              <span>Product</span>
              <span className="text-right">Price</span>
              <span className="text-right">Qty</span>
              <span className="text-right">Total</span>
            </div>
            <div className="space-y-3">
              {order.items.map(item => (
                <div key={item.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-3 items-center text-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground leading-tight">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <span className="text-right text-foreground">${item.price}</span>
                  <span className="text-right text-muted-foreground">×{item.quantity}</span>
                  <span className="text-right font-medium text-foreground">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-card rounded-2xl p-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-foreground pt-2 border-t border-border/50">
              <span>Total</span><span>${(subtotal + order.shipping).toFixed(2)}</span>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            Thank you for shopping with Boty. Questions? Contact us at support@boty.com
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ───────────────────────────────────────────────
export default function OrdersPage() {
  const [activeInvoice, setActiveInvoice] = useState<Order | null>(null)

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-10">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block">Account</span>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground">My Orders</h1>
          </div>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-20 h-20 rounded-full bg-card boty-shadow flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h2 className="font-serif text-2xl text-foreground mb-3">No orders yet</h2>
              <p className="text-muted-foreground">Your placed orders will appear here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => {
                const status = statusConfig[order.status]
                const StatusIcon = status.icon
                return (
                  <div key={order.id} className="bg-card rounded-3xl boty-shadow overflow-hidden">
                    {/* Order header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-border/50">
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="font-medium text-foreground">{order.id}</span>
                        <span className="text-muted-foreground">{order.date}</span>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveInvoice(order)}
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 boty-transition font-medium"
                      >
                        <FileText className="w-4 h-4" />
                        View Invoice
                      </button>
                    </div>

                    {/* Items */}
                    <div className="px-6 py-4 space-y-4">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
                            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-serif font-medium text-foreground">{item.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                          </div>
                          <div className="text-right text-sm flex-shrink-0">
                            <p className="font-medium text-foreground">${item.price * item.quantity}</p>
                            <p className="text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-6 py-3 border-t border-border/50 bg-background/50 text-sm">
                      <span className="text-muted-foreground">{order.items.length} {order.items.length === 1 ? "item" : "items"}</span>
                      <span className="font-medium text-foreground">
                        Total: ${(order.items.reduce((s, i) => s + i.price * i.quantity, 0) + order.shipping).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Invoice Modal */}
      {activeInvoice && (
        <InvoiceModal order={activeInvoice} onClose={() => setActiveInvoice(null)} />
      )}
    </main>
  )
}
