"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search, User, Home, Store, Mail, ShoppingCart, Heart, ClipboardList, LogIn, LogOut } from "lucide-react"
import { useCart } from "./cart-context"
import { useWishlist } from "./wishlist-context"

// Simple mock auth state — replace with real auth when available
function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login = () => setIsLoggedIn(true)
  const logout = () => setIsLoggedIn(false)
  return { isLoggedIn, login, logout }
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { setIsOpen, itemCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()
  const { isLoggedIn, logout } = useAuth()

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsUserDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navLinkClass = "text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
  const mobileLinkClass = "flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm tracking-wide text-foreground/70 hover:text-foreground hover:bg-muted boty-transition"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 backdrop-blur-md rounded-lg py-0 my-0 animate-scale-fade-in bg-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.32)]"
        style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px" }}
      >
        <div className="flex items-center justify-between h-[68px]">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground/80 hover:text-foreground boty-transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Nav — Left */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className={navLinkClass}>Home</Link>
            <Link href="/shop" className={navLinkClass}>Shop</Link>
            <Link href="/contact" className={navLinkClass}>Contact Us</Link>
            <Link href="/cart" className={navLinkClass}>Cart</Link>
          </div>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-serif text-3xl tracking-wider text-foreground">Boty</h1>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 text-foreground/70 hover:text-foreground boty-transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User dropdown */}
            <div ref={dropdownRef} className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setIsUserDropdownOpen(v => !v)}
                className="p-2 text-foreground/70 hover:text-foreground boty-transition"
                aria-label="Account menu"
                aria-expanded={isUserDropdownOpen}
              >
                <User className="w-5 h-5" />
              </button>

              {isUserDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-52 bg-background/95 backdrop-blur-md border border-border rounded-2xl boty-shadow py-2 z-50 animate-scale-fade-in"
                >
                  <Link
                    href="/orders"
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-muted boty-transition rounded-xl mx-1"
                  >
                    <ClipboardList className="w-4 h-4 flex-shrink-0" />
                    My Orders
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-muted boty-transition rounded-xl mx-1"
                  >
                    <Heart className="w-4 h-4 flex-shrink-0" />
                    My Wishlist
                    {wishlistCount > 0 && (
                      <span className="ml-auto w-5 h-5 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  <div className="my-1.5 border-t border-border/50 mx-3" />

                  {isLoggedIn ? (
                    <button
                      type="button"
                      onClick={() => { logout(); setIsUserDropdownOpen(false) }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 boty-transition rounded-xl mx-1 text-left"
                      style={{ width: "calc(100% - 8px)" }}
                    >
                      <LogOut className="w-4 h-4 flex-shrink-0" />
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-muted boty-transition rounded-xl mx-1"
                    >
                      <LogIn className="w-4 h-4 flex-shrink-0" />
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-foreground/70 hover:text-foreground boty-transition"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0 -right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden boty-transition ${isMenuOpen ? "max-h-96 pb-6" : "max-h-0"}`}>
          <div className="flex flex-col gap-1 pt-4 border-t border-border/50">
            <Link href="/" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
              <Home className="w-4 h-4 flex-shrink-0" />Home
            </Link>
            <Link href="/shop" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
              <Store className="w-4 h-4 flex-shrink-0" />Shop
            </Link>
            <Link href="/contact" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
              <Mail className="w-4 h-4 flex-shrink-0" />Contact Us
            </Link>
            <Link href="/cart" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
              <ShoppingCart className="w-4 h-4 flex-shrink-0" />Cart
            </Link>

            <div className="my-1 border-t border-border/50 mx-2" />

            <Link href="/orders" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
              <ClipboardList className="w-4 h-4 flex-shrink-0" />My Orders
            </Link>
            <Link href="/wishlist" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
              <Heart className="w-4 h-4 flex-shrink-0" />My Wishlist
              {wishlistCount > 0 && (
                <span className="ml-auto w-5 h-5 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full">{wishlistCount}</span>
              )}
            </Link>

            <div className="my-1 border-t border-border/50 mx-2" />

            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => { logout(); setIsMenuOpen(false) }}
                className="flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 boty-transition w-full text-left"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />Logout
              </button>
            ) : (
              <Link href="/login" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
                <LogIn className="w-4 h-4 flex-shrink-0" />Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
