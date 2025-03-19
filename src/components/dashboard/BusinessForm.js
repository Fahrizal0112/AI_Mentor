'use client'

export default function BusinessForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name'),
      revenue: parseFloat(formData.get('revenue').replace(/\./g, '')),
      expenses: parseFloat(formData.get('expenses').replace(/\./g, '')),
      customers: parseInt(formData.get('customers')),
      industry: formData.get('industry')
    }
    onSubmit(data)
  }

  const formatNumber = (e) => {
    let value = e.target.value.replace(/\./g, '')
    if (value !== '') {
      value = parseInt(value).toLocaleString('id-ID').replace(/,/g, '.')
      e.target.value = value
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-800">Nama Bisnis</label>
        <input
          type="text"
          name="name"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-800">Industri</label>
        <select
          name="industry"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800"
        >
          <option value="">Pilih Industri</option>
          <option value="retail">Retail</option>
          <option value="food">Makanan & Minuman</option>
          <option value="service">Jasa</option>
          <option value="tech">Teknologi</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800">Pendapatan Bulanan (Rp)</label>
        <input
          type="text"
          name="revenue"
          required
          onInput={formatNumber}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800">Pengeluaran Bulanan (Rp)</label>
        <input
          type="text"
          name="expenses"
          required
          onInput={formatNumber}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800">Jumlah Pelanggan</label>
        <input
          type="number"
          name="customers"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Analisis Bisnis
      </button>
    </form>
  )
}