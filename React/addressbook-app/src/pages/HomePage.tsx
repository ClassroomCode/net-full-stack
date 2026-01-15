import { Link } from 'react-router-dom'
import { Users, Plus, Search, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 p-12 shadow-2xl shadow-purple-600/30 mb-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZ2NmgtNnYtNmgtNnYtNmg2di02aDZ2Nmg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-display text-white mb-4 text-shadow">
            Welcome to AddressBook
          </h1>
          <p className="text-xl text-purple-100 mb-8 font-light leading-relaxed">
            Your comprehensive customer management solution. Organize, track, and manage all your customer relationships in one powerful platform.
          </p>
          <div className="flex gap-4">
            <Link
              to="/customers"
              className="inline-flex items-center gap-2 bg-white text-violet-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <Users size={20} />
              View Customers
            </Link>
            <Link
              to="/customers/new"
              className="inline-flex items-center gap-2 bg-violet-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold border-2 border-white/30 hover:bg-violet-500/30 transition-all duration-200"
            >
              <Plus size={20} />
              Add New Customer
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="glass rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <Users className="text-white" size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Customer Database</h3>
          <p className="text-slate-600 leading-relaxed">
            Store and manage comprehensive customer information with ease. Access detailed profiles, contact information, and order history.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <Search className="text-white" size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Smart Search</h3>
          <p className="text-slate-600 leading-relaxed">
            Quickly find customers using our powerful search functionality. Filter by name, company, location, or any other criteria.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <TrendingUp className="text-white" size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Order Tracking</h3>
          <p className="text-slate-600 leading-relaxed">
            Monitor customer orders and purchase history. Track order dates, shipping status, and maintain detailed records.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="glass rounded-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-display text-slate-800 mb-6">Quick Start Guide</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-violet-600 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Create Your First Customer</h4>
              <p className="text-slate-600">Click "New Customer" to add customer information including contact details and address.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-violet-600 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Browse Your Database</h4>
              <p className="text-slate-600">Navigate to the Customers page to view all your contacts in an organized, searchable format.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-violet-600 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Manage & Update</h4>
              <p className="text-slate-600">Edit customer details, view order history, and maintain up-to-date records with ease.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
