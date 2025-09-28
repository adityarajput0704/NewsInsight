import { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Progress } from '../ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { 
  User, 
  Settings, 
  Trophy, 
  Shield, 
  Calendar, 
  MapPin, 
  Mail,
  Edit3,
  Star,
  TrendingUp,
  Award,
  CheckCircle
} from 'lucide-react'

const achievements = [
  { id: 1, name: "First Verification", icon: CheckCircle, earned: true, date: "2024-01-15" },
  { id: 2, name: "Truth Seeker", icon: Shield, earned: true, date: "2024-02-03" },
  { id: 3, name: "Accuracy Expert", icon: Star, earned: true, date: "2024-02-20" },
  { id: 4, name: "Speed Demon", icon: TrendingUp, earned: false, date: null },
  { id: 5, name: "Community Leader", icon: Award, earned: false, date: null },
  { id: 6, name: "Legend", icon: Trophy, earned: false, date: null }
]

const recentActivity = [
  {
    id: 1,
    type: "verification",
    title: "Verified celebrity death hoax as false",
    timestamp: "2 hours ago",
    points: 150
  },
  {
    id: 2,
    type: "report",
    title: "Reported suspicious deepfake video",
    timestamp: "5 hours ago",
    points: 75
  },
  {
    id: 3,
    type: "achievement",
    title: "Earned 'Accuracy Expert' badge",
    timestamp: "1 day ago",
    points: 500
  },
  {
    id: 4,
    type: "verification",
    title: "Fact-checked economic statistics claim",
    timestamp: "2 days ago",
    points: 120
  }
]

export function UserProfile({ isDark }: { isDark: boolean }) {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Jordan Smith",
    username: "jsmith_verify",
    email: "jordan.smith@email.com",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    bio: "Passionate about fighting misinformation and promoting digital literacy."
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <User className="h-8 w-8 text-blue-600 dark:text-cyan-400" />
        <div>
          <h1 className="text-2xl text-gray-900 dark:text-white">User Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account and track your progress</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="p-6 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-slate-900/90 dark:to-slate-800/90 border-blue-200/50 dark:border-purple-500/30">
          <div className="text-center mb-6">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-purple-600 dark:to-cyan-600 text-white text-2xl">
                JS
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl text-gray-900 dark:text-white">{profile.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">@{profile.username}</p>
            <Badge className="mt-2 bg-green-600">Advanced</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm">
              <Mail className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{profile.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{profile.location}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Joined {profile.joinDate}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-blue-200/30 dark:border-purple-500/20">
            <p className="text-sm text-gray-700 dark:text-gray-300">{profile.bio}</p>
          </div>

          <Button 
            variant="outline" 
            className="w-full mt-4 border-blue-500/50 dark:border-purple-500/50 text-blue-600 dark:text-purple-400 hover:bg-blue-50 dark:hover:bg-purple-900/50"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </Card>

        {/* Stats and Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-to-br from-cyan-100/80 to-cyan-200/80 dark:from-cyan-900/50 dark:to-cyan-800/50 border-cyan-300/50 dark:border-cyan-500/30">
              <div className="text-center">
                <p className="text-2xl text-cyan-600 dark:text-cyan-400">2,847</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Score</p>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-green-100/80 to-green-200/80 dark:from-green-900/50 dark:to-green-800/50 border-green-300/50 dark:border-green-500/30">
              <div className="text-center">
                <p className="text-2xl text-green-600 dark:text-green-400">92.1%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-purple-100/80 to-purple-200/80 dark:from-purple-900/50 dark:to-purple-800/50 border-purple-300/50 dark:border-purple-500/30">
              <div className="text-center">
                <p className="text-2xl text-purple-600 dark:text-purple-400">156</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Verified</p>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-orange-100/80 to-orange-200/80 dark:from-orange-900/50 dark:to-orange-800/50 border-orange-300/50 dark:border-orange-500/30">
              <div className="text-center">
                <p className="text-2xl text-orange-600 dark:text-orange-400">#47</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rank</p>
              </div>
            </Card>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-200 dark:bg-slate-800 border border-blue-200/50 dark:border-purple-500/30">
              <TabsTrigger 
                value="activity" 
                className="data-[state=active]:bg-blue-600 dark:data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Recent Activity
              </TabsTrigger>
              <TabsTrigger 
                value="achievements"
                className="data-[state=active]:bg-blue-600 dark:data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Achievements
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="data-[state=active]:bg-blue-600 dark:data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              <Card className="p-6 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-slate-900/90 dark:to-slate-800/90 border-blue-200/50 dark:border-purple-500/30">
                <h3 className="text-lg text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-100/50 dark:bg-slate-800/50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white text-sm">{activity.title}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">{activity.timestamp}</p>
                      </div>
                      <Badge variant="outline" className="border-blue-500/50 dark:border-cyan-500/50 text-blue-600 dark:text-cyan-400">
                        +{activity.points}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <Card className="p-6 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-slate-900/90 dark:to-slate-800/90 border-blue-200/50 dark:border-purple-500/30">
                <h3 className="text-lg text-gray-900 dark:text-white mb-4">Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon
                    return (
                      <div 
                        key={achievement.id} 
                        className={`p-4 rounded-lg border ${
                          achievement.earned 
                            ? 'bg-gradient-to-r from-yellow-100/80 to-yellow-200/80 dark:from-yellow-900/50 dark:to-yellow-800/50 border-yellow-300/50 dark:border-yellow-500/30' 
                            : 'bg-gray-100/50 dark:bg-slate-800/50 border-gray-300/30 dark:border-gray-500/30'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-8 w-8 ${achievement.earned ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-500 dark:text-gray-500'}`} />
                          <div className="flex-1">
                            <h4 className={`${achievement.earned ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                              {achievement.name}
                            </h4>
                            {achievement.earned && achievement.date && (
                              <p className="text-xs text-yellow-600 dark:text-yellow-400">
                                Earned on {new Date(achievement.date).toLocaleDateString()}
                              </p>
                            )}
                            {!achievement.earned && (
                              <p className="text-xs text-gray-500 dark:text-gray-500">Not yet earned</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card className="p-6 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-slate-900/90 dark:to-slate-800/90 border-blue-200/50 dark:border-purple-500/30">
                <h3 className="text-lg text-gray-900 dark:text-white mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Full Name</label>
                    <Input 
                      value={profile.name}
                      className="bg-gray-100 dark:bg-slate-800 border-blue-200/50 dark:border-purple-500/30 text-gray-900 dark:text-white"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Email</label>
                    <Input 
                      value={profile.email}
                      className="bg-gray-100 dark:bg-slate-800 border-blue-200/50 dark:border-purple-500/30 text-gray-900 dark:text-white"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Location</label>
                    <Input 
                      value={profile.location}
                      className="bg-gray-100 dark:bg-slate-800 border-blue-200/50 dark:border-purple-500/30 text-gray-900 dark:text-white"
                      disabled={!isEditing}
                    />
                  </div>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Button className="bg-green-600 hover:bg-green-700">
                        Save Changes
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        className="border-gray-500/50 dark:border-gray-500/50 text-gray-600 dark:text-gray-400"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}