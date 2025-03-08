import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import TestimonialCarousel from "@/components/testimonial-carousel"
import ChatbotAssistant from "@/components/chatbot-assistant"
import SupportSection from "@/components/support-section"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5EDED] dark:bg-gray-900 flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[#6482AD] flex items-center justify-center">
                <span className="text-white font-bold">IF</span>
              </div>
              <span className="font-bold text-xl text-[#6482AD] dark:text-white">InsightFlow</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm font-medium hover:text-[#6482AD] dark:hover:text-[#7FA1C3] transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/support"
              className="text-sm font-medium hover:text-[#6482AD] dark:hover:text-[#7FA1C3] transition-colors"
            >
              Support
            </Link>
            <Link
              href="/settings"
              className="text-sm font-medium hover:text-[#6482AD] dark:hover:text-[#7FA1C3] transition-colors"
            >
              Settings
            </Link>
            <ThemeToggle />
            <Link
              href="/auth/login"
              className="text-sm font-medium hover:text-[#6482AD] dark:hover:text-[#7FA1C3] transition-colors"
            >
              Login
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-[#6482AD] hover:bg-[#7FA1C3] text-white">Sign Up</Button>
            </Link>
          </nav>

          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Main Banner */}
        <section className="relative py-20 md:py-32 bg-gradient-to-r from-[#6482AD]/10 to-[#7FA1C3]/10 dark:from-[#6482AD]/20 dark:to-[#7FA1C3]/20">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#6482AD] dark:text-white mb-6 animate-fade-in">
              <span className="animate-typing-1 inline-block">Automate,</span>{" "}
              <span className="animate-typing-2 inline-block">Predict</span>{" "}
              <span className="animate-typing-3 inline-block">& Engage Smarter</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
              Transform your customer relationships with AI-powered insights and automation
            </p>
            <Link href="/auth/signup">
              <Button size="lg" className="bg-[#6482AD] hover:bg-[#7FA1C3] text-white">
                Get Started
              </Button>
            </Link>

            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#F5EDED] to-transparent dark:from-gray-900 dark:to-transparent"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#6482AD] dark:text-white">
              Powerful AI-Driven Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#F5EDED] dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#6482AD]/20 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#6482AD]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#6482AD] dark:text-white">AI-Powered Insights</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Leverage machine learning to predict customer behavior and optimize engagement strategies.
                </p>
              </div>

              <div className="bg-[#F5EDED] dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#6482AD]/20 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#6482AD]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#6482AD] dark:text-white">Smart Automation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Automate routine tasks and workflows to save time and reduce manual effort.
                </p>
              </div>

              <div className="bg-[#F5EDED] dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#6482AD]/20 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#6482AD]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#6482AD] dark:text-white">Intelligent Engagement</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Engage with customers at the right time with personalized communications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-[#E2DAD6]/30 dark:bg-gray-900">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#6482AD] dark:text-white">What Our Users Say</h2>
            <TestimonialCarousel />
          </div>
        </section>

        {/* Chatbot Assistant */}
        <ChatbotAssistant />

        {/* Support Section */}
        <SupportSection />
      </main>

      {/* Footer */}
      <footer className="bg-[#6482AD] text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">InsightFlow</h3>
              <p className="text-sm text-white/80">AI-Driven CRM to transform your customer relationships</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-[#E2DAD6] transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#E2DAD6] transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#E2DAD6] transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#E2DAD6] transition-colors">
                    Updates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-[#E2DAD6] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#E2DAD6] transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#E2DAD6] transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#E2DAD6] transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-[#E2DAD6] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#E2DAD6] transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#E2DAD6] transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
            <p>© {new Date().getFullYear()} InsightFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

