"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Sales Manager",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "InsightFlow has transformed how our sales team operates. The AI-powered insights help us prioritize leads and close deals faster than ever before.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Customer Success Lead",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "The automation features have saved our team countless hours on routine tasks. We can now focus on what matters most - building relationships with our customers.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "The predictive analytics in InsightFlow have helped us identify customer trends we would have otherwise missed. It's like having a data scientist on the team.",
  },
]

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const handlePrev = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }

  return (
    <div className="relative max-w-4xl mx-auto px-4">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="border-none shadow-lg bg-white dark:bg-gray-800">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-20 h-20 mb-4 border-4 border-[#6482AD]/20">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-[#6482AD] text-white">
                        <User className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <blockquote className="text-lg mb-6 italic text-gray-700 dark:text-gray-300">
                      "{testimonial.content}"
                    </blockquote>
                    <div>
                      <h4 className="font-bold text-[#6482AD] dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === activeIndex ? "bg-[#6482AD]" : "bg-gray-300 dark:bg-gray-600"
            }`}
            onClick={() => {
              setAutoplay(false)
              setActiveIndex(index)
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800"
        onClick={handlePrev}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-6 w-6 text-[#6482AD]" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800"
        onClick={handleNext}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-6 w-6 text-[#6482AD]" />
      </Button>
    </div>
  )
}

