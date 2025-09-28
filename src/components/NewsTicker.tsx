import { useEffect, useState } from 'react'
import { AlertCircle, TrendingUp } from 'lucide-react'

const mockNews = [
  "BREAKING: AI detection system identifies 847 deepfake videos in last hour",
  "RUMOR ALERT: False claims about vaccine side effects trending on social media",  
  "VERIFIED: Government announces new transparency measures for social platforms",
  "DEVELOPING: Celebrity death hoax spreads rapidly across multiple platforms",
  "FACT-CHECK: Economic data manipulation claims proven false by independent analysis"
]

interface NewsTickerProps {
  isDark: boolean
}

export function NewsTicker({ isDark }: NewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockNews.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`h-8 sm:h-10 border-b flex items-center overflow-hidden transition-colors duration-200 ${
      isDark 
        ? 'bg-gradient-to-r from-red-900/80 via-orange-900/80 to-red-900/80 border-orange-500/30' 
        : 'bg-gradient-to-r from-red-100/80 via-orange-100/80 to-red-100/80 border-orange-300/50'
    }`}>
      <div className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-4 min-w-fit">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <AlertCircle className={`h-3 w-3 sm:h-4 sm:w-4 animate-pulse ${
            isDark ? 'text-red-400' : 'text-red-600'
          }`} />
          <span className={`text-xs sm:text-sm whitespace-nowrap ${
            isDark ? 'text-red-300' : 'text-red-700'
          }`}>LIVE</span>
        </div>
        <div className={`h-3 sm:h-4 w-[1px] ${
          isDark ? 'bg-orange-500/50' : 'bg-orange-400/50'
        }`} />
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div 
          className="animate-marquee whitespace-nowrap flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {mockNews.map((news, index) => (
            <div key={index} className="inline-flex items-center min-w-full px-2 sm:px-4">
              <TrendingUp className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0 ${
                isDark ? 'text-orange-400' : 'text-orange-600'
              }`} />
              <span className={`text-xs sm:text-sm ${
                isDark ? 'text-orange-100' : 'text-orange-800'
              }`}>{news}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}