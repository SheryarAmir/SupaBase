"use client";

import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Easy Qaida", href: "#qaida" },
    { label: "Qur'an Editions", href: "#editions" },
    { label: "Shorts", href: "#shorts" },
    { label: "Support", href: "#support" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-semibold text-green-600">
                TowardsQuran
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-gray-600 hover:text-green-600 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl font-bold text-balance mb-6">
            Learn Qur'an with <span className="text-green-600">Ease</span>
          </h2>
          <p className="text-xl text-gray-600 text-balance mb-8 leading-relaxed">
            Premium, interactive Qur'anic learning platform. Clean design.
            Offline access. Secure PDFs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
              Start Learning
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg border-gray-300 bg-transparent"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16">
            Why Choose TowardsQuran?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl">📱</span>
              </div>
              <h4 className="text-lg font-semibold mb-3">Install as App</h4>
              <p className="text-gray-600">
                Progressive Web App. Install on any device. Works offline.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">🔒</span>
              </div>
              <h4 className="text-lg font-semibold mb-3">Secure PDFs</h4>
              <p className="text-gray-600">
                Encrypted, watermarked, view-only. No downloads. Full DRM
                protection.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-amber-600 text-xl">🎬</span>
              </div>
              <h4 className="text-lg font-semibold mb-3">YouTube Sync</h4>
              <p className="text-gray-600">
                Auto-synced Shorts, Playlists & Updates. Watch here or on
                YouTube.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-lg border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl">🌍</span>
              </div>
              <h4 className="text-lg font-semibold mb-3">Global & Fast</h4>
              <p className="text-gray-600">
                Lightning-fast worldwide. Handles unlimited traffic. Always
                responsive.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-lg border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">🌐</span>
              </div>
              <h4 className="text-lg font-semibold mb-3">16 Languages</h4>
              <p className="text-gray-600">
                One-click Google Translate. Structure preserved. Instant
                translation.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-lg border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-amber-600 text-xl">🔔</span>
              </div>
              <h4 className="text-lg font-semibold mb-3">
                Smart Notifications
              </h4>
              <p className="text-gray-600">
                Firebase Cloud Messaging. Immediate, Weekly, or Monthly updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section id="qaida" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-6">Easy Qur'an Qaida</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Master the fundamentals with our comprehensive Qaida books. Book 1
            is available now with Indo-Pak and Arabic scripts, plus Teacher's
            Guide in 16 languages. Book 2 coming soon with short Qur'anic
            phrases.
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Explore Qaida
          </Button>
        </div>
      </section>

      {/* Editions Section */}
      <section id="editions" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-6">Qur'an Editions</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Access 8 Qur'an editions now, with 3 more coming soon. Institutional
            access available upon request. All editions are secure, encrypted,
            and optimized for learning.
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            View Editions
          </Button>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-6">Support & Pre-Order</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Support our mission through multiple payment methods. International
            payments via Payoneer, Bank transfers for Pakistan, and WhatsApp
            receipts for transparency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
              <MessageCircle size={20} />
              WhatsApp Support
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 bg-transparent"
            >
              Pre-Order Now
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Have questions? Reach out via WhatsApp, email, or social media.
            We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 justify-center">
              <MessageCircle size={20} />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 bg-transparent"
            >
              Email Us
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 bg-transparent"
            >
              Follow on YouTube
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">TowardsQuran</h4>
              <p className="text-gray-400 text-sm">
                Premium Qur'anic learning platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Easy Qaida
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Editions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Shorts
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 TowardsQuran.org. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
