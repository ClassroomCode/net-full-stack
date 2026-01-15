import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, Users, Plus } from 'lucide-react'

export default function Layout() {
  const location = useLocation()
  
  const isActive = (path: string): boolean => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="glass border-b border-white/20 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-display text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                  AddressBook
                </h1>
                <p className="text-xs text-slate-600 font-medium tracking-wide">CUSTOMER MANAGEMENT</p>
              </div>
            </Link>
            
            <nav className="flex items-center gap-2">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  isActive('/')
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <Home size={18} />
                Home
              </Link>
              <Link
                to="/customers"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  isActive('/customers')
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <Users size={18} />
                Customers
              </Link>
              <Link
                to="/customers/new"
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-lg shadow-violet-600/30 transition-all duration-200 hover:scale-105"
              >
                <Plus size={18} />
                New Customer
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-slate-600 text-sm">
            © 2026 AddressBook. Built with React, Vite & TailwindCSS.
          </p>
        </div>
      </footer>
    </div>
  )
}
