import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

interface FloatingChatbotProps {
  isDark: boolean
}

export function FloatingChatbot({ isDark }: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI fact-checking assistant. How can I help you verify information today?',
      timestamp: new Date()
    }
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: 'I\'m analyzing that information for you. Based on my fact-checking algorithms, I can help verify claims, detect deepfakes, and assess source credibility. What specific content would you like me to analyze?',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-16 sm:bottom-20 right-4 sm:right-6 lg:right-80 w-72 sm:w-80 h-80 sm:h-96 flex flex-col backdrop-blur-sm z-50 transition-colors duration-200 ${
          isDark 
            ? 'bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-purple-500/30' 
            : 'bg-gradient-to-br from-white/95 to-gray-50/95 border-blue-200/50'
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-3 sm:p-4 border-b ${
            isDark ? 'border-purple-500/20' : 'border-blue-200/30'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bot className={`h-5 w-5 sm:h-6 sm:w-6 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
                <div className={`absolute inset-0 rounded-full blur-sm animate-pulse ${
                  isDark ? 'bg-cyan-400/30' : 'bg-blue-600/30'
                }`} />
              </div>
              <div>
                <h3 className={`text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>AI Assistant</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className={`${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2 sm:space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
                    msg.type === 'user'
                      ? isDark ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
                      : isDark ? 'bg-slate-700 text-gray-100 border border-purple-500/20' : 'bg-gray-100 text-gray-900 border border-blue-200/50'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className={`p-3 sm:p-4 border-t ${
            isDark ? 'border-purple-500/20' : 'border-blue-200/30'
          }`}>
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me to fact-check..."
                className={`flex-1 text-sm ${
                  isDark 
                    ? 'bg-slate-800 border-purple-500/30 text-white placeholder-gray-400' 
                    : 'bg-white border-blue-200 text-gray-900 placeholder-gray-500'
                }`}
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className={`${
                  isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 lg:right-80 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg z-50 transition-all duration-200 ${
          isDark 
            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-purple-500/25' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-blue-500/25'
        }`}
      >
        <div className="relative">
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse" />
        </div>
      </Button>
    </>
  )
}