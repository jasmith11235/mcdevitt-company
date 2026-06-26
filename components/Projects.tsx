import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface Project {
  slug: string
  name: string
  location: string
  totalSf: string
  mcdevittSf: string
  assetType: string
  description: string
  image: string
}

export default function Projects({ projects }: { projects: Project[] }) {
  const t = useTranslations('projects')

  return (
    <section id="projects" className="section-wrap bg-white">
      <div className="section-inner">
        <div className="section-label fade-in">{t('eyebrow')}</div>
        <div className="grid gap-[30px] md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="fade-in group relative block h-[360px] overflow-hidden rounded-[4px] shadow-card"
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 text-center transition-colors duration-300 group-hover:bg-black/55">
                <span className="font-gotham text-[14px] font-bold uppercase tracking-[2px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {project.name}
                </span>
                <span className="mt-1.5 font-mercury text-[12px] italic text-white opacity-0 transition-opacity delay-75 duration-300 group-hover:opacity-100">
                  {project.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
