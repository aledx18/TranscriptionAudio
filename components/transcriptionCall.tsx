'use client'

import { AudioLines, Play } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { transcript } from './const/Const'
import { usePlayerStore } from '@/app/store/playerStore'
import { useState } from 'react'

export default function TranscriptionCall() {
  const { isPlaying, setIsPlaying, setMinuteStart } = usePlayerStore()
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  const handleCLickPlay = (index: number, start: number) => () => {
    setMinuteStart(start)
    setIsPlaying(!isPlaying)
    setSelectedItem(index)
  }

  return (
    <Card className='w-full rounded-2xl mb-4 lg:mb-0'>
      <div className='flex-1 overflow-y-auto px-2 py-3'>
        <ScrollArea className='h-[700px] w-full'>
          {transcript.map((p, i) => (
            <div
              key={i}
              className={cn(
                'flex items-start space-x-3 space-y-3',
                selectedItem === i && isPlaying ? 'text-zinc-600' : '',
                p.role === 'agent' ? 'justify-start' : 'justify-end lg:mr-3'
              )}>
              <Avatar className='mt-3'>
                <AvatarImage
                  alt='Your Name'
                  src={
                    p.role === 'agent'
                      ? 'https://i.pravatar.cc/100?img=32'
                      : 'https://i.pravatar.cc/100?img=12'
                  }
                />
                <AvatarFallback>{p.role}</AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  'rounded-xl px-4 py-4 max-w-[60%] flex flex-col gap-1',
                  p.role === 'agent' ? 'bg-secondary' : 'bg-zinc-900'
                )}>
                <p
                  className={cn(
                    'text-xs text-gray-500 flex items-center gap-x-2 font-bold',
                    p.role === 'agent' ? 'text-slate-300' : 'text-zinc-300'
                  )}>
                  {p.role}
                  <Button
                    variant='colorMode'
                    size='xs'
                    onClick={handleCLickPlay(i, p.start)}>
                    {selectedItem === i && isPlaying ? (
                      <AudioLines className='w-4 h-4 animate-pulse' />
                    ) : (
                      <Play className='h-4 w-4' />
                    )}
                  </Button>
                </p>
                <p className='text-pretty text-sm'>{p.content}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </Card>
  )
}
