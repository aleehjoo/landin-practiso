const signals = [
  {
    title: 'Built by hand',
    text: 'No templates, no page builders. I build it by hand so it loads fast on the phones your customers actually use.',
  },
  {
    title: 'You own everything',
    text: "The code, the domain, the content, all in your name. Nothing's held hostage if we stop working together.",
  },
  {
    title: 'Local',
    text: "I'm from here, not some faceless agency abroad. We can meet over coffee. Talk first, money later.",
  },
  {
    title: 'Live in about a week',
    text: 'From a yes to a live site in about a week. Not one of those projects that drags on for months.',
  },
]

export function Trust() {
  return (
    <section className="bg-sand px-6 py-[100px]">
      <div className="mx-auto max-w-[1120px]">
        <h2 className="mb-3 font-serif text-[clamp(28px,4vw,44px)] font-[460] leading-[1.12] tracking-[-0.02em]">
          Why trust a stranger from the internet?
        </h2>
        <p className="mb-14 text-[17px]" style={{ color: 'rgba(13,58,53,.65)' }}>
          Fair question. Here&rsquo;s the honest answer.
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {signals.map((s) => (
            <div
              key={s.title}
              className="rounded-[18px] border bg-cream p-[26px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_-30px_rgba(13,58,53,.4)]"
              style={{ borderColor: 'rgba(177,183,171,.45)' }}
            >
              <h3 className="mb-2 font-serif text-[20px] font-[540] text-ink">{s.title}</h3>
              <p className="text-[15px] leading-[1.55]" style={{ color: 'rgba(13,58,53,.7)' }}>{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 max-w-[720px] rounded-[18px] border-[1.5px] border-dashed p-7" style={{ borderColor: 'rgba(177,183,171,.8)' }}>
          <p className="font-serif text-[17px] italic leading-[1.6]" style={{ color: 'rgba(13,58,53,.5)' }}>
            This is where the first client&rsquo;s real words will go. I&rsquo;m not going to make up testimonials. When
            someone&rsquo;s genuinely happy with what I built, what they actually said lands right here.
          </p>
        </div>
      </div>
    </section>
  )
}
