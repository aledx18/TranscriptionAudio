/* eslint-disable react-hooks/exhaustive-deps */
'ues client'
import { useEffect, useState } from 'react'
import { Slider } from '@/components/ui/slider'

type Props = {
  audio: any
}

export default function SliderControl({ audio }: Props) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  //   useEffect(() => {
  //     audio.current.addEventListener('timeupdate', handleTimeUpdate)
  //     return () => {
  //       audio.current.removeEventListener('timeupdate', handleTimeUpdate)
  //     }
  //   }, [])

  //   const handleTimeUpdate = () => {
  //     setCurrentTime(audio.current.currentTime)
  //   }

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audio.current) {
        setCurrentTime(audio.current.currentTime)
        setDuration(audio.current.duration)
      }
    }

    const handleLoadedMetadata = () => {
      if (audio.current) {
        setDuration(audio.current.duration)
      }
    }

    if (audio.current) {
      audio.current.addEventListener('timeupdate', handleTimeUpdate)
      audio.current.addEventListener('loadedmetadata', handleLoadedMetadata)

      return () => {
        audio.current.removeEventListener('timeupdate', handleTimeUpdate)
        audio.current.removeEventListener(
          'loadedmetadata',
          handleLoadedMetadata
        )
      }
    }
  }, [audio])

  const formatTime = (time: number) => {
    if (time == null) return '0:00'

    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  //   const duration = audio?.current?.duration ?? 0

  return (
    <div className='flex flex-row lg:flex-1 w-full gap-x-2 text-xs'>
      <span className='opacity-50 lg:w-12 lg:text-right'>
        {formatTime(currentTime)}
      </span>

      <Slider
        value={[currentTime]}
        max={audio?.current?.duration ?? 0}
        min={0}
        className=''
        onValueChange={(value) => {
          const [newCurrentTime] = value
          audio.current.currentTime = newCurrentTime
        }}
      />

      <span className='opacity-50 lg:w-12 lg:text-left'>
        {duration ? formatTime(duration) : '0:00'}
      </span>
    </div>
  )
}
