import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const MONGO_URL = process.env.MONGO_URL
const DB_NAME = process.env.DB_NAME || 'pandit_booking'

let cachedClient = null

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient
  }

  try {
    const client = await MongoClient.connect(MONGO_URL, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000
    })
    cachedClient = client
    return client
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw new Error('Database connection failed')
  }
}

// POST /api/booking - Submit booking form
async function handleBooking(request) {
  try {
    const body = await request.json()
    const { name, phone, email, service, date, message } = body

    // Validation
    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: 'Name, phone, and service are required' },
        { status: 400 }
      )
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
      return NextResponse.json(
        { error: 'Please provide a valid 10-digit phone number' },
        { status: 400 }
      )
    }

    // Email validation (if provided)
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Please provide a valid email address' },
          { status: 400 }
        )
      }
    }

    const client = await connectToDatabase()
    const db = client.db(DB_NAME)
    const bookingsCollection = db.collection('bookings')

    const booking = {
      name,
      phone,
      email: email || null,
      service,
      date: date || null,
      message: message || null,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await bookingsCollection.insertOne(booking)

    return NextResponse.json(
      {
        success: true,
        message: 'Booking request submitted successfully',
        bookingId: result.insertedId
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Failed to process booking request' },
      { status: 500 }
    )
  }
}

// POST /api/reviews - Submit customer review
async function handleReviewSubmit(request) {
  try {
    const body = await request.json()
    const { name, rating, review, service } = body

    // Validation
    if (!name || !rating || !review) {
      return NextResponse.json(
        { error: 'Name, rating, and review are required' },
        { status: 400 }
      )
    }

    // Rating validation
    const ratingNum = parseInt(rating)
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    const client = await connectToDatabase()
    const db = client.db(DB_NAME)
    const reviewsCollection = db.collection('reviews')

    const newReview = {
      name,
      rating: ratingNum,
      review,
      service: service || 'General',
      approved: true, // Auto-approve for now
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await reviewsCollection.insertOne(newReview)

    return NextResponse.json(
      {
        success: true,
        message: 'Review submitted successfully',
        reviewId: result.insertedId
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Review submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    )
  }
}

// GET /api/reviews - Get all approved reviews
async function getReviews() {
  try {
    const client = await connectToDatabase()
    const db = client.db(DB_NAME)
    const reviewsCollection = db.collection('reviews')

    const reviews = await reviewsCollection
      .find({ approved: true })
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray()

    // Format reviews with proper date
    const formattedReviews = reviews.map(review => ({
      id: review._id.toString(),
      name: review.name,
      rating: review.rating,
      review: review.review,
      service: review.service,
      date: review.createdAt.toISOString()
    }))

    return NextResponse.json({
      success: true,
      count: formattedReviews.length,
      reviews: formattedReviews
    })
  } catch (error) {
    console.error('Get reviews error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// GET /api/bookings - Get all bookings (optional admin feature)
async function getBookings() {
  try {
    const client = await connectToDatabase()
    const db = client.db(DB_NAME)
    const bookingsCollection = db.collection('bookings')

    const bookings = await bookingsCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray()

    return NextResponse.json({
      success: true,
      count: bookings.length,
      bookings
    })
  } catch (error) {
    console.error('Get bookings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

// GET /api/ - Health check
async function healthCheck() {
  try {
    const client = await connectToDatabase()
    await client.db(DB_NAME).command({ ping: 1 })
    
    return NextResponse.json({
      success: true,
      message: 'Pandit Booking API is running',
      timestamp: new Date().toISOString(),
      database: 'Connected'
    })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'API is running but database connection failed',
        error: error.message
      },
      { status: 500 }
    )
  }
}

// Main route handler
export async function GET(request) {
  const { pathname } = new URL(request.url)

  // Remove /api prefix
  const path = pathname.replace('/api', '') || '/'

  if (path === '/' || path === '') {
    return healthCheck()
  }

  if (path === '/bookings') {
    return getBookings()
  }

  if (path === '/reviews') {
    return getReviews()
  }

  return NextResponse.json(
    { error: 'Endpoint not found' },
    { status: 404 }
  )
}

export async function POST(request) {
  const { pathname } = new URL(request.url)
  const path = pathname.replace('/api', '') || '/'

  if (path === '/booking') {
    return handleBooking(request)
  }

  if (path === '/review' || path === '/reviews') {
    return handleReviewSubmit(request)
  }

  return NextResponse.json(
    { error: 'Endpoint not found' },
    { status: 404 }
  )
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}