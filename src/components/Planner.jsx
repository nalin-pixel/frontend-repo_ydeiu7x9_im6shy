import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Planner({ onGenerated }) {
  const [form, setForm] = useState({
    destination: '',
    start_date: '',
    end_date: '',
    travelers: 2,
    budget_level: 'moderate',
    pace: 'balanced',
    mood: '',
    interests: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const payload = {
        destination: form.destination,
        start_date: form.start_date,
        end_date: form.end_date,
        travelers: Number(form.travelers) || 1,
        budget_level: form.budget_level,
        pace: form.pace,
        mood: form.mood.split(',').map(s => s.trim()).filter(Boolean),
        interests: form.interests.split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
        notes: form.notes || undefined
      }

      const res = await fetch(`${API_BASE}/api/itineraries/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      onGenerated?.(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="plan" className="relative bg-[#0b0f17] text-white py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Plan your next trip</h2>
        <p className="text-white/60 mt-2">Tell us your vibe and we’ll craft a day-by-day plan.</p>

        <form onSubmit={submit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Destination" value={form.destination} onChange={e => update('destination', e.target.value)} required />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3" value={form.start_date} onChange={e => update('start_date', e.target.value)} required />
            <input type="date" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3" value={form.end_date} onChange={e => update('end_date', e.target.value)} required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input type="number" min="1" max="12" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="# Travelers" value={form.travelers} onChange={e => update('travelers', e.target.value)} />
            <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-3" value={form.budget_level} onChange={e => update('budget_level', e.target.value)}>
              <option value="shoestring">Shoestring</option>
              <option value="moderate">Moderate</option>
              <option value="luxury">Luxury</option>
            </select>
            <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-3" value={form.pace} onChange={e => update('pace', e.target.value)}>
              <option value="relaxed">Relaxed</option>
              <option value="balanced">Balanced</option>
              <option value="packed">Packed</option>
            </select>
          </div>
          <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Mood keywords (comma separated)" value={form.mood} onChange={e => update('mood', e.target.value)} />
          <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Interests e.g. food, museums, nature" value={form.interests} onChange={e => update('interests', e.target.value)} />
          <textarea rows="3" className="md:col-span-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Notes or constraints (optional)" value={form.notes} onChange={e => update('notes', e.target.value)} />

          <div className="md:col-span-2 flex items-center gap-3">
            <button type="submit" disabled={loading} className="inline-flex items-center rounded-lg bg-amber-500 text-black font-semibold px-5 py-3 shadow-lg shadow-amber-500/30 hover:bg-amber-400 transition disabled:opacity-60">
              {loading ? 'Generating…' : 'Generate Itinerary'}
            </button>
            {error && <span className="text-red-400 text-sm">{error}</span>}
          </div>
        </form>
      </div>
    </section>
  )
}

export default Planner
