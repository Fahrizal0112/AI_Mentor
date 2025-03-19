import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(request) {
  try {
    const { businessData } = await request.json();
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Sebagai mentor bisnis profesional, berikan analisis bisnis untuk:
    
    Nama Bisnis: ${businessData.name}
    Industri: ${businessData.industry}
    Pendapatan Bulanan: Rp ${businessData.revenue}
    Pengeluaran Bulanan: Rp ${businessData.expenses}
    Jumlah Pelanggan: ${businessData.customers}
    
    Berikan analisis dalam format berikut tanpa menggunakan simbol ## atau ** :

    Analisis Bisnis ${businessData.name}

    1. Ringkasan Kondisi Bisnis:
    [Berikan ringkasan umum kondisi bisnis]

    2. Analisis Keuangan:
    - Laba Bersih: [analisis]
    - Rasio Pengeluaran terhadap Pendapatan: [analisis]
    - Pendapatan per Pelanggan: [analisis]

    3. Metrik Penting:
    [Jelaskan metrik-metrik penting]

    4. Area yang Perlu Ditingkatkan:
    [Identifikasi area improvement]

    5. Rekomendasi Konkret:
    [Berikan rekomendasi spesifik]

    6. Proyeksi dan Target 3 Bulan Kedepan:
    [Berikan proyeksi dan target]

    Berikan analisis yang detail namun mudah dipahami tanpa menggunakan format markdown atau simbol khusus.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ analysis: text });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Gagal menganalisis data' }, 
      { status: 500 }
    );
  }
}
