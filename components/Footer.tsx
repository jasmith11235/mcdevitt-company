import Logo from './Logo'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer id="contact" className="bg-[#1D2B45] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          <div>
            <Logo color="white" className="w-20 h-20 mb-6" />
            <p className="font-sans text-xs tracking-wider text-white/50 max-w-xs">
              A full-service retail real estate advisory firm. Strategic vision, data-driven insight, and global reach since 1997.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#3D9B82] mb-4">Navigate</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: 'Our Story', href: '#our-story' },
                { label: 'Services', href: '#services' },
                { label: 'Data Science', href: '#data-science' },
                { label: 'Projects', href: '#projects' },
                { label: 'News', href: '/news' },
                { label: 'Reading Room', href: '/reading-room' },
                { label: 'Offices', href: '#offices' },
              ].map(link => (
                <a key={link.label} href={link.href} className="font-sans text-xs tracking-wider text-white/60 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#3D9B82] mb-4">Contact</h4>
            <a href="mailto:info@mcdevittco.com" className="font-sans text-xs tracking-wider text-white/60 hover:text-white transition-colors block mb-2">
              info@mcdevittco.com
            </a>
            <a href="https://mcdevittco.com" className="font-sans text-xs tracking-wider text-white/60 hover:text-white transition-colors block">
              mcdevittco.com
            </a>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:justify-between gap-4">
          <p className="font-sans text-[10px] tracking-wider text-white/30">
            &copy; {year} The McDevitt Company. All rights reserved.
          </p>
          <p className="font-sans text-[10px] tracking-wider text-white/30">
            Philadelphia &middot; Greenwich &middot; Nashville &middot; West Palm Beach &middot; Chicago &middot; Los Angeles &middot; London &middot; Amsterdam
          </p>
        </div>
      </div>
    </footer>
  )
}
