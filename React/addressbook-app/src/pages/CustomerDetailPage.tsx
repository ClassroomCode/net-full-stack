import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Edit2, Trash2, Package, Calendar, Truck, Loader } from 'lucide-react'
import api from '../services/api'
import { Customer } from '../types'

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchCustomer()
    }
  }, [id])

  const fetchCustomer = async () => {
    if (!id) return
    
    setLoading(true)
    setError(null)
    try {
      const data = await api.fetchCustomer(id)
      setCustomer(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!id || !confirm('Are you sure you want to delete this customer?')) return
    
    try {
      await api.deleteCustomer(id)
      navigate('/customers')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader className="animate-spin text-violet-600 mb-4" size={48} />
        <p className="text-slate-600">Loading customer details...</p>
      </div>
    )
  }

  if (error || !customer) {
    return (
      <div className="animate-fade-in">
        <div className="glass rounded-2xl border border-red-200 p-8 text-center">
          <p className="text-red-700 mb-4">{error || 'Customer not found'}</p>
          <Link
            to="/customers"
            className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Customers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/customers"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-violet-600 mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Customers
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-display text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 mb-2">
              {customer.companyName || 'Unnamed Company'}
            </h1>
            <p className="text-slate-600 font-mono text-lg">ID: {customer.customerID}</p>
          </div>
          <div className="flex gap-3">
            <Link
              to={`/customers/${customer.customerID}/edit`}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-lg transition-colors duration-200 font-medium shadow-lg shadow-violet-600/30"
            >
              <Edit2 size={18} />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 px-5 py-2.5 rounded-lg transition-colors duration-200 border border-slate-200 font-medium"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="glass rounded-2xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Contact Name</label>
                <p className="mt-1 text-slate-900 text-lg">{customer.contactName || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Contact Title</label>
                <p className="mt-1 text-slate-900 text-lg">{customer.contactTitle || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Phone</label>
                <p className="mt-1 text-slate-900 text-lg">{customer.phone || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Fax</label>
                <p className="mt-1 text-slate-900 text-lg">{customer.fax || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="glass rounded-2xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Address</h2>
            <div className="space-y-3">
              {customer.address && (
                <p className="text-slate-900 text-lg">{customer.address}</p>
              )}
              <div className="flex flex-wrap gap-4 text-slate-700">
                {customer.city && <span className="font-medium">{customer.city}</span>}
                {customer.region && <span>{customer.region}</span>}
                {customer.postalCode && <span className="font-mono">{customer.postalCode}</span>}
              </div>
              {customer.country && (
                <p className="text-slate-900 text-lg font-semibold">{customer.country}</p>
              )}
              {!customer.address && !customer.city && !customer.region && !customer.postalCode && !customer.country && (
                <p className="text-slate-500 italic">No address information available</p>
              )}
            </div>
          </div>

          {/* Orders */}
          {customer.orders && customer.orders.length > 0 && (
            <div className="glass rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Package size={24} />
                Orders ({customer.orders.length})
              </h2>
              <div className="space-y-4">
                {customer.orders.map((order) => (
                  <div
                    key={order.orderID}
                    className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-slate-900 text-lg">Order #{order.orderID}</p>
                      </div>
                      <div className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold">
                        Active
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      {order.orderDate && (
                        <div className="flex items-center gap-2 text-slate-700">
                          <Calendar size={16} className="text-slate-400" />
                          <span className="font-medium">Ordered:</span>
                          <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      {order.shippedDate && (
                        <div className="flex items-center gap-2 text-slate-700">
                          <Truck size={16} className="text-slate-400" />
                          <span className="font-medium">Shipped:</span>
                          <span>{new Date(order.shippedDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="glass rounded-2xl border border-white/20 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Total Orders</span>
                <span className="text-2xl font-bold text-violet-600">
                  {customer.orders?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Customer ID</span>
                <span className="text-sm font-mono text-slate-900">{customer.customerID}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="glass rounded-2xl border border-white/20 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to={`/customers/${customer.customerID}/edit`}
                className="block w-full text-center bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 font-medium"
              >
                Edit Customer
              </Link>
              <button
                onClick={handleDelete}
                className="block w-full text-center bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 px-4 py-2.5 rounded-lg transition-colors duration-200 border border-slate-200 font-medium"
              >
                Delete Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
