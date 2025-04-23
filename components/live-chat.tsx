"use client"

import type React from "react"

import { useState } from "react"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi there! How can I help you today?", isUser: false },
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { text: message, isUser: true }])
    setMessage("")

    // Simulate response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thanks for your message! Our team will get back to you shortly.",
          isUser: false,
        },
      ])
    }, 1000)
  }

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-emerald-800 text-white rounded-full p-4 shadow-lg hover:bg-emerald-700 transition-colors"
        aria-label="Open live chat"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
          <div className="bg-emerald-800 text-white p-4 flex justify-between items-center">
            <h3 className="font-medium">Live Chat</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200" aria-label="Close chat">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto max-h-80 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.isUser ? "ml-auto bg-emerald-100 text-emerald-800" : "mr-auto bg-gray-100 text-gray-800"
                } rounded-lg p-3 max-w-[80%]`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="border-t p-4 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-800"
            />
            <Button type="submit" className="rounded-l-none bg-emerald-800 hover:bg-emerald-700">
              Send
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
