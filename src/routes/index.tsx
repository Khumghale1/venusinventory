import { createFileRoute, Link } from '@tanstack/react-router'
import { Package, BarChart3, ShoppingCart, TrendingUp, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const features = [
    {
      icon: <Package className="w-12 h-12 text-cyan-400" />,
      title: 'Inventory Management',
      description: 'Track and manage your inventory with ease. Real-time updates and comprehensive reporting.',
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-cyan-400" />,
      title: 'Analytics & Insights',
      description: 'Get detailed insights into your inventory trends, sales patterns, and stock levels.',
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-cyan-400" />,
      title: 'Order Processing',
      description: 'Streamline your order management with automated workflows and tracking.',
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-cyan-400" />,
      title: 'Sales Tracking',
      description: 'Monitor sales performance and identify growth opportunities in real-time.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-cyan-400">Venus Inventory</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Streamline your inventory management with our powerful and intuitive platform.
            Track stock, manage orders, and grow your business effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200 border border-gray-600"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition duration-300 transform hover:scale-105"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your inventory management?
          </h2>
          <p className="text-xl text-cyan-50 mb-8">
            Join thousands of businesses already using Venus Inventory
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-4 bg-white text-cyan-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
