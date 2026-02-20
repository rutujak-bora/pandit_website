'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Phone, Mail, MapPin, Star, CheckCircle2, Calendar, Users, Award, Heart, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    title: 'Wedding Puja',
    description: 'Complete Vedic wedding ceremonies with traditional rituals',
    image: 'https://images.pexels.com/photos/36053876/pexels-photo-36053876.jpeg',
    icon: '💑',
    slug: 'wedding-puja'
  },
  {
    title: 'Griha Pravesh',
    description: 'Housewarming ceremonies for new home blessings',
    image: 'https://images.pexels.com/photos/7152003/pexels-photo-7152003.jpeg',
    icon: '🏠',
    slug: 'griha-pravesh'
  },
  {
    title: 'Navratri Puja',
    description: 'Nine-day Durga puja with kalash sthapana',
    image: 'https://images.pexels.com/photos/34473107/pexels-photo-34473107.jpeg',
    icon: '🪔',
    slug: 'navratri-puja'
  },
  {
    title: 'Ganesh Puja',
    description: 'Ganpati sthapana and puja for auspicious beginnings',
    image: 'https://images.pexels.com/photos/33829504/pexels-photo-33829504.jpeg',
    icon: '🙏',
    slug: 'ganesh-puja'
  },
  {
    title: 'Satyanarayan Katha',
    description: 'Sacred katha for prosperity and peace',
    image: 'https://images.pexels.com/photos/8751531/pexels-photo-8751531.jpeg',
    icon: '📿',
    slug: 'satyanarayan-katha'
  },
  {
    title: 'Naamkaran Sanskar',
    description: 'Traditional baby naming ceremony',
    image: 'https://images.pexels.com/photos/35204633/pexels-photo-35204633.jpeg',
    icon: '👶',
    slug: 'naamkaran-sanskar'
  },
  {
    title: 'Vastu Shanti',
    description: 'Vastu correction and peace rituals',
    image: 'https://images.pexels.com/photos/6315702/pexels-photo-6315702.jpeg',
    icon: '🧭',
    slug: 'vastu-shanti'
  },
  {
    title: 'Pitru Paksha Shraddh',
    description: 'Ancestral offerings and tarpan rituals',
    image: 'https://images.pexels.com/photos/34753111/pexels-photo-34753111.jpeg',
    icon: '🕉️',
    slug: 'pitru-paksha-shraddh'
  }
]

const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    text: 'Pandit ji performed our wedding ceremony with utmost devotion. Every ritual was explained beautifully. Highly recommended!',
    rating: 5
  },
  {
    name: 'Priya Sharma',
    location: 'Gurgaon',
    text: 'Very knowledgeable and punctual. The griha pravesh puja was conducted perfectly. Thank you for the wonderful service!',
    rating: 5
  },
  {
    name: 'Amit Verma',
    location: 'Noida',
    text: 'Excellent service for our Navratri puja. Pandit ji is very experienced and guides through each step with patience.',
    rating: 5
  }
]

const faqs = [
  {
    question: 'How do I book a puja?',
    answer: 'You can book a puja by calling us at +91 9876543210, WhatsApp at +91 9876543210, or filling the booking form on this website. We will confirm the booking within 24 hours.'
  },
  {
    question: 'What is the service area?',
    answer: 'We provide services across Delhi NCR including Delhi, Gurgaon, Noida, Faridabad, and Ghaziabad.'
  },
  {
    question: 'Do you provide puja materials?',
    answer: 'Yes, we can arrange all puja materials (samagri) on request. The cost will be added to the service charges based on the requirements.'
  },
  {
    question: 'How much time does a typical puja take?',
    answer: 'It depends on the type of puja. Simple pujas take 1-2 hours, while elaborate ceremonies like weddings can take 3-4 hours. We will provide estimated time during booking.'
  },
  {
    question: 'Can I get consultation for muhurat?',
    answer: 'Yes, Pandit ji provides free muhurat consultation for all bookings. You can discuss auspicious dates and timings during the booking process.'
  },
  {
    question: 'What are the payment methods?',
    answer: 'We accept cash, UPI, bank transfer, and online payment methods. Payment details will be shared after booking confirmation.'
  }
]

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    address: '',
    message: ''
  })
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    review: '',
    service: ''
  })
  const [reviews, setReviews] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [reviewMessage, setReviewMessage] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showReviewForm, setShowReviewForm] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleReviewChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value })
  }

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews')
      const data = await response.json()
      if (data.success) {
        setReviews(data.reviews)
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    setIsSubmittingReview(true)
    setReviewMessage('')

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewForm)
      })

      const data = await response.json()

      if (response.ok) {
        setReviewMessage('Thank you! Your review has been submitted successfully.')
        setReviewForm({ name: '', rating: 5, review: '', service: '' })
        setShowReviewForm(false)
        // Refresh reviews
        fetchReviews()
      } else {
        setReviewMessage(data.error || 'Failed to submit review. Please try again.')
      }
    } catch (error) {
      setReviewMessage('Failed to submit review. Please try again.')
    } finally {
      setIsSubmittingReview(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.service) {
      setSubmitMessage('Please fill in all required fields (Name, Phone, Service)')
      return
    }

    // Format WhatsApp message
    const whatsappMessage = `🙏 Jai Shree Ram 🙏

New Booking Request:

Name: ${formData.name}
Phone: ${formData.phone}
Puja: ${formData.service}
Date: ${formData.date || 'Not specified'}
Time: ${formData.time || 'Not specified'}
Address: ${formData.address || 'Not specified'}
Message: ${formData.message || 'None'}`

    // Encode message
    const encodedMessage = encodeURIComponent(whatsappMessage)
    
    // Create WhatsApp URL - using correct phone number 919580758639
    const whatsappUrl = `https://wa.me/919580758639?text=${encodedMessage}`
    
    // Redirect directly to WhatsApp (most reliable method)
    window.location.href = whatsappUrl
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  const whatsappMessage = encodeURIComponent('Namaste! I would like to book a puja. Please share details.')
  const whatsappLink = `https://wa.me/919876543210?text=${whatsappMessage}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl">
                🕉️
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-orange-600">Pandit Ji Services</h1>
                <p className="text-xs text-gray-600">Delhi NCR</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-orange-600 transition-colors font-medium">About</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Services</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Contact</button>
            </nav>

            <div className="hidden md:flex items-center space-x-3">
              <a href="tel:+919876543210">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`bg-gray-800 h-0.5 w-full transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`bg-gray-800 h-0.5 w-full ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`bg-gray-800 h-0.5 w-full transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-3">
              <button onClick={() => scrollToSection('home')} className="text-left text-gray-700 hover:text-orange-600 transition-colors font-medium">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-left text-gray-700 hover:text-orange-600 transition-colors font-medium">About</button>
              <button onClick={() => scrollToSection('services')} className="text-left text-gray-700 hover:text-orange-600 transition-colors font-medium">Services</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-left text-gray-700 hover:text-orange-600 transition-colors font-medium">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-gray-700 hover:text-orange-600 transition-colors font-medium">Contact</button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1703045199207-5312874d9e54)',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-red-900/80" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Traditional Vedic Puja Services
              <br />
              <span className="text-orange-300">In Delhi NCR</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Experienced Pandit for all Hindu ceremonies • 15+ Years Experience • Authentic Vedic Rituals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Booking
                </Button>
              </a>
              <a href="tel:+919876543210">
                <Button size="lg" variant="outline" className="bg-white text-orange-600 hover:bg-orange-50 border-2 border-white w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#fffaf0" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">5000+</div>
              <div className="text-gray-600">Pujas Performed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Families</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">4.9★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/33362142/pexels-photo-33362142.jpeg"
                  alt="Pandit performing puja"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-6 rounded-xl shadow-xl">
                <div className="text-3xl font-bold">15+ Years</div>
                <div className="text-sm">Experience</div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About <span className="text-orange-600">Pandit Rajesh Sharma</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                A highly qualified and experienced Vedic scholar serving Delhi NCR with authentic traditional Hindu ceremonies and pujas. With deep knowledge of Vedic scriptures and rituals, Pandit ji ensures every ceremony is performed with utmost devotion and authenticity.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Acharya in Vedic Studies</h3>
                    <p className="text-gray-600">Graduated from renowned Sanskrit Vishwavidyalaya</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Karmkand Specialist</h3>
                    <p className="text-gray-600">Expert in all Hindu rituals and ceremonies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Jyotish Acharya</h3>
                    <p className="text-gray-600">Certified in Vedic astrology and muhurat selection</p>
                  </div>
                </div>
              </div>

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                  Book Consultation
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-orange-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Authentic Vedic ceremonies performed with traditional rituals and devotion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link key={index} href={`/services/${service.slug}`}>
                <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-orange-300 cursor-pointer overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-4xl">{service.icon}</div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600">{service.description}</CardDescription>
                  </CardHeader>
                  <div className="px-6 pb-4">
                    <Button variant="outline" size="sm" className="w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                      View Details →
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Need a different puja or ceremony?</p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                Contact for Custom Puja
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-orange-600">Us</span>
            </h2>
            <p className="text-xl text-gray-600">Trusted by thousands for authentic Vedic ceremonies</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Authentic Rituals</h3>
              <p className="text-gray-600">Traditional Vedic ceremonies performed according to ancient scriptures with proper mantras and procedures.</p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Experienced Pandit</h3>
              <p className="text-gray-600">15+ years of experience with thousands of successful ceremonies across Delhi NCR region.</p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">Available for bookings across Delhi NCR with muhurat consultation and timely service.</p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated Service</h3>
              <p className="text-gray-600">Personalized attention to every ceremony with complete guidance and explanations of rituals.</p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Highly Rated</h3>
              <p className="text-gray-600">4.9 star average rating with hundreds of satisfied families across Delhi NCR.</p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Support</h3>
              <p className="text-gray-600">Assistance with puja samagri arrangement and complete ceremonial guidance from start to finish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="text-orange-600">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600">Real experiences from satisfied families</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription className="text-sm">{testimonial.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-orange-600">Gallery</span>
            </h2>
            <p className="text-xl text-gray-600">Moments from our ceremonies</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
              <img src="https://images.pexels.com/photos/36053876/pexels-photo-36053876.jpeg" alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold">Wedding Ceremony</span>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
              <img src="https://images.pexels.com/photos/33829504/pexels-photo-33829504.jpeg" alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold">Ganesh Puja</span>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
              <img src="https://images.pexels.com/photos/34473107/pexels-photo-34473107.jpeg" alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold">Navratri Puja</span>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
              <img src="https://images.pexels.com/photos/31104752/pexels-photo-31104752.jpeg" alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold">Diya Lighting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-orange-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">Everything you need to know</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white border-2 border-orange-100 rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-orange-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact/Booking Form Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Book Your <span className="text-orange-600">Puja</span>
            </h2>
            <p className="text-xl text-gray-600">Fill the form below and we'll contact you shortly</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <a href="tel:+919876543210" className="text-orange-600 hover:underline">+91 9876543210</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">WhatsApp</h4>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">+91 9876543210</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <a href="mailto:contact@panditjiservices.com" className="text-orange-600 hover:underline">contact@panditjiservices.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                    <p className="text-gray-600">Serving across Delhi NCR<br />Delhi, Gurgaon, Noida, Faridabad</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-3">Working Hours</h4>
                <p className="text-gray-700">Available for bookings:</p>
                <p className="text-gray-900 font-semibold">Every Day: 6:00 AM - 9:00 PM</p>
                <p className="text-sm text-gray-600 mt-2">Muhurat consultation available anytime</p>
              </div>
            </div>

            <div>
              <Card className="shadow-xl border-2 border-orange-100">
                <CardHeader>
                  <CardTitle>Booking Form</CardTitle>
                  <CardDescription>Fill in your details and we'll get back to you</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="">Select Puja Type *</option>
                        {services.map((service, index) => (
                          <option key={index} value={service.title}>{service.title}</option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Input
                        type="date"
                        name="date"
                        placeholder="Preferred Date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div>
                      <Input
                        type="time"
                        name="time"
                        placeholder="Preferred Time"
                        value={formData.time}
                        onChange={handleChange}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div>
                      <Textarea
                        name="address"
                        placeholder="Full Address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={2}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Additional Details (Optional)"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>

                    {submitMessage && (
                      <div className={`p-4 rounded-lg ${submitMessage.includes('Redirecting') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                        {submitMessage}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                      size="lg"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-xl">
                  🕉️
                </div>
                <h3 className="text-xl font-bold">Pandit Ji Services</h3>
              </div>
              <p className="text-gray-400">
                Authentic Vedic ceremonies and pujas across Delhi NCR with 15+ years of experience.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-orange-400 transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-orange-400 transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-orange-400 transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-orange-400 transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Popular Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Wedding Puja</li>
                <li>Griha Pravesh</li>
                <li>Navratri Puja</li>
                <li>Ganesh Puja</li>
                <li>Satyanarayan Katha</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+919876543210" className="hover:text-orange-400">+91 9876543210</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>contact@panditjiservices.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Delhi NCR</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Pandit Ji Services. All rights reserved. | Serving Delhi NCR with devotion</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Floating Call Button */}
      <a
        href="tel:+919876543210"
        className="fixed bottom-24 right-6 z-50 bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110"
        aria-label="Call Now"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  )
}