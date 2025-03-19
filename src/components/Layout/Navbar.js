'use client'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">AI Business Mentor</span>
          </div>
          <div className="flex items-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Profile
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}