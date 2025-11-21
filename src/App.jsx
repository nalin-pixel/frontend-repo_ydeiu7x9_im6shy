import { useState } from 'react'
import Hero from './components/Hero'
import Planner from './components/Planner'
import Showcase from './components/Showcase'

function App() {
  const [result, setResult] = useState(null)

  return (
    <div className="min-h-screen bg-[#0b0f17]">
      {/* Hero with interactive Spline cover */}
      <Hero />

      {/* Planner form */}
      <Planner onGenerated={setResult} />

      {/* Results */}
      <Showcase result={result} />

      {/* Footer */}
      <footer className="bg-[#0b0f17] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/60 text-sm">Itinerix — AI-Powered Travel Assistant</div>
          <a href="/test" className="text-white/60 hover:text-white text-sm">System status</a>
        </div>
      </footer>
    </div>
  )
}

export default App
