import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Save, Loader } from 'lucide-react'
import api from '../services/api'
import { CustomerFormData } from '../types'

export default function EditCustomerPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<CustomerFormData>({
    customerID: '',
    companyName: '',
    contactName: '',
    contactTitle: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    phone: '',
    fax: '',
    orders: []
  })

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
      setFormData({
        customerID: data.customerID,
        companyName: data.companyName,
        contactName: data.contactName || '',
        contactTitle: data.contactTitle || '',
        address: data.address || '',
        city: data.city || '',
        region: data.region || '',
        postalCode: data.postalCode || '',
        country: data.country || '',
        phone: data.phone || '',
        fax: data.fax || '',
        orders: data.orders || []
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!id) return
    
    setSaving(true)
    setError(null)
    
    try {
      await api.updateCustomer(id, formData)
      navigate(`/customers/${id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader className="animate-spin text-violet-600 mb-4" size={48} />
        <p className="text-slate-600">Loading customer...</p>
      </div>
    )
  }

  if (error && !formData.customerID) {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto">
        <div className="glass rounded-2xl border border-red-200 p-8 text-center">
          <p className="text-red-700 mb-4">{error}</p>
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
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          to={`/customers/${id}`}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-violet-600 mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Customer Details
        </Link>
        <h1 className="text-4xl font-display text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 mb-2">
          Edit Customer
        </h1>
        <p className="text-slate-600">Update customer information</p>
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass rounded-2xl border border-white/20 p-8">
        <div className="space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Customer ID
                </label>
                <input
                  type="text"
                  name="customerID"
                  value={formData.customerID}
                  disabled
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg font-mono text-slate-500 cursor-not-allowed"
                />
                <p className="text-xs text-slate-500 mt-1">Customer ID cannot be changed</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter company name"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Contact Name
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter contact name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Contact Title
                </label>
                <input
                  type="text"
                  name="contactTitle"
                  value={formData.contactTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Sales Manager"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Fax
                </label>
                <input
                  type="tel"
                  name="fax"
                  value={formData.fax}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter fax number"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Address Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter street address"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Region
                </label>
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter region/state"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter postal code"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter country"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-slate-200">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 font-semibold shadow-lg shadow-violet-600/30"
          >
            {saving ? (
              <>
                <Loader className="animate-spin" size={20} />
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Changes
              </>
            )}
          </button>
          <Link
            to={`/customers/${id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg transition-colors duration-200 border border-slate-300 font-semibold"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
