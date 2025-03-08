import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, MessageSquare, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function SupportSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#6482AD] dark:text-white mb-4">Need Help?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our support team and AI assistant are ready to help you with any questions you might have.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-[#6482AD]/20 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-[#6482AD]/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-[#6482AD]" />
              </div>
              <CardTitle className="text-[#6482AD] dark:text-white">Chat Support</CardTitle>
              <CardDescription>Get instant answers from our AI assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-[#6482AD] text-[#6482AD] hover:bg-[#6482AD] hover:text-white"
              >
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="border-[#6482AD]/20 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-[#6482AD]/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-[#6482AD]" />
              </div>
              <CardTitle className="text-[#6482AD] dark:text-white">Email Support</CardTitle>
              <CardDescription>Send us an email and we'll respond within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="mailto:support@insightflow.com">
                <Button
                  variant="outline"
                  className="w-full border-[#6482AD] text-[#6482AD] hover:bg-[#6482AD] hover:text-white"
                >
                  Email Us
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-[#6482AD]/20 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-[#6482AD]/10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-[#6482AD]" />
              </div>
              <CardTitle className="text-[#6482AD] dark:text-white">Phone Support</CardTitle>
              <CardDescription>Speak directly with our customer service team</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="tel:+18001234567">
                <Button
                  variant="outline"
                  className="w-full border-[#6482AD] text-[#6482AD] hover:bg-[#6482AD] hover:text-white"
                >
                  Call Us
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Link href="/support/faq">
            <Button variant="link" className="text-[#6482AD] dark:text-[#7FA1C3]">
              <HelpCircle className="mr-2 h-4 w-4" />
              View Frequently Asked Questions
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

