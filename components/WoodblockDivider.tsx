import Image from 'next/image'

export default function WoodblockDivider({
  src = '/graphics/woodblock-1.jpg',
}: {
  src?: string
}) {
  return (
    <div className="relative w-full h-[120px] md:h-[180px] overflow-hidden" aria-hidden>
      <Image src={src} alt="" fill className="object-cover" sizes="100vw" />
    </div>
  )
}
