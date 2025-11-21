import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] overflow-hidden bg-[#0b0f17]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Gradient overlay for readable text; pointer-events-none so Spline stays interactive */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0f17]/30 via-[#0b0f17]/60 to-[#0b0f17]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-xl">
            Itinerix
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-xl text-white/80">
            AI-powered travel planning that turns your vibe into a day-by-day trip. Share your mood, interests, and pace — get a beautiful, actionable itinerary in seconds.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#plan" className="inline-flex items-center justify-center rounded-xl bg-amber-500 text-black font-semibold px-5 py-3 shadow-lg shadow-amber-500/30 hover:bg-amber-400 transition">
              Plan my trip
            </a>
            <a href="#how" className="inline-flex items-center justify-center rounded-xl bg-white/10 text-white font-semibold px-5 py-3 backdrop-blur hover:bg-white/20 transition">
              How it works
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
