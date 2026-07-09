const cards = [
  {
    img: '/img/findable.webp',
    alt: 'Hands holding a phone, searching for a place nearby.',
    title: 'Findable',
    text: "Someone searches your name, or just “garden venue near me,” and you show up, with the hours that are actually right.",
  },
  {
    img: '/img/credible.webp',
    alt: 'A beautifully plated dish in warm daylight.',
    title: 'Credible',
    text: 'One look and they can tell this place is real, it’s beautiful, and it’s open. No second-guessing.',
  },
  {
    img: '/img/bookable.webp',
    alt: 'A thumb tapping message on a phone.',
    title: 'Bookable',
    text: 'A question turns into a message, and a message turns into a booking, while they’re still interested.',
  },
]

export function ValueTriad() {
  return (
    <section className="bg-ink px-6 py-[110px] text-cream">
      <div className="mx-auto max-w-[1120px]">
        <h2 className="mb-16 max-w-[22ch] text-balance font-serif text-[clamp(32px,4.6vw,52px)] font-[460] leading-[1.12] tracking-[-0.02em]">
          You don&rsquo;t need more traffic. You need to keep the customers you already earn.
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-7">
          {cards.map((c) => (
            <article
              key={c.title}
              className="group overflow-hidden rounded-[20px] border transition duration-300 hover:-translate-y-1"
              style={{ background: 'rgba(251,246,240,.05)', borderColor: 'rgba(177,183,171,.25)' }}
            >
              <div className="relative h-[165px] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[650ms] ease-out group-hover:scale-[1.06]"
                />
              </div>
              <div className="px-6 pt-6 pb-7">
                <h3 className="mb-[10px] font-serif text-[24px] font-[520]">{c.title}</h3>
                <p className="text-[16px] leading-[1.55] text-sage">{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
