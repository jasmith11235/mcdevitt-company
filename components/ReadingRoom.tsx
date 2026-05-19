interface NewsItem {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  externalUrl?: string
}

export default function ReadingRoom({ news }: { news: NewsItem[] }) {
  return (
    <section id="reading-room" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in mb-16">
          <div className="accent-rule mb-6" />
          <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-[#3D9B82] mb-4">Reading Room</h2>
          <p className="text-2xl md:text-3xl font-sans font-light text-[#1D2B45] max-w-2xl">
            Perspectives on retail, place, and the evolving commercial landscape.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item) => (
            <article key={item.slug} className="fade-in group">
              <div className="border-t-[3px] border-[#3D9B82] pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-[#3D9B82]">{item.category}</span>
                  <span className="text-[#1D2B45]/30">|</span>
                  <time className="font-sans text-[10px] tracking-wider text-[#1D2B45]/50">
                    {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </div>
                <h3 className="font-sans text-lg font-medium text-[#1D2B45] mb-3 group-hover:text-[#3D9B82] transition-colors">
                  {item.externalUrl ? (
                    <a href={item.externalUrl} target="_blank" rel="noopener noreferrer">{item.title}</a>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="text-sm text-[#1D2B45]/70 leading-relaxed">{item.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
