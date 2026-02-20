'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Admin credentials
const ADMIN_USERNAME = 'sandeshtiwari20'
const ADMIN_PASSWORD = 'Sandhesh@54321'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Store authentication status
      localStorage.setItem('adminAuth', 'true')
      localStorage.setItem('adminEmail', username)
      
      // Redirect to admin dashboard
      router.push('/admin')
    } else {
      setError('Invalid username or password. Please try again.')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-orange-100 flex items-center justify-center p-4">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-8xl opacity-10 animate-pulse">🕉️</div>
        <div className="absolute bottom-20 right-10 text-8xl opacity-10 animate-pulse">🪔</div>
        <div className="absolute top-1/2 left-1/4 text-6xl opacity-5">🙏</div>
        <div className="absolute top-1/3 right-1/4 text-6xl opacity-5">📿</div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home Link */}
        <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="shadow-2xl border-2 border-orange-200">
          <CardHeader className="text-center bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">🕉️</span>
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription className="text-orange-100">
              Pandit Ji Services Dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8 px-8 pb-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-2 text-orange-600" />
                  Username
                </label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-orange-600" />
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-6 text-lg font-semibold"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Login to Dashboard
                  </>
                )}
              </Button>
            </form>

            {/* Footer Note */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                🔒 Secure Admin Access Only
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Contact administrator if you forgot your credentials
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 Pandit Ji Services. All rights reserved.
        </p>
      </div>
    </div>
  )
}
