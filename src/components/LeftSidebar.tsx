import { useState } from 'react'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { 
  LayoutDashboard, 
  Radio, 
  TrendingUp, 
  Shield, 
  Trophy, 
  MessageCircle, 
  User,
  Menu
} from 'lucide-react'

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'live-news', icon: Radio, label: 'Live News' },
  { id: 'rumor-trends', icon: TrendingUp, label: 'Rumor Trends' },
  { id: 'verify-content', icon: Shield, label: 'Verify Content' },
  { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
  { id: 'chatbot', icon: MessageCircle, label: 'Chatbot' },
  { id: 'profile', icon: User, label: 'User Profile' },
]

interface LeftSidebarProps {
  activeMenu: string
  onMenuChange: (menu: string) => void
  isDark: boolean
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function LeftSidebar({ activeMenu, onMenuChange, isDark, isCollapsed, onToggleCollapse }: LeftSidebarProps) {
  return (
    <div className={`${
      isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-16' : 'w-64'
    } fixed lg:static inset-y-0 left-0 z-50 border-r h-full flex flex-col transition-all duration-300 ease-in-out bg-gradient-to-b from-white to-gray-50 border-blue-200/50 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800 dark:border-purple-500/30`}>
      {/* Hamburger Menu Button */}
      <div className={`p-3 sm:p-4 border-b border-blue-200/30 dark:border-purple-500/20 ${isCollapsed ? 'px-2' : ''}`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className={`${isCollapsed ? 'w-full h-10 p-0 justify-center' : 'w-full h-10 justify-end px-3'} transition-colors text-gray-600 hover:text-gray-900 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-purple-900/50`}
        >
          <div className="flex items-center space-x-2">
            {!isCollapsed && <span className="text-sm font-semibold">Main Menu</span>}
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </Button>
      </div>

      {/* Navigation Menu */}
      <div className={`flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2 ${isCollapsed ? 'px-2' : ''}`}>
        <TooltipProvider>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeMenu === item.id
            
            const buttonContent = (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`${isCollapsed ? 'w-10 h-10 sm:w-12 sm:h-12 p-0' : 'w-full h-10 sm:h-12'} justify-start transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 dark:bg-gradient-to-r dark:from-purple-600 dark:to-cyan-600 dark:shadow-purple-500/25' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-blue-50 border-transparent hover:border-blue-200/50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-purple-900/50 dark:hover:border-purple-500/30'
                }`}
                onClick={() => onMenuChange(item.id)}
              >
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isCollapsed ? '' : 'mr-2 sm:mr-3'} ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-500 dark:text-gray-400'
                }`} />
                {!isCollapsed && (
                  <>
                    <span className="text-sm sm:text-base">{item.label}</span>
                    {isActive && (
                      <div className="absolute right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse bg-blue-400 dark:bg-cyan-400" />
                    )}
                  </>
                )}
              </Button>
            )

            return isCollapsed ? (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  {buttonContent}
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ) : buttonContent
          })}
        </TooltipProvider>
      </div>

      {/* Footer info */}
      {!isCollapsed && (
        <div className="p-3 sm:p-4 border-t border-blue-200/30 dark:border-purple-500/20">
          <div className="text-center">
            <p className="text-xs text-gray-600 dark:text-gray-500">Version 2.1.0</p>
            <p className="text-xs text-gray-600 dark:text-gray-500">Mission Control Active</p>
          </div>
        </div>
      )}
    </div>
  )
}