'use client'

import { usePlayerStore } from '@/app/store/playerStore'
import { ArrowLeftIcon, ArrowRightIcon, PauseIcon, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import SliderControl from './SliderControl'
import VolumenControl from './VolumenControl'
import { AudioSrc } from './const/Const'

export default function FooterPlayerAudio() {
  const { isPlaying, start } = usePlayerStore((state) => state)
  const [playPause, setPlayPause] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      if (audioRef.current.currentTime !== undefined) {
        audioRef.current.currentTime = start
        audioRef.current.play()
      }
    } else {
      audioRef.current?.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])

  const handleCLickPlayPause = () => {
    setPlayPause(!playPause)
    audioRef.current?.paused
      ? audioRef.current?.play()
      : audioRef.current?.pause()
  }

  return (
    <div className='lg:block w-full border-t-2 py-2 mb-0.5 lg:px-16'>
      <div>
        <audio ref={audioRef} src={AudioSrc} />
        <div>
          <h3 className='text-lg font-bold lg:text-start text-center'>
            {AudioSrc}
          </h3>
        </div>
        <div className='flex items-center gap-4 lg:flex-row flex-col'>
          <button className='hidden lg:block rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white'>
            <ArrowLeftIcon className='w-5 h-5' />
          </button>
          <button
            className='p-4 rounded-full bg-primary/15 text-primary hover:bg-primary/30'
            onClick={handleCLickPlayPause}>
            {playPause || isPlaying ? (
              <PauseIcon className='w-6 h-6' />
            ) : (
              <Play className='w-6 h-6 fill-current' />
            )}
          </button>
          <button className='hidden lg:block rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white'>
            <ArrowRightIcon className='w-5 h-5' />
          </button>

          <SliderControl audio={audioRef} />
          <VolumenControl audio={audioRef} />
        </div>
      </div>
    </div>
  )
}
