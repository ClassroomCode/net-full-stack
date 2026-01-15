import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-display text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Page Not Found</h2>
          <p className="text-slate-600 text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-violet-600/30 transition-all duration-200 hover:scale-105"
          >
            <Home size={20} />
            Go Home
          </Link>
          <Link
            to="/customers"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg font-semibold border border-slate-300 transition-all duration-200"
          >
            <Search size={20} />
            Browse Customers
          </Link>
        </div>
      </div>
    </div>
  )
}
