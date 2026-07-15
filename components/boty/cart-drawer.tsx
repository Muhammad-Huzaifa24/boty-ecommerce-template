"use client"

import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useCart } from "./cart-context"

export function CartDrawer() {
  const { items, removeItem, updateQuantity, isOpen, setIsOpen, itemCount, subtotal } = useCart()

  const shipping = 0
  const total = subtotal + shipping

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerContent className="h-full">
        <DrawerHeader className="border-b border-border/50 p-6 py-2.5">
          <DrawerTitle className="font-serif text-2xl">Cart</DrawerTitle>
          <DrawerDescription>{itemCount} {itemCount === 1 ? 'item' : 'items'}</DrawerDescription>
        </DrawerHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <DrawerClose asChild>
                <button
                  type="button"
                  className="mt-4 text-primary hover:underline text-sm"
                >
                  Continue Shopping
                </button>
              </DrawerClose>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                  {/* Product Image */}
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    {/* Name + Price row */}
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <h3 className="font-serif text-sm text-foreground font-semibold leading-snug">{item.name}</h3>
                      <span className="font-medium text-foreground text-sm flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <p className="text-muted-foreground text-xs mb-2 truncate">{item.description}</p>

                    {/* Quantity + Remove */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-border rounded-full">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-muted boty-transition rounded-l-full"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-muted boty-transition rounded-r-full"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-muted-foreground hover:text-destructive boty-transition"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <DrawerFooter className="border-t border-border/50 p-6 gap-4">
            {/* Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-medium text-foreground pt-2 border-t border-border/50">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <DrawerClose asChild>
              <Link
                href="/cart"
                className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium hover:bg-primary/90 boty-transition text-center block"
              >
                View Cart
              </Link>
            </DrawerClose>

            <DrawerClose asChild>
              <Link
                href="/checkout"
                className="w-full border border-border text-foreground py-4 rounded-full font-medium hover:bg-muted boty-transition text-center block"
              >
                Checkout
              </Link>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
