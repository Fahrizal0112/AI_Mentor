export default function MetricCard({ title, value, prefix = '' }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg text-gray-800 font-medium">{title}</h3>
        <p className="text-2xl text-gray-800 font-bold">{prefix}{value}</p>
      </div>
    )
  }