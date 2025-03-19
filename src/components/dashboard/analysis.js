import { GoogleGenerativeAI } from "@google/generative-ai";

// Inisialisasi Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method tidak diizinkan' })
    }

    try {
        const { businessData } = req.body
        
        // Dapatkan model Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Buat prompt untuk analisis bisnis
        const prompt = `Sebagai mentor bisnis profesional, tolong analisis data bisnis berikut dan berikan saran yang konkret:
        ${JSON.stringify(businessData)}
        
        Berikan analisis dalam format berikut:
        1. Ringkasan Kondisi Bisnis
        2. Area yang Perlu Perhatian
        3. Rekomendasi Tindakan
        4. Proyeksi Kedepan`;

        // Dapatkan respons dari Gemini
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ 
            analysis: text 
        })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Gagal menganalisis data' })
    }
}