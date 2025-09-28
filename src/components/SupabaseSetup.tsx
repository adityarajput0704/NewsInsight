import { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Alert, AlertDescription } from './ui/alert'
import { CheckCircle, AlertCircle, Database, Users, Shield } from 'lucide-react'

export function SupabaseSetup() {
  const [setupSteps, setSetupSteps] = useState([
    { id: 1, name: 'Create Supabase Project', completed: false, description: 'Set up your Supabase project at supabase.com' },
    { id: 2, name: 'Configure Environment Variables', completed: false, description: 'Add SUPABASE_URL and SUPABASE_ANON_KEY to your environment' },
    { id: 3, name: 'Run Database Schema', completed: false, description: 'Execute the SQL schema to create tables and sample data' },
    { id: 4, name: 'Enable Authentication', completed: false, description: 'Configure email/password authentication in Supabase' },
    { id: 5, name: 'Test Connection', completed: false, description: 'Verify your application can connect to Supabase' }
  ])

  const features = [
    {
      icon: Users,
      title: 'User Authentication',
      description: 'Secure login/logout with user profiles and trust points'
    },
    {
      icon: Database,
      title: 'Real-time Data',
      description: 'Live updates for news feeds, trust metrics, and leaderboards'
    },
    {
      icon: Shield,
      title: 'Data Security',
      description: 'Row-level security and protected user data'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl mb-4 text-gray-900 dark:text-white">
          Supabase Integration Setup
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Follow these steps to connect your NewsInsight dashboard to Supabase for full functionality
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 text-center bg-gradient-to-br from-white/90 to-gray-50/90 border-blue-200/50 dark:bg-gradient-to-br dark:from-slate-800/90 dark:to-slate-900/90 dark:border-purple-500/30">
            <feature.icon className="h-12 w-12 mx-auto mb-4 text-blue-600 dark:text-cyan-400" />
            <h3 className="text-lg mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
          </Card>
        ))}
      </div>

      {/* Setup Steps */}
      <Card className="p-6 bg-gradient-to-br from-white/90 to-gray-50/90 border-blue-200/50 dark:bg-gradient-to-br dark:from-slate-800/90 dark:to-slate-900/90 dark:border-purple-500/30">
        <h2 className="text-xl mb-6 text-gray-900 dark:text-white">Setup Instructions</h2>
        
        <div className="space-y-4">
          {setupSteps.map((step) => (
            <div key={step.id} className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50/50 dark:bg-slate-700/50">
              <div className="flex-shrink-0 mt-1">
                {step.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-400 dark:border-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-white">{step.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Environment Variables */}
      <Card className="p-6 bg-gradient-to-br from-white/90 to-gray-50/90 border-blue-200/50 dark:bg-gradient-to-br dark:from-slate-800/90 dark:to-slate-900/90 dark:border-purple-500/30">
        <h2 className="text-xl mb-4 text-gray-900 dark:text-white">Environment Variables</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Add these environment variables to your project:
        </p>
        
        <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg border">
          <pre className="text-sm text-gray-800 dark:text-gray-200">
{`NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key`}
          </pre>
        </div>
      </Card>

      {/* SQL Schema */}
      <Card className="p-6 bg-gradient-to-br from-white/90 to-gray-50/90 border-blue-200/50 dark:bg-gradient-to-br dark:from-slate-800/90 dark:to-slate-900/90 dark:border-purple-500/30">
        <h2 className="text-xl mb-4 text-gray-900 dark:text-white">Database Schema</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Execute the SQL schema found in <code className="bg-gray-200 dark:bg-slate-700 px-2 py-1 rounded text-sm">/sql/schema.sql</code> in your Supabase SQL editor to create the necessary tables and sample data.
        </p>
        
        <Alert className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            The schema includes sample data for development. In production, you'll want to remove or replace this with real data.
          </AlertDescription>
        </Alert>
      </Card>

      {/* Demo Credentials */}
      <Card className="p-6 bg-gradient-to-br from-green-50/90 to-emerald-50/90 border-green-200/50 dark:bg-gradient-to-br dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-500/30">
        <h2 className="text-xl mb-4 text-gray-900 dark:text-white">Demo Credentials</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Use these credentials to test the login functionality:
        </p>
        
        <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-lg border">
          <p className="text-gray-800 dark:text-gray-200">
            <strong>Email:</strong> demo@newsinsight.com<br />
            <strong>Password:</strong> demo123
          </p>
        </div>
      </Card>
    </div>
  )
}