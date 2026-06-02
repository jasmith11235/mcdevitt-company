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
    <section id="projects" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="fade-in mb-16">
          <div className="accent-rule mb-6" />
          <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-[#3D9B82] mb-4">{t('eyebrow')}</h2>
          <p className="text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight text-[#1D2B45] max-w-2xl">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.slug} className="fade-in group relative overflow-hidden bg-stone-100 aspect-[3/4] cursor-pointer">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D2B45]/90 via-[#1D2B45]/20 to-transparent" />
              {/* Always visible info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-sans text-sm tracking-widest uppercase text-white mb-1">{project.name}</h3>
                <p className="font-sans text-xs tracking-wider text-[#3D9B82]">{project.location}</p>
              </div>
              {/* Hover overlay with full details */}
              <div className="absolute inset-0 bg-[#1D2B45]/95 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="font-sans text-sm tracking-widest uppercase text-white mb-2">{project.name}</h3>
                <p className="font-sans text-xs tracking-wider text-[#3D9B82] mb-3">{project.location}</p>
                <p className="text-xs text-white/70 leading-relaxed mb-3">{project.description}</p>
                <div className="flex gap-4 text-[10px] font-sans tracking-wider uppercase text-white/50">
                  <span>{project.totalSf}</span>
                  <span>{project.assetType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
