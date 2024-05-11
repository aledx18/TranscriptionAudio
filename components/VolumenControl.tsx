'use client'

import { Slider } from '@/components/ui/slider'
import { Volume2Icon } from 'lucide-react'

type Props = {
  audio: any
}

export default function VolumenControl({ audio }: Props) {
  return (
    <div className='flex items-center gap-2'>
      <button className='rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white'>
        <Volume2Icon className='w-5 h-5' />
      </button>
      <Slider
        className='w-20 [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform'
        defaultValue={[20]}
        max={100}
        min={0}
        onValueChange={(value) => {
          const [newVolu] = value
          if (audio.current) {
            audio.current.volume = newVolu / 100
          }
        }}
      />
    </div>
  )
}
