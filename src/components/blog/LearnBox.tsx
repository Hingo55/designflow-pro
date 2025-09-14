export function LearnBox({ items }: { items?: string[] }) {
  if (!items?.length) return null
  
  return (
    <aside className="rounded-xl border border-design4-neutral-200 p-6 bg-white shadow-sm mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 bg-design4-primary/10 rounded flex items-center justify-center">
          <svg className="w-3 h-3 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="font-semibold text-design4-ink text-lg">What you'll learn</h3>
      </div>
      <ul className="list-none space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-design4-primary rounded-full mt-2 flex-shrink-0" />
            <span className="text-design4-neutral-700 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}