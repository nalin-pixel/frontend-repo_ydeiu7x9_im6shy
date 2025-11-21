function GroupByDay({ items = [] }) {
  const byDay = items.reduce((acc, item) => {
    acc[item.day] = acc[item.day] || []
    acc[item.day].push(item)
    return acc
  }, {})

  const dayKeys = Object.keys(byDay).sort((a, b) => Number(a) - Number(b))

  return (
    <div className="space-y-6">
      {dayKeys.map((day) => (
        <div key={day} className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="font-semibold text-white/90">Day {day}</div>
          <ul className="mt-2 space-y-2">
            {byDay[day].map((it, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-400" />
                <div>
                  <div className="text-white">{it.title}</div>
                  <div className="text-white/60 text-sm">{it.time_of_day} • {it.category}</div>
                  <div className="text-white/60 text-sm">{it.description}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function Showcase({ result }) {
  if (!result) return null
  const { itinerary } = result
  return (
    <section className="bg-[#0b0f17] text-white py-12 md:py-16" id="results">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{itinerary.destination_emoji || '✈️'}</span>
          <h3 className="text-2xl md:text-3xl font-semibold">{itinerary.name}</h3>
        </div>
        {itinerary.summary && (
          <p className="text-white/70 mt-2">{itinerary.summary}</p>
        )}

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GroupByDay items={itinerary.items} />
          </div>
          <aside className="lg:col-span-1 bg-white/5 border border-white/10 rounded-xl p-4 h-max">
            <div className="font-semibold">Trip inputs</div>
            <div className="mt-2 text-sm text-white/70 space-y-1">
              <div><span className="text-white/60">Destination:</span> {itinerary.preference.destination}</div>
              <div><span className="text-white/60">Dates:</span> {itinerary.preference.start_date} → {itinerary.preference.end_date}</div>
              <div><span className="text-white/60">Travelers:</span> {itinerary.preference.travelers}</div>
              <div><span className="text-white/60">Budget:</span> {itinerary.preference.budget_level}</div>
              <div><span className="text-white/60">Pace:</span> {itinerary.preference.pace}</div>
              {itinerary.preference.mood?.length > 0 && (
                <div><span className="text-white/60">Mood:</span> {itinerary.preference.mood.join(', ')}</div>
              )}
              {itinerary.preference.interests?.length > 0 && (
                <div><span className="text-white/60">Interests:</span> {itinerary.preference.interests.join(', ')}</div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Showcase
