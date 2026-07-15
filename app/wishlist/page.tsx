"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useWishlist } from "@/components/boty/wishlist-context"
import { useCart } from "@/components/boty/cart-context"

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block">Saved</span>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground">Wishlist</h1>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-20 h-20 rounded-full bg-card boty-shadow flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h2 className="font-serif text-2xl text-foreground mb-3">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8">Save products you love by clicking the heart icon.</p>
              <Link
                href="/shop"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-primary/90"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-8">{items.length} {items.length === 1 ? "item" : "items"}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item) => (
                  <div key={item.id} className="group bg-card rounded-3xl overflow-hidden boty-shadow">
                    {/* Image */}
                    <Link href={`/product/${item.id}`} className="block relative aspect-square bg-muted overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover boty-transition group-hover:scale-105"
                      />
                      {/* Remove from wishlist */}
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); removeItem(item.id) }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center boty-shadow boty-transition hover:bg-destructive/10"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                      </button>
                    </Link>

                    {/* Info */}
                    <div className="p-5">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-serif text-lg text-foreground mb-1 hover:text-primary boty-transition">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">${item.price}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => addItem({ id: item.id, name: item.name, description: item.description, price: item.price, image: item.image })}
                          className="w-9 h-9 rounded-full bg-primary flex items-center justify-center boty-transition hover:bg-primary/90 boty-shadow"
                          aria-label="Add to cart"
                        >
                          <ShoppingBag className="w-4 h-4 text-primary-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
