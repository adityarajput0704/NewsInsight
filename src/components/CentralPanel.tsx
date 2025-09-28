import { Card } from './ui/card'
import { Progress } from './ui/progress'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, Shield, AlertTriangle } from 'lucide-react'

const mockData = [
  { time: '00:00', misinformation: 45, verified: 78, total: 123 },
  { time: '04:00', misinformation: 52, verified: 89, total: 141 },
  { time: '08:00', misinformation: 38, verified: 95, total: 133 },
  { time: '12:00', misinformation: 67, verified: 112, total: 179 },
  { time: '16:00', misinformation: 41, verified: 98, total: 139 },
  { time: '20:00', misinformation: 29, verified: 87, total: 116 },
  { time: '24:00', misinformation: 35, verified: 92, total: 127 },
]

const categoriesData = [
  { name: 'Politics', value: 35, color: '#ef4444' },
  { name: 'Health', value: 28, color: '#f97316' },
  { name: 'Sports', value: 15, color: '#eab308' },
  { name: 'Technology', value: 12, color: '#22c55e' },
  { name: 'Others', value: 10, color: '#6366f1' },
]

interface CentralPanelProps {
  isDark: boolean
}

export function CentralPanel({ isDark }: CentralPanelProps) {
  const trustScore = 78.4
  
  return (
    <div className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-y-auto">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-3 sm:p-4 bg-gradient-to-br from-green-100/80 to-green-200/80 border-green-300/50 dark:bg-gradient-to-br dark:from-green-900/50 dark:to-green-800/50 dark:border-green-500/30">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-green-700 dark:text-green-400 truncate">Verified Facts</p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-white">2,847</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-xs text-green-600 dark:text-green-400">+12.3%</span>
              </div>
            </div>
            <Shield className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-600/70 dark:text-green-400/70 flex-shrink-0" />
          </div>
        </Card>

        <Card className="p-3 sm:p-4 bg-gradient-to-br from-red-100/80 to-red-200/80 border-red-300/50 dark:bg-gradient-to-br dark:from-red-900/50 dark:to-red-800/50 dark:border-red-500/30">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-red-700 dark:text-red-400 truncate">Misinformation</p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-white">1,203</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-red-600 dark:text-red-400 flex-shrink-0" />
                <span className="text-xs text-red-600 dark:text-red-400">-8.7%</span>
              </div>
            </div>
            <AlertTriangle className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-red-600/70 dark:text-red-400/70 flex-shrink-0" />
          </div>
        </Card>

        <Card className="p-3 sm:p-4 bg-gradient-to-br from-blue-100/80 to-blue-200/80 border-blue-300/50 dark:bg-gradient-to-br dark:from-blue-900/50 dark:to-blue-800/50 dark:border-blue-500/30">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-400 truncate">Total Analyzed</p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-white">4,050</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-xs text-blue-600 dark:text-blue-400">+5.2%</span>
              </div>
            </div>
            <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-600/70 dark:text-blue-400/70 flex-shrink-0" />
          </div>
        </Card>

        <Card className="p-3 sm:p-4 bg-gradient-to-br from-purple-100/80 to-purple-200/80 border-purple-300/50 dark:bg-gradient-to-br dark:from-purple-900/50 dark:to-purple-800/50 dark:border-purple-500/30">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-400 truncate">Detection Rate</p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-white">94.2%</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <span className="text-xs text-purple-600 dark:text-purple-400">+1.8%</span>
              </div>
            </div>
            <Shield className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-600/70 dark:text-purple-400/70 flex-shrink-0" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Main Chart */}
        <Card className="xl:col-span-2 p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-white/90 to-gray-50/90 border-blue-200/50 dark:bg-gradient-to-br dark:from-slate-900/90 dark:to-slate-800/90 dark:border-purple-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 space-y-2 sm:space-y-0">
            <h3 className="text-base sm:text-lg lg:text-xl text-gray-900 dark:text-white">Misinformation vs Verified Facts</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Misinformation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Verified Facts</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 sm:h-72 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.3)" className="dark:stroke-purple-500/10" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(75, 85, 99, 0.8)"
                  className="dark:stroke-gray-400"
                  fontSize={10}
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  stroke="rgba(75, 85, 99, 0.8)"
                  className="dark:stroke-gray-400"
                  fontSize={10}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(156, 163, 175, 0.3)',
                    borderRadius: '8px',
                    color: '#374151'
                  }}
                  wrapperClassName="dark:!bg-slate-800 dark:!border-purple-500/30 dark:!text-white"
                />
                <Area
                  type="monotone"
                  dataKey="verified"
                  stackId="1"
                  stroke="#10b981"
                  fill="url(#verifiedGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="misinformation"
                  stackId="1"
                  stroke="#ef4444"
                  fill="url(#misinfoGradient)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="verifiedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="misinfoGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Trust Meter */}
        <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-white/90 to-gray-50/90 border-blue-200/50 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900">
          <h3 className="text-base sm:text-lg lg:text-xl mb-4 lg:mb-6 text-gray-900 dark:text-white">Trust Meter</h3>
          
          <div className="space-y-4 lg:space-y-6">
            {/* Overall Trust Score */}
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2 text-blue-600 dark:text-cyan-400">94.2%</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Overall Trust Score</div>
            </div>

            {/* Trust Metrics */}
            <div className="space-y-3 lg:space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Source Reliability</span>
                  <span className="text-xs sm:text-sm text-gray-900 dark:text-white">96%</span>
                </div>
                <Progress 
                  value={96} 
                  className="h-1.5 sm:h-2 bg-gray-200 dark:bg-slate-700"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Fact Verification</span>
                  <span className="text-xs sm:text-sm text-gray-900 dark:text-white">92%</span>
                </div>
                <Progress 
                  value={92} 
                  className="h-1.5 sm:h-2 bg-gray-200 dark:bg-slate-700"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Content Accuracy</span>
                  <span className="text-xs sm:text-sm text-gray-900 dark:text-white">95%</span>
                </div>
                <Progress 
                  value={95} 
                  className="h-1.5 sm:h-2 bg-gray-200 dark:bg-slate-700"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Detection Rate</span>
                  <span className="text-xs sm:text-sm text-gray-900 dark:text-white">94%</span>
                </div>
                <Progress 
                  value={94} 
                  className="h-1.5 sm:h-2 bg-gray-200 dark:bg-slate-700"
                />
              </div>
            </div>

            {/* Trust Level Indicator */}
            <div className="text-center p-2.5 sm:p-3 rounded-lg bg-green-100/80 border border-green-300/50 dark:bg-green-900/30 dark:border-green-500/30">
              <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-green-700 dark:text-green-400">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Highly Trusted</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}