import Link from "next/link";
import { ArrowRight, ShoppingBag, Star, Truck, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: <Truck className="size-5 text-primary" />,
    title: "Fast & Free Shipping",
    description: "Get your orders delivered within 2–3 days on all major routes.",
  },
  {
    icon: <Shield className="size-5 text-primary" />,
    title: "Secure Payments",
    description: "Protected checkout with industry‑standard encryption.",
  },
  {
    icon: <Star className="size-5 text-primary" />,
    title: "Top‑Rated Sellers",
    description: "Only verified merchants with proven track records.",
  },
];

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
  "Groceries",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/80 to-background text-foreground">
      {/* Navbar */}
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <ShoppingBag className="size-5" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">
                SupaCommerce
              </span>
              <span className="text-[11px] text-muted-foreground">
                Supabase powered marketplace
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#categories" className="hover:text-foreground">
              Categories
            </a>
            <a href="#how-it-works" className="hover:text-foreground">
              How it works
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
              <Link href="/signin">Sign in</Link>
            </Button>
            <Button asChild size="sm" className="shadow-sm">
              <Link href="/signup">
                Get started
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6 md:pb-24 md:pt-16">
        {/* Hero */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs text-muted-foreground shadow-sm">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Trusted by modern ecommerce teams
            </div>

            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Launch your marketplace in minutes, not months.
            </h1>
            <p className="mt-4 max-w-xl text-balance text-sm text-muted-foreground sm:text-base">
              Connect buyers and sellers with a fast, secure, and delightful
              shopping experience built on Supabase and modern React tooling.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="gap-2 rounded-full px-6">
                <Link href="/(Auth)/signup">
                  Start as a seller
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 rounded-full border-dashed"
              >
                <Link href="/dashboards/buyer">
                  Browse as buyer
                </Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground sm:text-sm">
              <div className="flex items-center gap-1.5">
                <Star className="size-4 text-amber-500" />
                <span className="font-medium text-foreground">4.9/5</span>
                <span>rating from early users</span>
              </div>
              <span className="hidden h-4 w-px bg-border sm:inline-block" />
              <p>No credit card required to get started.</p>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#e5e7eb_0,_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_#1f2937_0,_transparent_55%)]" />
            <div className="rounded-3xl border bg-background/80 p-4 shadow-lg shadow-black/5 backdrop-blur-sm md:p-6">
              <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  Live store preview
                </span>
                <span>Buyer & Seller dashboards included</span>
              </div>

              <div className="mt-4 grid gap-3 text-xs md:text-sm">
                <div className="flex items-center justify-between rounded-2xl border bg-background/90 px-4 py-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      Buyer view
                    </p>
                    <p className="text-sm font-medium">Discover trending deals</p>
                  </div>
                  <Button asChild size="sm" className="rounded-full px-4 text-xs">
                    <Link href="/dashboards/buyer">Open buyer dashboard</Link>
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-2xl border bg-background/90 px-4 py-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      Seller view
                    </p>
                    <p className="text-sm font-medium">Manage products & orders</p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="rounded-full px-4 text-xs">
                    <Link href="/dashboards/seller">Open seller dashboard</Link>
                  </Button>
                </div>

                <div className="rounded-2xl border border-dashed bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                  Your landing page is fully customizable. Swap out copy, colors,
                  and sections to match your brand while keeping the same
                  production‑ready auth and dashboard structure.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mt-16 scroll-m-16 md:mt-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                Everything you need to run an online marketplace
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                From secure authentication to powerful dashboards, this starter
                gives you a clean, extensible foundation for your ecommerce idea.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="self-start rounded-full border-dashed"
            >
              <Link href="/(Auth)/signup">
                Create your free account
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border bg-background p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mt-3 text-sm font-semibold">{feature.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section
          id="categories"
          className="mt-16 scroll-m-16 rounded-3xl border bg-muted/40 px-5 py-8 md:mt-20 md:px-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                Curated for every customer
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Organize your store into clear categories so buyers can quickly
                find what they love.
              </p>
            </div>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-full border-dashed bg-background/60"
            >
              <Link href="/dashboards/seller">Add your first product</Link>
            </Button>
          </div>

          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3 md:grid-cols-6">
            {categories.map((category) => (
              <div
                key={category}
                className="flex items-center justify-center rounded-full border bg-background px-4 py-2 text-xs font-medium text-muted-foreground shadow-xs hover:text-foreground sm:text-sm"
              >
                {category}
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mt-16 scroll-m-16 md:mt-20">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            Simple for buyers. Powerful for sellers.
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                1. Sign up
              </p>
              <h3 className="mt-2 text-sm font-semibold">Create your account</h3>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                Secure authentication powered by Supabase. Start as a buyer or a
                seller in just a few clicks.
              </p>
            </div>
            <div className="rounded-2xl border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                2. Set up your store
              </p>
              <h3 className="mt-2 text-sm font-semibold">
                Add products & manage orders
              </h3>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                Use the seller dashboard to add inventory, track analytics, and
                stay on top of customer messages.
              </p>
            </div>
            <div className="rounded-2xl border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                3. Start selling
              </p>
              <h3 className="mt-2 text-sm font-semibold">
                Delight your customers
              </h3>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                Buyers get a clean, intuitive shopping experience that keeps them
                coming back.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 md:mt-20">
          <div className="relative overflow-hidden rounded-3xl border bg-primary text-primary-foreground px-6 py-8 md:px-10 md:py-10">
            <div className="absolute inset-y-0 right-0 w-40 rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Ready to launch your ecommerce idea?
                </h2>
                <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
                  Use this starter as the foundation for your next marketplace,
                  SaaS, or storefront. Built with Next.js 15, Supabase, and
                  shadcn/ui.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="rounded-full bg-primary-foreground text-primary px-6"
                >
                  <Link href="/(Auth)/signup">
                    Create a free account
                    <ArrowRight className="ml-1.5 size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="rounded-full border border-primary-foreground/30 bg-primary/10 px-6 text-primary-foreground"
                >
                  <Link href="/dashboards/buyer">Explore the demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
          <p>
            © {new Date().getFullYear()} SupaCommerce. Built with Supabase &
            Next.js.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-foreground">
              How it works
            </a>
            <Link href="/(Auth)/signin" className="hover:text-foreground">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
