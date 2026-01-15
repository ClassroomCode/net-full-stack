import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Edit2, Trash2, Eye, Package, ChevronLeft, ChevronRight, Loader } from 'lucide-react'
import api from '../services/api'
import { Customer } from '../types'

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [offset, setOffset] = useState<number>(0)
  const limit = 12

  useEffect(() => {
    fetchCustomers()
  }, [offset])

  const fetchCustomers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.fetchCustomers(offset, limit)
      setCustomers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer?')) return
    
    try {
      await api.deleteCustomer(id)
      await fetchCustomers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const filteredCustomers = customers.filter(customer => 
    customer.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contactName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.customerID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.country?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 mb-2">
          Customers
        </h1>
        <p className="text-slate-600">Manage your customer database</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 glass border border-red-200 rounded-xl p-4 flex items-center justify-between animate-slide-up">
          <span className="text-red-700">{error}</span>
          <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800">
            ×
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by company, contact, ID, city, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 glass border border-white/20 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-slate-700 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Customer Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader className="animate-spin text-violet-600 mb-4" size={48} />
          <p className="text-slate-600">Loading customers...</p>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="text-center py-20 glass rounded-2xl border border-white/20">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-slate-500" size={32} />
          </div>
          <p className="text-slate-500 text-lg mb-4">No customers found</p>
          <Link
            to="/customers/new"
            className="inline-block text-violet-600 hover:text-violet-700 font-semibold"
          >
            Create your first customer →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCustomers.map((customer, index) => (
            <div
              key={customer.customerID}
              className="glass rounded-2xl border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-800 mb-1 truncate">
                    {customer.companyName || 'Unnamed Company'}
                  </h3>
                  <p className="text-sm text-violet-600 font-mono">{customer.customerID}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-6 min-h-[120px]">
                {customer.contactName && (
                  <div>
                    <span className="font-semibold text-slate-700">Contact:</span>
                    <span className="text-slate-600 ml-2">{customer.contactName}</span>
                  </div>
                )}
                {customer.contactTitle && (
                  <p className="text-slate-600 italic">{customer.contactTitle}</p>
                )}
                {(customer.city || customer.country) && (
                  <div>
                    <span className="font-semibold text-slate-700">Location:</span>
                    <span className="text-slate-600 ml-2">
                      {customer.city}{customer.country ? `, ${customer.country}` : ''}
                    </span>
                  </div>
                )}
                {customer.phone && (
                  <div>
                    <span className="font-semibold text-slate-700">Phone:</span>
                    <span className="text-slate-600 ml-2">{customer.phone}</span>
                  </div>
                )}
                {customer.orders && customer.orders.length > 0 && (
                  <div className="flex items-center gap-2 text-violet-600 mt-3 pt-3 border-t border-slate-200">
                    <Package size={16} />
                    <span className="font-semibold">{customer.orders.length} orders</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-200">
                <Link
                  to={`/customers/${customer.customerID}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                >
                  <Eye size={16} />
                  View
                </Link>
                <Link
                  to={`/customers/${customer.customerID}/edit`}
                  className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg transition-colors duration-200 border border-slate-200"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(customer.customerID)}
                  className="flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 px-4 py-2 rounded-lg transition-colors duration-200 border border-slate-200"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && filteredCustomers.length > 0 && (
        <div className="flex items-center justify-between glass rounded-xl border border-white/20 p-4">
          <button
            onClick={() => setOffset(Math.max(0, offset - limit))}
            disabled={offset === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          <span className="text-slate-600 font-medium">
            Showing {offset + 1} - {Math.min(offset + limit, offset + customers.length)}
          </span>
          <button
            onClick={() => setOffset(offset + limit)}
            disabled={customers.length < limit}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
