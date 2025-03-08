"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi there! I'm InsightFlow's AI assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that! Could you provide more details?",
        "That's a great question about InsightFlow. Our CRM offers AI-powered insights to help you manage customer relationships more effectively.",
        "You can get started with InsightFlow by signing up for a free trial. Would you like me to guide you through the process?",
        "InsightFlow's AI features include predictive analytics, automated task management, and intelligent customer segmentation.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }])
    }, 1000)

    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 ${
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-[#6482AD] hover:bg-[#7FA1C3]"
        }`}
        size="icon"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card
          className={`fixed z-40 transition-all duration-300 shadow-xl border border-[#6482AD]/20 ${
            isMinimized ? "bottom-20 right-6 w-72 h-16" : "bottom-24 right-6 w-80 sm:w-96 h-[500px]"
          }`}
        >
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between bg-[#6482AD] text-white">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                <AvatarFallback className="bg-[#7FA1C3] text-white text-xs">AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">InsightFlow Assistant</h3>
                {!isMinimized && <p className="text-xs text-white/80">AI-powered support</p>}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMinimize}
              className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-3 overflow-y-auto h-[calc(500px-120px)] flex flex-col gap-3">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-[#6482AD] text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="p-3 border-t">
                <div className="flex w-full gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} size="icon" className="bg-[#6482AD] hover:bg-[#7FA1C3]">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  )
}

