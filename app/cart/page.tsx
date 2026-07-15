"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useCart } from "@/components/boty/cart-context"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, itemCount, subtotal } = useCart()

  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-10">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block">Your</span>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground">Cart</h1>
          </div>

          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-20 h-20 rounded-full bg-card boty-shadow flex items-center justify-center mb-6">
                <ShoppingBag className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h2 className="font-serif text-2xl text-foreground mb-3">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
              <Link
                href="/shop"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-primary/90"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {/* Header Row */}
                <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-4 pb-4 border-b border-border/50 text-sm text-muted-foreground">
                  <span>Product</span>
                  <span className="w-32 text-center">Quantity</span>
                  <span className="w-20 text-right">Price</span>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="grid md:grid-cols-[1fr_auto_auto] gap-4 items-center pb-6 border-b border-border/50">
                    {/* Product */}
                    <div className="flex gap-4 items-center">
                      <Link href={`/product/${item.id}`} className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-muted boty-shadow">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </Link>
                      <div>
                        <Link href={`/product/${item.id}`}>
                          <h3 className="font-serif text-base text-foreground hover:text-primary boty-transition">{item.name}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <p className="text-sm font-medium text-foreground mt-1 md:hidden">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 w-32 justify-center">
                      <div className="flex items-center border border-border rounded-full">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-muted boty-transition rounded-l-full"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-muted boty-transition rounded-r-full"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive boty-transition"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="hidden md:block w-20 text-right">
                      <span className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}

                {/* Clear Cart */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-sm text-muted-foreground hover:text-destructive boty-transition"
                  >
                    Clear cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-3xl p-8 boty-shadow sticky top-28">
                  <h2 className="font-serif text-2xl text-foreground mb-6">Order Summary</h2>

                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-primary">
                        Add ${(50 - subtotal).toFixed(2)} more for free shipping
                      </p>
                    )}
                    <div className="flex justify-between text-base font-medium text-foreground pt-4 border-t border-border/50">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium text-sm tracking-wide hover:bg-primary/90 boty-transition mb-3 block text-center"
                  >
                    Checkout
                  </Link>

                  <Link
                    href="/shop"
                    className="block w-full text-center border border-border text-foreground py-4 rounded-full font-medium text-sm tracking-wide hover:bg-muted boty-transition"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
