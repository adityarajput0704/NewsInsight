import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Share, 
  Clock, 
  MapPin,
  Users,
  AlertTriangle,
  BarChart3
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const trendingRumors = [
  {
    id: 1,
    title: "Celebrity Death Hoax Spreads Rapidly",
    category: "Entertainment",
    virality: 89,
    engagement: "2.4M",
    trend: "rising",
    regions: ["North America", "Europe"],
    timeframe: "Last 6 hours",
    riskLevel: "high"
  },
  {
    id: 2,
    title: "Fake Economic Data Circulating",
    category: "Politics",
    virality: 67,
    engagement: "1.2M",
    trend: "falling",
    regions: ["Global"],
    timeframe: "Last 12 hours", 
    riskLevel: "medium"
  },
  {
    id: 3,
    title: "Medical Misinformation Campaign",
    category: "Health",
    virality: 78,
    engagement: "890K",
    trend: "rising",
    regions: ["Asia", "Europe"],
    timeframe: "Last 2 hours",
    riskLevel: "high"
  },
  {
    id: 4,
    title: "Technology Conspiracy Theory",
    category: "Technology",
    virality: 45,
    engagement: "456K",
    trend: "stable",
    regions: ["North America"],
    timeframe: "Last 8 hours",
    riskLevel: "low"
  }
]

const viralityData = [
  { time: '00:00', rumors: 12, engagement: 45000 },
  { time: '04:00', rumors: 18, engagement: 67000 },
  { time: '08:00', rumors: 25, engagement: 123000 },
  { time: '12:00', rumors: 32, engagement: 189000 },
  { time: '16:00', rumors: 28, engagement: 156000 },
  { time: '20:00', rumors: 22, engagement: 98000 },
  { time: '24:00', rumors: 19, engagement: 76000 },
]

const categoryData = [
  { name: 'Politics', value: 35, color: '#ef4444' },
  { name: 'Health', value: 28, color: '#f97316' },
  { name: 'Entertainment', value: 20, color: '#eab308' },
  { name: 'Technology', value: 17, color: '#22c55e' },
]

interface RumorTrendsProps {
  isDark: boolean
}

export function RumorTrends({ isDark }: RumorTrendsProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return <TrendingUp className="h-4 w-4 text-red-400" />
      case 'falling': return <TrendingDown className="h-4 w-4 text-green-400" />
      default: return <BarChart3 className="h-4 w-4 text-yellow-400" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-600'
      case 'medium': return 'bg-orange-600'
      case 'low': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <TrendingUp className="h-8 w-8 text-blue-600 dark:text-cyan-400" />
        <div>
          <h1 className="text-2xl text-gray-900 dark:text-white">Rumor Trends</h1>
          <p className="text-gray-600 dark:text-gray-400">Track misinformation patterns and viral content</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-red-100/80 to-red-200/80 dark:from-red-900/50 dark:to-red-800/50 border-red-300/50 dark:border-red-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 dark:text-red-400">Active Rumors</p>
              <p className="text-2xl text-gray-900 dark:text-white">247</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600/70 dark:text-red-400/70" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-orange-100/80 to-orange-200/80 dark:from-orange-900/50 dark:to-orange-800/50 border-orange-300/50 dark:border-orange-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 dark:text-orange-400">Total Engagement</p>
              <p className="text-2xl text-gray-900 dark:text-white">5.2M</p>
            </div>
            <Users className="h-8 w-8 text-orange-600/70 dark:text-orange-400/70" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-100/80 to-purple-200/80 dark:from-purple-900/50 dark:to-purple-800/50 border-purple-300/50 dark:border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-400">Viral Threshold</p>
              <p className="text-2xl text-gray-900 dark:text-white">89%</p>
            </div>
            <Share className="h-8 w-8 text-purple-600/70 dark:text-purple-400/70" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-100/80 to-blue-200/80 dark:from-blue-900/50 dark:to-blue-800/50 border-blue-300/50 dark:border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Detection Rate</p>
              <p className="text-2xl text-gray-900 dark:text-white">94.2%</p>
            </div>
            <Eye className="h-8 w-8 text-blue-600/70 dark:text-blue-400/70" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Virality Chart */}
        <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-slate-900/90 dark:to-slate-800/90 border-blue-200/50 dark:border-purple-500/30">
          <h3 className="text-xl mb-6 text-gray-900 dark:text-white">Rumor Virality Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viralityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(156, 163, 175, 0.8)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="rgba(156, 163, 175, 0.8)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    border: isDark ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '8px',
                    color: isDark ? 'white' : '#1f2937'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="rumors"
                  stroke="#ef4444"
                  fill="url(#rumorGradient)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="rumorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-6 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-slate-900/90 dark:to-slate-800/90 border-blue-200/50 dark:border-purple-500/30">
          <h3 className="text-xl mb-6 text-gray-900 dark:text-white">Categories</h3>
          <div className="h-56 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    border: isDark ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '8px',
                    color: isDark ? 'white' : '#1f2937'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-gray-600 dark:text-gray-300">{category.name}</span>
                </div>
                <span className="text-gray-900 dark:text-white">{category.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Trending Rumors List */}
      <Card className="p-6 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-slate-900/90 dark:to-slate-800/90 border-blue-200/50 dark:border-purple-500/30">
        <h3 className="text-xl mb-6 text-gray-900 dark:text-white">Currently Trending</h3>
        <div className="space-y-4">
          {trendingRumors.map((rumor) => (
            <div key={rumor.id} className="p-4 rounded-lg border bg-gray-100/50 dark:bg-slate-800/50 border-blue-200/30 dark:border-purple-500/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="mb-2 text-gray-900 dark:text-white">{rumor.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <Badge variant="outline" className="border-blue-500/50 dark:border-purple-500/50 text-blue-600 dark:text-purple-400">
                      {rumor.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{rumor.timeframe}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(rumor.trend)}
                  <Badge className={getRiskColor(rumor.riskLevel)}>
                    {rumor.riskLevel.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm mb-1 text-gray-600 dark:text-gray-400">Virality Score</p>
                  <Progress value={rumor.virality} className="h-2" />
                  <p className="text-sm mt-1 text-gray-900 dark:text-white">{rumor.virality}%</p>
                </div>
                <div>
                  <p className="text-sm mb-1 text-gray-600 dark:text-gray-400">Engagement</p>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{rumor.engagement}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm mb-1 text-gray-600 dark:text-gray-400">Regions</p>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-white">{rumor.regions.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}