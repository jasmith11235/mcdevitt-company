import Image from 'next/image'

export default function WoodblockDivider({ src = '/graphics/woodblock-1.jpg', alt = 'Decorative woodblock print' }: { src?: string; alt?: string }) {
  return (
    <div className="w-full h-[120px] md:h-[180px] relative overflow-hidden">
      <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
    </div>
  )
}
