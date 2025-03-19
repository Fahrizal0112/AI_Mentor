'use client'

export default function AnalysisResult({ analysis }) {
  if (!analysis) return null

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Hasil Analisis</h2>
      <div className="prose prose-blue max-w-none text-gray-900">
        {analysis.split('\n').map((line, index) => {
          // Jika baris adalah judul bagian (diawali dengan angka dan titik)
          if (/^\d+\./.test(line)) {
            return <h3 key={index} className="font-bold mt-4 mb-2 text-gray-900">{line}</h3>
          }
          // Jika baris kosong, tambahkan spasi
          if (line.trim() === '') {
            return <br key={index} />
          }
          // Baris normal
          return <p key={index} className="mb-2 text-gray-900">{line}</p>
        })}
      </div>
    </div>
  )
}
