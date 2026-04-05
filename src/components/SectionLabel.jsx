export default function SectionLabel({ number, label, heading, sub }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-2">
        {number} — {label}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">{heading}</h2>
      {sub && <p className="text-zinc-400 mt-3 max-w-xl">{sub}</p>}
    </div>
  )
}
