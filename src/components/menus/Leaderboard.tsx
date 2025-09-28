import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Progress } from '../ui/progress'
import { Trophy, Medal, Star, TrendingUp, Shield, Zap } from 'lucide-react'

const topFactCheckers = [
  {
    id: 1,
    name: "Sarah Chen",
    username: "@sarahc_verify",
    rank: 1,
    score: 9847,
    verified: 2156,
    accuracy: 97.8,
    streak: 45,
    badge: "Expert",
    avatar: "SC"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    username: "@mrodriguez_fact",
    rank: 2,
    score: 8923,
    verified: 1834,
    accuracy: 96.2,
    streak: 32,
    badge: "Pro",
    avatar: "MR"
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    username: "@drwatson_truth",
    rank: 3,
    score: 8156,
    verified: 1567,
    accuracy: 98.1,
    streak: 28,
    badge: "Expert",
    avatar: "EW"
  },
  {
    id: 4,
    name: "Alex Kim",
    username: "@alexk_debunk",
    rank: 4,
    score: 7834,
    verified: 1423,
    accuracy: 95.7,
    streak: 22,
    badge: "Advanced",
    avatar: "AK"
  },
  {
    id: 5,
    name: "Jordan Smith",
    username: "@jsmith_verify",
    rank: 5,
    score: 7234,
    verified: 1289,
    accuracy: 94.3,
    streak: 18,
    badge: "Advanced",
    avatar: "JS"
  }
]

const organizations = [
  {
    id: 1,
    name: "Global Fact Alliance",
    verified: 15647,
    accuracy: 98.9,
    members: 234,
    rank: 1
  },
  {
    id: 2,
    name: "Truth Network",
    verified: 12458,
    accuracy: 97.2,
    members: 189,
    rank: 2
  },
  {
    id: 3,
    name: "Verify Coalition",
    verified: 9876,
    accuracy: 96.8,
    members: 156,
    rank: 3
  }
]

export function Leaderboard({ isDark }: { isDark: boolean }) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-400" />
      case 2: return <Medal className="h-6 w-6 text-gray-400" />
      case 3: return <Medal className="h-6 w-6 text-orange-400" />
      default: return <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs text-white">{rank}</div>
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Expert': return 'bg-purple-600'
      case 'Pro': return 'bg-blue-600'
      case 'Advanced': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Trophy className="h-8 w-8 text-blue-600 dark:text-cyan-400" />
        <div>
          <h1 className="text-2xl text-gray-900 dark:text-white">Leaderboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Top fact-checkers and organizations battling misinformation</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-yellow-100/80 to-yellow-200/80 dark:from-yellow-900/50 dark:to-yellow-800/50 border-yellow-300/50 dark:border-yellow-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Total Verifications</p>
              <p className="text-2xl text-gray-900 dark:text-white">47.2K</p>
            </div>
            <Shield className="h-8 w-8 text-yellow-600/70 dark:text-yellow-400/70" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-100/80 to-blue-200/80 dark:from-blue-900/50 dark:to-blue-800/50 border-blue-300/50 dark:border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Active Checkers</p>
              <p className="text-2xl text-gray-900 dark:text-white">1,847</p>
            </div>
            <Star className="h-8 w-8 text-blue-600/70 dark:text-blue-400/70" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-100/80 to-green-200/80 dark:from-green-900/50 dark:to-green-800/50 border-green-300/50 dark:border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 dark:text-green-400">Avg Accuracy</p>
              <p className="text-2xl text-gray-900 dark:text-white">96.4%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600/70 dark:text-green-400/70" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-100/80 to-purple-200/80 dark:from-purple-900/50 dark:to-purple-800/50 border-purple-300/50 dark:border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-400">This Month</p>
              <p className="text-2xl text-gray-900 dark:text-white">12.8K</p>
            </div>
            <Zap className="h-8 w-8 text-purple-600/70 dark:text-purple-400/70" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Individual Leaderboard */}
        <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-slate-900/90 dark:to-slate-800/90 border-blue-200/50 dark:border-purple-500/30">
          <h3 className="text-xl text-gray-900 dark:text-white mb-6">Top Fact-Checkers</h3>
          <div className="space-y-4">
            {topFactCheckers.map((checker) => (
              <div key={checker.id} className="flex items-center p-4 bg-gray-100/50 dark:bg-slate-800/50 rounded-lg border border-blue-200/30 dark:border-purple-500/20">
                <div className="flex items-center space-x-4 flex-1">
                  {getRankIcon(checker.rank)}
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-purple-600 dark:to-cyan-600 text-white">
                      {checker.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-gray-900 dark:text-white">{checker.name}</h4>
                      <Badge className={getBadgeColor(checker.badge)}>
                        {checker.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{checker.username}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-lg text-blue-600 dark:text-cyan-400">{checker.score.toLocaleString()}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Score</p>
                  </div>
                  <div>
                    <p className="text-lg text-green-600 dark:text-green-400">{checker.accuracy}%</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Accuracy</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Organizations */}
        <Card className="p-6 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-slate-900/90 dark:to-slate-800/90 border-blue-200/50 dark:border-purple-500/30">
          <h3 className="text-xl text-gray-900 dark:text-white mb-6">Top Organizations</h3>
          <div className="space-y-4">
            {organizations.map((org) => (
              <div key={org.id} className="p-4 bg-gray-100/50 dark:bg-slate-800/50 rounded-lg border border-blue-200/30 dark:border-purple-500/20">
                <div className="flex items-center space-x-3 mb-3">
                  {getRankIcon(org.rank)}
                  <h4 className="text-gray-900 dark:text-white flex-1">{org.name}</h4>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Verified</span>
                    <span className="text-blue-600 dark:text-cyan-400">{org.verified.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Accuracy</span>
                    <span className="text-green-600 dark:text-green-400">{org.accuracy}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Members</span>
                    <span className="text-purple-600 dark:text-purple-400">{org.members}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Your Stats */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-purple-900/50 dark:to-cyan-900/50 border border-blue-200/50 dark:border-purple-500/30 rounded-lg">
            <h4 className="text-gray-900 dark:text-white mb-3">Your Performance</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Current Rank</span>
                <span className="text-yellow-600 dark:text-yellow-400">#47</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Score</span>
                <span className="text-blue-600 dark:text-cyan-400">2,847</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Accuracy</span>
                <span className="text-green-600 dark:text-green-400">92.1%</span>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Next Rank Progress</span>
                  <span className="text-gray-900 dark:text-white">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}