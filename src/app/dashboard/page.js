'use client'
import { useState } from 'react'
import Navbar from '@/components/Layout/Navbar'
import MetricCard from '@/components/dashboard/MetricCard'
import BusinessForm from '@/components/dashboard/BusinessForm'
import AnalysisResult from '@/components/dashboard/AnalysisResult'

export default function Dashboard() {
  const [businessMetrics, setBusinessMetrics] = useState({
    revenue: 0,
    expenses: 0,
    customers: 0
  })
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAnalysis = async (data) => {
    try {
      setLoading(true)
      const response = await fetch('/api/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businessData: data }),
      })

      const result = await response.json()
      setAnalysis(result.analysis)
      setBusinessMetrics({
        revenue: data.revenue,
        expenses: data.expenses,
        customers: data.customers
      })
    } catch (error) {
      console.error('Error:', error)
      alert('Terjadi kesalahan saat menganalisis data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard 
            title="Pendapatan" 
            value={businessMetrics.revenue.toLocaleString()} 
            prefix="Rp " 
          />
          <MetricCard 
            title="Pengeluaran" 
            value={businessMetrics.expenses.toLocaleString()} 
            prefix="Rp " 
          />
          <MetricCard 
            title="Total Pelanggan" 
            value={businessMetrics.customers} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Input Data Bisnis</h2>
            <BusinessForm onSubmit={handleAnalysis} />
          </div>

          {loading ? (
            <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4">Menganalisis data...</p>
              </div>
            </div>
          ) : (
            analysis && <AnalysisResult analysis={analysis} />
          )}
        </div>
      </main>
    </div>
  )
}