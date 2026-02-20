'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Lock, Mail } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Hardcoded credentials (in production, this should be in backend)
    const ADMIN_USERNAME = 'sandesh9580@gmail.com'
    const ADMIN_PASSWORD = 'Ayodhyaji@12345'

    try {
      if (formData.username === ADMIN_USERNAME && formData.password === ADMIN_PASSWORD) {
        // Store session in localStorage (simple approach)
        localStorage.setItem('adminAuth', 'true')
        localStorage.setItem('adminEmail', formData.username)
        
        // Redirect to admin dashboard
        router.push('/admin')
      } else {
        setError('Invalid username or password')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mb-4">
            <span className="text-4xl">🕉️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600">
            Pandit Ji Services - Booking Dashboard
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-2 border-orange-200 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    name="username"
                    placeholder="sandesh9580@gmail.com"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="pl-10 border-orange-200 focus:border-orange-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 border-orange-200 focus:border-orange-400"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-6 text-lg"
              >
                {isLoading ? 'Logging in...' : 'Login to Dashboard'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Protected Area - Authorized Access Only
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="border-orange-600 text-orange-600 hover:bg-orange-50"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
