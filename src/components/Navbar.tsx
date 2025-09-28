import { useState } from 'react'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { User, Zap, LogOut, Menu } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'sonner@2.0.3'

interface NavbarProps {
  isDark: boolean
  onThemeToggle: () => void
  onToggleSidebar: () => void
  isSidebarCollapsed: boolean
}

export function Navbar({ isDark, onThemeToggle, onToggleSidebar, isSidebarCollapsed }: NavbarProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const { user, userProfile, login, logout, isAuthenticated } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const result = await login(loginForm.email, loginForm.password)
    
    if (result.success) {
      toast.success('Login successful!')
      setIsLoginOpen(false)
      setLoginForm({ email: '', password: '' })
    } else {
      toast.error(result.error || 'Login failed')
    }
    
    setIsLoading(false)
  }

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      toast.success('Logged out successfully')
    } else {
      toast.error('Logout failed')
    }
  }

  return (
    <nav className="h-16 border-b flex items-center justify-between px-4 sm:px-6 transition-colors duration-200 bg-gradient-to-r from-white via-blue-50 to-white border-blue-200/50 dark:bg-gradient-to-r dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 dark:border-purple-500/30">
      {/* Left side with menu and brand */}
      <div className="flex items-center space-x-3">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-blue-100 dark:hover:bg-purple-800/50"
        >
          <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </Button>
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative">
            <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-cyan-400" />
            <div className="absolute inset-0 h-6 w-6 sm:h-8 sm:w-8 rounded-full blur-md animate-pulse bg-blue-600/20 dark:bg-cyan-400/20" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl tracking-tight text-gray-900 dark:text-white">
              NewsInsight
            </h1>
            <p className="hidden xs:block text-xs text-blue-600/80 dark:text-cyan-400/80">
              Mission Control
            </p>
          </div>
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Theme Switch - Hidden on very small screens */}
        <div className="hidden xs:flex items-center space-x-3">
          <Switch 
            checked={isDark} 
            onCheckedChange={onThemeToggle}
            className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-blue-600"
          />
        </div>

        {/* User Authentication */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm">
                  {userProfile?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm text-gray-900 dark:text-white">
                  {userProfile?.username || user?.email?.split('@')[0]}
                </p>
                {userProfile?.trust_points && (
                  <p className="text-xs text-blue-600 dark:text-cyan-400">
                    {userProfile.trust_points} Trust Points
                  </p>
                )}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="p-2 transition-colors border-red-500/50 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-400/50 dark:text-red-400 dark:hover:bg-red-400/10 dark:hover:text-red-300"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        ) : (
          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="transition-colors border-blue-500/50 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-cyan-400/50 dark:text-cyan-400 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-300"
              >
                <User className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-blue-200 dark:bg-slate-900 dark:border-purple-500/30">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-white">
                  Login to NewsInsight
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-white border-blue-200 text-gray-900 dark:bg-slate-800 dark:border-purple-500/30 dark:text-white"
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-white border-blue-200 text-gray-900 dark:bg-slate-800 dark:border-purple-500/30 dark:text-white"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Demo credentials: demo@newsinsight.com / demo123
                  </p>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </nav>
  )
}