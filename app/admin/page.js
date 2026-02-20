'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Calendar, Clock, MapPin, MessageCircle, RefreshCw } from 'lucide-react'

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/bookings')
      const data = await response.json()
      if (data.success) {
        setBookings(data.bookings)
        setLastRefresh(new Date())
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendWhatsApp = (booking) => {
    const message = `🙏 Jai Shree Ram 🙏

New Booking Request:

Name: ${booking.name}
Phone: ${booking.phone}
Puja: ${booking.service}
Date: ${booking.date || 'Not specified'}
Time: ${booking.time || 'Not specified'}
Address: ${booking.address || 'Not specified'}
Message: ${booking.message || 'None'}

Booking ID: ${booking._id}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/919580758639?text=${encodedMessage}`, '_blank')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Booking Dashboard
              </h1>
              <p className="text-gray-600">
                Pandit Sandesh Tiwari - All Customer Bookings
              </p>
            </div>
            <Button
              onClick={fetchBookings}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          <div className="bg-orange-100 border-l-4 border-orange-600 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              <strong>Last Updated:</strong> {lastRefresh.toLocaleTimeString('en-IN')} • 
              <strong className="ml-2">Total Bookings:</strong> {bookings.length}
            </p>
          </div>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No bookings yet</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <Card key={booking._id} className="border-2 border-orange-200 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-orange-600">
                        {booking.name}
                      </CardTitle>
                      <CardDescription className="text-lg mt-1">
                        {booking.service}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <a href={`tel:${booking.phone}`}>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                      </a>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => sendWhatsApp(booking)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-semibold text-gray-900">{booking.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Preferred Date</p>
                        <p className="font-semibold text-gray-900">
                          {booking.date || 'Not specified'}
                        </p>
                      </div>
                    </div>

                    {booking.time && (
                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Preferred Time</p>
                          <p className="font-semibold text-gray-900">{booking.time}</p>
                        </div>
                      </div>
                    )}

                    {booking.address && (
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-semibold text-gray-900">{booking.address}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {booking.message && (
                    <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Customer Message:</p>
                      <p className="text-gray-900 italic">"{booking.message}"</p>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
                    <span>Booking ID: {booking._id}</span>
                    <span>Received: {formatDate(booking.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
