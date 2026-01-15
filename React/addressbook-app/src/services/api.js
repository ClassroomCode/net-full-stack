const API_BASE_URL = 'http://localhost:5000'

class ApiService {
  async fetchCustomers(offset = 0, limit = 10) {
    const response = await fetch(`${API_BASE_URL}/customer?offset=${offset}&limit=${limit}`)
    if (!response.ok) throw new Error('Failed to fetch customers')
    return response.json()
  }

  async fetchCustomer(id) {
    const response = await fetch(`${API_BASE_URL}/customer/${id}`)
    if (!response.ok) throw new Error('Failed to fetch customer')
    return response.json()
  }

  async createCustomer(customerData) {
    const response = await fetch(`${API_BASE_URL}/customer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData)
    })
    if (!response.ok) throw new Error('Failed to create customer')
    return response
  }

  async updateCustomer(id, customerData) {
    const response = await fetch(`${API_BASE_URL}/customer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData)
    })
    if (!response.ok) throw new Error('Failed to update customer')
    return response
  }

  async deleteCustomer(id) {
    const response = await fetch(`${API_BASE_URL}/customer/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete customer')
    return response
  }
}

export default new ApiService()
