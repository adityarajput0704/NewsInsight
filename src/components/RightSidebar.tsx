import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Card } from './ui/card'
import { 
  AlertTriangle, 
  Clock, 
  Eye, 
  MapPin, 
  Users,
  Zap
} from 'lucide-react'

const mockAlerts = [
  {
    id: 1,
    type: 'high',
    title: 'Celebrity Death Hoax',
    location: 'Global',
    engagement: '2.4M',
    time: '2m ago',
    status: 'spreading'
  },
  {
    id: 2,
    type: 'medium',
    title: 'Vaccine Misinformation',
    location: 'North America',
    engagement: '847K',
    time: '12m ago',
    status: 'contained'
  },
  {
    id: 3,
    type: 'low',
    title: 'Election Fraud Claims',
    location: 'Europe',
    engagement: '156K',
    time: '1h ago',
    status: 'monitoring'
  },
  {
    id: 4,
    type: 'high',
    title: 'Deepfake Video',
    location: 'Asia Pacific',
    engagement: '1.8M',
    time: '3h ago',
    status: 'spreading'
  }
]

interface RightSidebarProps {
  isDark: boolean
}

export function RightSidebar({ isDark }: RightSidebarProps) {
  const [alerts] = useState(mockAlerts)
  const [blinkingAlerts, setBlinkingAlerts] = useState<number[]>([])

  useEffect(() => {
    // Make high priority alerts blink
    const highPriorityIds = alerts
      .filter(alert => alert.type === 'high')
      .map(alert => alert.id)
    
    setBlinkingAlerts(highPriorityIds)
  }, [alerts])

  const getAlertColor = (type: string) => {
    if (isDark) {
      switch (type) {
        case 'high': return 'bg-red-900/50 border-red-500/50'
        case 'medium': return 'bg-orange-900/50 border-orange-500/50'
        case 'low': return 'bg-yellow-900/50 border-yellow-500/50'
        default: return 'bg-gray-900/50 border-gray-500/50'
      }
    } else {
      switch (type) {
        case 'high': return 'bg-red-100/80 border-red-300/50'
        case 'medium': return 'bg-orange-100/80 border-orange-300/50'
        case 'low': return 'bg-yellow-100/80 border-yellow-300/50'
        default: return 'bg-gray-100/80 border-gray-300/50'
      }
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'spreading': return <Zap className="h-3 w-3 text-red-400" />
      case 'contained': return <Eye className="h-3 w-3 text-orange-400" />
      case 'monitoring': return <Clock className="h-3 w-3 text-yellow-400" />
      default: return null
    }
  }

  return (
    <div className={`w-72 xl:w-80 border-l h-full flex flex-col transition-colors duration-200 ${
      isDark 
        ? 'bg-gradient-to-b from-slate-900 to-slate-800 border-purple-500/30' 
        : 'bg-gradient-to-b from-white to-gray-50 border-blue-200/50'
    }`}>
      {/* Header */}
      <div className={`p-3 xl:p-4 border-b ${
        isDark ? 'border-purple-500/20' : 'border-blue-200/30'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 xl:h-5 xl:w-5 text-red-400" />
            <h3 className={`text-sm xl:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>Live Alerts</h3>
          </div>
          <Badge variant="destructive" className="bg-red-600 text-white animate-pulse text-xs">
            {alerts.filter(a => a.type === 'high').length} High
          </Badge>
        </div>
      </div>

      {/* Alerts List */}
      <div className="flex-1 p-3 xl:p-4 space-y-2 xl:space-y-3 overflow-y-auto">
        {alerts.map((alert) => (
          <Card 
            key={alert.id}
            className={`p-2 xl:p-3 ${getAlertColor(alert.type)} transition-all duration-300 ${
              blinkingAlerts.includes(alert.id) ? 'animate-pulse' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-1 xl:mb-2">
              <h4 className={`text-xs xl:text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{alert.title}</h4>
              <div className="flex items-center space-x-1">
                {getStatusIcon(alert.status)}
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    alert.type === 'high' ? 'border-red-400 text-red-400' :
                    alert.type === 'medium' ? 'border-orange-400 text-orange-400' :
                    'border-yellow-400 text-yellow-400'
                  }`}
                >
                  {alert.type.toUpperCase()}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className={`flex items-center space-x-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <MapPin className="h-3 w-3" />
                  <span>{alert.location}</span>
                </div>
                <div className={`flex items-center space-x-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Users className="h-3 w-3" />
                  <span>{alert.engagement}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className={`${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{alert.time}</span>
                <span className={`capitalize ${
                  alert.status === 'spreading' ? 'text-red-400' :
                  alert.status === 'contained' ? 'text-orange-400' :
                  'text-yellow-400'
                }`}>
                  {alert.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer Stats */}
      <div className={`p-3 xl:p-4 border-t ${
        isDark ? 'border-purple-500/20' : 'border-blue-200/30'
      }`}>
        <div className="grid grid-cols-2 gap-3 xl:gap-4 text-center">
          <div>
            <p className={`text-base xl:text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>24</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Active Alerts</p>
          </div>
          <div>
            <p className={`text-base xl:text-lg ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>94.2%</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Detection Rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}