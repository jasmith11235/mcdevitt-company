interface OurStoryProps {
  heading: string
  foundedYear: string
  intro: string
  mission: string
  vision: string
  capabilities: string
}

export default function OurStory({ heading, foundedYear, intro, mission, vision, capabilities }: OurStoryProps) {
  return (
    <section id="our-story" className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="fade-in">
          <div className="accent-rule mb-6" />
          <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-[#3D9B82] mb-8">{heading}</h2>
          <p className="text-3xl md:text-4xl font-sans font-light leading-tight text-[#1D2B45] mb-12">
            A full service retail property firm since {foundedYear}.
          </p>
        </div>
        <div className="fade-in space-y-8 text-lg leading-relaxed text-[#1D2B45]/80">
          <p>{intro}</p>
          <p>{mission}</p>
        </div>
        <div className="fade-in mt-16 border-l-[3px] border-[#3D9B82] pl-8">
          <p className="text-xl md:text-2xl font-sans font-light leading-relaxed text-[#1D2B45] italic">
            {vision}
          </p>
        </div>
        <div className="fade-in mt-12">
          <p className="text-lg leading-relaxed text-[#1D2B45]/80">{capabilities}</p>
        </div>
      </div>
    </section>
  )
}
